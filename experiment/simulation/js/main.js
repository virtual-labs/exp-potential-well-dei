// ============================================
// 1D PARTICLE IN A BOX - ENHANCED SIMULATION
// Interactive Quantum Mechanics Visualization
// Compact Layout Version
// ============================================

// Canvas Setup
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

// Set canvas resolution for crisp rendering - responsive to container
function setupCanvas() {
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Use container dimensions minus padding
    const width = rect.width - 16;
    const height = rect.height - 16;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
}

// DOM Elements - Controls
const quantumSlider = document.getElementById('quantumNumber');
const quantumValue = document.getElementById('quantumValue');
const boxLengthSlider = document.getElementById('boxLength');
const boxLengthValue = document.getElementById('boxLengthValue');
const amplitudeSlider = document.getElementById('amplitude');
const amplitudeValue = document.getElementById('amplitudeValue');
const speedSlider = document.getElementById('speed');
const speedValue = document.getElementById('speedValue');

// DOM Elements - Toggles
const showProbabilityToggle = document.getElementById('showProbability');
const showGridToggle = document.getElementById('showGrid');
const showLabelsToggle = document.getElementById('showLabels');

// DOM Elements - Buttons
const simulateBtn = document.getElementById('simulateButton');
const pauseBtn = document.getElementById('pauseButton');
const resetBtn = document.getElementById('resetButton');
const screenshotBtn = document.getElementById('screenshotButton');

// DOM Elements - Display
const statusBadge = document.getElementById('statusBadge');
const canvasOverlay = document.getElementById('canvasOverlay');
const canvasContainer = document.querySelector('.canvas-container');

// DOM Elements - Data Values
const energyDisplay = document.getElementById('energyValue');
const wavelengthDisplay = document.getElementById('wavelengthValue');
const nodesDisplay = document.getElementById('nodesValue');
const periodDisplay = document.getElementById('periodValue');
const timeDisplay = document.getElementById('timeValue');
const stateDisplay = document.getElementById('stateValue');
const dynamicTip = document.getElementById('dynamicTip');

// Simulation State
let state = {
    quantumNumber: 1,
    boxLength: 5.0,  // nm
    amplitude: 100,
    speed: 5,
    time: 0,
    running: false,
    animationId: null,
    showProbability: false,
    showGrid: true,
    showLabels: true
};

// Physical Constants (in appropriate units)
const PLANCK_CONSTANT = 6.626e-34;  // J·s
const ELECTRON_MASS = 9.109e-31;    // kg
const EV_CONVERSION = 1.602e-19;    // J per eV

// Color scheme for different quantum states
const waveColors = [
    { main: '#FF6B6B', glow: 'rgba(255, 107, 107, 0.3)' },  // n=1
    { main: '#4ECDC4', glow: 'rgba(78, 205, 196, 0.3)' },   // n=2
    { main: '#45B7D1', glow: 'rgba(69, 183, 209, 0.3)' },   // n=3
    { main: '#96CEB4', glow: 'rgba(150, 206, 180, 0.3)' },  // n=4
    { main: '#FFEAA7', glow: 'rgba(255, 234, 167, 0.3)' },  // n=5
    { main: '#DDA0DD', glow: 'rgba(221, 160, 221, 0.3)' },  // n=6
    { main: '#98D8C8', glow: 'rgba(152, 216, 200, 0.3)' },  // n=7
    { main: '#F7DC6F', glow: 'rgba(247, 220, 111, 0.3)' },  // n=8
    { main: '#BB8FCE', glow: 'rgba(187, 143, 206, 0.3)' },  // n=9
    { main: '#85C1E9', glow: 'rgba(133, 193, 233, 0.3)' }   // n=10
];

// Educational tips based on quantum number
const educationalTips = [
    "👀 <strong>Ground State (n=1):</strong> This is the lowest energy state. The particle is most likely found at the center!",
    "👀 <strong>First Excited (n=2):</strong> Notice the node at center - particle cannot be found there!",
    "👀 <strong>n=3:</strong> Two nodes appear! Energy increases with n². Current E₃ = 9 × E₁",
    "👀 <strong>n=4:</strong> Three nodes now. Notice the wavelength λ = 2L/n getting shorter!",
    "👀 <strong>n=5:</strong> More oscillations! The particle's momentum is higher at this state.",
    "👀 <strong>n=6:</strong> Observe: Energy scales as n². E₆ = 36 × E₁!",
    "👀 <strong>n=7:</strong> Six nodes! Higher n means higher kinetic energy.",
    "👀 <strong>n=8:</strong> The wavefunction oscillates faster. Notice the frequency change!",
    "👀 <strong>n=9:</strong> Eight nodes! Compare with n=1 to see quantization clearly.",
    "👀 <strong>n=10:</strong> Highest state shown. E₁₀ = 100 × E₁! This is the power of quantum numbers."
];

// State names
const stateNames = [
    'Ground State',
    '1st Excited',
    '2nd Excited',
    '3rd Excited',
    '4th Excited',
    '5th Excited',
    '6th Excited',
    '7th Excited',
    '8th Excited',
    '9th Excited'
];

// ============================================
// PHYSICS CALCULATIONS
// ============================================

function calculateEnergy(n, L) {
    const L_meters = L * 1e-9;
    const energy_joules = (n * n * PLANCK_CONSTANT * PLANCK_CONSTANT) / (8 * ELECTRON_MASS * L_meters * L_meters);
    return energy_joules / EV_CONVERSION;
}

function calculateWavelength(n, L) {
    return (2 * L) / n;
}

function calculateNodes(n) {
    return n - 1;
}

function calculatePeriod(n) {
    return Math.round(100 / n);
}

// ============================================
// DRAWING FUNCTIONS
// ============================================

function getCanvasDimensions() {
    const dpr = window.devicePixelRatio || 1;
    return {
        width: canvas.width / dpr,
        height: canvas.height / dpr
    };
}

function drawGrid() {
    if (!state.showGrid) return;

    const { width, height } = getCanvasDimensions();
    const centerY = height / 2;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;

    const gridSpacing = 40;
    for (let x = gridSpacing; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let y = gridSpacing; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
}

function drawAxisLabels() {
    if (!state.showLabels) return;

    const { width, height } = getCanvasDimensions();
    const centerY = height / 2;

    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

    ctx.fillText('+Ψ', 8, 20);
    ctx.fillText('0', 8, centerY + 4);
    ctx.fillText('-Ψ', 8, height - 10);

    ctx.fillText('0', 25, height - 8);
    ctx.fillText('L', width - 25, height - 8);
    ctx.fillText('x →', width / 2 - 10, height - 8);

    ctx.strokeStyle = 'rgba(102, 126, 234, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(25, 15);
    ctx.lineTo(25, height - 15);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 25, 15);
    ctx.lineTo(width - 25, height - 15);
    ctx.stroke();

    ctx.setLineDash([]);
}

function drawWavefunction() {
    const { width, height } = getCanvasDimensions();
    const centerY = height / 2;
    const n = state.quantumNumber;
    const amplitude = Math.min(state.amplitude, (height / 2) - 20);

    const boxStart = 25;
    const boxEnd = width - 25;
    const boxWidth = boxEnd - boxStart;

    const color = waveColors[(n - 1) % waveColors.length];

    ctx.shadowColor = color.glow;
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.moveTo(boxStart, centerY);

    for (let x = boxStart; x <= boxEnd; x++) {
        const xNorm = (x - boxStart) / boxWidth;
        const psi = Math.sin(n * Math.PI * xNorm) * Math.cos(n * Math.PI * state.time / (100 / state.speed));
        const y = centerY - amplitude * psi;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = color.main;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.shadowBlur = 0;

    if (state.showProbability) {
        ctx.beginPath();
        ctx.moveTo(boxStart, centerY);

        for (let x = boxStart; x <= boxEnd; x++) {
            const xNorm = (x - boxStart) / boxWidth;
            const psi = Math.sin(n * Math.PI * xNorm);
            const psiSquared = psi * psi;
            const y = centerY - amplitude * 0.8 * psiSquared;
            ctx.lineTo(x, y);
        }

        ctx.lineTo(boxEnd, centerY);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, centerY - amplitude, 0, centerY);
        gradient.addColorStop(0, 'rgba(255, 193, 7, 0.35)');
        gradient.addColorStop(1, 'rgba(255, 193, 7, 0.05)');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 193, 7, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    const nodes = calculateNodes(n);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 1; i <= nodes; i++) {
        const nodeX = boxStart + (i / n) * boxWidth;
        ctx.beginPath();
        ctx.arc(nodeX, centerY, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawQuantumInfo() {
    const { width } = getCanvasDimensions();
    const n = state.quantumNumber;
    const color = waveColors[(n - 1) % waveColors.length];

    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillStyle = color.main;
    ctx.fillText(`n = ${n}`, width - 55, 22);

    ctx.font = '10px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText(`t = ${state.time}`, width - 55, 38);
}

function render() {
    const { width, height } = getCanvasDimensions();

    ctx.fillStyle = 'rgba(15, 15, 26, 1)';
    ctx.fillRect(0, 0, width, height);

    drawGrid();
    drawAxisLabels();
    drawWavefunction();
    drawQuantumInfo();
}

// ============================================
// ANIMATION LOOP
// ============================================

function animate() {
    state.time += 1;
    render();
    updateDataDisplay();

    if (state.running) {
        state.animationId = requestAnimationFrame(animate);
    }
}

// ============================================
// UPDATE FUNCTIONS
// ============================================

function updateDataDisplay() {
    const n = state.quantumNumber;
    const L = state.boxLength;

    const energy = calculateEnergy(n, L);
    const wavelength = calculateWavelength(n, L);
    const nodes = calculateNodes(n);
    const period = calculatePeriod(n);

    energyDisplay.textContent = energy.toFixed(3);
    wavelengthDisplay.textContent = wavelength.toFixed(2);
    nodesDisplay.textContent = nodes;
    periodDisplay.textContent = period;
    timeDisplay.textContent = state.time;
    stateDisplay.textContent = `n = ${n}`;

    const stateUnit = stateDisplay.nextElementSibling;
    if (stateUnit) {
        stateUnit.textContent = stateNames[n - 1];
    }
}

function updateTip() {
    const n = state.quantumNumber;
    dynamicTip.innerHTML = `<p>${educationalTips[n - 1]}</p>`;
}

function updateStatus(status) {
    statusBadge.className = 'badge';

    switch (status) {
        case 'running':
            statusBadge.textContent = '● Running';
            statusBadge.classList.add('running');
            canvasContainer.classList.add('running');
            canvasOverlay.classList.add('hidden');
            break;
        case 'paused':
            statusBadge.textContent = '● Paused';
            statusBadge.classList.add('paused');
            canvasContainer.classList.remove('running');
            break;
        case 'ready':
        default:
            statusBadge.textContent = '● Ready';
            canvasContainer.classList.remove('running');
            canvasOverlay.classList.remove('hidden');
            break;
    }
}

function highlightProcedureStep(step) {
    const steps = document.querySelectorAll('.procedure-step');
    steps.forEach((s, i) => {
        s.classList.remove('active');
        if (i + 1 === step) {
            s.classList.add('active');
        }
    });
}

// ============================================
// EVENT HANDLERS
// ============================================

// Slider handlers
quantumSlider.addEventListener('input', (e) => {
    state.quantumNumber = parseInt(e.target.value);
    quantumValue.textContent = state.quantumNumber;
    updateTip();
    updateDataDisplay();
    highlightProcedureStep(3);
    if (!state.running) render();
});

boxLengthSlider.addEventListener('input', (e) => {
    state.boxLength = parseFloat(e.target.value);
    boxLengthValue.textContent = state.boxLength.toFixed(1);
    updateDataDisplay();
    highlightProcedureStep(6);
    if (!state.running) render();
});

amplitudeSlider.addEventListener('input', (e) => {
    state.amplitude = parseInt(e.target.value);
    amplitudeValue.textContent = state.amplitude;
    if (!state.running) render();
});

speedSlider.addEventListener('input', (e) => {
    state.speed = parseInt(e.target.value);
    speedValue.textContent = `${state.speed}x`;
});

// Toggle handlers
showProbabilityToggle.addEventListener('change', (e) => {
    state.showProbability = e.target.checked;
    highlightProcedureStep(4);
    if (!state.running) render();
});

showGridToggle.addEventListener('change', (e) => {
    state.showGrid = e.target.checked;
    if (!state.running) render();
});

showLabelsToggle.addEventListener('change', (e) => {
    state.showLabels = e.target.checked;
    if (!state.running) render();
});

// Button handlers
simulateBtn.addEventListener('click', () => {
    if (!state.running) {
        state.running = true;
        updateStatus('running');
        highlightProcedureStep(2);
        animate();
    }
});

pauseBtn.addEventListener('click', () => {
    state.running = false;
    cancelAnimationFrame(state.animationId);
    updateStatus('paused');
});

resetBtn.addEventListener('click', () => {
    state.running = false;
    cancelAnimationFrame(state.animationId);
    state.time = 0;
    state.quantumNumber = 1;
    state.boxLength = 5.0;
    state.amplitude = 100;
    state.speed = 5;

    quantumSlider.value = 1;
    quantumValue.textContent = '1';
    boxLengthSlider.value = 5;
    boxLengthValue.textContent = '5.0';
    amplitudeSlider.value = 100;
    amplitudeValue.textContent = '100';
    speedSlider.value = 5;
    speedValue.textContent = '5x';

    updateStatus('ready');
    updateTip();
    updateDataDisplay();
    highlightProcedureStep(1);
    render();
});

screenshotBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `quantum-simulation-n${state.quantumNumber}-t${state.time}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Space':
            e.preventDefault();
            if (state.running) {
                pauseBtn.click();
            } else {
                simulateBtn.click();
            }
            break;
        case 'KeyR':
            resetBtn.click();
            break;
        case 'ArrowUp':
            if (state.quantumNumber < 10) {
                quantumSlider.value = state.quantumNumber + 1;
                quantumSlider.dispatchEvent(new Event('input'));
            }
            break;
        case 'ArrowDown':
            if (state.quantumNumber > 1) {
                quantumSlider.value = state.quantumNumber - 1;
                quantumSlider.dispatchEvent(new Event('input'));
            }
            break;
        case 'KeyP':
            showProbabilityToggle.checked = !showProbabilityToggle.checked;
            showProbabilityToggle.dispatchEvent(new Event('change'));
            break;
    }
});

// Window resize handler with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        setupCanvas();
        render();
    }, 100);
});

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Wait for layout to complete before setting up canvas
    requestAnimationFrame(() => {
        setupCanvas();
        updateTip();
        updateDataDisplay();
        highlightProcedureStep(1);
        render();
        updateStatus('ready');

        console.log('🔬 Quantum Mechanics Simulation Initialized');
        console.log('📖 Keyboard Shortcuts:');
        console.log('   Space - Play/Pause');
        console.log('   R - Reset');
        console.log('   ↑/↓ - Change Quantum Number');
        console.log('   P - Toggle Probability Density');
    });
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
