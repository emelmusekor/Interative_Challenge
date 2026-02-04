class TaskA4 {
    constructor() {
        this.container = document.getElementById('task-stage');
        this.init();
    }
    init() {
        this.container.innerHTML = `
            <div style="text-align:center;">
                <h2>⚠️ 리스크 관리: 장애물 피하기 (Risk Management)</h2>
                <div style="margin:10px;">
                    Level: <span id="lvl-display">1</span>
                    <button id="start-btn">▶️ START</button>
                    <button id="help-btn">?</button>
                </div>
                <div id="status-bar" style="height:20px; background:#ddd; width:400px; margin:0 auto; border-radius:10px; overflow:hidden;">
                    <div id="time-bar" style="width:100%; height:100%; background:#00b894; transition:width 0.1s linear;"></div>
                </div>
            </div>
            
            <div style="position:relative; width:400px; height:500px; background:#2d3436; margin:0 auto; overflow:hidden; border-radius:10px; margin-top:10px;" id="game-area">
                <div id="player" style="position:absolute; bottom:20px; left:180px; width:40px; height:40px; background:#0984e3; border-radius:50%; border:3px solid #74b9ff; transition:left 0.1s;">😀</div>
                <div id="msg" style="position:absolute; top:40%; width:100%; text-align:center; color:white; font-size:24px; display:none;">READY?</div>
            </div>
        `;

        this.area = document.getElementById('game-area');
        this.player = document.getElementById('player');
        this.pPos = 180;
        this.gameLoop = null;
        this.isGameOver = false;

        document.getElementById('start-btn').onclick = () => this.startGame(this.level || 1);
        document.getElementById('help-btn').onclick = () => this.showHelp();

        // Controls
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.move(-1);
            if (e.key === 'ArrowRight') this.move(1);
        });

        this.loadLevel(1);
    }

    showHelp() {
        alert("키보드 좌우 방향키로 이동하세요.\n내려오는 빨간 장애물을 피하세요!\n시간이 끝날 때까지 살아남으면 승리!");
    }

    move(dir) {
        if (this.isGameOver) return;
        this.pPos += dir * 20;
        if (this.pPos < 0) this.pPos = 0;
        if (this.pPos > 360) this.pPos = 360;
        this.player.style.left = this.pPos + 'px';
    }

    loadLevel(lvl) {
        this.level = lvl;
        document.getElementById('lvl-display').innerText = lvl;
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.obstacles = [];
        document.querySelectorAll('.obs').forEach(e => e.remove());
        document.getElementById('msg').style.display = 'block';
        document.getElementById('msg').innerText = "PRESS START";
    }

    startGame(lvl) {
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.isGameOver = false;
        this.data = A4_LEVELS.generate(lvl);
        this.timeLeft = this.data.duration;
        this.frame = 0;
        this.obstacles = [];
        document.querySelectorAll('.obs').forEach(e => e.remove());
        document.getElementById('msg').style.display = 'none';

        this.gameLoop = setInterval(() => this.update(), 20);
    }

    update() {
        if (this.isGameOver) return;
        this.frame++;

        // Spawn
        if (this.frame % Math.floor(this.data.spawnRate) === 0) {
            this.spawnObstacle();
        }

        // Time
        if (this.frame % 50 === 0) {
            this.timeLeft -= 1;
            const pct = (this.timeLeft / this.data.duration) * 100;
            document.getElementById('time-bar').style.width = pct + '%';
            if (this.timeLeft <= 0) this.win();
        }

        // Update Obstacles
        this.obstacles.forEach((obs, idx) => {
            obs.y += this.data.speed;
            obs.el.style.top = obs.y + 'px';

            // Defeated/Passed
            if (obs.y > 500) {
                obs.el.remove();
                this.obstacles.splice(idx, 1);
            }

            // Collision
            // Player: pPos (Left), Bottom 20 (Top 440), w40, h40
            // Obs: obs.x, obs.y, w40, h40
            if (obs.y + 40 > 440 && obs.y < 480) {
                if (obs.x < this.pPos + 40 && obs.x + 40 > this.pPos) {
                    this.gameOver();
                }
            }
        });
    }

    spawnObstacle() {
        const obs = document.createElement('div');
        obs.className = 'obs';
        const x = Math.floor(Math.random() * 9) * 40; // Align to simple grid
        obs.style.cssText = `position:absolute; top:-40px; left:${x}px; width:40px; height:40px; background:red; border-radius:5px; opacity:${this.data.opacity};`;
        this.area.appendChild(obs);
        this.obstacles.push({ el: obs, x: x, y: -40 });
    }

    gameOver() {
        this.isGameOver = true;
        clearInterval(this.gameLoop);
        alert("충돌! 위험 감지 실패!");
        this.loadLevel(this.level);
    }

    win() {
        this.isGameOver = true;
        clearInterval(this.gameLoop);
        alert("안전 확보 성공! 다음 레벨로.");
        if (this.level < 50) this.loadLevel(this.level + 1);
    }
}
window.onload = () => new TaskA4();
