# Async Race

A modern frontend project built with Vite, TypeScript.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Code Conventions](#code-conventions)
- [Git Workflow](#git-workflow)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd async-race
```

2. Install dependencies:
```bash
npm install
```

3. Set up Git hooks:
```bash
npm run prepare
```

The `prepare` script automatically initializes Husky hooks, which will run linting and formatting checks before commits.

## Project Structure

```
async-race/
├── src/
│   ├── components/       # React components
│   ├── routes/          # Route definitions
│   ├── services/        # API and utility services
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helper functions
│   ├── main.ts          # Application entry point
│   └── style.css        # Global styles
├── public/              # Static assets
├── tests/               # Test files
├── .github/             # GitHub configuration
├── .husky/              # Git hooks
├── .prettierignore       # Prettier exclusions
├── .gitignore           # Git exclusions
├── eslint.config.ts     # ESLint configuration
├── prettier.config.js   # Prettier configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
├── jest.config.mjs      # Jest configuration
├── package.json         # Project dependencies
└── README.md            # This file
```

## Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot module replacement (HMR). Access the app at `http://localhost:5173`.

### Build

```bash
npm run build
```
Compiles TypeScript and builds the production bundle. Output is in the `dist/` directory.

### Preview

```bash
npm run preview
```
Locally preview the production build before deployment.

### Linting

```bash
npm run lint
```
Check for ESLint violations across the project.

```bash
npm run lint:fix
```
Automatically fix ESLint violations where possible.

### Code Formatting

```bash
npm run prettier
```
Format all files with Prettier (JavaScript, TypeScript, CSS, JSON, etc.).

### Testing

```bash
npm run test
```
Run the Jest test suite.

## Development Workflow

### Before You Start

1. Make sure Git hooks are installed:
```bash
npm run prepare
```

2. Start the development server:
```bash
npm run dev
```

### Making Changes

Before committing, the following checks run automatically via Husky and lint-staged:

1. **ESLint**: Validates JavaScript/TypeScript syntax and best practices
2. **Prettier**: Auto-formats code to maintain consistent style
3. **Commitlint**: Validates commit message format

If any checks fail, fix the issues and try committing again.

### Manual Code Quality Checks

Run these commands to check code quality before committing:

```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run prettier
```

## Code Conventions

### TypeScript

- Use TypeScript for all new code. Avoid `any` type—use proper type annotations
- Define types in `src/types/` directory
- Use interfaces for object shapes and types for unions/primitives
- Enable strict mode in `tsconfig.json`

Example:
```typescript
// Good
interface User {
  id: number;
  name: string;
  email: string;
}

type Status = 'pending' | 'active' | 'inactive';

// Avoid
const user: any = {};
```

### File Structure

- **Components**: Components. Use PascalCase for component files
- **Services**: Business logic, API calls, and utilities
- **Routes**: Route configurations and path definitions
- **Types**: Centralized TypeScript types and interfaces
- **Utils**: Pure utility functions

### Naming Conventions

- **Files/Directories**: kebab-case (e.g., `user-profile.ts`, `api-service.ts`)
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Functions/Variables**: camelCase (e.g., `getUserData`, `isActive`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_TIMEOUT`, `DEFAULT_PAGE_SIZE`)
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`, `ApiResponse`)

### Import Organization

Group imports in the following order with blank lines between groups:

```typescript
// 1. External libraries
import axios from 'axios';

// 2. Internal imports
import { UserService } from '@/services/user-service';
import type { User } from '@/types/user';
import { UserProfile } from '@/components/user-profile';

// 3. Styles
import styles from './user-list.module.css';
```

### Code Quality Rules

- **Lines of Code**: Keep functions under 50 lines when possible
- **Comments**: Write comments for "why", not "what"—code should explain itself
- **Error Handling**: Always handle errors in async operations
- **Tests**: Write tests for critical business logic

### ESLint & Prettier

All code must pass:
- **ESLint**: Enforces best practices and catches common errors
- **Prettier**: Maintains consistent formatting (auto-fixed on commit)

These run automatically via Husky on commit. To fix issues manually:

```bash
npm run lint:fix
npm run prettier
```

## Git Workflow

### Commit Message Convention

This project uses Conventional Commits format enforced by Commitlint.

**Format**: `<type>(<scope>): <subject>`

**Types**:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Dependency updates, build configuration, etc.

**Scope**: Optional—the area of the code affected (e.g., `auth`, `ui`, `api`)

**Examples**:
```bash
git commit -m "feat(auth): add user login validation"
git commit -m "fix(api): handle timeout errors in service"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor(components): simplify button component logic"
git commit -m "test: add tests for user service"
```

### Pre-Commit Checks

Husky automatically runs checks before commits:

1. Lints and fixes JavaScript/TypeScript files
2. Formats CSS files
3. Validates commit message format

If checks fail, the commit is blocked. Review the error messages, fix issues, and commit again.

### Branch Naming

Use descriptive branch names:
- Feature: `feature/user-authentication`
- Bug fix: `fix/header-styling-issue`
- Refactor: `refactor/simplify-service-layer`
- Dependency updates: `chore/jest-update`

## Troubleshooting

### Husky hooks not running?

Reinstall Husky:
```bash
npm run prepare
```

### ESLint or Prettier conflicts?

ESLint and Prettier are configured to work together. Prettier is set as the formatter, and ESLint focuses on code quality. If there are conflicts, run:

```bash
npm run lint:fix
npm run prettier
```

### Build fails with TypeScript errors?

Check TypeScript errors:
```bash
npx tsc --noEmit
```

Fix errors and rebuild:
```bash
npm run build
```

### Port 5173 already in use?

Vite will try to use the next available port. You can also specify a port:
```bash
npm run dev -- --port 3000
```

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Support

For questions or issues, please open an issue in the repository or contact the team.
