window.C5_LEVELS = {
    generate: function (lvl) {
        // Informatics: Data Compression (RLE)
        // Lvl 1: Simple repeats (AAA -> 3A)
        // Lvl 10: Mixed (AABBBCCCC -> 2A3B4C)
        // Lvl 30: Long strings

        const len = Math.min(20, 5 + Math.floor(lvl / 3));
        let raw = "";
        let chunks = lvl < 10 ? 2 : (lvl < 20 ? 3 : 5);

        const chars = "ABC";
        for (let i = 0; i < chunks; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const count = Math.floor(Math.random() * 4) + 2; // 2-5
            raw += char.repeat(count);
        }

        // Calculate Answer (RLE)
        // Implementation of simple RLE
        let answer = "";
        let count = 1;
        for (let i = 0; i < raw.length; i++) {
            if (raw[i] === raw[i + 1]) {
                count++;
            } else {
                answer += count + raw[i];
                count = 1;
            }
        }

        return { raw, answer };
    }
};
