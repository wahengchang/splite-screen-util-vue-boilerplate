/**
 * Result Display Component - Pure Vue 3 Component
 * Stateless component that receives all data as props
 * @component ResultDisplayComponent
 */

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
    },
    currentTheme: {
      type: String,
      default: 'dark',
      validator: (value) => ['light', 'dark'].includes(value)
    }
  },
  
  computed: {
    processedResult() {
      if (!this.inputText.trim()) return '';
      
      const input = this.inputText;
      const format = this.selectedFormat;
      
      try {
        switch (format) {
          case 'json':
            try {
              const parsed = JSON.parse(input);
              return JSON.stringify(parsed, null, 2);
            } catch (e) {
              // If JSON parsing fails, fallback to text analysis
              return this.analyzeText(input);
            }
            
          case 'html':
            return this.formatHTML(input);
            
          case 'text':
          default:
            return this.analyzeText(input);
        }
      } catch (error) {
        return `Processing Error: ${error.message}`;
      }
    },
    
    resultStats() {
      if (!this.processedResult) return null;
      
      return {
        wordCount: this.calculateWordCount(this.processedResult),
        charCount: this.processedResult.length,
        lineCount: this.calculateLineCount(this.processedResult),
        processedAt: new Date().toISOString()
      };
    },
    
    lastProcessed() {
      return this.resultStats?.processedAt || null;
    },
    
    resultPlaceholder() {
      return 'Results will appear here after processing input text';
    },
    
    isErrorResult() {
      return this.processedResult.includes('Error:') || 
             this.processedResult.includes('error:');
    },
    
    themeClasses() {
      const isDark = this.currentTheme === 'dark';
      console.log(isDark);
      return {
        container: isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
        textarea: isDark ? 'bg-gray-900 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300',
        toolbar: isDark ? 'text-gray-400' : 'text-gray-600',
        emptyState: isDark ? 'text-gray-500' : 'text-gray-400'
      };
    }
  },
  
  methods: {
    formatTime(timestamp) {
      if (!timestamp) return '--';
      
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      
      if (diff < 60000) return 'just now';
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
      
      return date.toLocaleDateString();
    },
    
    analyzeText(text) {
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      const lines = text.split('\n');
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      
      const analysis = {
        'Word Count': words.length,
        'Character Count': text.length,
        'Character Count (no spaces)': text.replace(/\s/g, '').length,
        'Line Count': lines.length,
        'Sentence Count': sentences.length,
        'Average Words per Sentence': sentences.length > 0 ? (words.length / sentences.length).toFixed(1) : 0,
        'Reading Time (min)': Math.ceil(words.length / 200) // ~200 WPM average
      };
      
      return Object.entries(analysis)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    },

    formatHTML(html) {
      try {
        return html
          .replace(/>\s+</g, '><')
          .replace(/\s+/g, ' ')
          .trim();
      } catch (e) {
        return `HTML Format Error: ${e.message}`;
      }
    },

    calculateWordCount(text) {
      return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    },

    calculateLineCount(text) {
      return text.split('\n').length;
    }
  },
  
  mounted() {
    console.log('ResultDisplayComponent mounted - pure props-based');
  },
  
  template: `
    <div class="result-display-container h-full flex flex-col p-4">
      <!-- Result Toolbar -->
      <div class="result-toolbar mb-3 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span v-if="lastProcessed" class="text-xs" :class="themeClasses.toolbar">
            Updated {{ formatTime(lastProcessed) }}
          </span>
        </div>
        
        <div class="flex items-center space-x-2">

        </div>
      </div>
      
      <!-- Result Display -->
      <div class="flex-1 relative">
        <textarea
          ref="resultDisplay"
          v-model="processedResult"
          readonly
          :placeholder="resultPlaceholder"
          class="w-full h-full resize-none p-3 border rounded font-mono text-sm leading-relaxed"
          :class="[themeClasses.textarea, { 'text-red-400': isErrorResult }]"
        ></textarea>
        
        <!-- Empty state -->
        <div v-if="!processedResult.trim()" class="absolute inset-0 flex items-center justify-center">
          <div class="text-center" :class="themeClasses.emptyState">
            <div class="text-lg mb-2">📝</div>
            <div class="text-sm">Enter text in the left panel to see results</div>
          </div>
        </div>
      </div>
    </div>
  `
};