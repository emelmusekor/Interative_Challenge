window.E5_LEVELS = {
    generate: function (lvl) {
        // Informatics: Supervised Learning (Classification)
        // Lvl 1: One clear feature (Color: Red vs Blue)
        // Lvl 10: Two features (Red Circle vs Blue Square)
        // Lvl 30: Noisy data / Rule exception

        // Classes: A vs B
        const features = ['color', 'shape', 'size'];
        const colors = ['red', 'blue'];
        const shapes = ['circle', 'square'];

        // Define Rule
        // e.g. "If Red -> Group A, Blue -> Group B"
        const ruleFeature = lvl < 10 ? 'color' : 'shape';

        // Generate Training Data (Labeled)
        const training = [];
        for (let i = 0; i < 6; i++) {
            const c = colors[Math.floor(Math.random() * 2)];
            const s = shapes[Math.floor(Math.random() * 2)];
            let group = '';

            if (ruleFeature === 'color') group = c === 'red' ? 'A' : 'B';
            else group = s === 'circle' ? 'A' : 'B';

            training.push({ color: c, shape: s, group: group });
        }

        // Generate Test Data (Unlabeled)
        const c = colors[Math.floor(Math.random() * 2)];
        const s = shapes[Math.floor(Math.random() * 2)];
        let answer = '';
        if (ruleFeature === 'color') answer = c === 'red' ? 'A' : 'B';
        else answer = s === 'circle' ? 'A' : 'B';

        const test = { color: c, shape: s };

        return { training, test, answer, ruleFeature };
    }
};
