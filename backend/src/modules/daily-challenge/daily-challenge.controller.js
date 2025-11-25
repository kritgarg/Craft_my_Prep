import * as challengeService from "./daily-challenge.service.js";

export const getToday = async (req, res) => {
    try {
        const challenge = await challengeService.getTodayChallenge(req.user.id);
        res.json(challenge);
    } catch (error) {
        console.error("Get Today Challenge Error:", error);
        res.status(500).json({ error: "Failed to get daily challenge" });
    }
};

export const generate = async (req, res) => {
    try {
        const { language, difficulty } = req.body;
        const challenge = await challengeService.createDailyChallenge(req.user.id, language, difficulty);
        res.json(challenge);
    } catch (error) {
        console.error("Generate Challenge Error:", error);
        res.status(500).json({ error: "Failed to generate challenge" });
    }
};

export const markSolved = async (req, res) => {
    try {
        const challengeId = parseInt(req.params.id, 10);
        if (isNaN(challengeId)) return res.status(400).json({ error: "Invalid ID" });

        const result = await challengeService.markSolved(req.user.id, challengeId);
        res.json(result);
    } catch (error) {
        console.error("Mark Solved Error:", error);
        res.status(500).json({ error: "Failed to mark challenge solved" });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await challengeService.getHistory(req.user.id);
        res.json({ history });
    } catch (error) {
        console.error("Get History Error:", error);
        res.status(500).json({ error: "Failed to get history" });
    }
};
