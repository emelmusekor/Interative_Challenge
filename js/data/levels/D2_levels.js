window.D2_LEVELS = {
    generate: function (lvl) {
        // Informatics: Tree Structure & Hierarchy
        // Lvl 1: Depth 2 (Grandpa -> Pa -> Me)
        // Lvl 10: Depth 3

        const depth = lvl < 10 ? 2 : (lvl < 25 ? 3 : (lvl < 40 ? 4 : 5));

        // Build Tree
        let id = 1;
        const root = { id: id++, name: "할아버지", items: [] };

        // Add children
        const addChildren = (node, d) => {
            if (d === 0) return;
            // Branching factor: 2 to 3 children
            const count = (lvl > 20 && Math.random() > 0.5) ? 3 : 2;
            for (let i = 0; i < count; i++) {
                const child = { id: id++, name: "가족 " + id, items: [] };
                node.items.push(child);
                addChildren(child, d - 1);
            }
        };
        addChildren(root, depth);

        // Question: Find relationship
        // Q: Who is parent of X?
        // Pick a random leaf

        const getLeaf = (n) => {
            if (n.items.length === 0) return n;
            return getLeaf(n.items[Math.floor(Math.random() * n.items.length)]);
        };

        const target = getLeaf(root);
        // Find parent?
        // Let's just ask: Who is at the top? (Root) - Too easy.
        // Q: Select X (Name).

        return { root, targetName: target.name };
    }
};
