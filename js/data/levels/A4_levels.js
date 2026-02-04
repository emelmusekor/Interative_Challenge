window.A4_LEVELS = {
    generate: function (lvl) {
        // Informatics: Parallel Processing & Throughput
        // Lvl 1-10: Single stream, slow.
        // Lvl 11-30: Faster, multiple items at once (Parallelism).
        // Lvl 31-50: "Overload" - High speed, high density, must prioritize.

        const speed = 2 + (lvl * 0.3);
        const spawnRate = Math.max(10, 80 - (lvl * 1.5));
        const opacity = 1.0; // Keep visible, focusing on reaction/parallelism
        const multiSpawnProb = lvl > 20 ? 0.3 : 0; // Chance to spawn 2 at once

        return {
            speed: speed,
            spawnRate: spawnRate,
            opacity: opacity,
            multiSpawnProb: multiSpawnProb,
            duration: 15 + lvl
        };
    }
};
