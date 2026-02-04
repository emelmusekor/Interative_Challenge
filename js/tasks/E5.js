
// E5 - 이어달리기 전략
const E5_Data = {
    type: "ALLOCATION",
    title: "이어달리기 전략",
    desc: "가장 빠른 주자를 앵커(마지막)에 배치하세요.",
    mission: "",
    items: ["거북이(느림)", "토끼(중간)", "다람쥐(중간)", "치타(빠름)"],
    
    slots: ["1번", "2번", "3번", "4번(앵커)"],
    
    answer: {"4번(앵커)": "치타(빠름)"},
    
    
    
    
    
    
};

class TaskE5 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.data = E5_Data;
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
        const wrapper = document.createElement('div');
        wrapper.className = 'alloc-wrapper';
        
        // Source
        const source = document.createElement('div');
        source.className = 'alloc-source';
        this.data.items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'alloc-item';
            el.draggable = true;
            el.innerText = item;
            el.id = 'item-'+item;
            el.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text', item);
            });
            source.appendChild(el);
        });
        
        // Slots
        const slotsDiv = document.createElement('div');
        slotsDiv.className = 'alloc-slots';
        this.data.slots.forEach(sName => {
            const slot = document.createElement('div');
            slot.className = 'alloc-slot';
            slot.innerHTML = `<div class='slot-title'>${sName}</div>`;
            slot.dataset.name = sName;
            
            slot.addEventListener('dragover', e => { e.preventDefault(); slot.classList.add('dragover'); });
            slot.addEventListener('dragleave', () => slot.classList.remove('dragover'));
            slot.addEventListener('drop', e => {
                e.preventDefault();
                slot.classList.remove('dragover');
                const data = e.dataTransfer.getData('text');
                
                // Allow logic
                if(!this.data.multi_alloc) {
                    // Single item per slot? 
                    // Remove existing if any
                    const existing = slot.querySelector('.alloc-item');
                    if(existing) source.appendChild(existing); 
                }
                
                // Move element
                # Find original everywhere
                const el = document.getElementById('item-'+data);
                if(el) slot.appendChild(el);
                
                this.check();
            });
            slotsDiv.appendChild(slot);
        });
        
        wrapper.appendChild(source);
        wrapper.appendChild(slotsDiv);
        this.container.appendChild(wrapper);
    }
    
    check() {
        const slots = document.querySelectorAll('.alloc-slot');
        let correct = true;
        let set_items = 0;
        
        slots.forEach(s => {
            const sName = s.dataset.name;
            const itemEls = s.querySelectorAll('.alloc-item');
            const items = [...itemEls].map(e => e.innerText);
            set_items += items.length;
            
            const ans = this.data.answer[sName];
            
            if(Array.isArray(ans)) {
                // Multi check (C2)
                if(items.length !== ans.length) correct = false;
                else {
                    items.sort(); ans.sort();
                    if(JSON.stringify(items) !== JSON.stringify(ans)) correct = false;
                }
            } else {
                // Single check
                if(items.length !== 1 || items[0] !== ans) correct = false;
            }
        });
        
        const totalItems = this.data.items.length;
        if(set_items === totalItems && correct) this.success();
    }

    success() {
        const msg = document.getElementById('success-msg');
        if(msg) msg.style.display = 'block';
    }
}

window.onload = () => {
    new TaskE5();
};
