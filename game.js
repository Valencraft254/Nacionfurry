const canvas =
document.getElementById("world");

const ctx =
canvas.getContext("2d");


canvas.width =
innerWidth-280;

canvas.height =
innerHeight;


// TIEMPO

const dayLength =
3*60*60*1000;


let day=1;



function updateTime(){

let p=(Date.now()%dayLength)
/dayLength;


let hour=Math.floor(p*24);


document.getElementById("time")
.innerHTML=
(hour<6?"🌙 Noche":
hour<18?"☀️ Día":"🌆 Tarde")
+
"<br>Día "+day+
"<br>⏰ "+hour+":00";


day=Math.floor(Date.now()/dayLength)+1;

}



setInterval(updateTime,1000);



// INVENTARIO


let inv={

wood:0,
stone:0,
dirt:0,
food:0

};



function updateInv(){

for(let i in inv){

document.getElementById(i)
.innerHTML=inv[i];

}

}



// RECURSOS


let resources=[];


for(let i=0;i<40;i++){

resources.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

type:
["wood","stone","dirt","food"]
[Math.floor(Math.random()*4)]

});

}



// PLAYER


let player={

x:400,
y:300,
speed:3

};


let keys={};



onkeydown=e=>
keys[e.key]=true;


onkeyup=e=>
keys[e.key]=false;



function move(){

if(keys.w)player.y-=player.speed;
if(keys.s)player.y+=player.speed;
if(keys.a)player.x-=player.speed;
if(keys.d)player.x+=player.speed;

}




// CLICK RECOGER


canvas.onclick=e=>{


let mx=e.offsetX;
let my=e.offsetY;


resources.forEach((r,i)=>{


let d=Math.hypot(
r.x-mx,
r.y-my
);


if(d<20){

inv[r.type]+=1;

resources.splice(i,1);

updateInv();

}

});


};



// DIBUJO


function draw(){


ctx.clearRect(
0,0,
canvas.width,
canvas.height
);


// mar

ctx.fillStyle="#1684d4";
ctx.fillRect(
0,0,
canvas.width,
canvas.height
);


// isla

ctx.fillStyle="#cdb276";
ctx.beginPath();

ctx.arc(
canvas.width/2,
canvas.height/2,
250,
0,
Math.PI*2
);

ctx.fill();


ctx.fillStyle="#4fa83d";

ctx.beginPath();

ctx.arc(
canvas.width/2,
canvas.height/2,
210,
0,
Math.PI*2
);

ctx.fill();



// recursos


resources.forEach(r=>{

ctx.fillStyle=
r.type=="wood"?"green":
r.type=="stone"?"gray":
r.type=="food"?"red":
"#a56b2b";


ctx.fillRect(
r.x,
r.y,
15,
15
);


});



// jugador

ctx.fillStyle="yellow";

ctx.beginPath();

ctx.arc(
player.x,
player.y,
12,
0,
Math.PI*2
);

ctx.fill();


move();


requestAnimationFrame(draw);

}


draw();

updateInv();


// CHAT


let input=
document.getElementById("msg");


input.onkeydown=e=>{

if(e.key=="Enter"){

let c=document.getElementById("chat");

c.innerHTML+=
"<div>👤 "+input.value+"</div>";

input.value="";

}

};
