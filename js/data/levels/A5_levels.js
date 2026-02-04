window.A5_LEVELS = {
    generate: function (lvl) {
        // Optimization Problem
        // Stars: Value points
        // Walls: Blockers
        const starCount = 5 + lvl;
        const wallCount = 3 + Math.floor(lvl / 2);

        const stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({ x: Math.random() * 300 + 50, y: Math.random() * 300 + 50 });
        }

        const walls = [];
        for (let i = 0; i < wallCount; i++) {
            walls.push({
                x: Math.random() * 300 + 50,
                y: Math.random() * 300 + 50,
                w: Math.random() * 50 + 20,
                h: Math.random() * 50 + 20
            });
        }

        return { stars, walls, threshold: 0.7 }; // Aim for 70% visibility
    }
};
