
// E1 - 날씨 데이터 판단
const E1_Data = {
    type: "SELECTION",
    title: "날씨 데이터 판단",
    desc: "현재 데이터를 보고 날씨를 예측하세요.",
    mission: "[데이터] 습도: 95%, 구름: 짙은 회색, 바람: 강함",
    items: ["맑음 ☀️", "폭우 ☔", "눈 ❄️"],
    
    
    
    answer: ["폭우 ☔"],
    
    
    
    
    mode: "single",
    
};

class TaskE1 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.data = E1_Data;
        this.state = {};
        this.init();
    }

    init() {
        // Setup Header
        document.getElementById('task-title').innerText = this.data.title;
        document.getElementById('task-desc').innerText = this.data.desc;
        if(this.data.mission) {
            const m = document.createElement('div');
            m.className = 'mission-box';
            m.innerText = this.data.mission;
            document.getElementById('task-desc').appendChild(m);
        }
        if(this.data.hint) {
             const h = document.createElement('div');
             h.className = 'hint-text';
             h.innerText = this.data.hint;
             this.container.appendChild(h);
        }
        
        this.render();
    }

    render() {
        const wrap = document.createElement('div');
        wrap.className = 'selection-container';
        
        this.state.selected = [];
        this.data.items.forEach(item => {
            const btn = document.createElement('div');
            btn.className = 'select-item';
            btn.innerText = item;
            btn.onclick = () => {
                
                // Single Select
                wrap.querySelectorAll('.select-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.selected = [item];
                
                this.check();
            };
            wrap.appendChild(btn);
        });
        this.container.appendChild(wrap);
    }
    
    check() {
        const user = new Set(this.state.selected);
        const ans = new Set(this.data.answer);
        if(user.size !== ans.size) return;
        for(let a of ans) if(!user.has(a)) return;
        this.success();
    }

    success() {
        const msg = document.getElementById('success-msg');
        if(msg) msg.style.display = 'block';
    }
}

window.onload = () => {
    new TaskE1();
};
