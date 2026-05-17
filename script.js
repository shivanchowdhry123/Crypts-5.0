const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');
const inputLine = document.getElementById('input-line');
const terminalInput = document.getElementById('terminal-input');
const timestampEl = document.getElementById('timestamp');

// GOOGLE SHEETS CONFIGURATION
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxUt5jwpOGtOksKnoFBx7S2kFWre1py_mf3QlyImNrrp02eMoOxi5m4hVyrtLfWLdWu5Q/exec";

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

// Handle Form Submission
const registrationForm = document.querySelector('#enrollment form');
if (registrationForm) {
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const transmitBtn = registrationForm.querySelector('.transmit-btn');
        transmitBtn.disabled = true;
        transmitBtn.innerText = "TRANSMITTING...";

        const data = {
            email: registrationForm.querySelector('input[type="email"]').value,
            name: registrationForm.querySelector('input[placeholder="Operator Name"]').value,
            class: registrationForm.querySelector('select').value,
            section: registrationForm.querySelector('input[placeholder="Ex: A, B, C"]').value,
            events: Array.from(registrationForm.querySelector('select[multiple]').selectedOptions).map(opt => opt.value).join(', '),
            timestamp: new Date().toLocaleString()
        };

        addLog("> UPLOADING_DATA_PACKET...", "text-[#00f3ff]");

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', 
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            addLog("> SUCCESS: PACKET_RECEIVED_BY_CENTRAL_NODE.", "text-[#00f3ff] font-bold");
            addLog("> CONFIRMATION_EMAIL_QUEUED.", "text-white/40");
            
            registrationForm.reset();
            transmitBtn.disabled = false;
            transmitBtn.innerText = "Submit";
            
            setTimeout(() => {
                window.location.hash = "briefing";
            }, 3000);

        } catch (error) {
            addLog(`> CRITICAL_FAILURE: UNABLE TO SYNC WITH MATRIX`, "text-red-500");
            transmitBtn.disabled = false;
            transmitBtn.innerText = "Retry Transmission";
        }
    });
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

// --- CONSOLIDATED NAVIGATION LOGIC (DE-ENCAPSULATED FROM HTML) ---
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        });
    }

    const hideMenu = () => {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        }
    };

    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            e.preventDefault();
            hideMenu();
        });
    }

    if (mobileMenu) {
        const links = mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hideMenu();
            });
        });
    }
}

// Fallback safety checkpoint to verify ready state before attaching triggers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

window.onload = () => {
    setInterval(updateTimestamp, 1000);
    updateTimestamp();
    runInitialLogs();
};