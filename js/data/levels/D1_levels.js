window.D1_LEVELS = {
    generate: function (lvl) {
        // Informatics: Graph Theory (Directed Graph & Cycles)
        // Lvl 1: 3 Nodes, Find "Who gives to X?"
        // Lvl 10: 5 Nodes, Find cycle (A->B->C->A)
        // Lvl 30: 8 Nodes, Complete mapping

        const count = Math.min(8, 3 + Math.floor(lvl / 5));
        const names = ['철수', '영희', '민수', '지수', '호영', '준호', '나영', '동수'];
        const people = names.slice(0, count);

        // Random assign (Manito: Derangement usually, but here just directed edges)
        // Ensure every person gives to exactly 1 person, receives from 1 person (Cycle decomposition)

        // Simple Shuffle Shift
        // [A,B,C] -> [B,C,A] (One cycle)
        // Or multiple cycles? For game simplicity, let's just make 1 big cycle or random components.
        // Let's make 1 big cycle for "Cycle" concept.

        const shuffled = [...people].sort(() => Math.random() - 0.5);
        const edges = [];
        for (let i = 0; i < count; i++) {
            edges.push({
                from: shuffled[i],
                to: shuffled[(i + 1) % count]
            });
        }

        return { people, edges };
    }
};
