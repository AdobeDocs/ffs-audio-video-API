---
title: Authentication for Firefly's Audio/Video APIs
description: This is the content to get started with TTS APIs, including authentication and set up.
contributors:
  - https://github.com/BaskarMitrah
  - https://github.com/aeabreu-hub
---
# Authentication for Firefly's Audio/Video APIs

Server-to-server authentication credentials let your application's server generate access tokens and make API calls on behalf of your application.

For your application to generate an access token, an end user does not need to sign in or provide consent to your application. Instead, your application can use its credentials (client ID and secrets) to authenticate itself and generate access tokens. Your application can then use these to call Adobe APIs and services on its behalf.

This is sometimes referred to as "two-legged OAuth".

<InlineAlert slots="text" variant="info" />

The Dynamic Graphics Render API requires a separate set of credentials. [See the Dynamic Graphics Render authentication page](/getting-started/dgr-auth.md) for more information on how to authenticate that specific API.

## Prerequisites

This tutorial assumes you have worked with your Adobe Representative and have the following:

- An [Adobe Developer Console](https://developer.adobe.com/) account.
- A [project](https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty/) with Audio/Video API [OAuth Server-to-Server credentials set up](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/).
- Access to your **Client ID** and **Client Secret** from the [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview). Securely store these credentials and never expose them in client-side or public code.

## Access tokens

Each access token is valid for 24 hours. To adhere to OAuth best practices, you should generate a new token every 23 hours.

Generate access tokens programmatically by sending a POST request:

```bash
curl -X POST 'https://ims-na1.adobelogin.com/ims/token/v3' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=client_credentials&client_id={client_id}&client_secret={client_secret}&scope=openid,AdobeID,firefly_api,ff_apis'
```

The required parameters are:

- `client_id`: The Client ID.
- `client_secret`: The Client secret.
- `scope`: The scopes are `openid`, `AdobeID`, `firefly_api`, `ff_apis`.

<InlineAlert variant="warning" slots="heading, text" />

Tokens for TLS need additional scopes

Translate and Lip Sync (TLS) tokens can be generated but MAY NOT BE VALID without two cards included on your developer console project. To authenticate the TLS API, add another API from the Firefly services family to your project on the Adobe developer console.

Automate your token generation by calling the IMS endpoint above using standard OAuth2 libraries. Using industry-standard libraries is the quickest and most secure way of integrating with OAuth.

Be diligent when choosing the OAuth 2.0 library that works best for your application. Your teams' projects likely leverage OAuth libraries already to connect with other APIs. It's recommended to use these libraries to automatically generate tokens when they expire.

The token endpoint also returns an expiry date, and the token itself (when decoded) contains the expiry time.
