---
layout: api-overview.njk

title: Attach a message API
description: Use this service to attach text messages to an existing application 

eleventyNavigation:
  key: Attach a message API v1.0
  parent: Attach a message API

notlive: false

versions:
  - value: "1.0"
    text: "v1.0"
    selected: true

relatedAPIs:
  - text: Submit an application to change the Land Register API
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Send a document API
    href: /apis/send-a-document
  - text: Submit an application API
    href: /apis/submit-an-application
  - text: Application information API
    href: /apis/application-information
  - text: Attach a document API
    href: /apis/attach-a-document
  - text: Download a document API
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold
---

<section>

## Overview {.govuk-heading-m}

The Attach a message API allows users to attach text messages to an existing application. The [Notifications API](/apis/notifications) can then be used to understand if the message has been successfully attached to the application. 

If users want to attach a document to an application, they will need to use the [Attach a document API](/apis/attach-a-document). 

</section>

<section>

## View the technical guide {.govuk-heading-m}

[Technical guide](./technical-guide)

</section>

<section>

## View the API specification {.govuk-heading-m}

[Web version (opens in new tab)](https://landregistry.github.io/bgtechdoc/documents/submit-an-application-to-change-the-register/v1.0/openapi.html#tag/Attach-a-message){rel="noreferrer noopener" target="_blank"}

</section>
  
<section>

## How the API works {.govuk-heading-m}

<a target="_blank" href="/assets/images/attach-message-with-notifications.png">
  <img src="/assets/images/attach-message-with-notifications.png" alt="A diagram showing the interaction of the Attach a message API."></a>

This diagram demonstrates how the Attach a message API works to support users.  

When a user submits a message, the HMLR system will initially respond with an empty ‘202 Accepted’ response. Users will then receive a notification stating whether the attached message has been successful or not. 

</section>

<section>

## How to test this API {.govuk-heading-m}

HMLR has created a test environment for the Attach a message API. We’ve also provided example code to demonstrate what you should expect when developing your own services. 

[View Attach a message API test stubs](./test-stubs) 

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

{{ govukInsetText({
  text: "Please note there are also plans to release a sandbox test environment for developers in the future. The exact release date is to be confirmed. "
}) }}

For general testing guidance, visit our [guide to testing](/a-guide-to-testing).

</section>
