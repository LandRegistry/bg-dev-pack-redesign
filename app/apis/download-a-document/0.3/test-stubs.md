---
layout: guidance.njk

title: Download a document API test stubs

notlive: true

eleventyNavigation:
  key: Download a document v0.3 test stubs
  parent: Download a document v0.3

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

versions:
  - value: "0.3"
    text: "v0.3 (latest)"
    selected: true

relatedAPIs:
  - text: Send a document API
    href: /apis/send-a-document
  - text: Submit an application API
    href: /apis/submit-an-application
  - text: Notifications API
    href: /apis/notifications
  - text: Submit an application to change the land register API
    href: /apis/submit-an-application-to-change-the-land-register 
---
{% from "govuk/components/button/macro.njk" import govukButton %}


<p class="govuk-body">HMLR does not currently provide a test environment for integrators using our Business Gateway
  APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to see
  when developing your own services.</p>
<p class="govuk-body">Base URL: <code class="x-govuk-code x-govuk-code--inline">https://bgtest.landregistry.gov.uk/bg2test/api</code></p>

<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

<section>
<h3 id="scenario-1" class="govuk-heading-m">Scenario 1: Information of applicaiton with single charge</h2>

<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method: <code class="x-govuk-code x-govuk-code--inline">GET</code></p>
<p class="govuk-body">Endpoint: <code class="x-govuk-code x-govuk-code--inline">/v0/applications/b3ac19be-2b6d-4b8a-971c-e758b0e8e790/information</code></p>
<p class="govuk-body">Headers: <code class="x-govuk-code x-govuk-code--inline">Authorization: &ltany-value&gt</code></p>

<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status: <code class="x-govuk-code x-govuk-code--inline">200</code></p>

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "application_request_id": "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
    "status": "ACCEPTED_PRIORITY_PROTECTED",
    "priority_timestamp": "2024-09-25T18:18:49Z",
    "hmlr_reference": "A123AAA",
    "errors": []
  }
}
```
</div>
</section>

<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

<section>
<h3 id="scenario-2" class="govuk-heading-m">Scenario 2: Information of application with single transfer</h2>

<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method: <code class="x-govuk-code x-govuk-code--inline">GET</code></p>
<p class="govuk-body">Endpoint: <code class="x-govuk-code x-govuk-code--inline">/v0/applications/2563940e-ae95-4e7e-9b33-49a6571abdf6/information</code></p>
<p class="govuk-body">Headers: <code class="x-govuk-code x-govuk-code--inline">Authorization: &ltany-value&gt</code></p>

<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status: <code class="x-govuk-code x-govuk-code--inline">200</code></p>

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "application_request_id": "2563940e-ae95-4e7e-9b33-49a6571abdf6",
    "status": "ACCEPTED_PRIORITY_PROTECTED",
    "priority_timestamp": "2024-09-25T18:18:49Z",
    "hmlr_reference": "B123BBB",
    "errors": []
  }
}
```
</div>
</section>

<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

<section>
<h3 id="scenario-3" class="govuk-heading-m">Scenario 3: Information of application with level 2 validation errors</h2>

<h3 class="govuk-heading-s">Request</h3>
<p class="govuk-body">Method: <code class="x-govuk-code x-govuk-code--inline">GET</code></p>
<p class="govuk-body">Endpoint: <code class="x-govuk-code x-govuk-code--inline">/v0/applications/3be62ad3-c542-452d-975e-6cd18d77196f/information</code></p>
<p class="govuk-body">Headers: <code class="x-govuk-code x-govuk-code--inline">Authorization: &ltany-value&gt</code></p>

<h3 class="govuk-heading-s">Response</h3>
<p class="govuk-body">Status: <code class="x-govuk-code x-govuk-code--inline">200</code></p>

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
