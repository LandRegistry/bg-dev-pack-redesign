---
layout: guidance.njk


title: Download a document test stubs

eleventyNavigation:
    key: Download a Document API v1.0 Test stubs
    parent: Download a Document API API v1.0
    hide: true

notlive: true

versions:
  - value: "1.0"
    text: "v1.0 (upcoming)"
    selected: true

relatedAPIs:
  - text: todo
    href: about:blank
  - text: Submit an application to change the Land Register
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Send a document
    href: /apis/send-a-document
  - text: Submit an application
    href: /apis/submit-an-application
  - text: Application information
    href: /apis/application-information
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold

sidenav:
  - theme: Contents
    text: 'Scenario 1: Download a cancellation document'
    href: '#scenario-1'
  - theme: Contents
    text: 'Scenario 2: Download a letter'
    href: '#scenario-2'
  - theme: Contents
    text: 'Scenario 3: Download a register completion sheet'
    href: '#scenario-3'
  - theme: Contents
    text: 'Scenario 4: Download a copy of the register'
    href: '#scenario-4'
---
{% from "govuk/components/button/macro.njk" import govukButton %}
{% from "govuk/components/tabs/macro.njk" import govukTabs %}

{% set redirects %}
<!-- this is here for the parser -->

Status: `200` 

Body: Document binary

{% endset -%}

{% set noRedirects %}
<!-- this is here for the parser -->

Status: `302`

Headers: `Location: <download url>`

{% endset -%}


HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to see when developing your own services.

Base URL: `https://bgtest.landregistry.gov.uk/bg2test/api`

---

<section>

## Scenario 1: Download a cancellation document {.govuk-heading-m #scenario-1}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/documents/can_62523897b09f9a3f380eefd878e7205aac78781cc68383ba79c3b7d42385`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

{{ govukTabs({
  items: [{
    label: "Following Redirects",
    id: "s1-redirects",
    panel: { html: redirects }
  }, {
    label: "Not Following Redirects",
    id: "s1-no-redirects",
    panel: { html: noRedirects }
  }]
}) }}

</section>

---

<section>

## Scenario 2: Download a letter {.govuk-heading-m #scenario-2}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/documents/ltr_6a1756a68fbe29c58fe75e9c7a261dd416692f8a0d916ac63aead8111549`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

{{ govukTabs({
  items: [{
    label: "Following Redirects",
    id: "s2-redirects",
    panel: { html: redirects }
  }, {
    label: "Not Following Redirects",
    id: "s2-no-redirects",
    panel: { html: noRedirects }
  }]
}) }}

</section>

---

<section id="scenario-3">

## Scenario 3: Download a register completion sheet {.govuk-heading-m #scenario-3}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/documents/rcs_efc428e900f2d1501c156e9ec664f2a740749b6689afe61b6bf95440a31a`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

{{ govukTabs({
  items: [{
    label: "Following Redirects",
    id: "s3-redirects",
    panel: { html: redirects }
  }, {
    label: "Not Following Redirects",
    id: "s3-no-redirects",
    panel: { html: noRedirects }
  }]
}) }}

</section>

---

<section id="scenario-4">

### Scenario 4: Scenario 4: Download a copy of the register {.govuk-heading-s #scenario-4}
### Request {.govuk-heading-s}

Method: `GET`

Endpoint: `/v1/documents/reg_7ea12372179f1ae9d80fefec38cb7ff6b42672c49a0c292827434c848038`

Headers: `Authorization: <any-value>`

### Response {.govuk-heading-s}

{{ govukTabs({
  items: [{
    label: "Following Redirects",
    id: "s4-redirects",
    panel: { html: redirects }
  }, {
    label: "Not Following Redirects",
    id: "s4-no-redirects",
    panel: { html: noRedirects }
  }]
}) }}

</section>

