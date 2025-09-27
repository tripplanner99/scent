# Interactive Home Fragrance Explorer - Design Guidelines

## Design Approach: Reference-Based with Experiential Focus

**Primary Inspiration**: Airbnb (spatial exploration) + Notion (content flexibility) + Instagram (visual storytelling)
**Rationale**: This experience-focused, visually-rich project requires custom interactions and emotional engagement through playful exploration.

## Core Design Principles

1. **Duality-First Design**: Every visual element must exist in paired variants
2. **Playful Sophistication**: Balance whimsical interactions with refined aesthetics
3. **Spatial Storytelling**: Use the home as a narrative canvas for fragrance discovery
4. **Seamless Transitions**: Smooth morphing between duality states creates magic

## Color Palette

### Day/Traditional/Minimalist Variant
- **Primary**: 45 25% 85% (warm cream base)
- **Secondary**: 25 40% 70% (soft terracotta)
- **Accent**: 200 30% 60% (muted sage blue)
- **Background**: 50 15% 95% (lightest warm white)

### Night/Contemporary/Maximalist Variant  
- **Primary**: 220 25% 15% (deep charcoal)
- **Secondary**: 280 35% 30% (rich plum)
- **Accent**: 45 80% 65% (warm amber)
- **Background**: 210 20% 8% (nearly black)

### Gradients
- **Day State**: Subtle vertical gradients from cream to warm white
- **Night State**: Deep purple-to-charcoal gradients with amber highlights
- **Transition Elements**: Radial gradients for scent trail effects

## Typography

**Primary Font**: Inter (Google Fonts) - clean, readable, modern
**Display Font**: Playfair Display - for section headers and duality labels
**Sizes**: Text-sm (12px), text-base (16px), text-lg (18px), text-xl (20px), text-2xl (24px)

## Layout System

**Spacing Units**: Tailwind spacing of 2, 4, 6, and 8 units
- p-2, m-4 for tight spacing
- p-6, m-8 for generous breathing room
- Consistent 8-unit grid for major layout elements

## Component Library

### Navigation & Controls
- **Duality Switcher**: Floating top-right toggle with smooth slide animation
- **Room Navigation**: Subtle breadcrumbs with room icons
- **Asset Palette**: Left sidebar with draggable scent cards

### Interactive Elements
- **Room Canvas**: Central workspace with drop zones and doodle overlay
- **Scent Cards**: Dual-state cards with hover reveals and drag handles
- **Doodle Tools**: Minimal floating toolbar with brush, stamp, and clear options

### Content Displays
- **Educational Tooltips**: Soft-shadowed cards with contextual scent guidance
- **Room Headers**: Large typography with duality-sensitive styling
- **Progress Indicators**: Subtle completion states for room exploration

## Animations

**Principle**: Use sparingly for maximum impact
- **Duality Transitions**: 800ms eased morphing between states
- **Scent Trails**: SVG path animations following drag gestures
- **Micro-interactions**: 200ms hover states, 300ms click feedback
- **Room Ambience**: Subtle background element movements (candle flicker, incense smoke)

## Images

### Room Environments
- **Hero Spaces**: Full-viewport room photography for each space (living room, bedroom, bathroom, outdoor)
- **Duality Variants**: Each room needs paired imagery showing day/night or cultural variations
- **Interactive Overlays**: Transparent PNG furniture and decor elements for scent placement

### Scent Assets
- **Product Photography**: High-quality product shots on transparent backgrounds
- **Dual Presentations**: Each scent asset requires two styled versions
- **Trail Effects**: Subtle smoke/vapor textures for scent visualization

### Background Treatments
- **Ambient Textures**: Soft grain overlays for depth
- **Transition Elements**: Gradient masks for smooth duality morphing
- **Decorative Details**: Minimal botanical or geometric accents

## Key Visual Treatments

**Soft Shadows**: Consistent elevation with subtle drop shadows
**Rounded Corners**: 8px radius for cards, 16px for major containers  
**Blur Effects**: Backdrop-blur for floating elements and overlays
**Transparency**: Strategic use of opacity for layering and depth

## Content Strategy

**Concise Exploration**: Focus on discovery over lengthy explanations
**Contextual Guidance**: Just-in-time educational content triggered by interactions
**Dual Narratives**: Every description, tip, and suggestion must have variant pairs
**Progressive Disclosure**: Reveal complexity through interaction rather than overwhelming initially

This design framework emphasizes the unique duality concept while creating an intuitive, delightful exploration experience that teaches through play rather than traditional educational patterns.