import { prisma } from "../../config/prisma.js";

export const createNote = async (userId, content) => {
    return await prisma.note.create({
        data: {
            userId,
            content
        }
    });
};

export const getNotes = async (userId) => {
    return await prisma.note.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
};

export const deleteNote = async (noteId, userId) => {
    const note = await prisma.note.findUnique({
        where: { id: noteId }
    });

    if (!note) throw new Error("Note not found");
    if (note.userId !== userId) throw new Error("Unauthorized");

    return await prisma.note.delete({
        where: { id: noteId }
    });
};
