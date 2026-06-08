// ====================================
// Scene Navigation
// ====================================

let currentScene = 1;
const totalScenes = 7;

function nextScene(){

if(currentScene < totalScenes){

document
.getElementById(`scene${currentScene}`)
.classList.remove("active");

currentScene++;

document
.getElementById(`scene${currentScene}`)
.classList.add("active");

}

}

// ====================================
// Three.js Setup
// ====================================

const scene = new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer =
new THREE.WebGLRenderer({
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


// ====================================
// Star Universe
// ====================================

function addStar(){

const geometry =
new THREE.SphereGeometry(
0.08,
16,
16
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

Array(1500)
.fill()
.forEach(addStar);


// ====================================
// Crystal Heart
// ====================================

const heartGeometry =
new THREE.OctahedronGeometry(
1.5
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


// ====================================
// Small Floating Crystals
// ====================================

const crystals = [];

for(let i=0;i<20;i++){

const geo =
new THREE.OctahedronGeometry(
0.3
);

const mat =
new THREE.MeshBasicMaterial({
color:0xa855f7,
wireframe:true
});

const crystal =
new THREE.Mesh(geo,mat);

crystal.position.set(
(Math.random()-0.5)*20,
(Math.random()-0.5)*20,
(Math.random()-0.5)*20
);

scene.add(crystal);

crystals.push(crystal);

}


// ====================================
// Floating Hearts
// ====================================

function createHeart(){

const heart =
document.createElement("div");

heart.innerHTML="💖";

heart.style.position="fixed";

heart.style.left=
Math.random()*100+"vw";

heart.style.bottom="-50px";

heart.style.fontSize=
(20+Math.random()*25)+"px";

heart.style.pointerEvents="none";

heart.style.zIndex="999";

document.body.appendChild(heart);

let pos=0;

const move=setInterval(()=>{

pos+=2;

heart.style.bottom=
pos+"px";

heart.style.opacity=
1-(pos/900);

if(pos>900){

clearInterval(move);
heart.remove();

}

},20);

}

setInterval(createHeart,1200);


// ====================================
// Shooting Stars
// ====================================

function shootingStar(){

const star =
document.createElement("div");

star.style.position="fixed";

star.style.width="120px";
star.style.height="2px";

star.style.background="white";

star.style.boxShadow=
"0 0 20px white";

star.style.left="-200px";

star.style.top=
Math.random()*40+"vh";

star.style.transform=
"rotate(-25deg)";

star.style.zIndex="2";

document.body.appendChild(star);

let x=-200;

const animateStar=
setInterval(()=>{

x+=15;

star.style.left=x+"px";

if(x>
window.innerWidth+300){

clearInterval(
animateStar
);

star.remove();

}

},10);

}

setInterval(
shootingStar,
4000
);


// ====================================
// Fireworks Finale
// ====================================

function createFirework(){

if(currentScene !== 7) return;

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

spark.style.zIndex="999";

document.body.appendChild(spark);

setTimeout(()=>{
spark.remove();
},1000);

}

setInterval(
createFirework,
100
);


// ====================================
// Camera Motion
// ====================================

let angle = 0;


// ====================================
// Animation Loop
// ====================================

function animate(){

requestAnimationFrame(
animate
);

angle += 0.001;

camera.position.x =
Math.sin(angle)*1.2;

camera.lookAt(
scene.position
);

heart.rotation.x += 0.01;
heart.rotation.y += 0.01;

crystals.forEach((c)=>{

c.rotation.x += 0.01;
c.rotation.y += 0.01;

});

renderer.render(
scene,
camera
);

}

animate();


// ====================================
// Resize
// ====================================

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
// =================================
// Music
// =================================

const musicBtn =
document.getElementById("musicBtn");

const music =
document.getElementById("music");

let playing=false;

musicBtn.addEventListener(
"click",
()=>{

if(!playing){

music.play();

musicBtn.innerHTML=
"🔇 Stop";

playing=true;

}
else{

music.pause();

musicBtn.innerHTML=
"🎵 Music";

playing=false;

}

}
);


// =================================
// Gift Animation
// =================================

const gift =
document.getElementById("gift");

if(gift){

gift.addEventListener(
"click",
()=>{

gift.innerHTML="💖";

gift.style.transform=
"scale(1.5)";

setTimeout(()=>{

gift.style.transform=
"scale(1)";

},800);

});
}
