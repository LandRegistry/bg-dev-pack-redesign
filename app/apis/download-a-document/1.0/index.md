---
layout: api-overview.njk

title: Download a document
description: Use this service to download documents.

eleventyNavigation:
    key: Download a Document v1.0
    parent: Download a Document

notlive: true

versions:
  - value: "1.0"
    text: "v1.0 (upcoming)"
    selected: true

relatedAPIs:
  - text: Submit an application to change the Land Register
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Send a document
    href: /apis/send-a-document
  - text: Submit an application
    href: /apis/submit-an-application
  - text: Application information
    href: /apis/application-information
  - text: Notifications
    href: /apis/notifications
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold
---

## Overview {.govuk-heading-m}

The Download a document API provides a way to download documents that have been created by HM Land Registry for your consumption.

This API has one endpoints:

- `GET /v0/documents/{download_id}` - get the binary content of the document.

You may obtain a `download_id` from any of the following:

- Completion notifications
- Cancellation notifications
- Requisition correspondence notifications
- The `/correspondence` array in an [application information](/apis/application-information) response

</section>
<section>

## View the Technical Guide {.govuk-heading-m}

[Technical guide](/apis/download-a-document/1.0/technical-guide)

</section>

<!-- <section>
## View the API specification {.govuk-heading-m}

[Web version (opens in a new tab)](https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Notifications-API){rel="noreferrer noopener" target="_blank"}

</section> -->
<section>

## How the API works {.govuk-heading-m}

<!-- <a target="_blank" href="/assets/images/NotificationInteraction.png">
  <img src="/assets/images/NotificationInteraction.png" alt="A diagram showing the interaction of the Notification API.">
</a> -->

<!-- < INSERT IMAGE HERE > -->
<!-- This diagram demonstrates how the download a document API works. -->

A user may obtain a `download_id` from either a notification or application information. 

The user may then use that `download_id` in their request to `GET /v0/documents/{download_id}` to obtain the document binary.
 
</section>
<section>

## How to test this API {.govuk-heading-m}

HMLR has created a test environment for the Download a document API. We’ve also provided example code to demonstrate what you should expect when developing your own services.

[View Download a document test stubs](/apis/download-a-document/1.0/test-stubs).

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

{{ govukInsetText({
  text: "Please note there are also plans to release a sandbox test environment for developers in the future. The exact release date is to be confirmed."
}) }}

For general testing guidance, visit our [guide to testing](/a-guide-to-testing)

</section>

