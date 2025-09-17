---
layout: guidance.njk

title: Notifications API test stubs

notlive: true

eleventyNavigation:
  key: Notifications API v0.3 test stubs
  parent: Notifications API v0.3

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

versions:
  - value: "0.3"
    text: "v0.3 (latest)"
    selected: true

relatedAPIs:
  - text: Send a document API
    href: /apis/send-a-document
  - text: Application information API
    href: /apis/application-information
  - text: Notifications API
    href: /apis/notifications
  - text: Submit an application to change the land register API
    href: /apis/submit-an-application-to-change-the-land-register
  - text: Download a document API
    href: /apis/download-a-document 
---
{% from "govuk/components/button/macro.njk" import govukButton %}

<p class="govuk-body">HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to see when developing your own services.</p>
<p class="govuk-body">Base URL: <code class="app-code app-code--inline">https://bgtest.landregistry.gov.uk/bg2test/api</code></p>

<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

<section>
<h2 id="scenario-1" class="govuk-heading-m">Scenario 1: Get all notifications</h2>

<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method: <code class="app-code app-code--inline">GET</code></p>
<p class="govuk-body">Endpoint: <code class="app-code app-code--inline">/v0/notifications</code></p>
<p class="govuk-body">Headers: <code class="app-code app-code--inline">Authorization: &lt;any-value&gt;</code></p>

<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status: <code class="app-code app-code--inline">200</code></p>
<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": [
    {
      "notification_id": "{{"{{ID}}"}}",
      "created_datetime": "2024-01-01T12:00:00.000",
      "event_datetime": "2024-01-01T12:00:00.000",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-priority-protected.json",
      "notification_type": "APPLICATION_ACCEPTED_ON_DAY_LIST",
      "subject_type": "LAND_REGISTER_APPLICATION",
      "subject": "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
      "additional_provider_filter": "subUnit1",
      "status": "ACKNOWLEDGED",
      "payload": {
        "data": {
          "hmlr_reference": "ABC456A",
          "status": "ACCEPTED",
          "priority": "2024-09-20T09:56:46"
        }
      }
    },
    {
      "notification_id": "{{"{{ID}}"}}",
      "created_datetime": "2024-01-01T12:00:00.000",
      "event_datetime": "2024-01-01T12:00:00.000",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-priority-protected.json",
      "notification_type": "APPLICATION_ACCEPTED_ON_DAY_LIST",
      "subject_type": "LAND_REGISTER_APPLICATION",
      "subject": "2563940e-ae95-4e7e-9b33-49a6571abdf6",
      "additional_provider_filter": "subUnit1",
      "status": "NEW",
      "payload": {
        "data": {
          "hmlr_reference": "ABC456B",
          "status": "ACCEPTED",
          "priority": "2024-09-20T09:56:46"
        }
      }
    },
    {
      "notification_id": "{{"{{ID}}"}}",
      "created_datetime": "2024-01-01T12:00:00.000",
      "event_datetime": "2024-01-01T12:00:00.000",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/validation-failed.json",
      "notification_type": "APPLICATION_VALIDATION_FAILED",
      "subject_type": "LAND_REGISTER_APPLICATION",
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
<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
<section>
<h2 id="scenario-2" class="govuk-heading-m">Scenario 2: Get all new notifications</h2>

<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method: <code class="app-code app-code--inline">GET</code></p>
<p class="govuk-body">Endpoint: <code class="app-code app-code--inline">/v0/notifications?status=NEW</code></p>
<p class="govuk-body">Headers: <code class="app-code app-code--inline">Authorization: &ltany-value&gt</code></p>
<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status: <code class="app-code app-code--inline">200</code></p>

<div class="code-wrapper">

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{ 
  "data": [
    {
      "notification_id": "&#123;&#123;ID&#125;&#125;",
      "created_datetime": "2024-01-01T12:00:00.000",
      "event_datetime": "2024-01-01T12:00:00.000",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-priority-protected.json",
      "notification_type": "APPLICATION_ACCEPTED_ON_DAY_LIST",
      "subject_type": "LAND_REGISTER_APPLICATION",
      "subject": "2563940e-ae95-4e7e-9b33-49a6571abdf6",
      "additional_provider_filter": "subUnit1",
      "status": "NEW",
      "payload": {
        "data": {
          "hmlr_reference": "ABC456B",
          "status": "ACCEPTED",
          "priority": "2024-09-20T09:56:46"
        }
      }
    },
    {
      "notification_id": "&#123;&#123;ID&#125;&#125;",
      "created_datetime": "2024-01-01T12:00:00.000",
      "event_datetime": "2024-01-01T12:00:00.000",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/validation-failed.json",
      "notification_type": "APPLICATION_VALIDATION_FAILED",
      "subject_type": "LAND_REGISTER_APPLICATION",
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
<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
<section>
<h2 id="scenario-3" class="govuk-heading-m">Scenario 3: Get all acknowledged notifications</h2>

<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method: <code class="app-code app-code--inline">GET</code></p>
<p class="govuk-body">Endpoint: <code class="app-code app-code--inline">/v0/notifications?status=ACKNOWLEDGED</code></p>
<p class="govuk-body">Headers: <code class="app-code app-code--inline">Authorization: &ltany-value&gt</code></p>
<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status: <code class="app-code app-code--inline">200</code></p>

<div class="code-wrapper">

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "data": [
    {
      "notification_id": "&#123;&#123;ID&#125;&#125;",
      "created_datetime": "2024-01-01T12:00:00.000",
      "event_datetime": "2024-01-01T12:00:00.000",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-priority-protected.json",
      "notification_type": "APPLICATION_ACCEPTED_ON_DAY_LIST",
      "subject_type": "LAND_REGISTER_APPLICATION",
      "subject": "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
      "additional_provider_filter": "subUnit1",
      "status": "ACKNOWLEDGED",
      "payload": {
        "data": {
          "hmlr_reference": "ABC456A",
          "status": "ACCEPTED",
          "priority": "2024-09-20T09:56:46"
        }
      }
    }
  ]
}
```

</div>
</section>
<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
<section>
<h2 id="scenario-4" class="govuk-heading-m">Scenario 4: Get all with invalid date filter</h2>
<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method:
  <code class="app-code app-code--inline">GET</code>
</p>
<p class="govuk-body">Endpoint:
  <code class="app-code app-code--inline">/v0/notifications?created_after=2020-01-01T00:00:00&created_before=2015-01-01T00:00:00</code>
</p>
<p class="govuk-body">Headers:
  <code class="app-code app-code--inline">Authorization: &ltany-value&gt
    </code>
</p>
<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status:
  <code class="app-code app-code--inline">400</code>
</p>
<div class="code-wrapper">

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
  "instance": "/v0/notifications",
  "code": "400-01"
}
```

</div>
</section>
<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
<section>
<h2 id="scenario-5" class="govuk-heading-m">Scenario 5: Acknowledge notifications</h2>
<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method:
  <code class="app-code app-code--inline">POST</code>
</p>
<p class="govuk-body">Endpoint:
  <code class="app-code app-code--inline">/v0/notifications/acknowledge</code>
</p>
<p class="govuk-body">Headers:
  <code class="app-code app-code--inline">Authorization: &ltany-value&gt
    </code>
</p>
<div class="code-wrapper">

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

<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status:
  <code class="app-code app-code--inline">200</code>
</p>
<div class="code-wrapper">

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
<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
<section>
<h2 id="scenario-6" class="govuk-heading-m">Scenario 6: Application queued notification</h2>
<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method:
  <code class="app-code app-code--inline">GET</code>
</p>
<p class="govuk-body">Endpoint:
  <code
    class="app-code app-code--inline">/v0/notifications?notification_type=APPLICATION_ACCEPTED_QUEUED_FOR_DAY_LIST</code>
</p>
<p class="govuk-body">Headers:
  <code class="app-code app-code--inline">Authorization: &ltany-value&gt
</code>
</p>
<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status:
  <code class="app-code app-code--inline">200</code>
</p>
<div class="code-wrapper">

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "data": [{
    "notification_id": "&#123;&#123;ID&#125;&#125;",
    "created_datetime": "2024-01-01T12:00:00.000",
    "event_datetime": "2024-01-01T12:00:00.000",
    "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-awaiting-priority.json",
    "notification_type": "APPLICATION_ACCEPTED_QUEUED_FOR_DAY_LIST",
    "subject_type": "LAND_REGISTER_APPLICATION",
    "subject": "45454545-2b6d-4b8a-971c-e758b0e8e790",
    "additional_provider_filter": "subUnit1",
    "status": "NEW",
    "payload": {
      "data" : {
        "status": "ACCEPTED_AWAITING_PRIORITY"
      }
    }
  }]
}
```
</div>
</section>
<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
<section>
<h2 id="scenario-7" class="govuk-heading-m">Scenario 7: System error notification</h2>
<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method:
  <code class="app-code app-code--inline">GET</code>
</p>
<p class="govuk-body">Endpoint:
  <code class="app-code app-code--inline">/v0/notifications?notification_type=SYSTEM_ERROR</code>
</p>
<p class="govuk-body">Headers:
  <code class="app-code app-code--inline">Authorization: &ltany-value&gt
</code>
</p>
<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status:
  <code class="app-code app-code--inline">200</code>
</p>
<div class="code-wrapper">

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "data": [{
    "notification_id": "&#123;&#123;ID&#125;&#125;",
    "created_datetime": "2024-01-01T12:00:00.000",
    "event_datetime": "2024-01-01T12:00:00.000",
    "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/system-error.json",
    "notification_type": "SYSTEM_ERROR",
    "subject_type": "LAND_REGISTER_APPLICATION",
    "subject": "45454545-2b6d-4b8a-971c-e758b0e8e790",
    "additional_provider_filter": "subUnit1",
    "status": "NEW",
    "payload": {
      "data" : {
        "status": "SYSTEM_ERROR"
      }
    }
  }]
}
```
</div>
</section>

<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
<section>
<h2 id="scenario-8" class="govuk-heading-m">Scenario 8: Application cancelled notification</h2>
<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method:
  <code class="app-code app-code--inline">GET</code>
</p>
<p class="govuk-body">Endpoint:
  <code
    class="app-code app-code--inline">/v0/notifications?notification_type=APPLICATION_CANCELLED</code>
</p>
<p class="govuk-body">Headers:
  <code class="app-code app-code--inline">Authorization: &ltany-value&gt
</code>
</p>
<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status:
  <code class="app-code app-code--inline">200</code>
</p>
<div class="code-wrapper">

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "data": [{
    "notification_id": "&#123;&#123;ID&#125;&#125;",
    "created_datetime": "2024-01-01T12:00:00.000",
    "event_datetime": "2024-01-01T12:00:00.000",
    "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/application-cancelled.json",
    "notification_type": "APPLICATION_CANCELLED",
    "subject_type": "LAND_REGISTER_APPLICATION",
    "subject": "45454545-2b6d-4b8a-971c-e758b0e8e790",
    "additional_provider_filter": "subUnit1",
    "status": "NEW",
    "payload": {
      "data" : {
        "status": "CANCELLED"
      }
    }
  }]
}
```
</div>
</section>
<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

<section>
<h2 id="scenario-9" class="govuk-heading-m">Scenario 9: Application completed notification</h2>
<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method:
  <code class="app-code app-code--inline">GET</code>
</p>
<p class="govuk-body">Endpoint:
  <code
    class="app-code app-code--inline">/v0/notifications?notification_type=APPLICATION_COMPLETED</code>
</p>
<p class="govuk-body">Headers:
  <code class="app-code app-code--inline">Authorization: &ltany-value&gt
</code>
</p>
<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status:
  <code class="app-code app-code--inline">200</code>
</p>
<div class="code-wrapper">

{{ govukButton({
  text: "Copy code",
  classes: "govuk-button--secondary copy-code"
}) }}

```json
{
  "data": [{
    "notification_id": "&#123;&#123;ID&#125;&#125;",
    "created_datetime": "2024-01-01T12:00:00.000",
    "event_datetime": "2024-01-01T12:00:00.000",
    "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/application-completed.json",
    "notification_type": "APPLICATION_COMPLETED",
    "subject_type": "LAND_REGISTER_APPLICATION",
    "subject": "45454545-2b6d-4b8a-971c-e758b0e8e790",
    "additional_provider_filter": "subUnit1",
    "status": "NEW",
    "payload": {
      "data" : {
        "status": "COMPLETED"
      }
    }
  }]
}
```
</div>
</section>