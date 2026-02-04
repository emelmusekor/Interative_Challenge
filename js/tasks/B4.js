class TaskB4 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.init();
    }
    init() {
        this.container.innerHTML = `
            <div style="text-align:center;">
                <h2>🐛 디버깅 탐정 (Debugging)</h2>
                <div style="margin:10px;">
                    Level: <span id="lvl-display">1</span>
                    <button id="new-btn">🔄 새 버그</button>
                    <button id="help-btn">?</button>
                </div>
            </div>
            
            <div style="max-width:500px; margin:0 auto;">
                <div style="background:#2d3436; color:#a29bfe; padding:20px; border-radius:10px; font-family:monospace; font-size:20px; margin-bottom:10px;">
                    <div id="code-display"></div>
                </div>
                
                <input type="text" id="user-input" style="width:100%; padding:10px; font-size:18px; font-family:monospace;" placeholder="고쳐진 코드를 입력하세요">
                
                <div id="hint-box" style="margin-top:10px; color:#e17055; display:none;">힌트: <span id="hint-text"></span></div>
                
                <button id="check-btn" style="width:100%; margin-top:20px; padding:15px; background:#00b894; color:white; border:none; font-size:18px; cursor:pointer;">버그 수정!</button>
            </div>
        `;

        document.getElementById('new-btn').onclick = () => this.loadLevel(this.level || 1);
        document.getElementById('help-btn').onclick = () => this.showHelp();
        document.getElementById('check-btn').onclick = () => this.check();

        this.loadLevel(1);
    }

    showHelp() {
        alert("코드에 버그(오류)가 숨어있습니다.\n잘못된 부분을 찾아 올바르게 고쳐서 입력하세요!");
    }

    loadLevel(lvl) {
        this.level = lvl;
        document.getElementById('lvl-display').innerText = lvl;
        const data = B4_LEVELS.generate(lvl);
        this.question = data.question;
        this.answer = data.answer;
        this.hint = data.hint;

        document.getElementById('code-display').innerText = this.question;
        document.getElementById('user-input').value = this.question; // Pre-fill
        document.getElementById('hint-box').style.display = 'none';
    }

    check() {
        const val = document.getElementById('user-input').value.trim();
        if (val === this.answer) {
            alert("버그 박멸 성공! 코드가 정상 작동합니다.");
            if (this.level < 50) this.loadLevel(this.level + 1);
        } else {
            document.getElementById('hint-box').style.display = 'block';
            document.getElementById('hint-text').innerText = this.hint;
            alert("여전히 오류가 있습니다. 힌트를 확인하세요.");
        }
    }
}
window.onload = () => new TaskB4();
