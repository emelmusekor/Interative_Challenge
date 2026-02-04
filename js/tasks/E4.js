
// E4 - 만약에 극장
const E4_Data = {
    type: "SELECTION",
    title: "만약에 극장",
    desc: "조건: '비가 오고' AND '우산이 없다면' 결과는?",
    mission: "",
    items: ["옷이 젖는다", "멀쩡하다", "양산을 쓴다"],
    
    
    
    answer: ["옷이 젖는다"],
    
    
    
    
    mode: "single",
    
};

class TaskE4 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.data = E4_Data;
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
    new TaskE4();
};
