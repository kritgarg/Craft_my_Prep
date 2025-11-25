import { prisma } from "../../config/prisma.js";

export const getLeaderboardService = async (currentUserId, limit = 50) => {
    const leaderboard = await prisma.user.findMany({
        take: limit,
        orderBy: {
            xp: 'desc'
        },
        select: {
            id: true,
            name: true,
            avatar: true,
            xp: true
        }
    });

    const currentUser = await prisma.user.findUnique({
        where: { id: currentUserId },
        select: { xp: true, id: true, name: true, avatar: true }
    });

    const rankCount = await prisma.user.count({
        where: {
            xp: {
                gt: currentUser.xp
            }
        }
    });

    const userRank = rankCount + 1;

    return {
        leaderboard,
        userRank: {
            rank: userRank,
            ...currentUser
        }
    };
};
