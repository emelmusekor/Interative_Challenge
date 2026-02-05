window.B2_LEVELS = {
    generate: function (lvl) {
        // Informatics: Decomposition (Divide & Conquer)
        // Scenarios vary by level

        const scenarios = [
            { title: "라면 끓이기", steps: ["물 끓이기", "면 넣기", "스프 넣기", "계란 넣기"] },
            { title: "로봇 조립", steps: ["팔 조립", "다리 조립", "몸통 연결", "머리 부착"] },
            { title: "소풍 준비", steps: ["도시락 싸기", "돗자리 챙기기", "교통편 확인"] },
            { title: "앱 개발", steps: ["기획서 작성", "디자인", "코딩", "테스트"] },
            { title: "집 청소", steps: ["환기 하기", "먼지 털기", "청소기 돌리기", "걸레질"] }
        ];

        const theme = scenarios[(lvl - 1) % scenarios.length];
        const depth = Math.min(3, 1 + Math.floor(lvl / 5)); // Depth changes every 5 levels
        const branching = Math.min(4, 2 + Math.floor(lvl / 10));

        let idCount = 0;

        // Simplified generation with meaningful labels
        const makeNode = (d, label) => {
            const node = { id: idCount++, label: label, children: [], checked: false };
            if (d > 0) {
                // If leaf logic: use sub-steps if available, else generic
                const count = (d === 1 && theme.steps.length) ? Math.min(branching, theme.steps.length) : branching;

                for (let i = 0; i < count; i++) {
                    let subLabel;
                    if (d === 1 && i < theme.steps.length) {
                        subLabel = theme.steps[i];
                    } else {
                        subLabel = `세부 단계 ${i + 1}`;
                    }
                    node.children.push(makeNode(d - 1, subLabel));
                }
            }
            return node;
        };

        const root = makeNode(depth, theme.title);

        return { root };
    }
};
