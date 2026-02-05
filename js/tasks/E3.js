class TaskE3 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.init();
    }
    init() {
        this.container.innerHTML = `
            <div style="text-align:center;">
                <h2>🔔 이벤트 마스터 (Event)</h2>
                <div style="margin:10px;">
                    Level: <input type="number" id="lvl-input" min="1" max="50" value="1" style="width:50px; text-align:center;">
                    <button id="start-btn">▶️ 시작</button>
                    <button id="help-btn">?</button>
                </div>
                <h3 id="instruction" style="color:#0984e3; min-height:30px;"></h3>
            </div>
            
            <div id="display-area" style="width:200px; height:200px; margin:20px auto; background:#eee; border-radius:10px; display:flex; justify-content:center; align-items:center; cursor:pointer; border:5px solid #ccc;">
                <div id="shape" style="width:100px; height:100px;"></div>
            </div>
            
            <div style="text-align:center;">
                <p id="feedback" style="font-weight:bold; height:20px;"></p>
            </div>
        `;

        document.getElementById('start-btn').onclick = () => this.loadLevel(this.level || 1);
        document.getElementById('help-btn').onclick = () => this.showHelp();
        document.getElementById('display-area').onmousedown = () => this.onClick();
        document.getElementById('lvl-input').onchange = (e) => {
            const val = parseInt(e.target.value);
            if (val >= 1 && val <= 50) this.loadLevel(val);
        };

        this.loadLevel(1);
    }

    showHelp() {
        alert("지시 사항에 맞는 상황이 발생했을 때만 박스를 클릭하세요!\n반응 속도가 중요합니다.");
    }

    loadLevel(lvl) {
        this.level = lvl;
        const inp = document.getElementById('lvl-input');
        if (inp) inp.value = lvl;
        const data = E3_LEVELS.generate(lvl);
        this.instruction = data.instruction;
        this.targetColor = data.targetColor;
        this.targetShape = data.targetShape;
        this.conditions = data.conditions;

        document.getElementById('instruction').innerText = this.instruction;
        document.getElementById('feedback').innerText = "";

        this.startGame();
    }

    startGame() {
        this.active = true;
        this.timer = setInterval(() => this.nextFrame(), 1000 - (this.level * 10)); // Speed up
    }

    nextFrame() {
        if (!this.active) return;

        // Randomly generate current state
        const colors = ['red', 'green', 'blue', 'yellow'];
        const shapes = ['circle', 'square', 'triangle'];

        this.currColor = colors[Math.floor(Math.random() * colors.length)];
        this.currShape = shapes[Math.floor(Math.random() * shapes.length)];

        const el = document.getElementById('shape');
        el.style.backgroundColor = this.currColor === 'red' ? '#ff7675' : (this.currColor === 'green' ? '#55efc4' : (this.currColor === 'blue' ? '#74b9ff' : '#ffeaa7'));
        el.style.borderRadius = this.currShape === 'circle' ? '50%' : '0%'; // Simple shape

        // Check if this was a missed target?
        // No, user clicks. If they don't click, we continute.
        // Wait, simple game: "Click NOW if match".
    }

    onClick() {
        if (!this.active) return;

        let match = false;
        if (this.conditions === 1) {
            if (this.currColor === this.targetColor) match = true;
        } else {
            if (this.currColor === this.targetColor && this.currShape === this.targetShape) match = true;
        }

        if (match) {
            clearInterval(this.timer);
            this.active = false;
            document.getElementById('feedback').style.color = 'green';
            document.getElementById('feedback').innerText = "성공! 이벤트 감지 완료.";
            if (this.level < 50) setTimeout(() => this.loadLevel(this.level + 1), 1000);
        } else {
            document.getElementById('feedback').style.color = 'red';
            document.getElementById('feedback').innerText = "실수! 조건이 맞지 않습니다.";
            // Penalty? Just continue.
        }
    }
}
window.onload = () => new TaskE3();
