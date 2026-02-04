// D5 - Toy Trader Levels
window.D5_LEVELS = {
    1: { nodes: [{ id: 'S', x: 200, y: 200, label: 'S' }, { id: 'E', x: 400, y: 200, label: 'E' }], edges: [{ u: 'S', v: 'E', cost: 5 }], start: 'S', end: 'E', optimal: 5 },
    2: { nodes: [{ id: 'S', x: 150, y: 300, label: 'S' }, { id: 'A', x: 400, y: 150, label: 'A' }, { id: 'B', x: 400, y: 450, label: 'B' }, { id: 'E', x: 650, y: 300, label: 'E' }], edges: [{ u: 'S', v: 'A', cost: 5 }, { u: 'A', v: 'E', cost: 5 }, { u: 'S', v: 'B', cost: 2 }, { u: 'B', v: 'E', cost: 3 }], start: 'S', end: 'E', optimal: 5 },
    3: { nodes: [{ id: 'S', x: 100, y: 300, label: 'S' }, { id: 'A', x: 300, y: 150, label: 'A' }, { id: 'B', x: 300, y: 450, label: 'B' }, { id: 'E', x: 600, y: 300, label: 'E' }], edges: [{ u: 'S', v: 'A', cost: 1 }, { u: 'S', v: 'B', cost: 4 }, { u: 'A', v: 'E', cost: 8 }, { u: 'B', v: 'E', cost: 4 }], start: 'S', end: 'E', optimal: 8 },
    // Levels 4-50 generated procedurally in engine if missing, or we can copy more from the old file.
    // Copying a few more for structure.
    4: { nodes: [{ id: 'S', x: 100, y: 300, label: 'S' }, { id: 'A', x: 300, y: 200, label: 'A' }, { id: 'B', x: 300, y: 400, label: 'B' }, { id: 'E', x: 600, y: 300, label: 'E' }], edges: [{ u: 'S', v: 'A', cost: 5 }, { u: 'S', v: 'B', cost: 8 }, { u: 'A', v: 'B', cost: 1 }, { u: 'A', v: 'E', cost: 10 }, { u: 'B', v: 'E', cost: 2 }], start: 'S', end: 'E', optimal: 8 }
};

// Procedural Generator for remaining levels attached to the data object
window.D5_LEVELS.generate = function (lvl) {
    if (this[lvl]) return this[lvl];

    // Simple generator for Level > 4
    const nodeCount = Math.min(15, 4 + Math.floor(lvl / 5));
    const width = 800, height = 500;
    const padding = 50;

    const nodes = [];
    nodes.push({ id: 'S', x: padding, y: height / 2, label: 'S' });
    nodes.push({ id: 'E', x: width - padding, y: height / 2, label: 'E' });

    for (let i = 0; i < nodeCount - 2; i++) {
        nodes.push({
            id: 'N' + i,
            x: padding + Math.random() * (width - 2 * padding),
            y: padding + Math.random() * (height - 2 * padding),
            label: String.fromCharCode(65 + (i % 26))
        });
    }

    // Sort by X for flow
    nodes.sort((a, b) => a.x - b.x);

    const edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
        const u = nodes[i];
        // Connect to 1-3 forward nodes
        const connections = 1 + Math.floor(Math.random() * 2);
        for (let k = 1; k <= connections; k++) {
            if (i + k < nodes.length) {
                const v = nodes[i + k];
                const dist = Math.hypot(u.x - v.x, u.y - v.y);
                const cost = Math.max(1, Math.floor(dist / 50));
                edges.push({ u: u.id, v: v.id, cost: cost });
            }
        }
    }

    // Calculate optimal (Mock)
    return { nodes, edges, start: 'S', end: 'E', optimal: 0 };
};
