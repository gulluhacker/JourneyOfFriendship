// ======================================
// Scene Navigation
// ======================================

const scenes = document.querySelectorAll(".scene");
const nextBtns = document.querySelectorAll(".nextBtn");
const startBtn = document.getElementById("startBtn");

let currentScene = 0;

function showScene(index){

scenes.forEach(scene=>{
scene.classList.remove("active");
});

scenes[index].classList.add("active");

}

function nextScene(){

if(currentScene < scenes.length-1){

currentScene++;

showScene(currentScene);

}

}

if(startBtn){
startBtn.addEventListener("click",nextScene);
}

nextBtns.forEach(btn=>{
btn.addEventListener("click",nextScene);
});


// ======================================
// Music Control
// ======================================

const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("music");

let playing = false;

musicBtn.addEventListener("click",()=>{

if(!playing){

music.play();

musicBtn.innerHTML = "🔇 Stop";

playing = true;

}else{

music.pause();

musicBtn.innerHTML = "🎵 Music";

playing = false;

}

});


// ======================================
// Three.js Scene
// ======================================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas:document.querySelector("#bg"),
alpha:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
window.devicePixelRatio
);

camera.position.z = 5;


// ======================================
// Stars
// ======================================

function addStar(){

const geometry =
new THREE.SphereGeometry(
0.08,
12,
12
);

const material =
new THREE.MeshBasicMaterial({
color:0xffffff
});

const star =
new THREE.Mesh(
geometry,
material
);

const [x,y,z] =
Array(3)
.fill()
.map(()=>
THREE.MathUtils.randFloatSpread(150)
);

star.position.set(x,y,z);

scene.add(star);

}

Array(1200)
.fill()
.forEach(addStar);


// ======================================
// Crystal Heart
// ======================================

const heartGeometry =
new THREE.OctahedronGeometry(
1.4
);

const heartMaterial =
new THREE.MeshBasicMaterial({
color:0xff4d88,
wireframe:true
});

const heart =
new THREE.Mesh(
heartGeometry,
heartMaterial
);

heart.position.set(
0,
0,
-12
);

scene.add(heart);


// ======================================
// Floating Crystals
// ======================================

const crystals = [];

for(let i=0;i<15;i++){

const geo =
new THREE.OctahedronGeometry(
0.25
);

const mat =
new THREE.MeshBasicMaterial({
color:0xa855f7,
wireframe:true
});

const crystal =
new THREE.Mesh(
geo,
mat
);

crystal.position.set(
(Math.random()-0.5)*25,
(Math.random()-0.5)*25,
(Math.random()-0.5)*25
);

scene.add(crystal);

crystals.push(crystal);

}


// ======================================
// Floating Hearts
// ======================================

function createHeart(){

const heartDiv =
document.createElement("div");

heartDiv.innerHTML = "💖";

heartDiv.style.position="fixed";
heartDiv.style.left=Math.random()*100+"vw";
heartDiv.style.bottom="-50px";
heartDiv.style.fontSize=
(20+Math.random()*20)+"px";

heartDiv.style.pointerEvents="none";
heartDiv.style.zIndex="999";

document.body.appendChild(
heartDiv
);

let pos = 0;

const move = setInterval(()=>{

pos += 2;

heartDiv.style.bottom=
pos+"px";

heartDiv.style.opacity=
1-(pos/800);

if(pos>800){

clearInterval(move);

heartDiv.remove();

}

},20);

}

setInterval(createHeart,1500);


// ======================================
// Shooting Stars
// ======================================

function createShootingStar(){

const star =
document.createElement("div");

star.style.position="fixed";

star.style.width="120px";
star.style.height="2px";

star.style.background="white";

star.style.boxShadow=
"0 0 20px white";

star.style.left="-150px";

star.style.top=
Math.random()*40+"vh";

star.style.transform=
"rotate(-25deg)";

star.style.zIndex="1";

document.body.appendChild(star);

let x=-150;

const shoot=setInterval(()=>{

x+=15;

star.style.left=x+"px";

if(
x>window.innerWidth+200
){

clearInterval(shoot);

star.remove();

}

},10);

}

setInterval(
createShootingStar,
5000
);


// ======================================
// Gift Animation
// ======================================

const gift =
document.querySelector(".gift");

if(gift){

gift.addEventListener(
"click",
()=>{

gift.innerHTML="💖";

gift.style.transform=
"scale(1.3)";

setTimeout(()=>{

gift.style.transform=
"scale(1)";

},600);

});
}


// ======================================
// Fireworks Finale
// ======================================

function createSpark(){

if(currentScene !== 6) return;

const spark =
document.createElement("div");

spark.innerHTML="✨";

spark.style.position="fixed";

spark.style.left=
Math.random()*100+"vw";

spark.style.top=
Math.random()*100+"vh";

spark.style.fontSize=
(10+Math.random()*20)+"px";

spark.style.pointerEvents="none";

spark.style.zIndex="999";

document.body.appendChild(
spark
);

setTimeout(()=>{
spark.remove();
},1000);

}

setInterval(
createSpark,
150
);


// ======================================
// Camera Motion
// ======================================

let angle = 0;


// ======================================
// Animation Loop
// ======================================

function animate(){

requestAnimationFrame(
animate
);

angle += 0.0015;

camera.position.x =
Math.sin(angle)*1.5;

camera.lookAt(
scene.position
);

heart.rotation.x += 0.01;
heart.rotation.y += 0.01;

crystals.forEach(c=>{

c.rotation.x += 0.01;
c.rotation.y += 0.01;

});

renderer.render(
scene,
camera
);

}

animate();


// ======================================
// Resize Support
// ======================================

window.addEventListener(
"resize",
()=>{

camera.aspect=
window.innerWidth/
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});
