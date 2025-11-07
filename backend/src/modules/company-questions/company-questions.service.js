import { prisma } from "../../config/prisma.js";
import { generateFromGemini } from "../../utils/geminis.js";

export const getQuestions = async (userId, company, role) => {
    if (!company) {
        return await prisma.companyQuestion.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    }
    const existing = await prisma.companyQuestion.findMany({
        where: { userId, company, role: role || undefined },
        orderBy: { createdAt: 'desc' }
    });

    if (existing.length > 0) {
        return existing;
    }

    const prompt = `Generate 3 technical interview questions for a ${role || "Software Engineer"} role at ${company}.
    Return strictly valid JSON array of objects with fields:
    - 'question' (string)
    - 'answer' (string, brief solution/explanation)
    
    Do not include markdown formatting. Return raw JSON only.`;

    let questionsData = [];
    try {
        const text = await generateFromGemini(prompt);
        // Clean markdown if present
        const jsonText = text.replace(/```json|```/g, "").trim();
        questionsData = JSON.parse(jsonText);

        if (!Array.isArray(questionsData)) {
            questionsData = [questionsData];
        }
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        questionsData = [
            { question: `What is special about ${company}'s culture?`, answer: "Research their values." },
            { question: "Explain a challenging project.", answer: "STAR method." }
        ];
    }

    const savedQuestions = [];
    for (const q of questionsData) {
        const saved = await prisma.companyQuestion.create({
            data: {
                userId,
                company,
                role: role || "Software Engineer",
                question: q.question,
                answer: q.answer
            }
        });
        savedQuestions.push(saved);
    }

    return savedQuestions;
};

export const getQuestionById = async (id) => {
    return await prisma.companyQuestion.findUnique({
        where: { id }
    });
};

export const markSolved = async (id, userId) => {
    const question = await prisma.companyQuestion.findUnique({
        where: { id }
    });

    if (!question) throw new Error("Question not found");
    if (question.userId !== userId) throw new Error("Unauthorized");

    return await prisma.companyQuestion.update({
        where: { id },
        data: { isSolved: true }
    });
};
