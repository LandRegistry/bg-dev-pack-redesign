---
layout: api-overview.njk

title: Application Information API
description: Use this service to get information about a specific application.

eleventyNavigation:
  key: Application Information API v1.0
  parent: Application Information API

notlive: true

versions:
  - value: "1.0"
    text: "v1.0 (upcoming)"
    selected: true
  - value: "0.3"
    text: "v0.3 (latest)"

relatedAPIs:
  - text: Submit an application to change the Land Register
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Send a document
    href: /apis/send-a-document
  - text: Submit an application
    href: /apis/submit-an-application
  - text: Notifications
    href: /apis/notifications
  - text: Download a document
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold
---
## Overview {.govuk-heading-m}

The Application information API is used to get detailed information about a specific application. This includes:

- the status of an application
- the `application_request_id` used in the request
- an ID for the accepted application, `hmlr_reference`, once accepted (previously known as ABR)
- the priority of the application, `priority_timestamp`, once accepted
- any errors that prevented application submission
- any warnings that did not prevent submission but need to be addressed before a caseworker can process the application (otherwise a requisition may occur)
- a list of correspondence records associated with the application including:
  - Completion documents
  - Cancellation documents
  - Requsition documents

This API can be used to get more information after receiving a notification indicating the application has changed. For information about which notifications will be available, visit the notifications section of the [Submit an application](/apis/submit-an-application) API page.

</section>

<section id="view-the-technical-guide">

## View the Technical guide {.govuk-heading-m}

[Technical guide](./technical-guide)

</section>

<section id="view-the-api-specification">

## View the API specification {.govuk-heading-m}

[Web version (opens in new tab)](https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Application-information-API){rel="noreferrer noopener" target="_blank"}

</section>


<section id="how-the-api-works">

## How the API works {.govuk-heading-m}

### Interaction {.govuk-heading-s}

<a target="_blank" href="/assets/images/ApplicationInformation_interaction_diagram.png">
  <img src="/assets/images/ApplicationInformation_interaction_diagram.png" alt="A diagram showing the interaction of the Application Information API.">
</a>

This diagram demonstrates how the Application information API works to support users.

Using their unique application ID (provided via the Submit an application API), a user can request information about a specific application. Examples of the type of information are listed in the overview section.

The HMLR system will respond with the relevant information. The system may also respond by informing users that their application has been accepted onto the day list or if it has failed validation.

### State diagram {.govuk-heading-s}
<a markdown="1" target="_blank" href="/assets/images/ApplicationInformation_State_diagram.png">
  <img alt="A diagram showing how the Application Information API works." src="/assets/images/ApplicationInformation_State_diagram.png">
</a>

The state diagram demonstrates how the validation process works once an application has been submitted.

When the system starts the validation process, there are several potential outcomes which can each trigger a different response. A response may include:

- informing the user that an application has passed validation and has been added to the day list
- informing the user that an application has passed validation but is awaiting priority as the day list is closed. Once the day list reopens, the application will be added
- informing the user that an application has not passed validation. In this case, the system will indicate whether a validation or system error has occurred. The user must correct the error and resubmit the application

</section>

<section id="how-to-test-this-service-api">

##  How to test this API {.govuk-heading-m}
  
HMLR has created a test environment for the Application information API. We’ve also provided example code to demonstrate what you should expect when developing your own services.

<ul class="govuk-list">
  <li>
    <a class="govuk-link" href="./test-stubs">View Application information test stubs.</a>
  </li>
</ul>

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

{{ govukInsetText({
  text: "Please note there are also plans to release a sandbox test environment for developers in the future. The exact release date is to be confirmed."
}) }}

For general testing guidance, visit our [guide to testing](/a-guide-to-testing).

</section>
