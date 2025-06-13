---
title: Send a Document Service API
layout: devpack.njk
breadcrumb: false
---

<div class="govuk-grid-row">
<div class="govuk-grid-column-two-thirds">

<p class="govuk-body-l">Use this service to attach documents to your application.</p>
<div class="govuk-warning-text">
    <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
    <strong class="govuk-warning-text__text">
        <span class="govuk-visually-hidden">Warning</span>
        These API endpoints are not currently live.
    </strong>
</div>

<aside class="contents-list" role="complementary">
<nav class="govuk-prototype-kit-common-templates-contents-list" aria-label="Pages in this guide" role="navigation">

<h2 class="govuk-heading-m">Contents</h2>
<ol class="govuk-list dashed-list">
    <li><a href="#overview" active>Overview</a></li>
    <li><a href="#view-the-technical-guide">View the technical guide</a></li>
    <li><a href="#view-the-api-specification">View the API specification</a></li>
    <li><a href="#how-the-service-api-works">How the service API works</a></li>
    <li><a href="#how-to-test-this-service-api">How to test this service API</a></li>
</ol>

</nav>
</aside>
</div>
</div>

<div class="govuk-grid-row">
<div class="govuk-grid-column-two-thirds">
<div>

<h2 class="govuk-heading-m" id="overview"><br>Overview</h2>
    <p class="govuk-body">
    The Send a document service API should be used to attach documents to your application. This service can be integrated using the REST core API.</p>

<p class="govuk-body">There are two steps for sending a document:</p>

<ol class="govuk-list govuk-list--number">
    <li>A request to generate an upload URL</li>
    <li>A request to upload the document</li>
</ol>

<p class="govuk-body">The request to generate an upload URL will respond with an HMLR URL that can be used to upload the document to. This URL is only active for 10 minutes after creation. The generate an upload URL endpoint will also return a document ID that can be used when using the Submit an application API. Documents uploaded via this process will be subject to HMLR security scanning.</p>
<p class="govuk-body">Documents that have been uploaded can be used for up to 180 days, after which point they will be removed.</p>

</div>

<div>
<h2 class="govuk-heading-m" id="view-the-technical-guide">View the technical guide</h2>
<ul class="govuk-list">
    <li><a class="govuk-body govuk-link" href="/apis/send-a-document-technical-guide">Technical guide</a></li>
</ul>
</div>

<div>
      <h2 class="govuk-heading-m" id="view-the-api-specification">View the API specification</h2>

<ul class="govuk-list">
<li><a class="govuk-body govuk-link" href="https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Send-a-document-API" rel="noreferrer noopener" target="_blank">Web version (opens in new tab)</a></li>
</ul>
</div>

<div>

<h3 class="govuk-heading-m" id="how-the-service-api-works">How the service API works</h3>
      <div class="govuk-!-padding-bottom-3"></div>
<img src="/assets/images/SendADocumentSequence.png" alt="A diagram showing how the Send a Document API works.">

</div>

<br>

<div>
  <h3 class="govuk-heading-m" id="how-to-test-this-service-api">How to test this service API</h3>
  <p class="govuk-body">HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code to demonstrate what you should  expect to see when developing your own services.</p>
  <ul class="govuk-list">
    <li>
    <p class="govuk-body"><a class="govuk-body govuk-link" href="/apis/send-a-document-test-stubs">View Send a document test stubs</a>.</p>
    </li>
  </ul>

  <p class="govuk-body">For general testing guidance, visit our <a class="govuk-body govuk-link" href="/a-guide-to-testing">guide to testing</a>.</p>


  </div>

</div>

<div class="govuk-grid-column-one-third">

<aside class="related-items" role="complementary">
    <h2 class="govuk-heading-m" id="related-apis">
    Related APIs
    </h2>
    <nav role="navigation" aria-labelledby="subsection-title">
    <ul class="govuk-list govuk-!-font-size-16">
        <li>
        <a class="govuk-body govuk-link" href="/apis/submit-an-application-to-change-the-land-register">Submit an application to change the Land Register</a>
        </li>
        <li>
        <a class="govuk-body govuk-link" href="/apis/submit-an-application">Submit an application</a>
        </li>
        <li>
        <a class="govuk-body govuk-link" href="/apis/application-information">Application information</a>
        </li>
        <li>
        <a class="govuk-body govuk-link" href="/apis/notifications">Notifications</a>
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