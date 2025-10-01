---
layout: guidance

title: Notifications API Technical guide
description: Use this service to get updates about multiple applications submitted by the same business unit.

eleventyNavigation:
  key: Notifications API v0.3 Technical guide
  parent: Notifications API v0.3

notlive: false

versions:
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
  - text: Application information
    href: /apis/application-information
  - text: Download a document
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold

sidenav:
  - theme: Contents
    text: 'How to use the Notifications API'
    href: '#how-to-use-the-notifications-api'
  - theme: Contents
    text: 'Validation rules'
    href: '#validation-rules'
  - theme: Contents
    text: 'Example requests and responses'
    href: '#example-requests-and-responses'
---
{% from "govuk/components/button/macro.njk" import govukButton %}

<section>

## How to use the Notifications API {.govuk-heading-m}

### Recieve notifications {.govuk-heading-s}

The GET request to fetch all notifications takes the following URL query parameters (which are optional):

- `created_after` - only retrieve notifications with a `created_timestamp` after this date
- `created_before` - only retrieve notifications with a `created_timestamp` before this date
- `status` - only retrieve notifications with a specific status, either `NEW` or `ACKNOWLEDGED`
- `occured_after` - only retrieve notifications with an `event_timestamp` after this date
- `occured_before` - only retrieve notifications with an `event_timestamp` before this date
- `notification_type` - only retrieve notifications with the specific `notification_type`
- `subject` - only retrieve notifications with the specific `subject`
- `additional_provider_filter` - only retrieve notifications that match the provided `additional_provider_filter`
- `limit` - the maximum number of notifications to return in a single response
{.govuk-list--bullet}

Only notifications related to applications submitted by the business unit ID provided will be returned.

Notification delivery is ‘at least once’, meaning a specific event at a specific time may result in one or more notifications (i.e. duplicate notifications for the same event).

Duplicate events will have the same `event_datetime` field and `notification_type` which can be used to locate and ignore duplicates when receiving notifications. Notifications will continue to be returned by the endpoint until they are acknowledged.

### Acknowledge notifications {.govuk-heading-s}

Once a notification has been processed by your system, the notification should be acknowledged. To do this, send a list of `notification_ids` to the Acknowledge notifications API as a POST request. This will change the status of those notifications to `ACKNOWLEDGED`.

</section>
<section>

## Validation rules {.govuk-heading-m}

There are no validation rules for implementing this API.

</section>
<section>

## Example requests and responses {.govuk-heading-m}

For specific examples of notification payloads produced during application submission, view [Submit an application notifications](/apis/submit-an-application).

### Get notifications request {.govuk-heading-s}

`GET /v0/notifications?created_after=2025-01-01t00:00:00 http/1.1`

### Get notifications response {.govuk-heading-s}

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": [{
    "notification_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created_datetime": "2025-03-06t14:32:55.295z",
    "event_datetime": "2025-03-06t14:32:55.295z",
    "payload_schema": "https://example.com/",
    "notification_type": "string",
    "subject_type": "string",
    "subject": "string",
    "additional_provider_filter": "string",
    "status": "new",
    "payload": {
      "additionalprop1": {},
      "additionalprop2": {},
      "additionalprop3": {}
    }
  }]
}
```

</div>

### Acknowledge notifications request {.govuk-heading-s}

`POST /v0/notifications/acknowledge http/1.1`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ]
}
```
</div>

### Acknowledge notifications response {.govuk-heading-s}

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "acknowledged": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    ]
  }
}
```
</div>

</section>
