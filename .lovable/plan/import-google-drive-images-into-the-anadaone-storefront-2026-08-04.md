# Import Google Drive images into the AnadaOne storefront

## Goal
Replace the current placeholder assets in the AnadaOne store with the images from the Google Drive folder **Anada One**, using the Lovable CDN asset pipeline. The image of the guy in a black cap and striped sweater becomes the hero/background cover image.

## Current state
- The site has 6 placeholder images in `src/assets/`: `hero.jpg`, `editorial-1.jpg`, `p-hoodie.jpg`, `p-tee.jpg`, `p-cargo.jpg`, `p-cap.jpg`.
- Products in `src/data/products.ts` reference those imports.
- The hero on `src/routes/index.tsx` uses `hero.jpg` as a full-screen background cover.
- The Google Drive folder contains 9 images: 8 WhatsApp Business screenshots and 1 `logo.jpg`. None of these are yet in the project.

## Plan
1. **Download and inspect** all 9 images from the Google Drive folder to a temp directory so I can identify which one matches the requested cover image.
2. **Upload to Lovable CDN** as `.asset.json` pointers for each image that will be used in the site.
3. **Replace hero background** in `src/routes/index.tsx` with the cover image CDN URL.
4. **Replace product/editorial images** in `src/data/products.ts` by mapping the new images to the existing products and updating their `images` arrays.
5. **Remove the old binary files** from `src/assets/` after confirming no remaining references.
6. **Verify** the site builds and the hero/products render correctly in the preview.

## Outcome
The storefront will show real AnadaOne product photography instead of the current placeholder assets, with the requested cover image as the homepage background.
