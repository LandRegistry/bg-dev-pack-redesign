---
layout: guidance

title: Download a document API technical guide
description: Use this service to download documents provided by HM Land Registry.

eleventyNavigation:
  key: Download a Document v1.0 Technical guide
  parent: Download a Document v1.0

notlive: false

versions:
  - value: "1.0"
    text: "v1.0 (upcoming)"
    selected: true

relatedAPIs:
  - text: Submit an application to change the Land Register API
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Send a document API
    href: /apis/send-a-document
  - text: Submit an application API
    href: /apis/submit-an-application
  - text: Application information API
    href: /apis/application-information
  - text: Notifications APi
    href: /apis/notifications
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold

sidenav:
  - theme: Contents
    text: 'How to use download a document'
    href: '#how-to-use-download-a-document'
  - theme: Contents
    text: 'Validation rules'
    href: '#validation-rules'
  - theme: Contents
    text: 'Example requests and responses'
    href: '#example-requests-and-responses'
---
{% from "govuk/components/button/macro.njk" import govukButton %}

<section>

## How to use the Download a document API {.govuk-heading-m}

### Obtain a `download id` {.govuk-heading-s}

Before you can use this service, you will need to obtain a `download id`. Currently the only way to do this is to submit an application to change the Land Register. This process will result in one of the following types of document being generated:

- requisition
- cancellation
- completion

The generation of each of these documents would trigger a notification to be sent via the [Notifications API](/apis/notifications), which would contain a `download id`. Once this notification is sent, the document will be available for download.

Note: A `download id` may be available in the [Application information API's](/apis/application-information) response before the notification is sent, under the `/correspondences` array. The document is not guaranteed to be available for download until the notification has been issued.

### Downloading a document {.govuk-heading-s}

Once you’ve obtained the `download id` you can use it in a `GET` request to this service. The request is simple and will result in the document binary being returned (as long as your request method allows redirects).

</section>
<section>

## Validation rules {.govuk-heading-m}

There are no validation rules for implementing this API.

</section>
<section>

## Example requests and responses {.govuk-heading-m}

For specific examples of notification payloads produced during application submission, view [Submit an application notifications](/apis/submit-an-application).

### Download a document (redirection enabled) {.govuk-heading-s}

Request

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```sh
curl --method GET \ 
  --url {base_url}/v1/documents/{download id}
  -u {username}:{password}
```
</div>

Response

Status: `200`

Body: document binary

### Download a document (redirection disabled) {.govuk-heading-s}

Request 1

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```sh
curl --method GET \ 
  --url {base_url}/v1/documents/{download id}
  -u {username}:{password}
```
</div>

Response 1

Status: 302

Header: `Location: <download  url>`

Request 2

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```sh
curl --method GET \ 
  --url {download url}
```
</div>

Response 2

Status: 200

Body: document binary

</section>
