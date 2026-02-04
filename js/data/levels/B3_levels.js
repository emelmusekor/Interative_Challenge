// B3 Train Master Levels
window.B3_LEVELS = {
    generate: function (lvl) {
        let size = 4;
        if (lvl > 10) size = 6;
        if (lvl > 30) size = 8;

        // Procedural S/E logic here is moved from engine to data generator
        const start = Math.floor(Math.random() * (size * size));
        let end;
        do {
            end = Math.floor(Math.random() * (size * size));
        } while (end === start);

        return { size, start, end };
    }
};
