window.E3_LEVELS = {
    generate: function (lvl) {
        // Informatics: Event Handling
        // Lvl 1: One trigger (Click when Red)
        // Lvl 10: Logic (Click when Red AND Circle)

        // Let's do a sequence of events to react to.
        const conditions = lvl < 10 ? 1 : 2;

        let targetColor = Math.random() > 0.5 ? 'red' : 'green';
        let targetShape = Math.random() > 0.5 ? 'circle' : 'square';

        let instruction = "";
        if (conditions === 1) {
            instruction = `${targetColor === 'red' ? '빨간색' : '녹색'}이 나오면 클릭하세요!`;
        } else {
            instruction = `${targetColor === 'red' ? '빨간' : '녹색'} ${targetShape === 'circle' ? '동그라미' : '네모'}가 나오면 클릭하세요!`;
        }

        return { instruction, targetColor, targetShape, conditions };
    }
};
