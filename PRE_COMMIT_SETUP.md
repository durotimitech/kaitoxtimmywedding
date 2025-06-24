# Pre-commit Hook Setup

This project now has a comprehensive pre-commit hook system that automatically checks for lint errors and prevents unused files/functions from being committed.

## 🛠️ What's Installed

### Core Tools

- **Husky**: Git hooks manager
- **lint-staged**: Run linters on staged files only
- **Prettier**: Code formatter
- **ESLint plugins**: Enhanced linting with unused imports detection

### ESLint Plugins Added

- `@typescript-eslint/eslint-plugin`: TypeScript-specific linting rules
- `@typescript-eslint/parser`: TypeScript parser for ESLint
- `eslint-plugin-unused-imports`: Detects and removes unused imports

## 🔧 Configuration Files

### `.husky/pre-commit`

Runs before each commit:

- `npx lint-staged`: Lints and formats staged files
- `npm run type-check`: TypeScript type checking

### `package.json` (lint-staged config)

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,css}": [
    "prettier --write"
  ]
}
```

### `.prettierrc`

Code formatting rules:

- Single quotes
- Semicolons
- 2-space tabs
- 80 character line width

### `eslint.config.mjs`

Enhanced linting rules:

- **Unused imports**: Automatically removed (`unused-imports/no-unused-imports: "error"`)
- **Unused variables**: Flagged as errors (`@typescript-eslint/no-unused-vars: "error"`)
- **Console logs**: Warnings (allows `console.warn` and `console.error`)
- **Empty functions**: Warnings
- **Any types**: Warnings

## 🚀 How It Works

### Before Each Commit:

1. **Lint-staged** runs on staged files only
2. **ESLint** checks for:
   - Unused imports (automatically removed)
   - Unused variables/functions
   - TypeScript errors
   - Code style issues
3. **Prettier** formats the code
4. **TypeScript** type checking runs
5. If any errors are found, the commit is blocked

### What Gets Checked:

- ✅ Unused imports (auto-removed)
- ✅ Unused variables and functions
- ✅ TypeScript type errors
- ✅ Code formatting
- ✅ React-specific issues (unescaped entities, etc.)
- ✅ Empty interfaces and functions

## 📝 Available Scripts

```bash
# Run linting manually
npm run lint

# Run linting with auto-fix
npm run lint:fix

# Run TypeScript type checking
npm run type-check
```

## 🎯 Benefits

1. **Code Quality**: Prevents bad code from being committed
2. **Clean Codebase**: Automatically removes unused imports and variables
3. **Consistent Formatting**: All code is automatically formatted
4. **Type Safety**: TypeScript errors are caught before commit
5. **Performance**: Only checks staged files (fast)

## 🔧 Customization

### Adding New File Types

Edit the `lint-staged` config in `package.json`:

```json
"lint-staged": {
  "*.{scss,sass}": ["prettier --write"],
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

### Modifying ESLint Rules

Edit `eslint.config.mjs` to add/modify rules:

```javascript
rules: {
  "your-rule": "error",
  "another-rule": "warn"
}
```

### Skipping Pre-commit (Emergency)

```bash
git commit --no-verify -m "Emergency commit"
```

## 🎉 Status

✅ Pre-commit hooks are active and working
✅ All existing lint errors have been fixed
✅ Unused imports/variables are automatically detected
✅ Code formatting is enforced
✅ TypeScript type checking is included

The system successfully prevented commits with lint errors during testing!
