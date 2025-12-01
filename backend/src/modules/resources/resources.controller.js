import * as resourceService from "./resources.service.js";

export const getResources = async (req, res) => {
    try {
        const filters = req.query;
        const resources = await resourceService.getResources(filters);
        res.json({ success: true, data: resources });
    } catch (error) {
        console.error("Get Resources Error:", error);
        res.status(500).json({ success: false, error: "Failed to fetch resources" });
    }
};

export const seedResources = async (req, res) => {
    try {
        await resourceService.seedResources();
        res.json({ success: true, message: "Seeded successfully" });
    } catch (error) {
        console.error("Seed Error:", error);
        res.status(500).json({ success: false, error: "Failed to seed" });
    }
}
