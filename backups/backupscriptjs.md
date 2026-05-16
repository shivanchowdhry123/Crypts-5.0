:root {
    /* The Midnight Matrix Base */
    --dark-void: #020712;
    --dark-card: #051024;
    
    /* The High-Frequency Streams */
    --cyan-accent: #00f3ff;
    --cyan-glow: rgba(0, 243, 255, 0.3);
    
    /* The Singularity Core (Magenta) */
    --magenta-core: #d900bc;
    --magenta-bright: #ff3df2;
    --magenta-glow: rgba(217, 0, 188, 0.5);
    
    /* Global Overrides */
    --dark: var(--dark-void);
    --neon: var(--cyan-accent);
    --magenta: var(--magenta-core);
}

body {
    background-color: var(--dark-void);
    color: #e0e0e0;
    font-family: 'JetBrains Mono', monospace;
    scroll-behavior: smooth;
    overflow-x: hidden;
    /* Adding the radial depth from your asset */
    background-image: 
        radial-gradient(at 50% 0%, rgba(217, 0, 188, 0.15) 0%, transparent 50%),
        linear-gradient(180deg, var(--dark-void) 0%, #010307 100%);
    background-attachment: fixed;
}

.scanline {
    width: 100%; height: 100px; z-index: 50;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, var(--cyan-glow) 50%, rgba(0, 0, 0, 0) 100%);
    opacity: 0.05; position: fixed; bottom: 100%; left: 0; pointer-events: none;
    animation: scanline 10s linear infinite;
}

@keyframes scanline { 0% { bottom: 100%; } 100% { bottom: -100px; } }

/* The Glitch Engine - Tuned for Magenta Core */
.glitch {
    position: relative; 
    color: white; 
    font-weight: 800; 
    text-transform: uppercase;
    line-height: 1;
    display: inline-block;
}

.glitch::before, .glitch::after {
    content: attr(data-text); 
    position: absolute; 
    top: 0; left: 0; width: 100%; height: 100%; 
}

.glitch::before { 
    left: 2px; 
    text-shadow: -2px 0 var(--magenta-bright); 
    animation: glitch-anim 3s infinite linear alternate-reverse; 
}
.glitch::after { 
    left: -2px; 
    text-shadow: -2px 0 var(--cyan-accent), 2px 2px var(--magenta-core); 
    animation: glitch-anim2 2s infinite linear alternate-reverse; 
}

@keyframes glitch-anim {
    0% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, -1px); }
    50% { clip-path: inset(40% 0 50% 0); transform: translate(1px, 2px); }
    100% { clip-path: inset(5% 0 90% 0); transform: translate(-1px, -2px); }
}

@keyframes glitch-anim2 {
    0% { clip-path: inset(80% 0 5% 0); transform: translate(2px, 1px); }
    100% { clip-path: inset(30% 0 60% 0); transform: translate(-1px, -2px); }
}

.glitch-hero { 
    font-size: 3.5rem; 
    letter-spacing: -0.05em; 
    filter: drop-shadow(0 0 15px var(--magenta-glow));
}
@media (min-width: 768px) { .glitch-hero { font-size: 5rem; } }

.highlight-v { color: var(--magenta-bright); }

/* Navigation Nodes */
.nav-link {
    font-size: 10px;
    letter-spacing: 0.2em;
    font-weight: bold;
    text-transform: uppercase;
    transition: all 0.3s ease;
}
.nav-link:hover {
    color: var(--cyan-accent);
    text-shadow: 0 0 8px var(--cyan-glow);
}

/* Updated Terminal - Cyan Border, Midnight Interior */
.terminal-window {
    background: var(--dark-card);
    border: 1px solid var(--cyan-glow);
    height: 380px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 20px rgba(0, 243, 255, 0.05);
}

.status-value { color: var(--cyan-accent); font-weight: bold; }

/* Enrollment Portal UI */
.registration-container {
    background: var(--dark-card);
    border: 1px solid rgba(217, 0, 188, 0.2);
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
}

.reg-field-input {
    width: 100%; 
    background: #01050c; 
    border: 1px solid #1a2a44;
    padding: 12px; 
    color: #fff; 
    font-size: 14px; 
    font-family: 'JetBrains Mono', monospace;
    outline: none; 
    margin-bottom: 20px;
    transition: border-color 0.3s;
}
.reg-field-input:focus { 
    border-color: var(--cyan-accent); 
    box-shadow: 0 0 10px var(--cyan-glow);
}

/* The Data Transmission Trigger (Magenta to Cyan Transition) */
.transmit-btn {
    width: 100%; 
    background: linear-gradient(135deg, var(--magenta-core) 0%, #90007d 100%);
    color: #fff; 
    padding: 16px;
    text-transform: uppercase; 
    font-weight: 800; 
    border-radius: 4px;
    cursor: pointer; 
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
    border: 1px solid var(--magenta-bright);
    font-size: 14px;
    letter-spacing: 2px;
}
.transmit-btn:hover { 
    background: linear-gradient(135deg, var(--cyan-accent) 0%, #00a4bd 100%);
    border-color: #fff;
    box-shadow: 0 0 20px var(--cyan-accent); 
    color: #000;
}