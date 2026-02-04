window.C4_LEVELS = {
    generate: function (lvl) {
        // Informatics: Logic Gates & Truthiness
        // Lvl 1: Simple True/False statements
        // Lvl 10: AND/OR Logic
        // Lvl 30: Complex NOT Logic

        const type = lvl < 10 ? 'simple' : (lvl < 25 ? 'logic' : 'complex');
        let q = "", a = true;

        if (type === 'simple') {
            const v1 = Math.floor(Math.random() * 10);
            const v2 = Math.floor(Math.random() * 10);
            const sum = v1 + v2;
            if (Math.random() > 0.5) {
                q = `${v1} + ${v2} = ${sum}`;
                a = true;
            } else {
                q = `${v1} + ${v2} = ${sum + 1}`;
                a = false;
            }
        } else if (type === 'logic') {
            // (True AND False)
            const b1 = Math.random() > 0.5;
            const b2 = Math.random() > 0.5;
            const op = Math.random() > 0.5 ? 'AND' : 'OR';

            q = `(${b1} ${op} ${b2})`;
            if (op === 'AND') a = b1 && b2;
            else a = b1 || b2;
        } else {
            // NOT (True OR False)
            const b1 = Math.random() > 0.5;
            const b2 = Math.random() > 0.5;
            q = `NOT (${b1} OR ${b2})`;
            a = !(b1 || b2);
        }

        return { q, a };
    }
};
