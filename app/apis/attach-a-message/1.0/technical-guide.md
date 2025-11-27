---
layout: guidance

title: Attach a message API technical guide
description: Use this service to attach text messages to an existing application

eleventyNavigation:
  key: Attach a message API v1.0 technical guide
  parent: Attach a message API v1.0

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
  - text: Attach a document API
    href: /apis/attach-a-document
  - text: Download a document API
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold

sidenav:
  - theme: Contents
    text: 'How to use the Attach a message API'
    href: '#how-to-use-the-attach-a-message-api'
  - theme: Contents
    text: 'Validation rules'
    href: '#validation-rules'
  - theme: Contents
    text: 'Example requests and responses'
    href: '#example-requests-and-responses'
---
{% from "govuk/components/button/macro.njk" import govukButton %}

<section>

## How to use the Attach a message API {.govuk-heading-m}
To attach a message to an existing application, make an HTTP POST request to the attach message endpoint.  

The body of the request contains:  

- the message (text) to be attached to the application 

Once the request to attach a message has been validated, an empty ‘202 Accepted’ response will be returned on success. If validation fails, a ‘400’ response will be returned containing details of the error. 

After the request has been accepted, message attachment begins. Once this completes (successfully or otherwise) a notification will be sent.  

### Notifications
Once the message attachment process finishes, notifications will be available from the [Notifications API](apis/notifications) about the status of the attached message: 

- `application.message-success` - the message has successfully been attached to the application 

- `application.message-failed` - the message failed to attach to the application 

</section>
<section>

## Validation rules {.govuk-heading-m}

To pass validation, the provided application id must exist in HMLR's system. If the application is not found, a ‘HTTP 404’ response will be returned. 

The application must also be in a pending state. It must not have been completed or cancelled. 

Business unit and customer ids are not provided in the request directly but are computed when sending the request. The ids must match those on the application the message is being attached to. If either id values do not match the values on the application, a ‘HTTP 400’ response will be returned. 

The message being attached must be no more than 4034 characters. 

</section>
<section>

## Example requests and responses {.govuk-heading-m}

### Attach a message {.govuk-heading-s}
<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{  

  "data": {  

    "message_text": "This is a message!"   

}   
```
</div>

Upon successful validation, this request will return an empty 202 Accepted response.  

If the application is not found, a 404 response will be returned:  

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{  

  "errors ": [  

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

Attach a message status notification

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{  

  "errors ": [  

    {  

  "data": [  

    {  

      "notification_id": "7788bfb3-02f2-4c9b-be58-94e9df010ac8",  

      "created_datetime": "2025-02-25T16:17:19.120585661Z",  

      "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/message-success.json",  

      "notification_type": "application.message-success",  

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

Attach a message success notification

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{  

  "data": [  

    {  

      "notification_id": "7788bfb3-02f2-4c9b-be58-94e9df010ac8",  

      "created_datetime": "2025-02-25T16:17:19.120585661Z",  

      "payload_schema": " https://landregistry.github.io/bgtechdoc/schemas/v1/application/message-failed.json ",  

      "notification_type": " application.message-failed",  

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
