window.D3_LEVELS = {
    generate: function (lvl) {
        // Informatics: Network Dependencies (Food Chain)
        // Lvl 1: Simple Chain (Grass -> Rabbit -> Wolf)
        // Lvl 10: Web (Multiple intersecting chains)
        // Lvl 30: Complex Web

        const nodes = [];
        const edges = [];

        const layers = lvl < 10 ? 3 : 4;
        const width = lvl < 10 ? 1 : (lvl < 20 ? 2 : 3);

        // Tiers: 0=Producer, 1=Herbivore, 2=Carnivore, 3=Apex
        const names = [
            ['풀', '나무', '꽃'],
            ['토끼', '사슴', '다람쥐', '메뚜기'],
            ['여우', '늑대', '독수리', '뱀'],
            ['호랑이', '사자', '곰']
        ];

        // Generate Nodes
        let idCount = 0;
        const tierNodes = [];
        for (let t = 0; t < layers; t++) {
            tierNodes[t] = [];
            for (let w = 0; w < width; w++) {
                const name = names[t][Math.floor(Math.random() * names[t].length)] + " " + (w + 1);
                const n = { id: idCount++, label: name, layer: t, x: 0, y: 0 }; // Pos set by engine
                nodes.push(n);
                tierNodes[t].push(n);
            }
        }

        // Generate Edges (Dependencies)
        for (let t = 0; t < layers - 1; t++) {
            tierNodes[t].forEach(src => {
                // Connect to at least one in next layer
                const targets = tierNodes[t + 1];
                const dest = targets[Math.floor(Math.random() * targets.length)];
                edges.push({ from: src.id, to: dest.id });

                // Randomly add more?
                if (Math.random() > 0.5) {
                    const dest2 = targets[Math.floor(Math.random() * targets.length)];
                    if (dest2 !== dest) edges.push({ from: src.id, to: dest2.id });
                }
            });
        }

        // Question
        const qEdge = edges[Math.floor(Math.random() * edges.length)];
        const fromNode = nodes.find(n => n.id === qEdge.from);
        const toNode = nodes.find(n => n.id === qEdge.to);

        return { nodes, edges, question: { q: `${fromNode.label}을(를) 먹는 동물은?`, a: toNode.id } };
    }
};
