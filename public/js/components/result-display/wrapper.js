/**
 * Result Display Wrapper - Store to Props Bridge
 * Connects global store to ResultDisplayComponent props
 * @component ResultDisplayWrapper
 */

import { ResultDisplayComponent } from './component.js';

const ResultDisplayWrapper = {
  computed: {
    // === Store Integration ===
    store() {
      return window.AppStore;
    },
    
    storeInputText() {
      return this.store?.data?.inputText || '';
    },
    
    storeSelectedFormat() {
      return this.store?.data?.selectedFormat || 'text';
    },
    
    storeCurrentTheme() {
      return this.store?.data?.currentTheme || 'dark';
    }
  },
  
  components: {
    ResultDisplay: ResultDisplayComponent
  },
  
  template: `
    <ResultDisplay 
      :input-text="storeInputText"
      :selected-format="storeSelectedFormat"
      :current-theme="storeCurrentTheme"
    />
  `
};

// === Component Mounting ===
function mountResultDisplayComponent() {
  if (typeof Vue === 'undefined') {
    console.error('Vue.js not loaded. Cannot initialize ResultDisplayWrapper.');
    return;
  }

  const mountPoint = document.getElementById('appResultDisplay');
  if (!mountPoint) {
    console.warn('Mount point #appResultDisplay not found for ResultDisplayWrapper');
    return;
  }

  const app = Vue.createApp(ResultDisplayWrapper);
  app.mount(mountPoint);
  console.log('ResultDisplayWrapper mounted to #appResultDisplay');
}

document.addEventListener('DOMContentLoaded', mountResultDisplayComponent);