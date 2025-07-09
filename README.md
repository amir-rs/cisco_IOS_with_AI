# Cisco OSI with AI Asset

## Overview

This application is designed to help users understand and interact with the OSI (Open Systems Interconnection) model through a web-based terminal interface enhanced with AI features. Users can register, log in, and access a simulated terminal where they can enter networking commands. The AI component analyzes user commands, provides intelligent feedback, and helps users learn about the different layers of the OSI model in a practical, hands-on way.

The application is ideal for students, educators, and networking professionals who want to:
- Experiment with OSI model concepts in a safe environment
- Receive AI-driven guidance and explanations
- Visualize how data moves through OSI layers
- Practice networking commands without needing a real network setup

## How It Works

1. **User Registration & Login:** Users create an account and log in to access the main features.
2. **Simulated Terminal:** After logging in, users are presented with a web-based terminal where they can input networking-related commands.
3. **Command Processing:** The application uses a command sanitizer to ensure all inputs are safe. Commands are then analyzed by the AI module, which provides feedback, explanations, or simulated results.
4. **OSI Model Visualization:** The system demonstrates how each command relates to the OSI model, helping users understand which layer is involved and what happens at each step.
5. **Session Management:** User sessions are securely managed, and all interactions are logged for review and learning purposes.

## Features

- **User Authentication:** Register, log in, and manage your profile securely.
- **Simulated Terminal:** Interact with a web-based terminal interface.
- **OSI Model Demonstration:** Visualize and experiment with OSI layers.
- **AI Integration:** Leverage AI to analyze commands and provide intelligent feedback.
- **Command Sanitization:** Ensures safe execution of user commands.
- **Session Management:** Secure user sessions with Flask-Session.
- **Error Handling:** Custom error pages for a better user experience.

## Project Structure

```
cicso OSI with AI asset/
│
├── app.py                  # Main Flask application
├── utils/
│   └── command_sanitizer.py
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── profile.html
│   └── errors/
│       ├── 404.html
│       └── 500.html
├── static/
│   └── js/
│       └── terminal.js
├── uploads/                # For user-uploaded files
├── instance/
│   └── terminal.db         # Database file
└── app.log                 # Application log file
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cisco-osi-with-ai-asset.git
   cd cisco-osi-with-ai-asset
   ```

2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   python app.py
   ```

5. **Open your browser and go to:**
   ```
   http://127.0.0.1:5000/
   ```

## Screenshot

Below is a screenshot of the application in action:

![Application Screenshot](Cisco%20IOS%20Command%20Guide.png)

## License

This project is licensed under the MIT License. 
