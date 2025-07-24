# Sail-Emulated Components

This folder contains custom React components that emulate Sail UI functionality for use in this prototype environment.

## Purpose

These components are designed to approximate Sail UI components that don't work in this prototype environment due to legacy reasons. They provide consistent styling and behavior while using Sail UI design tokens and patterns.

## Components

### SailDialog
- **File**: `sail-dialog.tsx`
- **Purpose**: Modal dialog component that approximates Sail UI Dialog functionality
- **Features**:
  - Backdrop overlay with click-to-close
  - Escape key to close
  - Focus management
  - Accessible close button
  - Custom footer support
  - Sail UI design tokens integration

### SailDialogTrigger
- **File**: `sail-dialog.tsx` (exported from same file)
- **Purpose**: Convenience component that handles its own open/close state
- **Usage**: Wraps trigger element and dialog content

## Usage

```jsx
import { SailDialog, SailDialogTrigger } from '@/components/sail-emulated/sail-dialog';

// Manual state management
const [open, setOpen] = useState(false);
<SailDialog open={open} onOpenChange={setOpen} title="Dialog Title">
  Content here
</SailDialog>

// With trigger component
<SailDialogTrigger title="Dialog Title">
  <Button>Open Dialog</Button>
  <div>Dialog content</div>
</SailDialogTrigger>
```

## Design Principles

- **Sail UI Integration**: Uses `createView` and Sail design tokens
- **Accessibility**: Proper ARIA labels, keyboard navigation, focus management
- **Consistent Styling**: Matches Sail UI component appearance
- **Responsive**: Adapts to different screen sizes
- **Theme Support**: Works with light/dark themes through Sail tokens

## Future Components

As needed, additional Sail UI components can be emulated here:
- SailDrawer (for slide-out panels)
- SailPopover (for floating content)
- SailTooltip (for hover tooltips)
- etc.

## Migration from Native Sail UI

When migrating from native Sail UI components:
1. Replace imports with sail-emulated versions
2. Update component usage patterns
3. Handle explicit state management where required 