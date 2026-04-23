const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');
const inputLine = document.getElementById('input-line');
const terminalInput = document.getElementById('terminal-input');
const timestampEl = document.getElementById('timestamp');

const initialLogs = [
    { text: "> RELAYING STRUCTURE UPDATE...", color: "text-[#00f3ff] font-bold" },
    { text: "> INDEXING 01_BRIEFING THROUGH 07_OPERATORS", color: "text-white/60" },
    { text: "> DEPLOYMENT SEQUENCE STABLE.", color: "text-white/40" },
    { text: "--------------------------------------------------", color: "text-white/10" },
    { text: "CRYPTS 5.0 Terminal [AUTHORIZED_SESSION]", color: "text-[#ff00c1]" }
];

function updateTimestamp() {
    const now = new Date();
    timestampEl.innerText = now.toISOString().replace('T', ' ').split('.')[0] + " UTC";
}

function addLog(text, color = "text-white/80") {
    const div = document.createElement('div');
    div.className = color;
    div.innerText = text;
    terminalOutput.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

async function runInitialLogs() {
    for (const log of initialLogs) {
        addLog(log.text, log.color);
        await new Promise(r => setTimeout(r, 300));
    }
    inputLine.classList.remove('hidden');
    terminalInput.focus();
}

function handleCommand(cmd) {
    const command = cmd.toLowerCase().trim();
    addLog(`root@crypts:~# ${cmd}`, "text-white/40");

    if (command === 'clear') {
        terminalOutput.innerHTML = '';
    } else if (command === 'help') {
        addLog("AVAILABLE_COMMANDS: HELP, CLEAR, ENROLL, STATUS, ABOUT", "text-[#00f3ff]");
    } else if (command === 'enroll') {
        addLog("REDIRECTING_TO_PORTAL...", "text-[#ff00c1]");
        window.location.hash = "enrollment";
    } else if (command === 'status') {
        addLog("SYSTEM_STATE: OPERATIONAL", "text-[#00f3ff]");
        addLog("NODES_ACTIVE: 7/7", "text-[#00f3ff]");
    } else if (command === 'about') {
        addLog("CRYPT 5.0 | OPG WORLD SCHOOL | TECHNICAL SYMPOSIUM", "text-white");
    } else if (command !== "") {
        addLog(`COMMAND_NOT_FOUND: ${command}`, "text-red-500");
    }
}

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = terminalInput.value;
        handleCommand(cmd);
        terminalInput.value = '';
    }
});

terminalBody.addEventListener('click', () => terminalInput.focus());

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle) menuToggle.onclick = () => mobileMenu.classList.add('active');
if (menuClose) menuClose.onclick = () => mobileMenu.classList.remove('active');

window.onload = () => {
    setInterval(updateTimestamp, 1000);
    updateTimestamp();
    runInitialLogs();
};