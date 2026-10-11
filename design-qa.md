# DecoFlowers C2 — Design QA

Source visual truth: /workspace/work/premium-prospects/c-research/designs/DecoFlowers-C-2.png
Browser implementation: /workspace/work/deco-c-2/qa/reference-capture.png
Full-view comparison: /workspace/work/deco-c-2/qa/comparison.png
Focused hero comparison: /workspace/work/deco-c-2/qa/comparison-hero.png
Additional evidence: mobile.png, room-mobile.png, showroom-mobile.png, contact-mobile.png and scroll-motion.png in /workspace/work/deco-c-2/qa.

Source and normalized implementation pixels: 946 × 1663. CSS viewport for first-chapter alignment: 946 × 1050, density1. The source is a cropped two-chapter proposal; the full browser screenshot is cropped to identical dimensions. Full browser capture remains reference-capture-full.png. Static source comparison uses reduced-motion; actual motion has separate no-preference evidence. Lower content was captured after scrolling and waiting for visible images to decode.

## Required fidelity surfaces

- Fonts: local Manrope and Cormorant according to direction; live editable typography. Hierarchy, wrapping, spacing and weights inspected. C2 wordmark uses native live text typesetting, not drawn vector art.
- Layout: distinctive portal/dock, editorial masthead/shelf, and rail/scale-selector retained. Responsive320–1920px without horizontal overflow.720px viewport checks200%-equivalent content width; native browser zoom was not independently measured.
- Colors: charcoal/mineral, lavender/aubergine/sienna, mineral/graphite/blue. Image/text contrast visually reviewed beyond automated contrast.
- Images: separately generated subject assets matching each proposal, intrinsic-sized localWebP, authentic showroom photos with provenance recorded in the internal asset ledger. No rasterizedUI or fabricated portfolio claims. All displayed images load, including interactive states.
- Copy: six verified directions, retail/wholesale, interior landscaping, delivery and correct+998900190901/officialInstagram. No inventedSKU/prices/case names/guarantees. Conceptual editorial images kept separate from the authentic photo gallery.

## Findings and history

- P1 wordmark/headline overlap: bounded upper typographic field and separated copy.
- P2 narrow contact heading overflow: responsive size corrected;320px passes.
- P2 mobile pedestal/text overlap: lifted subject above live copy; independent revised390px review passed.
- P2 initial expanded shelf displaced terracotta spread: now starts closed and toggles closed again.
- P1 animation geometry after shelf/FAQ: stable instant measurements and explicit smooth anchors preserve correct scroll state; advanced sequence passes.

Post-fix evidence opened and reviewed by root and independent reviewer. Independent visual review: /workspace/work/deco-c-qa/independent-visual-review.md, passed. No remaining actionable P0/P1/P2.

## Browser behavior

ActualChromium/Playwright evidence: /workspace/work/deco-c-2/qa/report.json. Console/page errors0; WCAG A/AA automated findings0 on page and prepared-request state.
Core checks: responsive320–1920, menu opens and Escape closes, empty validation, editable draft, download content, all images loaded after scroll, motion pause available (the public source page was removed in the later revision)
Advanced checks: four shelves load and toggle, smooth native accordion opens and closes, scroll animation changes and manual pause holds, 200% equivalent viewport fits, no-JS content and telephone accessible

Editable request export preserves changed content. Motion pause/reduced-motion covered; contacts remain accessible withoutJS.

## Expected differences and limits

Regenerated individual assets, added true brand content, responsive navigation. Incorrect phone in C2 source corrected. C3 uses photographic scope views, not a realtime3D construction model. Some source-oriented wording can be refined in future P3copy polish.

final result: passed

## 2026-10-11 — 1200px container, authentic imagery and compact footer

Evidence: qa/revision-2/report.json and actual Chromium screenshots for 1920, 1440, 1024, 390 and 320px. Root visually inspected desktop/tablet/mobile hero, illustrated collection panel and FAQ, real-example spreads, full-image dialogs, and contact/footer. All centered content containers measure 1200px at desktop widths; narrower layouts fit within the viewport. No horizontal overflow. Footer measures 80px on desktop/tablet and 101px on narrow screens.

Four category panels and five native FAQ answers contain decoded official brand photographs. Six editorial stories have full-photo links with working lightbox navigation, keyboard arrows, Escape and focus restoration. Gallery external links point to the corresponding official Instagram posts. All 23 displayed image instances decode successfully. Verified client-interior posts and collection examples are described according to the actual published evidence; no fabricated project claims or prices.

Passed: all category open/close states; all FAQ open/close states and rapid reversal; native menu/gallery/inquiry dialogs; empty-name validation; editable request download preserves the edited text; motion off/on and stable ScrollTrigger geometry; reduced-motion and no-JS fallbacks. Automated WCAG A/AA checks report zero findings on the page, menu, gallery and prepared inquiry. Automated accessibility does not substitute for a full manual assistive-technology audit.

The initial resource check found a missing browser favicon. A local SVG favicon and explicit head link fix it; a fresh browser verified zero console/page errors and zero failed resource requests after the change. Static references and npm run check pass. Public demo/source/AI notices and sources.html are removed; provenance is preserved in source-notes.html and asset-ledger.json outside the served dist directory.

Revision result: passed.

## 2026-10-11 — full-width shelf and object-story heading

Evidence: qa/revision-3/report.json and actual Chromium screenshots. Shelf edges match the viewport at 1920, 1440, 1024, 1001, 1000, 390 and 320px; every button fits within its column, and all four directions open, load their photographs and close. No horizontal overflow or browser errors. Root visually reviewed desktop/mobile shelf and showroom. The showroom has one photograph; its lower facade figure is absent from the DOM.

The confirmed heading «Не просто декор. Точка притяжения.» measures the full 1200px container at 1920/1440 and the available content width at 1024, 700, 390 and 320px. Supporting description is below it; every rendered text line fits. Root inspected desktop/mobile heading screenshots. Local syntax check passes. Revision result: passed.
