window.D4_LEVELS = {
    generate: function (lvl) {
        // Informatics: Connectivity & Spanning Trees
        // Lvl 1: 3 Nodes, Line
        // Lvl 10: 5 Nodes, Scattered
        // Lvl 30: 8 Nodes, Dense

        const count = Math.min(10, 3 + Math.floor(lvl / 5));
        const nodes = [];

        for (let i = 0; i < count; i++) {
            nodes.push({
                id: i,
                x: Math.random() * 500 + 50,
                y: Math.random() * 300 + 50
            });
        }

        return { nodes };
    }
};
