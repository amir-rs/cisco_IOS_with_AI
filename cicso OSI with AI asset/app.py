from flask import Flask, render_template, request, jsonify
from flask_session import Session
import re
import requests
import os

GROQ_API_KEY = 
HUGGINGFACE_TOKEN = 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'cisco-guide-secret-key'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

# Cisco IOS command explanations
ios_commands = {
    'show running-config': 'Display the current active configuration.',
    'show interfaces': 'Show status and statistics for all interfaces.',
    'configure terminal': 'Enter global configuration mode.',
    'interface GigabitEthernet0/1': 'Enter interface configuration mode for GigabitEthernet0/1.',
    'ip address': 'Assign an IP address to an interface. Usage: ip address <ip> <subnet mask>',
    'no shutdown': 'Enable an interface.',
    'show version': 'Display IOS version and device information.',
    'write memory': 'Save the running configuration to startup configuration.',
    'show ip route': 'Display the routing table.',
    'show vlan': 'Show VLAN information.',
    'enable': 'Enter privileged EXEC mode.',
    'exit': 'Exit from the current mode.',
    'hostname': 'Set the system hostname. Usage: hostname <name>',
    'show startup-config': 'Display the configuration stored in NVRAM.',
    'reload': 'Reboot the device.',
    'copy running-config startup-config': 'Save the running configuration to startup configuration.',
    'show mac address-table': 'Display the MAC address table.',
    'show arp': 'Display the ARP table.',
    'show cdp neighbors': 'Show directly connected Cisco devices.',
    'show spanning-tree': 'Display spanning tree information.',
}

# Helper to match command (with arguments)
def explain_command(cmd):
    cmd = cmd.strip()
    # Exact match
    if cmd in ios_commands:
        return ios_commands[cmd]
    # Match commands with arguments
    for key in ios_commands:
        if cmd.startswith(key):
            return ios_commands[key]
    return None

# Helper to detect Persian (Farsi) text
def is_farsi(text):
    # Unicode range for Persian/Arabic letters
    return bool(re.search(r'[\u0600-\u06FF]', text))

# GROQ API integration for analysis and question answering
def groq_analyze(user_input):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    # Detect language for the system prompt
    if is_farsi(user_input):
        sys_prompt = "You are a Cisco IOS expert. Answer the user's question or analyze the command in Persian (Farsi). If a command is given, explain what it does, its context, and best practices in Persian. If a question is asked, provide the best matching command and guidance in Persian."
    else:
        sys_prompt = "You are a Cisco IOS expert. Analyze the following command or answer the user's question about Cisco IOS. If a command is given, explain what it does, its context, and best practices. If a question is asked, provide the best matching command and guidance."
    prompt = [
        {"role": "system", "content": sys_prompt},
        {"role": "user", "content": user_input}
    ]
    payload = {
        "model": "llama3-70b-8192",
        "messages": prompt,
        "max_tokens": 512,
        "temperature": 0.2
    }
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=20)
        response.raise_for_status()
        data = response.json()
        return data['choices'][0]['message']['content'].strip()
    except Exception as e:
        return f"[GROQ API error: {str(e)}]"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/explain', methods=['POST'])
def explain():
    data = request.get_json()
    command = data.get('command', '').strip()
    explanation = explain_command(command)
    return jsonify({'explanation': explanation})

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    user_input = data.get('input', '').strip()
    if not user_input:
        return jsonify({'analysis': 'No input provided.'})
    analysis = groq_analyze(user_input)
    return jsonify({'analysis': analysis})

if __name__ == '__main__':
    app.run(debug=True)