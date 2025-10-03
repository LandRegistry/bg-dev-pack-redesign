---
layout: guidance.njk

title: Notifications API test stubs

eleventyNavigation:
  key: Notifications API v1.0 Test stubs
  parent: Notifications API v1.0

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

sidenav:
  - theme: Contents
    text: 'Scenario 1: Get all notifications'
    href: '#scenario-1'
  - theme: Contents
    text: 'Scenario 2: Get all new notifications'
    href: '#scenario-2'
  - theme: Contents
    text: 'Scenario 3: Get all acknowledged notifications'
    href: '#scenario-3'
  - theme: Contents
    text: 'Scenario 4: Get all with invalid date filter'
    href: '#scenario-4'
  - theme: Contents
    text: 'Scenario 5: Acknowledge notifications'
    href: '#scenario-5'
  - theme: Contents
    text: 'Scenario 6: Application queued notificaton'
    href: '#scenario-6'
  - theme: Contents
    text: 'Scenario 7: System error notification'
    href: '#scenario-7'
  - theme: Contents
    text: 'Scenario 8: Application cancelled notification'
    href: '#scenario-8'
  - theme: Contents
    text: 'Scenario 9: Application completed notification'
    href: '#scenario-9'
  - theme: Contents
    text: 'Scenario 10: Application requisitioned notification'
    href: '#scenario-10'
---
{% from "govuk/components/button/macro.njk" import govukButton %}

HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to see when developing your own services.

Base URL: `https://bgtest.landregistry.gov.uk/bg2test/api`

---

<section>

## Scenario 1: Get all notifications {.govuk-heading-m #scenario-1}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/notifications`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper"> <!--wrapper needed to put the button inside the code block-->
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": [
    {
      "notification_id": "{{"{{ID}}"}}",
      "created_datetime": "2024-01-01T12:00:00.000Z",
      "event_datetime": "2024-01-01T12:00:00.000Z",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/accepted-priority-protected.json",
      "notification_type": "application.accepted-priority-protected",
      "subject_type": "APPLICATION",
      "subject": "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
      "additional_provider_filter": "subUnit1",
      "status": "ACKNOWLEDGED",
      "payload": {
        "data": {
          "hmlr_reference": "ABC456A",
          "status": "ACCEPTED_PRIORITY_PROTECTED",
          "priority": "2024-09-20T09:56:46.123123Z"
        }
      }
    },
    {
      "notification_id": "{{"{{ID}}"}}",
      "created_datetime": "2024-01-01T12:00:00.000Z",
      "event_datetime": "2024-01-01T12:00:00.000Z",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/accepted-priority-protected.json",
      "notification_type": "application.accepted-priority-protected",
      "subject_type": "APPLICATION",
      "subject": "2563940e-ae95-4e7e-9b33-49a6571abdf6",
      "additional_provider_filter": "subUnit1",
      "status": "NEW",
      "payload": {
        "data": {
          "hmlr_reference": "ABC456B",
          "status": "ACCEPTED_PRIORITY_PROTECTED",
          "priority": "2024-09-20T09:56:46.123123Z"
        }
      }
    },
    {
      "notification_id": "{{"{{ID}}"}}",
      "created_datetime": "2024-01-01T12:00:00.000Z",
      "event_datetime": "2024-01-01T12:00:00.000Z",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/validation-failed.json",
      "notification_type": "application.validation-failed",
      "subject_type": "APPLICATION",
      "subject": "3be62ad3-c542-452d-975e-6cd18d77196f",
      "additional_provider_filter": "subUnit1",
      "status": "NEW",
      "payload": {
        "data": {
          "status": "VALIDATION_FAILED"
        }
      }
    }
  ]
}
```
</div>

</section>

---

<section id="scenario-2">

## Scenario 2: Get all new notifications {.govuk-heading-m #scenario-2}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/notifications?status=NEW`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper"> <!--wrapper needed to put the button inside the code block-->

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{ 
  "data": [
    {
      "notification_id": "{{"{{ID}}"}}",
      "created_datetime": "2024-01-01T12:00:00.000Z",
      "event_datetime": "2024-01-01T12:00:00.000Z",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/accepted-priority-protected.json",
      "notification_type": "application.accepted-priority-protected",
      "subject_type": "APPLICATION",
      "subject": "2563940e-ae95-4e7e-9b33-49a6571abdf6",
      "additional_provider_filter": "subUnit1",
      "status": "NEW",
      "payload": {
        "data": {
          "hmlr_reference": "ABC456B",
          "status": "ACCEPTED_PRIORITY_PROTECTED",
          "priority": "2024-09-20T09:56:46.123123Z"
        }
      }
    },
    {
      "notification_id": "{{"{{ID}}"}}",
      "created_datetime": "2024-01-01T12:00:00.000Z",
      "event_datetime": "2024-01-01T12:00:00.000Z",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/validation-failed.json",
      "notification_type": "application.validation-failed",
      "subject_type": "APPLICATION",
      "subject": "3be62ad3-c542-452d-975e-6cd18d77196f",
      "additional_provider_filter": "subUnit1",
      "status": "NEW",
      "payload": {
        "data": {
          "status": "VALIDATION_FAILED"
        }
      }
    }
  ]
}
```

</div>
</section>

---

<section id="scenario-3">

## Scenario 3: Get all acknowledged notifications {.govuk-heading-m #scenario-3}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/notifications?status=ACKNOWLEDGED`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper"> <!--wrapper needed to put the button inside the code block-->

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "data": [
    {
      "notification_id": "{{"{{ID}}"}}",
      "created_datetime": "2024-01-01T12:00:00.000Z",
      "event_datetime": "2024-01-01T12:00:00.000Z",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/accepted-priority-protected.json",
      "notification_type": "application.accepted-priority-protected",
      "subject_type": "APPLICATION",
      "subject": "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
      "additional_provider_filter": "subUnit1",
      "status": "ACKNOWLEDGED",
      "payload": {
        "data": {
          "hmlr_reference": "ABC456A",
          "status": "ACCEPTED_PRIORITY_PROTECTED",
          "priority": "2024-09-20T09:56:46.123123Z"
        }
      }
    }
  ]
}
```

</div>
</section>

---

<section id="scenario-4">

### Scenario 4: Get all with invalid date filter {.govuk-heading-s #scenario-4}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/notifications?created_after=2020-01-01T00:00:00&created_before=2015-01-01T00:00:00`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `400`

<div class="code-wrapper"> <!--wrapper needed to put the button inside the code block-->

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "type": "https://problems-registry.smartbear.com/bad-request/",
  "title": "Bad Request",
  "status": 400,
  "detail": "created_after parameter cannot be after created_before parameter",
  "instance": "/v1/notifications",
  "code": "400-01"
}
```

</div>
</section>

---

<section id="scenario-5">

## Scenario 5: Acknowledge notifications {.govuk-heading-m #scenario-5}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v1/notifications/acknowledge`

Headers: `Authorization: <any-value>`

<div class="code-wrapper"> <!--wrapper needed to put the button inside the code block-->

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "data": [
    "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
    "87654321-2b6d-4b8a-971c-e758b0e8e790",
    "12345678-2b6d-4b8a-971c-e758b0e8e790"
  ]
}
```
</div>

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper"> <!--wrapper needed to put the button inside the code block-->

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "data": {
    "acknowledged": [
      "b3ac19be-2b6d-4b8a-971c-e758b0e8e790"
    ],
    "not_found": [
      "87654321-2b6d-4b8a-971c-e758b0e8e790",
      "12345678-2b6d-4b8a-971c-e758b0e8e790"
    ]
  }
}
```
</div>
</section>

---

<section>

## Scenario 6: Application queued notification {.govuk-heading-m #scenario-6}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/notifications?notification_type=application.accepted-priority-pending`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper"> <!--wrapper needed to put the button inside the code block-->

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "data": [{
    "notification_id": "{{"{{ID}}"}}",
    "created_datetime": "2024-01-01T12:00:00.000Z",
    "event_datetime": "2024-01-01T12:00:00.000Z",
    "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/accepted-priority-pending.json",
    "notification_type": "application.accepted-priority-pending",
    "subject_type": "APPLICATION",
    "subject": "45454545-2b6d-4b8a-971c-e758b0e8e790",
    "additional_provider_filter": "subUnit1",
    "status": "NEW",
    "payload": {
      "data": {
        "status": "ACCEPTED_AWAITING_PRIORITY"
      }
    }
  }]
}
```
</div>
</section>

---

<section id="scenario-7">

## Scenario 7: Application error notification {.govuk-heading-m #scenario-7}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/notifications?notification_type=application.error`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper"> <!--wrapper needed to put the button inside the code block-->

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "data": [{
    "notification_id": "{{"{{ID}}"}}",
    "created_datetime": "2024-01-01T12:00:00.000Z",
    "event_datetime": "2024-01-01T12:00:00.000Z",
    "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/error.json",
    "notification_type": "application.error",
    "subject_type": "APPLICATION",
    "subject": "45454545-2b6d-4b8a-971c-e758b0e8e790",
    "additional_provider_filter": "subUnit1",
    "status": "NEW",
    "payload": {
      "data": {
        "status": "SYSTEM_ERROR"
      }
    }
  }]
}
```
</div>
</section>

<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
<section id="scenario-8">

## Scenario 8: Application cancelled notification {.govuk-heading-m #scenario-8}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/notifications?subject=<uuid ending with 'can'>`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper"> <!--wrapper needed to put the button inside the code block-->

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "notification_id": "{{"{{ID}}"}}",
  "created_datetime": "2024-01-01T12:00:00.000Z",
  "event_datetime": "2024-01-01T12:00:00.000Z",
  "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/cancelled.json",
  "notification_type": "application.cancelled",
  "subject_type": "APPLICATION",
  "subject": "a97679c9-624f-4680-ae8b-15b7-r411can",
  "additional_provider_filter": null,
  "status": "NEW",
  "payload": {
    "data": {
      "status": "CANCELLED",
      "documents": [
        {
          "type": {
            "code": "CAN",
            "name": "CANCELLATION LETTER"
          },
          "created_at": "2025-09-05T08:20:04.050Z",
          "download_id": "can_62523897b09f9a3f380eefd878e7205aac78781cc68383ba79c3b7d42385"
        }
      ],
      "hmlr_reference": "R411CAN",
      "application_request_id": "a97679c9-624f-4680-ae8b-15b7-r411can"
    }
  }
}
```
</div>
</section>

---

<section id="scenario-9">

## Scenario 9: Application completed notification {.govuk-heading-m #scenario-9}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/notifications?subject=<uuid ending with 'cmp'>`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper"> <!--wrapper needed to put the button inside the code block-->

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "notification_id": "{{"{{ID}}"}}",
  "created_datetime": "2024-01-01T12:00:00.000Z",
  "event_datetime": "2024-01-01T12:00:00.000Z",
  "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/completed.json",
  "notification_type": "application.completed",
  "subject_type": "APPLICATION",
  "subject": "28a01655-544a-48c5-9e40-4ac2-p311cmp",
  "additional_provider_filter": null,
  "status": "NEW",
  "payload": {
    "data": {
      "status": "COMPLETED",
      "documents": [
        {
          "type": {
            "code": "LTR",
            "name": "LETTER"
          },
          "created_at": "2025-09-05T08:15:01.281Z",
          "download_id": "ltr_6a1756a68fbe29c58fe75e9c7a261dd416692f8a0d916ac63aead8111549"
        },
        {
          "type": {
            "code": "RCS",
            "name": "REGISTRATION COMPLETION SHEET"
          },
          "created_at": "2025-09-05T08:15:01.319Z",
          "download_id": "rcs_4efc428e900f2d1501c156e9ec664f2a740749b6689afe61b6bf95440a31a"
        },
        {
          "type": {
            "code": "REG",
            "name": "COPY OF UPDATED REGISTER"
          },
          "created_at": "2025-09-05T08:15:01.343Z",
          "download_id": "reg_7ea12372179f1ae9d80fefec38cb7ff6b42672c49a0c292827434c848038"
        }
      ],
      "hmlr_reference": "P311CMP",
      "application_request_id": "28a01655-544a-48c5-9e40-4ac2-p311cmp",
      "was_subject_to_early_completion": false
    }
  }
}
```
</div>
</section>

---

<section>

## Scenario 10: Application requisitioned notification {.govuk-heading-m #scenario-10}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/notifications?subject=<uuid ending with 'app'>`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

```json
{
  "notification_id": "{{"{{ID}}"}}",
  "created_datetime": "2024-01-01T12:00:00.000Z",
  "event_datetime": "2024-01-01T12:00:00.000Z",
  "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/correspondence-despatched.json",
  "notification_type": "application.correspondence-despatched",
  "subject_type": "APPLICATION",
  "subject": "28a01655-544a-48c5-9e40-4ac2-p311app",
  "additional_provider_filter": null,
  "status": "NEW",
  "payload": {
    "data": {
      "documents": [
        {
          "type": {
            "code": "LTR",
            "name": "LETTER"
          },
          "created_at": "2025-09-05T08:15:01.281Z",
          "download_id": "ltr_6a1756a68fbe29c58fe75e9c7a261dd416692f8a0d916ac63aead8111549"
        }
      ],
      "hmlr_reference": "P311APP",
      "application_request_id": "28a01655-544a-48c5-9e40-4ac2-p311app"
    }
  }
}
```

</section>
