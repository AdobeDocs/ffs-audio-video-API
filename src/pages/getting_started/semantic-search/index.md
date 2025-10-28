---
title: About Semantic Subject Lock
description: Best practices and authoring guidance for using semantic search with Reframe V2. Includes keyword families, grammar patterns, tie-break behavior, and sample inputs.
hideBreadcrumbNav: true
keywords:
  - semantic
  - search
  - reframe
  - concepts
  - best practices
  - keywords
contributors:
  - https://github.com/BaskarMitrah
  - https://github.com/aeabreu-hub
---
# Semantic Subject Lock for reframing

This guide explains how to author concise, reliable semantic-search inputs in order to get the most nuanced, accurate results. It covers common keyword families, grammar patterns, tie-break rules, and an authoring checklist to improve match quality and predictability.

## General guidelines

Firefly's Reframe API offers a Semantic Subject Lock, a feature that uses AI to intelligently reframe video around your defined subject. This feature is available to users by entering keywords in the `focalPoints` parameter in the API request body.

Use this author checklist to get a quick idea if your keywords will get the best results.

- [ ] Ensure your input media is a **clean feed** (no graphics, supers, etc.)
- [ ] Prioritize storytelling: identify the theme, important subjects, and their interactions
- [ ] Think in terms of **units you can point at** within or across scenes
- [ ] Start with a **noun** (object/subject) and add attributes for specificity
- [ ] Expand specificity using **keyword families**
- [ ] Separate acceptable targets with **commas**
- [ ] Consider **tie-break scenarios** between objects
- [ ] **Avoid long prose**. This is not a prompt
- [ ] **Avoid positional or negative keywords**. They are not supported

Many of these keyword-construction concepts are explained further below.

### Use attributes for specificity

Add concise attributes, like adjectives, to your keywords to differentiate among similar objects. Noun and attribute order is flexible, so "red cup" is the same as "cup red".

Attribute types include (non-exhaustive):

- **Color:** black, blue, brown, grey, green, orange, pink, purple, red, white, yellow.
- **Material:** glass, plastic, paper, cardboard, metal, stainless, copper.
- **Finish/Texture:** matte, glossy, brushed, frosted.
- **Size/Shape Adjectives:** small, large, tall, short, wide, narrow, slim.
- **Brand (if visible):** Coke can, Lindor chocolate label.
- **Apparel (for people):** garment type with an adjective, for example man in yellow jacket, person in blue hoodie.

### Semantic understanding and tie-break handling

Natural language is accepted, so common synonyms with **semantic nearness** can overlap. For example bottle ≈ flask or car ≈ vehicle.

When multiple subjects satisfy a keyword in a frame, **tie-break handling** causes the system to always select the instance with the largest bounding box area (the object occupying the most image area).

### Simplicity over control

Users cannot set manual priority or weights.
Prioritize storytelling and narrative.

There is no support for negative keywords. For example, these constructions would be invalid: "exclude label", "avoid hands".

Positional words (like "leftmost" or "center") are ignored.

### Brand-aware when visible

Brand names on visible packaging (e.g., Coke, Lindor) can refine matches.

## About Keywords

Keywords are global, so if the same subject identified in the keyword is detected across multiple scenes it is prioritized.

Limit to five maximum entries for the best results. Too many keywords can result in the wrong area of focus.

### Keyword structure patterns

Using these keyword structure patterns can offer the best results.

- **Object only:** knife, guitar, bottle, book
- **Object + Attribute:** red cup, stainless bottle, white truck, infotainment system
- **Body parts:** face, eyes, fingers, hands, snout, ear
- **People + apparel:** man in yellow jacket, woman in red dress, person in blue hoodie
- **People + relation:** man holding phone, presenter with microphone, woman wearing red backpack
- **People + apparel + relation:** man in yellow jacket holding black phone

### Keyword families

This is a (non-exhaustive) list of keyword families and how best to utilize them for Semantic Subject Lock.

#### People

When referring to people as subjects, consider these keywords.

- **Subject type**: person, man, woman, child, adult, kid, worker/staff, attendee, athlete, presenter/speaker, model

Add relational attributes to improve specificity. For example:

- woman with stroller
- person wearing backpack
- worker carrying box
- athlete holding bottle
- chef with knife
- presenter with microphone

Then add object attributes to improve specificity further. For example:

- man holding black phone
- woman with red backpack
- presenter with wireless microphone
- person holding stainless bottle

#### Products and packaging

When products and packaging are your subject, consider these keywords.

- **Containers:** bottle, can, jar, tube, pouch, carton, canister, container, dispenser  
- **Boxes/Bags:** box, shoebox, mailer box, gift box, bag, tote, paper bag
- **Drinkware/Serveware:** cup, glass, mug, plate, bowl, tray  
- **Branding (label visible):** Coke can; Lindor box; Oreo pack

Successful examples:

green bottle; matte black box; tall white canister; clear glass jar; wide stainless bottle; frosted glass jar.

#### Furniture, fixtures, machines, tools and equipment

When objects like furniture and equipment are the subject, avoid smaller items (like hinge, screw, etc.) which can be part of the fixture, the model may not be able to detect that properly.

Consider these keywords.

- **Furniture**: table, chair, sofa/couch, stool, bench, desk, shelf, cabinet, cart
- **Fixtures:** counter, kitchen island, podium, lectern, kiosk, display stand, mirror, sink, faucet, lamp, light fixture, signage  
- **Office:** printer, copier, scanner, server rack, projector, camera, tripod, microphone  
- **Industrial:** forklift, conveyor, pallet jack, generator, compressor, tool chest

Successful examples:

wooden table; leather chair; glass shelf; black metal cart; chrome faucet; backlit signage; retail kiosk; podium; yellow forklift; server rack; broadcast camera; tripod.
