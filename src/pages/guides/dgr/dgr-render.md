---
title: Using the Render API
description: Quickstart guide with ready-to-use cURL commands for the Render API.
keywords:
  - Dynamic Graphics Render
  - Render API
  - Cancel render job
  - List render jobs
  - MOGRT
  - AEP
  - After Effects
  - layer operations
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

The Render API renders one or more video variations by applying overrides and export presets. Submit overrides for a subset of editable layers and receive a signed URL download link to the video file. For layers that are not editable, or for which no override has been provided, the system defaults are automatically applied at export.

The Render API supports two template types, selected with the `type` field: `mogrt` (default) and `aep` (an After Effects project). AEP requests use the same variation and preset model as MOGRT, add a required `compName`, and additionally support `layerOperations[]` for layer-level timing control. See [Render an AEP project](#render-an-aep-project).

Before calling the Render API, use the [Describe API](dgr-describe.md) to discover the template's editable controls and variable IDs, and the [Presets API](index.md) to choose export presets.

For near real-time job notifications in addition to polling the status URL, see [Setting up Dynamic Graphics Render API events with Adobe I/O Events](dgr-io-events-setup.md).

## Prerequisites

[Review the Getting Started page](../../getting-started/index.md) for this API for authentication and setup.

### API credentials

You'll need:

- ```client_id```
- ```client_secret```

## Render a MOGRT template

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
        "fileName": "some_custom_file_name",
        "destination": {
          "url": "<pre-signed_URL_for_output_video>"
        }
      },
      {
        "variationIndex": 1,
        "presetIndex": 0,
        "fileName": "output_vert_1920p_hq",
        "destination": {
          "url": "<pre-signed_URL_for_output_video>"
        }
      },
      {
        "variationIndex": 1,
        "presetIndex": 1,
        "fileName": "my_custom_file_name",
        "destination": {
          "url": "<pre-signed_URL_for_output_video>"
        }
      }
    ]
  }'
```

A successful request returns `202 Accepted` with a `jobId` and `statusUrl`. Poll the status URL (or the Get Status API) until the job completes.

## Render an AEP project

To render an After Effects project, set `type` to `aep`, point `source.url` at a `.zip` archive that contains a single `.aep` file and its collected assets, and name the composition with `compName`.

- `compName` is **required** for AEP. This composition name within the project must be unique so that `compName` resolves to a single composition.
- Each `variations[].variables[].variableId` is a control ID from the [Describe API](dgr-describe.md) `controls[]` (for example `c259:l261:media`, `c169:l193:layer:sourceText`). Use these IDs verbatim.

In the AEP sample requests below, be sure to update:

- `Authorization` with the bearer token.
- `x-api-key` with your client ID.
- The request body URLs (`source.url`, `assets[].source.url`, `fonts[].source.url`) with your pre-signed URLs, and control and layer IDs with values from the Describe API response.

### Sample request (Render AEP)

This variation replaces the video media on composition `A. Variable Duration` and scales it to fill the frame.

```bash
curl -X POST \
  'https://audio-video-api.adobe.io/v1/templates/render' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>' \
  --header 'Content-Type: application/json' \
  --data '{
    "type": "aep",
    "compName": "A. Variable Duration",
    "source": {
      "url": "<.zip pre-signed URL>"
    },
    "config": {
      "handleMissingFonts": "use_default",
      "sidecar": "aep"
    },
    "presets": [
      {
        "source": {
          "presetId": "ffs_video_api_land_1080p_hq"
        }
      }
    ],
    "assets": [
      {
        "source": {
          "url": "<pre-signed url for video asset>"
        }
      }
    ],
    "variations": [
      {
        "variables": [
          {
            "variableId": "c259:l261:media",
            "assetIndex": 0,
            "scale": "fill_frame"
          }
        ]
      }
    ],
    "outputs": [
      {
        "variationIndex": 0,
        "presetIndex": 0,
        "fileName": "aep_media_replace"
      }
    ]
  }'
```

The 202 response, status polling, output structure, cancel, and list-jobs behavior are identical to MOGRT (see the sections below).

### Layer operations (AEP only)

`layerOperations[]` is a top-level array, applicable only when `type` is `aep`, that adjusts layer and composition timing and layer visibility after variable overrides are applied. Operations run in array order and each targets a layer by its `layerId` — the `layers[].id` value from the Describe response (of the form `c{comp}:l{layer}:layer`).

| Operation | Purpose | Key fields |
|-----------|---------|------------|
| `trim_comp` | Set the comp start time and duration. | `startLayerId` or `startSeconds`/`startFrames`, `endLayerId` or `durationSeconds`/`durationFrames` |
| `trim_inpoint` | Trim a layer's in point to a reference time. | `layerId`, `refLayerId`, `refInOut`, `offsetSeconds`/`offsetFrames` |
| `trim_outpoint` | Trim a layer's out point to a reference time. | `layerId`, `refLayerId`, `refInOut`, `offsetSeconds`/`offsetFrames` |
| `shift_inpoint` | Shift a layer so its in point aligns to a reference time (keeps duration). | `layerId`, `refLayerId`, `refInOut`, `offsetSeconds`/`offsetFrames` |
| `shift_outpoint` | Shift a layer so its out point aligns to a reference time (keeps duration). | `layerId`, `refLayerId`, `refInOut`, `offsetSeconds`/`offsetFrames` |
| `stretch_layer` | Time-stretch a layer to an absolute percentage or duration, or to match the duration of a reference layer. | `layerId`, `durationPercent`/`durationSeconds`/`durationFrames` or `refLayerId`, `offsetSeconds`/`offsetFrames` |
| `match_source_duration` | Extend a layer to match its source footage duration. | `layerId`, optional `layerInOut` |
| `set_layer_duration` | Set a layer to an absolute duration. | `layerId`, `durationSeconds`/`durationFrames` |
| `enable_layer` | Turn a layer's video and/or audio on or off, and/or solo it (if a comp contains layers that have solo enabled, only those layers will render). | `layerId`, `videoEnabled`, `audioEnabled`, `solo` |

Reference times are resolved from `refLayerId` + `refInOut` (which end of the reference layer to read), then adjusted by `offsetSeconds` or `offsetFrames`. When both a seconds and a frames form are given for the same field, the seconds form takes precedence. For `stretch_layer`, the target duration is taken from `durationPercent`, then `durationSeconds`, then `durationFrames`, then `refLayerId` (the reference layer's duration), in that order. For `match_source_duration`, `layerInOut` optionally restricts the change to one end of the layer — `in` matches only the in point, `out` only the out point; omit it to match both ends. For `enable_layer`, set at least one of `videoEnabled`, `audioEnabled`, or `solo`.

### Sample request (AEP layer operations)

This request builds a variable-duration timeline: the video layer is extended to its source duration, downstream layers are chained relative to each other, and the composition is trimmed to the resulting range. The intro layer is also hidden with `enable_layer`.

```bash
curl -X POST \
  'https://audio-video-api.adobe.io/v1/templates/render' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>' \
  --header 'Content-Type: application/json' \
  --data '{
    "type": "aep",
    "compName": "A. Variable Duration",
    "source": {
      "url": "<.zip pre-signed URL>"
    },
    "config": {
      "handleMissingFonts": "use_default"
    },
    "presets": [
      {
        "source": {
          "presetId": "ffs_video_api_land_1080p_hq"
        }
      }
    ],
    "assets": [
      {
        "source": {
          "url": "<pre-signed url for video asset>"
        }
      }
    ],
    "variations": [
      {
        "variables": [
          {
            "variableId": "c259:l261:media",
            "assetIndex": 0
          }
        ]
      }
    ],
    "layerOperations": [
      {
        "operation": "match_source_duration",
        "layerId": "c259:l261:layer",
        "layerInOut": "out"
      },
      {
        "operation": "shift_inpoint",
        "layerId": "c259:l263:layer",
        "refLayerId": "c259:l261:layer",
        "refInOut": "out",
        "offsetSeconds": -1
      },
      {
        "operation": "shift_inpoint",
        "layerId": "c259:l265:layer",
        "refLayerId": "c259:l263:layer",
        "refInOut": "in",
        "offsetFrames": 90
      },
      {
        "operation": "trim_comp",
        "startSeconds": 0,
        "endLayerId": "c259:l265:layer"
      },
      {
        "operation": "trim_outpoint",
        "layerId": "c259:l263:layer",
        "refLayerId": "c259:l265:layer",
        "refInOut": "out"
      },
      {
        "operation": "trim_outpoint",
        "layerId": "c259:l262:layer",
        "refLayerId": "c259:l261:layer",
        "refInOut": "out"
      },
      {
        "operation": "trim_outpoint",
        "layerId": "c259:l819:layer",
        "refLayerId": "c259:l265:layer",
        "refInOut": "out"
      },
      {
        "operation": "enable_layer",
        "layerId": "c259:l398:layer",
        "videoEnabled": false
      }
    ],
    "outputs": [
      {
        "variationIndex": 0,
        "presetIndex": 0,
        "fileName": "aep_layer_operations"
      }
    ]
  }'
```

For `enable_layer`, a comp with solo layers renders against the background color defined in the comp's settings; if the output format supports an alpha channel (such as .mov), a comp with solo layers renders against a transparent background.

If a comp contains video layers, and you want to render to a video output format with audio only (no video), it's necessary to additionally solo an invisible video layer (such as a null), or to set `videoEnabled` to false for all video layers; if rendering to an audio output format, it's sufficient to only solo the required audio layers.

### Sample request (Render audio)

This request replaces the audio control `c840:l921:audio` (from the [Describe API](dgr-describe.md) `controls[]` of the audio composition) with a replacement audio asset. Set `audioPreference` to `replace` to swap the track or `mix` to blend it with existing audio. Each `audio` control returned by Describe can be independently replaced or mixed; audio controls are the pure-audio layers in the main comp.

```bash
curl -X POST \
  'https://audio-video-api.adobe.io/v1/templates/render' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>' \
  --header 'Content-Type: application/json' \
  --data '{
    "type": "aep",
    "compName": "C. Audio Replacement",
    "source": {
      "url": "<.zip pre-signed URL>"
    },
    "config": {
      "handleMissingFonts": "use_default"
    },
    "presets": [
      {
        "source": {
          "presetId": "ffs_video_api_land_1080p_hq"
        }
      }
    ],
    "assets": [
      {
        "source": {
          "url": "<pre-signed url for audio asset>"
        }
      }
    ],
    "variations": [
      {
        "variables": [
          {
            "variableId": "c840:l921:audio",
            "assetIndex": 0,
            "audioPreference": "replace"
          }
        ]
      }
    ],
    "outputs": [
      {
        "variationIndex": 0,
        "presetIndex": 0,
        "fileName": "aep_audio_replace"
      }
    ]
  }'
```

## Render API success response (202)

The initial response provides the job ID and status URL to poll for completion. It is the same for MOGRT and AEP.

```json
{
  "jobId": "<JOB_ID>",
  "statusUrl": "https://audio-video-api.adobe.io/v1/status/<JOB_ID>",
  "cancelUrl": "https://audio-video-api.adobe.io/v1/cancel/<JOB_ID>"
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

When the job has succeeded, the response includes signed URLs for each output. The fields below apply **only to render jobs submitted via `POST /v1/templates/render`**.

```json
{
  "jobId": "<jobId>",
  "status": "succeeded",
  "createdDate": "2026-05-20T10:00:00Z",
  "totalJobItems": 2,
  "outputs": [
    {
      "variationIndex": 0,
      "presetIndex": 0,
      "startedDate": "2026-05-20T10:01:00Z",
      "completedDate": "2026-05-20T10:03:45Z",
      "destination": {
        "url": "https://<SIGNED_OUTPUT_URL>.mp4"
      },
      "sidecarDestination": {
        "url": "https://<SIGNED_SIDECAR_URL>.zip"
      }
    },
    {
      "variationIndex": 1,
      "presetIndex": 0,
      "startedDate": "2026-05-20T10:01:05Z",
      "completedDate": "2026-05-20T10:04:10Z",
      "destination": {
        "url": "https://<SIGNED_OUTPUT_URL_2>.mp4"
      }
    }
  ]
}
```

### Status values for render jobs

| Status | Description |
|--------|-------------|
| `not_started` | Job is queued, not yet picked up by a worker. |
| `running` | Job is actively being processed. |
| `canceling` | A cancel request was accepted; worker is stopping. Transient — poll until `canceled`. |
| `canceled` | Job was fully stopped. In-progress outputs were not uploaded. |
| `succeeded` | All output items completed successfully. |
| `partially_succeeded` | Some outputs succeeded; check `errors[]` for failures. A `retryPayloadUrl` is provided for retrying failed items. |
| `failed` | All output items failed. |

### Partially succeeded response

When `status` is `partially_succeeded`, the response includes a `retryPayloadUrl` to retry only the failed items.

```json
{
  "jobId": "<jobId>",
  "status": "partially_succeeded",
  "createdDate": "2026-05-20T10:00:00Z",
  "totalJobItems": 3,
  "retryPayloadUrl": "https://audio-video-api.adobe.io/v1/templates/render?retry=<token>",
  "outputs": [
    {
      "variationIndex": 0,
      "presetIndex": 0,
      "startedDate": "2026-05-20T10:01:00Z",
      "completedDate": "2026-05-20T10:03:45Z",
      "destination": {
        "url": "https://<SIGNED_OUTPUT_URL>.mp4"
      }
    }
  ],
  "errors": [
    {
      "variationIndex": 1,
      "presetIndex": 0,
      "startedDate": "2026-05-20T10:01:05Z",
      "completedDate": "2026-05-20T10:02:00Z",
      "error": {
        "error_code": "validation_error",
        "message": "You have exceeded the limit for..."
      }
    }
  ]
}
```

## Cancel a render job (PUT)

Cancel an in-flight render job. Returns `202 Accepted` immediately; poll `GET /v1/status/{jobId}` until `status` is `canceled`.

**Applicable only to render jobs submitted via `POST /v1/templates/render`.** This endpoint does not apply to Describe, Reframe, TLS, TTS, or Avatar jobs.

- Cancellation is **idempotent** — re-canceling an already-canceled job returns 409.
- In-progress outputs that have not yet been uploaded are discarded.
- For a brief window after the PUT, status may still report `running`; poll until it becomes `canceled`.

### Sample request (Cancel)

```bash
curl -X PUT \
  'https://audio-video-api.adobe.io/v1/cancel/{jobId}' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>'
```

### Cancel API success response (202)

```json
{
  "jobId": "27776956-d405-4754-97e9-7e9cfd3809af",
  "status": "canceling"
}
```

Once the worker stops, a subsequent `GET /v1/status/{jobId}` will return:

```json
{
  "jobId": "27776956-d405-4754-97e9-7e9cfd3809af",
  "status": "canceled",
  "createdDate": "2026-05-20T10:00:00Z",
  "totalJobItems": 3
}
```

### Cancel API error responses

| HTTP Status | Error code | Meaning |
|-------------|------------|---------|
| `404` | `job_not_found` | `jobId` is unknown or no longer accessible. |
| `409` | `job_completed` | Job already completed — cannot cancel. |
| `409` | `job_already_canceled` | Job was already canceled. |

## List render jobs (GET)

Returns a paginated list of your render jobs, optionally filtered by status and creation date.

**Applicable only to render jobs submitted via `POST /v1/templates/render`.** Jobs from other API types are not returned.

### Sample request (List Render Jobs)

```bash
curl -X GET \
  'https://audio-video-api.adobe.io/v1/templates/render-jobs?filter=status==running&limit=20' \
  --header 'Authorization: Bearer <token>' \
  --header 'x-api-key: <client_id>'
```

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filter` | string | No | FIQL expression. Supports `status` and `createdDate`. Default: all statuses, last 30 days. |
| `limit` | integer | No | Items per page. Range: 1–100. Default: 20. |
| `cursor` | string | No | Pagination cursor from `paging.nextUrl` of a previous response. |

#### Filter examples

| Filter | Meaning |
|--------|---------|
| `status==running` | Running jobs only. |
| `status=in=(running,not_started)` | Jobs that are queued or in progress. |
| `createdDate=ge=-P7D` | Jobs created in the last 7 days. |
| `status==running;createdDate=ge=-P7D` | Running jobs from the last 7 days. |
| `createdDate=ge=2026-05-14T00:00:00Z;createdDate=le=2026-05-21T00:00:00Z` | Absolute date range. |

### List Render Jobs success response (200)

```json
{
  "paging": {
    "nextUrl": "https://audio-video-api.adobe.io/v1/templates/render-jobs?cursor=<cursor>&limit=20",
    "totalRecords": 47
  },
  "jobs": [
    {
      "jobId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "succeeded",
      "totalJobItems": 5,
      "createdDate": "2026-05-20T10:00:00Z",
      "completedDate": "2026-05-20T10:05:30Z",
      "statusUrl": "https://audio-video-api.adobe.io/v1/status/3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    {
      "jobId": "7ba95c74-6828-5673-c4fd-3d074g77bgb7",
      "status": "running",
      "totalJobItems": 10,
      "percentCompleted": 42.0,
      "createdDate": "2026-05-20T11:00:00Z",
      "statusUrl": "https://audio-video-api.adobe.io/v1/status/7ba95c74-6828-5673-c4fd-3d074g77bgb7",
      "cancelUrl": "https://audio-video-api.adobe.io/v1/cancel/7ba95c74-6828-5673-c4fd-3d074g77bgb7"
    }
  ]
}
```

Paginate by following `paging.nextUrl` until it is absent (last page).

## Tips for best results

### Presets

You can use the `presetId` from the list of export presets returned by the [Get Presets API](index.md), or use custom encoder presets via a pre-signed URL. For details on preparing custom presets, see [Custom encoding presets](https://helpx.adobe.com/in/media-encoder/using/custom-encoding-presets.html) in Adobe Help.

### Assets

You can consolidate all audio, video, and image assets in the `assets` array and reference them by 0-based index in the `variations` array.

### Image and video controls

For media controls, you can set `scale` to one of the possible values returned in the [Describe API](dgr-describe.md) response (for example, `no_scale`, `fit_to_frame`, `stretch_to_fill`, `fill_frame`).

For AEP, finer-grained timing control (including matching a layer's duration to its replacement footage) is available via [layer operations](#layer-operations-aep-only).

### Audio control

For an audio control, set `audioPreference` to `"replace"` or `"mix"`. The default is `"replace"`.

### Missing fonts

The `config.handleMissingFonts` parameter controls behavior when a required font is not provided. Possible values:

- `fail` – The render request fails.
- `use_default` – Use Premiere Pro fallback behavior.

If `handleMissingFonts` is not provided, the default is `use_default`.

### Sidecar

For AEP renders, set `config.sidecar` to `"aep"` to also produce the collected After Effects project — a self-contained archive of the `.aep` file and its footage. Each succeeded output then carries a `sidecarDestination` (a signed download URL) alongside its `destination` in the [Get Status response](#get-status-success-response-200).

`config.sidecar` is optional and applies only when `type` is `aep`; `"aep"` is the only supported value.

## Related guides

- [Setting up Dynamic Graphics Render API events with Adobe I/O Events](dgr-io-events-setup.md)
- [Using the Describe API](dgr-describe.md)
- [Quickstart for Presets with the Dynamic Graphics Render API](index.md)
- [API Reference](../../api/index.md)
