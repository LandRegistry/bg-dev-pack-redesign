---
layout: guidance.njk

title: Application Information API test stubs

eleventyNavigation:
  key: Application Information v0.3 Test stubs
  parent: Application Information v0.3

notlive: true

versions:
  - value: "1.0"
    text: "v1.0 (upcoming)"
  - value: "0.3"
    text: "v0.3 (latest)"
    selected: true

relatedAPIs:
  - text: Submit an application to change the Land Register
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Send a document
    href: /apis/send-a-document
  - text: Submit an application
    href: /apis/submit-an-application
  - text: Notifications
    href: /apis/notifications
  - text: Download a document
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold

sidenav:
  - theme: Contents
    text: 'Scenario 1: Information of applicaiton with single charge'
    href: '#scenario-1'
  - theme: Contents
    text: 'Scenario 2: Information of application with single transfer'
    href: '#scenario-2'
  - theme: Contents
    text: 'Scenario 3: Information of application with level 2 validation errors'
    href: '#scenario-3'
---
{% from "govuk/components/button/macro.njk" import govukButton %}

HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to see when developing your own services.

Base URL: `https://bgtest.landregistry.gov.uk/bg2test/api`

---

<section>

## Scenario 1: Information of applicaiton with single charge {.govuk-heading-m #scenario-1}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v0/applications/b3ac19be-2b6d-4b8a-971c-e758b0e8e790/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "application_request_id": "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
    "status": "ACCEPTED_PRIORITY_PROTECTED",
    "priority_timestamp": "2024-09-25T18:18:49Z",
    "hmlr_reference": "A123AAA",
    "warnings": [],
    "errors": []
  }
}
```
</div>
</section>

---

<section>

##  Scenario 2: Information of application with single transfer {.govuk-heading-m #scenario-2}

###  Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v0/applications/2563940e-ae95-4e7e-9b33-49a6571abdf6/information`

Headers: `Authorization: <any-value>`

###  Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "application_request_id": "2563940e-ae95-4e7e-9b33-49a6571abdf6",
    "status": "ACCEPTED_PRIORITY_PROTECTED",
    "priority_timestamp": "2024-09-25T18:18:49Z",
    "hmlr_reference": "B123BBB",
    "warnings": [],
    "errors": []
  }
}
```
</div>
</section>

---

<section>

##  Scenario 3: Information of application with level 2 validation errors {.govuk-heading-m #scenario-3}

###  Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v0/applications/3be62ad3-c542-452d-975e-6cd18d77196f/information`

Headers: `Authorization: <any-value>`

###  Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "status": "VALIDATION_FAILED",
    "hmlr_reference": null,
    "priority_timestamp": null,
    "errors": [{
      "type": "mdref-on-record",
      "detail": "MD Ref MD007A does not exist on record",
      "pointer": null
    }, {
      "type": "lender-name-matches-records",
      "detail": "MD Ref MD007A not found on record",
      "pointer": null
    }, {
      "type": "all-mandatory-documents-provided",
      "detail": "Mandatory documents missing for transactions of type [T]",
      "pointer": null
    }, {
      "type": "transferee-has-representation-type",
      "detail": "Transferee Transferee must have a representation type",
      "pointer": null
    }],
    "warnings": [],
    "application_request_id": "3be62ad3-c542-452d-975e-6cd18d77196f"
  }
}
```
</div>
</section>
