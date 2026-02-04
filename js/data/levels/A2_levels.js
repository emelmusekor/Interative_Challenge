// A2 Galaxy Zoo Levels
window.A2_LEVELS = {
    generate: function (lvl) {
        // Procedural Rule Generation
        const features = ['color', 'eyes', 'horns', 'mouth'];
        const ruleFeature = features[Math.floor(Math.random() * features.length)];

        // Increase difficulty?
        // Maybe ensure colors are more similar in higher levels?
        return { ruleFeature };
    }
};
