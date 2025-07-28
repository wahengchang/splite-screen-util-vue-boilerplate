# Technical Specifications

## Architecture Overview

### System Architecture
- **Pattern**: Container/Presentational Components with Vue.js ES6 Modules
- **Frontend**: Static HTML/CSS/JS + Vue.js 3 CDN components
- **Backend**: None - Static file serving only
- **Communication**: Vue reactive global store with ES6 imports
- **Module System**: ES6 imports with `type="module"` scripts

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
- **Architecture Pattern**: Container/Presentational Components with ES6 modules
- **Module System**: ES6 imports with browser native module support
- **Development Server**: npx serve --no-clipboard -l 5050 ./public
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
// Global Vue Reactive Store with ES6 Export
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

// ES6 module export for container components
export const AppStore = window.AppStore;
```

### Container/Presentational Pattern
```javascript
// === Presentational Component (Pure UI) ===
export const InputFieldComponent = {
  props: {
    value: { type: String, default: '' },
    maxLength: { type: Number, default: 50000 },
    isOverLimit: { type: Boolean, default: false }
  },
  emits: ['input', 'focus'],
  
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    }
  },
  
  template: `
    <textarea
      :value="value"
      @input="handleInput"
      :maxlength="maxLength"
      class="w-full h-full resize-none p-3 border rounded"
      :class="{ 'border-red-500': isOverLimit }"
    ></textarea>
  `
};

// === Container Component (Business Logic) ===
import { AppStore } from '../../store.js';
import { InputFieldComponent } from './input-field.js';

const LeftInputContainer = {
  data() {
    return {
      inputText: '',
      maxLength: 50000
    };
  },
  
  computed: {
    store() { return AppStore; },
    characterCount() { return this.inputText.length; },
    isOverLimit() { return this.characterCount > this.maxLength; }
  },
  
  methods: {
    handleInput(newValue) {
      this.inputText = newValue;
      this.store.updateInputText(newValue);
    }
  },
  
  components: { InputField: InputFieldComponent },
  
  template: `
    <InputField 
      :value="inputText"
      :max-length="maxLength"
      :is-over-limit="isOverLimit"
      @input="handleInput"
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
// /public/js/store.js - Vue reactive global state with ES6 export

// === Container/Presentational Architecture ===
// /public/js/components/left-input/
//   ├── container.js - Business logic + store integration
//   ├── input-field.js - Pure textarea presentation
//   └── input-toolbar.js - Toolbar buttons presentation
//
// /public/js/components/result-display/
//   ├── container.js - Text processing + store integration  
//   └── component.js - Pure display presentation
//
// /public/js/components/result-config-bar.js - Format selection
// /public/js/components/global-config.js - Global settings modal

// === Container Component Pattern ===
import { AppStore } from '../../store.js';
import { PresentationalComponent } from './component.js';

const ContainerComponent = {
  computed: {
    // Store integration
    store() { return AppStore; },
    // Business logic
    processedData() { /* processing logic */ }
  },
  methods: {
    // Event handlers and store updates
  },
  components: { PresentationalComponent },
  template: `<PresentationalComponent :data="processedData" />`
};

// === Presentational Component Pattern ===
export const PresentationalComponent = {
  props: {
    data: { type: Object, required: true }
  },
  emits: ['action'],
  template: `<!-- Pure UI rendering -->`
};
```

---

**Document Version**: 1.0  
**Last Updated**: July 22, 2025  
**Scope**: Internal team tool development