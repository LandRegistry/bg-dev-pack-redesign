---
layout: guidance

title: Attach a document API technical guide
description: Use this service to attach additional documents to an existing application. 

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
    text: 'How to use the Attach a document API'
    href: '#how-to-use-the-attach-a-document-api'
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

Before attaching a document to an application, it must be uploaded. For this step, read the [Send a document API technical guide](/apiss/send-a-document/technical-guide). 

To attach an uploaded document to an existing application, make an HTTP POST request to the attach document endpoint.  


### Attach the document

The body of the request contains:  

- the id of the document attached to the application. The document id is retrieved when uploading the document to be attached 

- the certification statement type. This must be one of `CERTIFIED`, `CERTIFIED_BY_ANOTHER`, or `NOT_CERTIFIED` 

Once the request to attach a document has been validated, an empty ‘202 Accepted’ response will be returned. If validation fails, a ‘400’ response will be returned containing details of the error. 

After the request has been accepted, document attachment begins. Once this completes (successfully or otherwise) a notification will be sent. 


### Notifications

Once the document attachment process finishes, notifications will be available about the status of the attached document via the [Notifications API](apis/notifications). Notifications may include: 

- `application.document-success` - the document has successfully been attached to the application 

- `application.document-failed` - the document failed to attach to the application 



</section>
<section>

## Validation rules {.govuk-heading-m}

To pass validation, the provided application id must exist in HMLR's system. If the application is not found, a ‘HTTP 404’ response will be returned. 

The application must also be in a pending state. It must not have been completed or cancelled. 

Business unit and customer ids are not provided in the request directly but are computed when sending the request. The ids must match those on the application the document is being attached to. If either id values do not match the values on the application, a ‘HTTP 400’ response will be returned. 

</section>
<section>

## Example requests and responses {.govuk-heading-m}

### Attach a document {.govuk-heading-s}

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

Upon successful validation, this request will return an empty 202 Accepted response.  

If the application is not found, a 404 response will be returned:  

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{  

  "errors": [  

    {  

      “type”: “OC200”,  

      “detail”: “Order creation request not found in the system for request id ‘application-id’”,  

      “pointer”: null  

    }  

  ]  

}    
```
</div>

If the application has already been completed or cancelled, a 400 response will be returned:

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{  

  "errors ": [  

    {  

      “type”: “OC036”,  

      “detail”: “Application status is not PENDING”,  

      “pointer”: null  

    }  

  ]  

}     
```
</div>

Attach a document success notification
<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{  

  "data": [  

    {  

      "notification_id": "7788bfb3-02f2-4c9b-be58-94e9df010ac8",  

      "created_datetime": "2025-02-25T16:17:19.120585661Z",  

      "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/document-success.json",  

      "notification_type": "application.document-success",  

      "subject_type": "APPLICATION",  

      "subject": "3d4b51cf-76ab-40ad-9b09-099323034adf",  

      "event_datetime": "2025-02-20T09:06:29.120585661Z",  

      "status": "NEW",  

      "payload": {  

        "data": {  

          "attachment_id": 123  

        }  

      }  

    }  

  ]  

}      
```
</div>

Attach a document failed notification
<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{  

  "data": [  

    {  

      "notification_id": "7788bfb3-02f2-4c9b-be58-94e9df010ac8",  

      "created_datetime": "2025-02-25T16:17:19.120585661Z",  

      "payload_schema": " https://landregistry.github.io/bgtechdoc/schemas/v1/application/document-failed.json ",  

      "notification_type": " application.document-failed",  

      "subject_type": "APPLICATION",  

      "subject": "3d4b51cf-76ab-40ad-9b09-099323034adf",  

      "event_datetime": "2025-02-20T09:06:29.120585661Z",  

      "status": "NEW",  

      "payload": {  

        "data": {  

          "failure_reason": "An error occurred"  

        }  

      }  

    }  

  ]  

}     
```
</div>

</section>
