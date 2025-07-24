# UI Components

This folder contains local UI components that are not part of the Sail UI library but are needed for this prototype environment.

## Components

### DropdownMenu
- **File**: `dropdown-menu.tsx`
- **Purpose**: Radix UI-based dropdown menu component
- **Usage**: Used in the NavBar for merchant selection
- **Dependencies**: `@radix-ui/react-dropdown-menu`

## Why Only DropdownMenu?

Most UI components in this prototype environment use **Sail UI components** from `@sail/ui` instead of local implementations. The `DropdownMenu` is kept here because:

1. **Sail UI doesn't have a dropdown menu component** that matches this use case
2. **It's actively used** in the NavBar component
3. **It's a simple, focused component** that doesn't conflict with Sail UI patterns

## Sail-Emulated Components

For components that emulate Sail UI functionality (like Dialog), see:
- `src/components/sail-emulated/` - Custom Sail-like components

## Migration Strategy

- **Prefer Sail UI components** when available
- **Use sail-emulated components** for Sail UI components that don't work in this environment
- **Use local UI components** only when Sail UI doesn't provide the needed functionality 