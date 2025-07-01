---
layout: page
title: Application information API technical guide
noheader: true

eleventyNavigation:
  key: application-information-technical-guide
  parent: application-information-api

breadcrumb: false
spy: true
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

<section class="govuk-grid-row">

<h1 class="govuk-heading-xl">
  Application information API technical guide
</h1>
<p class="govuk-body-l">Use this service to get information about a specific application.</p>
<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">Warning</span>
    These API endpoints are not currently live.
  </strong>
</div>

</section>

<section class="govuk-grid-row">

<h2 class="govuk-heading-m" id="how-to-use-the-application-information-api">How to use the Application information API</h2>
<p class="govuk-body">The Application information API is used to get detailed information about a specific application, using the <code class="x-govuk-code x-govuk-code--inline">application_request_id</code> returned by the Submit an application API request.</p>
<p class="govuk-body">The status of an application can currently be one of the following:</p>
<ul class="govuk-list govuk-list--bullet">
  <li>
    <code class="x-govuk-code x-govuk-code--inline">VALIDATING</code> - HM Land Registry is still processing the application, and it has not yet been added to the day list
  </li>
  <li>
    <code class="x-govuk-code x-govuk-code--inline">VALIDATION_FAILED</code> - The application has not been added to the day list due to errors during validation. The errors found are included in the errors section of the response
  </li>
  <li>
    <code class="x-govuk-code x-govuk-code--inline">ACCEPTED_AWAITING_PRIORITY</code> - The application has passed validation but has not yet been added to the day list as it is currently closed. The application will be added to the day list and moved to an <code class="x-govuk-code x-govuk-code--inline">ACCEPTED_PRIORITY_PROTECTED</code> state when the day list reopens
  </li>
  <li>
    <code class="x-govuk-code x-govuk-code--inline">ACCEPTED_PRIORITY_PROTECTED</code> - The application has been accepted onto the day list, and has priority
  </li>
  <li>
    <code class="x-govuk-code x-govuk-code--inline">SYSTEM_ERROR</code> - The application has not been added to the day list due to an HMLR system error. The request should be retried, or the support team contacted
  </li>
</ul>
<p class="govuk-body">This API will always return an HTTP 200 response for a valid request, regardless of the status of the application.</p>

</section>

<section class="govuk-grid-row">

<h2 class="govuk-heading-m" id="validation-rules">Validation rules</h2>
<p class="govuk-body">There are no validation rules for implementing this API.</p>

</section>

<section class="govuk-grid-row">

<h2 class="govuk-heading-m" id="example-requests-and-responses">Example requests and responses</h2>
<h3 class="govuk-heading-s"><code>GET /v0/applications/{id}/status</code> - VALIDATING status</h3>

<div class="code-wrapper">
{{ govukButton({
  text: "Copy Code",
  classes: "govuk-button--secondary copy-code"
}) }}

<div id="code1">

```json
{
  "data": {
    "status": "validating",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715"
  }
}
```
</div></div>

<h3 class="govuk-heading-s"><code>GET /v0/applications/{id}/status</code> - ACCEPTED_PRIORITY_PROTECTED status</h3>

<div class="code-wrapper">
{{ govukButton({
  text: "Copy Code",
  classes: "govuk-button--secondary copy-code"
}) }}

<div id="code2">

```json
{
  "data": {
    "status": "ACCEPTED_PRIORITY_PROTECTED",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
    "hmlr_reference": "AB1234",
    "priority_timestamp": "2024-09-25T18:18:49.478Z",
    "warnings": [
      "You must upload document X"
    ]
  }
}
```
</div></div>

<h3 class="govuk-heading-s"><code>GET /v0/applications/{id}/status</code> - VALIDATION_FAILED status</h3>

<div class="code-wrapper">
{{ govukButton({
  text: "Copy Code",
  classes: "govuk-button--secondary copy-code"
}) }}

<div id="code3">

```json
{
  "data": {
    "status": "VALIDATION_FAILED",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
    "errors": [
      {
        "type": "OC018",
        "detail": "Failed to get document '00001'.",
        "pointer": null
      }
    ]
  }
}
```
</div></div>

<h3 class="govuk-heading-s"><code>GET /v0/applications/{id}/status</code> - ACCEPTED_AWAITING_PRIORITY status</h3>

<div class="code-wrapper">
{{ govukButton({
  text: "Copy Code",
  classes: "govuk-button--secondary copy-code"
}) }}

<div id="code4">

```json
{
  "data": {
    "status": "accepted_awaiting_priority",
    "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715"
  }
}
```

</div></div>
</section>

<section class="govuk-grid-row">
<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

<h2 class="govuk-heading-m" id="related-apis">Related APIs</h2>
<nav role="navigation" aria-labelledby="subsection-title">
  <ul class="govuk-list govuk-!-font-size-16">
    <li>
      <a class="govuk-body govuk-link" href="/apis/submit-an-application-to-change-the-land-register">
        Submit an application to change the Land Register
      </a>
    </li>
    <li>
      <a class="govuk-body govuk-link" href="/apis/send-a-document">
        Send a document
      </a>
    </li>
    <li>
      <a class="govuk-body govuk-link" href="/apis/submit-an-application">
        Submit an application
      </a>
    </li>
    <li>
    </li>
    <li>
      <a class="govuk-body govuk-link" href="/apis/notifications">
        Notifications
      </a>
    </li>
    <li>
      <a class="govuk-body govuk-link govuk-!-font-weight-bold" href="/find-a-service-api">
        More <span class="govuk-visually-hidden">in Subsection</span>
      </a>
    </li>
  </ul>
</nav>
</section>
