# System Architecture

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                           │
├─────────────────────────────────────────────────────────────────┤
│  HTML Pages          │  CSS Styles        │  JavaScript Modules │
│  • index.html        │  • style.css       │  • home.js          │
│  • home.html         │  • ai.css          │  • schedule.js      │
│  • profile.html      │  • Sstyle.css      │  • ai_assistant.js  │
│  • schedule.html     │  • cstyle.css      │  • collaboration.js │
│  • AiAssistant.html  │                    │  • script.js        │
│  • collabration.html │                    │                     │
│  • AI.html           │                    │                     │
│  • chtbot.html       │                    │                     │
│  • add-new-task.html │                    │                     │
└─────────────────────────────────────────────────────────────────┘
                                │
                          HTTP/HTTPS
                                │
┌─────────────────────────────────────────────────────────────────┐
│                       FLASK SERVER                             │
├─────────────────────────────────────────────────────────────────┤
│  Main App            │  Backend Modules                        │
│  • app.py            │  • login_register.py                   │
│                      │  • home_routes.py                      │
│                      │  • schedule.py                         │
│                      │  • tasks.py                            │
│                      │  • user_profile.py                     │
│                      │  • collaboration.py                    │
│                      │  • ai_assistant.py                     │
│                      │  • ai_scheduler.py                     │
│                      │  • ai.py                               │
│                      │  • database.py                         │
│                      │  • config.py                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                        Database Connection
                                │
┌─────────────────────────────────────────────────────────────────┐
│                      MYSQL DATABASE                            │
├─────────────────────────────────────────────────────────────────┤
│  Tables:                                                        │
│  • users (user authentication & profiles)                      │
│  • events (tasks/events storage)                               │
│  • assigned_tasks (collaboration assignments)                  │
│  • collaborations (user partnerships)                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                          External APIs
                                │
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL AI APIS                          │
├─────────────────────────────────────────────────────────────────┤
│  • Gemini API (Primary AI)                                     │
│  • Cohere API (Secondary AI)                                   │
│  • Groq API (Fallback AI)                                      │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Core Components

### 1. **Frontend Layer**
- **Static Files**: HTML, CSS, JavaScript served by Flask
- **Session Management**: Browser-based sessions for user authentication
- **Real-time Updates**: AJAX calls for dynamic content loading
- **Responsive Design**: Mobile-friendly interface

### 2. **Backend Layer**
- **Flask Application**: Main web server with Blueprint architecture
- **API Endpoints**: RESTful APIs for all operations
- **Session Authentication**: Server-side session management
- **Business Logic**: Event management, collaboration, AI integration

### 3. **Database Layer**
- **MySQL Database**: Persistent data storage
- **Connection Pooling**: Efficient database connections
- **ACID Compliance**: Data integrity and consistency
- **Optimized Queries**: Performance-tuned SQL operations

### 4. **AI Integration Layer**
- **Multi-API Strategy**: Primary, secondary, and fallback AI providers
- **Natural Language Processing**: Chat-based task management
- **Schedule Optimization**: AI-powered task scheduling
- **Error Handling**: Graceful fallback between AI providers

## 🌐 Network Flow

1. **User Request** → Browser sends HTTP request
2. **Flask Router** → Routes request to appropriate Blueprint
3. **Authentication** → Validates user session
4. **Business Logic** → Processes request with appropriate module
5. **Database Query** → Retrieves/stores data in MySQL
6. **AI Processing** (if needed) → Calls external AI APIs
7. **Response Generation** → Formats response data
8. **Client Response** → Sends JSON/HTML back to browser

## 🔒 Security Architecture

```
User Authentication Flow:
Browser → Login Form → Flask Session → Database Verification → Session Cookie
    ↓
Protected Routes Check Session → Allow/Deny Access
```

## ⚡ Performance Features

- **IST Timezone**: All timestamps in Indian Standard Time
- **Caching**: Browser caching for static assets
- **Async Operations**: Non-blocking AI API calls
- **Database Optimization**: Indexed queries and connection reuse
- **Error Recovery**: Multiple AI fallback options

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Progressive Enhancement**: Works on all browsers
- **Touch-Friendly**: Mobile gesture support
- **Adaptive Layout**: Responsive grid system