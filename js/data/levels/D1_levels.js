window.D1_LEVELS = {
    generate: function (lvl) {
        // Informatics: Graph Theory (Directed Graph & Cycles)
        // Lvl 1: 3 Nodes, Find "Who gives to X?"
        // Lvl 10: 5 Nodes, Find cycle (A->B->C->A)
        // Lvl 30: 8 Nodes, Complete mapping

        const count = Math.min(15, 3 + Math.floor(lvl / 3));
        const names = ['철수', '영희', '민수', '지수', '호영', '준호', '나영', '동수', '미란', '경수', '혜진', '성민', '자영', '태호', '순희'];
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

        // Generate Question with Hops
        const hops = lvl < 10 ? 1 : (lvl < 20 ? 2 : 3);
        const recipient = shuffled[Math.floor(Math.random() * count)];

        let current = recipient;
        for (let h = 0; h < hops; h++) {
            const edge = edges.find(e => e.to === current);
            if (edge) current = edge.from;
        }
        const sender = current;

        let qText = `${recipient}에게 선물을 주는 사람은?`;
        if (hops === 2) qText = `${recipient}의 마니또의 마니또는? (2단계 건너서 주는 사람)`;
        if (hops === 3) qText = `${recipient}에게 3단계를 거쳐 선물을 주는 사람은?`;

        return { people, edges, question: { q: qText, a: sender } };
    }
};
