var pos1x = 600;
var pos2x = 0;
var pos1y = 300;
var pos2y = 300;
var points1 = 0;
var points2 = 0;
var poslock = 0;
var audio1 = new Audio('Audio/Goal.mp3');
var audio2 = new Audio('Audio/hit.mp3');
class MovingObjectARROWS {
    constructor(element) {
        this.element = element;
        this.interval = null;
        this.keysPressed = {};
        this.init();
    }
 
    init() {
        window.addEventListener('keydown', (event) => this.startMoving(event));
        window.addEventListener('keyup', (event) => this.stopMoving(event));
        this.interval = setInterval(() => this.updatePosition(), 0.5);
    }
 
    startMoving(event) {
        this.keysPressed[event.key] = true;
    }
 
    stopMoving(event) {
        delete this.keysPressed[event.key];
    }
 
    updatePosition() {
        if (this.keysPressed['ArrowUp'] && pos1y > 0 && pos1y <= 600 && poslock == 0){
            pos1y -= 2;
        }
        if (this.keysPressed['ArrowLeft'] && pos1x > 26 && pos1x <= 600 && poslock == 0){
            pos1x -= 2;
        }
        if (this.keysPressed['ArrowRight'] && pos1x >= 26 && pos1x < 600 && poslock == 0){
            pos1x += 2;
        }
        if (this.keysPressed['ArrowDown'] && pos1y >= 0 && pos1y < 600 && poslock == 0){
            pos1y += 2;
        }
        this.element.style.transform = `translate(${pos1x}px, ${pos1y}px)`;
    }
}
class MovingObjectWASD {
    constructor(element) {
        this.element = element;
        this.x = 0;
        this.y = 300;
        this.interval = null;
        this.keysPressed = {};
        this.init();
    }
 
    init() {
        window.addEventListener('keydown', (event) => this.startMoving(event));
        window.addEventListener('keyup', (event) => this.stopMoving(event));
        this.interval = setInterval(() => this.updatePosition(), 0.5);
    }
 
    startMoving(event) {
        this.keysPressed[event.key] = true;
    }
 
    stopMoving(event) {
        delete this.keysPressed[event.key];
    }
 
    updatePosition() {
        if (this.keysPressed['w'] && pos2y > 0 && pos2y <= 600 && poslock == 0){ 
            pos2y -= 2;
        }
        if (this.keysPressed['a'] && pos2x > 0 && pos2x <= 574 && poslock == 0) {
            pos2x -= 2;
        }
        if (this.keysPressed['d'] && pos2x >= 0 && pos2x < 574 && poslock == 0) {
            pos2x += 2;
        }
        if (this.keysPressed['s'] && pos2y >= 0 && pos2y < 600 && poslock == 0){ 
            pos2y += 2;
        }
        this.element.style.transform = `translate(${pos2x}px, ${pos2y}px)`;
    }
}
class MovingObjectBALL {
    constructor(element) {
        this.element = element;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.dirx = 0;
        this.diry = 0;
        this.interval = null;
        this.init();
    }
    init() {
        this.interval = setInterval(() => this.updatePosition(), 0.5);
    }

    updatePosition() {
        var p1 = document.getElementById("score1");
        var p2 = document.getElementById("score2");
        if (((pos1x - this.x <= 50 && pos1x - this.x > 0) || (pos1x - this.x >= -50 && pos1x - this.x <= 0)) && ((pos1y - (this.y+300) <= 50 && pos1y - (this.y+300) >= 0) || (pos1y - (this.y+300) >= -50 && pos1y - (this.y+300) <= 0))){
            this.vx = -(pos1x - this.x) / 23;
            this.vy = -(pos1y- this.y-300) / 23;
            audio2.play();
            if (this.vx < 0){
                this.dirx = -1;
            }
            else this.dirx = 1;
            if (this.vy < 0){
                this.diry = -1;
            }
            else this.diry = 1;
        }
        if (((pos2x - (this.x + 600) <= 50 && pos2x - (this.x + 600) >= 0) || (pos2x - (this.x + 600) >= -50 && pos2x - (this.x + 600) <= 0)) && ((pos2y - (this.y+300) <= 50 && pos2y - (this.y+300) >= 0) || (pos2y - (this.y+300) >= -50 && pos2y - (this.y+300) <= 0))){
            this.vx = -(pos2x - this.x-600) / 23;
            this.vy = -(pos2y- this.y-300) / 23;
            audio2.play();
            if (this.vx < 0){
                this.dirx = -1;
            }
            else this.dirx = 1;
            if (this.vy < 0){
                this.diry = -1;
            }
            else this.diry = 1;
        }
        if (this.x > 598 && (this.y < 125 && this.y > -125)){
            //var newUrl = "Player2Win.html";
            //window.location.replace(newUrl);
            audio1.play();
            this.x = 300;
            this.y = 0;
            this.vx = 0;
            this.vy = 0;
            this.dirx = 0;
            this.diry = 0;
            pos1x = 600;
            pos2x = 0;
            pos1y = 300;
            pos2y = 300;
            points1++;
            p1.innerText = points1;
            const s = document.getElementById("goal");
            poslock = 1;
            s.style.visibility = 'visible';
            setTimeout(() => {
            s.style.visibility = 'hidden';
            poslock = 0;
            }, 1000);      
        }
        if (this.x < -598 && (this.y < 125 && this.y > -125)){
            //var newUrl = "Player1Win.html";
            //window.location.replace(newUrl);
            audio1.play();
            this.x = -300;
            this.y = 0;
            this.vx = 0;
            this.vy = 0;
            this.dirx = 0;
            this.diry = 0;
            pos1x = 600;
            pos2x = 0;
            pos1y = 300;
            pos2y = 300;
            points2++;
            p2.innerText = points2;
            const s = document.getElementById("goal");
            poslock = 1;
            s.style.visibility = 'visible';
            setTimeout(() => {
            s.style.visibility = 'hidden';
            poslock = 0;
            }, 1000);    
        }
        if (this.y > 300 || this.y < -300){
            this.vy = -this.vy;
            this.diry *= -1;
            
        }
        if (this.x > 600 || this.x < -600){
            this.vx = -this.vx;
            this.dirx *= -1;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.vx > -0.001 && this.vx < 0.001){
            this.vx = 0;
        }
        else{
            this.vx -= 0.001*this.dirx;
        }
        if (this.vy > -0.001 && this.vy < 0.001){
            this.vy = 0;
        }
        else{
            this.vy -= 0.001*this.diry;
        }
        console.log(this.vx , this.vy);
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const object1 = document.getElementById('character1');
    new MovingObjectARROWS(object1);
});
document.addEventListener('DOMContentLoaded', () => {
    const object2 = document.getElementById('character2');
    new MovingObjectWASD(object2);
});
document.addEventListener('DOMContentLoaded', () => {
    const object3 = document.getElementById('character3');
    new MovingObjectBALL(object3);
});
