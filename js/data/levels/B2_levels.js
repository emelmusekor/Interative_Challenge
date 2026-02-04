window.B2_LEVELS = {
    generate: function (lvl) {
        // Informatics: Decomposition (Divide & Conquer)
        // Tree Structure
        // Lvl 1: Depth 1 (Root -> 3 Leaves)
        // Lvl 10: Depth 2 (Root -> 2 Nodes -> 2 Leaves each)
        // Lvl 30: Depth 3, Mixed branches

        const depth = Math.min(3, 1 + Math.floor(lvl / 15));
        const branching = Math.min(3, 2 + Math.floor(lvl / 20));

        // Helper to make tree
        let idCount = 0;
        const makeNode = (d, label) => {
            const node = { id: idCount++, label: label, children: [], checked: false };
            if (d > 0) {
                for (let i = 0; i < branching; i++) {
                    node.children.push(makeNode(d - 1, label + "-" + (i + 1)));
                }
            }
            return node;
        };

        const root = makeNode(depth, "프로젝트 실행");

        return { root };
    }
};
