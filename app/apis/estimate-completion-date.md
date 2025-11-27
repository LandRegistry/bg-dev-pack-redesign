---
title: Estimated completion date
layout: devpack-old.njk
sectionKey: Estimated Completion Date
breadcrumb: false
eleventyNavigation:
    key: estimated-completion-date
    parent: apis
    hide: true
---

---
## Overview

The Estimated Completion Date (ECD) is a date by which the application is likely to be completed. It is not based on the individual application but is an estimate of when the majority (90%) of that application type will be completed. 

In order to retain parity with our Portal customer experience, we require that anyone integrating with this service refer to the estimated completion timeframes which can be found at [https://www.gov.uk/guidance/hm-land-registry-estimated-completion-timeframes](https://www.gov.uk/guidance/hm-land-registry-estimated-completion-timeframes). We also see benefit in end users being familiar with the above URL, the insights provided are likely to reduce the need for customer contact. Therefore we also ask that you make your customers aware of the above URL.

The ECD:

- Is calculated on and from the day an application is received by HMLR.
- May take up to an hour to be displayed after application submission.
- Is updated every 30 calendar days until the application is completed or cancelled.
- Is updated if HMLR correspondence is issued (first item of correspondence only).

---

## Application Types

To use the ECD service you will need to know the application reference of the application you wish to find out the ECD for. If you do not know the application reference, please use the [application enquiry](../application_enquiry/index.html) service to obtain this.

This service is for applications that change the register i.e. register create and register update applications only. This is denoted by the format of the application reference (you may also see this referred to as the ABR or HMLR reference):

`A999AAA` or `AAXXXXX`

Where:
`A = [A-Z]`
`9 = [0-9]`
`X = [0-9A-F]`

---

## Process Flow

To request the Estimated Completion Date of an application, you will need to input the Application Reference into your Case Management Software:

### Input

- Login details
- Application reference

### Output

- Application reference
- Application status
- Application priority date
- Estimated completion date status
- Estimated completion date
- Note: refer to the OpenAPI specification for further details. See [link](openapi.html)

### Process Flow Diagram

<div style="padding-bottom: 15px">
  <a href="/assets/images/estimated_completion_date/validation_diagram.png" target="_blank" >
    <img src="/assets/images/estimated_completion_date/validation_diagram.png" style="width:700px;" alt="Estimate Completion Date Service version 1 flow diagram" title="Clicking this image will open the image in a new tab">
  </a>
</div>

---

## Service Working Hours

This service is available 24/7.

---

## Access Control
To use this service you will need to be an existing Business Gateway user. You will also need to ensure that users have at least one of the following access role codes/collection IDs:
- L1, L2, L3, WM1, WM2, WM5, C4, VS1, Z1, Z2

If you would like to integrate with this service you can request access at
[https://www.gov.uk/guidance/apply-for-hm-land-registry-business-e-services](https://www.gov.uk/guidance/apply-for-hm-land-registry-business-e-services).

---

## Rate Limiting

See [Rest Rate Limiting](/rest/get_started/rate_limiting.html)

---

## Schemas

<div style="padding-bottom: 15px">
  <div style="float:left; padding-right: 15px">
    <img src="/assets/images/doc_thumbnail.png" alt="A Generic document thumbnail image">
  </div>
  <div >
    <p><a href="openapi.html" class="govuk-!-font-size-24" id="openapi-yaml">OpenAPI Schema</a></p>
    <p><span class="govuk-body govuk-!-font-size-14" >YAML</span><br>
      This file may not be suitable for users of assistive technology.</p>
    <p><a href="../../documents/estimated_completion_date/openapi.yaml"  class="govuk-!-font-size-19" download >Download</a></p>
  </div>
</div>

---

## Error and Status Codes

When developing for exception handling, use the HTTP codes in the table. The error codes listed are subject to change.

<table class="govuk-table" cellpadding="10">
  <caption>Error and HTTP Codes</caption>
  <thead class="govuk-table__head">
      <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header govuk-!-font-size-14">HTTP code</th>
          <th scope="col" class="govuk-table__header govuk-!-font-size-14">Title</th>
          <th scope="col" class="govuk-table__header govuk-!-font-size-14">Error code</th>
          <th scope="col" class="govuk-table__header govuk-!-font-size-14">Detail</th>
      </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell govuk-!-font-size-14">400</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Parameter is invalid</td>
      <td class="govuk-table__cell govuk-!-font-size-14">BG40001</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Application Reference has an invalid format</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell govuk-!-font-size-14">401</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Unauthorized</td>
      <td class="govuk-table__cell govuk-!-font-size-14">BG40004</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Invalid credentials or account is not active</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell govuk-!-font-size-14">403</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Forbidden</td>
      <td class="govuk-table__cell govuk-!-font-size-14">BG40005</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Incorrect user role or organisation is not permitted</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell govuk-!-font-size-14">404</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Application reference not found</td>
      <td class="govuk-table__cell govuk-!-font-size-14">BG40002</td>
      <td class="govuk-table__cell govuk-!-font-size-14">The Application reference provided does not exist</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell govuk-!-font-size-14">429</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Rate Limit Exceeded</td>
      <td class="govuk-table__cell govuk-!-font-size-14">BG40006</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Too many requests, please wait and try again</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell govuk-!-font-size-14">500</td>
      <td class="govuk-table__cell govuk-!-font-size-14">An error has occurred</td>
      <td class="govuk-table__cell govuk-!-font-size-14">BG50001</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Internal server error</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell govuk-!-font-size-14">504</td>
      <td class="govuk-table__cell govuk-!-font-size-14">Internal service timeout</td>
      <td class="govuk-table__cell govuk-!-font-size-14">BG50004</td>
      <td class="govuk-table__cell govuk-!-font-size-14">The gateway has timed out</td>
    </tr>
  </tbody>
</table>

---

## Customer Test Stubs

### Customer Test Endpoint

The test environment can be accessed at:

`https://bgtest.landregistry.gov.uk/bg2test/api/v1/applications/{application_reference}/estimate-completion-date`

Where `{application_reference}` is replaced by the application reference you need to use.

This requires a customer test certificate (this is different to the production client certificates)

### Scenarios when ECD is returned

Scenario 1 - Application reference is valid and matches an application. ECD is provided.

ABR: X000XXX

<pre><code>
{
    "data": {
        "application_reference": "X000XXX",
        "application_status": "RECEIVED",
        "application_priority_date": "20/08/2021",
        "estimated_completion_date_status": "AVAILABLE",
        "estimated_completion_dates": [
            {
              "date": "17/03/2023",
              "probability": 0.9
            }
        ]
    }
}
</code></pre>

Scenario 2 - Application reference is valid, application is delayed. ECD is provided.
ABR: X001XXX

<pre><code>
{
    "data": {
        "application_reference": "X001XXX",
        "application_status": "DELAYED",
        "application_priority_date": "19/01/2023",
        "estimated_completion_date_status": "AVAILABLE",
        "estimated_completion_dates": [
            {
              "date": "13/05/2024",
              "probability": 0.9
            }
        ]
    }
}
</code></pre>

### Scenarios when ECD is not returned

Scenario 3 - Application reference is valid, application is received. ECD status is exceeded.<br>
ABR: X002XXX

<pre><code>
{
    "data": {
        "application_reference": "X002XXX",
        "application_status": "RECEIVED",
        "application_priority_date": "12/02/2022",
        "estimated_completion_date_status": "EXCEEDED"
    }
}
</code></pre>

Scenario 4 - Application reference is valid and matches an application. ECD is not yet calculated.
ABR: X003XXX

<pre><code>
{
    "data": {
        "application_reference": "X003XXX",
        "application_status": "RECEIVED",
        "application_priority_date": "20/04/2022",
        "estimated_completion_date_status": "CALCULATING"
    }
}
</code></pre>

Scenario 5 - Application reference is valid and matches a cancelled application. ECD status is unavailable.
ABR: X004XXX

<pre><code>
{
    "data": {
        "application_reference": "X004XXX",
        "application_status": "CANCELLED",
        "application_priority_date": "23/08/2022",
        "estimated_completion_date_status": "UNAVAILABLE"
    }
}
</code></pre>

### Client-side error scenarios

Scenario 6 - Application reference is invalid.
ABR: 005XXXX

<pre><code>
{
    "errors": [
        {
          "code": "BG40001",
          "detail": "Application reference has an invalid format.",
          "status": "400",
          "trace_id": "c62e9b3f-e523-4f04-a941-c6cf0d60c080",
          "title": "parameter is invalid."
        }
    ]
}
</code></pre>

Scenario 7 - Application reference is valid but does not match a HMLR application.
ABR: X006XXX

<pre><code>
{
    "errors": [
        {
          "code": "BG40002",
          "detail": "The application provided does not exist.",
          "status": "404",
          "trace_id": "c62e9b3f-e523-4f04-a941-c6cf0d60c080",
          "title": "Application reference not found."
        }
    ]
}
</code></pre>
