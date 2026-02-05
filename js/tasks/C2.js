// C2 - Smart Sorter - Refactor
class TaskC2 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div style="text-align:center; padding:10px;">
                <h2>🔄 스마트 분류기 (Smart Sorter)</h2>
                Level: <input type="number" id="lvl-input" min="1" max="50" value="1" style="width:50px; text-align:center;">
                <button id="regen-btn" style="margin-left:10px;">🔄 초기화</button>
            </div>
            <div id="game-stage" style="position:relative; width:600px; height:400px; background:#222; margin:0 auto; border-radius:10px; overflow:hidden;">
                <!-- Canvas Overlay -->
                <canvas id="sim-canvas" width="600" height="400"></canvas>
            </div>
            <div style="text-align:center; margin-top:10px;">
                <button id="start-btn" style="padding:10px 40px; font-size:18px; font-weight:bold; background:#e17055; color:white; border:none; cursor:pointer;">START</button>
                <p style="color:#666;">게이트를 클릭하여 경로를 바꾸세요!</p>
            </div>
        `;

        this.canvas = document.getElementById('sim-canvas');
        this.ctx = this.canvas.getContext('2d');

        document.getElementById('lvl-input').onchange = (e) => {
            const val = parseInt(e.target.value);
            if (val >= 1 && val <= 50) this.loadLevel(val);
        };
        document.getElementById('regen-btn').onclick = () => this.loadLevel(this.level || 1);
        document.getElementById('start-btn').onclick = () => this.toggle();
        this.canvas.onclick = (e) => this.onClick(e);

        this.loadLevel(1);
    }

    loadLevel(lvl) {
        this.level = lvl;
        const inp = document.getElementById('lvl-input');
        if (inp) inp.value = lvl;
        this.playing = false;
        document.getElementById('start-btn').innerText = "START";

        this.score = 0;
        this.goal = 5 + lvl;

        // Entites
        this.packets = [];
        this.gates = [
            { x: 300, y: 120, dir: -1 }, // Root
            { x: 150, y: 250, dir: 1 },
            { x: 450, y: 250, dir: -1 }
        ];

        this.bins = [
            { x: 75, y: 360, color: '#ff7675', type: 0 },
            { x: 225, y: 360, color: '#74b9ff', type: 1 },
            { x: 375, y: 360, color: '#55efc4', type: 2 },
            { x: 525, y: 360, color: '#ffeaa7', type: 3 }
        ];

        this.draw();
    }

    toggle() {
        this.playing = !this.playing;
        document.getElementById('start-btn').innerText = this.playing ? "PAUSE" : "RESUME";
        if (this.playing) this.loop();
    }

    loop() {
        if (!this.playing) return;

        // Spawn
        if (Math.random() < 0.02 + (this.level * 0.001)) {
            this.packets.push({
                x: 300, y: 0,
                vx: 0, vy: 2 + (this.level * 0.1),
                type: Math.floor(Math.random() * 4),
                active: true
            });
        }

        // Update
        this.packets.forEach(p => {
            if (!p.active) return;
            p.y += p.vy;
            p.x += p.vx;

            // Gate Logic
            this.gates.forEach(g => {
                if (Math.abs(p.y - g.y) < 5 && Math.abs(p.x - g.x) < 10) {
                    p.vx = g.dir * 2; // Deflect
                }
            });

            // Bin Logic
            if (p.y > 350) {
                // Check bin proximity
                let caught = false;
                this.bins.forEach(b => {
                    if (Math.abs(p.x - b.x) < 30) {
                        if (b.type === p.type) this.score++;
                        else this.score--; // Penalty
                        caught = true;
                    }
                });
                p.active = false;
            }
        });

        this.draw();

        requestAnimationFrame(() => this.loop());
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, 600, 400); // Clear

        // Gates
        this.gates.forEach(g => {
            // Draw Pivot
            ctx.fillStyle = '#b2bec3';
            ctx.beginPath(); ctx.arc(g.x, g.y, 15, 0, Math.PI * 2); ctx.fill();

            // Draw Lever
            ctx.beginPath();
            ctx.moveTo(g.x, g.y);
            ctx.lineTo(g.x + (g.dir * 40), g.y + 40);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 6;
            ctx.stroke();

            // Draw Arrow hint
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '12px Arial';
            ctx.fillText(g.dir > 0 ? "R" : "L", g.x - 5, g.y - 20);
        });

        // Bins
        this.bins.forEach(b => {
            ctx.fillStyle = b.color;
            ctx.fillRect(b.x - 30, b.y, 60, 40);
        });

        // Packets
        this.packets.forEach(p => {
            if (!p.active) return;
            ctx.fillStyle = this.bins[p.type].color;
            ctx.beginPath(); ctx.arc(p.x, p.y, 8, 0, Math.PI * 2); ctx.fill();
        });

        // Score
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${this.score} / ${this.goal}`, 10, 30);
    }

    onClick(e) {
        const r = this.canvas.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        this.gates.forEach(g => {
            // Increased Hit Radius
            if (Math.hypot(g.x - x, g.y - y) < 50) {
                g.dir *= -1;
                this.draw();
            }
        });
    }
}
window.onload = () => new TaskC2();
