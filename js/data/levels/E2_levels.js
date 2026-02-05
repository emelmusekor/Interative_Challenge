window.E2_LEVELS = {
    generate: function (lvl) {
        // Informatics: Image Representation (Bitmap)
        // Lvl 1: 5x5 Pattern
        // Lvl 10: 8x8 Pattern
        // Lvl 30: 8x8 Random Noise (Hard check)

        const size = lvl < 10 ? 5 : 8;
        const grid = [];

        // Patterns
        // Simple Shapes for low levels
        for (let i = 0; i < size * size; i++) {
            grid.push(Math.random() > 0.5 ? 1 : 0);
        }

        return { size, grid };
    }
};
