---
title: Send a document API
layout: page.njk

noheader: true
versioned: true

breadcrumb: false

eleventyNavigation:
    key: send-a-document
    parent: apis
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">
      Send a document API
    </h1>
    <p class="govuk-body-l">Use this service to attach documents to your application.</p>
    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span class="govuk-visually-hidden">Warning</span>
        These API endpoints are not currently live.
      </strong>
    </div>
  </div>
</div>

<section class="govuk-grid-row">
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
    <h2 class="govuk-heading-m" id="overview">Overview</h2>
    <p class="govuk-body">
      The Send a document API should be used to attach documents to your application. This service can be integrated
      using the REST core API.</p>
    <p class="govuk-body">There are two steps for sending a document:</p>
    <ol class="govuk-list govuk-list--number">
      <li>A request to generate an upload URL</li>
      <li>A request to upload the document</li>
    </ol>
    <p class="govuk-body">The request to generate an upload URL will respond with an HMLR URL that can be used to
      upload the document to. This URL is only active for 10 minutes after creation. The generate an upload URL
      endpoint will also return a document ID that can be used when using the Submit an application API. Documents
      uploaded via this process will be subject to HMLR security scanning.</p>
    <p class="govuk-body">Documents that have been uploaded can be used for up to 180 days, after which point they
      will be removed.</p>
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
          href="https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Send-a-document-API"
          rel="noreferrer noopener" target="_blank">Web version (opens in new tab)</a>
      </li>
    </ul>
  </div>
  <div>
    <h3 class="govuk-heading-m" id="how-the-service-api-works">How the API works</h3>
    <div class="govuk-!-padding-bottom-3"></div>
    <a target="_blank" href="/assets/images/SendADocumentSequence.png"><img src="/assets/images/SendADocumentSequence.png" alt="A diagram showing how the Send a Document API works."></a>
    <h3 class="govuk-heading-s">Send a document API</h3>
    <p class="govuk-body">This diagram demonstrates how the Send a document API works to support users.</p>
    <p class="govuk-body">When the user sends the request to generate an upload URL, the HMLR system will respond with a URL that can be used to upload the document to. </p>
    <p class="govuk-body">Users can then use this URL to upload the document to the system. </p>
  </div>
  <br>
  <div>
    <h3 class="govuk-heading-m" id="how-to-test-this-service-api">How to test this API</h3>
    <p class="govuk-body">HMLR does not currently provide a test environment for integrators using our Business
      Gateway APIs. Instead, we’ve provided example code to demonstrate what you should expect to see when developing
      your own services.</p>
    <ul class="govuk-list">
      <li>
        <p class="govuk-body"><a class="govuk-body govuk-link" href="./test-stubs">View Send a
            document test stubs</a>.</p>
      </li>
    </ul>
    <div class="govuk-inset-text">Please note there are also plans to release a sandbox test environment for developers in the future. The exact release date is to be confirmed.</div>
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
          <a class="govuk-body govuk-link" href="/apis/submit-an-application">
            Submit an application
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
          <a class="govuk-body govuk-link" href="/apis/download-a-document">
            Download a document
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
</section>

</div>