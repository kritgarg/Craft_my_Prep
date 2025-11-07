import * as service from "./company-questions.service.js";

export const getQuestions = async (req, res) => {
    try {
        const { company, role } = req.query;
        const questions = await service.getQuestions(req.user.id, company, role);
        res.json({ questions });
    } catch (error) {
        console.error("Get Company Questions Error:", error);
        res.status(500).json({ error: "Failed to fetch questions" });
    }
};

export const getQuestionById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

        const question = await service.getQuestionById(id);
        if (!question) return res.status(404).json({ error: "Question not found" });
        if (question.userId !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

        res.json({ question });
    } catch (error) {
        console.error("Get Question Error:", error);
        res.status(500).json({ error: "Failed to fetch question" });
    }
};

export const markSolved = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

        const updated = await service.markSolved(id, req.user.id);
        res.json({ message: "Marked as solved", question: updated });
    } catch (error) {
        console.error("Mark Solved Error:", error);
        if (error.message === "Question not found") return res.status(404).json({ error: "Question not found" });
        if (error.message === "Unauthorized") return res.status(403).json({ error: "Unauthorized" });
        res.status(500).json({ error: "Failed to mark solved" });
    }
};
