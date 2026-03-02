# Fresh Choice Organic

## Current State
Full-stack order booking app with product listing (eggs, honey, chicken), cart, UPI/COD checkout, order confirmation, admin orders page, and certifications page. App previously had a splash screen language selector that was added but caused a deployment error. The app currently has no language context or translation system.

## Requested Changes (Diff)

### Add
- Language context (`LanguageContext.tsx`) providing `lang` (en | te) and `setLang` function
- Translations file (`translations.ts`) with full English and Telugu strings for all pages/components
- Splash screen component (`SplashScreen.tsx`) shown on first visit: displays logo, app name, and two buttons -- English | తెలుగు -- user picks language and is sent to the main app
- Language toggle in the header (EN | TE) to switch anytime after splash
- `useLang` hook convenience export

### Modify
- `App.tsx` -- wrap everything in `LanguageProvider`, show `SplashScreen` until language is chosen
- `HomePage.tsx` -- use translations for all text (hero, trust badges, category names, footer, contact, etc.)
- `CheckoutPage.tsx` -- use translations for all labels, buttons, messages
- `OrderConfirmationPage.tsx` -- use translations for all text
- `LicensesPage.tsx` -- use translations
- `AdminOrdersPage.tsx` -- use translations for labels (admin page stays mostly English but uses hook)
- `ProductCard.tsx` -- "Add to Cart" button and unit labels translated
- `CartBar.tsx` -- "Checkout" and cart summary translated

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/context/LanguageContext.tsx` with provider, context, and `useLang` hook; persist choice in localStorage
2. Create `src/data/translations.ts` with all en/te string keys
3. Create `src/components/SplashScreen.tsx` -- full-screen splash with logo, app name in both scripts, two large language buttons with animation
4. Update `App.tsx` to wrap with `LanguageProvider` and show `SplashScreen` before routing
5. Update all pages and components to consume `useLang` and swap text via translations
6. Validate build passes
