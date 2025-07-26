/**
 * Text Input Component - Vue 3 Implementation
 * Input panel for text editing with store integration
 * @component TextInputComponent
 */

import { AppStore } from '../store.js';

const TextInputComponent = {
  props: {
    currentTheme: {
      type: String,
      default: 'dark',
      validator: (value) => ['light', 'dark'].includes(value)
    }
  },
  
  data() {
    return {
      title: 'Text Input',
      inputText: '',
      maxLength: 50000,
      placeholder: 'Enter your text here...'
    };
  },
  
  computed: {
    characterCount() {
      return this.inputText.length;
    },
    
    wordCount() {
      if (!this.inputText.trim()) return 0;
      return this.inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    },
    
    lineCount() {
      if (!this.inputText) return 0;
      return this.inputText.split('\n').length;
    },
    
    readingTime() {
      const wordsPerMinute = 200;
      return Math.ceil(this.wordCount / wordsPerMinute) || 1;
    },
    
    isOverLimit() {
      return this.characterCount > this.maxLength;
    },
    
    isNearLimit() {
      const remaining = this.maxLength - this.characterCount;
      return remaining <= 1000 && remaining > 0;
    },
    
    remainingChars() {
      return Math.max(0, this.maxLength - this.characterCount);
    },
    
    themeClasses() {
      const isDark = this.currentTheme === 'dark';
      return {
        container: isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
        textarea: isDark ? 'bg-gray-900 text-white border-gray-600 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500',
        toolbar: isDark ? 'text-gray-400' : 'text-gray-600',
        clearBtn: isDark ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400',
        pasteBtn: isDark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-600',
        warning: isDark ? 'text-yellow-400 bg-gray-800' : 'text-yellow-600 bg-yellow-100'
      };
    }
  },
  
  methods: {
    handleInput(event) {
      const newValue = event.target.value;
      this.inputText = newValue;
      
      // Store integration - consistent pattern
      this.updateStore('updateInputText', newValue);
      this.updateFocusTime();
    },

    handleFocus() {
      this.updateFocusTime();
    },

    updateFocusTime() {
      this.updateStore('updateLeftPanelState', {
        lastFocusTime: new Date().toISOString()
      });
    },

    clearInput() {
      this.inputText = '';
      this.updateStore('updateInputText', '');
      
      if (this.$refs.textEditor) {
        this.$refs.textEditor.focus();
      }
    },

    async pasteFromClipboard() {
      try {
        const clipboardText = await navigator.clipboard.readText();
        if (clipboardText) {
          const newText = this.inputText + clipboardText;
          
          if (newText.length <= this.maxLength) {
            this.inputText = newText;
            this.updateStore('updateInputText', newText);
          } else {
            this.showNotification('Clipboard content exceeds character limit', 'warning');
          }
        }
      } catch (err) {
        console.warn('Failed to read clipboard:', err);
        this.showNotification('Failed to access clipboard', 'error');
      }
    },

    // === Store Integration Methods ===
    getStore() {
      return AppStore;
    },

    updateStore(method, data) {
      const store = this.getStore();
      if (store && typeof store[method] === 'function') {
        store[method](data);
      } else {
        console.warn(`Store method ${method} not available`);
      }
    },

    showNotification(message, type = 'info') {
      this.updateStore('addNotification', message, type);
    },

    initializeFromStore() {
      const store = this.getStore();
      if (store && store.data) {
        if (store.data.inputText) {
          this.inputText = store.data.inputText;
        }
        
        if (store.data.config && store.data.config.maxInputLength) {
          this.maxLength = store.data.config.maxInputLength;
        }
      }
    }
  },
  
  mounted() {
    this.initializeFromStore();
    
    if (this.$refs.textEditor) {
      this.$refs.textEditor.focus();
    }
    
    console.log('TextInputComponent mounted');
  },
  
  template: `
    <div class="left-panel-container h-full flex flex-col p-4">
      <!-- Toolbar -->
      <div class="toolbar mb-3 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <button 
            @click="clearInput"
            class="btn-secondary text-sm px-3 py-1 rounded transition-colors"
            :class="themeClasses.clearBtn"
            :disabled="!inputText.trim()"
          >
            Clear
          </button>
          <button 
            @click="pasteFromClipboard"
            class="btn-secondary text-sm px-3 py-1 rounded transition-colors"
            :class="themeClasses.pasteBtn"
          >
            Paste
          </button>
        </div>
        
        <!-- Character count -->
        <div class="text-sm" :class="themeClasses.toolbar">
          {{ characterCount }} / {{ maxLength }} characters
        </div>
      </div>
      
      <!-- Text Editor -->
      <div class="flex-1 relative">
        <textarea
          ref="textEditor"
          v-model="inputText"
          @input="handleInput"
          @focus="handleFocus"
          :placeholder="placeholder"
          :maxlength="maxLength"
          class="w-full h-full resize-none p-3 border rounded focus:ring-1 focus:ring-blue-500 outline-none font-mono text-sm leading-relaxed"
          :class="[themeClasses.textarea, { 'border-red-500': isOverLimit }]"
        ></textarea>
        
        <!-- Character limit warning -->
        <div v-if="isNearLimit" class="absolute bottom-2 right-2 text-xs px-2 py-1 rounded" :class="themeClasses.warning">
          {{ remainingChars }} characters remaining
        </div>
      </div>
    </div>
  `
};

/**
 * Left Component Wrapper - Store to Props Bridge
 * Connects global store to TextInputComponent props
 * @component LeftComponentWrapper
 */
const LeftComponentWrapper = {
  computed: {
    // === Store Integration ===
    store() {
      return AppStore;
    },
    
    storeCurrentTheme() {
      return this.store?.data?.currentTheme || 'dark';
    }
  },
  
  components: {
    TextInput: TextInputComponent
  },
  
  template: `
    <TextInput 
      :current-theme="storeCurrentTheme"
    />
  `
};

// === Component Mounting ===
function mountTextInputComponent() {
  if (typeof Vue === 'undefined') {
    console.error('Vue.js not loaded. Cannot initialize TextInputComponent.');
    return;
  }

  const mountPoint = document.getElementById('appLeft');
  if (!mountPoint) {
    console.warn('Mount point #appLeft not found for TextInputComponent');
    return;
  }

  const app = Vue.createApp(LeftComponentWrapper);
  app.mount(mountPoint);
  console.log('LeftComponentWrapper mounted to #appLeft');
}

document.addEventListener('DOMContentLoaded', mountTextInputComponent);

export { TextInputComponent, LeftComponentWrapper };