### Theory: 1D Particle in a Box (Infinite Potential Well)

In quantum mechanics, the behavior of particles confined to a one-dimensional box can be analyzed using the Schrödinger equation. This experiment provides an interactive visual simulation of a particle's wavefunction in a 1D infinite potential well using the time-dependent Schrödinger equation.

## Introduction
The "particle in a box" model is one of the fundamental problems in quantum mechanics. It describes a particle that is free to move within a region of space (the "box") but is completely confined by infinite potential barriers at the boundaries. This simple yet powerful model helps illustrate key quantum mechanical concepts.

## Key Concepts

### 1. Wavefunction Ψ(x,t)
The wavefunction describes the quantum state of the particle. In our simulation:
- **Spatial Component**: sin(nπx/L) - describes the distribution within the box
- **Time Component**: cos(ωt) - describes how the wavefunction evolves over time
- The complete wavefunction is: **Ψ(x,t) = A·sin(nπx/L)·cos(ωt)**

### 2. Quantum Number (n)
The quantum number n = 1, 2, 3, ... determines:
- The **energy level** of the particle
- The **number of nodes** (n-1 nodes for quantum number n)
- The **oscillation frequency** of the wavefunction

### 3. Energy Levels
The energy of each quantum state is given by:

![Energy Equation](images/image1.png)

**Eₙ = n²h²/(8mL²)**

Where:
- ℏ is the reduced Planck constant
- Eₙ represents the energy corresponding to quantum number n
- n is the quantum number (1, 2, 3, ...)
- L is the length of the box
- m is the mass of the particle

### 4. Probability Density |Ψ|²
The probability of finding the particle at a given position is given by |Ψ(x,t)|². In the simulation:
- Enable the **"Show |Ψ|² (Probability)"** toggle to visualize this
- Notice how probability is maximum at antinodes and zero at nodes

### 5. Box Length (L)
Changing the box length affects:
- The wavelength of the wavefunction (λ = 2L/n)
- The energy levels (inversely proportional to L²)
- Smaller boxes lead to higher energy states

## Simulation Features

### Parameters Panel

<table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);">
<tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
<th style="padding: 14px 12px; border: none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; font-size: 0.85em;">Control</th>
<th style="padding: 14px 12px; border: none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; font-size: 0.85em;">Description</th>
<th style="padding: 14px 12px; border: none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; font-size: 0.85em;">Range</th>
</tr>
<tr style="background: rgba(102, 126, 234, 0.05);">
<td style="padding: 12px; border-bottom: 1px solid rgba(102, 126, 234, 0.1); text-align: center; font-weight: 600; color: #667eea;">Quantum Number (n)</td>
<td style="padding: 12px; border-bottom: 1px solid rgba(102, 126, 234, 0.1); text-align: center;">Sets the energy level</td>
<td style="padding: 12px; border-bottom: 1px solid rgba(102, 126, 234, 0.1); text-align: center;">1 - 10</td>
</tr>
<tr style="background: rgba(255, 255, 255, 0.8);">
<td style="padding: 12px; border-bottom: 1px solid rgba(102, 126, 234, 0.1); text-align: center; font-weight: 600; color: #667eea;">Box Length (L)</td>
<td style="padding: 12px; border-bottom: 1px solid rgba(102, 126, 234, 0.1); text-align: center;">Length of potential well</td>
<td style="padding: 12px; border-bottom: 1px solid rgba(102, 126, 234, 0.1); text-align: center;">1 - 10 nm</td>
</tr>
<tr style="background: rgba(102, 126, 234, 0.05);">
<td style="padding: 12px; border-bottom: 1px solid rgba(102, 126, 234, 0.1); text-align: center; font-weight: 600; color: #667eea;">Wave Amplitude</td>
<td style="padding: 12px; border-bottom: 1px solid rgba(102, 126, 234, 0.1); text-align: center;">Visual amplitude of wave</td>
<td style="padding: 12px; border-bottom: 1px solid rgba(102, 126, 234, 0.1); text-align: center;">50 - 150</td>
</tr>
<tr style="background: rgba(255, 255, 255, 0.8);">
<td style="padding: 12px; border-bottom: none; text-align: center; font-weight: 600; color: #667eea;">Animation Speed</td>
<td style="padding: 12px; border-bottom: none; text-align: center;">Speed of time evolution</td>
<td style="padding: 12px; border-bottom: none; text-align: center;">1x - 10x</td>
</tr>
</table>

### Display Options
- **Show |Ψ|²**: Toggle probability density visualization
- **Show Grid**: Enable/disable background grid
- **Show Axis Labels**: Toggle axis labels on canvas

### Live Measurements
The simulation displays real-time values for:
- **Energy (Eₙ)**: Current energy level in eV
- **Wavelength (λ)**: de Broglie wavelength in nm
- **Nodes**: Number of zero-crossing points
- **Period**: Oscillation period in frames
- **Time (t)**: Current simulation time step
- **State**: Current quantum state description

## Key Observations
1. Higher quantum numbers (n) result in more oscillations within the box
2. Energy increases as the square of the quantum number (Eₙ ∝ n²)
3. The number of nodes equals (n - 1)
4. Probability density |Ψ|² is always positive and shows where the particle is likely to be found
5. The wavefunction must be zero at the boundaries (x = 0 and x = L)

## Mathematical Foundation

### Schrödinger Equation
![Schrodinger Equation](images/image2.png)

The time-independent Schrödinger equation for a particle in a box:
- Inside the box: -ℏ²/(2m) · d²Ψ/dx² = EΨ
- At boundaries: Ψ(0) = Ψ(L) = 0

### Wavefunction Solution
![Wavefunction](images/image3.png)

The normalized spatial wavefunction:
Ψₙ(x) = √(2/L) · sin(nπx/L)

## References
1. [Particle in a Box - LibreTexts](https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Inorganic_Chemistry_(LibreTexts)/02%3A_Atomic_Structure/2.02%3A_The_Schrodinger_equation_particle_in_a_box_and_atomic_wavefunctions)
2. [Schrödinger Equation - Wikipedia](https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation)
