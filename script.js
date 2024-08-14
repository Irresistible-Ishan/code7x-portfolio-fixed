const NUM_ELEMENTS = 200; 

function createFallingElements() {
   const container = document.getElementById('falling-container');

   for (let i = 0; i < NUM_ELEMENTS; i++) {

       const element = document.createElement('div');
       element.className = 'falling-element';
       element.style.left = `${Math.random() * 80 + 10}%`; 
       
       element.style.animationDuration = `${Math.random()*4+2}s`;
       
       
       const content = generateRandomContent();
       element.textContent = content;

       element.style.color = "#FFFFFF"; /*generateRandomColor();*/

       container.appendChild(element);
   }
}


function generateRandomContent() {
   const symbols = '.•°|';
   const sentences = [
       "🍃",
   ];

   const randomIndex = Math.floor(Math.random() * (symbols.length + sentences.length));
   if (randomIndex < symbols.length) {
       return symbols[randomIndex];
   } else {
       return sentences[randomIndex - symbols.length];
   }
}

function generateRandomColor() {
   const letters = '0123456789ABCDEF';
   let color = '#';
   for (let i = 0; i < 6; i++) {
       color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}
function toggleAnimation() {
   const container = document.getElementById('falling-container');
   if (container.classList.contains('stopped')) {
       container.classList.remove('stopped');
   } else {
       container.classList.add('stopped');
   }
}

window.onload = function() {
   createFallingElements();

   document.getElementById('stopButton').addEventListener('click', toggleAnimation);
};



function updateClock() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2,'0')
    var time = hours + ':' + minutes + ':' + seconds;

    document.getElementById('clockText').textContent = time;
}


setInterval(updateClock, 1000);

document.getElementById('toggleNightMode').addEventListener('click', function() {
  document.body.classList.toggle('night-mode');
  if (document.body.classList.contains('night-mode')) {
    this.textContent = '🌙';
  } else {
    this.textContent = '🔆';
  }
});


document.addEventListener('DOMContentLoaded', function() {
    var chatButton = document.querySelector('.chat-button');
    var chatContainer = document.querySelector('.chat-container');

    chatButton.addEventListener('click', function() {
        chatContainer.classList.toggle('hidden');
    });
});