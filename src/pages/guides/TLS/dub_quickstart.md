---
title: Dub API Quickstart
description: This page is a quickstart guide for the TLS Dub API.
---
# Dub API

Quickstart commands to dub audio or video with a target language or edited transcript.

## Before you start

- You'll need a valid access token and client ID. See the [Authentication Guide](../getting_started/index.md) for details.
- Upload your media files (audio or video) to [your storage location and generate a pre-signed URL](../getting_started/storage_solutions/index.md).

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

Note the job ID in the response and use the [Get Result API](get_result_quickstart.md) to see the final result.

**Sample response**

```bash
{
    "jobId": "986fc222-1118-4242-b326-eb9873e3982f",
    "statusUrl": "https://audio-video-api.adobe.io/v1/status/{jobID}"
}
```
