---
title: Get Result API Quickstart
description: This page is a quickstart guide for the TLS Get Result API.
---
# Get Result API

Quickstart commands to see the result of an asynchronous dub job.

## Before you start

- You'll need a valid access token and client ID. See the [Authentication Guide](../getting_started/index.md) for details.
- Upload your media files (audio or video) to [your storage location and generate a pre-signed URL](../getting_started/storage_solutions/index.md).

## Quickstart commands

In the command, be sure to:

-  Update `jobId` with the ID returned in the response for the job.
-  Update the `Authorization` with the bearer access token.
-  Update `x-api-key` with the client ID.

### Get status

```bash
curl --location 'https://audio-video-api.adobe.io/v1/status/{jobID}' \
--header 'Authorization: Bearer {AccessToken}' \
--header 'x-api-key: {ClientID}' \
--header 'Content-Type: application/json'
```

The status of the job can be:

- `"pending"`
- `"running"`
- `"failed"`
- `"succeeded"`
- `"partially_succeeded"`

If the status is `succeeded`, you'll see the result for the operation in a response like the example below:

**Transcribe job response example**

```bash
{
    "jobId": "500de496-4961-4641-a273-1c760ee7e0b4",
    "status": "succeeded",
    "outputs": [
        {
            "destination": {
                "url": "https://auto-dubbing-stage-ue1.s3-accelerate.amazonaws.com/500de496-4961-4641-a273-1c760ee7e0b4/translation_de_DE.txt?response-content-disposition=attachment&AWSAccessKeyId==********************&Signature=Jfx%2F%2FL1GJqHjrWHVph0FcxoqpJs%3D&Expires=1725446894"
            },
            "localeCode": "de-DE"
        },
        {
            "destination": {
                "url": "https://auto-dubbing-stage-ue1.s3-accelerate.amazonaws.com/500de496-4961-4641-a273-1c760ee7e0b4/translation_es_sp.txt?response-content-disposition=attachment&AWSAccessKeyId==********************&Signature=FA5OF%2BXKZhnvmUcKHGAYkbhGpDs%3D&Expires=1725446894"
            },
            "localeCode": "es-ES"
        }
    ]
}
```

**Dub job response example**

```bash
{
    "jobId": "d639c2a7-4b18-44cc-9f9b-d4d90dc48595",
    "status": "succeeded",
    "outputs": [
        {
            "localeCode": "de-DE",
            "audio": {
                "mediaType": "audio/wav",
                "destination": {
                    "url": "https://auto-dubbing-stage-ue1.s3-accelerate.amazonaws.com/d639c2a7-4b18-44cc-9f9b-d4d90dc48595/signed_output_de_DE_0_soundliftmix.wav?response-content-disposition=attachment&AWSAccessKeyId=********************&Signature=okbACJJHLxFLbysdPhjbho9LFT4%3D&Expires=1725446974"
                }
            },
            "video": {
                "mediaType": "video/mp4",
                "destination": {
                    "url": "https://auto-dubbing-stage-ue1.s3-accelerate.amazonaws.com/d639c2a7-4b18-44cc-9f9b-d4d90dc48595/signed_output_de_DE_0_soundliftmix.mp4?response-content-disposition=attachment&AWSAccessKeyId=********************&Signature=7UK1%2FY%2FVTAWRUupKG%2FqmXJE%2F4OQ%3D&Expires=1725446974"
                }
            },
            "transcript": {
                "destination": {
                    "url": "https://auto-dubbing-stage-ue1.s3-accelerate.amazonaws.com/d639c2a7-4b18-44cc-9f9b-d4d90dc48595/translation_de_DE.txt?response-content-disposition=attachment&AWSAccessKeyId=********************&Signature=FN%2Fg%2FM%2BrwLWi8Ve4JluaLX6KLkI%3D&Expires=1725446974"
                }
            }
        },
        {
            "localeCode": "en-US",
            "audio": {
                "mediaType": "audio/wav",
                "destination": {
                    "url": "https://auto-dubbing-stage-ue1.s3-accelerate.amazonaws.com/d639c2a7-4b18-44cc-9f9b-d4d90dc48595/signed_output_en_US_0_soundliftmix.wav?response-content-disposition=attachment&AWSAccessKeyId=********************&Signature=TaN5jAs%2BPkxcGXzSprY762OrUZ4%3D&Expires=1725446974"
                }
            },
            "video": {
                "mediaType": "video/mp4",
                "destination": {
                    "url": "https://auto-dubbing-stage-ue1.s3-accelerate.amazonaws.com/d639c2a7-4b18-44cc-9f9b-d4d90dc48595/signed_output_en_US_0_soundliftmix.mp4?response-content-disposition=attachment&AWSAccessKeyId=********************&Signature=1NTrzLspbHdc3wai4hFomZnwVQQ%3D&Expires=1725446974"
                }
            },
            "transcript": {
                "destination": {
                    "url": "https://auto-dubbing-stage-ue1.s3-accelerate.amazonaws.com/d639c2a7-4b18-44cc-9f9b-d4d90dc48595/translation_en_US.txt?response-content-disposition=attachment&AWSAccessKeyId=********************&Signature=KH46%2BTBaispa4FfILVO7bIojI7s%3D&Expires=1725446974"
                }
            }
        }
    ]
}
```

## Verify the content credentials

To address concerns around content legitimacy, use these content authentication steps for AI-generated assets.

1. Download the final output video/audio from the pre-signed URL in the successful response.
2. Upload the file to the [Content Credentials website](https://contentcredentials.org/verify) to check the credentials.
