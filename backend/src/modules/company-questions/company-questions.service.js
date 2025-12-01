import { prisma } from "../../config/prisma.js";
import { generateFromGemini } from "../../utils/geminis.js";

export const getQuestions = async (userId, company, role) => {
    if (!company) {
        return await prisma.companyQuestion.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    }

    // 1. Check if CURRENT user already has questions for this role
    const userQuestions = await prisma.companyQuestion.findMany({
        where: { userId, company, role: role || undefined },
        orderBy: { createdAt: 'desc' }
    });

    if (userQuestions.length > 0) {
        return userQuestions;
    }

    // 2. Check if ANY user has questions for this role (Global Cache)
    // We take the most recent set of questions generated for this company/role
    const globalQuestions = await prisma.companyQuestion.findMany({
        where: { company, role: role || undefined },
        orderBy: { createdAt: 'desc' },
        take: 10 // Assuming we generate batches of 10
    });

    if (globalQuestions.length > 0) {
        // Copy these questions for the current user so they can track their own progress (isSolved)
        const copiedQuestions = [];
        for (const q of globalQuestions) {
            // Avoid duplicates if somehow they exist
            const saved = await prisma.companyQuestion.create({
                data: {
                    userId,
                    company,
                    role: q.role,
                    question: q.question,
                    answer: q.answer
                }
            });
            copiedQuestions.push(saved);
        }
        return copiedQuestions;
    }

    // 3. If no questions exist in DB, generate new ones via Gemini
    const prompt = `Generate 10 technical interview questions for a ${role || "Software Engineer"} role at ${company}.
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
        // Fallback if AI fails
        questionsData = [
            { question: `What are the core values of ${company}?`, answer: "Research the company's leadership principles." },
            { question: "Describe a time you failed.", answer: "Use the STAR method." },
            { question: "How do you handle conflict?", answer: "Focus on resolution and learning." }
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
