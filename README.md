# Body-APK Landing Page - CrossFit Leiden

A conversion-focused landing page for CrossFit Leiden's Body-APK service (deep posture & movement analysis).

## Features

- 🎯 **Lead Generation**: Form with validation and tracking
- 📱 **Mobile-first**: Responsive design with sticky mobile CTA
- 🎨 **CFL Brand**: Full brand compliance with colors, typography, and tone
- 🔍 **SEO Optimized**: Meta tags, OG tags, semantic HTML
- 📊 **Tracking Ready**: GA4 + Meta Pixel placeholders
- ♿ **Accessible**: Semantic headings, labels, focus states, good contrast
- 🚀 **Performance**: Next.js image optimization, minimal CSS

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS

## Project Structure

```
body-apk-landing/
├── app/
│   ├── api/
│   │   └── lead/
│   │       └── route.ts      # Lead form API endpoint
│   ├── body-apk/
│   │   ├── layout.tsx        # SEO metadata + tracking scripts
│   │   └── page.tsx          # Main landing page
│   ├── globals.css           # Tailwind + custom styles
│   └── layout.tsx            # Root layout with fonts
├── public/
│   └── images/
│       └── body-apk-hero.jpg # Hero image (add your own)
├── tailwind.config.ts        # Brand colors configuration
├── next.config.ts            # Next.js configuration
└── package.json
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add hero image:
   - Place your hero image at `public/images/body-apk-hero.jpg`
   - Recommended size: 800x1000px or similar aspect ratio (4:5)
   - Add OG image at `public/images/body-apk-og.jpg` (1200x630px)

3. Configure tracking:
   - Update Meta Pixel ID in `app/body-apk/layout.tsx`
   - Update GA4 ID in `app/body-apk/layout.tsx`

4. Configure form endpoint:
   - Update `app/api/lead/route.ts` to send leads to your CRM/database
   - Options: Zapier webhook, HubSpot, database, email service

5. Run development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   npm start
   ```

## Customization

### Brand Colors (tailwind.config.ts)

- Cinnabar (primary): `#EF4C37`
- Jonquil (secondary): `#F7CB15`
- Verdigris (support): `#0CBABA`
- Chinese Violet (support): `#7B6D8D`

### Content Updates

All content is in Dutch and follows CFL brand guidelines:
- Warm, personal tone
- No em-dashes
- No hard claims
- No "atleet" (use "members" or "community")

### Form Integration

The API endpoint at `/api/lead` currently logs submissions. To integrate with your systems:

```typescript
// Example: Send to Zapier
await fetch('https://hooks.zapier.com/hooks/catch/xxx/xxx/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// Example: Send to HubSpot
await fetch('https://api.hubapi.com/contacts/v1/contact/', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ properties: [...] })
});
```

## Page Sections

1. **Hero** - Value proposition + primary CTA
2. **Trust Strip** - Social proof (Google reviews, member count)
3. **Problem Block** - "Herken je dit?" recognition
4. **What Is It** - Service explanation + differentiators
5. **Who Is It For** - Suitability criteria (suitable/not suitable)
6. **Process** - 3-step visual flow
7. **What You Get** - Deliverables checklist
8. **Promise** - Expectation management (what it is/isn't)
9. **Next Steps** - Optional follow-up info
10. **FAQ** - 7 common questions
11. **Form** - Lead capture
12. **Footer** - Minimal with privacy link

## Conversion Elements

- Multiple CTA placements (hero, problem, process, form)
- Sticky mobile CTA bar
- Clear value proposition
- Trust indicators
- FAQ to reduce objections
- Simple form with validation
- Success state with next steps

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Focus states on all interactive elements
- Color contrast meets WCAG AA
- Form error messages linked to inputs
- Skip navigation for screen readers

## Performance Tips

- Use Next.js Image component for all images
- Lazy load below-fold content
- Minimize JavaScript bundle
- Use system fonts as fallback
- Enable compression on server

## License

Proprietary - CrossFit Leiden
