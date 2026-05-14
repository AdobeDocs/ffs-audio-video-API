---
title: Audio/Video API Overview
description: The overview page for Audio/Video API services.
contributors:
  - https://github.com/BaskarMitrah
  - https://github.com/AEAbreu-hub
---

<Superhero slots="image, heading, text" background="rgb(233, 80, 80)"/>

![Audio/Video APIs](./av-hero.jpg)

# Audio/Video APIs

Audio/Video APIs offer automated audio/video content production at scale with AI.

## Overview

Audio/Video APIs are a collection of resources that leverage Firefly Services' AI to create and customize audio and video content.

<DiscoverBlock slots="heading, link, text"/>

### Explore our APIs

[Dynamic Graphics Render API](#dynamic-graphics-render-api)

Programmatically generate video variations from After Effects Motion Graphics Templates (MOGRTs).

<DiscoverBlock slots="link, text"/>

[Reframe API](#reframe-api)

Automatically reframe videos.

<DiscoverBlock slots="link, text"/>

[TLS API](#tls-api)

The Translate and Lip Sync API creates transcriptions and precise, accurate video dubs.

<DiscoverBlock slots="link, text"/>

[Text to Speech API](#text-to-speech-api)

With the Text-to-Speech API, generate spoken audio from a provided transcript.

<DiscoverBlock slots="link, text"/>

[Text to Avatar API](#text-to-avatar-api)

Generate an Avatar video with a text prompt or audio input.

## Dynamic Graphics Render API

Programmatically *generate video variations* from Motion Graphics Templates (MOGRTs).

### What is the Dynamic Graphics Render API?

Use the Dynamic Graphics Render API to **automate branded video creation**. The service **consumes Motion Graphics Templates (MOGRTs)** and lets you override essential graphics parameters to deliver **fully customized clips in seconds**.

This API ingests Adobe After Effect's (AE) Motion Graphics Templates (MOGRTs), exposes editable Essential Graphics controls, and renders finalized video assets using predefined or custom encoding presets. Users can:

- Inspect editable template controls.
- Override text, image, video (fixed, per defined slot length), audio, and design parameters.
- Render brand‑ready, social‑optimized video outputs at scale.

### Why choose this API?

**Common use cases:**

- Localize on-screen text to distribute branded video in multiple geographies.
- Personalizing marketing videos with dynamic text and images.
- Generate social-ready videos for different products from the same video template.
- Automating brand‑compliant video creation for campaigns.

**For Marketers/Designers:**

- Create a custom MOGRT template and use the Dynamic Graphics Render API to dynamically control the Essential Graphics parameters defined in the template to generate video variations.

### How it works

The API workflow is simple and powerful. It mirrors other video API's asynchronous job model:

1. **Discover presets** using the Get Presets API.  
   Use our predefined social presets or your own custom ones.

2. **Describe a template** to retrieve editable controls.  
   These are Essential Graphics parameters defined in MOGRT.

3. **Render template variations** with defined assets and presets.  
   Render up to 500 variations of the same template in a single call.

4. **Get Status** with a job ID to get results of Describe and Render template API calls.

You can also receive job lifecycle notifications through [Adobe I/O Events](guides/dgr/dgr-io-events-setup.md) instead of polling alone.

Explore what you can do with this API in the [Dynamic Graphics Render API guides](guides/dgr/index.md).

## Reframe API

The Reframe API intelligently analyzes video content to dynamically adjust frame composition to fit the aspect ratios that you've specified, generating seamless content where it's needed from the existing video characteristics.

<Columns slots="video, heading, text" />

[Reframe your videos with AI](https://raw.githubusercontent.com/AdobeDocs/ffs-audio-video-API/main/src/pages/images/reframe.mp4)

### Reframe your videos with AI

This API uses technology similar to the Auto Reframe feature currently available in Premiere Pro software. It can be integrated with third-party systems and workflows, subject to applicable terms and conditions. Performance and results may vary based on input parameters and system configurations.

<InlineAlert variant="info" slots="text"  />

All content in the generated reframed output is derived solely from the original source video.

Reframe features include:

1. **Generate Video Variations**: The API accepts video input, processes it, and delivers output with specific aspect ratios (including but not limited to 4:3, 9:16, and 1:1) via downloadable links.
2. **Analyze Scenes**: Enable scene edit detection to analyze video transitions and use the existing video characteristics to maintain compositional integrity across different aspect ratio outputs.
3. **Track Status**: Check a job's progress using a designated endpoint. Response times and update frequencies are subject to system load and configuration.
4. **Add Overlays**: Apply pre-generated graphic overlays, such as GIFs or PNGs, over videos with precise control over timing, positioning, scaling, and looping behavior. Customization ensures that overlays align across different aspect ratios and remain consistent with the visual layout.

### Why choose Reframe v2?

Consider the Reframe v2 API to take your video workflows to the next level. Whether you're optimizing for e-commerce, brand storytelling, or high-volume creative production, Reframe v2 delivers unmatched flexibility and control.

- **Pixel-Perfect Resolution**  
  Define exact output sizes, like `1920x1080`, for precision processing.

- **Semantic Subject Lock**  
  Keep your subject in focus across every frame, every shot, every time. Just [provide a keyword or prompt](getting-started/semantic-search/index.md) (for example, "Frisbee" or "man in yellow jacket") and let AI **automatically reframe around your chosen subject**.

- **Media Destination**  
  Define where your rendered video should go with a simple, secure upload flow. Just provide a pre-signed PUT URL to your storage bucket, and we'll handle the rest.

Explore what you can do with this API in the [Reframe API guides](guides/reframe/index.md).

## Translate and Lip Sync API

The Translate and Lip Sync (TLS) API uses transcriptions to generate audio and video with precise, accurate dubbing and composited lip sync. This feature supports multi-speaker scenarios.

### What is this API?

The Translate and Lip Sync (TLS) API allows you to:

- **Transcribe** audio and video.
- **Generate captions** for audio and video.
- **Automated Dubbing** for audio and video.
- **Dubbing with edited transcripts**.
- **Dubbing with pre-existing translations**.

**Lip Sync** is also included as a parameter of the Dub API to create high-quality composited videos with precise lip-syncing. [Content Authenticity Initiative (CAI)](http://contentauthenticity.org/) support ensures protection against deepfakes.

Explore what you can do with this API in the [Translate and Lip Sync API guides](guides/TLS/index.md).

## Text to Speech API

The Text to Speech (TTS) API generates lifelike spoken audio from a provided transcript. 

### What is this API?

The Text to Speech API allows you to:

- **Choose voices** from Firefly's catalog of voices.
- **Turn prompts into spoken audio**.
- **Generate speech** in a variety of languages and accents.

Explore what you can do with this API in the [Text to Speech API guides](guides/index.md).

## Text to Avatar API

Using the Avatar API you can generate an Avatar video with a text prompt or audio input.

### What is this API?

Options with the endpoint allow you to:

1. **Select an avatar** from a catalog of stock actors.
2. **Select a voice** from a catalog of stock voices.
3. **Use your own voice file** to create avatar videos.
4. Set your own image/video as a video background.

Explore what you can do with this API in the [Text to Avatar API guides](guides/avatar/index.md).

<Announcement slots="heading, text, button" variant="secondary" backgroundColor="background-color-gray" />

#### Ready to try it?

Check out the Getting Started page to authenticate and see what these Audio and Video services are all about.

- [Begin](/getting-started/index.md)
