---
layout: api-overview.njk

title: Submit an application API
description: Use this service to provide data to HMLR for updating the register.

eleventyNavigation:
    key: Submit an Application API v1.0
    parent: Submit an Application API

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
  - text: Application information API
    href: /apis/application-information
  - text: Attach a document API
    href: /apis/attach-a-document
  - text: Attach a message API
    href: /apis/attach-a-message
  - text: Notifications API
    href: /apis/notifications
  - text: Download a document API
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold
---

<section>

## Overview {.govuk-heading-m}


The Submit an application API will help users provide the necessary data to HMLR for updating the register. This API is asynchronous, returning a unique ID for the submission request which can be used when fetching the application status.

This API supports the following application types:

- Register update
- Transfer of part
- Dipositionary first lease (includes new lease and lease extension)
- Removing a default Form A restriction (JP1)
{.govuk-list--bullet}

The data in the request content contains information about:

- Addresses
- Documents
- Parties
- Transactions
- Titles
{.govuk-list--bullet}

</section>
<section>

## View the technical guide {.govuk-heading-m}

<ul class="govuk-list"> <!-- Default render for `- list` style lists is to add bullet points, which we don't want here. -->
  <li>
    <a class="govuk-link" href="/apis/submit-an-application/1.0/technical-guide">Technical guide</a>
  </li>
</ul>

</section>
<section>

## View the API specification {.govuk-heading-m}

<ul class="govuk-list"> <!-- Default render for `- list` style lists is to add bullet points, which we don't want here. -->
  <li>
    <a class="govuk-link" href="https://landregistry.github.io/bgtechdoc/documents/submit-an-application-to-change-the-register/v1.0/openapi.html#tag/Submit-an-application-API" rel="noreferrer noopener" target="_blank">Web version (opens in new tab)</a>
  </li>
</ul>

</section>
<section>

## How the API works {.govuk-heading-m}

<a target="_blank" href="/assets/images/SubmitAnApplication.png">
  <img class="govuk-!-margin-bottom-3" src="/assets/images/SubmitAnApplication.png" alt="A diagram showing how the Submit an application API works.">
</a>

This diagram demonstrates how the Submit an application API works to support users.

When a user submits information to update the register, the HMLR system will respond by sending a unique application ID. Users can use this ID to receive information about the status of their application.

</section>
<section>

## How to test this API {.govuk-heading-m}

HMLR has created a test environment for the Submit an application API. We’ve also provided example code to demonstrate what you should expect when developing your own services.

<ul class="govuk-list">
  <li>
    <a class="govuk-link" href="/apis/submit-an-application/1.0/test-stubs">View Submit an application test stubs</a>
  </li>
</ul>


{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

{{ govukInsetText({
  text: "Please note there are also plans to release a sandbox test environment for developers in the future. The exact release date is to be confirmed."
}) }}

For general testing guidance, visit our [guide to testing](/a-guide-to-testing).

</section>
