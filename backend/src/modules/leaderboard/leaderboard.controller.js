import * as leaderboardService from "./leaderboard.service.js";

export const getLeaderboard = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await leaderboardService.getLeaderboardService(userId);
        res.json({
            success: true,
            data
        });
    } catch (error) {
        console.error("Leaderboard Error:", error);
        res.status(500).json({ success: false, error: "Failed to fetch leaderboard" });
    }
};
