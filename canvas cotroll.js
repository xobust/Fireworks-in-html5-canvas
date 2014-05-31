            
var container;
var context;
var particles; //array containing all particels

"use strict";


function Draw(particle)
{
  context.fillStyle = "rgba(" + particle.elm.r + "," + particle.elm.g + "," + particle.elm.b + "," + particle.elm.opacity + ")";
  context.fillRect(particle.x, container.height-particle.y, particle.elm.size, particle.elm.size);
}




function createParticle()
{
  return {
    elm: createParticleElement(255,255,255),
    x: Math.random()*(container.offsetWidth-20) +20,
    y:0.0,
    dx:0,
    dy:7,
    ttl: (container.offsetHeight/7)- 20 - Math.random()*(container.offsetHeight/7)/4,
    stage:1
  };
}

function createFire(parent, r,b,g)
{
  return {
    elm: createParticleElement(r,b,g),
    x: parent.x,
    y: parent.y,
    dx:Math.random()*10 -5,
    dy:Math.random()*10 -5,
    ttl:25,
    stage:parent.stage+1
  };
}

function createExaust(parent)
{
  return {
    elm: createParticleElement(250,Math.round(Math.random()*255),0),
    x: parent.x,
    y: parent.y,
    dx:Math.random() -0.5,
    dy: -7 + Math.random()*2 -1,
    ttl:Math.random() * 10 + 10,
    stage:parent.stage+1
  };
}

function createParticleElement(r,g,b) {
  var elm = [];
  elm.r = r;
  elm.b = b;
  elm.g = g;
  elm.opacity = 1;
  elm.size = 5;
  return elm; 
}



function update() {
  context.clearRect(0, 0, container.width, container.height);
  context.fillStyle = "#2c3e50";
  context.fillRect(0,0,container.width,container.height);

  for (var i=0; i < particles.length; i++) {
    particles[i].ttl = particles[i].ttl - 1;
    if (particles[i].ttl > 0) {
      particles[i].x = particles[i].x + particles[i].dx;
      particles[i].y = particles[i].y + particles[i].dy;

        if (particles[i].ttl < 10 && particles[i].stage != 1) 
        {
            particles[i].elm.opacity = particles[i].ttl / 10;
        }

        if(particles[i].stage == 1 && particles[i].ttl > 25 )
        {
            particles.push(createExaust(particles[i]));
        }
      Draw(particles[i]);
    } else {

        if(particles[i].stage == 1)
        {
           var r = Math.round(Math.random()) * 255;
           var b = Math.round(Math.random()) * 255; 
           var g = Math.round(Math.random()) * 255;
          for (var p=0; p < 20; p++) {
            particles.push(createFire(particles[i], r,b,g));
          }
        }
      particles.splice(i, 1);
    }
  }
}


function fireRocket()
{
  if(particles.length < 20)
  {
    for (var i=0; i < Math.random() * 2; i++) {
      particles.push(createParticle());
    }
  }
}

// stop the autotimer when tabbinactive, from stackoverflow
var Rocket;
var udate;
function startRocket() {
    Rocket = window.setInterval(fireRocket, 4000); // Fire rocket 
    udate = setInterval(update, 40); //Intervall to update particle position
    console.log("Started");
}
function stopRocket() {
    window.clearInterval(Rocket);
    window.clearInterval(udate);
    console.log("Stoped");
}


window.onload = function() {             
  container = document.getElementById("canvas");
  context = container.getContext("2d");
  particles = [];
  fireRocket();

  startRocket();
};
