window.C2_LEVELS = {
    generate: function (lvl) {
        // Informatics: Sorting & Conditional Logic
        // Lvl 1: Sort by Color (Red vs Blue)
        // Lvl 10: Sort by Shape (Circle vs Square)
        // Lvl 20: Mixed (Red Circle vs Blue Square)
        // Lvl 30: Switching Rules (Every 5 seconds key changes)

        const goal = 10 + lvl;
        const speed = Math.min(6, 2 + (lvl * 0.1)); // Cap speed at 6

        const ruleType = lvl < 10 ? 'color' : (lvl < 20 ? 'shape' : 'mixed');

        return { goal, speed, ruleType };
    }
};
