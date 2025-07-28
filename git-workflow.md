# Git Workflow Framework

## Project Overview
- **Type**: Solo Development Project
- **Complexity**: Simple
- **Tools**: Git + GitHub + Claude Code
- **Approach**: Issue-Driven Development

## Core Workflow (Issue → Code → Close)

### 1. Issue-Driven Branch Strategy
```
main (production-ready)
└── feature/issue-123-[task-name] (linked to GitHub Issue #123)
```

### 2. Complete Development Cycle
1. **Draft Issue**: Create local markdown file for review (`issue-[task-name].md`)
2. **Review Draft**: Manually review and refine issue content
3. **Create Issue**: Post issue to GitHub using draft file (`gh issue create --body-file`)
4. **Cleanup Draft**: Remove local issue file after posting
5. **Read Issue**: Claude Code analyzes issue for context
6. **Start Branch**: `git checkout -b feature/issue-123-task-name`
7. **Code**: Develop based on issue requirements
8. **Commit**: Reference issue in commits (`feat: implement login #123`)
9. **Push**: `git push origin feature/issue-123-task-name`
10. **Create PR**: Auto-link to issue, include requirements checklist
11. **Review**: Self-review against issue acceptance criteria
12. **Merge**: Auto-close issue via PR merge
13. **Cleanup**: Delete feature branch

### 3. Claude Code Integration Points
- **Issue drafting**: Create local markdown files for manual review (`issue-[task-name].md`)
- **Issue analysis**: Extract requirements and generate development plan
- **Branch naming**: Create branch names that reference issue numbers
- **Commit messages**: Auto-generate commits that link to issues
- **PR descriptions**: Include issue context and acceptance criteria checklist
- **Code review**: Verify implementation matches issue requirements
- **Issue closing**: Generate proper closing keywords in PR

## File Structure
```
.github/
├── workflows/
│   └── ci.yml
└── pull_request_template.md
.gitignore
README.md
commit-template.txt
```

## Commands Reference
```bash
# Create draft issue file
claude-code "Create draft issue file for [task-name]"
# Creates: issue-[task-name].md

# Review and create issue
gh issue create --title "[Title]" --body-file issue-[task-name].md
rm issue-[task-name].md

# Analyze issue and start feature
claude-code "Read issue #123 and create branch plan"
git checkout -b feature/issue-123-[generated-name]

# Commit with issue reference
git commit -m "feat: implement user login functionality

- Add JWT authentication
- Create login form validation
- Update user session management

Closes #123"

# Push and create PR with issue context
git push -u origin feature/issue-123-[name]
claude-code "Create PR for issue #123 with acceptance criteria checklist"

# Cleanup after auto-close
git branch -d feature/issue-123-[name]
```

## Issue Template Structure
```markdown
## Description
Brief description of the feature/bug

## Acceptance Criteria
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Technical Notes
- Implementation details
- Dependencies
- Edge cases to consider

## Definition of Done
- [ ] Code implemented
- [ ] Self-reviewed
- [ ] Tested manually
- [ ] Documentation updated
```

## Quality Gates
- [ ] Issue has clear acceptance criteria
- [ ] Branch name references issue number
- [ ] Code implements all acceptance criteria
- [ ] Commits reference issue (#123)
- [ ] PR includes issue context and checklist
- [ ] Self-review against issue requirements
- [ ] Issue automatically closes on merge

## Automation Rules
- Auto-link branches to issues via naming convention
- Auto-close issues via PR merge with "Closes #123"
- Generate PR descriptions from issue content
- Create acceptance criteria checklists in PRs
- Track issue → branch → PR → close lifecycle