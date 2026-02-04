window.B5_LEVELS = {
    generate: function (lvl) {
        // Informatics: Scheduling & Load Balancing
        // Lvl 1: 3 Tasks, 1 Worker (Sequential)
        // Lvl 10: 6 Tasks, 2 Workers (Parallel)
        // Lvl 30: 10 Tasks, 3 Workers (Uneven loads)

        const tasks = [];
        const taskCount = 3 + Math.floor(lvl / 5);

        for (let i = 0; i < taskCount; i++) {
            tasks.push({
                cost: Math.floor(Math.random() * 5) + 1 // Time cost 1-5
            });
        }

        const workers = 1 + Math.floor(lvl / 10);

        return { tasks, workers };
    }
};
