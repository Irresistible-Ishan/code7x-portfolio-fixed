const NUM_ELEMENTS = 300; 

function createFallingElements() {
   const container = document.getElementById('falling-container');

   for (let i = 0; i < NUM_ELEMENTS; i++) {

       const element = document.createElement('div');
       element.className = 'falling-element';
       element.style.left = `${Math.random() * 80 + 10}%`; 
       
       element.style.animationDuration = `${Math.random()*4+2}s`;
       
       
       const content = generateRandomContent();
       element.textContent = content;

       element.style.color = generateRandomColor();

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
    var time = hours + ' : ' + minutes + ' : ' + seconds;

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



document.querySelectorAll('.project-card').forEach(card => {
    const images = card.querySelectorAll('.carousel-img');
    const prevBtn = card.querySelector('.carousel-btn.prev');
    const nextBtn = card.querySelector('.carousel-btn.next');
    let currentIndex = 0;
    if(images.length > 0 && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        });

        prevBtn.addEventListener('click', () => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            images[currentIndex].classList.add('active');
        });
    }
});

let currentMode = 'off';
let golInterval, autoInterval;

function createMatrixGrid() {
    const container = document.getElementById('matrix-grid-container');
    if (!container) return;
    container.innerHTML = '';   
    const cellSize = 55; 
    const columns = Math.ceil(document.documentElement.scrollWidth / cellSize);
    const rows = Math.ceil(document.documentElement.scrollHeight / cellSize);   
    container.style.gridTemplateColumns = `repeat(${columns}, ${cellSize}px)`;
    container.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;  
    container.dataset.columns = columns;
    container.dataset.rows = rows;
    container.dataset.cellSize = cellSize;   
    const totalCells = columns * rows;
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('matrix-cell');
        container.appendChild(cell);
    }
}
function activateCell(col, row, isGolSeed = false) {
    const container = document.getElementById('matrix-grid-container');
    const columns = parseInt(container.dataset.columns);
    const rows = parseInt(container.dataset.rows);  
    if (col < 0 || col >= columns || row < 0 || row >= rows) return;  
    const index = (row * columns) + col;
    const cell = container.children[index];

    if (cell) {
        if (isGolSeed || currentMode === 'gol') {
            cell.classList.add('gol-alive');
        } else if (!cell.classList.contains('activated')) {
            const randX = Math.floor(Math.random() * 100);
            const randY = Math.floor(Math.random() * 100);
            cell.style.setProperty('--x', `${randX}%`);
            cell.style.setProperty('--y', `${randY}%`);                
            
            cell.classList.add('activated');              
            setTimeout(() => cell.classList.remove('activated'), 2000); 
        }
    }
}

document.addEventListener('mousemove', (e) => {
    if (currentMode === 'auto') return;
    const container = document.getElementById('matrix-grid-container');
    if (!container || !container.dataset.columns) return;
    const cellSize = parseInt(container.dataset.cellSize);
    const col = Math.floor(e.pageX / cellSize);
    const row = Math.floor(e.pageY / cellSize);   
    activateCell(col, row);
});

// connors game of life logic heer
function stepGameOfLife() {
    const container = document.getElementById('matrix-grid-container');
    const columns = parseInt(container.dataset.columns);
    const cells = container.children;
    const nextState = [];
    for (let i = 0; i < cells.length; i++) {
        const isAlive = cells[i].classList.contains('gol-alive');
        const col = i % columns;
        const row = Math.floor(i / columns);
        let liveNeighbors = 0;
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if (x === 0 && y === 0) continue;
                const nCol = col + x;
                const nRow = row + y;   
                if (nCol >= 0 && nCol < columns && nRow >= 0 && nRow < parseInt(container.dataset.rows)) {
                    const nIndex = (nRow * columns) + nCol;
                    if (cells[nIndex].classList.contains('gol-alive')) liveNeighbors++;
                }
            }
        }
        if (isAlive && (liveNeighbors === 2 || liveNeighbors === 3)) nextState[i] = true;
        else if (!isAlive && liveNeighbors === 3) nextState[i] = true;
        else nextState[i] = false;
    }
    for (let i = 0; i < cells.length; i++) {
        const wasAlive = cells[i].classList.contains('gol-alive');
        
        if (nextState[i]) {
            cells[i].classList.add('gol-alive');
            cells[i].classList.remove('activated'); 
        } else {
            cells[i].classList.remove('gol-alive');     
            if (wasAlive) {
                cells[i].style.setProperty('--x', `50%`);
                cells[i].style.setProperty('--y', `50%`);
                cells[i].classList.remove('activated');
                void cells[i].offsetWidth; 
                cells[i].classList.add('activated');
                setTimeout(() => cells[i].classList.remove('activated'), 2000);
            }
        }
    }
}

function triggerAutonomousDraw() {
    const container = document.getElementById('matrix-grid-container');
    const cols = parseInt(container.dataset.columns);
    const rows = parseInt(container.dataset.rows); 
    const shapeType = Math.floor(Math.random() * 3); 
    const cx = Math.floor(Math.random() * cols);
    const cy = Math.floor(Math.random() * rows);

    if (shapeType === 0) {
        const length = Math.random() * 15 + 5;
        const angle = Math.random() * Math.PI * 2;
        for (let i = 0; i < length; i++) {
            activateCell(Math.round(cx + Math.cos(angle)*i), Math.round(cy + Math.sin(angle)*i));
        }
    } else if (shapeType === 1) {
        const r = Math.random() * 8 + 3;
        for (let t = 0; t < Math.PI * 2; t += 0.1) {
            activateCell(Math.round(cx + r * Math.cos(t)), Math.round(cy + r * Math.sin(t)));
        }
    } else { 
        const width = Math.random() * 10 + 5;
        const a = (Math.random() - 0.5) * 0.5;
        for (let x = -width; x < width; x += 0.5) {
            activateCell(Math.round(cx + x), Math.round(cy + (a * x * x)));
        }
    }
}

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const mode = this.getAttribute('data-mode');
        const slider = document.getElementById('modeSlider');
        if (currentMode === mode) return;
        currentMode = mode;
        slider.setAttribute('data-active', mode);
        clearInterval(golInterval);
        clearInterval(autoInterval);
        document.querySelectorAll('.matrix-cell').forEach(cell => {
            cell.classList.remove('gol-alive');
            cell.classList.remove('activated');
        });
        if (mode === 'gol') {
            golInterval = setInterval(stepGameOfLife, 300);
        } else if (mode === 'auto') {
            autoInterval = setInterval(triggerAutonomousDraw, 800);
        }
    });
});
window.addEventListener('load', createMatrixGrid);
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(createMatrixGrid, 200);
});


function copyText(textToCopy, button) {
    navigator.clipboard.writeText(textToCopy).then(() => {
        button.innerText = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
            button.innerText = 'Copy';
            button.classList.remove('copied');
        }, 2000); 
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}