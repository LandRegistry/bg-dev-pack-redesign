---
layout: guidance.njk

title: Application Information API test stubs

eleventyNavigation:
  key: Application Information v1.0 Test stubs
  parent: Application Information v1.0

notlive: true

versions:
  - value: "1.0"
    text: "v1.0 (upcoming)"
    selected: true
  - value: "0.3"
    text: "v0.3 (latest)"

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
    text: 'Scenario 1: Information of application that is validating'
    href: '#scenario-1'
  - theme: Contents
    text: 'Scenario 2: Information of application that has failed validation'
    href: '#scenario-2'
  - theme: Contents
    text: 'Scenario 3: Information of application that has hit a system error'
    href: '#scenario-3'
  - theme: Contents
    text: 'Scenario 4: Information of application that is accepted awaiting priority'
    href: '#scenario-4'
  - theme: Contents
    text: 'Scenario 5: Information of application that is accepted priority protected'
    href: '#scenario-5'
  - theme: Contents
    text: 'Scenario 6: Information of application that is cancelled'
    href: '#scenario-6'
  - theme: Contents
    text: 'Scenario 7: Information of application that is completed'
    href: '#scenario-7'
  - theme: Contents
    text: 'Scenario 8: Information of application that is accepted awaiting priority using hmlr reference'
    href: '#scenario-8'
  - theme: Contents
    text: 'Scenario 9: Information of application that is accepted priority protected using hmlr reference'
    href: '#scenario-9'
  - theme: Contents
    text: 'Scenario 10: Information of application that is cancelled using hmlr reference'
    href: '#scenario-10'
  - theme: Contents
    text: 'Scenario 11: Information of application that is completed using hmlr reference'
    href: '#scenario-11'
---
{% from "govuk/components/button/macro.njk" import govukButton %}

HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to see when developing your own services.

Base URL: `https://bgtest.landregistry.gov.uk/bg2test/api`

> Note: all application request ids used in this are modifiable, you only need the last 3 letters to match the provided values.
> Note: all hmlr references used in this are modifiable, you only need the last 3 letters to match the provided values.

---

<section>

## Scenario 1: Information of application that is validating {.govuk-heading-m #scenario-1}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/abababab-abab-abab-abab-ababababavng/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json

{
    "data": {
        "order_request_id": "abababab-abab-abab-abab-ababababavng",
        "hmlr_reference": null,
        "priority_timestamp": null,
        "status": "VALIDATING",
        "correspondences": null,
        "errors": [],
        "warnings": []
    }
}
```
</div>
</section>

---

<section>

## Scenario 2: Information of application that has failed validation {.govuk-heading-m #scenario-2}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/abababab-abab-abab-abab-ababababavlf/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "order_request_id": "abababab-abab-abab-abab-ababababavlf",
    "hmlr_reference": null,
    "priority_timestamp": null,
    "status": "VALIDATION_FAILED",
    "correspondences": null,
    "errors": [{
      "type": "mdref-on-record",
      "detail": "MD Ref MD123A does not exist on record"
    },{
      "type": "lender-name-matches-records",
      "detail": "MD Ref MD123A not found on record"
    },{
      "type": "all-mandatory-documents-provided",
      "detail": "Mandatory documents missing for transactions of type [T]"
    },{
      "type": "transferee-has-representation-type",
      "detail": "Transferee must have a representation type"
    }],
    "warnings": [
        "Please ensure any relevant evidence is attached."
    ]
  }
}
```
</div>
</section>

---

<section>

## Scenario 3: Information of application that system errored {.govuk-heading-m #scenario-3}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/abababab-abab-abab-abab-ababababasye/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
    "data": {
        "order_request_id": "abababab-abab-abab-abab-ababababasye",
        "hmlr_reference": null,
        "priority_timestamp": null,
        "status": "SYSTEM_ERROR",
        "correspondences": null,
        "errors": [],
        "warnings": []
    }
}
```
</div>
</section>

---

<section>

## Scenario 4: Information of application is accepted awaiting priority {.govuk-heading-m #scenario-4}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/abababab-abab-abab-abab-ababababaaap/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
    "data": {
        "order_request_id": "abababab-abab-abab-abab-ababababaaap",
        "hmlr_reference": "BABAAAP",
        "priority_timestamp": null,
        "status": "ACCEPTED_AWAITING_PRIORITY",
        "correspondences": [],
        "errors": [],
        "warnings": []
    }
}
```
</div>
</section>

---

<section>

## Scenario 5: Information of application is accepted priority protected {.govuk-heading-m #scenario-5}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/abababab-abab-abab-abab-ababababaapp/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "order_request_id": "abababab-abab-abab-abab-ababababaapp",
    "hmlr_reference": "BABAAPP",
    "priority_timestamp": "2025-08-27T14:40:35.23071Z",
    "status": "ACCEPTED_PRIORITY_PROTECTED",
    "correspondences": [
      {
        "record_id": "2025-09-05T08:15:01.259Z",
        "documents": [
          {
            "created_at": "2025-09-05T08:15:01.281Z",
            "download_id": "ltr_6a1756a68fbe29c58fe75e9c7a261dd416692f8a0d916ac63aead8111549",
            "type": {
              "code": "LTR",
              "name": "LETTER"
            }
          }
        ]
      }
    ],
    "errors": [],
    "warnings": []
  }
}
```
</div>
</section>

---

<section>

## Scenario 6: Information of application is cancelled {.govuk-heading-m #scenario-6}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/abababab-abab-abab-abab-ababababacan/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "order_request_id": "abababab-abab-abab-abab-ababababacan",
    "hmlr_reference": "BABACAN",
    "priority_timestamp": "2025-08-27T14:40:35.23071Z",
    "status": "CANCELLED",
    "correspondences": [
      {
        "record_id": "2025-09-05T08:20:03.996Z",
        "documents": [
          {
            "created_at": "2025-09-05T08:20:04.050Z",
            "download_id": "can_62523897b09f9a3f380eefd878e7205aac78781cc68383ba79c3b7d42385",
            "type": {
              "code": "CAN",
              "name": "CANCELLATION LETTER"
            }
          }
        ]
      }
    ],
    "errors": [],
    "warnings": []
  }
}
```
</div>
</section>

---

<section>

## Scenario 7: Information of application is completed {.govuk-heading-m #scenario-7}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/abababab-abab-abab-abab-ababababacmp/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "order_request_id": "abababab-abab-abab-abab-ababababacmp",
    "hmlr_reference": "BABACMP",
    "priority_timestamp": "2025-08-27T14:40:35.23071Z",
    "status": "COMPLETED",
    "correspondences": [
      {
        "record_id": "2025-09-05T08:15:01.259Z",
        "documents": [
          {
            "created_at": "2025-09-05T08:15:01.281Z",
            "download_id": "ltr_6a1756a68fbe29c58fe75e9c7a261dd416692f8a0d916ac63aead8111549",
            "type": {
              "code": "LTR",
              "name": "LETTER"
            }
          },
          {
            "created_at": "2025-09-05T08:15:01.319Z",
            "download_id": "rcs_efc428e900f2d1501c156e9ec664f2a740749b6689afe61b6bf95440a31a",
            "type": {
              "code": "RCS",
              "name": "REGISTRATION COMPLETION SHEET"
            }
          },
          {
            "created_at": "2025-09-05T08:15:01.343Z",
            "download_id": "reg_7ea12372179f1ae9d80fefec38cb7ff6b42672c49a0c292827434c848038",
            "type": {
              "code": "REG",
              "name": "COPY OF UPDATED REGISTER"
            }
          }
        ]
      }
    ],
    "errors": [],
    "warnings": []
  }
}
```
</div>
</section>

---

<section>

## Scenario 8: Information of application is accepted awaiting priority using hmlr reference {.govuk-heading-m #scenario-8}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/BABAAAP/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
    "data": {
        "order_request_id": "abababab-abab-abab-abab-ababababaaap",
        "hmlr_reference": "BABAAAP",
        "priority_timestamp": null,
        "status": "ACCEPTED_AWAITING_PRIORITY",
        "correspondences": [],
        "errors": [],
        "warnings": []
    }
}
```
</div>
</section>

---

<section>

## Scenario 9: Information of application is accepted priority protected using hmlr reference {.govuk-heading-m #scenario-9}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/BABAAPP/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "order_request_id": "abababab-abab-abab-abab-ababababaapp",
    "hmlr_reference": "BABAAPP",
    "priority_timestamp": "2025-08-27T14:40:35.23071Z",
    "status": "ACCEPTED_PRIORITY_PROTECTED",
    "correspondences": [
      {
        "record_id": "2025-09-05T08:15:01.259Z",
        "documents": [
          {
            "created_at": "2025-09-05T08:15:01.281Z",
            "download_id": "ltr_6a1756a68fbe29c58fe75e9c7a261dd416692f8a0d916ac63aead8111549",
            "type": {
              "code": "LTR",
              "name": "LETTER"
            }
          }
        ]
      }
    ],
    "errors": [],
    "warnings": []
  }
}
```
</div>
</section>

---

<section>

## Scenario 10: Information of application is cancelled using hmlr reference {.govuk-heading-m #scenario-10}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/BABACAN/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "order_request_id": "abababab-abab-abab-abab-ababababacan",
    "hmlr_reference": "BABACAN",
    "priority_timestamp": "2025-08-27T14:40:35.23071Z",
    "status": "CANCELLED",
    "correspondences": [
      {
        "record_id": "2025-09-05T08:20:03.996Z",
        "documents": [
          {
            "created_at": "2025-09-05T08:20:04.050Z",
            "download_id": "can_62523897b09f9a3f380eefd878e7205aac78781cc68383ba79c3b7d42385",
            "type": {
              "code": "CAN",
              "name": "CANCELLATION LETTER"
            }
          }
        ]
      }
    ],
    "errors": [],
    "warnings": []
  }
}
```
</div>
</section>

---

<section>

## Scenario 11: Information of application is completed using hmlr reference {.govuk-heading-m #scenario-11}

### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/applications/BABACMP/information`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "order_request_id": "abababab-abab-abab-abab-ababababacmp",
    "hmlr_reference": "BABACMP",
    "priority_timestamp": "2025-08-27T14:40:35.23071Z",
    "status": "COMPLETED",
    "correspondences": [
      {
        "record_id": "2025-09-05T08:15:01.259Z",
        "documents": [
          {
            "created_at": "2025-09-05T08:15:01.281Z",
            "download_id": "ltr_6a1756a68fbe29c58fe75e9c7a261dd416692f8a0d916ac63aead8111549",
            "type": {
              "code": "LTR",
              "name": "LETTER"
            }
          },
          {
            "created_at": "2025-09-05T08:15:01.319Z",
            "download_id": "rcs_efc428e900f2d1501c156e9ec664f2a740749b6689afe61b6bf95440a31a",
            "type": {
              "code": "RCS",
              "name": "REGISTRATION COMPLETION SHEET"
            }
          },
          {
            "created_at": "2025-09-05T08:15:01.343Z",
            "download_id": "reg_7ea12372179f1ae9d80fefec38cb7ff6b42672c49a0c292827434c848038",
            "type": {
              "code": "REG",
              "name": "COPY OF UPDATED REGISTER"
            }
          }
        ]
      }
    ],
    "errors": [],
    "warnings": []
  }
}
```
</div>
</section>