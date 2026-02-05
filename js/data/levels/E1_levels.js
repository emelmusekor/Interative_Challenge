window.E1_LEVELS = {
    generate: function (lvl) {
        // Informatics: Binary Representation (Bits & Bytes)
        // Lvl 1: 3-bit number (0-7)
        // Lvl 10: 5-bit (0-31)
        // Lvl 30: 8-bit (0-255)

        const bits = Math.min(8, 3 + Math.floor(lvl / 5));
        const maxVal = Math.pow(2, bits) - 1;
        const target = Math.floor(Math.random() * (maxVal + 1));

        return { bits, target };
    }
};
