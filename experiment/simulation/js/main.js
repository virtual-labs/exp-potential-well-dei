const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

const quantumNumberSlider = document.getElementById('quantumNumber');
const quantumValueDisplay = document.getElementById('quantumValue');

let quantumNumber = parseInt(quantumNumberSlider.value);
let time = 0;
let animationFrameId;
let running = false;

const colors = ['orange', 'blue', 'green', 'red', 'purple', 'brown', 'cyan', 'magenta', 'yellow', 'pink']; // Different colors for each quantum state

// Function to draw y-axis labels
function drawYAxisLabels() {
    const offsetY = canvas.height / 2;
    const amplitude = 150; // Maximum amplitude for numbering
    const step = 30; // Distance between labels

    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';

    for (let i = 0; i <= amplitude; i += step) {
        // Positive side
        ctx.fillText(i, 10, offsetY - i);
        // Negative side
        ctx.fillText(-i, 10, offsetY + i);
    }
}

// Function to draw the baseline
function drawBaseline() {
    const L = canvas.width;
    const offsetY = canvas.height / 2;

    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(L, offsetY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
}

// Function to draw the current wavefunction
function drawWaveFunctions() {
    const L = canvas.width; // Width of the box
    const amplitude = 150;  // Amplitude of the wave
    const offsetY = canvas.height / 2; // Center Y of the canvas

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw y-axis labels and baseline
    drawYAxisLabels();
    drawBaseline();

    // Draw the current wavefunction
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    
    for (let x = 0; x <= L; x++) {
        const psi = Math.sin((quantumNumber * Math.PI * x) / L) * Math.cos(quantumNumber * Math.PI * time / 100);
        const y = offsetY - amplitude * psi;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = colors[(quantumNumber - 1) % colors.length]; // Use color based on quantum number
    ctx.lineWidth = 2;
    ctx.stroke();
}

function animate() {
    time += 1;
    drawWaveFunctions();
    if (running) {
        animationFrameId = requestAnimationFrame(animate); // Call animate again for the next frame
    }
}

// Initial setup
drawYAxisLabels();
drawBaseline();

// Slider event listener
quantumNumberSlider.addEventListener('input', (event) => {
    quantumNumber = parseInt(event.target.value);
    quantumValueDisplay.textContent = quantumNumber;

    if (running) {
        time = 0; // Reset time when changing the quantum number
        drawWaveFunctions(); // Redraw immediately with the new wavefunction
    }
});

// Simulate button
document.getElementById('simulateButton').addEventListener('click', () => {
    if (!running) {
        running = true;
        animate();
    }
});

// Pause button
document.getElementById('pauseButton').addEventListener('click', () => {
    running = false;
    cancelAnimationFrame(animationFrameId);
});

// Reset button
document.getElementById('resetButton').addEventListener('click', () => {
    running = false;
    cancelAnimationFrame(animationFrameId);
    time = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawYAxisLabels(); // Redraw y-axis labels and baseline
    drawBaseline();
});
