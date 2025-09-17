---
layout: api-overview.njk

title: Send a document API
description: Use this service to attach documents to your application.

eleventyNavigation:
  key: Send a Document API v0.3
  parent: Send a Document API

notlive: true

versions:
  - value: "0.3"
    text: "v0.3 (latest)"
    selected: true

relatedAPIs:
  - text: Submit an application to change the Land Register
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Submit an application
    href: /apis/submit-an-application
  - text: Application information
    href: /apis/application-information
  - text: Notifications
    href: /apis/notifications
  - text: Download a document
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold
---

<section>

## Overview {.govuk-heading-m}

The Send a document API should be used to attach documents to your application.

There are two steps for sending a document:

1. A request to generate an upload URL
2. A request to upload the document

The request to generate an upload URL will respond with an HMLR URL that can be used to upload the document to. This URL is only active for 10 minutes after creation. The generate an upload URL endpoint will also return a document ID that can be used when using the Submit an application API. Documents uploaded via this process will be subject to HMLR security scanning.

Documents that have been uploaded can be used for up to 180 days, after which point they will be removed.

</section>
<section>

## View the Technical guide {.govuk-heading-m}

<ul class="govuk-list">
  <li>
    <a class="govuk-link" href="./technical-guide">Technical guide</a>
  </li>
</ul>

</section>
<section>

## View the API specification {.govuk-heading-m}

<ul class="govuk-list">
  <li>
    <a class="govuk-link" href="https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Send-a-document-API" rel="noreferrer noopener" target="_blank">Web version (opens in new tab)</a>
  </li>
</ul>

</section>
<section>

## How the API works {.govuk-heading-m}

<a target="_blank" href="/assets/images/SendADocumentSequence.png">
  <img src="/assets/images/SendADocumentSequence.png" alt="A diagram showing how the Send a Document API works.">
</a>

This diagram demonstrates how the Send a document API works to support users.

When the user sends the request to generate an upload URL, the HMLR system will respond with a URL that can be used to upload the document to. 

Users can then use this URL to upload the document to the system. 

</section>
<section>

## How to test this API {.govuk-heading-m}

HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code to demonstrate what you should expect to see when developing your own services.
<ul class="govuk-list">
  <li>
    <a class="govuk-link" href="./test-stubs">View Send a document test stubs</a>.
  </li>
</ul>

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

{{ govukInsetText({
  text: "Please note there are also plans to release a sandbox test environment for developers in the future. The exact release date is to be confirmed."
}) }}

For general testing guidance, visit our [guide to testing](/a-guide-to-testing).

</section>
