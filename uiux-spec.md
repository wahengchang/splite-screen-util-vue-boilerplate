# UI/UX Specifications

## Design System Overview

This specification defines the user interface and user experience standards for Vue Component-Store-Observer architecture with prop-based components and reactive state management.

### Implementation Goals
- **Vue Component Architecture**: Props-based components with clean separation
- **Rapid Development**: Reusable Vue component patterns with store integration
- **Consistency Guarantee**: Unified visual patterns across all components
- **Technical Constraint Adaptation**: Vue 3 CDN + Tailwind CSS + static serving
- **Reactive Architecture**: Vue reactive store with computed properties

## Technical Implementation Foundation

### CSS Variables System
All styles are based on CSS variables for theme switching and consistency:

```css
:root {
  /* === Color System === */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --text-muted: #adb5bd;
  
  --accent-green: #22c55e;
  --accent-green-hover: #16a34a;
  
  --border-color: #dee2e6;
  --border-focus: #22c55e;
  
  /* === Spacing System === */
  --spacing-xs: 0.25rem;    /* 4px */
  --spacing-sm: 0.5rem;     /* 8px */
  --spacing-md: 1rem;       /* 16px */
  --spacing-lg: 1.5rem;     /* 24px */
  --spacing-xl: 2rem;       /* 32px */
  
  /* === Typography === */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  
  /* === Borders & Shadows === */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* Dark Theme Override */
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #404040;
  
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
  --text-muted: #6c757d;
  
  --border-color: #404040;
}
```

### Base HTML Structure Template
Every tool should use this Vue-enabled structure:

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue CDN Static Starter</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body class="bg-primary text-primary">
  <div id="app" class="h-screen flex flex-col">
    <!-- Header -->
    <header id="app-header" class="app-header">
      <!-- Header content -->
    </header>
    
    <!-- Main content -->
    <main class="app-main">
      <!-- Left panel - Vue Component Mount Point -->
      <section id="appLeft" class="app-panel-left">
        <!-- Vue component will replace this -->
      </section>
      
      <!-- Divider -->
      <div id="divider" class="app-divider"></div>
      
      <!-- Right panel area -->
      <section id="appRight" class="app-panel-right">
        <!-- Result Config Bar -->
        <div id="appResultConfigBar" class="result-config-bar">
          <!-- Vue component mount point -->
        </div>
        
        <!-- Result Display Area -->
        <div id="appResultDisplay" class="result-display-area">
          <!-- Vue component mount point -->
        </div>
      </section>
    </main>
    
    <!-- Footer status bar -->
    <footer class="app-footer">
      <span>Ready</span>
    </footer>
  </div>
  
  <!-- Vue Component-Store-Observer Architecture -->
  <script src="js/store.js"></script>
  <script src="js/theme-handler.js"></script>
  <script src="js/panel-resize-handler.js"></script>
  <script src="js/components/left-component.js"></script>
  <script src="js/components/result-config-bar.js"></script>
  <script src="js/components/result-display/component.js"></script>
  <script src="js/components/result-display/wrapper.js"></script>
  <script src="js/components/global-config.js"></script>
</body>
</html>
```

## Layout Implementation

### App Main Layout
```css
.app-header {
  @apply h-14 bg-secondary border-b border-tertiary px-6 flex items-center justify-between;
}

.app-main {
  @apply flex-1 flex min-h-0;
}

.app-panel-left {
  @apply w-1/2 bg-primary border-r border-tertiary flex flex-col;
}

.app-panel-right {
  @apply w-1/2 bg-primary flex flex-col;
}

.app-divider {
  @apply w-1 bg-tertiary cursor-col-resize hover:bg-accent-green transition-colors;
}

.app-footer {
  @apply h-8 bg-secondary border-t border-tertiary px-4 flex items-center text-sm text-secondary;
}
```

### Responsive Layout
```css
/* Tablet */
@media (max-width: 1024px) {
  .app-main {
    @apply flex-col;
  }
  
  .app-panel-left,
  .app-panel-right {
    @apply w-full h-1/2;
  }
  
  .app-divider {
    @apply w-full h-1 cursor-row-resize;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .app-panel-left,
  .app-panel-right {
    @apply h-auto;
  }
  
  /* Control panel visibility via JavaScript */
  .panel-hidden {
    @apply hidden;
  }
}
```

## Component Implementation

### 1. Top Navigation Bar
```html
<header class="app-header">
  <!-- Left: Logo and title -->
  <div class="flex items-center gap-4">
    <div class="text-lg font-semibold">Tool Name</div>
  </div>
  
  <!-- Right: Control buttons -->
  <div class="flex items-center gap-2">
    <!-- Dark mode toggle -->
    <button class="theme-toggle" onclick="toggleTheme()">
      <div class="theme-toggle-slider"></div>
    </button>
    
    <!-- Global config -->
    <button class="btn-icon" onclick="openGlobalConfig()">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <!-- Settings icon -->
      </svg>
    </button>
  </div>
</header>
```

```css
.theme-toggle {
  @apply relative w-12 h-6 bg-tertiary rounded-full transition-all duration-200 cursor-pointer;
}

.theme-toggle-slider {
  @apply absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200;
}

[data-theme="dark"] .theme-toggle-slider {
  @apply transform translate-x-6;
}

.btn-icon {
  @apply w-8 h-8 rounded-md hover:bg-secondary transition-colors flex items-center justify-center;
}
```

### 2. Input Panel Component
```html
<section class="app-panel-left">
  <!-- Panel header -->
  <div class="panel-header">
    <h2 class="panel-title">Input</h2>
    <div class="panel-actions">
      <button class="btn-sm" onclick="clearInput()">Clear</button>
      <button class="btn-sm" onclick="importFile()">Import</button>
    </div>
  </div>
  
  <!-- Panel content -->
  <div class="panel-content">
    <textarea 
      id="input-editor" 
      class="input-editor"
      placeholder="Enter content here..."
      oninput="handleInputChange(this.value)"
    ></textarea>
  </div>
  
  <!-- Panel footer -->
  <div class="panel-footer">
    <span class="status-text">Characters: <span id="char-count">0</span></span>
  </div>
</section>
```

```css
.panel-header {
  @apply h-12 px-4 border-b border-tertiary flex items-center justify-between bg-secondary;
}

.panel-title {
  @apply font-medium text-primary;
}

.panel-actions {
  @apply flex gap-2;
}

.panel-content {
  @apply flex-1 p-4 overflow-hidden;
}

.panel-footer {
  @apply h-8 px-4 border-t border-tertiary flex items-center bg-secondary;
}

.input-editor {
  @apply w-full h-full resize-none border-none outline-none bg-transparent text-primary font-mono text-sm leading-relaxed;
}

.btn-sm {
  @apply px-3 py-1 text-sm border border-tertiary rounded-md hover:bg-tertiary transition-colors;
}

.status-text {
  @apply text-sm text-secondary;
}
```

### 3. Result Panel Component
```html
<section class="app-panel-right">
  <!-- Result config bar -->
  <div class="result-config">
    <div class="config-group">
      <label class="config-label">Format:</label>
      <select class="config-select" onchange="handleFormatChange(this.value)">
        <option value="text">Text</option>
        <option value="html">HTML</option>
        <option value="json">JSON</option>
      </select>
    </div>
    
    <div class="config-actions">
      <button class="btn-sm" onclick="exportResult()">Export</button>
      <button class="btn-sm" onclick="copyResult()">Copy</button>
    </div>
  </div>
  
  <!-- Result display area -->
  <div class="result-display">
    <div id="result-content" class="result-content">
      <!-- Result content -->
    </div>
  </div>
</section>
```

```css
.result-config {
  @apply h-12 px-4 border-b border-tertiary flex items-center justify-between bg-secondary;
}

.config-group {
  @apply flex items-center gap-2;
}

.config-label {
  @apply text-sm text-secondary;
}

.config-select {
  @apply px-2 py-1 text-sm border border-tertiary rounded bg-primary text-primary;
}

.config-actions {
  @apply flex gap-2;
}

.result-display {
  @apply flex-1 p-4 overflow-auto;
}

.result-content {
  @apply w-full h-full bg-secondary rounded-lg p-4 font-mono text-sm;
}
```

### 4. Modal Component
```html
<!-- Global config modal -->
<div id="config-modal" class="modal hidden">
  <div class="modal-backdrop" onclick="closeModal()"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">Global Settings</h3>
      <button class="btn-icon" onclick="closeModal()">×</button>
    </div>
    
    <div class="modal-body">
      <!-- Config options -->
      <div class="form-group">
        <label class="form-label">Font Size</label>
        <select class="form-select" onchange="handleFontSizeChange(this.value)">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>
    
    <div class="modal-footer">
      <button class="btn-secondary" onclick="resetSettings()">Reset</button>
      <button class="btn-primary" onclick="saveSettings()">Save</button>
    </div>
  </div>
</div>
```

```css
.modal {
  @apply fixed inset-0 z-50 flex items-center justify-center;
}

.modal-backdrop {
  @apply absolute inset-0 bg-black bg-opacity-50;
}

.modal-content {
  @apply relative bg-primary border border-tertiary rounded-lg shadow-lg w-96 max-h-[80vh] overflow-auto;
}

.modal-header {
  @apply p-4 border-b border-tertiary flex items-center justify-between;
}

.modal-title {
  @apply text-lg font-semibold;
}

.modal-body {
  @apply p-4 space-y-4;
}

.modal-footer {
  @apply p-4 border-t border-tertiary flex gap-2 justify-end;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-primary;
}

.form-select {
  @apply w-full px-3 py-2 border border-tertiary rounded-md bg-primary text-primary;
}

.btn-primary {
  @apply px-4 py-2 bg-accent-green text-white rounded-md hover:bg-accent-green-hover transition-colors;
}

.btn-secondary {
  @apply px-4 py-2 border border-tertiary rounded-md hover:bg-secondary transition-colors;
}
```

## Interaction Implementation

### Theme Toggle Function
```javascript
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = savedTheme || systemTheme;
  
  document.documentElement.setAttribute('data-theme', theme);
}
```

### Panel Resize
```javascript
function initPanelResize() {
  const divider = document.querySelector('.app-divider');
  const leftPanel = document.querySelector('.app-panel-left');
  const rightPanel = document.querySelector('.app-panel-right');
  let isResizing = false;

  divider.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  });

  function handleResize(e) {
    if (!isResizing) return;
    
    const container = document.querySelector('.app-main');
    const containerRect = container.getBoundingClientRect();
    const leftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    if (leftWidth >= 20 && leftWidth <= 80) {
      leftPanel.style.width = `${leftWidth}%`;
      rightPanel.style.width = `${100 - leftWidth}%`;
    }
  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  }
}
```

### Vue Component State Management Pattern
```javascript
// Global Vue Reactive Store
window.AppStore = (function() {
  const reactiveData = Vue.reactive({
    inputText: '',
    selectedFormat: 'text',
    currentTheme: localStorage.getItem('app-theme') || 'dark',
    panelRatio: parseInt(localStorage.getItem('panel-ratio')) || 50,
    leftPanelState: {
      isExpanded: true,
      activeTab: 'input'
    },
    rightPanelState: {
      isExpanded: true,
      activeTab: 'result'
    }
  });

  return {
    data: reactiveData,
    updateInputText(text) {
      reactiveData.inputText = text;
      this.saveToLocalStorage('inputText', text);
    },
    updateFormat(format) {
      reactiveData.selectedFormat = format;
      this.saveToLocalStorage('selectedFormat', format);
    },
    updateTheme(theme) {
      reactiveData.currentTheme = theme;
      this.saveToLocalStorage('app-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  };
})();

// Pure Props-Based Vue Component
const ResultDisplayComponent = {
  props: {
    inputText: { type: String, default: '' },
    selectedFormat: { type: String, default: 'text' }
  },
  
  computed: {
    processedResult() {
      // Component handles its own processing
      return this.analyzeText(this.inputText);
    }
  },
  
  methods: {
    analyzeText(text) {
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      return `Word Count: ${words.length}\nCharacter Count: ${text.length}`;
    }
  }
};

// Store-to-Props Bridge
const ResultDisplayWrapper = {
  computed: {
    store() { return window.AppStore; }
  },
  
  template: `
    <ResultDisplay 
      :input-text="store?.data?.inputText || ''"
      :selected-format="store?.data?.selectedFormat || 'text'"
    />
  `
};
```

## Performance Optimization

### Debounced Input Handling
```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Use debounced input handling
const debouncedInputHandler = debounce(handleInputChange, 300);
```

### Virtual Scrolling for Large Results
```javascript
function createVirtualScroll(container, items, renderItem) {
  const ITEM_HEIGHT = 24;
  const VISIBLE_ITEMS = Math.ceil(container.clientHeight / ITEM_HEIGHT);
  
  let scrollTop = 0;
  let startIndex = 0;
  
  function render() {
    const endIndex = Math.min(startIndex + VISIBLE_ITEMS, items.length);
    const visibleItems = items.slice(startIndex, endIndex);
    
    container.innerHTML = visibleItems.map(renderItem).join('');
    container.scrollTop = scrollTop;
  }
  
  container.addEventListener('scroll', () => {
    scrollTop = container.scrollTop;
    startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    render();
  });
  
  return { render };
}
```

## Development Workflow

### Quick Start New Tool
1. Copy Vue-enabled HTML template with component mount points
2. Modify page title and initialize global store
3. Create Vue components with props-based architecture
4. Implement component processing logic (analyzeText, formatJSON, etc.)
5. Set up store-to-props bridges for reactive updates
6. Test component reactivity and theme switching

### Component Reuse Pattern
```javascript
// Reusable UI component creation functions
function createButton(text, className, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = className;
  button.addEventListener('click', onClick);
  return button;
}

function createPanel(title, content) {
  return `
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">${title}</h3>
      </div>
      <div class="panel-content">
        ${content}
      </div>
    </div>
  `;
}
```

### Debug and Testing
```javascript
// Development mode debug tools
const DEBUG = location.hostname === 'localhost';

function debugLog(message, data) {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, data);
  }
}

// Performance monitoring
function measurePerformance(name, fn) {
  if (DEBUG) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`[PERF] ${name}: ${end - start}ms`);
    return result;
  }
  return fn();
}
```

---

**Document Version**: 1.0  
**Last Updated**: July 22, 2025  
**Scope**: Internal team tool development