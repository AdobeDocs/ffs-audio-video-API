---
title: Getting started with TTS
description: This page is a quickstart guide to using the TTS API.
contributors:
  - https://github.com/BaskarMitrah
  - https://github.com/aeabreu-hub
---

# Using the Text to Speech API

The **Text to Speech (TTS)** API address the need for automated speech audio creation at scale. This guide shows you how to get started with using this asynchronous API.

## Overview

Using the Text to Speech (TTS) API, you can generate an audio output from a text prompt or text file input.
Options with this API allow you to:

1. Use a voice of your choice from a catalog of stock voices.
2. Choose from a wide variety of voices across genders, age groups, and speaking styles.

## Prerequisites

[Review the Getting Started page](/getting_started/) for this API for authentication and setup.

### API credentials

You'll need:

- ```client_id```
- ```client_secret```

## Quickstart

In the cURL command below, be sure to update:

- `Authorization` with the bearer token.
- `x-api-key` as per the prerequisite.
- `mediaType` as per input type.
- `url` with the generated pre-signed URL.
- `voiceId` specifies the unique ID of the voice to be used for speech generation. Users should [refer to the Voices List API](/api) to choose the appropriate voice ID.

The command returns a response object like the one below. Use the `statusUrl` from the response to [check the job result](#check-the-status-of-a-job).

```json
{
    "jobId": "986fc222-1118-4242-b326-eb9873e3982f",
    "statusUrl": "https://audio-video-api.adobe.io/v1/status/{jobID}"
}
```

### Generate a video from plain text prompt

```bash
curl --location 'https://audio-video-api.adobe.io/v1/generate-speech' \
-H 'Authorization: Bearer <Token>' \
-H 'x-api-key: <Client_ID>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "script": {
        "text": "<script text>",
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice ID>",
    "output": {
        "mediaType": "audio/wav"
    }
}'
```

### Generate using a text file

```bash
curl --location 'https://audio-video-api.adobe.io/v1/generate-speech' \
-H 'Authorization: Bearer <Token>' \
-H 'x-api-key: <Client_ID>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "script": {
        "source": {
            "url": "<pre-signed URL of text file>"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice ID>",
    "output": {
        "mediaType": "audio/wav"
    }
}'
```

### Check the status of a job

Use the GET Result API to see the status of a job. In the command below, update:

- `statusUrl`
- `Authorization`
- `x-api-key`

The `statusUrl` is returned in the response of the TTS API call.

```bash
curl --location '<statusUrl>' \
  -H 'Authorization: Bearer <Token>' \
  -H 'x-api-key: <Client_ID>' 
```

**Sample TTS API response**

```json
{
    "jobId": "986fc222-1118-4242-b326-eb9873e3982f",
    "status": "succeeded",
    "output": {
        "url": "<pre-signed URL of the result>"
    }
}
```

The `url` can be used to download the generated audio for the input.

### Verify with Content Credentials

Adobe participates in the content authentication initiative for AI-generated assets, addressing concerns around content legitimacy. Register your content by uploading the file at [ContentCredential.org](https://contentcredentials.org/verify).
