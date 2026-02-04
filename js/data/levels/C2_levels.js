// C2 Smart Sorter Levels
window.C2_LEVELS = {
    generate: function (lvl) {
        const goal = 10 + Math.floor(lvl * 1.5);
        const speed = 2 + (lvl * 0.1);
        const spawnRate = Math.max(20, 100 - lvl);
        return { goal, speed, spawnRate };
    }
};
