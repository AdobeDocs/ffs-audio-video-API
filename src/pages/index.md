---
title: Audio/Video API Overview
description: The overview page for Audio/Video API services.
contributors:
  - https://github.com/BaskarMitrah
  - https://github.com/AEAbreu-hub
---

<Hero slots="heading, text" background="rgb(233, 80, 80)"/>

# Audio/Video APIs

Audio/Video APIs offer automated audio/video content production at scale with AI.

## Overview

Audio/Video APIs are a collection of resources that leverage Firefly Services' AI to create and customize audio and video content.

<DiscoverBlock slots="heading, link, text"/>

### Explore our APIs

[TTS API](guides/)

Generate spoken audio from a provided transcript.

<DiscoverBlock slots="link, text"/>

[Reframe API](guides/)

Automatically reframe videos.

<DiscoverBlock slots="link, text"/>

[TLS API](guides/)

Create transcriptions and precise, accurate video dubs.

## Text-to-Speech API

The Text-to-Speech (TTS) API generates lifelike spoken audio from a provided transcript. Features include:

- **Choose voices** from Firefly's catalog of voices.
- **Turn prompts into spoken audio**.
- **Generate speech** in a variety of languages and accents.

## Reframe API

The Reframe API intelligently analyzes video content to dynamically adjust frame composition to fit the aspect ratios that you've specified, generating seamless content where it's needed from the existing video characteristics.

<TextBlock slots="image, heading, text" theme="dark" />

![Reframe GIF](/images/reframe.gif)

Reframe your Videos with AI

This API uses technology similar to the Auto Reframe feature currently available in Premiere Pro software. It can be integrated with third-party systems and workflows, subject to applicable terms and conditions. Performance and results may vary based on input parameters and system configurations.

<InlineAlert variant="info" slots="text"  />

All content in the generated reframed output is derived solely from the original source video.

Reframe features include:

1. **Generate Video Variations**: The API accepts video input, processes it, and delivers output with specific aspect ratios (including but not limited to 4:3, 9:16, and 1:1) via downloadable links.
2. **Analyze Scenes**: Enable scene edit detection to analyze video transitions and use the existing video characteristics to maintain compositional integrity across different aspect ratio outputs.
3. **Track Status**: Check a job's progress using a designated endpoint. Response times and update frequencies are subject to system load and configuration.
4. **Add Overlays**: Apply pre-generated graphic overlays, such as GIFs or PNGs, over videos with precise control over timing, positioning, scaling, and looping behavior. Customization ensures that overlays align across different aspect ratios and remain consistent with the visual layout.

## Translate and Lip Sync API

The Translate and Lip Sync (TLS) API uses transcriptions to generate audio and video with precise, accurate dubbing and composited lip sync. This feature supports multi-speaker scenarios.

Supported workflows include:

1. **Transcribe** audio and video.
2. **Generate captions** for audio and video.
3. **Automated Dubbing** for audio and video.
4. **Dubbing with edited transcripts**.
5. **Dubbing with pre-existing translations**.

**Lip Sync** is also included as a parameter of the Dub API to create high-quality composited videos with precise lip-syncing. [Content Authenticity Initiative (CAI)](http://contentauthenticity.org/) support ensures protection against deepfakes.

<AnnouncementBlock slots="heading, text, button" />

### Ready to try it?

Check out the Getting Started page to see what these services are all about.

[Begin](/getting_started/)
