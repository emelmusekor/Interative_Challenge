class TaskB2 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.init();
    }
    init() {
        this.container.innerHTML = `
            <div style="text-align:center;">
                <h2>📝 문제 분해 (Decomposition)</h2>
                <div style="margin:10px;">
                    Level: <span id="lvl-display">1</span>
                    <button id="new-btn">🔄 새 작전</button>
                    <button id="help-btn">?</button>
                </div>
            </div>
            
            <div id="tree-view" style="width:100%; max-width:600px; margin:0 auto; background:white; padding:20px; border-radius:10px; border:1px solid #ccc;">
                <!-- Tree rendered here -->
            </div>
            
            <div style="text-align:center; margin-top:20px;">
                <button id="complete-btn" style="padding:10px 30px; background:#00b894; color:white; border:none; font-size:16px; border-radius:5px; cursor:pointer;" disabled>완료 검사</button>
            </div>
        `;

        document.getElementById('new-btn').onclick = () => this.loadLevel(this.level || 1);
        document.getElementById('help-btn').onclick = () => this.showHelp();
        document.getElementById('complete-btn').onclick = () => this.check();

        this.loadLevel(1);
    }

    showHelp() {
        alert("큰 문제를 작은 문제로 쪼개세요.\n하위 항목(자식)을 모두 완료해야 상위 항목(부모)을 완료할 수 있습니다.");
    }

    loadLevel(lvl) {
        this.level = lvl;
        document.getElementById('lvl-display').innerText = lvl;
        const data = B2_LEVELS.generate(lvl);
        this.root = data.root;
        this.renderTree();
    }

    // Recursive Render
    renderTree() {
        const view = document.getElementById('tree-view');
        view.innerHTML = '';
        view.appendChild(this.createNodeEl(this.root, 0));
        this.updateStatus();
    }

    createNodeEl(node, depth) {
        const div = document.createElement('div');
        div.style.marginLeft = (depth * 20) + 'px';
        div.style.margin = "5px 0 5px " + (depth * 30) + "px";

        const isLeaf = node.children.length === 0;
        const icon = isLeaf ? (node.checked ? '✅' : '⬜') : (this.allChildrenChecked(node) ? '📂 (완료)' : '📁');

        // Auto-check parent logic?
        // Game Logic: User can only check LEAF nodes directly. 
        // Parents get checked automatically if all children are checked.

        let labelColor = isLeaf ? (node.checked ? '#00b894' : '#2d3436') : '#0984e3';

        div.innerHTML = `
            <div style="cursor:pointer; font-size:18px; color:${labelColor}; user-select:none;" class="node-row" data-id="${node.id}">
                ${icon} ${node.label}
            </div>
        `;

        div.querySelector('.node-row').onclick = () => {
            if (isLeaf) {
                node.checked = !node.checked;
                this.renderTree();
            } else {
                // Fold? Maybe later.
            }
        };

        node.children.forEach(c => {
            div.appendChild(this.createNodeEl(c, depth + 1));
        });

        return div;
    }

    allChildrenChecked(node) {
        if (node.children.length === 0) return node.checked;
        return node.children.every(c => this.allChildrenChecked(c));
    }

    updateStatus() {
        const complete = this.allChildrenChecked(this.root);
        const btn = document.getElementById('complete-btn');
        btn.disabled = !complete;
        btn.style.opacity = complete ? 1 : 0.5;
    }

    check() {
        if (this.allChildrenChecked(this.root)) {
            alert("모든 하위 작업을 완료하여 목표를 달성했습니다!");
            if (this.level < 50) this.loadLevel(this.level + 1);
        }
    }
}
window.onload = () => new TaskB2();
