# Development Standards - Vue Component-Store-Observer Framework

## Agent Roles
- **Frontend Core**: HTML/CSS/JS, Static file foundation
- **Frontend Vue**: Vue.js 3 CDN components with global store integration
- **Component-Store-Observer**: Vue reactive programming via global AppStore
- **Frontend UI**: Component design and styling
- **Static Infrastructure**: npx serve setup, file organization, testing
- **Architect**: Authority on blocked tasks, system design decisions

## File Structure & Naming

### Organization Rules
```
/public/        - Static files served by npx serve (port 5050)
  index.html    - Main entry point with Vue CDN and mount points
  /css/         - Stylesheets and themes
  /js/
    store.js    - Global AppStore with Vue reactive data
    /components/
      left-component.js    - Vue input panel component
      result-config-bar.js - Format selection component
      result-display/      - Result display component (separated)
        component.js       - Pure props-based Vue component
        wrapper.js         - Store-to-props bridge
      global-config.js     - Global settings component
    /frp/ (DEPRECATED) - Legacy FRP files, kept for reference
    /utils/     - Helper utilities
  /tools/       - Individual tool pages
/docs/          - TaskID_Component.md format only
TaskBoard.md    - Coordination hub (single source of truth)
architecture-vue-component-store-observer.md - Current architecture spec
package.json    - npm serve configuration (port 5050)
```

### File Naming
- Branch: `feature/T001-component-name`
- Docs: `T001_Frontend.md`, `T015_Vue-Store.md`
- Vue Components: `left-component.js`, `result-config-bar.js`, `result-display/component.js`, `result-display/wrapper.js`
- Static Files: `tool-name.html`, `store.js`

## Development Standards

### Code
- **Commits**: `T001: Add user authentication module`
- **Branches**: `feature/T001-auth-module` 
- **Review**: Automatic PR when task status = REVIEW
- **Merge**: Squash commits, delete feature branch

### Testing
- **Coverage**: Vue component functionality testing
- **Location**: `/public/tests/` for static testing
- **Run**: Browser-based testing, manual QA
- **Format**: Vue component testing, store state validation

### Integration
- **Merge Rules**: Frontend testing pass + architect approval
- **Conflicts**: Set task status to BLOCKED
- **Dependencies**: Document in TaskBoard.md notes
- **Static Server**: Test with `npm start` before merge

### Documentation
- **When**: Task completion, Vue component changes, architecture decisions
- **What**: Component interfaces, store schema, Vue patterns, setup instructions
- **Where**: `/docs/TaskID_Component.md`

## Communication Rules

### Status Updates
- **Only Channel**: TaskBoard.md
- **Real-time**: Update status before/after work
- **Format**: TaskID | Component | Agent | Status | Notes

### Git Integration
- **Commit Message**: Must include TaskID
- **Branch Reference**: Link to TaskBoard row
- **PR Description**: Reference TaskID and component

### Escalation
- **Trigger**: Set status to BLOCKED with reason
- **Response**: Architect resolves within 24h
- **Resolution**: Authority-based, no consensus

### Prohibited
- ❌ Direct messaging between agents
- ❌ Meetings or calls
- ❌ External communication tools

## Workflow Constraints

### File Locking
- **Rule**: One agent per file at a time
- **Check**: TaskBoard notes field for file claims
- **Format**: "Files: src/auth.js, docs/T001_Auth.md"

### Concurrent Work
- **Boundaries**: Component isolation mandatory
- **Interfaces**: Define in tech-spec.md first
- **Integration**: Schedule through TaskBoard dependencies

### Error Handling
- **Build Failures**: Set task to BLOCKED immediately
- **Test Failures**: Fix before marking DONE
- **Merge Conflicts**: BLOCKED status with details
- **Production Issues**: Escalate to Architect

### Status Discipline
- **TODO** → **IN_PROGRESS**: Claim task, note files
- **IN_PROGRESS** → **REVIEW**: Code complete, tests pass
- **REVIEW** → **DONE**: Architect approval + merge
- **Any** → **BLOCKED**: Immediate escalation with reason

---
*Reference: TaskBoard.md for current assignments | architecture-vue-component-store-observer.md for current methodology*