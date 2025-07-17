---
title: Transcribe API Quickstart
description: This page is a quickstart guide for the TLS Transcribe API.
---
# Using the Transcribe API

Quickstart commands to create a transcription from audio or video files.

## Overview

The Transcribe API enables you to convert speech from audio and video files into text. You can transcribe content in the source language or translate it to target languages, and generate captions in various formats. This guide provides ready-to-use cURL commands to get you started with transcription workflows.

## Before you start

- You'll need a valid access token and client ID. See the [Authentication Guide](../../getting_started/index.md) for details.
- Upload your media files (audio or video) to [your storage location and generate a pre-signed URL](../../getting_started/storage_solutions/index.md).

## Quickstart commands

In the commands below:

- Update the `Authorization` with the bearer access token.
- Update `x-api-key` with the client ID.
- Update `url` with the generated pre-signed URL for your input file.

You can try these curl requests directly in your terminal. Or you can use an HTTP client like [Postman](https://www.postman.com/).

### Transcribe with source language output

#### Transcribe video with source language output

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

#### Transcribe audio with source language output

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

### Transcribe with target language output

#### Transcribe video with target language output

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
  "targetLocaleCodes": [
    "{targetLocaleCode}"
  ]
}'
```

#### Transcribe audio with target language output

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

### Transcribe and generate captions with source language output

#### Transcribe and generate captions for video with source language output

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

#### Transcribe and generate captions for audio with source language output

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

## Using the Dub API

Quickstart commands to dub audio or video with a target language or edited transcript.

## Overview

The Dub API allows you to create dubbed versions of audio and video content by translating speech to different languages. Use automated dubbing with AI-generated translations or provide your own edited transcripts for precise control. This guide provides cURL commands for various dubbing scenarios including automated translation and custom transcript workflows.

## Before you start

- You'll need a valid access token and client ID. See the [Authentication Guide](../../getting_started/index.md) for details.
- Upload your media files (audio or video) to [your storage location and generate a pre-signed URL](../../getting_started/storage_solutions/index.md).

## Quickstart commands

In the commands below:

- Update the `Authorization` with the bearer access token.
- Update `x-api-key` with the client ID.
- Update `url` with the generated pre-signed URL for your input file.

You can try these curl requests directly in your terminal. Or you can use an HTTP client like [Postman](https://www.postman.com/).

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

### Dubbing with edited transcript

You'll need to pass the `targetLocaleCodes` and edited transcripts in these commands. The `transcripts` should contain **only one value** with the URL for the edited transcript.

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

### Dubbing with pre-existing translations

You need to pass `transcripts` along with `localeCode` in this case. Each value of `transcripts` contains the URL to download the transcript AND the locale code for the same.

#### Dubbing with pre-existing translations for video

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
            "url": "{Transcript_Presigned_URL_de-DE}"
        },
        "localeCode": "de-DE"
    },
    {
        "source": {
            "url": "{Transcript_Presigned_URL_en-US}"
        },
        "localeCode": "en-US"
    }
  ],
  "lipSync": "false"
}'
```

#### Dubbing with pre-existing translations for audio

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
        "url": "{Transcript_Presigned_URL_de-DE}"
      },
      "localeCode": "de-DE"
    },
    {
      "source": {
        "url": "{Transcript_Presigned_URL_en-US}"
      },
      "localeCode": "en-US"
    }
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
