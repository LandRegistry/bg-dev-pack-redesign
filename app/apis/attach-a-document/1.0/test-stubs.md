---
layout: guidance.njk

title: Attach a document API test stubs

eleventyNavigation:
  key: Attach a document API v1.0 Test stubs
  parent: Attach a document API v1.0

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

sidenav:
  - theme: Contents
    text: 'Scenario 1: Attach a Document'
    href: '#scenario-1'
---
{% from "govuk/components/button/macro.njk" import govukButton %}

HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to see when developing your own services. 

Base URL: `https://bgtest.landregistry.gov.uk/bg2test/api`

---

<section>

## Scenario 1: Attach a document {.govuk-heading-m #scenario-1}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v1/applications/faed15d-7ec8-4e7d-866c-9c25874d2b42/attachments`

Headers: `Authorization: <any-value>`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "document_id": "fa8c395b-ce64-4cb4-a188-d7f91f4c3139",
    "certification_statement_type": "CERTIFIED"
  }
}
```

### Response {.govuk-heading-s}

Status: `202`



</section>




