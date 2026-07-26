// Shared easing curve for scroll reveals and entrances across the site.
// Typed as a const tuple so Motion's Easing type accepts it without
// every call site needing its own `as const` cast.
export const EASE_OUT = [0.21, 0.47, 0.32, 0.98] as const;
