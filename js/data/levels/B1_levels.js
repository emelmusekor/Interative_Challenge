window.B1_LEVELS = {
    generate: function (lvl) {
        // Informatics: Sequencing & Topological Sort
        // Lvl 1: 3 Steps, Linear
        // Lvl 10: 5 Steps, Linear
        // Lvl 20: 5 Steps, Linear + Distractors (Fake steps)
        // Lvl 30: 5 Steps, DAG (Two parallel tasks, e.g. Toast Bread & Fry Egg -> Assemble)

        const count = Math.min(8, 3 + Math.floor(lvl / 10));
        const isDAG = lvl > 30; // Complex dependencies

        // Pool of cooking steps
        const tasks = [
            { t: "물 끓이기", id: "boil" }, { t: "면 넣기", id: "noodle" }, { t: "스프 넣기", id: "soup" }, { t: "계란 넣기", id: "egg" }, { t: "먹기", id: "eat" },
            { t: "빵 굽기", id: "toast" }, { t: "잼 바르기", id: "jam" }, { t: "우유 따르기", id: "milk" },
            { t: "쌀 씻기", id: "wash" }, { t: "취사 버튼", id: "cook" }, { t: "뜸 들이기", id: "wait" }
        ];

        let scenario = [];
        if (lvl <= 10) {
            scenario = [tasks[0], tasks[1], tasks[2], tasks[4]]; // Ramen
        } else if (lvl <= 20) {
            scenario = [tasks[5], tasks[6], tasks[7], tasks[4]]; // Toast
        } else {
            scenario = [tasks[0], tasks[1], tasks[3], tasks[2], tasks[4]]; // Ramen + Egg
        }

        // Randomize order for user to sort
        const shuffled = [...scenario].sort(() => Math.random() - 0.5);

        // Define correct order (Simplified linear for lower levels, or check logic)
        // For now, let's just return the correct 'answer key' list or dependency graph.
        // Let's rely on a predefined correct sequence for simplicity in generation.

        return {
            items: shuffled,
            correctOrder: scenario.map(x => x.id) // Strict linear check for now
        };
    }
};
