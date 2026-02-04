// A2 - Galaxy Zoo - Refactor
class TaskA2 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div style="text-align:center; padding:10px;">
                <h2 style="font-family:'Jua'; color:#2d3436;">👽 외계인 분류 (Galaxy Zoo)</h2>
                <div style="margin-bottom:15px;">
                     Level: <select id="lvl-sel">
                        ${Array.from({ length: 50 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                     </select>
                     <button id="new-btn" style="margin-left:10px;">🔄 새로운 문제</button>
                     <button id="help-btn" style="margin-left:5px;">?</button>
                </div>
                <div id="game-board"></div>
            </div>
        `;

        document.getElementById('lvl-sel').onchange = (e) => this.loadLevel(parseInt(e.target.value));
        document.getElementById('new-btn').onclick = () => this.loadLevel(this.level || 1);
        document.getElementById('help-btn').onclick = () => this.showHelp();

        this.loadLevel(1);
    }

    showHelp() {
        const modal = document.createElement('div');
        modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; justify-content:center; align-items:center; z-index:1000;";
        modal.innerHTML = `
            <div style="background:white; padding:30px; border-radius:15px; max-width:400px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.2); font-family:'Jua', sans-serif;">
                <h3 style="margin-top:0;">📖 게임 방법</h3>
                <p style="font-size:16px; line-height:1.6; color:#555;">
                    1. <b>Group A</b>와 <b>Group B</b>를 관찰하세요.<br>
                    2. 두 그룹을 구분하는 <b>공통된 규칙</b>(예: 눈 개수, 뿔 유무)을 찾으세요.<br>
                    3. 아래 버튼 중 정답이라고 생각되는 규칙을 누르세요.<br>
                </p>
                <button id="close-help" style="margin-top:20px; padding:10px 25px; background:#0984e3; color:white; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">알겠어요!</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('close-help').onclick = () => modal.remove();
    }

    loadLevel(lvl) {
        this.level = lvl;
        document.getElementById('lvl-sel').value = lvl;

        // Generate Logic
        const features = ['eyes', 'horns', 'color', 'shape'];
        // Randomly pick a rule
        this.rule = features[Math.floor(Math.random() * features.length)];

        // Generate Groups
        this.renderGame();
    }

    renderGame() {
        const board = document.getElementById('game-board');
        board.innerHTML = '';

        // Determine Rule Values
        // E.g. Rule = Eyes. Group A = 1 Eye. Group B = 2 Eyes.
        // Need to ensure distinct values.

        const config = this.genConfig(this.rule);

        const flex = document.createElement('div');
        flex.style.display = 'flex';
        flex.style.justifyContent = 'space-around';
        flex.style.marginBottom = '20px';

        ['A', 'B'].forEach(grp => {
            const box = document.createElement('div');
            box.style.border = `4px solid ${grp === 'A' ? '#e17055' : '#0984e3'}`;
            box.style.borderRadius = '15px';
            box.style.padding = '15px';
            box.style.background = 'white';
            box.style.minWidth = '150px';

            box.innerHTML = `<h3 style="margin:0 0 10px 0;">Group ${grp}</h3>`;

            // Aliens
            const aliensDiv = document.createElement('div');
            aliensDiv.style.display = 'flex';
            aliensDiv.style.flexWrap = 'wrap';
            aliensDiv.style.gap = '10px';
            aliensDiv.style.justifyContent = 'center';

            for (let i = 0; i < 3; i++) {
                const alien = this.createAlien(this.rule, config[grp]);
                aliensDiv.appendChild(alien);
            }
            box.appendChild(aliensDiv);
            flex.appendChild(box);
        });

        board.appendChild(flex);

        // Options
        const opts = document.createElement('div');
        opts.innerHTML = '<h3>Q. 분류 기준은?</h3>';

        const labels = { 'eyes': '눈의 개수', 'horns': '뿔의 개수', 'color': '몸 색깔', 'shape': '얼굴 모양' };

        Object.keys(labels).forEach(k => {
            const btn = document.createElement('button');
            btn.innerText = labels[k];
            btn.style.margin = '5px';
            btn.style.padding = '10px 20px';
            btn.style.fontSize = '16px';
            btn.style.cursor = 'pointer';
            btn.onclick = () => {
                if (k === this.rule) {
                    alert("정답입니다! 👏");
                    if (this.level < 50) this.loadLevel(this.level + 1);
                } else {
                    alert("틀렸습니다. 다시 살펴보세요.");
                }
            };
            opts.appendChild(btn);
        });
        board.appendChild(opts);
    }

    genConfig(rule) {
        // Returns values for Group A and Group B based on rule
        if (rule === 'eyes') return { A: 1, B: 2 }; // Could be random: 1vs3, 2vs3
        if (rule === 'horns') return { A: 0, B: 1 };
        if (rule === 'color') return { A: '#fab1a0', B: '#74b9ff' }; // Red-ish vs Blue-ish
        if (rule === 'shape') return { A: '50%', B: '0%' }; // Circle vs Square (border-radius)
        return { A: 1, B: 2 };

        // To be truly robust, we should randomize the values too, e.g. A=Red, B=Green one time, A=Yellow B=Blue next.
        // But hardcoded contrast is safer for now.
    }

    createAlien(rule, val) {
        const el = document.createElement('div');
        el.style.width = '60px';
        el.style.height = '60px';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.border = '2px solid #333';
        el.style.fontSize = '24px';

        // Defaults
        let eyes = 1; // 1, 2, 3
        let horns = 0; // 0, 1, 2
        let color = '#a29bfe';
        let radius = '50%'; // Circle

        // Override based on rule
        if (rule === 'eyes') eyes = val;
        else eyes = 1 + Math.floor(Math.random() * 3);

        if (rule === 'horns') horns = val;
        else horns = Math.floor(Math.random() * 3);

        if (rule === 'color') color = val;
        else {
            const colors = ['#a29bfe', '#55efc4', '#ffeaa7'];
            color = colors[Math.floor(Math.random() * colors.length)];
        }

        if (rule === 'shape') radius = val;
        else radius = (Math.random() > 0.5) ? '50%' : '10px';

        // Apply Styles
        el.style.background = color;
        el.style.borderRadius = radius;

        // Content
        let content = '';
        for (let k = 0; k < eyes; k++) content += '👁️';

        // Horns visual (simplified as prepend)
        let hornStr = '';
        for (let h = 0; h < horns; h++) hornStr += '▲';

        el.innerHTML = `<div style="display:flex; flex-direction:column; align-items:center; line-height:1;"><span style="font-size:12px;">${hornStr}</span><span>${content}</span></div>`;

        return el;
    }
}
window.onload = () => new TaskA2();
