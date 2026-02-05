class TaskE1 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.init();
    }
    init() {
        this.container.innerHTML = `
            <div style="text-align:center;">
                <h2>💡 비트 켜기 (Binary)</h2>
                <div style="margin:10px;">
                    Level: <input type="number" id="lvl-input" min="1" max="50" value="1" style="width:50px; text-align:center;">
                    <button id="new-btn">🔄 새 숫자</button>
                    <button id="help-btn">?</button>
                </div>
            </div>
            
            <div style="text-align:center; margin-top:30px;">
                <div style="font-size:20px; margin-bottom:10px;">목표 숫자</div>
                <div id="target-num" style="font-size:60px; font-weight:bold; color:#0984e3;">0</div>
            </div>
            
            <div id="bulb-container" style="display:flex; justify-content:center; gap:10px; margin-top:30px; flex-wrap:wrap;">
                <!-- Bulbs -->
            </div>
            
            <div style="text-align:center; margin-top:20px;">
                <h3>현재 값: <span id="current-val" style="color:#e17055;">0</span></h3>
                <button id="check-btn" style="padding:10px 30px; background:#00cec9; color:white; border:none; border-radius:5px; font-size:18px; margin-top:20px; cursor:pointer;">확인</button>
            </div>
        `;

        document.getElementById('new-btn').onclick = () => this.loadLevel(this.level || 1);
        document.getElementById('help-btn').onclick = () => this.showHelp();
        document.getElementById('check-btn').onclick = () => this.check();
        document.getElementById('lvl-input').onchange = (e) => {
            const val = parseInt(e.target.value);
            if (val >= 1 && val <= 50) this.loadLevel(val);
        };

        this.loadLevel(1);
    }

    showHelp() {
        alert("전구 아래의 숫자를 보세요.\n전구를 켜면 그 숫자가 더해집니다.\n목표 숫자를 만드세요!");
    }

    loadLevel(lvl) {
        this.level = lvl;
        const inp = document.getElementById('lvl-input');
        if (inp) inp.value = lvl;
        const data = E1_LEVELS.generate(lvl);
        this.bits = data.bits;
        this.target = data.target;
        this.state = Array(this.bits).fill(0);

        document.getElementById('target-num').innerText = this.target;
        this.renderBulbs();
        this.updateVal();
    }

    renderBulbs() {
        const c = document.getElementById('bulb-container');
        c.innerHTML = '';

        // Render from MSB to LSB (Left to Right) ? usually. 
        // Or LSB rightmost.
        // Let's do Standard: 8 4 2 1

        for (let i = this.bits - 1; i >= 0; i--) {
            const val = Math.pow(2, i);
            const wrapper = document.createElement('div');
            wrapper.style.textAlign = 'center';

            const bulb = document.createElement('div');
            bulb.id = `bulb-${i}`;
            bulb.style.cssText = "width:60px; height:80px; background:#b2bec3; border-radius:30px 30px 10px 10px; margin:0 auto; cursor:pointer; transition:background 0.2s;";
            bulb.onclick = () => this.toggle(i);

            const label = document.createElement('div');
            label.innerText = val;
            label.style.fontSize = '18px';
            label.style.fontWeight = 'bold';

            wrapper.appendChild(bulb);
            wrapper.appendChild(label);
            c.appendChild(wrapper);
        }
    }

    toggle(idx) {
        this.state[idx] = 1 - this.state[idx];
        const el = document.getElementById(`bulb-${idx}`);
        el.style.background = this.state[idx] ? '#f1c40f' : '#b2bec3';
        el.style.boxShadow = this.state[idx] ? '0 0 20px #f1c40f' : 'none';
        this.updateVal();
    }

    updateVal() {
        let val = 0;
        for (let i = 0; i < this.bits; i++) {
            if (this.state[i]) val += Math.pow(2, i);
        }
        document.getElementById('current-val').innerText = val;
        this.currentVal = val;
    }

    check() {
        if (this.currentVal === this.target) {
            alert("정답! 이진수의 원리를 이해했군요.");
            if (this.level < 50) this.loadLevel(this.level + 1);
        } else {
            alert("숫자가 일치하지 않습니다.");
        }
    }
}
window.onload = () => new TaskE1();
