---
layout: page-with-nav
title: Notifications API technical guide
noheader: true

eleventyNavigation:
  key: notifications-test-stubs
  parent: notifications-api

breadcrumb: false
spy: true
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


<div class="govuk-grid-row">
  <h1 class="govuk-heading-xl">Notifications API technical guide</h1>
  <p class="govuk-body-l">Use this service to get updates about multiple applications submitted by the same business unit.</p>
  <div class="govuk-warning-text">
    <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
    <strong class="govuk-warning-text__text">
      <span class="govuk-visually-hidden">Warning</span>
      These API endpoints are not currently live.
    </strong>
  </div>
</div>

<div class="govuk-grid-row">
<section>

<h2 class="govuk-heading-m" id="how-to-use-the-notifications-api">How to use the Notifications API</h2>
  <h3 class="govuk-heading-s">Recieve notifications</h3>
  <p class="govuk-body">The GET request to fetch all notifications takes the following URL query parameters (which are optional):</p>
  <ul class="govuk-list govuk-list--bullet">
    <li>
      <code class="x-govuk-code x-govuk-code--inline">created_after</code> - only retrieve notifications with a <code class="x-govuk-code x-govuk-code--inline">created_timestamp</code> after this date
    </li>
    <li>
      <code class="x-govuk-code x-govuk-code--inline">created_before</code> - only retrieve notifications with a <code class="x-govuk-code x-govuk-code--inline">created_timestamp</code> before this date
    </li>
    <li>
      <code class="x-govuk-code x-govuk-code--inline">status</code> - only retrieve notifications with a specific status, either <code class="x-govuk-code x-govuk-code--inline">NEW</code> or <code class="x-govuk-code x-govuk-code--inline">ACKNOWLEDGED</code>
    </li>
    <li>
      <code class="x-govuk-code x-govuk-code--inline">occured_after</code> - only retrieve notifications with an <code class="x-govuk-code x-govuk-code--inline">event_timestamp</code> after this date
    </li>
    <li>
      <code class="x-govuk-code x-govuk-code--inline">occured_before</code> - only retrieve notifications with an <code class="x-govuk-code x-govuk-code--inline">event_timestamp</code> before this date
    </li>
    <li>
      <code class="x-govuk-code x-govuk-code--inline">notification_type</code> - only retrieve notifications with the specific <code class="x-govuk-code x-govuk-code--inline">notification_type</code>
    </li>
    <li>
      <code class="x-govuk-code x-govuk-code--inline">subject</code> - only retrieve notifications with the specific <code class="x-govuk-code x-govuk-code--inline">subject</code>
    </li>
    <li>
      <code class="x-govuk-code x-govuk-code--inline">additional_provider_filter</code> - only retrieve notifications that match the provided <code class="x-govuk-code x-govuk-code--inline">additional_provider_filter</code>
    </li>
    <li>
      <code class="x-govuk-code x-govuk-code--inline">limit</code> - the maximum number of notifications to return in a single response
    </li>
  </ul>
  <p class="govuk-body">Only notifications related to applications submitted by the business unit ID provided will be returned.</p>
  <p class="govuk-body">Notification delivery is ‘at least once’, meaning a specific event at a specific time may result in one or more notifications (i.e. duplicate notifications for the same event).</p>
  <p class="govuk-body">Duplicate events will have the same <code class="x-govuk-code x-govuk-code--inline">event_datetime</code> field and <code class="x-govuk-code x-govuk-code--inline">notification_type</code> which can be used to locate and ignore duplicates when receiving notifications. Notifications will continue to be returned by the endpoint until they are acknowledged.
  </p>
  <h3 class="govuk-heading-s">Acknowledge notifications</h3>
  <p class="govuk-body">Once a notification has been processed by your system, the notification should be acknowledged. To do this, send a list of <code class="x-govuk-code x-govuk-code--inline">notification_ids</code> to the Acknowledge notifications API as a POST request. This will change the status of those notifications to <code class="x-govuk-code x-govuk-code--inline">ACKNOWLEDGED</code>.</p>

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
{{ govukButton({
  text: "Copy Code",
  classes: "govuk-button--secondary copy-code"
}) }}

<div id="code1">

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

</div></div>

<h3 class="govuk-heading-s">Acknowledge notifications request</h3>

`POST /v0/notifications/acknowledge http/1.1`

<div class="code-wrapper">
{{ govukButton({
  text: "Copy Code",
  classes: "govuk-button--secondary copy-code"
}) }}

<div id="code1">

```json
{
  "data": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ]
}
```
</div></div>

<h3 class="govuk-heading-s">Acknowledge notifications response</h3>

<div class="code-wrapper">
{{ govukButton({
  text: "Copy Code",
  classes: "govuk-button--secondary copy-code"
}) }}

<div id="code1">

```json
{
  "data": {
    "acknowledged": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    ]
  }
}
```
</div></div>


</section>
</div>


<div class="govuk-grid-row">
<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">
<h2 class="govuk-heading-m" id="related-apis">Related APIs</h2>
<nav role="navigation" aria-labelledby="subsection-title">
  <ul class="govuk-list govuk-!-font-size-16">
    <li>
      <a class="govuk-body govuk-link" href="/apis/submit-an-application-to-change-the-land-register">Submit an application to change the Land Register</a>
    </li>
    <li>
      <a class="govuk-body govuk-link" href="/apis/application-information">Application information </a>
    </li>
    <li>
      <a class="govuk-body govuk-link" href="/apis/send-a-document">Send a document </a>
    <li>
      <a class="govuk-body govuk-link" href="/apis/submit-an-application">Submit an application </a>
    </li>
    <li>
      <a class="govuk-body govuk-link govuk-!-font-weight-bold" href="/find-a-service-api">More <span class="govuk-visually-hidden">in Subsection</span></a>
    </li>
  </ul>
</nav>
</div>
