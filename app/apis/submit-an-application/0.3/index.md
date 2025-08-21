---
title: Submit an application API
layout: page.njk

noheader: true
versioned: true

breadcrumb: false
eleventyNavigation:
    key: Submit an application API v0.3
    parent: Submit an application API
    hide: true
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">
      Submit an application API
    </h1>
    <p class="govuk-body-l">Use this service to provide data to HMLR for updating the register.</p>
    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span class="govuk-visually-hidden">Warning</span>
        These API endpoints are not currently live.
      </strong>
    </div>
  </div>
</div>
<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-0">
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
  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <section>
      <h2 class="govuk-heading-m" id="overview"><br>Overview</h2>
      <p class="govuk-body">
        The Submit an application API will help users provide the necessary data to HMLR for updating the register. This
        API is asynchronous, returning a unique ID for the submission request which can be used when fetching the
        application status.</p>
      <p class="govuk-body">This API supports the following application types:</p>
      <ul class="govuk-list govuk-list--bullet">
        <li>Register update</li>
        <li>Transfer of part</li>
        <li>Dipositionary first lease (includes new lease and lease extension)</li>
        <li>Removing a default Form A restriction (JP1)</li>
      </ul>
      <p class="govuk-body">The data in the request content contains information about:</p>
      <ul class="govuk-list govuk-list--bullet">
        <li>Addresses</li>
        <li>Documents</li>
        <li>Parties</li>
        <li>Transactions</li>
        <li>Titles</li>
      </ul>
    </section>
    <section>
      <h2 class="govuk-heading-m" id="view-the-technical-guide">View the Technical guide</h2>
      <ul class="govuk-list">
        <li>
          <a class="govuk-body govuk-link" href="/apis/submit-an-application/0.3/technical-guide">Technical guide</a>
        </li>
      </ul>
    </section>
    <section>
      <h2 class="govuk-heading-m" id="view-the-api-specification">View the API specification</h2>
      <ul class="govuk-list">
        <li>
          <a class="govuk-body govuk-link"
            href="https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Submit-an-application-API"
            rel="noreferrer noopener" target="_blank">Web version (opens in new tab)</a>
        </li>
      </ul>
    </section>
    <section>
      <h3 class="govuk-heading-m" id="how-the-service-api-works">How the API works</h3>
      <div class="govuk-!-padding-bottom-3"></div>
      <a target="_blank" href="/assets/images/SubmitAnApplication.png"><img src="/assets/images/SubmitAnApplication.png"
        alt="A diagram showing how the Submit an application API works."></a>
      <div class="govuk-!-padding-bottom-3"></div>
      <br>
      <p class="govuk-body">This diagram demonstrates how the Send a document API works to support users.</p>
      <p class="govuk-body">When a user submits information to update the register, the HMLR system will respond by sending a unique application ID. Users can use this ID to receive information about the status of their application.</p>
    </section>
    <br>
    <section>
      <h3 class="govuk-heading-m" id="how-to-test-this-service-api">How to test this API</h3>
      <p class="govuk-body">HMLR has created a test environment for the Submit an application API. We’ve also provided example code to demonstrate what you should expect when developing your own services.</p>
      <ul class="govuk-list">
        <li>
          <p class="govuk-body"><a class="govuk-body govuk-link" href="/apis/submit-an-application/0.3/test-stubs">View
              Submit an application test stubs</a>.</p>
        </li>
      </ul>
      <div class="govuk-inset-text">Please note there are also plans to release a sandbox test environment for developers in the future. The exact release date is to be confirmed.</div>
      <p class="govuk-body">For general testing guidance, visit our <a class="govuk-body govuk-link"
          href="/a-guide-to-testing">guide to testing</a>.</p>
    </section>
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
            <a class="govuk-body govuk-link" href="/apis/application-information">
              Application information
            </a>
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