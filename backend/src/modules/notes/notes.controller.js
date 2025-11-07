import * as service from "./notes.service.js";

export const createNote = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: "Content is required" });

        const note = await service.createNote(req.user.id, content);
        res.status(201).json({ note });
    } catch (error) {
        console.error("Create Note Error:", error);
        res.status(500).json({ error: "Failed to create note" });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await service.getNotes(req.user.id);
        res.json({ notes });
    } catch (error) {
        console.error("Get Notes Error:", error);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const noteId = parseInt(req.params.id, 10);
        if (isNaN(noteId)) return res.status(400).json({ error: "Invalid ID" });

        await service.deleteNote(noteId, req.user.id);
        res.json({ message: "Note deleted" });
    } catch (error) {
        console.error("Delete Note Error:", error);
        if (error.message === "Note not found") return res.status(404).json({ error: "Note not found" });
        if (error.message === "Unauthorized") return res.status(403).json({ error: "Unauthorized" });
        res.status(500).json({ error: "Failed to delete note" });
    }
};
