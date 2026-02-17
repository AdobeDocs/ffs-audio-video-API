---
title: Using the Render API
description: Quickstart guide with ready-to-use cURL commands for the Render API.
keywords:
  - Dynamic Graphics Render
  - Render API
  - MOGRT
  - templates
  - variations
  - presets
  - API
  - Quickstart
  - cURL
contributors:
  - https://github.com/aeabreu-hub
  - https://github.com/sandeepy-gh
  - https://github.com/schhatwalgitacc
---
# Using the Render API

This quickstart guide offers ready-to-use cURL commands for the **Render** API.

## Overview

The Render API renders one or more video variations by applying overrides and export presets. Submit up to 10 overrides per call for a subset of editable layers and receive a signed URL download link to the video file. For layers that are not editable, the system defaults are automatically applied at export.

Before calling the Render API, use the [Describe API](dgr-describe.md) to discover the template's editable controls and variable IDs, and the [Presets API](index.md) to choose export presets.

## Prerequisites

[Review the Getting Started page](../../getting-started/dgr-auth.md) for this API for authentication and setup.

### API credentials

You'll need:

- ```client_id```
- ```client_secret```

## Render (POST)

Submit a MOGRT source, optional fonts and assets, presets, and variation overrides to start a render job.

In the cURL command below, be sure to update:

- `Authorization` with the bearer token.
- `x-api-key` with your client ID.
- Request body URLs and variable IDs with your pre-signed URLs and template variable IDs from the Describe API response.

### Sample request (Render)

```bash
curl -X POST \
  'https://audio-video-api.adobe.io/v1/templates/render' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>' \
  --header 'Content-Type: application/json' \
  --data '{
    "source": {
      "url": "<pre-signed mogrt url>"
    },
    "fonts": [
      {
        "name": "<Font postscript name>",
        "source": {
          "url": "<pre-signed url for font .ttf/otf>"
        }
      }
    ],
    "config": {
      "handleMissingFonts": "use_default"
    },
    "assets": [
      {
        "source": {
          "url": "<pre-signed url for image or video asset>"
        }
      },
      {
        "source": {
          "url": "<pre-signed url for audio asset>"
        }
      }
    ],
    "presets": [
      {
        "source": {
          "presetId": "ffs_video_api_vert_1920p_hq"
        }
      },
      {
        "source": {
          "url": "<pre-signed url for Encoder preset file>"
        }
      }
    ],
    "variations": [
      {
        "variables": [
          {
            "variableId": "<unique template variable id>",
            "selectedCheckboxValue": true
          },
          {
            "variableId": "<unique template variable id>",
            "assetIndex": 0,
            "scale": "no_scale"
          },
          {
            "variableId": "<unique template variable id>",
            "selectedDropdownValue": "0"
          },
          {
            "variableId": "<unique template variable id>",
            "text": "First Name",
            "fontName": "font_name_1"
          },
          {
            "variableId": "<unique template variable id>",
            "selectedSliderValue": -18
          },
          {
            "variableId": "<unique template variable id>",
            "assetIndex": 1,
            "audioPreference": "replace"
          }
        ]
      },
      {
        "variables": [
          {
            "variableId": "<unique template variable id>",
            "selectedCheckboxValue": true
          },
          {
            "variableId": "<unique template variable id>",
            "assetIndex": 0,
            "scale": "fit_to_frame"
          },
          {
            "variableId": "<unique template variable id>",
            "selectedDropdownValue": "0"
          },
          {
            "variableId": "<unique template variable id>",
            "text": "First Name",
            "fontName": "font_name_1"
          },
          {
            "variableId": "<unique template variable id>",
            "selectedSliderValue": -18
          },
          {
            "variableId": "<unique template variable id>",
            "assetIndex": 1,
            "audioPreference": "mix"
          }
        ]
      }
    ],
    "outputs": [
      {
        "variationIndex": 0,
        "presetIndex": 0,
        "fileName": "some_custom_file_name"
      },
      {
        "variationIndex": 1,
        "presetIndex": 0,
        "fileName": "output_vert_1920p_hq"
      },
      {
        "variationIndex": 1,
        "presetIndex": 1,
        "fileName": "my_custom_file_name"
      }
    ]
  }'
```

A successful request returns `202 Accepted` with a `jobId` and `statusUrl`. Poll the status URL (or the Get Status API) until the job completes.

## Render API success response (202)

The initial response provides the job ID and status URL to poll for completion.

```json
{
  "jobId": "<JOB_ID>",
  "statusUrl": "https://audio-video-api.adobe.io/v1/status/<JOB_ID>"
}
```

## Get Status API (Render job)

Retrieves the status and output URLs of a render job.

In the cURL command below, replace `{jobId}` with the job ID from the Render response.

### Sample request (Get Status)

```bash
curl -X GET \
  'https://audio-video-api.adobe.io/v1/status/{jobId}' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>' \
  --header 'Content-Type: application/json'
```

## Get Status success response (200)

When the job has succeeded, the response includes signed URLs for each output.

```json
{
  "jobId": "<jobId>",
  "status": "succeeded",
  "outputs": [
    {
      "variationIndex": 0,
      "presetIndex": 0,
      "destination": {
        "url": "https://<SIGNED_OUTPUT_URL>.mp4"
      }
    }
  ]
}
```

## Tips for best results

### Presets

You can use the `presetId` from the list of export presets returned by the [Get Presets API](index.md), or use custom encoder presets via a pre-signed URL. For details on preparing custom presets, see [Custom encoding presets](https://helpx.adobe.com/in/media-encoder/using/custom-encoding-presets.html) in Adobe Help.

### Assets

You can consolidate all audio, video, and image assets in the `assets` array and reference them by 0-based index in the `variations` array.

### Image and video controls

For media controls, you can set `scale` to one of the possible values returned in the [Describe API](dgr-describe.md) response (for example, `no_scale`, `fit_to_frame`, `stretch_to_fill`, `fill_frame`).

### Audio control

For an audio control, set `audioPreference` to `"replace"` or `"mix"`. The default is `"replace"`.

### Missing fonts

The `config.handleMissingFonts` parameter controls behavior when a required font is not provided. Possible values:

- `fail` – The render request fails.
- `use_default` – Use Premiere Pro fallback behavior.

If `handleMissingFonts` is not provided, the default is `use_default`.
