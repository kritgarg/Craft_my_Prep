import { prisma } from "../../config/prisma.js";
import { generateFromGroq } from "../../utils/groq.js";

export const getTodayChallenge = async (userId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.challenge.findFirst({
        where: {
            userId,
            date: {
                gte: today,
            },
        },
    });

    return existing;
};

export const createDailyChallenge = async (userId, language, difficulty) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.challenge.findFirst({
        where: {
            userId,
            date: {
                gte: today,
            },
        },
    });

    if (existing) return existing;

    const prompt = `You are a technical interviewer. Generate a single daily coding challenge or technical interview question.
    Language: ${language || "General"}
    Difficulty: ${difficulty || "Medium"}
    
    Return strictly valid JSON with fields: 
    - 'question' (string)
    - 'solution' (string, brief explanation)
    
    Do not include markdown formatting. Return raw JSON only.`;

    let challengeData;
    try {
        challengeData = await generateFromGroq(prompt);
    } catch (e) {
        console.error("Groq generation failed:", e);
        challengeData = {
            question: `Explain the difference between process and thread in ${language || "General"}.`,
            solution: "A Process is an instance of a program in execution, having its own memory space and resources. A Thread is a subset of a process, sharing the process's memory and resources but executing independently. Processes are isolated, while threads share memory.",
        };
    }

    const newChallenge = await prisma.challenge.create({
        data: {
            userId,
            question: challengeData.question,
            solution: challengeData.solution,
            language,
            difficulty,
            date: new Date(),
            isSolved: false
        },
    });

    return newChallenge;
};

export const markSolved = async (userId, challengeId) => {
    const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId }
    });

    if (!challenge || challenge.userId !== userId) {
        throw new Error("Challenge not found or unauthorized");
    }

    if (challenge.isSolved) {
        return { challenge, message: "Already solved" };
    }

    console.log(`Marking challenge ${challengeId} as solved for user ${userId}`);

    try {
        const [updatedChallenge, updatedUser] = await prisma.$transaction([
            prisma.challenge.update({
                where: { id: challengeId },
                data: { isSolved: true }
            }),
            prisma.user.update({
                where: { id: userId },
                data: {
                    xp: { increment: 25 },
                    streak: { increment: 1 }
                }
            })
        ]);

        return { challenge: updatedChallenge, user: updatedUser };
    } catch (error) {
        console.error("Transaction failed:", error);
        throw error;
    }
};



export const getHistory = async (userId) => {
    return await prisma.challenge.findMany({
        where: { userId },
        orderBy: { date: "desc" },
    });
}; 
