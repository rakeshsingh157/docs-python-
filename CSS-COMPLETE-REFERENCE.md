# Complete CSS Reference for Portfolio Website

## Overview
This document contains all CSS styles for navbar, aside (sidebar), and other components across your portfolio website.

## File Structure
- `main.css` - Main portfolio website styles
- `new-doc-styles.css` - Technical specifications page styles  
- `doc-styles.css` - Documentation pages including deployment guide

---

## 1. Navigation Bar (Navbar) Styles

### Main Website Navbar (`main.css`)
```css
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--gray-200);
    z-index: var(--z-fixed);
    transition: all var(--transition-base);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-6);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
}

.nav-logo {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-family: var(--font-secondary);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--primary-600);
    text-decoration: none;
    transition: color var(--transition-base);
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    list-style: none;
}

.nav-link {
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);
    position: relative;
}

.nav-link:hover,
.nav-link.active {
    color: var(--primary-600);
    background-color: var(--primary-50);
}

.nav-cta {
    background: var(--gradient-primary);
    color: var(--text-white) !important;
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-xl);
    font-weight: 600;
    box-shadow: var(--shadow-base);
    transition: all var(--transition-base);
}
```

### Documentation Navbar (`new-doc-styles.css`)
```css
.doc-nav {
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-6);
}

.nav-brand h2 {
    color: var(--primary-700);
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-transform: lowercase;
    letter-spacing: -0.5px;
}

.doc-nav .nav-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    padding: var(--space-2) var(--space-4);
    border-radius: 6px;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    position: relative;
}

.back-btn {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-white) !important;
    padding: var(--space-3) var(--space-4);
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
}
```

---

## 2. Aside/Sidebar Styles

### Technical Specs Sidebar (`new-doc-styles.css`)
```css
.doc-sidebar {
    width: 280px;
    min-width: 280px;
    max-width: 280px;
    background: var(--bg-primary);
    border-right: 1px solid var(--border);
    padding: var(--space-6);
    overflow-y: auto;
    position: fixed;
    top: 70px;
    left: 0;
    height: calc(100vh - 70px);
    flex-shrink: 0;
    z-index: 100;
    /* Hide scrollbar while maintaining scroll functionality */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.doc-sidebar::-webkit-scrollbar {
    display: none;
}

.sidebar-section {
    margin-bottom: var(--space-8);
}

.sidebar-section h3 {
    color: var(--text-primary);
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-2);
    border-bottom: 2px solid var(--primary-500);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.sidebar-section a {
    display: block;
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--space-2) var(--space-3);
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
}

.sidebar-section a:hover {
    color: var(--primary-600);
    background-color: var(--primary-50);
    border-left-color: var(--primary-500);
    transform: translateX(2px);
}

.sidebar-section a.active {
    color: var(--primary-700);
    background-color: var(--primary-100);
    border-left-color: var(--primary-600);
    font-weight: 600;
}
```

### Documentation Sidebar (`doc-styles.css`)
```css
.sidebar {
    background: var(--bg-primary);
    border-right: 1px solid var(--border);
    overflow-y: auto;
    position: sticky;
    top: 0;
    height: calc(100vh - 70px);
}

.sidebar-content {
    padding: var(--space-6);
}

.sidebar-content h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-4);
}

.sidebar-link {
    display: block;
    padding: var(--space-3) var(--space-4);
    color: var(--text-secondary);
    text-decoration: none;
    border-radius: var(--radius-base);
    font-weight: 500;
    transition: all var(--transition);
    position: relative;
}

.sidebar-link:hover {
    color: var(--primary-600);
    background-color: var(--primary-50);
}
```

---

## 3. Scrollbar Hiding (Global)

### Applied Across All Files
```css
/* Hide scrollbar while maintaining scroll functionality */
body {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
}

body::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbars for all scrollable elements */
* {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
}

*::-webkit-scrollbar {
    display: none;
}
```

---

## 4. CSS Variables (Color Palette)

### Primary Colors
```css
:root {
    --primary-50: #f0f9ff;
    --primary-500: #0ea5e9;
    --primary-600: #0284c7;
    --primary-700: #0369a1;
    
    --text-primary: #1f2937;
    --text-secondary: #4b5563;
    --text-white: #ffffff;
    
    --bg-primary: #ffffff;
    --bg-secondary: #f9fafb;
    --border: #e5e7eb;
    
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    
    --radius-base: 0.375rem;
    --transition: 0.2s ease-in-out;
}
```

---

## 5. Layout Styles

### Documentation Layout
```css
.doc-container {
    background: var(--bg-secondary);
    margin-top: 0;
    width: 100%;
    min-height: calc(100vh - 70px);
    max-width: 100vw;
    position: relative;
}

.doc-content {
    flex: 1;
    padding: var(--space-8);
    padding-top: calc(var(--space-8) + 50px);
    background: var(--bg-primary);
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    min-width: 0;
    width: calc(100% - 280px);
    margin-left: 280px;
}
```

---

## 6. Responsive Design

### Mobile Navigation
```css
@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .nav-toggle {
        display: block;
    }
    
    .doc-sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    
    .doc-content {
        width: 100%;
        margin-left: 0;
    }
}
```

---

## 7. Special Components

### Deployment Guide Specific Styles
```css
.requirement-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
    margin: var(--space-6) 0;
}

.req-card {
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    transition: all var(--transition);
}

.step-container {
    margin: var(--space-8) 0;
}

.step-card {
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    margin: var(--space-4) 0;
    position: relative;
}

.security-note {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-left: 4px solid var(--warning);
    padding: var(--space-4);
    margin: var(--space-4) 0;
    border-radius: var(--radius-base);
}
```

---

## Usage Instructions

1. **Main Website**: Uses `main.css` for homepage and portfolio sections
2. **Technical Specs**: Uses `new-doc-styles.css` for comprehensive documentation
3. **Deployment Guide**: Uses `doc-styles.css` with deployment-specific enhancements
4. **All Pages**: Have hidden scrollbars while maintaining scroll functionality
5. **Responsive**: All components adapt to mobile/tablet/desktop screens

## Files Applied To:
- `index.html` - Main portfolio (main.css)
- `technical-specs.html` - Technical documentation (new-doc-styles.css)  
- `deployment-guide.html` - Deployment instructions (doc-styles.css)
- `database-schema.html` - Database documentation (doc-styles.css)
- `api-documentation.html` - API docs (doc-styles.css)

All CSS is complete and functional across your entire portfolio website!