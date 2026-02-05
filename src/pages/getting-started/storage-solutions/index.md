---
title: Storage Solutions for Firefly's Audio/Video APIs
description: This page explains the storage solutions that are acceptable for use with Firefly's audio and video API services.
keywords:
  - storage
  - solutions
  - Amazon S3
  - Frame.io
  - Google Drive
---
# Storage Solutions

Learn about the storage solutions you'll need when you're using Firefly's Audio/Video APIs.

Some form of user-owned storage (like Amazon S3 buckets) is necessary with these audio and video APIs. Media files (audio or video) and edited transcripts kept in your storage are targeted with pre-signed URLs and used as input for the API.

## Allowed storage services

These are the allowed domains for media storage accepted by Firefly's Audio/Video APIs:

- amazonaws.com
- windows.net
- dropboxusercontent.com
- frame.io
- cloudfront.net
- drive.google.com
- adobe.io

Learn how to set up your files in these storage solutions below.

## Using Amazon S3 buckets

  1. Log in to your AWS account.
  2. Go to s3.
  3. Create a new bucket, with any name (for example, *AdobeApiTesting*).
  4. Drag and drop the media file (audio/video) or edited transcript file that you want to provide to the API in the bucket you've created.
  5. Once the upload is complete, select the file and go to **Actions**.
  6. Select the **Share with pre-signed URL** option and enter a duration for the pre-signed URL to be valid.
  7. Copy the generated pre-signed URL to use in the API (it may also copy automatically when you create it).

## Using an Frame.io account

  1. Log in to your Frame.io account.
  2. Create a project (for example, *AdobeApiTesting*).
  3. Open the **Inspect** view of your browser (using Chrome, press f12 and go to the **Network** tab).
  4. Drag and drop the media file (audio/video) or edited transcript file that you want to provide to the API in the bucket.
  5. Select the file, and click **Download**.
  6. In the **Network** tab, you'll see a GET call using a pre-signed URL to use to download the file.
  7. Copy that URL to use in the API.

## Using Frame.io Developer APIs

Refer to [Frame.io API guide](https://developer.frame.io/api/reference/) to create assets and get their pre-signed URL.

## Using Google's direct link service

You can use [Google's direct link service](https://sites.google.com/site/gdocs2direct/?authuser=1&pli=1) to generate downloadable public links for your files by following the instructions on the page.

Before generating the links, be sure your file's visibility in your Google Drive is set to **Anyone with the link**.
