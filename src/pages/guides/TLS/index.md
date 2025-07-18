---
title: Creating a Video Dub
description: Understand the workflow to create a video dub using Firefly's APIs.
keywords:
  - video dub
  - transcription
  - translation
  - dubbing
  - lip sync
  - transcribe api
  - dub api
---
# Creating a video dub

This guide explains the workflow for creating a video dub, which leverages Firefly's Transcribe and Dub APIs. Understand the use case for each API service and use this guide's quickstart commands to get started with your own implementation.

## Overview

When you create a dub from an audio or video file there are three main steps in the workflow: **transcription**, **translation**, and **dubbing**. Firefly's APIs are designed for use in specific parts of this workflow.

| ![TLS workflow Diagram](./TLS_workflow_diagram.drawio.png) |
| :---: |
| *A workflow featuring the Transcribe API and Dub API.* |

Let's understand more about how each specific API is designed.

### About the Dub API

The **Dub API** is the more comprehensive service and can be used for all three steps in the workflow. It consumes input media and can perform the transcription, translation to a target language, and dub, all at once. An optional AI lip sync can be applied to the dubbed video.

This API also accepts transcripts as input, from Adobe's Transcript API or elsewhere, and can perform a dub using that transcript. Use edited transcripts in this way for more precise control over the final dub.

### About the Transcribe API

The **Transcribe API** converts speech from audio and video files into a text transcript which can be used as input for the Dub API. Transcribe content in the source language or translate it into target languages, and generate captions.

This API cannot re-translate a source transcript. A translation can only be performed simultaneously with the transcription from the source media.

## Before you start

You can try these cURL requests directly in your terminal. Or you can use an HTTP client like [Postman](https://www.postman.com/). Before you start:

- You'll need a valid access token and client ID. See the [Authentication Guide](../../getting_started/index.md) for details.
- Upload your media files (audio or video) to [your storage location and generate a pre-signed URL](../../getting_started/storage_solutions/index.md).

## Transcribe quickstart

These are useful cURL commands to get started with the Transcribe API. In the commands below:

- Update the `Authorization` with the bearer access token.
- Update `x-api-key` with the client ID.
- Update `url` with the generated pre-signed URL for your input file.

### Transcribe video with source language output

```bash
curl --location 'https://audio-video-api.adobe.io/v1/transcribe' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {ClientID}' \
--data '{
  "video": {
    "source": {
         "url" : "{Presigned_URL}"
    },
    "mediaType": "video/mp4"
  }
}'
```

### Transcribe audio with source language output

```bash
curl --location 'https://audio-video-api.adobe.io/v1/transcribe' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {ClientID}' \
--data '{
  "audio": {
    "source": {
         "url" : "{Presigned_URL}"
    },
    "mediaType": "audio/mp3"
  }
}'
```

### Transcribe video with output in target language

```bash
curl --location 'https://audio-video-api.adobe.io/v1/transcribe' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {Client_ID}' \
--data '{
  "video": {
    "source": {
         "url" : "{Pre-signed_URL}"
    },
    "mediaType": "video/mp4"
  },
  "targetLocaleCodes": [
    "{Target_Locale_Code}"
  ]
}'
```

### Transcribe audio with output in target language

```bash
curl --location 'https://audio-video-api.adobe.io/v1/transcribe' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {ClientID}' \
--data '{
  "audio": {
    "source": {
         "url" : "{Presigned_URL}"
    },
    "mediaType": "audio/mp3"
  },
  "targetLocaleCodes": [
    "{targetLocaleCode}"
  ]
}'
```

### Transcribe and generate captions from video

```bash
curl --location 'https://audio-video-api.adobe.io/v1/transcribe' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {ClientID}' \
--data '{
  "video": {
    "source": {
         "url" : "{Presigned_URL}"
    },
    "mediaType": "video/mp4"
  },
  "captions": {
    "targetFormats": [
      "{targetCaptionFormat}"
    ]
  }
}'
```

### Transcribe and generate captions from audio

```bash
curl --location 'https://audio-video-api.adobe.io/v1/transcribe' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {ClientID}' \
--data '{
  "audio": {
    "source": {
         "url" : "{Presigned_URL}"
    },
    "mediaType": "audio/mp3"
  },
  "captions": {
    "targetFormats": [
      "{targetCaptionFormat}"
    ]
  }
}'
```

## Dub quickstart

These are useful cURL commands to get started with the Dub API. In the commands below:

- Update the `Authorization` with the bearer access token.
- Update `x-api-key` with the client ID.
- Update `url` with the generated pre-signed URL for your input file.

### Automated dubbing

You'll need to pass `targetLocaleCodes` in these commands.

#### Automated dubbing for video

```bash
curl --location 'https://audio-video-api.adobe.io/v1/dub' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {ClientID}' \
--data '{
  "video": {
    "source": {
        "url": "{Presigned_URL}"
    },
    "mediaType": "video/mp4"
  },
  "targetLocaleCodes": [
    "{targetLocaleCode}"
  ],
  "lipSync": "false"
}'
 ```

#### Automated dubbing for audio

```bash
curl --location 'https://audio-video-api.adobe.io/v1/dub' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {ClientID}' \
--data '{
  "audio": {
    "source": {
        "url": "{Presigned_URL}"
      },
      "mediaType": "audio/mp3"
    },
    "targetLocaleCodes": [
      "{targetLocaleCode}"
    ],
    "lipSync": "false"
}'
```

### Dubbing with edited transcripts

You'll need to pass the `targetLocaleCodes` and edited transcripts in these commands. The `transcripts` should contain **only one URL** for the edited transcript.

#### Dubbing with edited translations for video

```bash
curl --location 'https://audio-video-api.adobe.io/v1/dub' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {ClientID}' \
--data '{
  "video": {
    "source": {
      "url": "{Presigned_URL}"
    },
    "mediaType": "video/mp4"
  },
  "transcripts": [
    {
      "source": {
        "url": "{Transcript_Presigned_URL}"
      }
    }
  ],
  "targetLocaleCodes": [
    "{targetLocaleCode}"
  ],
  "lipSync": "false"
}'
```

#### Dubbing with edited translations for audio

```bash
curl --location 'https://audio-video-api.adobe.io/v1/dub' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {ClientID}' \
--data '{
  "audio": {
    "source": {
      "url": "{Presigned_URL}"
    },
    "mediaType": "audio/mp3"
  },
  "transcripts": [
    {
      "source": {
        "url": "{Transcript_Presigned_URL}"
      }
    }
  ],
  "targetLocaleCodes": [
    "{targetLocaleCode}"
  ],
  "lipSync": "false"
}'
```

## Check the result

Requests to these endpoints are processed asynchronously so a successful response will return a 202 status code with a job ID and a status URL.

**Example 202 response**

```bash
{
    "jobId": "986fc222-1118-4242-b326-eb9873e3982f",
    "statusUrl": "https://audio-video-api.adobe.io/v1/status/986fc222-1118-4242-b326-eb9873e3982f"
}
```

Use the job ID from the response with the [Get Result API](get_result_quickstart.md) to poll the job's status and retrieve the final results.
