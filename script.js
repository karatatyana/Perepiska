document.addEventListener("DOMContentLoaded", function(){

const Game = {

xp:0,
level:0,
xpToNext:100,
name:"",
avatar:"",
selectedAvatar:null,

completedTopics:[],

init(){
this.initParallax();
this.initLight();
this.initSnow();
this.renderWelcome();
this.renderMenu();
},

/* ================= MENU ================= */

toggleMenu(){
let menu=document.getElementById("sideMenu");
if(menu){
menu.classList.toggle("open");
}
},

renderMenu(){

let menu=document.getElementById("sideMenu");

if(!menu){
menu=document.createElement("div");
menu.id="sideMenu";
menu.className="side-menu";
document.body.appendChild(menu);
}

menu.innerHTML=`
<div class="menu-content">
<h3>Темы курса</h3>

<div class="topic-item ${this.isCompleted('theory')?'completed':''}"
onclick="Game.goToTopic('theory')">
<span class="circle">${this.isCompleted('theory')?'✔':''}</span>
Часть 1: Основы коммуникаций на работе
</div>

<div class="topic-item ${this.isCompleted('task1')?'completed':''} ${this.isUnlocked('task1')?'':'locked'}"
onclick="Game.goToTopic('task1')">
<span class="circle">${this.isCompleted('task1')?'✔':''}</span>
Часть 2: Деловая переписка
</div>

</div>
`;
},

isCompleted(topic){
return this.completedTopics.includes(topic);
},

isUnlocked(topic){
if(topic==="theory") return true;
if(topic==="task1") return this.completedTopics.includes("theory");
return false;
},

goToTopic(topic){

if(!this.isUnlocked(topic)) return;

this.toggleMenu();

if(topic==="theory"){
this.renderTheory();
}

if(topic==="task1"){
this.renderCharacters();
}
},

/* ======================================== */

renderWelcome(){
document.getElementById("app").innerHTML=`

<div class="welcome-screen">

<h1 class="course-title">
Деловые коммуникации
</h1>

<div class="welcome-box">

<h3>Введите имя</h3>
<input type="text" id="nameInput"><br>

<h3>Выберите аватар</h3>

<div class="avatar-select">
<img src="assets/marina.png" onclick="Game.selectAvatar(this)">
<img src="assets/ivan.png" onclick="Game.selectAvatar(this)">
<img src="assets/andrey.png" onclick="Game.selectAvatar(this)">
</div>

<br>
<button onclick="Game.start()">Начать</button>

</div>
</div>
`;
},

selectAvatar(img){
document.querySelectorAll(".avatar-select img").forEach(el=>{
el.classList.remove("selected-avatar");
});
img.classList.add("selected-avatar");
this.selectedAvatar = img.src;
},

start(){
const name=document.getElementById("nameInput").value;

if(!name || !this.selectedAvatar){
alert("Введите имя и выберите аватар");
return;
}

this.name=name;
this.avatar=this.selectedAvatar;

this.activateTopbar();
this.renderTheory();
},

activateTopbar(){
document.getElementById("topbar").style.display="flex";
document.getElementById("playerName").textContent=this.name;
document.getElementById("avatar").src=this.avatar;
this.updateXPBar();
},

renderTheory(){
document.getElementById("app").innerHTML =
document.getElementById("theoryContent").innerHTML;
},

completeTheory(){

if(!this.completedTopics.includes("theory")){
this.completedTopics.push("theory");
}

this.gainXP(100);
this.renderMenu();
this.renderCharacters();
},

renderCharacters(){

if(!this.completedTopics.includes("task1")){
this.completedTopics.push("task1");
this.renderMenu();
}

document.getElementById("app").innerHTML=`

<div class="page-part-2">

<div style="padding-top:120px; text-align:center;">

<div class="part-badge" style="margin-bottom: 55px;">
ЧАСТЬ 2
</div>
<h1 style="margin-top: 60px; margin-bottom: 10px;">
Деловая переписка
</h1>
<p style="max-width:1000px; margin:0 auto 30px auto; line-height:1.6;">
Ежедневно мы переписываемся по email и в мессенджерах. Но как сделать этот обмен информацией эффективнее? Деловая переписка требует ясности, структуры и уважительного тона. Давай потренируемся и посмотрим письма твоим коллегам
</p>

<div class="characters">

<div class="card">
<img src="assets/marina.png">
<h3>Марина</h3>
<p>HR-директор</p>
</div>

<div class="card">
<img src="assets/ivan.png">
<h3>Иван</h3>
<p>Руководитель проекта</p>
</div>

<div class="card">
<img src="assets/andrey.png">
<h3>Андрей</h3>
<p>Партнёр компании</p>
</div>

</div>
</div>
</div>
`;
},

gainXP(amount){
this.xp+=amount;

if(this.xp>=this.xpToNext){
this.level++;
this.xp=0;
this.xpToNext=Math.floor(this.xpToNext*1.3);
this.showLevelUp();
}

this.updateXPBar();
},

updateXPBar(){
const percent=(this.xp/this.xpToNext)*100;
document.getElementById("xpBar").style.width=percent+"%";
document.getElementById("levelLabel").textContent="LVL "+this.level;
},

showLevelUp(){
document.getElementById("levelSound").play();
},

initParallax(){
document.addEventListener("mousemove",e=>{
const bg=document.getElementById("bg");
const x=(e.clientX/window.innerWidth-0.5)*30;
const y=(e.clientY/window.innerHeight-0.5)*30;
bg.style.transform=`translate(${x}px,${y}px)`;
});
},

initLight(){
document.addEventListener("mousemove",e=>{
const light=document.getElementById("light");
light.style.left=e.clientX+"px";
light.style.top=e.clientY+"px";
});
},

initSnow(){
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let snow=[];
for(let i=0;i<120;i++){
snow.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*1.5+0.5,
d:Math.random()*0.5
});
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="rgba(255,255,255,0.35)";
ctx.beginPath();
snow.forEach(f=>{
ctx.moveTo(f.x,f.y);
ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
});
ctx.fill();
move();
}

let angle=0;
function move(){
angle+=0.01;
snow.forEach((f,i)=>{
f.y+=Math.pow(f.d,2)+0.5;
f.x+=Math.sin(angle)*1;
if(f.y>canvas.height){
snow[i]={x:Math.random()*canvas.width,y:0,r:f.r,d:f.d};
}
});
}

setInterval(draw,33);
}

};

window.Game=Game;
Game.init();

const level = document.querySelector(".level-number");

function showLevel(number){

    if(!level) return;

    level.textContent = "LEVEL " + number;
    level.classList.add("show");

    setTimeout(()=>{
        level.classList.remove("show");
    },1500);
}

// универсальная функция открытия
function openPart(partNumber){

    showLevel(partNumber);

    setTimeout(()=>{

        // скрываем стартовый экран
        const welcome = document.querySelector(".welcome-screen");
        if(welcome) welcome.style.display = "none";

        // показываем теорию
        const theory = document.querySelector(".theory-wrapper");
        if(theory) theory.style.display = "flex";

    },1500);
}

});
