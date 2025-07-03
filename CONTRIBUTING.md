# Contributing to oui-kit

Thank you for your interest in contributing to oui-kit! This guide will help you understand our development workflow, coding standards, and best practices.

## General Structure

This project has the following main products:

1. A Vue3 component library (`oui-kit`), source code is located in the `lib` folder.
2. A Stylus CSS framework (`oui-kit`), source code is located in the `stylus` folder.
3. A demo application to showcase the components and framework, source code is located in the `src` folder.

## Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start development server: `pnpm start`

## Coding Standards

### File Structure and Naming

- **Test files**: Always end with `.spec.ts` and are located in the same folder as the file being tested
- **Component files**: Use kebab-case for Vue components (e.g., `oui-component.vue`)
- **Utility files**: Use camelCase for utility functions and modules

### Code Style

Code formatting and style rules are automatically enforced through:

- **`.editorconfig`** - Handles basic formatting (indentation, line endings, etc.)
- **ESLint** - Enforces code quality and style rules

Make sure your editor supports these tools and has the appropriate extensions installed:

- EditorConfig extension for your editor
- ESLint extension for your editor
- Configure your editor to format on save

#### Key Style Guidelines

- **Indentation**: 2 spaces (enforced by .editorconfig)
- **Component files**: Use kebab-case for Vue components (e.g., `oui-component.vue`)

### Vue 3 Development

#### Composition API

- **Always use Vue 3 with Composition API** (not Options API)
- Import components automatically when used
- Use `<script setup>` syntax for cleaner code

### Logging

Use the `zeed` module for all logging needs:

```typescript
// ✅ Correct logging setup
import { Logger, LoggerInterface } from 'zeed'

// Filename without suffix (e.g., for OuiComponent.ts use "oui-component")
const log: LoggerInterface = Logger('oui-component')
```

#### Logging Best Practices

- Use appropriate log levels: `debug`, `info`, `warn`, `error`
- Include relevant context in log messages
- Use structured logging with objects for additional data
- Logger name should match the filename without extension

### Testing

#### Demo

A custom sanbox like environment is available for testing components. All files matching the pattern `*.demo.vue` will be automatically loaded and displayed in the demo environment.

Simple examples:

```vue
<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo } from '../lib'

const state = reactive({
  value: false,
  disabled: false
})
</script>

<template>
  <div>
    <OuiCheckbox v-model="state.value" :disabled="disabled" />
    Just a switch
  </div>

  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.disabled" title="Disabled" />
  </OuiDemo>
</template>
```
## Git Workflow

### Commit Messages

All commit messages should:

- Be **lowercase**
- Start with one of these prefixes:
  - `feat:` - New features
  - `fix:` - Bug fixes
  - `chore:` - Maintenance tasks

```bash
# ✅ Correct commit messages
git commit -m "feat: add user authentication component"
git commit -m "fix: resolve memory leak in data service"
git commit -m "chore: updated dependencies"

# ❌ Incorrect commit messages
git commit -m "Add user auth"  # Missing prefix, not lowercase
git commit -m "Fixed bug"      # Not descriptive enough
```

### Special Cases

- If only `package.json` has been updated: `chore: updated dependencies`

## Code Review Guidelines

### Before Submitting a PR

- [ ] Code follows all style guidelines
- [ ] Tests are written and passing
- [ ] Logging is implemented where appropriate
- [ ] Documentation is updated if needed
- [ ] Commit messages follow the convention
- [ ] No console.log statements (use proper logging)

### Review Checklist

- Code style and formatting
- Test coverage and quality
- Performance considerations
- Security implications
- Documentation completeness
- Accessibility compliance (for UI components)

## Getting Help

- Check existing issues and documentation
- Ask questions in discussions
- Follow the coding standards outlined in this guide
- When in doubt, look at existing code for patterns and examples

Thank you for contributing to make oui-kit better! 🚀
