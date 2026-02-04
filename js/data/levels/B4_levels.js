window.B4_LEVELS = {
    generate: function (lvl) {
        // Informatics: Debugging (Syntax vs Logic)
        // Lvl 1: One obvious typo (Syntax Error)
        // Lvl 10: Logic Error (Code runs but wrong result)
        // Lvl 30: Multiple complex bugs

        const type = lvl < 10 ? 'syntax' : 'logic';

        const problems = [
            { t: 'syntax', q: 'print("Hello Worl")', a: 'print("Hello World")', hint: '철자가 틀렸어요.' },
            { t: 'syntax', q: 'if(x = 5)', a: 'if(x == 5)', hint: '비교 연산자는 == 입니다.' },
            { t: 'logic', q: 'if(hungry) eat("Rock")', a: 'if(hungry) eat("Food")', hint: '돌을 먹으면 안돼요!' },
            { t: 'logic', q: 'for(i=0; i<0; i++)', a: 'for(i=0; i<10; i++)', hint: '반복문이 실행되지 않아요.' }
        ];

        const p = problems[Math.floor(Math.random() * problems.length)];

        return {
            question: p.q,
            answer: p.a,
            hint: p.hint
        };
    }
};
