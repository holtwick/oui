# Contributing to oui-kit

Thank you for your interest in contributing to oui-kit! This guide will help you understand our development workflow, coding standards, and best practices.

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

- **Private variables**: Start with underscore `_`
- **Indentation**: 2 spaces (enforced by .editorconfig)
- **Component files**: Use kebab-case for Vue components (e.g., `oui-component.vue`)

```typescript
// ✅ Correct - Private variables with underscore
class MyClass {
  private _internalState: string
  private _cachedResults: Map<string, any>

  public publicMethod() {
    return this._internalState
  }
}
```

### Vue 3 Development

#### Composition API

- **Always use Vue 3 with Composition API** (not Options API)
- Import components automatically when used
- Use `<script setup>` syntax for cleaner code

```vue
<!-- ✅ Correct -->
<script setup lang="ts">
import { ref } from 'vue'
import MyButton from './MyButton.vue' // Auto-imported when used

const message = ref('Hello World')

function handleClick() {
  console.log('Button clicked')
}
</script>

<template>
  <div>
    <MyButton @click="handleClick">
      {{ message }}
    </MyButton>
  </div>
</template>

<style lang="stylus">
// Use Stylus with oui-kit
@import 'oui-kit'

.my-component
  padding: 16px
  background: $primary-color
</style>
```

#### Component Structure

```vue
<script setup lang="ts">
// 1. Imports (Vue, external libraries, components)
// 2. Props definition
// 3. Emits definition
// 4. Reactive state
// 5. Computed properties
// 6. Methods
// 7. Lifecycle hooks
// 8. Watchers
</script>

<template>
  <div>
    <!-- Template content -->
  </div>
</template>

<style lang="stylus">
// Component styles using Stylus and oui-kit
</style>
```

### Logging

Use the `zeed` module for all logging needs:

```typescript
// ✅ Correct logging setup
import { Logger, LoggerInterface } from 'zeed'

// Filename without suffix (e.g., for OuiComponent.ts use "oui-component")
const log: LoggerInterface = Logger('oui-component')

export class OuiComponent {
  private _users: User[] = []

  public async getUser(id: string): Promise<User | null> {
    log.info('Fetching user', { id })

    try {
      const user = await this._fetchUser(id)
      log.debug('User fetched successfully', { user: user.id })
      return user
    }
    catch (error) {
      log.error('Failed to fetch user', { id, error })
      return null
    }
  }
}
```

#### Logging Best Practices

- Use appropriate log levels: `debug`, `info`, `warn`, `error`
- Include relevant context in log messages
- Use structured logging with objects for additional data
- Logger name should match the filename without extension

### CSS and Styling

#### Stylus with oui-kit

- Use **Stylus** as the CSS preprocessor
- Import and use **oui-kit** for consistent styling
- Follow BEM naming convention for custom classes

```stylus
// ✅ Correct Stylus usage
@import 'oui-kit'

.user-card
  padding: $spacing-md
  border-radius: $border-radius
  background: $surface-color

  &__header
    font-size: $font-size-lg
    color: $text-primary

  &__content
    margin-top: $spacing-sm
    color: $text-secondary

  &--featured
    border: 2px solid $primary-color
```

### Testing

#### Test File Structure

- Test files end with `.spec.ts`
- Located in the same directory as the file being tested
- Use descriptive test names that explain the expected behavior

```typescript
// UserService.spec.ts
import { beforeEach, describe, expect, it } from 'vitest'
import { Logger } from 'zeed'
import { UserService } from './UserService'

// Mock logger for tests
jest.mock('zeed', () => ({
  Logger: jest.fn(() => ({
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }))
}))

describe('UserService', () => {
  let userService: UserService

  beforeEach(() => {
    userService = new UserService()
  })

  it('should fetch user by id successfully', async () => {
    // Test implementation
  })

  it('should return null when user is not found', async () => {
    // Test implementation
  })

  it('should log error when fetch fails', async () => {
    // Test implementation
  })
})
```

#### Testing Best Practices

- Write tests for both success and error cases
- Mock external dependencies (including loggers)
- Use descriptive test descriptions
- Test one behavior per test case
- Include edge cases and error handling

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

## Examples and Templates

### Component Template

```vue
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Logger, LoggerInterface } from 'zeed'

// Props
interface Props {
  title: string
  isVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: true
})

const emit = defineEmits<Emits>()

// Emits
interface Emits {
  close: []
  update: [value: string]
}

// Logger
const log: LoggerInterface = Logger('MyComponent')

// State
const _internalState = ref<string>('')

// Computed
const displayTitle = computed(() => {
  return props.title.toUpperCase()
})

// Methods
function handleClose() {
  log.info('Component closing')
  emit('close')
}

// Lifecycle
onMounted(() => {
  log.debug('Component mounted', { title: props.title })
})
</script>

<template>
  <div class="my-component">
    <!-- Component content -->
  </div>
</template>

<style lang="stylus">
@import 'oui-kit'

.my-component
  padding: $spacing-md
  background: $surface-color
</style>
```

### Service Template

```typescript
import { Logger, LoggerInterface } from 'zeed'

const log: LoggerInterface = Logger('MyService')

export class MyService {
  private _cache: Map<string, any> = new Map()
  private _isInitialized: boolean = false

  public async initialize(): Promise<void> {
    if (this._isInitialized) {
      log.warn('Service already initialized')
      return
    }

    try {
      log.info('Initializing service')
      // Initialization logic
      this._isInitialized = true
      log.debug('Service initialized successfully')
    }
    catch (error) {
      log.error('Failed to initialize service', { error })
      throw error
    }
  }

  public async getData(key: string): Promise<any> {
    log.debug('Fetching data', { key })

    if (this._cache.has(key)) {
      log.debug('Returning cached data', { key })
      return this._cache.get(key)
    }

    try {
      const data = await this._fetchData(key)
      this._cache.set(key, data)
      log.info('Data fetched and cached', { key })
      return data
    }
    catch (error) {
      log.error('Failed to fetch data', { key, error })
      throw error
    }
  }

  private async _fetchData(key: string): Promise<any> {
    // Implementation
  }
}
```

## Getting Help

- Check existing issues and documentation
- Ask questions in discussions
- Follow the coding standards outlined in this guide
- When in doubt, look at existing code for patterns and examples

Thank you for contributing to make oui-kit better! 🚀
