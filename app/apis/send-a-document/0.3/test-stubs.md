---
layout: guidance.njk

title: Send a document API test stubs

notlive: true

eleventyNavigation:
    key: test-stubs
    parent: send-a-document

sidenav:
  - theme: Contents
    text: 'Scenario 1: Success'
    href: '#scenario-1'
  - theme: Contents
    text: 'Scenario 2: Invalid Document Type'
    href: '#scenario-2'
  - theme: Contents
    text: 'Scenario 3: Invalid file length (too small)'
    href: '#scenario-3'
  - theme: Contents
    text: 'Scenario 4: Invalid file length (too large)'
    href: '#scenario-4'
  - theme: Contents
    text: 'Scenario 5: Invalid File_SHA256'
    href: '#scenario-5'

versions:
  - value: "0.3"
    text: "v0.3 (latest)"
    selected: true

relatedAPIs:
  - text: Submit an application API
    href: /apis/submit-an-application
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

<section>
  <p class="govuk-body">HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to seewhen developing your own services.</p>
  <p class="govuk-body">Due to technical limitations, these stubs will only allow you to get an upload url. The URL won’t work and the <code class="app-code app-code--inline">PUT</code> endpoint is not stubbed.</p>
  <p class="govuk-body">Base URL: <code class="app-code app-code--inline">https://bgtest.landregistry.gov.uk/bg2test/api</code></p>
  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
</section>
  
<section>
  <h2 id="scenario-1" class="govuk-heading-m">Scenario 1: Success</h2>
  <h3 class="govuk-heading-s">Request</h3>
  <p class="govuk-body">Method: <code class="app-code app-code--inline">POST</code></p>
  <p class="govuk-body">Endpoint: <code class="app-code app-code--inline">/v0/documents/url</code></p>
  <p class="govuk-body">Headers: <code class="app-code app-code--inline">Authorization: &ltany-value&gt</code></p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "document_type": "CHARGE",
    "additional_provider_filter": "string",
    "file_length": 123123,
    "file_sha256": "This is a 44 character string. blah blah bla"
  }
}
```
</div>
  <h3 class="govuk-heading-s">Response</h3>
  <p class="govuk-body">Status: <code class="app-code app-code--inline">200</code></p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "upload_url": "https://www.your-upload-url-would-be-here.com",
    "document_id": "12345678-1234-1234-1234-1234-123456789abc"
  }
}
```
</div>
  <p class="govuk-body">Note: This response body may contain any random UUID.</p>
  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
</section>
    
<section>
  <h2 id="scenario-2" class="govuk-heading-m">Scenario 2: Invalid Document Type</h2>
  <h3 class="govuk-heading-s">Request</h3>
  <p class="govuk-body">Method: <code class="app-code app-code--inline">POST</code></p>
  <p class="govuk-body">Endpoint: <code class="app-code app-code--inline">/v0/documents/url</code></p>
  <p class="govuk-body">Headers: <code class="app-code app-code--inline">Authorization: &ltany-value&gt</code></p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "document_type": "INVALID",
    "additional_provider_filter": "string",
    "file_length": 123123,
    "file_sha256": "This is a 44 character string. blah blah bla"
  }
}
```
</div>
  <div class="govuk-!-padding-bottom-6"></div>
  <h3 class="govuk-heading-s">Response</h3>
  <p class="govuk-body">Status: <code class="app-code app-code--inline">400</code></p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "type": "https://landregistry.github.io/bgtechdoc/problems/global#bad-request",
  "title": "Bad Request",
  "detail": "The request is invalid or malformed.",
  "status": "400",
  "errors": [{
    "type": "L1A_JSON_PARSE_ERROR",
    "detail": "Invalid document_type: 'INVALID'"
  }]
}
```
</div>
  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
</section>
    
<section>
  <h2 id="scenario-3" class="govuk-heading-m">Scenario 3: Invalid file length (too small)</h2>
  <h3 class="govuk-heading-s">Request</h3>
  <p class="govuk-body">Method: <code class="app-code app-code--inline">POST</code></p>
  <p class="govuk-body">Endpoint: <code class="app-code app-code--inline">/v0/documents/url</code></p>
  <p class="govuk-body">Headers: <code class="app-code app-code--inline">Authorization: &ltany-value&gt</code></p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "document_type": "CHARGE",
    "additional_provider_filter": "string",
    "file_length": 0,
    "file_sha256": "This is a 44 character string. blah blah bla"
  }
}
```
</div>
  <div class="govuk-!-padding-bottom-6"></div>
  <h3 class="govuk-heading-s">Response</h3>
  <p class="govuk-body">Status: <code class="app-code app-code--inline">400</code></p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "type": "https://landregistry.github.io/bgtechdoc/problems/global#bad-request",
  "title": "Bad Request",
  "detail": "The request is invalid or malformed.",
  "status": "400",
  "errors": [{
    "type": "L1A_SCHEMA_VALIDATION_ERROR",
    "detail": "There are problems with the JSON provided [must be greater than or equal to 1]"
  }]
}
```
</div>
  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
</section>

<section>
  <h2 id="scenario-4" class="govuk-heading-m">Scenario 4: Invalid file length (too large)</h2>
  <h3 class="govuk-heading-s">Request</h3>
  <p class="govuk-body">Method: <code class="app-code app-code--inline">POST</code></p>
  <p class="govuk-body">Endpoint: <code class="app-code app-code--inline">/v0/documents/url</code></p>
  <p class="govuk-body">Headers: <code class="app-code app-code--inline">Authorization: &ltany-value&gt</code></p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "document_type": "CHARGE",
    "additional_provider_filter": "string",
    "file_length": 419430401,
    "file_sha256": "This is a 44 character string. blah blah bla"
  }
}
```
</div>
  <div class="govuk-!-padding-bottom-6"></div>
  <h3 class="govuk-heading-s">Response</h3>
  <p class="govuk-body">Status: <code class="app-code app-code--inline">400</code></p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "type": "https://landregistry.github.io/bgtechdoc/problems/global#bad-request",
  "title": "Bad Request",
  "detail": "The request is invalid or malformed.",
  "status": "400",
  "errors": [{
    "type": "L1A_SCHEMA_VALIDATION_ERROR",
    "detail": "There are problems with the JSON provided [must be less than or equal to 41943040]"
  }]
}
```
</div>
  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
</section>

<section>
  <h2 id="scenario-5" class="govuk-heading-m">Scenario 5: Invalid File_SHA256</h2>
  <h3 class="govuk-heading-s">Request</h3>
  <p class="govuk-body">Method: <code class="app-code app-code--inline">POST</code></p>
  <p class="govuk-body">Endpoint: <code class="app-code app-code--inline">/v0/documents/url</code></p>
  <p class="govuk-body">Headers: <code class="app-code app-code--inline">Authorization: &ltany-value&gt</code></p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "document_type": "CHARGE",
    "additional_provider_filter": "string",
    "file_length": 123123,
    "file_sha256": "This is less than 44 characters."
  }
}
```
</div>
  <div class="govuk-!-padding-bottom-6"></div>
  <h3 class="govuk-heading-s">Response</h3>
  <p class="govuk-body">Status: <code class="app-code app-code--inline">400</code></p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "type": "https://landregistry.github.io/bgtechdoc/problems/global#bad-request",
  "title": "Bad Request",
  "detail": "The request is invalid or malformed.",
  "status": "400",
  "errors": [{
    "type": "L1A_SCHEMA_VALIDATION_ERROR",
    "detail": "There are problems with the JSON provided [size must be between 44 and 44]"
  }]
}
```
</div>
</section>
