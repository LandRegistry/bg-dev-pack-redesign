---
layout: guidance.njk

title: Application information API Technical guide
description: Use this service to get information about a specific application.

eleventyNavigation:
  key: Application Information API v1.0 Technical guide
  parent: Application Information API v1.0

notlive: false

versions:
  - value: "1.0"
    text: "v1.0 (latest)"
    selected: true
  - value: "0.3"
    text: "v0.3"

relatedAPIs:
  - text: Submit an application to change the Land Register
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Send a document
    href: /apis/send-a-document
  - text: Submit an application
    href: /apis/submit-an-application
  - text: Attach a document
    href: /apis/attach-a-document
  - text: Attach a message
    href: /apis/attach-a-message
  - text: Notifications
    href: /apis/notifications
  - text: Download a document
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold

sidenav:
  - theme: Contents
    text: 'How to use the Application information API'
    href: '#how-to-use-the-application-information-api'
  - theme: Contents
    text: 'Validation rules'
    href: '#validation-rules'
  - theme: Contents
    text: 'Example requests and responses'
    href: '#example-requests-and-responses'
---
{% from "govuk/components/button/macro.njk" import govukButton %}

<section>

## How to use the Application information API {.govuk-heading-m}

The Application information API is used to get detailed information about a specific application, using the `application_request_id` returned by the Submit an application API request.

The status of an application can currently be one of the following:

- `VALIDATING` - HM Land Registry is still processing the application, and it has not yet been added to the day list
- `VALIDATION_FAILED` - The application has not been added to the day list due to errors during validation. The errors found are included in the errors section of the response
- `ACCEPTED_AWAITING_PRIORITY` - The application has passed validation but has not yet been added to the day list as it is currently closed. The application will be added to the day list and moved to an `ACCEPTED_PRIORITY_PROTECTED` state when the day list reopens
- `ACCEPTED_PRIORITY_PROTECTED` - The application has been accepted onto the day list, and has priority
- `SYSTEM_ERROR` - The application has not been added to the day list due to an HMLR system error. The request should be retried, or the support team contacted
- `CANCELLED` - The application has been cancelled. Futher information should be available in the correspondence documents.
- `COMPLETED` - The application has been completed. Further information should be available in correspondence documents.

This API will always return an HTTP 200 response for a valid request, regardless of the status of the application.

</section>

<section>

## Validation rules {.govuk-heading-m}

There are no validation rules for implementing this API.

</section>

<section>

## Example requests and responses {.govuk-heading-m}
### VALIDATING status {.govuk-heading-s}

<code>GET /v0/applications/{id}/information</code>

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "status": "VALIDATING",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
    "correspondence": [],
    "errors": [],
    "warnings": []
  }
}
```
</div>

### VALIDATION_FAILED status {.govuk-heading-s}

<code>GET /v0/applications/{id}/information</code>

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "status": "VALIDATION_FAILED",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
    "correspondence": [],
    "errors": [
      {
        "type": "OC018",
        "detail": "Failed to get document '00001'.",
        "pointer": null
      }
    ],
    "warnings": []
  }
}
```
</div>

### SYSTEM ERROR status {.govuk-heading-s}

<code>GET /v0/applications/{id}/information</code>

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "status": "SYSTEM_ERROR",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
    "correspondence": [],
    "errors": [],
    "warnings": []
  }
}
```
</div>

### ACCEPTED_AWAITING_PRIORITY status {.govuk-heading-s}

<code>GET /v0/applications/{id}/information</code> 

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "status": "ACCEPTED_AWAITING_PRIORITY",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
    "correspondence": [],
    "errors": [],
    "warnings": []
  }
}
```
</div>

### ACCEPTED_PRIORITY_PROTECTED status {.govuk-heading-s}

<code>GET /v0/applications/{id}/information</code>

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "status": "ACCEPTED_PRIORITY_PROTECTED",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
    "hmlr_reference": "AB123FC",
    "priority_timestamp": "2024-09-25T18:18:49.478Z",
    "correspondence": [],
    "errors": [],
    "warnings": [
      "You must upload document X"
    ]
  }
}
```
</div>

### CANCELLED status {.govuk-heading-s}

<code>GET /v0/applications/{id}/information</code>

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "status": "CANCELLED",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
    "hmlr_reference": "AB123FC",
    "priority_timestamp": "2024-09-25T18:18:49.478Z",
    "correspondence": [{
      "record_id": "2025-09-05T08:20:03.996Z",
      "documents": [{
        "created_at": "2025-09-05T08:20:04.050Z",
        "download_id": "can_62523897b09f9a3f380eefd878e7205aac78781cc68383ba79c3b7d42385",
        "type": {
          "code": "CAN",
          "name": "CANCELLATION LETTER"
        }
      }]
    }],
    "errors": [],
    "warnings": []
  }
}
```
</div>

### COMPLETED status {.govuk-heading-s}

<code>GET /v0/applications/{id}/information</code>

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "status": "COMPLETED",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
    "hmlr_reference": "AB123FC",
    "priority_timestamp": "2024-09-25T18:18:49.478Z",
    "correspondence": [{
      "record_id": "2025-09-05T08:15:01.259Z",
      "documents": [{
        "created_at": "2025-09-05T08:15:01.281Z",
        "download_id": "ltr_6a1756a68fbe29c58fe75e9c7a261dd416692f8a0d916ac63aead8111549",
        "type": {
          "code": "LTR",
          "name": "LETTER"
        }
      }, {
        "created_at": "2025-09-05T08:15:01.319Z",
        "download_id": "rcs_efc428e900f2d1501c156e9ec664f2a740749b6689afe61b6bf95440a31a",
        "type": {
          "code": "RCS",
          "name": "REGISTRATION COMPLETION SHEET"
          }
      }, {
        "created_at": "2025-09-05T08:15:01.343Z",
        "download_id": "reg_7ea12372179f1ae9d80fefec38cb7ff6b42672c49a0c292827434c848038",
        "type": {
          "code": "REG",
          "name": "COPY OF UPDATED REGISTER"
        }
      }]
    }],
    "errors": [],
    "warnings": []
  }
}
```
</div>

</section>
