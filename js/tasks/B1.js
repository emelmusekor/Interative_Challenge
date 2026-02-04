class TaskB1 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.init();
    }
    init() {
        this.container.innerHTML = `
            <div style="text-align:center;">
                <h2>🥘 요리 순서 맞추기 (Sequence)</h2>
                <div style="margin:10px;">
                    Level: <span id="lvl-display">1</span>
                    <button id="new-btn">🔄 새 문제</button>
                    <button id="help-btn">?</button>
                </div>
                <p>순서가 뒤죽박죽입니다! 올바른 순서대로 나열해주세요.</p>
            </div>
            
            <div id="sort-container" style="width:300px; margin:0 auto; padding:10px; background:#f1f2f6; min-height:300px; border-radius:10px;">
                <!-- Draggable Items -->
            </div>
            
            <div style="text-align:center; margin-top:20px;">
                <button id="check-btn" style="padding:10px 30px; background:#6c5ce7; color:white; border:none; font-size:16px; border-radius:5px; cursor:pointer;">요리 시작!</button>
            </div>
        `;

        document.getElementById('new-btn').onclick = () => this.loadLevel(this.level || 1);
        document.getElementById('help-btn').onclick = () => this.showHelp();
        document.getElementById('check-btn').onclick = () => this.check();

        this.loadLevel(1);
    }

    showHelp() {
        alert("카드를 드래그하여 위아래 순서를 바꾸세요.\n맨 위가 첫 번째, 맨 아래가 마지막 단계입니다.");
    }

    loadLevel(lvl) {
        this.level = lvl;
        document.getElementById('lvl-display').innerText = lvl;
        const data = B1_LEVELS.generate(lvl);
        this.items = data.items;
        this.correctOrder = data.correctOrder;

        const list = document.getElementById('sort-container');
        list.innerHTML = '';
        this.items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'sort-item';
            el.draggable = true;
            el.dataset.id = item.id;
            el.innerText = item.t;
            el.style.cssText = "background:white; margin:5px 0; padding:15px; border-radius:5px; border:1px solid #ccc; cursor:grab; text-align:center; font-weight:bold;";

            // Drag Events
            el.ondragstart = (e) => { e.dataTransfer.setData('text/plain', e.target.dataset.id); e.target.classList.add('dragging'); };
            el.ondragend = (e) => { e.target.classList.remove('dragging'); };

            list.appendChild(el);
        });

        list.ondragover = (e) => {
            e.preventDefault();
            const afterElement = this.getDragAfterElement(list, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                list.appendChild(draggable);
            } else {
                list.insertBefore(draggable, afterElement);
            }
        };
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.sort-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    check() {
        const currentOrder = [...document.querySelectorAll('.sort-item')].map(el => el.dataset.id);
        if (JSON.stringify(currentOrder) === JSON.stringify(this.correctOrder)) {
            alert("맛있는 요리가 완성되었습니다! 정답!");
            if (this.level < 50) this.loadLevel(this.level + 1);
        } else {
            alert("순서가 이상합니다... 라면을 끓이기도 전에 먹을 순 없요!");
        }
    }
}
window.onload = () => new TaskB1();
