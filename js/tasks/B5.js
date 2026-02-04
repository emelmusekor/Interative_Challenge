class TaskB5 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.init();
    }
    init() {
        this.container.innerHTML = `
            <div style="text-align:center;">
                <h2>🧹 청소의 달인 (Efficiency)</h2>
                <div style="margin:10px;">
                    Level: <span id="lvl-display">1</span>
                    <button id="new-btn">🔄 새 구역</button>
                    <button id="help-btn">?</button>
                </div>
                <p>로봇들에게 청소 구역을 배분하여 <b>가장 빨리</b> 끝내세요! (가장 오래 걸리는 로봇 기준)</p>
            </div>
            
            <div id="tasks-pool" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; padding:20px; min-height:100px; background:#dfe6e9; border-radius:10px; margin-bottom:20px;">
                <!-- Tasks go here -->
            </div>
            
            <div id="workers-container" style="display:flex; justify-content:space-around; gap:20px;">
                <!-- Workers go here -->
            </div>
            
            <div style="text-align:center; margin-top:20px;">
                <h3>현재 소요 시간: <span id="max-time" style="color:#d63031;">0</span>시간</h3>
                <button id="check-btn" style="padding:10px 30px; background:#0984e3; color:white; border:none; font-size:16px; border-radius:5px; cursor:pointer;">청소 시작!</button>
            </div>
        `;

        document.getElementById('new-btn').onclick = () => this.loadLevel(this.level || 1);
        document.getElementById('help-btn').onclick = () => this.showHelp();
        document.getElementById('check-btn').onclick = () => this.check();

        this.loadLevel(1);
    }

    showHelp() {
        alert("숫자가 적힌 상자를 드래그하여 로봇에게 나누어 주세요.\n모든 로봇이 동시에 일합니다.\n일이 가장 많은 로봇이 퇴근할 때까지가 전체 소요 시간입니다.\n최대한 골고루 나누어 시간을 줄이세요!");
    }

    loadLevel(lvl) {
        this.level = lvl;
        document.getElementById('lvl-display').innerText = lvl;
        const data = B5_LEVELS.generate(lvl);
        this.tasks = data.tasks; // {cost: N}
        this.workers = Array(data.workers).fill(0).map((_, i) => ({ id: i, load: 0, items: [] }));

        this.renderPool();
        this.renderWorkers();
        this.updateTime();
    }

    renderPool() {
        const pool = document.getElementById('tasks-pool');
        pool.innerHTML = '';
        this.tasks.forEach((t, i) => {
            if (!t.assigned) {
                pool.appendChild(this.createTaskEl(t, i));
            }
        });

        // Drop zone for pool (Unassign)
        pool.ondragover = e => e.preventDefault();
        pool.ondrop = e => {
            const idx = e.dataTransfer.getData('idx');
            // Unassign logic... simplified:
            // Just reload to reset? No, dynamic drag drop needed.
            // Let's implement full drag drop later. For now simple Logic:
            // Click task to cycle through workers?
        };
    }

    createTaskEl(t, idx) {
        const el = document.createElement('div');
        el.innerText = t.cost + "h";
        el.className = 'task-box';
        el.draggable = true;
        el.ondragstart = e => {
            e.dataTransfer.setData('cost', t.cost);
            e.dataTransfer.setData('source', 'pool');
            e.target.style.opacity = 0.5;
        };
        el.style.cssText = "width:50px; height:50px; background:#fdcb6e; display:flex; justify-content:center; align-items:center; font-weight:bold; cursor:grab; border-radius:5px;";
        return el;
    }

    renderWorkers() {
        const wc = document.getElementById('workers-container');
        wc.innerHTML = '';
        this.workers.forEach(w => {
            const dim = document.createElement('div');
            dim.style.cssText = "flex:1; min-height:200px; background:#b2bec3; border-radius:10px; padding:10px; text-align:center;";
            dim.innerHTML = `<h4>🤖 로봇 ${w.id + 1}</h4><div class="load-bar" style="background:#00b894; height:10px; width:0%;"></div><div class="w-items" style="display:flex; flex-wrap:wrap; gap:5px; margin-top:10px;"></div>`;

            // Drop logic
            dim.ondragover = e => e.preventDefault();
            dim.ondrop = e => {
                const cost = parseInt(e.dataTransfer.getData('cost'));
                // Visual only assignment for simplicity in this rapid proto
                // Real logic needs state update
                this.assignTask(w.id, cost); // Mock
            };

            wc.appendChild(dim);
        });
    }

    assignTask(wid, cost) {
        // Find task in pool and move it
        // This requires tracking. Since drag drop is complex, let's use Click-to-Assign for stability.
    }

    // Redo Render with Click Logic for Stability
    renderPoolClick() {
        const pool = document.getElementById('tasks-pool');
        pool.innerHTML = '';
        this.tasks.forEach((t, i) => {
            const el = document.createElement('div');
            el.innerText = t.cost + "h";
            el.style.cssText = "width:50px; height:50px; background:#fdcb6e; display:flex; justify-content:center; align-items:center; font-weight:bold; cursor:pointer; border-radius:5px;";

            // Click to assign to next worker (Round Robin)
            el.onclick = () => {
                // Open modal or just cycle?
                // Simple: Cycle workers
                t.worker = (t.worker !== undefined ? t.worker + 1 : 0);
                if (t.worker >= this.workers.length) t.worker = undefined; // Back to pool
                this.updateState();
            };

            if (t.worker === undefined) pool.appendChild(el);
        });
    }

    updateState() {
        // Clear workers loads
        this.workers.forEach(w => { w.load = 0; w.items = []; });

        // Distribute
        this.tasks.forEach(t => {
            if (t.worker !== undefined) {
                this.workers[t.worker].load += t.cost;
                this.workers[t.worker].items.push(t);
            }
        });

        this.renderPoolClick();
        this.renderWorkersState();
        this.updateTime();
    }

    renderWorkersState() {
        const wc = document.getElementById('workers-container');
        wc.innerHTML = '';
        this.workers.forEach(w => {
            const dim = document.createElement('div');
            dim.style.cssText = "flex:1; min-height:200px; background:#b2bec3; border-radius:10px; padding:10px; text-align:center;";

            let itemHtml = '';
            w.items.forEach(t => {
                itemHtml += `<div style="display:inline-block; width:30px; height:30px; background:#ffeaa7; margin:2px; line-height:30px; border-radius:3px;">${t.cost}</div>`;
            });

            dim.innerHTML = `<h4>🤖 로봇 ${w.id + 1} (${w.load}h)</h4>
            <div style="background:white; border-radius:5px; height:10px; width:100%; overflow:hidden;"><div style="background:#00b894; height:100%; width:${Math.min(100, w.load * 5)}%;"></div></div>
            <div style="margin-top:10px;">${itemHtml}</div>`;

            // Click worker to return last item to pool?
            dim.onclick = () => {
                if (w.items.length > 0) {
                    const last = w.items[w.items.length - 1];
                    last.worker = undefined;
                    this.updateState();
                }
            };

            wc.appendChild(dim);
        });
    }

    updateTime() {
        const max = Math.max(...this.workers.map(w => w.load));
        document.getElementById('max-time').innerText = max;
    }

    check() {
        // Optimal? simple heuristic: sum/workers <= max <= sum/workers + max_item
        // Hard to verify specific optimal perfectly without solver, but we can check if it's "Good Enough" or "Balanced".
        // Or comparing to simple average.

        const loads = this.workers.map(w => w.load);
        const max = Math.max(...loads);
        const min = Math.min(...loads);

        // If difference between max and min is small, it's efficient.
        if (document.getElementById('tasks-pool').children.length > 0) {
            alert("아직 할 일이 남았습니다!");
            return;
        }

        if (max - min <= 2) {
            alert("훌륭합니다! 효율적으로 분배했습니다.");
            if (this.level < 50) this.loadLevel(this.level + 1);
        } else {
            alert("일이 한쪽으로 몰려있습니다. 더 골고루 나누세요!");
        }
    }
}
// Override Init for safety
TaskB5.prototype.init = function () {
    this.container.innerHTML = `
        <div style="text-align:center;">
            <h2>🧹 청소의 달인 (Efficiency)</h2>
            <div style="margin:10px;">
                Level: <span id="lvl-display">1</span>
                <button id="new-btn">🔄 재시작</button>
                <button id="help-btn">?</button>
            </div>
            <p>상자를 클릭하여 로봇에게 보내세요. (로봇 클릭 시 반환)</p>
        </div>
        <div id="tasks-pool" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; padding:20px; min-height:100px; background:#dfe6e9; border-radius:10px; margin-bottom:20px;"></div>
        <div id="workers-container" style="display:flex; justify-content:space-around; gap:20px;"></div>
        <div style="text-align:center; margin-top:20px;">
            <h3>전체 소요 시간: <span id="max-time" style="color:#d63031;">0</span>시간</h3>
            <button id="check-btn" style="padding:10px 30px; background:#0984e3; color:white; border:none; border-radius:5px; cursor:pointer;">검사</button>
        </div>
    `;
    document.getElementById('new-btn').onclick = () => this.loadLevel(this.level || 1);
    document.getElementById('help-btn').onclick = () => alert("일을 골고루 나누어 전체 시간을 줄이세요.");
    document.getElementById('check-btn').onclick = () => this.check();
    this.loadLevel(1);
    this.renderPoolClick = this.renderPoolClick; // Bind
};

window.onload = () => new TaskB5();
