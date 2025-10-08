---
layout: api-overview.njk

title: Notifications API
description: Use this service to get updates about multiple applications submitted by the same business unit.

eleventyNavigation:
  key: Notifications API v1.0
  parent: Notifications API

notlive: false

versions:
  - value: "1.0"
    text: "v1.0 (latest)"
    selected: true
  - value: "0.3"
    text: "v0.3"

relatedAPIs:
  - text: Submit an application to change the Land Register API
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Send a document API
    href: /apis/send-a-document
  - text: Submit an application API
    href: /apis/submit-an-application
  - text: Application information API
    href: /apis/application-information
  - text: Download a document API
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold
---

<section>

## Overview {.govuk-heading-m}

The Notifications API provides a way of fetching updates about multiple applications submitted by the same business unit. Currently, this service only supports a pull interaction model, where notifications must be requested periodically. However, more information about a push interaction model will be shared in future.</p>

This API has two endpoints:

- `GET /v1/notifications` get all notifications that match the provided filters
- `POST /v1/notifications/acknowledge` - notify HMLR that notifications have been received

This API can be used to get more information after receiving a notification indicating the application has changed. For information about which notifications will be available, visit the notifications section of the [Submit an application](/apis/submit-an-application) API page.

</section>

<section>

## View the technical guide {.govuk-heading-m}

<ul class="govuk-list">
  <li>
    <a class="govuk-link" href="/apis/notifications/1.0/technical-guide">Technical guide</a>
  </li>
</ul>

</section>

<section>

## View the API specification {.govuk-heading-m}

<ul class="govuk-list">
  <li>
    <a class="govuk-link" href="https://landregistry.github.io/bgtechdoc/documents/submit-an-application-to-change-the-register/v1.0/openapi.html#tag/Notifications-API" rel="noreferrer noopener" target="_blank">Web version (opens in new tab)</a>
  </li>
</ul>

</section>
  
<section>

## How the API works {.govuk-heading-m}

<a target="_blank" href="/assets/images/NotificationInteraction.png">
  <img src="/assets/images/NotificationInteraction.png" alt="A diagram showing the interaction of the Notification API.">
</a>

This diagram demonstrates how the Notifications API works to support users.

A user may send requests to receive notifications about multiple applications at the same time using the Get notifications API. The HMLR system will respond by providing information relevant to the request.

A user can also notify HMLR that it has received notifications using the Acknowledge notifications API. The system will acknolwedge this notification.

</section>

<section>

## How to test this API {.govuk-heading-m}

HMLR has created a test environment for the Notifications API. We’ve also provided example code to demonstrate what you should expect when developing your own services.

<ul class="govuk-list">
  <li>
    <a class="govuk-link" href="/apis/notifications/1.0/test-stubs">View notifications API test stubs</a>
  </li>
</ul>

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

{{ govukInsetText({
  text: "Please note there are also plans to release a sandbox test environment for developers in the future. The exact release date is to be confirmed."
}) }}

For general testing guidance, visit our [guide to testing](/a-guide-to-testing).

</section>
