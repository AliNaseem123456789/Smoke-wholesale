# Soota Smoke Shop - Wholesale Website

A modern, clean wholesale smoke shop website built with React, TypeScript, and Tailwind CSS.

## Demo Credentials

**Email:** demo@wholesale.com  
**Password:** demo123

## Features

### Pages
- **Home Page** - Hero section, featured products, new arrivals, best sellers, famous brands
- **Brand Products Page** - Filtered product listing by brand
- **Product Detail Page** - Product info, flavor selection, quantity controls, quote request
- **Login Page** - Wholesale customer login
- **Registration Page** - New wholesale account registration
- **Cart/Quote Page** - Request quote cart system
- **Contact Page** - Contact form and business info
- **Brands Page** - All brands organized by category

### Key Features
- ✅ Wholesale-only pricing (hidden until login)
- ✅ Product carousels with smooth navigation
- ✅ Category dropdown navigation
- ✅ Quote request system (instead of checkout)
- ✅ Flavor selection for vape products
- ✅ Wholesale quantity controls
- ✅ Local storage for auth and cart persistence
- ✅ Responsive design (desktop-first)
- ✅ Minimal animations (suitable for older users)
- ✅ Age restriction notices (21+)
- ✅ Nicotine warning messages
- ✅ Toast notifications

### Categories
1. **Vapes** - Elf Bar, Lost Mary, Geek Bar, Hyde, Vaporesso
2. **Hookah** - Al Fakher, Starbuzz, Fumari, Social Smoke, Tangiers
3. **Disposable Vapes** - Puff Bar, HQD, Bang, Breeze, Air Bar
4. **Accessories** - RAW, Clipper, Zippo, Elements, OCB
5. **Glass & Tools** - Hemper, Pulsar, Eyce, Grav Labs, Empire Glassworks

## User Flow

1. **Anonymous User:**
   - Browse products (prices hidden)
   - View product details
   - Add items to quote cart
   - Redirected to login when requesting quote

2. **Registered User:**
   - View wholesale pricing
   - Add products to quote cart with quantities
   - Submit quote requests
   - Business info displayed in cart

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- React Slick (carousels)
- Lucide React (icons)
- Sonner (toast notifications)
- Local Storage (auth & cart persistence)

## Design Notes

- Clean, modern UI inspired by rzsmoke.com
- Minimal heavy animations
- Smooth hover effects and simple transitions
- Clear, readable fonts
- Easy-to-use interface for older users
- Desktop-first approach (wholesale business use)
- Mobile responsive
