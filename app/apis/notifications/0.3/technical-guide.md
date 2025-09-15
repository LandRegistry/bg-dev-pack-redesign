---
layout: guidance

title: Notifications API Technical guide
description: Use this service to get updates about multiple applications submitted by the same business unit.

notlive: true

eleventyNavigation:
  key: Notifications API v0.3 Technical guide
  parent: Notifications API v0.3

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

versions:
  - value: "0.3"
    text: "v0.3 (latest)"
    selected: true

relatedAPIs:
  - text: Send a document API
    href: /apis/send-a-document
  - text: Submit an application API
    href: /apis/submit-an-application
  - text: Application information API
    href: /apis/application-information
  - text: Submit an application to change the land register API
    href: /apis/submit-an-application-to-change-the-land-register 
---
{% from "govuk/components/button/macro.njk" import govukButton %}

<section>

<h2 class="govuk-heading-m" id="how-to-use-the-notifications-api">How to use the Notifications API</h2>
  <h3 class="govuk-heading-s">Recieve notifications</h3>
  <p class="govuk-body">The GET request to fetch all notifications takes the following URL query parameters (which are optional):</p>
  <ul class="govuk-list govuk-list--bullet">
    <li>
      <code class="app-code app-code--inline">created_after</code> - only retrieve notifications with a <code class="app-code app-code--inline">created_timestamp</code> after this date
    </li>
    <li>
      <code class="app-code app-code--inline">created_before</code> - only retrieve notifications with a <code class="app-code app-code--inline">created_timestamp</code> before this date
    </li>
    <li>
      <code class="app-code app-code--inline">status</code> - only retrieve notifications with a specific status, either <code class="app-code app-code--inline">NEW</code> or <code class="app-code app-code--inline">ACKNOWLEDGED</code>
    </li>
    <li>
      <code class="app-code app-code--inline">occured_after</code> - only retrieve notifications with an <code class="app-code app-code--inline">event_timestamp</code> after this date
    </li>
    <li>
      <code class="app-code app-code--inline">occured_before</code> - only retrieve notifications with an <code class="app-code app-code--inline">event_timestamp</code> before this date
    </li>
    <li>
      <code class="app-code app-code--inline">notification_type</code> - only retrieve notifications with the specific <code class="app-code app-code--inline">notification_type</code>
    </li>
    <li>
      <code class="app-code app-code--inline">subject</code> - only retrieve notifications with the specific <code class="app-code app-code--inline">subject</code>
    </li>
    <li>
      <code class="app-code app-code--inline">additional_provider_filter</code> - only retrieve notifications that match the provided <code class="app-code app-code--inline">additional_provider_filter</code>
    </li>
    <li>
      <code class="app-code app-code--inline">limit</code> - the maximum number of notifications to return in a single response
    </li>
  </ul>
  <p class="govuk-body">Only notifications related to applications submitted by the business unit ID provided will be returned.</p>
  <p class="govuk-body">Notification delivery is ‘at least once’, meaning a specific event at a specific time may result in one or more notifications (i.e. duplicate notifications for the same event).</p>
  <p class="govuk-body">Duplicate events will have the same <code class="app-code app-code--inline">event_datetime</code> field and <code class="app-code app-code--inline">notification_type</code> which can be used to locate and ignore duplicates when receiving notifications. Notifications will continue to be returned by the endpoint until they are acknowledged.
  </p>
  <h3 class="govuk-heading-s">Acknowledge notifications</h3>
  <p class="govuk-body">Once a notification has been processed by your system, the notification should be acknowledged. To do this, send a list of <code class="app-code app-code--inline">notification_ids</code> to the Acknowledge notifications API as a POST request. This will change the status of those notifications to <code class="app-code app-code--inline">ACKNOWLEDGED</code>.</p>

</section>
<section>

<h2 class="govuk-heading-m" id="validation-rules">Validation rules</h2>
<p class="govuk-body">There are no validation rules for implementing this API.</p>

</section>
<section>

<h2 class="govuk-heading-m" id="example-requests-and-responses">Example requests and responses</h2>
<p class="govuk-body">For specific examples of notification payloads produced during application submission, view <a class="govuk-body govuk-link" href="/apis/submit-an-application">Submit an application notifications</a>.</p>

<h3 class="govuk-heading-s">Get notifications request</h3>

`GET /v0/notifications?created_after=2025-01-01t00:00:00 http/1.1`

<h3 class="govuk-heading-s">Get notifications response</h3>

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

<h3 class="govuk-heading-s">Acknowledge notifications request</h3>

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

<h3 class="govuk-heading-s">Acknowledge notifications response</h3>

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
