---
title: Application Information API
layout: page.njk
versioned: true

noheader: true

breadcrumb: false
eleventyNavigation:
    key: application-information-api
    parent: apis
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">
      Application information API
    </h1>
    <p class="govuk-body-l">Use this service to get information about a specific application.</p>
    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span class="govuk-visually-hidden">Warning</span>
        These API endpoints are not currently live.
      </strong>
    </div>
    <hr class="govuk-section-break govuk-section-break--visible">
  </div>
</div>
<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible govuk-!-margin-top-0">

  <div class="bg-version-grid">
    <div>
        <h2 class="govuk-heading-m govuk-!-margin-0" id="version-and-status">Version and status</h2>
    </div>
{% from "govuk/components/select/macro.njk" import govukSelect %}{% from "govuk/components/button/macro.njk" import govukButton %}{{ govukSelect({
  id: "version",
  name: "version",
  label: {
      text: "Version and status dropdown",
      classes: "govuk-visually-hidden"
  },
  items: [{
      value: "0.3",
      text: "v0.3 (latest)",
      selected: true
  }],
  formGroup: {
      classes: "version-group govuk-!-margin-0",
      afterInput: {
          html: '<button type="submit" 
          class="govuk-button govuk-!-margin-0" 
          data-module="govuk-button"
          onclick="setVersion();"
          >View</button>'
      }
  }
}) }}
  </div>
  <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">    
    <div>
      <h2 class="govuk-heading-m" id="overview"><br>Overview</h2>
      <p class="govuk-body">The Application information API is used to get detailed information about a specific
        application. This includes:</p>
      <ul class="govuk-list govuk-list--bullet">
        <li>the status of an application</li>
        <li>the <code class="x-govuk-code x-govuk-code--inline">application_request_id</code> used in the
          request</li>
        <li>an ID for the accepted application, <code
            class="x-govuk-code x-govuk-code--inline">hmlr_reference</code>, once accepted (previously known as
          ABR)</li>
        <li>the priority of the application, <code
            class="x-govuk-code x-govuk-code--inline">priority_timestamp</code>, once accepted</li>
        <li>any errors that prevented application submission</li>
        <li>any warnings that did not prevent submission but need to be addressed before a caseworker can process the
          application (otherwise a requisition may occur)</li>
      </ul>
      <p class="govuk-body">This API can be used to get more information after receiving a notification indicating the
        application has changed. For information about which notifications will be available, visit the notifications
        section of the <a class="govuk-body govuk-link" href="/apis/submit-an-application">Submit an application</a> API
        page.</p>
    </div>
    <div>
      <h3 class="govuk-heading-m" id="how-the-service-api-works">How the API works</h3>
      <div class="govuk-!-padding-bottom-3"></div>
      <h4 class="govuk-heading-m">Interaction</h4>
      <div class="govuk-!-padding-bottom-5">
      <a target="_blank" href="/assets/images/ApplicationInformation_interaction_diagram.png"><img src="/assets/images/ApplicationInformation_interaction_diagram.png"
        alt="A diagram showing the interaction of the Application Information API."></a></div>
      <p class="govuk-body">This diagram demonstrates how the Application information API works to support users. </p>
      <p class="govuk-body">Using their unique application ID (provided via the Submit an application API), a user can request information about a specific application. Examples of the type of information are listed in the overview section. </p>
      <p class="govuk-body">The HMLR system will respond with the relevant information. The system may also respond by informing users that their application has been accepted onto the day list or if it has failed validation.</p>
      <h4 class="govuk-heading-m">State diagram</h4>
      <div class="govuk-!-margin-bottom-5">
      <a target="_blank" href="/assets/images/ApplicationInformation_State_diagram.png"><img src="/assets/images/ApplicationInformation_State_diagram.png"
        alt="A diagram showing how the Application Information API works."></a></div>
    </div>
    <div class="govuk-!-padding-bottom-3"></div>
    <p class="govuk-body">The state diagram demonstrates how the validation process works once an application has been submitted.</p>
    <p class="govuk-body">When the system starts the validation process, there are several potential outcomes which can each trigger a different response. A response may include:</p>
    <ul class="govuk-list--bullet">
      <li class="govuk-body">informing the user that an application has passed validation and has been added to the day list</li>
      <li class="govuk-body">informing the user that an application has passed validation but is awaiting priority as the day list is closed. Once the day list reopens, the application will be added</li>
      <li class="govuk-body">informing the user that an application has not passed validation. In this case, the system will indicate whether a validation or system error has occurred. The user must correct the error and resubmit the application</li>
    </ul>
    <div class="govuk-!-padding-bottom-3"></div>
    <h4 class="govuk-heading-s">Application information API</h4>
    <ol class="govuk-list govuk-list--number">
      <li>Using the Application information API, proceed to application information where application details are
        reviewed or processed OR return to receive notifications if not ready to proceed</li>
    </ol>
    <div>
      <h2 class="govuk-heading-m" id="view-the-technical-guide">View the Technical guide</h2>
      <ul class="govuk-list">
        <li>
          <a class="govuk-body govuk-link" href="./technical-guide">Technical guide</a>
        </li>
      </ul>
    </div>
    <div>
      <h2 class="govuk-heading-m" id="view-the-api-specification">View the API specification</h2>
      <ul class="govuk-list">
        <li>
          <a class="govuk-body govuk-link"
            href="https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Application-information-API"
            rel="noreferrer noopener" target="_blank">Web version (opens in new tab)</a>
        </li>
      </ul>
    </div>
    <br>
    <div>
      <h3 class="govuk-heading-m" id="how-to-test-this-service-api">How to test this API</h3>
      <p class="govuk-body">HMLR does not currently provide a test environment for integrators using our Business
        Gateway APIs. Instead, we’ve provided example code to demonstrate what you should expect to see when developing
        your own services.</p>
      <ul class="govuk-list">
        <li>
          <p class="govuk-body"><a class="govuk-body govuk-link" href="./test-stubs">View
              Application information test stubs</a>.</p>
        </li>
      </ul>
      <p class="govuk-body">For general testing guidance, visit our <a class="govuk-body govuk-link"
          href="/a-guide-to-testing">guide to testing</a>.</p>
    </div>
  </div>
  <div class="govuk-grid-column-one-third">
    <aside class="related-items" role="complementary">
      <h2 class="govuk-heading-m" id="related-apis">
        Related APIs
      </h2>
      <nav role="navigation" aria-labelledby="related-apis">
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