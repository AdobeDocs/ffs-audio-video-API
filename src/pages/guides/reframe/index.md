---
title: Reframe API Feature Guide
description: See the features and key parameters for implentations of Firefly's Reframe API.
hideBreadcrumbNav: true
keywords:
  - Reframe
  - API
  - Quickstart
  - cURL
  - Reframe API
  - Reframe API Quickstart
  - Reframe API cURL
  - Reframe API Quickstart cURL
  - Reframe API Quickstart cURL commands
  - Reframe API Quickstart cURL commands
---

# Using the Reframe API

This quickstart guide provides ready-to-use cURL commands and instructions for the features of
the Reframe API.

## Overview

<InlineAlert variant="info" slots="heading, text" />

NOTE

There are two Reframe API endpoints currently available. The v1 API has more limited capabilities and may be deprecated soon. It's recommended to use the v2 endpoint instead.

The Reframe API automatically adjusts video content to fit different aspect ratios while maintaining visual focus on important elements.
Reframe videos for various social media platforms and add dynamic overlays like GIFs and images with precise timing and positioning controls.

This guide provides cURL commands for basic reframing and advanced overlay workflows. For even more technical details and tips, see the [Usage Notes](../../getting-started/usage/index.md#reframe-api-usage).

## Before you start

* You'll need a valid access token and client ID. See the [Authentication Guide](../../getting-started/index.md) for details.
* Upload your media files (audio or video) to [your storage location and generate a pre-signed URL](../../getting-started/storage-solutions/index.md).

## Use reframing and scene edit detection

Use the cURL command example below to reframe your video.
For best results, input video with a 16:9 aspect ratio format.

```shell
curl --location 'https://audio-video-api.adobe.io/v2/reframe' \
--header 'Authorization: ${ACCESS_TOKEN}' \
--header 'x-api-key: ${CLIENT_ID}' \
--header 'Content-Type: application/json' \
--data '{
  "video": {
    "source": {
      "url": "<pre_signed_URL>"
    }
  },
  "analysis": {
    "sceneEditDetection": true
  },
  "output": {
    "renditions": [
      {
        "aspectRatio": {
          "x": 1,
          "y": 1
        }
      },{
        "resolution": {
          "width": 1080,
          "height": 560
        },
        "mediaDestination": {
          "url": "<pre-signed_URL_for_output_video>"
        }
      },
      {
        "aspectRatio": {
          "x": 4,
          "y": 5
        }
      }
    ],
    "layout": {
      "applyLetterboxing": true
    }
  }
}'
```

In the command, be sure to:

* Replace `bearer_token` with the access token generated during authentication.
* Update `x-api-key` with your assigned API key/Client ID.

### Provide the source

* In `url`, include the pre-signed URL to the video you'd like to have reframed.

### Activate Semantic Subject Lock

<InlineAlert variant="info" slots="heading, text" />

NOTE

This feature relies on focal point and is only available with the Reframe API v2.

The Reframe API has [**Semantic Subject Lock**](../../getting-started/semantic-search/index.md), which allows you to declare a **focal subject** to guide reframing around a named object or subject using **plain-language keywords**. These keywords persist across scene boundaries, ensuring the same subject stays locked even through cuts.

Omit focal points if:

* You need **fast, hands-off automation** for well-shot footage (single clear subject, "reframe-aware" composition) and do not require semantic control.
* Your content is **center-cut safe**.

#### Declare a focal point subject

Provide keywords in the `focalPoints` array to enable **Semantic Subject Lock** on an object or product:

```json
"analysis": {
  "sceneEditDetection": true,
  "focalPoints": [
    "car",
    "people"
  ]
}
```

If no focal points are provided, the API defaults to saliency-based reframing.

### Adjust the output

<InlineAlert variant="info" slots="heading, text" />

NOTE

Some output features are only available with the Reframe API v2.

* For multi-scene videos, enable scene transition handling by setting `sceneEditDetection: true`.

```json
"analysis": {
    "sceneEditDetection": true
}
```

* Specify aspect ratios for the output in width:height format (examples: "1:1", "9:16").
* With v2, pass exact frame sizes when needed. The Reframe API v2 accepts pixel dimensions (for example, 1080×1920) in addition to aspect ratios, which is useful where platform sizes differ.

```json
"output": {
    "renditions": [
        {
            "resolution": {
                "width": 1080,
                "height": 1080
            }
        }
    ]
}
```

* With v2, request an *editable sidecar file* as an OpenTimeLine file (`otio`) for editing in Premiere Pro (beta) without reprocessing the whole video.

```json
"output": {
    "format": {
        "sidecar": "otio"
    }
}
```

When this option is enabled, you can download a **.zip archive** containing:

* The **source asset**
* An **`otio` file** (OpenTimeline), which can be opened in **Adobe Premiere Pro (beta)** for final edits.

* Apply **letterboxing** to your output by enabling the `applyLetterboxing` option:

```json
"output": {
    "layout": {
        "applyLetterboxing": true
    }
}
```

When `applyLetterboxing` is set to `true`, the output may contain letterboxing for vertical formats and pillarboxing for horizontal aspect ratios.

* By default, when requesting an `otio` sidecar (`output.format.sidecar: "otio"`) with multiple renditions, each rendition receives its own sidecar file. To instead receive **one combined sidecar bundle** for all renditions, set `output.sidecarOptions`:

```json
"output": {
    "format": {
        "sidecar": "otio"
    },
    "sidecarOptions": {
        "delivery": "bundled",
        "bundleDestination": {
            "url": "<pre-signed_PUT_URL_to_upload_the_combined_sidecar_bundle>"
        }
    }
}
```

`sidecarOptions.delivery` accepts:

* **`per_rendition`** (default): each rendition receives its own sidecar file — this is the current behavior described above.
* **`bundled`**: all renditions' sidecar data is bundled into a single archive. The upload location you provide in `bundleDestination` is echoed back as `sidecarBundleDestination` in the job status response.
* **`bundled_no_source`**: same as `bundled`, but the source footage is excluded from the archive.

This option is currently only supported when `output.format.sidecar` is `"otio"` — using it with any other sidecar type returns a validation error. `bundleDestination` is only valid when `delivery` is `bundled` or `bundled_no_source`, and cannot be combined with a per-rendition `sidecarDestination`.

For full details, [see the API Reference](../../api/index.md).

## Add video overlays

Overlays enable you to add assets as dynamic layers (for example: GIFs, animated PNGs, PNG) on top of a video, customized for positioning, size, timing, and behavior.

Use the cURL command example below to extend the Reframe API payload by defining `overlays`. The `overlays` array determines how one or more overlay assets are applied.

```shell
curl --location 'https://audio-video-api.adobe.io/v2/reframe' \
--header 'Authorization: ${ACCESS_TOKEN}' \
--header 'x-api-key: ${CLIENT_ID}' \
--header 'Content-Type: application/json' \
--data '{
  "video": {
    "source": {
      "url": "<pre_signed_URL>"
    },
  },
  "analysis": {
    "sceneEditDetection": true
  },
  "composition": {
    "overlays": [
      {
        "source": {
          "url": "<pre_signed_overlay_URL>"
        },
        "startTime": "00:00:10:15",
        "duration": "00:00:05:00",
        "scale": {
          "width": 400,
          "height": 400
        },
        "position": {
          "anchorPoint": "center",
          "offsetX": 0,
          "offsetY": 0
        },
        "repeat": "loop"
      }
    ]
  },
  "output": {
    "renditions": [
        {
          "aspectRatio": {
            "x": 1,
            "y": 1
          },
          "resolution": {
            "width": 1080,
            "height": 560
          },
          "mediaDestination": {
            "url": "<pre-signed_URL_for_output_video>"
          }
        },
        {
          "aspectRatio": {
            "x": 16,
            "y": 9
          }
        }
      ]
  }
}'
```

In the command, be sure to:

* Replace `bearer_token` with the access token generated during authentication.
* Update `x-api-key` with your assigned API key/Client ID.
* [Include data for a reframed video source](#provide-the-source).

Each overlay object has many customizable properties to adjust the result. For full details, [see the API Reference](../../api/index.md).

### Provide the overlay source

Indicate the source of the overlay asset in the `overlay` object:

* **`source.url`** (required):
  A pre-signed URL pointing to the overlay asset. The URL must be accessible and valid during the request.

**Example**:

```json
"source": {
  "url": "<pre_signed_overlay_URL>"
}
```

### Adjust overlay timing

Specify the timing of overlays with:

* **`startTime`**:
  Timecode specifying when the overlay starts on the video.
* **`duration`**:
  Timecode specifying how long the overlay remains visible.

Use timecode format `HH:mm:SS:Frames`, where:

* HH: Hours (00–23)
* MM: Minutes (00–59)
* SS: Seconds (00–59)
* Frames: The frame number within a second, based on the video's frames per second (FPS)

**Example**:

```json
"startTime": "00:00:05:10",
"duration": "00:00:10:00"
```

### Adjust overlay size and position

Adjust the size and position of the overlay with:

* **`scale`**:
  Defines the dimensions of the overlay in pixels.
  * **`width`**:
  The width of the overlay.
  * **`height`**:
  The height of the overlay.

**Example**:

```json
"scale": {
  "width": 300,
  "height": 300
}
```

### Adjust overlay position

Specify the overlay's anchor point on the video and the offsets for precise placement with:

* **`anchorPoint`** (required):
  Predefined anchor positions for placement. Use:
  * `"top_left"`
  * `"top_right"`
  * `"center"`
  * `"bottom_left"`
  * `"bottom_right"`

* **`offsetX`** and **`offsetY`**:
  Pixel offsets relative to the anchor position for fine-tuning placement.

**Example**:

```json
"position": {
  "anchorPoint": "top_right",
  "offsetX": 50,
  "offsetY": 50
}
```

### Adjust overlay behavior

Determine how the overlay should behave when the source media runs longer with:

* **`repeat`**:
Use:
  * `"loop"`
  The overlay loops continuously for the specified duration.
  * `"stop_on_last_frame"`
  The overlay GIF stops on the last frame.
  * `"time_stretch"`
  Stretch the time of the overlay to the remaining length of the video.

**Example**:

```json
"repeat": "loop"
```

## The job response

If successful, you'll see a response like:

```json
{
  "jobId": "<job_ID>",
  "statusUrl": "https://<base URL>/v2/status/<job_ID>"
}
```

If there's an error, you'll see something like:

```json
{
  "error_code": <error_code>,
  "message": <message>
}
```

For a full list of error codes, check the [API Reference](../../api/index.md).

## Check the job status

To check the status of a reframe job, use the cURL command below.

```shell
curl -X 'GET'
'https://audio-video-api.adobe.io/v2/status/{jobId}' \
-H 'Authorization:{ACCESS_TOKEN}' \
-H 'x-api-key:{CLIENT_ID}' \
-H 'Content-Type: application/json'
```

A successful response when the processing job is complete contains a secure link in `url` to download the reframed video output. Go to the URL in your browser to see your new processed video.

**Successful response for a running job**:

```json
{
    "jobId": "<job_ID>",
    "status": "running",
    "percentCompleted": "23.0"
}
```

**Successful response when the processing job is complete**:

```json
{
    "jobId": "<job_ID>",
    "status": "succeeded",
    "outputs": [
      {
        "mediaDestination": {
          "url": "<pre-signed_PUT_URL_to_upload_the_output_video_to_user_bucket>"
        },
        "sidecarDestination": {
          "url": "<pre-signed_PUT_URL_to_upload_the_sidecar_file_to_user_bucket>"
        }
      }
    ]
}
```

If the request set `output.sidecarOptions.delivery` to `"bundled"` or `"bundled_no_source"`, the response includes a job-level `sidecarBundleDestination` instead of a per-rendition `sidecarDestination`:

```json
{
    "jobId": "<job_ID>",
    "status": "succeeded",
    "outputs": [
      {
        "mediaDestination": {
          "url": "<pre-signed_PUT_URL_to_upload_the_output_video_to_user_bucket>"
        }
      }
    ],
    "sidecarBundleDestination": {
      "url": "<pre-signed_PUT_URL_to_upload_the_combined_sidecar_bundle>"
    }
}
```
