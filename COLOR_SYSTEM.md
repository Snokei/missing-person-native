# Color System Documentation

## Overview
This document defines the systematic color palette for the Missing Person Management System. All colors are centralized in `tailwind.config.js` and should be used consistently across the application.

## Color Palette

### Primary Brand Colors
- **primary** - Teal (#0DB893) - Main brand color, used for primary actions, active states, and key UI elements
  - Usage: `bg-primary`, `text-primary`, `border-primary`
  - Light variants: `bg-primary-100`, `bg-primary-50` for backgrounds

### Secondary Brand Colors
- **secondary** - Indigo (#6366F1) - Secondary brand color for gradients and accents
  - Usage: `bg-secondary`, `text-secondary`
  - Common in gradients with primary

### Accent Colors
- **accent** - Amber (#F4B942) - Warm accent for highlights and CTAs
  - Usage: `bg-accent`, `text-accent`
  - Used in login screens and important buttons

### Supporting Colors
- **cyan** - Cyan (#0891B2) - Cool accent, often paired with primary
  - Usage: `bg-cyan-500`, `text-cyan-600`
  - Used in gradients and navigation

- **blue** - Blue (#2563EB) - Information and links
  - Usage: `bg-blue-500`, `text-blue-600`

### Semantic Colors
- **success** - Green (#10B981) - Success states, positive actions
  - Usage: `bg-success`, `text-success`
  - Light variant: `bg-success-50` for subtle backgrounds

- **warning** - Amber (#F59E0B) - Warnings and cautions
  - Usage: `bg-warning`, `text-warning`

- **error** - Red (#EF4444) - Errors, destructive actions
  - Usage: `bg-error`, `text-error`
  - Light variant: `bg-error-50` for error backgrounds

- **info** - Blue (#3B82F6) - Informational messages
  - Usage: `bg-info`, `text-info`

### Neutral Colors
- **gray** - Complete gray scale from 50 to 950
  - Usage: `bg-gray-100`, `text-gray-700`, `border-gray-200`
  - Used for text hierarchy, borders, and backgrounds

## Usage Guidelines

### Text Colors
- Primary text: `text-gray-900` or `text-gray-800`
- Secondary text: `text-gray-600` or `text-gray-500`
- Tertiary text: `text-gray-400` or `text-gray-400`
- Headings: `text-gray-900` with appropriate font weights

### Background Colors
- Main background: `bg-gray-50` or `bg-white`
- Card backgrounds: `bg-white`
- Elevated surfaces: `bg-white` with shadows
- Subtle backgrounds: `bg-gray-50`, `bg-primary-50`, `bg-success-50`

### Border Colors
- Default borders: `border-gray-200`
- Subtle borders: `border-gray-100`
- Focus states: `border-primary` or `border-primary-500`
- Error states: `border-error`

### Interactive Elements
- Primary buttons: `bg-primary` with `text-white`
- Secondary buttons: `bg-white` with `border-gray-200`
- Accent buttons: `bg-accent` with `text-black`
- Active states: `bg-primary-100` or `bg-primary-50`

## Migration from Hardcoded Colors

### Common Hardcoded Colors to Replace
| Hardcoded Color | Tailwind Class | Context |
|----------------|----------------|---------|
| `#0DB893` | `text-primary` / `bg-primary` | Primary brand color |
| `#E8F8F4` | `bg-primary-100` | Light primary background |
| `#F0FBF8` | `bg-primary-50` | Very light primary background |
| `#6366F1` | `text-secondary` / `bg-secondary` | Secondary brand color |
| `#F4B942` | `text-accent` / `bg-accent` | Accent color |
| `#0891B2` | `text-cyan-600` / `bg-cyan-500` | Cyan accent |
| `#10B981` | `text-success` / `bg-success` | Success color |
| `#EF4444` | `text-error` / `bg-error` | Error color |
| `#F59E0B` | `text-warning` / `bg-warning` | Warning color |
| `#3B82F6` | `text-info` / `bg-info` | Info color |
| `#111827` | `text-gray-900` | Dark text |
| `#6B7280` | `text-gray-500` | Medium text |
| `#9CA3AF` | `text-gray-400` | Light text |
| `#F3F4F6` | `bg-gray-100` | Light gray background |
| `#E5E7EB` | `border-gray-200` | Default border |
| `#FFFFFF` | `bg-white` / `text-white` | White |

## Best Practices

1. **Consistency**: Always use Tailwind color classes instead of hardcoded hex values
2. **Semantic Naming**: Use semantic colors (success, error, warning) for status indicators
3. **Accessibility**: Ensure sufficient color contrast for text readability
4. **Hierarchy**: Use the gray scale for text hierarchy (900 for headings, 600 for body, 400 for captions)
5. **Brand Colors**: Reserve primary, secondary, and accent for brand-specific elements
6. **Light Variants**: Use 50-100 variants for backgrounds, 500-600 for primary elements, 700-900 for hover states

## Examples

### Button Styles
```tsx
// Primary button
<TouchableOpacity className="bg-primary rounded-xl px-6 py-3">
  <Text className="text-white font-bold">Submit</Text>
</TouchableOpacity>

// Secondary button
<TouchableOpacity className="bg-white border border-gray-200 rounded-xl px-6 py-3">
  <Text className="text-gray-700 font-semibold">Cancel</Text>
</TouchableOpacity>

// Accent button
<TouchableOpacity className="bg-accent rounded-xl px-6 py-3">
  <Text className="text-black font-bold">Upgrade</Text>
</TouchableOpacity>
```

### Card Styles
```tsx
<View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
  <Text className="text-gray-900 font-bold text-lg">Card Title</Text>
  <Text className="text-gray-600 mt-2">Card description</Text>
</View>
```

### Status Indicators
```tsx
// Success
<View className="bg-success-50 border border-success rounded-lg p-4">
  <Text className="text-success font-semibold">Success!</Text>
</View>

// Error
<View className="bg-error-50 border border-error rounded-lg p-4">
  <Text className="text-error font-semibold">Error occurred</Text>
</View>
```

### Form Inputs
```tsx
<TextInput 
  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
  placeholderTextColor="#9CA3AF"
/>
```

## Notes
- All color values are defined in `tailwind.config.js`
- The color system supports 10 shades (50-950) for each color
- Use opacity modifiers (e.g., `bg-primary/20`) for subtle effects
- Gradients should use colors from the palette: `from-primary to-secondary`