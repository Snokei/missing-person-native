# COLOR.md — Missing Person Native Design System

> **Single source of truth** for colors, gradients, surfaces, and visual patterns in this React Native app.  
> Canonical token definitions live in `tailwind.config.js` and `components/core/const.ts`.  
> Last scanned: all screens, components, stylesheets, and theme constants across the project.

---

## Table of Contents

1. [Design Language Overview](#design-language-overview)
2. [Primary Colors](#primary-colors)
3. [Secondary Colors](#secondary-colors)
4. [Accent Colors](#accent-colors)
5. [Background Colors](#background-colors)
6. [Surface / Card Colors](#surface--card-colors)
7. [Text Colors](#text-colors)
8. [Border Colors](#border-colors)
9. [Success Colors](#success-colors)
10. [Warning Colors](#warning-colors)
11. [Error Colors](#error-colors)
12. [Info Colors](#info-colors)
13. [Gradient Colors](#gradient-colors)
14. [Shadow Colors](#shadow-colors)
15. [Screen-Specific Theme Tokens](#screen-specific-theme-tokens)
16. [Visual Pattern Reference](#visual-pattern-reference)
17. [AI Design Instructions](#ai-design-instructions)

---

## Design Language Overview

### Theme Style

| Attribute | Value |
|-----------|-------|
| **Overall aesthetic** | Modern, clean, enterprise-friendly mobile UI with soft gradients and card-based layouts |
| **Primary motif** | Teal → Cyan → Indigo **tri-color gradient** on hero headers, login screens, and drawer |
| **Layout pattern** | Light gray page background (`#F8FAFC`) + white elevated cards + contextual tinted screen headers |
| **Styling approach** | Mix of **StyleSheet inline colors** (production screens) and **NativeWind/Tailwind** classes (form helpers) |
| **Icon library** | Ionicons, Octicons, MaterialCommunityIcons |
| **Motion** | Fade + slide screen transitions (400ms), spring hamburger animation, animated floating labels on inputs |

### Color Psychology

| Color family | Meaning in this app |
|--------------|---------------------|
| **Teal `#0DB893`** | Trust, safety, primary actions — core brand for a missing-person safety app |
| **Cyan `#0891B2`** | Technology, GPS/location, navigation between states |
| **Indigo `#6366F1`** | Secondary brand depth, data/lists, admin features |
| **Blue `#2563EB`** | Information, location tracking, links |
| **Purple `#7C3AED`** | Lists, archives, secondary data views |
| **Red `#EF4444`** | Missing persons, errors, logout, destructive |
| **Green `#10B981`** | Found persons, success, active tracking |
| **Amber `#F59E0B`** | Warnings, attention-needed notifications |

### Border Radius Patterns

| Token | px | Usage |
|-------|-----|-------|
| `radius-xs` | 3–4 | Section accent bars, sheet handles, status dots |
| `radius-sm` | 6 | TextField inputs, AppDropdown |
| `radius-md` | 8–10 | Icon chevrons, coord value pills, notification icons |
| `radius-lg` | 12–14 | Cards, inputs (AppInput), nav items, search bars, buttons (secondary) |
| `radius-xl` | 16–18 | Stat cards, form cards, feature cards, quick-links container |
| `radius-2xl` | 20 | Stepper card, location cards, step badges |
| `radius-3xl` | 40 | Login form card, alert bottom sheet top corners |
| `radius-pill` | 100 / 999 | Primary CTA buttons (AppButton), alert OK button, decorative circles |

### Elevation / Shadow Patterns

| Context | shadowColor | opacity | radius | offset | elevation |
|---------|-------------|---------|--------|--------|-----------|
| Standard card | `#000` | 0.04–0.07 | 6–12 | `{0, 2–4}` | 2–3 |
| Login form card | `#000` | 0.12 | 24 | `{0, -8}` | 12 |
| Feature card | `#000` | 0.06 | 10 | `{0, 3}` | 3 |
| Primary button (AppButton) | `#0DB893` | 0.30 (0.45 pressed) | 14–20 | `{0, 6–8}` | 6–10 |
| Focused input/dropdown | `#0DB893` | 0.18 | 8 | `{0, 2}` | 3 |
| Active drawer nav item | `item.activeColor` | 0.25 | 8 | `{0, 3}` | 4 |
| Continue button (missing form) | `#0DB893` (TEAL) | 0.35 | 8 | `{0, 4}` | 4 |
| Notification panel | `#000` | 0.15 | 20 | `{0, 8}` | 10 |
| Alert bottom sheet | `#000` | 0.20 | 16 | `{0, -4}` | 10 |
| App bar | — | 0 | — | — | 0 (flat white header) |

---

## Primary Colors

| Name | Hex | Tailwind Token | Usage Purpose | Example Components |
|------|-----|----------------|---------------|-------------------|
| **Primary Teal** | `#0DB893` | `primary` / `primary-500` | Brand color, primary buttons, active nav, checkmarks, drawer tint, stepper active states | `AppButton`, `CustomDrawer`, `login.tsx`, `home.tsx`, `_layout.tsx`, `AppInput`, `missing.tsx` |
| **Primary Teal 600** | `#0A9A7E` | `primary-600` | Button gradient end-stop | `AppButton` gradient |
| **Primary Teal 700** | `#087D66` | `primary-700` | Hover/deep states (token only) | `tailwind.config.js` |
| **Primary Teal 100** | `#E8F8F4` | `primary-100` | Light teal backgrounds, active drawer bg, input focus bg, info notes | `const.ts` (`TEAL_LIGHT`), `CustomDrawer`, `AppInput`, `AppDropdown`, `missing.tsx` |
| **Primary Teal 50** | `#F0FBF8` | `primary-50` | Screen header bg (Missing form), step theme bg | `const.ts` (`TEAL_BG`), `_layout.tsx` |
| **Primary Teal 200** | `#C5F0E4` | `primary-200` | Token scale (unused in components) | `tailwind.config.js` |
| **Unread notification highlight** | `#F0FDFA` | — | Unread notification row background | `NotificationPanel.tsx` |
| **Unread notification border** | `rgba(13, 184, 147, 0.2)` | — | Unread notification border | `NotificationPanel.tsx` |
| **Active nav border (teal)** | `rgba(13, 184, 147, 0.3)` | — | Drawer active item border | `CustomDrawer.tsx` |

---

## Secondary Colors

| Name | Hex | Tailwind Token | Usage Purpose | Example Components |
|------|-----|----------------|---------------|-------------------|
| **Secondary Indigo** | `#6366F1` | `secondary` / `secondary-500` | Hero gradient stop, drawer nav (Users), section accents | `home.tsx`, `CustomDrawer`, `login.tsx` |
| **Secondary Indigo 50** | `#EEF2FF` | `secondary-50` | Active drawer bg for indigo nav items | `CustomDrawer.tsx` |
| **Secondary Indigo 600** | `#4F46E5` | `secondary-600` | Token scale | `tailwind.config.js` |
| **Violet 500** | `#8B5CF6` | — | Drawer nav gradient end, settings section divider | `CustomDrawer.tsx` |
| **Active nav border (indigo)** | `rgba(99, 102, 241, 0.3)` | — | Drawer active indigo item border | `CustomDrawer.tsx` |

---

## Accent Colors

| Name | Hex | Tailwind Token | Usage Purpose | Example Components |
|------|-----|----------------|---------------|-------------------|
| **Accent Amber** | `#F4B942` | `accent` / `accent-400` | Legacy login screen background & CTA | `LoginScreen.tsx` (alternate/unused flow) |
| **Accent Amber 50** | `#FFFBF0` | `accent-50` | Token scale | `tailwind.config.js` |
| **Cyan 500** | `#0891B2` | `cyan-500` | Hero gradient mid-stop, drawer nav (Location), button gradient | `home.tsx`, `CustomDrawer`, `AppButton`, `login.tsx` |
| **Cyan 50** | `#ECFEFF` | `cyan-50` | Quick links gradient stop | `home.tsx` |
| **Cyan 100** | `#E0F7FA` / `#CFFAFE` | `cyan-100` | Active drawer bg for cyan nav items | `CustomDrawer.tsx` |
| **Active nav border (cyan)** | `rgba(8, 145, 178, 0.3)` | — | Drawer active cyan item border | `CustomDrawer.tsx` |
| **Blue 500** | `#2563EB` | `blue-500` | Location feature, Users screen, step 3 theme | `const.ts`, `location.tsx`, `users.tsx`, `FeatureCard` |
| **Blue 50** | `#EFF6FF` | `blue-50` | Location/Users header bg, info badges, coord pills | `const.ts` (`BLUE_LIGHT`), `location.tsx` |
| **Blue 100** | `#DBEAFE` | `blue-100` | Location header icon box, empty state icon | `const.ts` (`BLUE_MID`), `location.tsx` |
| **Blue custom bg** | `#F0F6FF` | — | Location screen safe area bg | `const.ts` (`BLUE_BG`), `location.tsx`, `_layout.tsx` |
| **Active nav border (blue)** | `rgba(37, 99, 235, 0.3)` | — | Drawer active blue item border | `CustomDrawer.tsx` |
| **Purple 500** | `#7C3AED` | `purple-500` | Missing list theme, closed cases stat, avatars | `const.ts`, `missing-list.tsx`, `home.tsx` |
| **Purple 50** | `#F5F3FF` | `purple-50` | Missing list header bg, empty states, avatars | `const.ts` (`PURPLE_LIGHT`), `missing-list.tsx` |
| **Purple custom bg** | `#F8F6FF` | — | Missing list screen safe area | `const.ts` (`PURPLE_BG`), `_layout.tsx` |

---

## Background Colors

| Name | Hex | Tailwind Token | Usage Purpose | Example Components |
|------|-----|----------------|---------------|-------------------|
| **Page Background** | `#F8FAFC` | `gray-50` | Default screen background, drawer body, login input fields | `home.tsx`, `CustomDrawer`, `login.tsx` |
| **White** | `#FFFFFF` | `white` | Cards, form surfaces, table rows, app bar, alert sheet | All screens |
| **Input Unfocused** | `#FAFAFA` | — | Date fields, AppInput default bg | `missing.tsx`, `AppInput.tsx` |
| **Dropdown Default** | `#F9FAFB` | — | AppDropdown resting background | `AppDropdown.tsx` |
| **Table Header Row** | `#F9FAFB` | — | Data table column headers | `missing-list.tsx`, `users.tsx` |
| **Step Circle Inactive** | `#F3F4F6` | `gray-100` | Inactive stepper circles, dividers | `missing.tsx`, `location.tsx` |
| **Gray 100** | `#F1F5F9` | `gray-100` | Login dividers, drawer inactive icon boxes, nav borders | `login.tsx`, `CustomDrawer.tsx` |
| **Hero overlay circle 1** | `rgba(255,255,255,0.08)` | — | Decorative gradient header circles | `home.tsx`, `login.tsx`, `CustomDrawer.tsx` |
| **Hero overlay circle 2** | `rgba(255,255,255,0.06)` | — | Decorative gradient header circles | `home.tsx`, `login.tsx`, `CustomDrawer.tsx` |
| **Hero glass badge** | `rgba(255,255,255,0.20–0.25)` | — | Login shield icon box, drawer avatar ring | `login.tsx`, `CustomDrawer.tsx` |
| **Hero glass badge border** | `rgba(255,255,255,0.30–0.50)` | — | Frosted glass borders on gradient headers | `login.tsx`, `CustomDrawer.tsx` |
| **Alert OK button** | `#000000` | — | Bottom sheet dismiss button | `ShowAlert.tsx` |

---

## Surface / Card Colors

| Name | Hex | Usage Purpose | Example Components |
|------|-----|---------------|-------------------|
| **Standard Card** | `#FFFFFF` + `#000` shadow | Primary content containers | `missing.tsx`, `location.tsx`, `FeatureCard`, `StatCard` |
| **Login Form Card** | `#FFFFFF` + heavy shadow | Overlapping form on gradient | `login.tsx` (borderRadius: 40) |
| **Stepper Card** | `#FFFFFF` | Multi-step form progress | `missing.tsx` (borderRadius: 20) |
| **Feature Card accent strip** | Dynamic (`accent` prop) | 4px left border color-coded by feature | `FeatureCard.tsx` — Blue/Green/Purple |
| **Stat Card tint** | Dynamic (`bgColor` prop) | Colored stat tile backgrounds | `StatCard.tsx` — `BLUE_LIGHT`, `GREEN_LIGHT`, `#FEF2F2`, `PURPLE_LIGHT` |
| **Quick Links gradient surface** | `#F0FDF4` → `#ECFEFF` → `#F5F3FF` | Section background wrapping feature cards | `home.tsx` |
| **Info Note surface** | `#E8F8F4` (TEAL_LIGHT) | Contextual tips in forms | `missing.tsx` |
| **Info Badge surface** | `#EFF6FF` (BLUE_LIGHT) | Location info callouts | `location.tsx` |
| **Logout button surface** | `#FEE2E2` → `#FEF2F2` gradient | Destructive action in drawer | `CustomDrawer.tsx` |
| **Notification panel** | `#FFFFFF` | Bottom sheet modal | `NotificationPanel.tsx` |
| **Alert bottom sheet** | `#FFFFFF` | Global alert modal | `ShowAlert.tsx` |

---

## Text Colors

| Name | Hex | Tailwind Token | Usage Purpose | Example Components |
|------|-----|----------------|---------------|-------------------|
| **Heading Primary** | `#111827` | `gray-900` | Screen titles, card titles, table bold text, input values | All screens, `AppInput`, headers |
| **Body Secondary** | `#374151` | `gray-700` | Field labels, nav item text, notification body | `login.tsx`, `CustomDrawer`, `NotificationPanel` |
| **Body Muted** | `#4B5563` | `gray-600` | Checkbox labels, table cell text | `login.tsx`, `missing-list.tsx`, `users.tsx` |
| **Subtitle** | `#6B7280` | `gray-500` | Descriptions, header subtitles, stat labels | All screens |
| **Placeholder / Caption** | `#9CA3AF` | `gray-400` | Placeholders, step labels inactive, timestamps | `TextField`, `AppDropdown`, `missing.tsx` |
| **Slate Placeholder** | `#94A3B8` | `gray-400` | Login input icons/placeholders, drawer inactive icons | `login.tsx`, `CustomDrawer.tsx` |
| **Disabled / Chevron** | `#CBD5E1` | `gray-300` | Inactive chevrons, step icons | `CustomDrawer.tsx`, `missing.tsx` |
| **Empty state icon** | `#D1D5DB` | `gray-300` | Notification empty state | `NotificationPanel.tsx` |
| **On-gradient Primary** | `#FFFFFF` | `white` | Hero titles, drawer header, button text | `home.tsx`, `CustomDrawer`, `AppButton` |
| **On-gradient Secondary** | `rgba(255,255,255,0.85)` | — | Hero greeting text | `home.tsx` |
| **On-gradient Tertiary** | `rgba(255,255,255,0.75–0.80)` | — | Hero subtitles, drawer role text | `home.tsx`, `login.tsx`, `CustomDrawer` |
| **Link / Action** | `#0DB893` | `primary` | Sign-up links, "Mark all read", drawer active tint | `login.tsx`, `NotificationPanel`, `_layout.tsx` |
| **Error text (Tailwind)** | `red-600` | — | TextField validation messages | `TextField.tsx` |
| **Alert title** | `#000000` | — | Bottom sheet alert heading | `ShowAlert.tsx` |
| **Input placeholder (AppInput)** | `#C4C4C4` | — | Floating label input placeholder | `AppInput.tsx` |

### Typography Hierarchy

| Level | Size | Weight | Color |
|-------|------|--------|-------|
| Hero title | 28px | 800 | `#FFFFFF` on gradient |
| Screen title | 18px | 700 | `#111827` |
| Card title | 15–17px | 700 | `#111827` |
| Section title | 18px | 700 | `#111827` |
| Body | 13–15px | 400–500 | `#6B7280` / `#374151` |
| Caption / label | 11–13px | 500–600 | `#6B7280` / `#9CA3AF` |
| Button label | 15–17px | 700–800 | `#FFFFFF` (primary) or `#0DB893` (outline) |
| Stat value | 28px | 800 | Dynamic accent color |

---

## Border Colors

| Name | Hex | Tailwind Token | Usage Purpose | Example Components |
|------|-----|----------------|---------------|-------------------|
| **Default Border** | `#E5E7EB` | `gray-200` | Inputs, cards, table containers, bottom bars | `missing.tsx`, `TextField`, `AppDropdown`, tables |
| **Slate Border** | `#E2E8F0` | — | Login inputs, drawer footer, search containers | `login.tsx`, `CustomDrawer.tsx` |
| **Subtle Border** | `#F1F5F9` | `gray-100` | Drawer nav items, login dividers | `CustomDrawer.tsx`, `login.tsx` |
| **Row Divider** | `#F3F4F6` | `gray-100` | Table row separators, notification borders | `missing-list.tsx`, `NotificationPanel`, `location.tsx` |
| **Focus Border** | `#0DB893` | `primary` | Active inputs, dropdowns, checkboxes, outline buttons | `AppInput`, `AppDropdown`, `login.tsx`, `missing.tsx` |
| **Error Border** | `red-500` | — | TextField validation state | `TextField.tsx` |
| **Logout Border** | `#FECACA` | `error-200` | Logout button in drawer | `CustomDrawer.tsx` |
| **Notification Border** | `#F3F4F6` | — | Notification item default border | `NotificationPanel.tsx` |
| **Primary Button Border** | `#0DB893` | — | 2px outline on gradient button wrapper | `AppButton.tsx` |
| **Badge Border** | `#FFFFFF` | — | Notification unread count badge | `NotificationPanel.tsx` |

---

## Success Colors

| Name | Hex | Tailwind Token | Usage Purpose | Example Components |
|------|-----|----------------|---------------|-------------------|
| **Success Green** | `#10B981` | `success-500` | Success alerts, found persons stat, notification type | `ShowAlert.tsx`, `NotificationPanel`, `home.tsx` (via GREEN alias) |
| **Success 50** | `#F0FDF4` | `success-50` | Quick links gradient stop, found stat context | `home.tsx` |
| **Success 600** | `#059669` | `success-600` | Active user status text | `users.tsx` |
| **Success 100** | `#D1FAE5` | — | Active user status badge background | `users.tsx` |
| **Tracking Active** | `#22C55E` | — | GPS tracking live indicator dot | `location.tsx` |
| **Validation Check** | `#0DB893` | `primary` | Input validation checkmark icon | `login.tsx` |

---

## Warning Colors

| Name | Hex | Tailwind Token | Usage Purpose | Example Components |
|------|-----|----------------|---------------|-------------------|
| **Warning Amber** | `#F59E0B` | `warning-500` | Warning notification type icon/badge | `NotificationPanel.tsx` |
| **Warning 50** | `#FFFBEB` | `warning-50` | Token scale | `tailwind.config.js` |

---

## Error Colors

| Name | Hex | Tailwind Token | Usage Purpose | Example Components |
|------|-----|----------------|---------------|-------------------|
| **Error Red** | `#EF4444` | `error-500` | Errors, missing persons stat, logout, notification type, tracking inactive | `ShowAlert.tsx`, `home.tsx`, `CustomDrawer`, `NotificationPanel`, `location.tsx` |
| **Error 600** | `#DC2626` | `error-600` | Inactive user status text | `users.tsx` |
| **Error 50** | `#FEF2F2` | `error-50` | Missing persons stat bg, logout gradient, error icon wrap | `home.tsx`, `CustomDrawer`, `missing-list.tsx` |
| **Error 100** | `#FEE2E2` | `error-100` | Logout gradient start, inactive badge bg, error icon wrap | `CustomDrawer.tsx`, `users.tsx`, `missing-list.tsx` |
| **Error 200** | `#FECACA` | `error-200` | Logout button border | `CustomDrawer.tsx` |
| **Error text (Tailwind)** | `red-600` | — | Form validation messages | `TextField.tsx` |
| **Error border (Tailwind)** | `red-500` | — | Form validation input border | `TextField.tsx` |

---

## Info Colors

| Name | Hex | Tailwind Token | Usage Purpose | Example Components |
|------|-----|----------------|---------------|-------------------|
| **Info Blue** | `#3B82F6` | `info-500` | Info alerts, info notification type | `ShowAlert.tsx`, `NotificationPanel.tsx` |
| **Info 50** | `#EFF6FF` | `info-50` | Shared with blue-50 backgrounds | `tailwind.config.js` |

---

## Gradient Colors

| Name | Stops | Direction | Usage Purpose | Example Components |
|------|-------|-----------|---------------|-------------------|
| **Hero / Brand Gradient** | `#0DB893` → `#0891B2` → `#6366F1` | diagonal (0,0)→(1,1) | Screen hero headers, login bg, drawer header | `home.tsx`, `login.tsx`, `CustomDrawer.tsx` |
| **Primary Button Gradient** | `#0DB893` → `#0891B2` → `#0A9A7E` | diagonal (0,0)→(1,1) | Main CTA buttons | `AppButton.tsx` |
| **Quick Links Background** | `#F0FDF4` → `#ECFEFF` → `#F5F3FF` | diagonal | Soft tinted section behind feature cards | `home.tsx` |
| **Section Accent Bar** | `#0DB893` → `#6366F1` → `#0891B2` | horizontal (0,0)→(1,0) | 4×22px vertical bar beside section titles | `home.tsx` |
| **Drawer Nav — Teal** | `#0DB893` → `#0891B2` | default | Active icon bg for Home/Missing nav items | `CustomDrawer.tsx` |
| **Drawer Nav — Cyan** | `#0891B2` → `#6366F1` | default | Active icon bg for Location nav item | `CustomDrawer.tsx` |
| **Drawer Nav — Indigo/Purple** | `#6366F1` → `#8B5CF6` | default | Active icon bg for Users/Settings items | `CustomDrawer.tsx` |
| **Drawer Section Divider — Main** | `#0DB893` → `#0891B2` | default | 3×16px vertical divider before "Main Menu" | `CustomDrawer.tsx` |
| **Drawer Section Divider — Settings** | `#6366F1` → `#8B5CF6` | default | 3×16px vertical divider before "Settings" | `CustomDrawer.tsx` |
| **Logout Destructive** | `#FEE2E2` → `#FEF2F2` | default | Logout button background | `CustomDrawer.tsx` |

---

## Shadow Colors

| Name | Hex / Value | Usage Purpose | Example Components |
|------|---------------|---------------|-------------------|
| **Standard Shadow** | `#000` @ 0.04–0.07 opacity | Cards, tables, dropdowns | `FeatureCard`, `missing.tsx`, `StatCard`, tables |
| **Heavy Shadow** | `#000` @ 0.12 opacity | Login form card elevation | `login.tsx` |
| **Panel Shadow** | `#000` @ 0.15 opacity | Notification bottom sheet | `NotificationPanel.tsx` |
| **Sheet Shadow** | `#000` @ 0.20 opacity | Alert bottom sheet (upward) | `ShowAlert.tsx` |
| **Teal Glow** | `#0DB893` @ 0.18–0.45 opacity | Focused inputs, primary buttons | `AppInput`, `AppDropdown`, `AppButton` |
| **Theme Glow** | `theme.accent` / `item.activeColor` @ 0.25–0.40 | Active step circles, drawer nav, continue button | `missing.tsx`, `CustomDrawer.tsx` |
| **Dropdown Shadow** | `#000` @ 0.08 opacity | Dropdown menu overlay | `AppDropdown.tsx` |
| **Login Icon Shadow** | `#000` @ 0.15 opacity | Shield icon on login hero | `login.tsx` |
| **Drawer Avatar Shadow** | `#000` @ 0.12 opacity | GS avatar ring | `CustomDrawer.tsx` |

---

## Screen-Specific Theme Tokens

Defined in `components/core/const.ts`:

| Screen | Accent | Light BG | Page BG | Header Style |
|--------|--------|----------|---------|--------------|
| **Home / Dashboard** | `#2563EB` (Blue) | `#EFF6FF` | `#F8FAFC` | Hero gradient (no app bar tint) |
| **Location** | `#2563EB` (Blue) | `#DBEAFE` (mid) | `#F0F6FF` | `BLUE_BG` app bar |
| **Missing Person Form** | `#0DB893` (Teal) steps 1–2 | `#E8F8F4` | `#F0FBF8` | `TEAL_BG` app bar |
| **Missing Person Form** | `#2563EB` (Blue) step 3 | `#EFF6FF` | `#F0F6FF` | `TEAL_BG` app bar |
| **Missing List** | `#7C3AED` (Purple) | `#F5F3FF` | `#F8F6FF` | `PURPLE_BG` app bar |
| **Users** | `#2563EB` (Blue) | `#EFF6FF` | `#F0F6FF` | `BLUE_BG` app bar |
| **Login** | `#0DB893` | — | Full-screen hero gradient | Hidden drawer |
| **Drawer** | Multi-color per route | Per-route tints | `#F8FAFC` | Custom gradient header |

### Feature Card Color Assignments (`FEATURES` in `const.ts`)

| Feature | Accent | Accent BG | Accent Light |
|---------|--------|-----------|--------------|
| Location | `#2563EB` | `#F0F6FF` | `#EFF6FF` |
| Missing Person | `#0DB893` | `#F0FBF8` | `#E8F8F4` |
| Missing List | `#7C3AED` | `#F8F6FF` | `#F5F3FF` |

### Status Badge Colors

| Status | Text Color | Background | Used In |
|--------|-----------|------------|---------|
| **Active** | `#059669` | `#D1FAE5` | `users.tsx` |
| **Inactive** | `#DC2626` | `#FEE2E2` | `users.tsx` |
| **Unknown/Default** | `#4B5563` | `#F3F4F6` | `users.tsx` |
| **Notification: info** | `#3B82F6` | — (icon only) | `NotificationPanel.tsx` |
| **Notification: success** | `#10B981` | — | `NotificationPanel.tsx` |
| **Notification: warning** | `#F59E0B` | — | `NotificationPanel.tsx` |
| **Notification: error** | `#EF4444` | — | `NotificationPanel.tsx` |
| **Alert: info** | `#3B82F6` | circle bg | `ShowAlert.tsx` |
| **Alert: success** | `#10B981` | circle bg | `ShowAlert.tsx` |
| **Alert: error** | `#EF4444` | circle bg | `ShowAlert.tsx` |
| **GPS Active** | — | `#22C55E` dot | `location.tsx` |
| **GPS Inactive** | — | `#EF4444` dot | `location.tsx` |

---

## Visual Pattern Reference

### Button Styles

| Variant | Background | Text | Border | Radius | Component |
|---------|-----------|------|--------|--------|-----------|
| **Primary CTA** | Gradient `#0DB893→#0891B2→#0A9A7E` | `#FFFFFF` 17px/800 | 2px `#0DB893` outer + teal glow | 100 (wrapper), 7 (inner) | `AppButton` |
| **Continue (form)** | Solid `#0DB893` | `#FFFFFF` 15px/700 | — | 14 | `missing.tsx` |
| **Outline / Back** | Transparent | `#0DB893` 15px/600 | 1.5px `#0DB893` | 14 | `missing.tsx` |
| **Destructive (logout)** | Gradient `#FEE2E2→#FEF2F2` | `#EF4444` 14px/700 | 1px `#FECACA` | 14 | `CustomDrawer` |
| **Alert OK** | Solid `#000000` | `#FFFFFF` 16px/700 | — | 999 (pill) | `ShowAlert` |
| **Checkbox (login)** | `#0DB893` when checked | `#FFFFFF` check icon | 1px `#0DB893` | square ~18px | `login.tsx` |

### Input Styles

| Component | Default BG | Focus BG | Default Border | Focus Border | Radius | Icon Color |
|-----------|-----------|----------|----------------|--------------|--------|------------|
| **AppInput** | `#FAFAFA` | `#E8F8F4` | `#E5E7EB` | `#0DB893` | 14 | `#9CA3AF` → `#0DB893` |
| **AppDropdown** | `#F9FAFB` | `#E8F8F4` | `#E5E7EB` | `#0DB893` | 6 | `#9CA3AF` → `#0DB893` |
| **TextField** | `bg-gray-50` | — | `border-gray-200` | — | 6 | — |
| **Login inline input** | `#F8FAFC` | — | `#E2E8F0` 1.5px | — | 14 | `#94A3B8` |
| **Search bar** | `#FFFFFF` | — | `#E5E7EB` | — | 12–14 | `#9CA3AF` |
| **Date field** | `#FAFAFA` | — | `#E5E7EB` 1.5px | — | 14 | `#9CA3AF` |

### Card Styles

| Type | BG | Radius | Padding | Shadow | Border |
|------|-----|--------|---------|--------|--------|
| **Form card** | `#FFFFFF` | 16–20 | 18–20 | `#000` 0.06–0.07 | — |
| **Feature card** | `#FFFFFF` | 18 | 16 | `#000` 0.06 | 4px left accent |
| **Stat card** | Dynamic tint | 16 | 16 | `#000` 0.04 | — |
| **Location card** | `#FFFFFF` | 20 | 18 | `#000` 0.06 | — |
| **Login form card** | `#FFFFFF` | 40 | 28–32 | `#000` 0.12 | — |
| **Table container** | `#FFFFFF` | 16 | — | `#000` 0.06 | 1px `#E5E7EB` |

### List Item / Table Styles

| Element | Style |
|---------|-------|
| **Table header row** | BG `#F9FAFB`, text `#6B7280` 12px/700 uppercase, border-bottom `#E5E7EB` |
| **Table row** | BG `#FFFFFF`, border-bottom `#F3F4F6`, padding vertical 16px |
| **Cell text** | `#4B5563` 14px regular |
| **Cell bold** | `#111827` 14px/600 |
| **Avatar** | 36×36, radius 10, BG accent-light, text accent color |
| **Status badge** | Pill radius 20, dot 6×6 radius 3, uppercase text |
| **Notification item** | radius 12, unread BG `#F0FDFA`, read BG `#FFFFFF` |
| **Drawer nav item** | radius 14, active shadow + gradient icon box, inactive icon BG `#F1F5F9` |

### Icon Color Rules

| Context | Color |
|---------|-------|
| **On gradient headers** | `#FFFFFF` |
| **Primary / active action** | `#0DB893` or route accent color |
| **Inactive / placeholder** | `#9CA3AF` or `#94A3B8` |
| **Navigation chevron inactive** | `#CBD5E1` |
| **Navigation chevron active** | Route `activeColor` |
| **On white cards (feature)** | Accent color from `FEATURES` / props |
| **Error states** | `#EF4444` |
| **Success validation** | `#0DB893` |
| **Hamburger menu lines** | `#111827` |
| **Notification bell** | `#374151` |
| **Search icons** | `#9CA3AF` |
| **Empty state (large)** | `#D1D5DB` or route accent at 32–48px |

### Spacing Scale (observed)

| Token | Value | Usage |
|-------|-------|-------|
| Screen horizontal padding | 16–24px | Scroll content, headers |
| Card gap | 12–14px | Between cards in scroll views |
| Section margin top | 4–28px | Form sections, login fields |
| Icon box size | 40–52px | Header/card icon containers |
| Input height | 50–54px | Form inputs |
| Button height | 50–52px | CTAs |
| Bottom bar padding | 14–20px | Form navigation bar |

---

## AI Design Instructions

> **Strict rules for AI agents generating new screens.** Follow these exactly to maintain visual consistency.

### Color Rules

1. **Never introduce new hex colors** unless the user explicitly requests them. Use tokens from this document, `tailwind.config.js`, or `components/core/const.ts`.
2. **Primary brand gradient** for full-width hero/header sections: `['#0DB893', '#0891B2', '#6366F1']` with diagonal direction `(0,0)→(1,1)`.
3. **Primary CTA buttons** must use `AppButton` or replicate its gradient `['#0DB893', '#0891B2', '#0A9A7E']` with white text, teal border, and teal glow shadow.
4. **Page backgrounds** default to `#F8FAFC` (`gray-50`). Screen-specific tinted backgrounds use `TEAL_BG`, `BLUE_BG`, or `PURPLE_BG` from `const.ts`.
5. **All cards** use `#FFFFFF` background — never gray cards for primary content.
6. **Status colors are fixed:**
   - Success → `#10B981` / bg `#F0FDF4` or `#D1FAE5`
   - Warning → `#F59E0B`
   - Error → `#EF4444` / bg `#FEF2F2` or `#FEE2E2`
   - Info → `#3B82F6` / bg `#EFF6FF`
7. **Text hierarchy:** headings `#111827`, body `#6B7280`, labels `#374151`, placeholders `#9CA3AF` or `#94A3B8`.
8. **Borders:** default `#E5E7EB` or `#E2E8F0`; focus/active `#0DB893`.
9. **Reuse existing constants** — import from `components/core/const.ts` (`TEAL`, `BLUE`, `PURPLE`, etc.) rather than hardcoding hex values.

### Layout Rules

10. **Screen structure:** wrap content in `ScreenTransition` → `SafeAreaView` → header row + `ScrollView` with 16px padding.
11. **White cards** use **16–20px border radius** (form cards 16, feature cards 18, location cards 20).
12. **Hero headers** on gradient include decorative white overlay circles at `rgba(255,255,255,0.06–0.08)`.
13. **Form cards overlap hero** with negative margin (`marginTop: -32`) and large top radius (40px) when following login pattern.
14. **Follow the spacing scale** — 16px screen padding, 12–14px card gaps, 20px card internal padding.

### Component Rules

15. **Use existing UI components:** `AppButton`, `AppInput`, `AppDropdown`, `TextField`, `FeatureCard`, `StatCard`, `ScreenTransition`.
16. **Inputs:** prefer `AppInput` (radius 14, floating label) for new forms; `TextField` (radius 6, NativeWind) only where already used (missing form).
17. **Tables/lists:** white container, radius 16, `#F9FAFB` header row, `#F3F4F6` row dividers, avatar with accent-light background.
18. **Status badges:** pill shape (radius 20), colored dot + uppercase text, use exact status color pairs from [Status Badge Colors](#status-badge-colors).
19. **Icons:** Ionicons preferred; inactive `#9CA3AF`, active accent or `#0DB893`; on gradients always `#FFFFFF`.
20. **Alerts/notifications:** use `useAlertPanel()` and existing type colors — do not create custom alert styling.

### Gradient Rules

21. **Section tinted backgrounds** use soft pastel gradient: `['#F0FDF4', '#ECFEFF', '#F5F3FF']`.
22. **Section accent bars** are 4px wide × 22px tall with gradient `['#0DB893', '#6366F1', '#0891B2']`.
23. **Drawer-style nav icon boxes** use route-specific 2-stop gradients (see [Gradient Colors](#gradient-colors)).
24. **Destructive actions** use error gradient `['#FEE2E2', '#FEF2F2']` — never solid red backgrounds for buttons.

### Shadow Rules

25. **Standard cards:** `shadowColor: '#000'`, opacity 0.06, radius 10–12, offset `{0, 3–4}`, elevation 3.
26. **Focused inputs / primary buttons:** `shadowColor: '#0DB893'`, opacity 0.18–0.30.
27. **App bar / drawer header:** flat — no shadow (elevation 0, shadowOpacity 0).

### Typography Rules

28. **Font weights:** 800 for hero/CTA, 700 for titles, 600 for labels/nav, 500 for body/captions, 400 for subtitles.
29. **Letter spacing:** 0.3–0.8 on buttons and uppercase labels.
30. **Do not change font sizes** outside the established hierarchy without explicit request.

### Navigation / Header Rules

31. **Drawer screens** use white app bar (`#FFFFFF`) with `#111827` title, `#0DB893` tint, and `DrawerHamburgerHeader`.
32. **Contextual app bar backgrounds** match screen theme: `TEAL_BG`, `BLUE_BG`, or `PURPLE_BG`.
33. **Include `NotificationBell`** in header right on all main drawer screens.

### What NOT To Do

34. **Do not use** the legacy `LoginScreen.tsx` amber (`#F4B942`) or `Todo.tsx` indigo theme — these are alternate/unused designs.
35. **Do not use** pure black (`#000`) except for the alert OK button.
36. **Do not use** Material Design elevation colors or non-palette grays.
37. **Do not mix** radius systems on the same screen (pick 14 for inputs, 16–20 for cards consistently).
38. **Do not create** custom bottom sheets — use `AlertProvider` / `NotificationProvider` patterns.

### Quick Reference: New Screen Checklist

```
□ Page BG: #F8FAFC or screen-specific *_BG from const.ts
□ Hero (if applicable): LinearGradient [#0DB893, #0891B2, #6366F1]
□ Content cards: #FFFFFF, borderRadius 16–20, standard shadow
□ Primary action: AppButton or solid #0DB893 button
□ Text: #111827 titles, #6B7280 subtitles
□ Inputs: AppInput or existing TextField pattern
□ Icons: #9CA3AF inactive, accent active
□ Status badges: semantic colors from this doc
□ Wrapped in ScreenTransition
□ No new colors introduced
```

---

## Source Files Reference

| File | Role |
|------|------|
| `tailwind.config.js` | Full color scale (primary, secondary, accent, cyan, blue, purple, success, warning, error, info, gray) |
| `components/core/const.ts` | Runtime color constants, step themes, feature card colors |
| `app/_layout.tsx` | Drawer/header theme colors per route |
| `components/auth/AppButton.tsx` | Primary button gradient & shadow |
| `components/UI/AppInput.tsx` | Floating label input colors |
| `components/UI/AppDropdown.tsx` | Dropdown focus colors |
| `components/UI/CustomDrawer.tsx` | Navigation color system |
| `components/helpers/ShowAlert.tsx` | Alert type colors |
| `components/UI/NotificationPanel.tsx` | Notification type colors |
| `COLOR_SYSTEM.md` | Earlier Tailwind-focused color guide (superseded by this document for AI use) |

---

*This document was generated by scanning all `.tsx`, `.ts` screens, components, stylesheets, and configuration files in the project. When in doubt, match the nearest existing screen (`home.tsx` for dashboards, `missing.tsx` for forms, `users.tsx` for tables, `location.tsx` for info cards, `login.tsx` for auth).*
