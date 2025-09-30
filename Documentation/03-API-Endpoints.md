# API Endpoints

## 🌐 Complete API Reference

### **Base URL**: `http://localhost:5000`

---

## 🔐 Authentication & User Management

### **login_register.py**
```http
POST /login
Content-Type: application/json
Body: {"email": "user@example.com", "password": "password123"}
Response: {"message": "Login successful"}
Session: Creates user session

POST /register  
Content-Type: application/json
Body: {"username": "john", "email": "john@example.com", "password": "password123"}
Response: {"message": "Registration successful", "user_id": "uuid"}

POST /logout
Response: Clears session, redirects to /
```

### **user_profile.py**
```http
GET /api/profile
Response: {"user_id": "uuid", "username": "john", "email": "john@example.com", ...}

POST /api/profile/photo
Content-Type: multipart/form-data
Body: photo file
Response: {"message": "Photo updated", "photo_url": "/path/to/photo"}

POST /api/profile/contact
Content-Type: application/json  
Body: {"phone": "1234567890", "address": "123 Main St"}
Response: {"message": "Contact info updated"}

POST /api/profile/change-password
Content-Type: application/json
Body: {"current_password": "old", "new_password": "new"}
Response: {"message": "Password changed successfully"}
```

---

## 🏠 Home & Dashboard

### **home_routes.py**
```http
GET /api/tasks/today
Response: [{"id": 1, "title": "Task", "date": "2025-09-29", "done": false, ...}]

GET /api/events/month_view?year=2025&month=9
Response: {"1": {"hasPending": true, "hasCompleted": false}, "2": {...}}

GET /api/events?year=2025&month=9
Response: [{"id": 1, "title": "Event", "date": "2025-09-29", ...}]
```

---

## 📅 Schedule & Task Management

### **schedule.py**
```http
GET /api/tasks/all
Response: [{"id": 1, "title": "Task", "description": "...", "category": "work", ...}]

GET /api/schedule/events/month_view?year=2025&month=9
Response: {"1": {"hasPending": true, "hasCompleted": false}}

POST /api/tasks/toggle-done
Content-Type: application/json
Body: {"task_id": 1}
Response: {"message": "Task status updated", "new_status": true}
```

### **tasks.py**
```http
POST /api/tasks
Content-Type: application/json
Body: {
  "title": "New Task",
  "description": "Task description", 
  "category": "work",
  "date": "2025-09-29",
  "time": "14:30"
}
Response: {"message": "Task created", "task_id": 123}

PUT /api/tasks/{task_id}
Content-Type: application/json
Body: {"title": "Updated Task", "done": true}
Response: {"message": "Task updated"}

DELETE /api/tasks/{task_id}
Response: {"message": "Task deleted"}
```

---

## 🤝 Collaboration System

### **collaboration.py**
```http
# Collaboration Management
POST /api/collaboration/invite
Content-Type: application/json
Body: {"email": "collaborator@example.com"}
Response: {"message": "Invitation sent successfully!"}

GET /api/collaboration/requests
Response: [{"id": 1, "username": "john", "photo_url": "/path/photo"}]

POST /api/collaboration/respond
Content-Type: application/json
Body: {"collaboration_id": 1, "action": "accept"}
Response: {"message": "Invitation accepted"}

GET /api/collaborators
Response: [{"user_id": "uuid", "username": "john", "email": "john@example.com"}]

# Task Management (Collaboration Context)
GET /api/tasks/personal
Response: [{"id": 1, "title": "Assigned Task", "assigner_email": "boss@company.com"}]
Note: Only shows tasks assigned TO current user by others

GET /api/tasks/assigned-by-me  
Response: [{"id": 2, "title": "Task", "assignee_name": "john"}]
Note: Shows tasks assigned BY current user to others

GET /api/tasks/own
Response: [{"id": 3, "title": "My Task", ...}]
Note: Shows user's self-created tasks (not assigned by others)

# Task Assignment
POST /api/task/create_and_assign
Content-Type: application/json
Body: {
  "assignee_id": "uuid",
  "title": "New Assignment", 
  "description": "Task details",
  "category": "work",
  "date": "2025-09-29",
  "time": "15:00"
}
Response: {"message": "Task created and assigned", "event_id": 123}

POST /api/task/toggle-done
Content-Type: application/json
Body: {"task_id": 1}
Response: {"message": "Task status updated"}

DELETE /api/task/delete
Content-Type: application/json
Body: {"task_id": 1}  
Response: {"message": "Task successfully deleted"}

# Calendar Integration
GET /api/collaboration/events/month_view?year=2025&month=9
Response: {"1": {"hasPending": true, "hasCompleted": false}}
```

---

## 🤖 AI Integration

### **ai_assistant.py**
```http
POST /api/ai/chat
Content-Type: application/json
Body: {"message": "Schedule a meeting tomorrow at 2pm"}
Response: {"reply": "I'll help you schedule that meeting. Creating task..."}

POST /api/ai/add-task
Content-Type: application/json  
Body: {"task_data": {"title": "Meeting", "date": "2025-09-30", "time": "14:00"}}
Response: {"message": "Task added successfully", "task_id": 123}

DELETE /api/ai/delete-task/{task_id}
Response: {"message": "Task deleted successfully"}
```

### **ai_scheduler.py**
```http
POST /api/ai/generate-schedule
Content-Type: application/json
Body: {"preferences": "morning meetings", "duration": "1 week"}
Response: {"schedule": [...], "message": "Schedule generated"}
```

### **ai.py**
```http
POST /api/ai/process
Content-Type: application/json
Body: {"query": "What are my tasks for today?", "context": "schedule"}
Response: {"response": "You have 3 tasks today...", "actions": [...]}
```

---

## 🔄 Response Formats

### **Success Response**
```json
{
  "message": "Operation successful",
  "data": {...},
  "status": "success"
}
```

### **Error Response**
```json
{
  "error": "Error description",
  "code": 400,
  "details": "Additional error information"
}
```

### **Authentication Error**
```json
{
  "error": "Unauthorized",
  "redirect": "/login"
}
```

---

## 🎯 API Usage Patterns

### **Standard CRUD Pattern**
```javascript
// Create
fetch('/api/tasks', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(taskData)
})

// Read
fetch('/api/tasks/all')

// Update  
fetch('/api/tasks/1', {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(updates)
})

// Delete
fetch('/api/tasks/1', {method: 'DELETE'})
```

### **Session-Based Authentication**
```javascript
// All requests automatically include session cookie
// No manual token management required
// Server validates session on each request
```

### **Error Handling Pattern**
```javascript
try {
  const response = await fetch('/api/endpoint');
  if (response.status === 401) {
    window.location.href = '/login';
    return;
  }
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  // Handle success
} catch (error) {
  console.error('API Error:', error);
  // Handle error
}
```

---

## 📊 Database Operations

### **Query Patterns**
- **IST Timezone**: All datetime operations use Asia/Kolkata timezone
- **User Filtering**: All queries filter by session user_id
- **Soft Deletes**: Most operations are hard deletes
- **Transactions**: Multi-table operations use database transactions
- **Joins**: Complex queries use LEFT/INNER JOINs for related data

### **Performance Considerations**
- **Indexed Queries**: All user_id and date queries are indexed
- **Connection Pooling**: Database connections are reused
- **Query Optimization**: LIMIT clauses removed per user request
- **Prepared Statements**: All queries use parameterized statements