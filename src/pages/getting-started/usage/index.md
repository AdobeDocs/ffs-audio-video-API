---
title: FireflyAudio/Video API Usage Notes
description: This document has details about what's currently supported, limitations, and workarounds for the Firefly Audio/Video APIs.
hideBreadcrumbNav: true
keywords:
  - audio
  - video
  - API
  - usage
  - limitations
  - text-to-speech
  - reframe
  - translate
  - lip sync
  - avatar
contributors:
  - https://github.com/BaskarMitrah
  - https://github.com/aeabreu-hub
---

# Audio/Video API Usage Notes

This document has details about what's currently supported, limitations, and workarounds for the Audio/Video APIs to help developers optimize their API implementations and understand service boundaries.

## Text to Speech API usage

Here's the technical usage information for the Text to Speech API.

### Limitations and workarounds

- **TTS voice modulation**: The output may have signification modulation in pitch or voice. Regenerating the audio can often resolve this issue.
- **Limited voice controls**: Currently voice controls like emphasis, speed or pitch modulation aren't supported.
- **Mispronunciation**: The audio output might mispronounce certain uncommon words or proper nouns. This can be addressed by using phonetic spellings.

### Text input specifications

**Transcript length**: Up to ```20000``` characters.

**Input format**: Plain text, or ```.txt``` file via a pre-signed URL.

### API render time

Render times for Text to Speech are 2X the output audio length.

### Request limits

To be sure everyone enjoys peak performance with these APIs, Adobe sets limits on the volume, frequency, and concurrency of API calls. Adobe monitors your API usage and will contact you proactively to resolve any risks to API performance.

<InlineAlert variant="warning" slots="text" />

Be aware that these usage limits apply to your entire organization.

These are the current rate limits for API requests:

**Get Voices API (/voices)**: 50 requests per minute.

**Generate Speech API (/generate-speech)**: 10 requests per minute.

You may encounter a `HTTP 429 "Too Many Requests"` error if usage exceeds either the per minute or per day limits. We recommend using the `retry-after` header to determine the number of seconds to wait before trying again.

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

Be aware that **these characteristics apply when no focal point objects are specified** in the payload of Reframe v2.

#### Estimated render times

| Aspect Ratios | Input Video Length | Scene Edit Detection | Estimated Render Time   |
|---------------|------------|-----------------------|--------------------------|
| 1             | 60s        | No                    | ~0.5× video length      |
| 5             | 60s        | No                    | ~0.6× video length      |
| 1             | 60s        | Yes                   | ~1.3× video length      |
| 5             | 60s        | Yes                   | ~1.5× video length      |

### Reframing tips

When you're evaluating the suitability of your video for reframing, consider the following tips. For the best results, content should be in the **FLY ZONE**.

| 💚 FLY ZONE | ⚠️ NO FLY ZONE |
|------------|----------------|
| **With Source Video** | **With Source Video** |
| - Clean footage (no graphics)\<br/\>- Multi-scene clips with trackable subjects that remain in the scene\<br/\>- Single-scene clips | - Graphics are embedded in the video\<br/\>- Video has multiple faces that need to be tracked\<br/\>- Content has letterboxing or pillarboxing applied |
| [**With Focal Points Keywords**](../../getting-started/semantic-search/index.md) | [**With Focal Points Keywords**](../../getting-started/semantic-search/index.md) |
| - The number of keywords/phrases follow the guidelines \<br/\>- Brand names mentioned are on visible packaging \<br/\>- Multiple subjects are present. The system selects the largest frame area with the multiple keyword subjects in it | - Small objects in the scene or clip (like a football or baseball in sport footage) \<br/\>- Cannot set manual priority or weights for keywords/phrases\<br/\>- Negative keywords are used (like "exclude label", "avoid hands")\<br/\>- Positional words are used (like "leftmost", "center")\<br/\>- Celebrities or public figures are in keywords\<br/\>- Specialized terminology or jargon is used\<br/\>- Semantic nearness occurs. Common synonyms can overlap (e.g., _bottle ≈ flask_)\<br/\>- Long prose in the keyword. This is not a prompt |
| **Editability** | **Editability** |
| - Last mile editability is done in Premiere Pro 25.6.0+\<br/\>- Scene Edit Detection is on/off\<br/\>- Letterbox is off | - Opening the `.otio` file in editors/versions other than Premiere Pro 25.6.0+ |

### Request limits

To ensure equitable peak performance, Adobe limits the volume, frequency, and concurrency of API calls. We monitor usage to proactively resolve any risks to performance.

These are the current rate limits for API requests:

**Reframe Processing API (/reframe)**: Max of 2 requests per minute.

You'll encounter a `HTTP 429 - Too Many Requests` error if usage exceeds the limits per minute or per day.
Use the `retry-after` header to determine the number of seconds you should wait before trying again.

## Translate and Lip Sync API usage

### Known limitations and workarounds

- **Speaker Mismatch:** Speaker mismatches or additional/missing speakers may occasionally occur in output transcripts. This has been observed in approximately 9% of cases. Content where speakers overlap may not produce the best results and should be avoided.
- **Voice Modulation:** Voices in the output may vary in pitch or show significant modulation. Regenerating the video/audio can often resolve this issue.
- **Re-dubbing Dubbed Content:** Avoid using deepfake content for re-dubbing purposes.
- **Singing Isn't Supported:** A music video or a song won't be dubbed correctly.

### For editing transcripts

Only sentence editing is currently supported. Don't modify the timestamps.

Speakers can be updated, however don't remove speakers before dubbing. Also, dub using the edited transcripts in different target languages.

### Language support

Dubbing is supported for the following languages:

| Language description | Code |
|---------------------|------|
| English (Indian) | `en-IN` |
| English (American) | `en-US` |
| English (British) | `en-GB` |
| Spanish (Spanish) | `es-ES` |
| Spanish (Argentina) | `es-AR` |
| Spanish (Latin America) | `es-419` |
| French (France) | `fr-FR` |
| French (Canada) | `fr-CA` |
| Danish (Denmark) | `da-DK` |
| Norwegian (Norway) | `nb-NO` |
| German | `de-DE` |
| Italian | `it-IT` |
| Portuguese (Brazil) | `pt-BR` |
| Portuguese (Portugal) | `pt-PT` |
| Hindi (India) | `hi-IN` |
| Japanese (Japan) | `ja-JP` |
| Korean (South Korea) | `ko-KR` |

### Input video support

Technical details for videos used as input:

- **Duration (max):** 30 mins
- **FPS:** 24 fps, 25 fps, 29.97, 30, 50, 59.94, 60
- **Resolution (max):** Full HD `1920*1080px` or `1080*1920px`
- **CODEC**: `H.264, HEVC`
- **Formats/container:** .mp4, .mov
- **Input medium:** Pre-signed URL
- **Render time:** 3x the video length, 10x the video length (for 30 fps and 1080 resolution) if `lipSync` is enabled
- **Speaker speech (min):** 5 secs
- **Dubbing and Lip Sync:** Multi-speaker support

### Input audio support

Technical details for audio used as input:

- **Duration (max):** 30 mins
- **CODEC:** `MPEG, PCM`
- **Formats/container:** .mp3, .wav, .aac
- **Input medium:** Pre-signed URL
- **Render time:** 3x the audio length
- **Dubbing:** Multi-speaker support

### Request limits

To ensure equitable peak performance, Adobe places limits on the volume, frequency, and concurrency of API calls, and monitors API usage to proactively resolve any risks to performance.

<InlineAlert variant="warning" slots="text1" />

These usage limits apply to your entire organization. \<br/\>

The current limitations are:

**Transcribe endpoint (/transcribe):** 5 requests per minute.

**Dubbing/Lip Sync endpoint (/dub):**  5 requests per minute and 150 requests per day.

## Avatar API usage

### Known limitations and workarounds

- **Gesture mismatch**: Output videos may occasionally feature gesture mismatches.

### Language support

Video generation is supported for the following languages:

| Language description | Code |
|---------------------|------|
| English (Indian) | `en-IN` |
| English (American) | `en-US` |
| English (British) | `en-GB` |
| Spanish (Spanish) | `es-ES` |
| Spanish (Argentina) | `es-AR` |
| Spanish (Latin America) | `es-419` |
| French (France) | `fr-FR` |
| French (Canada) | `fr-CA` |
| Danish (Denmark) | `da-DK` |
| Norwegian (Norway) | `nb-NO` |
| German | `de-DE` |
| Italian | `it-IT` |
| Portuguese (Brazil) | `pt-BR` |
| Portuguese (Portugal) | `pt-PT` |
| Hindi (India) | `hi-IN` |
| Japanese (Japan) | `ja-JP` |
| Korean (South Korea) | `ko-KR` |

### Avatar input audio specifications

**Duration (max)**: 30 mins.

**CODEC**: MPEG, PCM.

**Formats/container**: audio/wav, audio/x-wav, audio/aac.

**Input Medium**: Pre-signed URL.

### Avatar background video specifications

**Duration (max)**: 30 mins.

**FPS**: 24 fps, 25 fps, 29.97, 30, 50, 59.94, 60.

**Resolution (max)**: Full HD.

**Aspect Ratio**: 1,920*1,080px.

**CODEC**: H.264.

**Formats/container**: video/mp4, video/mov.

**Input Medium**: Pre-signed URL.

### Avatar background image specifications

**Formats**: JPEG,PNG.

**Input Medium**: Pre-signed URL.

**Aspect Ratio**: 1,920*1,080px.

### API render time

10X the output video length for Avatar API.

### Request limits per API

To ensure equitable peak performance, Adobe places limits on the volume, frequency, and concurrency of API calls, and monitors API usage to proactively resolve any risks to performance.

<InlineAlert variant="warning" slots="text1" />

These usage limits apply to your entire organization. \<br/\>

The current limitations are:

**Get Actors API**: 50 requests per minute.

**Avatar API**: 5 requests per minute.

## GET status API

### Request limits

To ensure equitable peak performance, Adobe places limits on the volume, frequency, and concurrency of API calls, and monitors API usage to proactively resolve any risks to performance.

<InlineAlert variant="warning" slots="text1" />

These usage limits apply to your entire organization. \<br/\>

The current limitations are:

**Get Result endpoint (/status/\{jobId}):** 100 requests per minute.

## Cancel and List Render Jobs API usage

The Cancel and List Render Jobs endpoints apply **only to render jobs submitted via `POST /v1/templates/render`**.

### Request limits

To ensure equitable peak performance, Adobe places limits on the volume, frequency, and concurrency of API calls, and monitors API usage to proactively resolve any risks to performance.

<InlineAlert variant="warning" slots="text1" />

These usage limits apply to your entire organization. \<br/\>

The current limitations are:

**Cancel Render Job endpoint (`PUT /v1/cancel/{jobId}`):** 2 requests per minute.

**List Render Jobs endpoint (`GET /v1/templates/render-jobs`):** 2 requests per minute.

You'll encounter a `HTTP 429 - Too Many Requests` error if usage exceeds the limits. Use the `retry-after` header to determine how long to wait before retrying.

## Dynamic Graphics Render API usage

### Error Handling

Jobs that complete with errors return HTTP 200 with a `failed` or `partially_succeeded` status. [Refer to the API reference documentation](../../api/index.md) for the schema details.

### Best practices

- Always call the **Describe Template API** before rendering to obtain valid `variableId` values.
- Reuse presets from the **Get Presets API** for social‑optimized outputs.
- Use low‑quality presets for previews and approvals.
- Batch variations in a single render request to reduce latency.

### Authoring guidelines for higher render success

When preparing *.mogrt* files for API automation, consider these guidelines:

1. Avoid these unsupported features:
    - Cinema 4D and Ray-traced 3D renderers are *not* supported.
    - Adobe After Effects (AE) effects (like Camera-Shake Deblur, Synthetic Aperture Color Finesse, Maxon CINEWARE, Puppet, and Warp Stabilizer) are *not* supported.
    - Any AE composition editing capabilities such as variable length footage replacement or shifting layers dynamically based on footage length are *not* supported.
    - Dynamic Link footage is *not* supported (for example, Premiere Pro sequences or Character Animator scenes embedded in the comp).
    - Avoid FLV footage.
    - Avoid all third party plugins.
2. Fonts
    - Use fonts that can be legally distributed and uploaded.
    - If a font is required, ensure that it's listed in the Describe response and provided in the Render request.
3. Audio handling
    - The Render API supports **global audio replacement** when the template exposes an audio control: set `audioPreference` to `"replace"` or `"mix"` in the request. See [Audio control](../../guides/dgr/dgr-render.md#audio-control) in [Using the Render API](../../guides/dgr/dgr-render.md).
    - The Essential Graphics panel in After Effects does not configure audio replacement; use the Describe API to discover controls and supply assets in the Render request.
    - For duration behavior, supported file types, and preprocessing (for example in Adobe Audition), see [Best practices for Dynamic Graphics Render and MOGRTs](../../guides/dgr/dgr-best-practices.md).
