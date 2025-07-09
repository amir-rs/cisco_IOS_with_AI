# Cisco OSI with AI Asset

A web-based application that simulates a terminal environment and demonstrates the OSI model with AI-powered features. Built using Python and Flask, this project provides an interactive platform for learning and experimenting with networking concepts.

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

![Application Screenshot](screenshot.png)


## License

This project is licensed under the MIT License. 
