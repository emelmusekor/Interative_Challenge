// C1 - Ocean Sonar Levels
window.C1_LEVELS = {
    generate: function (lvl) {
        let size = 5;
        if (lvl > 5) size = 7;
        if (lvl > 10) size = 8;
        if (lvl > 20) size = 10;
        if (lvl > 35) size = 12;
        if (lvl > 45) size = 15;

        const targetCount = Math.min(10, 1 + Math.floor(lvl / 5));
        const obsCount = Math.floor(size * size * 0.15) + Math.floor(lvl / 2);

        return { size, targetCount, obsCount };
    }
};
