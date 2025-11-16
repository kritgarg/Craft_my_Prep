import { prisma } from "../../config/prisma.js";

export const getUserPlans = async (userId) => {
    const plans = await prisma.plan.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
    return plans;
};

export const getPlanById = async (planId) => {
    const plan = await prisma.plan.findUnique({
        where: { id: planId }
    });
    return plan;
};

export const updatePlan = async (planId, updates) => {
    const plan = await prisma.plan.update({
        where: { id: planId },
        data: updates
    });
    return plan;
};

export const deletePlan = async (planId) => {
    await prisma.plan.delete({
        where: { id: planId }
    });
    return { message: "Plan deleted successfully" };
};

export const markStepComplete = async (planId, stepId) => {
    const plan = await prisma.plan.findUnique({
        where: { id: planId }
    });

    if (!plan) throw new Error("Plan not found");

    let roadmap = plan.roadmap;

    if (!Array.isArray(roadmap)) {
        return plan;
    }

    const updatedRoadmap = roadmap.map((step, index) => {
        const currentStepId = step.day || (index + 1);
        if (String(currentStepId) === String(stepId)) {
            // Only allow marking as complete, never unmark
            if (step.completed) return step;
            return { ...step, completed: true };
        }
        return step;
    });
    const updatedPlan = await prisma.plan.update({
        where: { id: planId },
        data: { roadmap: updatedRoadmap }
    });

    const wasComplete = roadmap.every(s => s.completed);
    const isComplete = updatedRoadmap.every(s => s.completed);

    if (!wasComplete && isComplete) {
        await prisma.user.update({
            where: { id: plan.userId },
            data: { xp: { increment: 20 } }
        });
    }

    return updatedPlan;
};

