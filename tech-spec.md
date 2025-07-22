# Technical Specifications

## Architecture Overview

### System Architecture
- **Pattern**: Vue Component-Store-Observer Architecture
- **Frontend**: Static HTML/CSS/JS + Vue.js 3 CDN components
- **Backend**: None - Static file serving only
- **Communication**: Vue reactive global store with computed properties

## Core Objectives

- **Zero-Dependency Deployment**: Single HTML file, no installation or build required
- **Quick Kickstart**: Standardized foundation architecture for new tool projects  
- **Universal Architecture**: Suitable for various input-output transformation scenarios
- **Team Standard**: Unified development patterns and code structure

## Technical Architecture

### Data Flow Architecture
```
Global Store (Vue.reactive):
├── inputText                     → Left Input Panel
├── selectedFormat               → Format selection
├── currentTheme                 → Theme state
├── panelRatio                   → Layout config
└── Component States             → Panel configurations

Component Communication:
├── Vue Components               → Read from global store
├── Computed Properties          → Reactive calculations
└── Store Updates               → Trigger component re-renders

Result Processing:
└── Result Display Component     → Stateless computed processing
```

### Tech Stack
- **Runtime Environment**: Static HTML + Tailwind CSS CDN + Vue.js 3 CDN
- **State Management**: Vue reactive global store + LocalStorage
- **Architecture Pattern**: Component-Store-Observer with Vue reactivity
- **Development Server**: npx serve --no-clipboard -l 5050 ./public (already configured)
- **Build Process**: No build, direct static file serving

## Layout Design

### Overall Layout
```
┌──────────────────────────────────────────────────────────────────┐
│ Header: Logo + Project Title                   [Dark Mode] [Global Config] │
├─────────────────────────────┬────────────────────────────────────┤
│                             │ [Result Config Bar]                 │
│   Left Panel                ├────────────────────────────────────┤
│   (Input Area)              │                                    │
│                             │   Right Panel                      │
│   - Text Editor             │   (Result Display Area)            │
│   - Live Validation         │                                    │
│   - Toolbar                 │   - Blank Area / Simple Demo       │
│                             │                                    │
├─────────────────────────────┴────────────────────────────────────┤
│ Footer: Status Info + Help                                        │
└──────────────────────────────────────────────────────────────────┘
```

### Responsive Layout
- **Desktop** (≥1024px): Left/Right split 50/50
- **Tablet** (768px-1023px): Collapsible panels
- **Mobile** (<768px): Single column toggle

## Functional Specifications

### F-001: Left Input Panel
- **Basic Text Editor**: Support multi-line text input
- **Syntax Highlighting**: Basic markdown/text highlighting
- **Auto-save**: Input content automatically saved to LocalStorage
- **Live Validation**: Basic input format checking
- **Toolbar**: Clear, import text and other basic operations

### F-002: Right Result Panel
- **Props-Based Component**: Pure Vue component receiving data as props
- **Real-time Processing**: Live text analysis, format conversion, JSON parsing with fallback
- **Result Config Bar**: Format selection (text, json, html)
- **Graceful Error Handling**: Invalid JSON falls back to text analysis
- **Separated Architecture**: Component and wrapper files for clean separation

### F-003: Global Config (Top Right)
- **Theme Toggle**: Light/Dark mode switching
- **Layout Options**: Panel split ratio adjustment
- **Font Settings**: Font size adjustment
- **Language Settings**: Interface language switching
- **Reset Function**: Restore default settings

### F-004: Dark Mode Switcher
- **Toggle Button**: Independent dark mode switch in top right
- **State Persistence**: Remember user's theme preference
- **Smooth Transition**: Animation effects when switching themes
- **System Follow**: Support following system theme settings

### F-005: Data Persistence
- **Local Storage**: Input content and config settings auto-saved
- **State Recovery**: Restore previous state after page refresh
- **Clear Function**: Provide option to clear all data

## Style Management

### Initial Style System
```css
/* CSS Variables Definition */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --border-color: #dee2e6;
  --accent-color: #4ade80;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --border-color: #404040;
  --accent-color: #4ade80;
}
```

### Interaction Styles
- **Hover Effects**: Hover states for buttons and clickable elements
- **Focus Styles**: Focus states for form elements
- **Transition Animations**: Smooth 200ms transitions
- **State Feedback**: Visual feedback for loading, success, error states

### Design Standards
- **Color Scheme**: Professional black-white-gray with green accent
- **Font System**: System default fonts + monospace for code areas
- **Spacing System**: 8px-based grid system
- **Icon Library**: Lucide icons (CDN loaded)
- **Border Radius**: Consistent border-radius values

## Technical Implementation

### File Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Universal Tool Template</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Custom styles and CSS variables */
  </style>
</head>
<body>
  <!-- Page structure -->
  
  <script>
    // State management
    // Event handling
    // Business logic
    // Tool-specific functionality
  </script>
</body>
</html>
```

### State Management Pattern
```javascript
// Global Vue Reactive Store
window.AppStore = (function() {
  const reactiveData = Vue.reactive({
    // Core input and processing state
    inputText: '',
    selectedFormat: 'text', // 'text', 'json', 'html'
    
    // Theme and UI configuration
    currentTheme: localStorage.getItem('app-theme') || 'dark',
    panelRatio: parseInt(localStorage.getItem('panel-ratio')) || 50,
    
    // Component-specific state
    leftPanelState: {
      isExpanded: true,
      activeTab: 'input',
      lastFocusTime: null
    },
    rightPanelState: {
      isExpanded: true,
      activeTab: 'result'
    },
    
    // Global UI state
    notifications: [],
    
    // Configuration options
    config: {
      autoProcess: true,
      debounceMs: 300,
      maxInputLength: 50000,
      showLineNumbers: false,
      enableSpellCheck: true
    }
  });

  return {
    data: reactiveData,
    updateInputText(text) { /* ... */ },
    updateFormat(format) { /* ... */ },
    updateTheme(theme) { /* ... */ }
  };
})();
```

### Vue Component Pattern
```javascript
// Pure Props-Based Component
const ResultDisplayComponent = {
  props: {
    inputText: {
      type: String,
      default: ''
    },
    selectedFormat: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'json', 'html'].includes(value)
    }
  },
  
  computed: {
    processedResult() {
      if (!this.inputText.trim()) return '';
      
      switch (this.selectedFormat) {
        case 'json':
          try {
            const parsed = JSON.parse(this.inputText);
            return JSON.stringify(parsed, null, 2);
          } catch (e) {
            // Fallback to text analysis for invalid JSON
            return this.analyzeText(this.inputText);
          }
        case 'html':
          return this.formatHTML(this.inputText);
        case 'text':
        default:
          return this.analyzeText(this.inputText);
      }
    }
  },
  
  methods: {
    analyzeText(text) {
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      const lines = text.split('\n');
      return `Word Count: ${words.length}\nLine Count: ${lines.length}\nCharacter Count: ${text.length}`;
    },
    
    formatHTML(html) {
      return html.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
    }
  },
  
  template: `
    <div class="result-display-container h-full flex flex-col p-4">
      <div class="flex-1 relative">
        <textarea
          v-model="processedResult"
          readonly
          class="w-full h-full resize-none p-3 bg-gray-900 text-white border border-gray-600 rounded font-mono text-sm"
        ></textarea>
      </div>
    </div>
  `
};

// Store-to-Props Bridge
const ResultDisplayWrapper = {
  computed: {
    store() { return window.AppStore; }
  },
  
  components: {
    ResultDisplay: ResultDisplayComponent
  },
  
  template: `
    <ResultDisplay 
      :input-text="store?.data?.inputText || ''"
      :selected-format="store?.data?.selectedFormat || 'text'"
    />
  `
};
```

## Development Workflow

### Project Kickstart Process
1. Copy template HTML file
2. Modify title and basic configuration
3. Implement specific business logic (processInput function)
4. Adjust styles and layout details
5. Test functionality completeness

### Customization Guide
- **Business Logic**: Mainly modify the `processInput` function
- **UI Adjustments**: Through CSS variables and Tailwind class names
- **Configuration Extension**: Add new configuration items to state object
- **Feature Extension**: Add new event handler functions

### Code Organization
```javascript
// === Global Store ===
// /public/js/store.js - Vue reactive global state

// === Vue Components ===
// /public/js/components/left-component.js - Input panel
// /public/js/components/result-config-bar.js - Format selection
// /public/js/components/result-display/
//   ├── component.js - Pure prop-based component
//   └── wrapper.js - Store-to-props bridge
// /public/js/components/global-config.js - Global settings

// === Component Structure ===
const Component = {
  props: {
    // Typed props with validation
  },
  computed: {
    // Reactive calculations
  },
  methods: {
    // Component-specific logic
  },
  template: `<!-- Component HTML -->`
};

// === Initialization ===
document.addEventListener('DOMContentLoaded', () => {
  // Mount Vue components
  mountLeftComponent();
  mountResultConfigBar();
  mountResultDisplayComponent(); // Mounts wrapper
  mountGlobalConfig();
});
```

---

**Document Version**: 1.0  
**Last Updated**: July 22, 2025  
**Scope**: Internal team tool development