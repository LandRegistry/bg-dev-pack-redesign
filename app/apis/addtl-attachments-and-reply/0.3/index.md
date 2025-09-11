---
title: Additional attachments and reply API
layout: page.njk
versioned: true

noheader: true

breadcrumb: false
eleventyNavigation:
    key: addtl-attachments-and-reply-api
    parent: apis
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">
      Additional attachments and reply API
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
      <p class="govuk-body">The Download a document API is used to. This includes:</p>
      <ul class="govuk-list govuk-list--bullet">
        <li>one</li>
        <li><code class="x-govuk-code x-govuk-code--inline">two</code></li>
        <li>three</li>
      </ul>
      <p class="govuk-body">Somemore info</p>
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
            href="https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Application-information-API"
            rel="noreferrer noopener" target="_blank">Web version (opens in new tab)</a>
        </li>
      </ul>
    </div>
    <br>
    <div>
      <h3 class="govuk-heading-m" id="how-the-service-api-works">How the API works</h3>
      <div class="govuk-!-padding-bottom-3"></div>
    <div class="govuk-!-padding-bottom-3"></div>
    <p class="govuk-body">Body text</p>
    <div class="govuk-!-padding-bottom-3"></div>
    <div>
      <h3 class="govuk-heading-m" id="how-to-test-this-service-api">How to test this API</h3>
      <p class="govuk-body">HMLR has created a test environment for the Download a document API. We’ve also provided example code to demonstrate what you should expect when developing your own services.</p>
      <ul class="govuk-list">
        <li>
          <p class="govuk-body"><a class="govuk-body govuk-link" href="./test-stubs">View
              Application information test stubs</a>.</p>
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