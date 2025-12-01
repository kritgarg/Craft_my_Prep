import { prisma } from "../../config/prisma.js";

export const getResources = async (filters = {}) => {
    const { search, type, level, tag } = filters;

    const where = {};

    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ];
    }

    if (type && type !== 'All') {
        where.type = type;
    }

    if (level && level !== 'All') {
        where.level = level;
    }

    if (tag) {
        where.tags = {
            has: tag
        };
    }

    return await prisma.resource.findMany({
        where,
        orderBy: { createdAt: 'desc' }
    });
};

export const seedResources = async () => {
    await prisma.resource.deleteMany({});

    const resources = [
        {
            title: "React Hooks Deep Dive",
            description: "A comprehensive guide to understanding React Hooks in depth.",
            type: "Video",
            url: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
            tags: ["React", "Hooks"],
            level: "Intermediate",
            source: "YouTube"
        },
        {
            title: "Namaste JavaScript - Season 1",
            description: "Deep dive into JavaScript internals: Hoisting, Closures, Event Loop, and more.",
            type: "Video",
            url: "https://www.youtube.com/watch?v=pN6jk0uUrD8&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP",
            tags: ["JavaScript", "Core"],
            level: "Advanced",
            source: "YouTube"
        },
        {
            title: "Next.js 14 Full Course 2024",
            description: "Build a full-stack app with the latest Next.js 14 features, Server Actions, and Prisma.",
            type: "Video",
            url: "https://www.youtube.com/watch?v=5wjdP_gDlJo",
            tags: ["Next.js", "FullStack", "React"],
            level: "Intermediate",
            source: "YouTube"
        },
        {
            title: "System Design Interview - Step By Step Guide",
            description: "A framework for tackling system design interview questions.",
            type: "Video",
            url: "https://www.youtube.com/watch?v=bUHFg8CZFws",
            tags: ["System Design", "Interview"],
            level: "Advanced",
            source: "YouTube"
        },
        {
            title: "CSS Grid vs Flexbox",
            description: "When to use Grid vs Flexbox in modern web design.",
            type: "Video",
            url: "https://www.youtube.com/watch?v=hs3kiaNFEAk",
            tags: ["CSS", "Frontend"],
            level: "Beginner",
            source: "YouTube"
        },

        {
            title: "React Official Documentation",
            description: "The new React docs - learn React with interactive examples.",
            type: "Article",
            url: "https://react.dev/learn",
            tags: ["React", "Docs"],
            level: "Beginner",
            source: "React.dev"
        },
        {
            title: "Patterns.dev",
            description: "Free book on design patterns and component patterns for building powerful web apps.",
            type: "Article",
            url: "https://www.patterns.dev/",
            tags: ["Design Patterns", "Architecture"],
            level: "Advanced",
            source: "Patterns.dev"
        },
        {
            title: "You Don't Know JS Yet",
            description: "A book series on JavaScript. Deep dive into the core mechanisms of the language.",
            type: "Article",
            url: "https://github.com/getify/You-Dont-Know-JS",
            tags: ["JavaScript", "Deep Dive"],
            level: "Advanced",
            source: "GitHub"
        },
        {
            title: "Modern CSS Reset",
            description: "A modern CSS reset to start your projects with sensible defaults.",
            type: "Article",
            url: "https://piccalil.li/blog/a-modern-css-reset/",
            tags: ["CSS", "Best Practices"],
            level: "Intermediate",
            source: "Piccalilli"
        },

        {
            title: "Big-O Cheat Sheet",
            description: "Know your complexities! A chart for common data structure operations.",
            type: "CheatSheet",
            url: "https://www.bigocheatsheet.com/",
            tags: ["DSA", "Algorithms"],
            level: "Beginner",
            source: "BigOCheatSheet"
        },
        {
            title: "Grid Garden",
            description: "A game for learning CSS Grid layout.",
            type: "CheatSheet",
            url: "https://cssgridgarden.com/",
            tags: ["CSS", "Grid", "Game"],
            level: "Beginner",
            source: "Grid Garden"
        },
        {
            title: "Flexbox Froggy",
            description: "A game for learning CSS Flexbox.",
            type: "CheatSheet",
            url: "https://flexboxfroggy.com/",
            tags: ["CSS", "Flexbox", "Game"],
            level: "Beginner",
            source: "Flexbox Froggy"
        },
        {
            title: "Git Cheat Sheet",
            description: "Essential Git commands for daily use.",
            type: "CheatSheet",
            url: "https://education.github.com/git-cheat-sheet-education.pdf",
            tags: ["Git", "Version Control"],
            level: "Beginner",
            source: "GitHub"
        },

        {
            title: "CS50: Introduction to Computer Science",
            description: "Harvard's introduction to the intellectual enterprises of computer science.",
            type: "Course",
            url: "https://pll.harvard.edu/course/cs50-introduction-computer-science",
            tags: ["CS", "Fundamentals"],
            level: "Beginner",
            source: "Harvard"
        },
        {
            title: "Full Stack Open",
            description: "Deep dive into modern web development with React, Redux, Node.js, MongoDB, GraphQL and TypeScript.",
            type: "Course",
            url: "https://fullstackopen.com/en/",
            tags: ["FullStack", "React", "Node.js"],
            level: "Intermediate",
            source: "University of Helsinki"
        },

        {
            title: "Automate the Boring Stuff with Python",
            description: "Practical programming for total beginners.",
            type: "Article",
            url: "https://automatetheboringstuff.com/",
            tags: ["Python", "Automation"],
            level: "Beginner",
            source: "Al Sweigart"
        },
        {
            title: "Corey Schafer - Python Tutorials",
            description: "The best Python tutorials on YouTube, covering everything from basics to Django/Flask.",
            type: "Video",
            url: "https://www.youtube.com/user/schafer5",
            tags: ["Python", "Django", "Flask"],
            level: "Intermediate",
            source: "YouTube"
        },
        {
            title: "SQLBolt",
            description: "Learn SQL with simple, interactive exercises.",
            type: "Course",
            url: "https://sqlbolt.com/",
            tags: ["SQL", "Database"],
            level: "Beginner",
            source: "SQLBolt"
        },

        {
            title: "Java Brains",
            description: "High-quality Java and Spring Boot tutorials.",
            type: "Video",
            url: "https://www.youtube.com/c/JavaBrainsChannel",
            tags: ["Java", "Spring Boot", "Microservices"],
            level: "Intermediate",
            source: "YouTube"
        },
        {
            title: "Baeldung",
            description: "In-depth articles and tutorials for Java and Spring.",
            type: "Article",
            url: "https://www.baeldung.com/",
            tags: ["Java", "Spring"],
            level: "Advanced",
            source: "Baeldung"
        },


        {
            title: "Docker for Beginners",
            description: "Learn Docker in 2 hours.",
            type: "Video",
            url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
            tags: ["Docker", "DevOps"],
            level: "Beginner",
            source: "YouTube"
        },
        {
            title: "Kubernetes Basics",
            description: "Official interactive tutorials to learn Kubernetes.",
            type: "Course",
            url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
            tags: ["Kubernetes", "DevOps"],
            level: "Advanced",
            source: "Kubernetes.io"
        },
        {
            title: "AWS Fundamentals",
            description: "Core concepts for Amazon Web Services.",
            type: "Article",
            url: "https://aws.amazon.com/getting-started/fundamentals-core-concepts/",
            tags: ["AWS", "Cloud"],
            level: "Beginner",
            source: "AWS"
        },


        {
            title: "Developer Roadmaps",
            description: "Step by step guides and paths to learn different tools or technologies.",
            type: "Article",
            url: "https://roadmap.sh/",
            tags: ["Career", "Roadmap"],
            level: "All",
            source: "roadmap.sh"
        },
        {
            title: "Tech Interview Handbook",
            description: "Curated interview preparation materials for busy engineers.",
            type: "Article",
            url: "https://www.techinterviewhandbook.org/",
            tags: ["Interview", "Career"],
            level: "Intermediate",
            source: "GitHub"
        },
        {
            title: "NeetCode",
            description: "Better LeetCode solutions and explanations.",
            type: "Video",
            url: "https://neetcode.io/",
            tags: ["DSA", "Interview"],
            level: "Advanced",
            source: "NeetCode"
        }
    ];

    await prisma.resource.createMany({
        data: resources
    });
};
