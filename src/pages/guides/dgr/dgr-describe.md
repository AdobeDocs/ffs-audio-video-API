---
title: Using the Describe API
description: Quickstart guide with ready-to-use cURL commands for the Describe API.
keywords:
  - Dynamic Graphics Render
  - Describe API
  - MOGRT
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

The Describe API analyzes a MOGRT (video template) file and returns a manifest of editable controls: fonts, images, audio, video, and other supported values. Use this manifest to understand which variables you can override when calling the Render API to generate video variations.

## Prerequisites

[Review the Getting Started page](../../getting-started/dgr-auth.md) for this API for authentication and setup.

### API credentials

You'll need:

- ```client_id```
- ```client_secret```

## Describe template (POST)

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

## Get Status API (Describe job)

Poll the status of a template describe job until it completes.

In the cURL command below, replace `{jobId}` with the job ID returned from the Describe request.

### Sample request (Get Status)

```bash
curl -X GET \
  'https://audio-video-api.adobe.io/v1/status/{jobId}' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>' \
  --header 'Content-Type: application/json'
```

## Describe API success response

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

## Tips for best results

### Job status

A job can complete successfully (HTTP 200) with a payload status of `"succeeded"` or `"failed"`. Use the `status` field in the response body to determine the outcome. HTTP 4xx and 5xx responses indicate a problem with the request itself (for example, an invalid or missing Authorization header when calling the Get Status endpoint).

### Audio controls

An `audio` control can be used to either replace the full audio track for the output or mix the track with existing MOGRT audio. Only one `audio` control is allowed per Render API input variation. The `durationInSeconds` property for an audio-type control is informational only and is not required in the Render API request.

### Fonts

If the font is internal to Adobe and free, you do not need to upload the font in the Render API. If the font is licensed (Adobe or third-party), you must upload the font; otherwise, text falls back to the default font per Adobe policy. Use the `uploadRequired` flag to determine whether you need to send `source.url` to upload the font in the Render API.
