---
layout: guidance.njk

title: Send a document API test stubs

eleventyNavigation:
  key: Send a Document API v0.3 Test stubs
  parent: Send a Document API v0.3

notlive: true

versions:
  - value: "1.0"
    text: "v1.0 (latest)"
  - value: "0.3"
    text: "v0.3"
    selected: true

relatedAPIs:
  - text: Submit an application to change the Land Register
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Submit an application
    href: /apis/submit-an-application
  - text: Application information
    href: /apis/application-information
  - text: Notifications
    href: /apis/notifications
  - text: Download a document
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold

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
---
{% from "govuk/components/button/macro.njk" import govukButton %}

<section>

HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to seewhen developing your own services.

Due to technical limitations, these stubs will only allow you to get an upload url. The URL won’t work and the `PUT` endpoint is not stubbed.

Base URL: `https://bgtest.landregistry.gov.uk/bg2test/api`

</section>

--- {.govuk-section-break--l}
  
<section>

## Scenario 1: Success {.govuk-heading-m #scenario-1}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v0/documents/url`

Headers: `Authorization: <any-value>`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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
  
### Response {.govuk-heading-s}

Status: `200`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "upload_url": "https://www.your-upload-url-would-be-here.com",
    "document_id": "12345678-1234-1234-1234-1234-123456789abc"
  }
}
```
</div>

Note: This response body may contain any random UUID.

</section>

--- {.govuk-section-break--l}

<section>

## Scenario 2: Invalid Document Type {.govuk-heading-m #scenario-2}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v0/documents/url`

Headers: `Authorization: <any-value>`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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

### Response {.govuk-heading-s}

Status: `400`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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

</section>

--- {.govuk-section-break--l}

<section>

## Scenario 3: Invalid file length (too small) {.govuk-heading-m #scenario-3}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v0/documents/url`

Headers: `Authorization: <any-value>`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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

### Response {.govuk-heading-s}

Status: `400`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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

</section>

--- {.govuk-section-break--l}

<section>

## Scenario 4: Invalid file length (too large) {.govuk-scenario-m #scenario-4}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v0/documents/url`

Headers: `Authorization: <any-value>`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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

### Response {.govuk-heading-s}

Status: `400`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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

</section>

--- {.govuk-section-break--l}

<section>

## Scenario 5: Invalid File_SHA256 {.govuk-heading-m #scenario-5}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v0/documents/url`

Headers: `Authorization: <any-value>`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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

### Response {.govuk-heading-s}

Status: `400`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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
