---
title: Using the Describe API
description: Quickstart guide with ready-to-use cURL commands for the Describe API.
keywords:
  - Dynamic Graphics Render
  - Describe API
  - MOGRT
  - AEP
  - After Effects
  - templates
  - describe
  - API
  - Quickstart
  - cURL
contributors:
  - https://github.com/aeabreu-hub
  - https://github.com/sandeepy-gh
  - https://github.com/schhatwalgitacc
---
# Using the Describe API

This quickstart guide offers ready-to-use cURL commands for the **Describe** API.

## Overview

The Describe API analyzes a video template and returns a manifest of editable controls: fonts, images, audio, video, and other supported values. Use this manifest to understand which variables you can override when calling the Render API to generate video variations.

The API supports two template types, selected with the `type` field:

- `mogrt` (default) — a Motion Graphics Template (`.mogrt` file).
- `aep` — an After Effects project, supplied as a `.zip` archive containing a single `.aep` file and its collected assets. AEP requests also require a `compName` naming the composition to describe. See [Describe an AEP project](#describe-an-aep-project).

## Prerequisites

[Review the Getting Started page](../../getting-started/index.md) for this API for authentication and setup.

### API credentials

You'll need:

- ```client_id```
- ```client_secret```

## Describe a MOGRT template

Submit a MOGRT file to retrieve its editable controls and metadata.

In the cURL command below, be sure to update:

- `Authorization` with the bearer token.
- `x-api-key` with your client ID.
- The request body `source.url` with a pre-signed URL to your MOGRT file.

### Sample request (Describe)

```bash
curl -X POST \
  --location 'https://audio-video-api.adobe.io/v1/templates/describe' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>' \
  --header 'Content-Type: application/json' \
  --data '{
    "source": {
      "url": "<mogrt pre-signed URL>"
    }
  }'
```

A successful request returns `202 Accepted` with a `jobId` in the response. Use that `jobId` to poll for completion with the Get Status API.

### MOGRT describe success response

When the job has finished successfully, the response returns the editable controls in the MOGRT. You can override these controls in the Render API to generate video variations.

```json
{
  "jobId": "<jobId GUID from the 202 response>",
  "status": "succeeded",
  "output": {
    "fonts": [
      {
        "name": "FranklinGothicURW-Boo",
        "uploadRequired": false
      },
      {
        "name": "<Font postscript name>",
        "uploadRequired": true
      }
    ],
    "elements": [
      {
        "type": "mogrt",
        "controls": [
          {
            "variableId": "<unique id for template variable>",
            "label": "Headline",
            "type": "text",
            "defaultData": {
              "text": "This is your headline.",
              "fontName": "FranklinGothicURW-Boo"
            }
          },
          {
            "variableId": "<unique id for template variable>",
            "label": "Show Extra?",
            "type": "checkbox",
            "defaultData": {
              "selectedCheckboxValue": true
            },
            "options": [
              true,
              false
            ]
          },
          {
            "variableId": "<unique id for template variable>",
            "label": "Choices Dropdown",
            "type": "dropdown",
            "defaultData": {
              "selectedDropdownValue": "2"
            },
            "options": {
              "0": "AAA",
              "1": "BBB",
              "2": "CCC",
              "3": "DDD",
              "4": "EEE"
            }
          },
          {
            "variableId": "<unique id for template variable>",
            "label": "Size selector",
            "type": "slider",
            "defaultData": {
              "selectedSliderValue": 1
            },
            "range": {
              "minimum": 1,
              "maximum": 5
            }
          },
          {
            "variableId": "<unique id for template variable>",
            "label": "Logo",
            "type": "media",
            "size": {
              "width": 1344,
              "height": 768
            },
            "defaultData": {
              "scale": "no_scale"
            },
            "possibleScaleValues": [
              "no_scale",
              "fit_to_frame",
              "stretch_to_fill",
              "fill_frame"
            ]
          },
          {
            "variableId": "<unique id for template variable>",
            "label": "Mogrt Audio",
            "type": "audio",
            "durationInSeconds": 22.3,
            "possibleAudioPreferences": [
              "replace",
              "mix"
            ]
          },
          {
            "label": "Logo comment",
            "type": "comment",
            "text": "Add your company logo here."
          }
        ]
      }
    ]
  }
}
```

## Describe an AEP project

To describe an After Effects project, set `type` to `aep`, point `source.url` at a `.zip` archive that contains a single `.aep` file and its collected assets, and name the composition to describe with `compName`.

- `compName` is **required** for AEP. This composition name within the project must be unique so that `compName` resolves to a single composition.

In the cURL command below, be sure to update:

- `Authorization` with the bearer token.
- `x-api-key` with your client ID.
- The request body `source.url` with a pre-signed URL to your `.zip`, and `compName` with your composition name.

### Sample request (Describe AEP)

```bash
curl -X POST \
  --location 'https://audio-video-api.adobe.io/v1/templates/describe' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>' \
  --header 'Content-Type: application/json' \
  --data '{
    "type": "aep",
    "source": {
      "url": "<.zip pre-signed URL>"
    },
    "compName": "A. Variable Duration"
  }'
```

As with MOGRT, a successful request returns `202 Accepted` with a `jobId`. Poll the Get Status API to retrieve the result.

### AEP describe success response

For AEP, the element `type` is `aep` and the response includes two collections:

- `controls[]` — the editable controls in the composition. Each `variableId` is a composite ID (for example `c259:l261:media` for a media control or `c169:l193:layer:sourceText` for a text control). Use these IDs in the Render API `variations[].variables[]`.
- `layers[]` — the composition's layers, in render order (top-to-bottom). Each layer's composite `id` (for example `c259:l261:layer`) is used as the `layerId` in Render API `layerOperations[]`.

```json
{
  "jobId": "<jobId GUID from the 202 response>",
  "status": "succeeded",
  "output": {
    "fonts": [
      {
        "name": "AdobeClean-ExtraBold",
        "uploadRequired": true
      },
      {
        "name": "ArialMT",
        "uploadRequired": false
      }
    ],
    "elements": [
      {
        "type": "aep",
        "controls": [
          {
            "variableId": "c169:l193:layer:sourceText",
            "label": "Show Title",
            "type": "text",
            "defaultData": {
              "text": "Beach Runners",
              "fontName": "AdobeClean-ExtraBold"
            }
          },
          {
            "variableId": "c259:l261:media",
            "label": "Video",
            "type": "media",
            "defaultData": {
              "scale": "no_scale"
            },
            "size": {
              "width": 1920,
              "height": 1080
            },
            "possibleScaleValues": [
              "no_scale",
              "fit_to_frame",
              "stretch_to_fill",
              "fill_frame"
            ]
          },
          {
            "variableId": "c786:l799:layer:sourceText",
            "label": "Test color",
            "type": "text",
            "defaultData": {
              "text": "000000",
              "fontName": "ArialMT"
            }
          },
          {
            "variableId": "c786:l810:eff:1:1",
            "label": "Test checkbox",
            "type": "checkbox",
            "defaultData": {
              "selectedCheckboxValue": false
            },
            "options": [
              true,
              false
            ]
          },
          {
            "variableId": "c786:l810:eff:2:1",
            "label": "Test dropdown",
            "type": "dropdown",
            "defaultData": {
              "selectedDropdownValue": "1"
            },
            "options": {
              "1": "Item 1",
              "2": "Item 2",
              "3": "Item 3"
            }
          },
          {
            "variableId": "c786:l810:eff:3:1",
            "label": "Test slider",
            "type": "slider",
            "defaultData": {
              "selectedSliderValue": 0
            },
            "range": {}
          }
        ],
        "layers": [
          {
            "id": "c259:l819:layer",
            "name": "1. Controls Checker",
            "compName": "A. Variable Duration"
          },
          {
            "id": "c259:l398:layer",
            "name": "2. Intro",
            "compName": "A. Variable Duration"
          },
          {
            "id": "c259:l265:layer",
            "name": "3. Outro",
            "compName": "A. Variable Duration"
          },
          {
            "id": "c259:l263:layer",
            "name": "4. Show Details",
            "compName": "A. Variable Duration"
          },
          {
            "id": "c259:l262:layer",
            "name": "5. Show Title",
            "compName": "A. Variable Duration"
          },
          {
            "id": "c259:l261:layer",
            "name": "6. Video Media",
            "compName": "A. Variable Duration"
          }
        ]
      }
    ]
  }
}
```

### Describe a composition with audio

Compositions that contain replaceable audio return `audio` controls for the pure-audio layers in the main comp. Describe the audio composition (for example `compName: "C. Audio Replacement"`) to get its audio control IDs, which you then use in the Render API `variations[].variables[]`. Multiple audio controls can be returned; each can be independently replaced or mixed at render time. The `durationInSeconds` field is informational, and `possibleAudioPreferences` lists the accepted `audioPreference` values.

```json
{
  "type": "aep",
  "controls": [
    {
      "variableId": "c840:l921:audio",
      "label": "Audio Media",
      "type": "audio",
      "durationInSeconds": 8.03,
      "possibleAudioPreferences": [
        "replace",
        "mix"
      ]
    },
    {
      "variableId": "c840:l922:audio",
      "label": "BG Music",
      "type": "audio",
      "durationInSeconds": 17.0,
      "possibleAudioPreferences": [
        "replace",
        "mix"
      ]
    }
  ]
}
```

## Get Status API (Describe job)

Poll the status of a template describe job until it completes. This step is the same for MOGRT and AEP.

In the cURL command below, replace `{jobId}` with the job ID returned from the Describe request.

### Sample request (Get Status)

```bash
curl -X GET \
  'https://audio-video-api.adobe.io/v1/status/{jobId}' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>' \
  --header 'Content-Type: application/json'
```

## Tips for best results

### Job status

A job can complete successfully (HTTP 200) with a payload status of `"succeeded"` or `"failed"`. Use the `status` field in the response body to determine the outcome. HTTP 4xx and 5xx responses indicate a problem with the request itself (for example, an invalid or missing Authorization header when calling the Get Status endpoint).

### Audio controls

An `audio` control can be used to either replace the full audio track for the output or mix the track with existing MOGRT audio. Only one `audio` control is allowed per Render API input variation. The `durationInSeconds` property for an audio-type control is informational only and is not required in the Render API request.

### Fonts

If the font is internal to Adobe and free, you do not need to upload the font in the Render API. If the font is licensed (Adobe or third-party), you must upload the font; otherwise, text falls back to the default font per Adobe policy. Use the `uploadRequired` flag to determine whether you need to send `source.url` to upload the font in the Render API.
