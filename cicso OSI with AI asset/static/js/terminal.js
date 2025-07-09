// Cisco IOS Command Guide Terminal JS

const commandInput = document.getElementById('command-input');
const outputDiv = document.getElementById('output');
const promptSpan = document.getElementById('prompt');

// List of common Cisco IOS commands for autocomplete
const ciscoCommands = [
    'show running-config',
    'show interfaces',
    'configure terminal',
    'interface GigabitEthernet0/1',
    'ip address 192.168.1.1 255.255.255.0',
    'no shutdown',
    'show version',
    'write memory',
    'show ip route',
    'show vlan',
    'enable',
    'exit',
    'hostname',
    'show startup-config',
    'reload',
    'copy running-config startup-config',
    'show mac address-table',
    'show arp',
    'show cdp neighbors',
    'show spanning-tree',
];

// Autocomplete logic
commandInput.addEventListener('input', function(e) {
    const value = commandInput.value;
    if (!value) return;
    const match = ciscoCommands.find(cmd => cmd.startsWith(value));
    if (match && match !== value) {
        commandInput.value = match;
        commandInput.setSelectionRange(value.length, match.length);
    }
});

// Helper: check if input is a question
function isQuestion(input) {
    const qwords = ['how', 'what', 'which', 'where', 'when', 'why', 'help', '?'];
    const lower = input.trim().toLowerCase();
    return qwords.some(q => lower.startsWith(q) || lower.includes('?'));
}

// Handle Enter key
commandInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const userInput = commandInput.value.trim();
        if (userInput.length === 0) return;
        outputDiv.innerHTML = '<span style="color:#4fc3f7">' + promptSpan.textContent + ' ' + userInput + '</span>';
        let explanation = '';
        let analysis = '';
        // Always show static explanation if not a question
        fetch('/explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: userInput })
        })
        .then(res => res.json())
        .then(data => {
            explanation = data.explanation;
            if (explanation) {
                outputDiv.innerHTML += '\n<span style="color:#ffd54f">Explanation:</span> ' + explanation + '\n';
            }
            outputDiv.innerHTML += '<span style="color:#b0bec5">AI Analysis:</span> <span id="ai-analysis-loading">Loading...</span>';
            // Always call GROQ for analysis
            return fetch('/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: userInput })
            });
        })
        .then(res => res.json())
        .then(data => {
            analysis = data.analysis;
            const loadingSpan = document.getElementById('ai-analysis-loading');
            if (loadingSpan) {
                loadingSpan.outerHTML = '<span style="color:#b0bec5">' + (analysis || 'No analysis available.') + '</span>';
            } else {
                outputDiv.innerHTML += '\n' + (analysis || 'No analysis available.');
            }
        })
        .catch(() => {
            const loadingSpan = document.getElementById('ai-analysis-loading');
            if (loadingSpan) {
                loadingSpan.outerHTML = '<span style="color:#e57373">Error contacting AI analysis server.</span>';
            } else {
                outputDiv.innerHTML += '\n<span style="color:#e57373">Error contacting server.</span>';
            }
        });
        commandInput.value = '';
        e.preventDefault();
    }
});

// Focus input on page load
window.onload = () => commandInput.focus();

// Help/Ask AI section logic
const helpInput = document.getElementById('help-input');
const helpBtn = document.getElementById('help-btn');
const helpOutput = document.getElementById('help-output');

function askHelp() {
    const question = helpInput.value.trim();
    if (!question) return;
    helpOutput.innerHTML = '<span style="color:#4fc3f7">AI is thinking...</span>';
    fetch('/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: question })
    })
    .then(res => res.json())
    .then(data => {
        helpOutput.innerHTML = data.analysis || '<span style="color:#e57373">No answer found.</span>';
    })
    .catch(() => {
        helpOutput.innerHTML = '<span style="color:#e57373">Error contacting AI server.</span>';
    });
}
helpBtn.addEventListener('click', askHelp);
helpInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        askHelp();
        e.preventDefault();
    }
});