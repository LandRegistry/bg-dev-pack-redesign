---
layout: guidance

title: Attach a document Technical guide
description: Use this service to attach a document to a submitted order.

eleventyNavigation:
  key: Attach a document API v1.0 Technical guide
  parent: Attach a document API v1.0

notlive: false

versions:
  - value: "1.0"
    text: "v1.0"
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
  - text: Attach a message API
    href: /apis/attach-a-message
  - text: Download a document API
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold

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

<section>

## How to use the Attach a Document API {.govuk-heading-m}

### Upload a document to be attached

Before attaching a document to an application, it must be uploaded. For this step, see the [Send a Document API](/apis/send-a-document).

### Attach the document

To attach a document to an existing application, make an HTTP POST request to the attach document endpoint. 

The body of the request contains: 

- The id of the document that will be attached to the application. The document id is retrieved when uploading the document to be attached.
- The certification statement type. This must be one of `CERTIFIED`, `CERTIFIED_BY_ANOTHER`, or `NOT_CERTIFIED`

Once the request to attach a document has been validated, an empty 202 Accepted response will be returned on success. If validation fails, a 400 response will be returned containing details of the error.

After the request has been accepted, document attachment begins. Once this completes (successfully or otherwise) a notification will be sent.


### Notifications

Note: For general information, view the [notifications API page](/apis/notifications).

==Once the document attachment process finishes, notifications will be available from the notifications API about the status of the attached document:

- application.document-success - the document has successfully been attached to the application
- application.document-failed - the document failed to attach to the application




</section>
<section>

## Validation rules {.govuk-heading-m}

### Application exists

The provided application id must exist in HMLR's systems. If the application is not found, a HTTP 404 response is returned.

### Application Status

The application the document is being attached to must be in a pending state. That is, it must not have been completed or cancelled.

Business Unit ID and Customer ID validation

The business unit id and customer id are not provided in the request directly but are computed when sending the request. The customer id and business unit id and customer id must match those on the application a document is being attached to.

If either the business unit id or customer id values do not match the values on the application, a HTTP 400 response is returned.


</section>
<section>

## Example requests and responses {.govuk-heading-m}

### Attach a document {.govuk-heading-s}

<code>GET /v1/applications/{id}/{}</code>

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "document_id": "38e7eba4-35bf-41a2-a7a2-7aaf2faa2b3b",
    "certification_statement_type": "NOT_CERTIFIED"
  }
}
```
</div>

</section>
