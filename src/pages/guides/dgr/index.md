---
title: Quickstart for Presets with the Dynamic Graphics Render API
description: This page is a quickstart guide to using the Presets API.
keywords:
  - Dynamic Graphics Render
  - Presets
  - API
  - Quickstart
  - cURL
  - Presets API
  - Presets API Quickstart
  - Presets API Quickstart cURL
contributors:
  - https://github.com/aeabreu-hub
  - https://github.com/sandeepy-gh
  - https://github.com/schhatwalgitacc
---
# Using the Presets API

This quickstart guide offers ready-to-use cURL commands for the **Presets** API.

## Overview

Presets are export configurations that define video quality. They control parameters like codec, resolution, and bitrate.

Retrieve a catalog of predefined, social-first presets to discover the available encoding options for rendering outputs. Developers can use the presets in the guide below, or their own custom ones.

## Prerequisites

[Review the Getting Started page](../../getting-started/index.md) for this API for authentication and setup.

### API credentials

You'll need:

- ```client_id```
- ```client_secret```

## Quickstart

In the cURL command below, be sure to update:

- `Authorization` with the bearer token.
- `x-api-key` according to the prerequisites.

### Sample request

```bash
curl --location 'https://audio-video-api.adobe.io/v1/presets' \
--header 'Authorization: Bearer <token>' \
--header 'x-api-key: <client_id>'
```

The command returns a response object like the one below.
Use the `presetId` when calling the Render API to specify the preset required to render the output.

```json
{
  "items": [
    {
      "presetId": "ffs_video_api_land_1080p_hq",
      "label": "Landscape 1920×1080 – HQ",
      "mediaType": "video/mp4",
      "codec": "H.264",
      "maxFps": {
        "numerator": 30,
        "denominator": 1
      },
      "bitrateMode": "vbr",
      "targetBitrateInKbps": 8000,
      "maxBitrateInKbps": 12000,
      "alpha": false,
      "primaryUsage": "Youtube, Web Promos"
    },
    {
      "presetId": "ffs_video_api_land_1080p_lq",
      "label": "Landscape 1920×1080 – LQ",
      "mediaType": "video/mp4",
      "codec": "H.264",
      "maxFps": {
        "numerator": 30,
        "denominator": 1
      },
      "bitrateMode": "vbr",
      "targetBitrateInKbps": 6000,
      "maxBitrateInKbps": 8000,
      "alpha": false,
      "primaryUsage": "Previews"
    },
    {
      "presetId": "ffs_video_api_square_1080p_hq",
      "label": "Square 1080×1080 – HQ",
      "mediaType": "video/mp4",
      "codec": "H.264",
      "maxFps": {
        "numerator": 30,
        "denominator": 1
      },
      "bitrateMode": "vbr",
      "targetBitrateInKbps": 6000,
      "maxBitrateInKbps": 8000,
      "alpha": false,
      "primaryUsage": "IG / FB feed ads, LinkedIn videos, X"
    },
    {
      "presetId": "ffs_video_api_square_1080p_lq",
      "label": "Square 1080×1080 – LQ",
      "mediaType": "video/mp4",
      "codec": "H.264",
      "maxFps": {
        "numerator": 30,
        "denominator": 1
      },
      "bitrateMode": "vbr",
      "targetBitrateInKbps": 3000,
      "maxBitrateInKbps": 4000,
      "alpha": false,
      "primaryUsage": "Previews"
    },
    {
      "presetId": "ffs_video_api_vert_1920p_hq",
      "label": "Vertical 1080×1920 – HQ",
      "mediaType": "video/mp4",
      "codec": "H.264",
      "profile": "high",
      "maxFps": {
        "numerator": 30,
        "denominator": 1
      },
      "bitrateMode": "vbr",
      "targetBitrateInKbps": 6000,
      "maxBitrateInKbps": 8000,
      "alpha": false,
      "primaryUsage": "Reels, TikTok, Snapchat Paid Ads"
    },
    {
      "presetId": "ffs_video_api_vert_1920p_lq",
      "label": "Vertical 1080×1920 – LQ",
      "mediaType": "video/mp4",
      "codec": "H.264",
      "profile": "high",
      "maxFps": {
        "numerator": 30,
        "denominator": 1
      },
      "bitrateMode": "vbr",
      "targetBitrateInKbps": 3000,
      "maxBitrateInKbps": 4000,
      "alpha": false,
      "primaryUsage": "Previews"
    },
    {
      "presetId": "ffs_video_api_prores",
      "label": "ProRes export preset supporting Alpha channel",
      "mediaType": "video/quicktime",
      "codec": "Apple ProRes 4444",
      "profile": "high",
      "maxFps": {
        "numerator": 30,
        "denominator": 1
      },
      "bitrateMode": "vbr",
      "alpha": true,
      "primaryUsage": "Logo stings, overlay plates, compositing"
    }
  ]
}
```
