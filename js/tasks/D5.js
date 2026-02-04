// D5 - 장난감 무역왕 (Toy Trader) - Final Refactor
class TaskD5 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.LevelData = (typeof D5_LEVELS !== 'undefined') ? D5_LEVELS : { generate: (l) => null };
        this.state = {
            level: 1,
            path: [],
            draggedNode: null,
            isDragging: false,
            maxLevels: 50
        };
        this.init();
    }

    init() {
        this.container.innerHTML = '';

        // UI Builder
        const wrapper = document.createElement('div');
        wrapper.style.fontFamily = "'Jua', sans-serif";
        wrapper.style.textAlign = "center";

        // Level Control Bar
        const controlBar = document.createElement('div');
        controlBar.style.margin = "0 auto 20px";
        controlBar.style.display = "flex";
        controlBar.style.justifyContent = "center";
        controlBar.style.gap = "10px";
        controlBar.style.alignItems = "center";

        controlBar.innerHTML = `
            <label style="font-size:18px;">Level: 
                <select id="level-select" style="font-size:16px; padding:5px;">
                    ${Array.from({ length: 50 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                </select>
            </label>
            <button id="new-problem-btn" style="padding:5px 15px; background:#6c5ce7; color:white; border:none; border-radius:5px; cursor:pointer;">🔄 새로운 문제</button>
            <button id="help-btn" style="padding:5px 15px; background:#fab1a0; color:white; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">?</button>
        `;

        wrapper.appendChild(controlBar);

        // Game Area
        const gameArea = document.createElement('div');
        gameArea.style.position = "relative";
        gameArea.innerHTML = `
            <div style="margin-bottom:10px;">
                <span id="msg-text" style="background:white; padding:10px 20px; border-radius:20px; border:2px solid #333; font-weight:bold;">친구 집까지 가는 최단 경로를 찾아보세요!</span>
                <span style="margin-left:20px;">비용: <b id="cost-val" style="color:#e84118;">0</b></span>
            </div>
        `;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.canvas.style.background = "white";
        this.canvas.style.borderRadius = "15px";
        this.canvas.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
        this.canvas.style.cursor = "default";

        gameArea.appendChild(this.canvas);
        wrapper.appendChild(gameArea);

        // Buttons
        const btnRow = document.createElement('div');
        btnRow.style.marginTop = "15px";
        btnRow.innerHTML = `
            <button id="reset-path-btn" style="padding:10px 20px; font-size:16px; margin-right:10px; border-radius:10px; border:1px solid #ccc; background:#fff; cursor:pointer;">다시하기</button>
            <button id="submit-btn" style="padding:10px 30px; font-size:16px; font-weight:bold; border-radius:10px; border:none; background:#00b894; color:white; cursor:pointer;">정답 확인</button>
        `;
        wrapper.appendChild(btnRow);

        this.container.appendChild(wrapper);
        this.ctx = this.canvas.getContext('2d');

        // Events
        document.getElementById('level-select').onchange = (e) => this.loadLevel(parseInt(e.target.value));
        document.getElementById('new-problem-btn').onclick = () => this.loadLevel(this.state.level); // Reload current
        document.getElementById('help-btn').onclick = () => this.showHelp();
        document.getElementById('reset-path-btn').onclick = () => this.resetPath();
        document.getElementById('submit-btn').onclick = () => this.checkWin();

        this.canvas.addEventListener('mousedown', e => this.onDown(e));
        this.canvas.addEventListener('mousemove', e => this.onMove(e));
        this.canvas.addEventListener('mouseup', e => this.onUp(e));

        this.loadLevel(1);
    }

    showHelp() {
        const modal = document.createElement('div');
        modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; justify-content:center; align-items:center; z-index:1000;";
        modal.innerHTML = `
            <div style="background:white; padding:30px; border-radius:15px; max-width:400px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.2); font-family:'Jua', sans-serif;">
                <h3 style="margin-top:0;">📖 게임 방법</h3>
                <p style="font-size:16px; line-height:1.6; color:#555;">
                    1. <b>집(🏠)</b>에서 <b>선물(🎁)</b>까지 길을 연결하세요.<br>
                    2. 연결된 길의 <b>숫자(비용) 합이 가장 작아야</b> 정답입니다.<br>
                    3. 동그라미를 클릭하여 길을 선택하세요.<br>
                    4. 선택된 길을 다시 누르면 취소됩니다.
                </p>
                <button id="close-help" style="margin-top:20px; padding:10px 25px; background:#6c5ce7; color:white; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">알겠어요!</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('close-help').onclick = () => modal.remove();
    }

    loadLevel(lvl) {
        this.state.level = lvl;
        document.getElementById('level-select').value = lvl;

        // Force Gen logic: If level <= 3, use static if desired, or force dynamic if user wants "New".
        // To handle "New Problem", we always try to generate if possible.
        // If D5_LEVELS is static only map, we can't. But we added generate() to it.

        let data = (this.LevelData.generate) ? this.LevelData.generate(lvl) : this.LevelData[lvl];

        // Fallback or static check
        if (!data && this.LevelData[lvl]) data = this.LevelData[lvl];

        if (!data) {
            alert("레벨 데이터 생성 실패");
            return;
        }

        // DEEP COPY to ensure fresh state if object is re-used
        const d = JSON.parse(JSON.stringify(data));

        this.nodes = d.nodes;
        this.edges = d.edges;
        this.startNode = d.start;
        this.endNode = d.end;
        this.optimal = d.optimal;

        // Reset game state
        this.resetPath();
    }

    resetPath() {
        this.state.path = [this.startNode];
        this.state.draggedNode = null;
        this.state.isDragging = false;

        document.getElementById('msg-text').innerText = "친구 집까지 가는 최단 경로를 찾아보세요!";
        document.getElementById('msg-text').style.background = "white";
        document.getElementById('msg-text').style.color = "black";

        this.draw();
        this.updateCost();
    }

    updateCost() {
        let cost = 0;
        const p = this.state.path;
        for (let i = 0; i < p.length - 1; i++) {
            const u = p[i], v = p[i + 1];
            const e = this.edges.find(ed => (ed.u === u && ed.v === v) || (ed.u === v && ed.v === u));
            if (e) cost += e.cost;
        }
        document.getElementById('cost-val').innerText = cost;
        return cost;
    }

    // Input Handling
    onDown(e) {
        const { x, y } = this.getPos(e);
        const hit = this.nodes.find(n => Math.hypot(n.x - x, n.y - y) < 30);
        if (hit) {
            this.state.draggedNode = hit;
            this.state.isDragging = false;
        }
    }

    onMove(e) {
        const { x, y } = this.getPos(e);
        const hit = this.nodes.find(n => Math.hypot(n.x - x, n.y - y) < 30);
        this.canvas.style.cursor = hit ? 'pointer' : 'default';

        // Dragging for UI fun (doesn't change logic)
        if (this.state.draggedNode) {
            this.state.isDragging = true;
            this.state.draggedNode.x = x;
            this.state.draggedNode.y = y;
            this.draw();
        }
    }

    onUp(e) {
        if (this.state.draggedNode && !this.state.isDragging) {
            // Clicked
            this.handleNodeClick(this.state.draggedNode);
        }
        this.state.draggedNode = null;
        this.state.isDragging = false;
        this.draw();
    }

    handleNodeClick(node) {
        const last = this.state.path[this.state.path.length - 1];

        // Undo if clicking previous
        if (this.state.path.length > 1 && node.id === this.state.path[this.state.path.length - 2]) {
            this.state.path.pop();
        } else {
            // Check connection
            const edge = this.edges.find(e => (e.u === last && e.v === node.id) || (e.u === node.id && e.v === last));
            if (edge) {
                if (!this.state.path.includes(node.id)) {
                    this.state.path.push(node.id);
                }
            }
        }
        this.updateCost();
    }

    getPos(e) {
        const r = this.canvas.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, 800, 500);

        ctx.font = "bold 16px Jua";
        ctx.textAlign = "center";

        // Edges
        this.edges.forEach(e => {
            const u = this.nodes.find(n => n.id === e.u);
            const v = this.nodes.find(n => n.id === e.v);

            // Is in path?
            let inPath = false;
            for (let i = 0; i < this.state.path.length - 1; i++) {
                if ((this.state.path[i] === e.u && this.state.path[i + 1] === e.v) || (this.state.path[i] === e.v && this.state.path[i + 1] === e.u)) inPath = true;
            }

            ctx.beginPath();
            ctx.moveTo(u.x, u.y);
            ctx.lineTo(v.x, v.y);
            ctx.lineWidth = inPath ? 8 : 4;
            ctx.strokeStyle = inPath ? "#e67e22" : "#b2bec3";
            ctx.stroke();

            // Cost Label
            const mx = (u.x + v.x) / 2, my = (u.y + v.y) / 2;
            ctx.fillStyle = "white";
            ctx.beginPath(); ctx.arc(mx, my, 12, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = "#636e72"; ctx.lineWidth = 1; ctx.stroke();
            ctx.fillStyle = "#d63031";
            ctx.fillText(e.cost, mx, my + 5);
        });

        // Nodes
        this.nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 25, 0, Math.PI * 2);
            ctx.fillStyle = (this.state.path.includes(n.id)) ? "#ffeaa7" : "white";
            if (n.id === this.startNode) ctx.fillStyle = "#55efc4";
            if (n.id === this.endNode) ctx.fillStyle = "#ff7675";
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#2d3436";
            ctx.stroke();

            ctx.fillStyle = "#2d3436";
            ctx.fillText(n.label, n.x, n.y + 5);
        });
    }

    checkWin() {
        const userCost = this.updateCost();
        const last = this.state.path[this.state.path.length - 1];

        const msg = document.getElementById('msg-text');
        if (last !== this.endNode) {
            msg.innerText = "아직 도착하지 못했어요!";
            msg.style.background = "#fab1a0";
            return;
        }

        // Heuristic check (since optimal might be 0/missing in generator)
        // If generated, we assume user found A path.
        // If optimal is provided, check it.

        if (this.optimal > 0 && userCost > this.optimal) {
            msg.innerText = `도착했지만 최단 경로는 아니에요. (내 비용: ${userCost}, 최적: ${this.optimal})`;
            msg.style.background = "#ffeaa7";
        } else {
            msg.innerText = "정답입니다! 훌륭해요! 🎉";
            msg.style.background = "#55efc4";
            // Next Level Auto?
        }
    }
}

window.onload = () => new TaskD5();
