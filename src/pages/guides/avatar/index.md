---
title: Using the Avatar API
description: Learn how to use the Avatar API to generate avatar videos.
contributors:
  - https://github.com/BaskarMitrah
  - https://github.com/aeabreu-hub
hideBreadcrumbNav: true
keywords:
  - audio
  - video
  - API
  - usage
  - limitations
---

# Using the Avatar API

The Avatar API generates videos using a digital avatar speaking from a provided transcript or recording.

## Overview

Using the Avatar API you can generate an avatar video from a text prompt or audio input.
Options with the endpoint allow you to:

- Select an avatar from a catalog of stock actors.
- Select a voice from a catalog of stock voices.
- Use your own voice file to create avatar videos.
- Set your own image/video as a video background.

## Prerequisites

You'll need:

- Client ID
- Client secret
  
[Review the Getting Started page][1] for authentication and setup.

## Quickstart

Use the commands below to generate an avatar video.

In the cURL commands, be sure to update:

-  `Authorization` with the bearer token.
-  `x-api-key` with the Client ID.
-  `mediaType` with the correct input format.
-  `url` (where applicable) with the generated pre-signed URL.
-  `avatarId` with the unique ID of the avatar to be used for avatar generation. Users should [refer to the GET Avatars API][2] to choose the Avatar ID or refer to the [Avatar Catalog][6] to see the list of avatars.
-  `voiceId` with the unique ID of the voice to be used for avatar generation. Users should [leverage the Text to Speech GET Voices API][3] to choose the Voice ID.

### Generate a video from plain text input

```bash
curl 'https://audio-video-api.adobe.io/v1/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_ID>' \
  --data-raw '{
    "script": {
        "text": "<script_text>",
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice_ID>",
    "avatarId": "<avatar_ID>",
    "output": {
        "mediaType": "video/mp4"
    }
}'
```

### Generate a video from a text file input

```bash
curl 'https://audio-video-api.adobe.io/v1/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_ID>' \
  --data-raw '{
    "script": {
        "source": {
            "url": "<pre_signed_URL_of_text_file>"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice_ID>",
    "avatarId": "<avatar_ID>",
    "output": {
        "mediaType": "video/mp4"
    }
}'
```

### Generate a video from an audio file input

```bash
curl 'https://audio-video-api.adobe.io/v1/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_ID>' \
  --data-raw '{
    "audio": {
        "source": {
            "url": "<pre_signed_URL_of_input_audio>"
        },
        "mediaType": "audio/wav",
        "localeCode": "en-US"
    },
    "avatarId": "<avatar_ID>",
    "output": {
        "mediaType": "video/mp4"
    }
}'  
```

### Use a custom background

Change the background of the Avatar video by providing a pre-signed URL of a video or image, or opt for a transparent or color background to use as a replacement.

<InlineAlert slots="header,text" />

NOTE

[Refer to the Technical Usage notes][4] to understand the supported formats, aspect ratio, etc. for video and image backgrounds.

#### Generate a video from text input with a video background

```bash
curl 'https://audio-video-api.adobe.io/v1/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_ID>' \
  --data-raw '{
    "script": {
        "text": "<script_text>",
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice_ID>",
    "avatarId": "<avatar_ID>",
    "output": {
        "mediaType": "video/mp4",
        "background": {
            "type": "video",
            "source": {
                "url": "<pre_signed_URL_of_background_video>"
            }
        }
    }
}'  
```

#### Generate a video from text input with an image background

```bash
curl 'https://audio-video-api.adobe.io/v1/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_ID>' \
  --data-raw '{
    "script": {
        "text": "<script_text>",
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice_ID>",
    "avatarId": "<avatar_ID>",
    "output": {
        "mediaType": "video/mp4",
        "background": {
            "type": "image",
            "source": {
                "url": "<pre_signed_URL_of_background_image>"
            }
        }
    }
}'  
```

## Check the result

Use the GET Result API to see the status of a job. In the command below, update:

- `statusUrl` with the URL returned in the response of the Avatar API call.
- `Authorization` with the bearer token.
- `x-api-key` with the Client ID.

```bash
curl --location '<status_URL>' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_ID>' 
```

**Sample Avatar API response**

```bash
{
    "jobId": "986fc222-1118-4242-b326-eb9873e3982f",
    "status": "succeeded",
    "output": {
        "url": "<pre_signed_URL_of_the_result>"
    }
}
```

Use the `url` to download the generated video.

### Verify with Content Credentials

Adobe participates in the content authentication initiative for AI-generated assets, addressing concerns around content legitimacy. Register your content by uploading the file at [ContentCredential.org][5].

<!-- Links -->
[1]: ../../getting_started/
[2]: ../../api
[3]: ../../api
[4]: /getting_started/usage/
[5]: https://contentcredentials.org/verify
[6]: ../../getting_started/avatar_catalog/