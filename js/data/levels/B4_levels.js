window.B4_LEVELS = {
    generate: function (lvl) {
        // Domain: Logic AI(B) -> Debugging/Sequencing
        // Task: Reorder code blocks to make logical sense.

        const sequences = [
            {
                // Making Ramen
                blocks: ["물 끓이기", "면 넣기", "스프 넣기", "3분 기다리기", "먹기"],
                hint: "라면을 끓이는 순서를 생각해보세요."
            },
            {
                // Planting
                blocks: ["땅 파기", "씨앗 심기", "물 주기", "햇볕 쬐기", "꽃 피우기"],
                hint: "식물이 자라는 과정을 생각해보세요."
            },
            {
                // Coding simple loop
                blocks: ["i = 0", "while (i < 5)", "print(i)", "i = i + 1", "End Loop"],
                hint: "반복문의 실행 순서를 생각해보세요."
            },
            {
                // Morning Routine
                blocks: ["일어나기", "세수하기", "옷 입기", "가방 챙기기", "학교 가기"],
                hint: "아침에 학교 갈 때까지의 순서입니다."
            }
        ];

        // Pick one based on level (cyclic)
        const data = sequences[(lvl - 1) % sequences.length];

        // Create shuffled array
        let shuffled = [...data.blocks];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Return both Correct Order (for checking) and Shuffled (for display)
        return {
            correct: data.blocks,
            shuffled: shuffled,
            hint: data.hint
        };
    }
};
