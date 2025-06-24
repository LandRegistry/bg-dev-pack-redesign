---
layout: page
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">
      Application information API technical guide
    </h1>
    <p class="govuk-body-l">Use this service to get information about a specific application.</p>
    </p>
    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span class="govuk-visually-hidden">Warning</span>
        These API endpoints are not currently live.
      </strong>
    </div>
    <aside class="govuk-prototype-kit-common-templates-mainstream-guide-contents-list" role="complementary">
      <nav class="govuk-prototype-kit-common-templates-contents-list" aria-label="Pages in this guide"
        role="navigation">
        <h2 class="govuk-prototype-kit-common-templates-contents-list__title">
          Contents
        </h2>
        <ol class="govuk-prototype-kit-common-templates-contents-list__list">
          <li
            class="govuk-prototype-kit-common-templates-contents-list__list-item govuk-prototype-kit-common-templates-contents-list__list-item--dashed govuk-prototype-kit-common-templates-contents-list__list-item--active">
            <a href="#how-to-use-the-application-information-api">
              How to use the Application information API
            </a>
          </li>
          <li
            class="govuk-prototype-kit-common-templates-contents-list__list-item govuk-prototype-kit-common-templates-contents-list__list-item--dashed">
            <a href="#validation-rules">
              Validation rules
            </a>
          </li>
          <li
            class="govuk-prototype-kit-common-templates-contents-list__list-item govuk-prototype-kit-common-templates-contents-list__list-item--dashed">
            <a href="#example-requests-and-responses">
              Example requests and responses
            </a>
          </li>
        </ol>
      </nav>
    </aside>
  </div>
</div>
<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds govuk-prototype-kit-common-templates-mainstream-guide-body">
    <h2 class="govuk-heading-m" id="how-to-use-the-application-information-api">How to use the Application information
      API</h2>
    <div>
      <p class="govuk-body">The Application information API is used to get detailed information about a specific
        application, using the
        <code style="color: #a71d5d; background-color: #f5f5f5">application_request_id</code>
        returned by the Submit an application API request.
      </p>
      <p class="govuk-body">The status of an application can currently be one of the following:</p>
      <ul class="govuk-list govuk-list--bullet">
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">VALIDATING</code>
          - HM Land Registry is still processing the application, and it has not yet been added to the day list
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">VALIDATION_FAILED</code>
          - The application has not been added to the day list due to errors during validation. The errors found are
          included in the errors section of the response
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">ACCEPTED_AWAITING_PRIORITY</code>
          - The application has passed validation but has not yet been added to the day list as it is currently closed.
          The application will be added to the day list and moved to an
          <code style="color: #a71d5d; background-color: #f5f5f5">ACCEPTED_PRIORITY_PROTECTED</code>
          state when the day list reopens
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">ACCEPTED_PRIORITY_PROTECTED</code>
          - The application has been accepted onto the day list, and has priority
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">SYSTEM_ERROR</code>
          - The application has not been added to the day list due to an HMLR system error. The request should be
          retried, or the support team contacted
        </li>
      </ul>
    </div>
    <div>
      <p class="govuk-body">This API will always return an HTTP 200 response for a valid request, regardless of the
        status of the application.</p>
      <h2 class="govuk-heading-m" id="validation-rules">Validation rules</h2>
      <div>
        <p class="govuk-body">There are no validation rules for implementing this API.</p>
        <h2 class="govuk-heading-m" id="example-requests-and-responses">Example requests and responses</h2>
        <h3 class="govuk-heading-s"><code>GET /v0/applications/{id}/status</code> - VALIDATING status</h3>
        <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "status": "validating",
      "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715"
    }
  }
</code>
</pre>
        <div class="govuk-!-padding-bottom-3"></div>
        <h3 class="govuk-heading-s"><code>GET /v0/applications/{id}/status</code> - ACCEPTED_PRIORITY_PROTECTED status
        </h3>
        <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "status": "ACCEPTED_PRIORITY_PROTECTED",
      "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
      "hmlr_reference": "AB1234",
      "priority_timestamp": "2024-09-25T18:18:49.478Z",
      "warnings": [
        "You must upload document X"
      ]
    }
  }
</code>
</pre>
        <div class="govuk-!-padding-bottom-3"></div>
        <h3 class="govuk-heading-s"><code>GET /v0/applications/{id}/status</code> - VALIDATION_FAILED status</h3>
        <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "status": "VALIDATION_FAILED",
      "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715",
      "errors": [
        {
          "type": "OC018",
          "detail": "Failed to get document '00001'.",
          "pointer": null
        }
      ]
    }
  }
</code>
</pre>
        <div class="govuk-!-padding-bottom-3"></div>
        <h3 class="govuk-heading-s"><code>GET /v0/applications/{id}/status</code> - ACCEPTED_AWAITING_PRIORITY status
        </h3>
        <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "status": "accepted_awaiting_priority",
      "application_request_id": "3e4f6da2-ada7-4081-957c-b23542466715"
    }
  }
</code>
</pre>
      </div>
    </div>
  </div>
  <div class="govuk-grid-column-one-third">
    <aside class="govuk-prototype-kit-common-templates-related-items" role="complementary">
      <h2 class="govuk-heading-m" id="related-apis">
        Related APIs
      </h2>
      <nav role="navigation" aria-labelledby="subsection-title">
        <ul class="govuk-list govuk-!-font-size-16">
          <li>
            <a class="govuk-body govuk-link" href="/apis/submit-an-application-to-change-the-land-register">
              Submit an application to change the Land Register
            </a>
          </li>
          <li>
            <a class="govuk-body govuk-link" href="/apis/send-a-document">
              Send a document
            </a>
          </li>
          <li>
            <a class="govuk-body govuk-link" href="/apis/submit-an-application">
              Submit an application
            </a>
          </li>
          <li>
          </li>
          <li>
            <a class="govuk-body govuk-link" href="/apis/notifications">
              Notifications
            </a>
          </li>
          <li>
            <a class="govuk-body govuk-link govuk-!-font-weight-bold" href="/find-a-service-api">
              More <span class="govuk-visually-hidden">in Subsection</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</div>