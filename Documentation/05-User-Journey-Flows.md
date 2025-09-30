# User Journey Flows

## 🚀 Complete User Experience Flows

---

## 🔐 Authentication Flow

### **New User Registration**
```mermaid
graph TD
    A[Visit Website] --> B[index.html]
    B --> C[Click Register]
    C --> D[Fill Registration Form]
    D --> E[Submit via script.js]
    E --> F[POST /register]
    F --> G[login_register.py validates]
    G --> H{Validation OK?}
    H -->|Yes| I[Create user in database]
    H -->|No| J[Show error message]
    I --> K[Auto-login user]
    K --> L[Redirect to home.html]
    J --> D
```

### **Existing User Login**
```mermaid
graph TD
    A[Visit Website] --> B[index.html]
    B --> C[Enter credentials]
    C --> D[Submit via script.js]
    D --> E[POST /login]
    E --> F[login_register.py validates]
    F --> G{Credentials Valid?}
    G -->|Yes| H[Create session]
    G -->|No| I[Show error message]
    H --> J[Redirect to home.html]
    I --> C
```

---

## 🏠 Home Dashboard Experience

### **Dashboard Loading Flow**
```mermaid
graph TD
    A[Access home.html] --> B[Load home.js]
    B --> C[Check authentication]
    C --> D{Session valid?}
    D -->|No| E[Redirect to login]
    D -->|Yes| F[Load today's tasks]
    F --> G[GET /api/tasks/today]
    G --> H[Render task list]
    H --> I[Load calendar events]
    I --> J[GET /api/events/month_view]
    J --> K[Render calendar with colors]
    K --> L[Dashboard ready]
```

### **Task Creation from Home**
```mermaid
graph TD
    A[Click Add Task] --> B[Open task modal]
    B --> C[Fill task details]
    C --> D[Submit form]
    D --> E[POST /api/tasks]
    E --> F[tasks.py creates event]
    F --> G[Database INSERT]
    G --> H[Return task ID]
    H --> I[Update UI]
    I --> J[Refresh calendar]
```

---

## 📅 Schedule Management Flow

### **Schedule Page Navigation**
```mermaid
graph TD
    A[Click Schedule menu] --> B[Load schedule.html]
    B --> C[Initialize schedule.js]
    C --> D[Load all user tasks]
    D --> E[GET /api/tasks/all]
    E --> F[Render task list]
    F --> G[Setup calendar view]
    G --> H[Load month events]
    H --> I[GET /api/schedule/events/month_view]
    I --> J[Color calendar days]
    J --> K[Schedule ready]
```

### **Task Management Actions**
```mermaid
graph TD
    A[Select task action] --> B{Action type?}
    B -->|Toggle Done| C[POST /api/tasks/toggle-done]
    B -->|Edit| D[Open edit modal]
    B -->|Delete| E[Confirm deletion]
    C --> F[Update task status]
    D --> G[PUT /api/tasks/id]
    E --> H[DELETE /api/tasks/id]
    F --> I[Refresh UI]
    G --> I
    H --> I
    I --> J[Update calendar colors]
```

---

## 🤖 AI Assistant Flow

### **AI Chat Interaction**
```mermaid
graph TD
    A[Access AiAssistant.html] --> B[Load ai_assistant.js]
    B --> C[Initialize chat interface]
    C --> D[User types message]
    D --> E[Click send]
    E --> F[POST /api/ai/chat]
    F --> G[ai_assistant.py processes]
    G --> H{AI API available?}
    H -->|Gemini OK| I[Use Gemini API]
    H -->|Gemini fails| J[Try Cohere API]
    H -->|Cohere fails| K[Use Groq API]
    I --> L[Process AI response]
    J --> L
    K --> L
    L --> M{Task detected?}
    M -->|Yes| N[Create task]
    M -->|No| O[Return chat response]
    N --> P[POST /api/ai/add-task]
    P --> Q[Show success message]
    O --> Q
    Q --> R[Update chat UI]
```

### **AI Schedule Generation**
```mermaid
graph TD
    A[Request schedule generation] --> B[POST /api/ai/generate-schedule]
    B --> C[ai_scheduler.py analyzes]
    C --> D[Check existing tasks]
    D --> E[AI generates suggestions]
    E --> F[Return optimized schedule]
    F --> G[Display suggestions]
    G --> H[User approves tasks]
    H --> I[Bulk create tasks]
    I --> J[Update calendar]
```

---

## 🤝 Collaboration Flow

### **Inviting Collaborators**
```mermaid
graph TD
    A[Access collabration.html] --> B[Load collaboration.js]
    B --> C[Click invite button]
    C --> D[Enter collaborator email]
    D --> E[POST /api/collaboration/invite]
    E --> F[collaboration.py validates]
    F --> G{User exists?}
    G -->|Yes| H[Create invitation]
    G -->|No| I[Show error]
    H --> J[Store in collaborations table]
    J --> K[Show success message]
    I --> D
```

### **Managing Collaboration Requests**
```mermaid
graph TD
    A[Collaborator receives invite] --> B[Login to system]
    B --> C[See notification badge]
    C --> D[Click requests button]
    D --> E[GET /api/collaboration/requests]
    E --> F[Show pending invites]
    F --> G[User decides]
    G --> H{Accept or Reject?}
    H -->|Accept| I[POST /api/collaboration/respond]
    H -->|Reject| J[POST /api/collaboration/respond]
    I --> K[Create collaboration relationship]
    J --> L[Mark as rejected]
    K --> M[Update collaborators list]
    L --> M
```

### **Task Assignment Flow**
```mermaid
graph TD
    A[Select collaborator] --> B[Click assign task]
    B --> C[Fill task details]
    C --> D[POST /api/task/create_and_assign]
    D --> E[collaboration.py creates]
    E --> F[Insert into events table]
    F --> G[Insert into assigned_tasks table]
    G --> H[Task assigned successfully]
    H --> I[Notify assignee]
    I --> J[Update collaboration view]
```

---

## 👤 Profile Management Flow

### **Profile View & Edit**
```mermaid
graph TD
    A[Click profile menu] --> B[Load profile.html]
    B --> C[GET /api/profile]
    C --> D[Display user info]
    D --> E[User edits field]
    E --> F{Edit type?}
    F -->|Photo| G[POST /api/profile/photo]
    F -->|Contact| H[POST /api/profile/contact]
    F -->|Password| I[POST /api/profile/change-password]
    G --> J[Update profile display]
    H --> J
    I --> J
    J --> K[Show success message]
```

---

## 📱 Calendar Interaction Flow

### **Calendar Navigation**
```mermaid
graph TD
    A[View calendar] --> B[Calendar displays current month]
    B --> C[User navigates]
    C --> D{Navigation action?}
    D -->|Previous month| E[calendarDate.setMonth(-1)]
    D -->|Next month| F[calendarDate.setMonth(+1)]
    D -->|Today button| G[calendarDate = getISTDate()]
    E --> H[Render new calendar]
    F --> H
    G --> H
    H --> I[Fetch month events]
    I --> J[Apply day colors]
    J --> K[Calendar updated]
```

### **Calendar Color Coding**
```mermaid
graph TD
    A[Load calendar events] --> B[GET /api/events/month_view]
    B --> C[Process response data]
    C --> D[For each calendar day]
    D --> E{Day has events?}
    E -->|No events| F[Default day style]
    E -->|Has pending| G[Apply has-pending class]
    E -->|Has completed| H[Apply has-completed class]
    E -->|Has both| I[Apply has-both class]
    E -->|Is today| J[Apply today class]
    F --> K[Next day]
    G --> K
    H --> K
    I --> K
    J --> K
    K --> L{More days?}
    L -->|Yes| D
    L -->|No| M[Calendar colored]
```

---

## 🔄 Session Management Flow

### **Session Lifecycle**
```mermaid
graph TD
    A[User logs in] --> B[Flask creates session]
    B --> C[Session cookie sent to browser]
    C --> D[Browser stores cookie]
    D --> E[User navigates pages]
    E --> F[Each request includes cookie]
    F --> G[Flask validates session]
    G --> H{Session valid?}
    H -->|Yes| I[Allow access]
    H -->|No| J[Redirect to login]
    I --> K[Process request]
    K --> L{User continues?}
    L -->|Yes| E
    L -->|No| M[User logs out]
    M --> N[Clear session]
    N --> O[Redirect to home]
```

---

## 📊 Error Handling Flow

### **API Error Recovery**
```mermaid
graph TD
    A[Make API request] --> B[Receive response]
    B --> C{Response status?}
    C -->|200 OK| D[Process data]
    C -->|401 Unauthorized| E[Redirect to login]
    C -->|400 Bad Request| F[Show validation error]
    C -->|500 Server Error| G[Show generic error]
    C -->|Network Error| H[Show connection error]
    D --> I[Update UI]
    E --> J[Clear local state]
    F --> K[Highlight form errors]
    G --> L[Suggest retry]
    H --> L
    K --> M[Allow user correction]
    L --> N[Enable retry button]
```

### **AI Fallback Strategy**
```mermaid
graph TD
    A[AI request made] --> B[Try Gemini API]
    B --> C{Gemini success?}
    C -->|Yes| D[Return Gemini response]
    C -->|No| E[Try Cohere API]
    E --> F{Cohere success?}
    F -->|Yes| G[Return Cohere response]
    F -->|No| H[Try Groq API]
    H --> I{Groq success?}
    I -->|Yes| J[Return Groq response]
    I -->|No| K[Return error message]
    D --> L[Process AI response]
    G --> L
    J --> L
    K --> M[Show fallback message]
```

---

## 🎯 Performance Optimization Flow

### **Page Load Optimization**
```mermaid
graph TD
    A[Page request] --> B[HTML loads first]
    B --> C[Critical CSS loaded]
    C --> D[Page renders basic layout]
    D --> E[JavaScript loads asynchronously]
    E --> F[API calls made in parallel]
    F --> G[Data populates incrementally]
    G --> H[Full page interactive]
```