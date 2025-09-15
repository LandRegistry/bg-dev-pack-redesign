---
title: Download a document API
layout: page.njk
versioned: true

noheader: true

breadcrumb: false
eleventyNavigation:
    key: download-a-document-api
    parent: apis
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">
      Download a document API
    </h1>
    <p class="govuk-body-l">Use this service to download documents that have been created by HM Land Registry for your consumption.</p>
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
      value: "1.0",
      text: "v1.0 (latest)",
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
      <p class="govuk-body">The Download a document API provides a way to download documents that have been created by HM Land Registry for your consumption.</p>
      <p class="govuk-body">This API has one endpoint:</p>
      <ul class="govuk-list govuk-list--bullet">
        <li><code class="app-code app-code--inline">`GET /v0/documents/{download_id}`</code> - get the binary content of the document.</li>
      </ul>
      <p class="govuk-body">You may obtain a <code class="app-code app-code--inline">`download_id`</code> from any of the following:</p>
      <ul class="govuk-list govuk-list--bullet">
        <li>Completion notifications</li>
        <li>Cancellation notifications</li>
        <li>Requisition correspondence notifications</li>
        <li>The <code class="app-code app-code--inline">`/correspondence`</code> array in an [application information](/apis/application-information) response</li>
      </ul>
    </div>
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
            href="https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Notifications-API"
            rel="noreferrer noopener" target="_blank">Web version (opens in new tab)</a>
        </li>
      </ul>
    </div>
    <br>
    <div>
      <h3 class="govuk-heading-m" id="how-the-service-api-works">How the API works</h3>
      <div class="govuk-!-padding-bottom-3"></div>
      <p>put an image here</p>
    <div class="govuk-!-padding-bottom-3"></div>
    <p class="govuk-body">This diagram demonstrates how the download a document API works.</p>
    <p class="govuk-body">A user may obtain a <code class="app-code app-code--inline">`download_id`</code> from either a notification or application information.</p>
    <p class="govuk-body">The user may then use that `download_id` in their request to <code class="app-code app-code--inline">`GET /v0/documents/{download_id}`</code> to obtain the document binary.</p>
    <div class="govuk-!-padding-bottom-3"></div>
    <div>
      <h3 class="govuk-heading-m" id="how-to-test-this-service-api">How to test this API</h3>
      <p class="govuk-body">HMLR has created a test environment for the Download a document API. We’ve also provided example code to demonstrate what you should expect when developing your own services.</p>
      <ul class="govuk-list">
        <li>
          <p class="govuk-body"><a class="govuk-body govuk-link" href="./test-stubs">View
              Download a document test stubs</a>.</p>
        </li>
      </ul>
      <div class="govuk-inset-text">Please note there are also plans to release a sandbox test environment for developers in the future. The exact release date is to be confirmed.</div>
      <p class="govuk-body">For general testing guidance, visit our <a class="govuk-body govuk-link"
          href="/a-guide-to-testing">guide to testing</a>.</p>
    </div>
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