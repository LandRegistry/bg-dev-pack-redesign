---
layout: api-overview.njk

title: Attach a document API
description: Use this service to attach a document to a submitted order.

eleventyNavigation:
  key: Attach a document API v1.0
  parent: Attach a document API

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
  - text: Attach a message API
    href: /apis/attach-a-message
  - text: Download a document API
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold
---

<section>

## Overview {.govuk-heading-m}

The Attach a Document API allows users to attach additional documents to an existing application. The [Notifications API](/apis/notifications) can then be used to understand if the document has been successfully attached to the application. 

If users want to attach a message to an application, they will need to use the Attach a message API. 


</section>

<section>

## View the technical guide {.govuk-heading-m}

[Technical guide](./technical-guide)

</section>

<section>

## View the API specification {.govuk-heading-m}

[Web version (opens in new tab)](https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Application-information-API){rel="noreferrer noopener" target="_blank"}

</section>
  
<section>

## How the API works {.govuk-heading-m}

<a target="_blank" href="/assets/images/attach-document-with-notifications.png">
  <img src="/assets/images/attach-document-with-notifications.png" alt="A diagram showing the interaction of the Attach a document API."></a>

This diagram demonstrates how the Attach a document API works to support users.  

When a user submits a document, the HMLR system will initially respond with an empty ‘202 Accepted’ response.  Users will then receive a notification stating whether the attachment has been successful or not. 


</section>

<section>

## How to test this API {.govuk-heading-m}

HMLR has created a test environment for the Attach a Document API. We’ve also provided example code to demonstrate what you should expect when developing your own services.

<ul class="govuk-list">
  <li>
    <a class="govuk-link" href="./test-stubs">View Submit a document test stubs</a>
  </li>
</ul>


{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

{{ govukInsetText({
  text: "Please note there are also plans to release a sandbox test environment for developers in the future. The exact release date is to be confirmed. "
}) }}


For general testing guidance, visit our [guide to testing](/a-guide-to-testing).

</section>
