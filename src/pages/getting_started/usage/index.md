---
title: Audio/Video API Usage Notes
description: This document has details about what's currently supported, limitations, and workarounds for the Audio/Video APIs.
contributors:
  - https://github.com/BaskarMitrah
  - https://github.com/aeabreu-hub
---

# Audio/Video API Usage Notes

This document has details about what's currently supported, limitations, and workarounds for the Audio/Video APIs to help developers optimize their API implementations and understand service boundaries.

## Text-to-Speech API usage

Here's the technical usage information for the Text-to-Speech API.

### Limitations and workarounds

- **TTS voice modulation**: The output may have signification modulation in pitch or voice. Regenerating the audio can often resolve this issue.
- **Limited voice controls**: Currently voice controls like emphasis, speed or pitch modulation aren't supported.
- **Mispronunciation**: The audio output might mispronounce certain uncommon words or proper nouns. This can be addressed by using phonetic spellings.

### Text input specifications

**Transcript length**: Up to ```20000``` characters.

**Input format**: Plain text, or ```.txt``` file via a pre-signed URL.

### API render time

Render times for Text-to-speech are 2X the output audio length.

### Request limits per API

To be sure everyone enjoys peak performance with these APIs, Adobe sets limits on the volume, frequency, and concurrency of API calls. Adobe monitors your API usage and will contact you proactively to resolve any risks to API performance.

<InlineAlert variant="warning" slots="text" />

Be aware that these usage limits apply to your entire organization.

These are the current rate limits for API requests:

**Get Voices API**: 50 requests per minute.

**Generate Speech API**: 10 requests per minute.

**Get Result API**: 100 requests per minute.

You may encounter a `HTTP 429 "Too Many Requests"` error if usage exceeds either the per minute or per day limits. We recommend using the `retry-after` header to determine the number of seconds you should wait before trying again.

## Reframe API usage

### Supported media properties

| Attribute | Input | Output |
|-----------|--------|--------|
| Formats | Video: .mp4, .mov; Image: .png, .gif | .mp4 |
| Upload/Download type | Pre-signed URLs to individual videos, overlays | Pre-signed URLs to individual videos |
| Video Duration (Max) | 30 minutes | Same as source |
| Video Size (Max) | 10 GB | Same as source |
| Video Codecs | H.265/HEVC (only 4:2:0), H.264/AVC | Same as source |
| Color Properties | BT 601, BT 709, BT 2020, BT 2020 HLG, BT 2020 PQ | Same as source |
| Frame Rate | 24, 25, 29.97, 30, 50, 59.94, 60 | Same as source |
| 4K Support | Yes | Yes |

### Performance characteristics

| Configuration                                     | Estimated Render Time                 |
|-------------------------------                    |---------------------------------------|
| 1 Aspect Ratio, no scene edit detection applied   | ~0.5x video length  |
| 3 Aspect Ratios, no scene edit detection applied  | ~0.6x video length |
| 1 Aspect Ratio, with scene edit detection         | ~1.4x video length        |

### Request limits

To ensure equitable peak performance, Adobe limits the volume, frequency, and concurrency of API calls. We monitor usage and proactively contact you to resolve any risks to performance.

The rate of API requests are limited to:

- Reframe Processing Endpoint (/reframe): Max of 2 requests per minute.
- Status Check Endpoint (/status): Max of 100 requests per minute.

You may encounter a HTTP 429 "Too Many Requests" error if your usage exceeds either the per minute, or per day limits.
We recommend using the 'retry-after' header to determine the number of seconds you should wait before trying again.

