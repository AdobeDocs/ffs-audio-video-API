/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/audio-video-firefly-services/',
  siteMetadata: {
    pages: [
      {
        title: 'All Firefly Services',
        path: 'https://developer.adobe.com/firefly-services/docs/guides/?aio_internal'
      },
      {
        title: 'About Audio/Video API',
        path: '/'
      },
      {
        title: 'Getting Started',
        path: '/getting_started/'
      },
      {
        title: 'Guides',
        path: '/guides/'
      },
      {
        title: 'API Reference',
        path: '/api/'
      },
    ],
    subPages: [
      {
        title: 'Getting Started',
        path: '/getting_started/',
        header: true,
        pages: [
          {
            title: 'Authentication',
            path: '/getting_started/'
          },
          {
            title: 'Storage Solutions',
            path: '/getting_started/storage_solutions'
          },
          {
            title: 'Technical Usage Notes',
            path: '/getting_started/usage'
          },
        ]
      },
      {
        title: 'Learn More',
        path: '/getting_started/semantic-search/',
        header: true,
        pages: [
          {
            title: 'About Semantic Subject Lock',
            path: '/getting_started/semantic-search/'
          },
          {
            title: 'Avatar Catalog',
            path: '/getting_started/avatar_catalog'
          }
        ]
      },
      {
        title: 'Guides',
        path: '/guides/',
        header: true,
        pages: [
          {
            title: 'Using the TTS API',
            path: '/guides/index.md'
          },
          {
            title: 'Using the Reframe API',
            path: '/guides/reframe/index.md'
          },
          {
            title: 'How to Transcribe and Dub Audio/Video Content',
            path: '/guides/TLS/index.md'
          },
          {
            title: 'Using the Avatar API',
            path: '/guides/avatar/index.md'
          },
          {
            title: 'GET Result API Quickstart',
            path: '/guides/TLS/get_result_quickstart.md'
          }
        ]
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
