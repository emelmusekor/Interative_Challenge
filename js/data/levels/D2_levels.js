window.D2_LEVELS = {
    generate: function (lvl) {
        // Informatics: Tree Structure & Hierarchy
        // Lvl 1: Depth 2 (Grandpa -> Pa -> Me)
        // Lvl 10: Depth 3

        const depth = lvl < 10 ? 2 : (lvl < 25 ? 3 : (lvl < 40 ? 4 : 5));

        // Build Tree
        let id = 1;
        const root = { id: id++, name: "할아버지", items: [] };

        // Add children
        const addChildren = (node, d) => {
            if (d === 0) return;
            // Branching factor: 2 to 3 children
            const count = (lvl > 20 && Math.random() > 0.5) ? 3 : 2;
            for (let i = 0; i < count; i++) {
                const child = { id: id++, name: "가족 " + id, items: [] };
                node.items.push(child);
                addChildren(child, d - 1);
            }
        };
        addChildren(root, depth);

        // Relationship Logic
        // Types: Parent, Child, Sibling
        let qType = 'child';
        if (lvl > 10) qType = 'parent';
        if (lvl > 20) qType = Math.random() > 0.5 ? 'parent' : 'sibling';

        // Helper
        const getAllNodes = (n) => {
            let list = [n];
            n.items.forEach(c => list = list.concat(getAllNodes(c)));
            return list;
        };
        const allNodes = getAllNodes(root);

        // Assign Parents
        const assignParent = (n, p) => {
            n.parent = p;
            n.items.forEach(c => assignParent(c, n));
        };
        assignParent(root, null);

        let subject, answerName, qText;

        if (qType === 'parent') {
            const valid = allNodes.filter(n => n.parent !== null);
            subject = valid[Math.floor(Math.random() * valid.length)];
            answerName = subject.parent.name;
            qText = `${subject.name}의 **부모님**(상위 노드)은 누구인가요?`;
        } else if (qType === 'sibling') {
            const valid = allNodes.filter(n => n.parent && n.parent.items.length > 1);
            if (valid.length === 0) {
                qType = 'child';
            } else {
                subject = valid[Math.floor(Math.random() * valid.length)];
                const siblings = subject.parent.items.filter(x => x.id !== subject.id);
                // Any sibling is valid
                answerName = siblings.map(s => s.name);
                qText = `${subject.name}의 **형제/자매**를 찾으세요.`;
            }
        }

        if (qType === 'child') {
            const valid = allNodes.filter(n => n.items.length > 0);
            subject = valid[Math.floor(Math.random() * valid.length)];
            // Any child is valid
            answerName = subject.items.map(c => c.name);
            qText = `${subject.name}의 **자식**(하위 노드)을 찾으세요.`;
        }

        return { root, targetName: answerName, question: qText };
    }
};
