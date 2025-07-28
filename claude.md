# Vue Container/Presentational Architecture

## Public Folder Structure
```
/public/           - Static files served at localhost:5050
  /css/            - Stylesheets and theme variables
  /js/             - JavaScript modules and handlers
    /components/   - Vue components organized by feature
      /feature-name/  - Container + presentational components
    /utils/        - Shared utility functions
```

### Naming Conventions
- **Folders**: `kebab-case` (e.g., `left-input/`, `right-display/`)
- **Files**: `kebab-case.js` (e.g., `container.js`, `input-field.js`)
- **Components**: Each folder contains `container.js` + presentational components

## Development Scripts
```bash
npm start          # Start dev server at localhost:5050
npm run dev        # Same as start  
npm run kill:port5050  # Kill processes on port 5050
npm test           # Run Playwright E2E tests
npm run test:headed    # Run tests with browser UI
npm run test:ui        # Run tests with Playwright UI
```

**Reference**: See `tech-spec.md` and `uiux-spec.md` for detailed architecture patterns.

## Component Patterns

### Container Components
- Handle business logic and store integration
- Import dependencies with ES6 modules
- Manage state and event handlers
- Pass processed data to presentational components

### Presentational Components  
- Pure UI rendering with props and emits
- No business logic or store access
- Reusable across different containers
- Export as ES6 modules for import

### Store Integration
- Use `import { AppStore } from '../../store.js'`
- Access reactive data via `AppStore.data`
- Update store with `AppStore.updateMethod()`
- Automatic Vue reactivity across components