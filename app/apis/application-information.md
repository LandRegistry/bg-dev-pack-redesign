---
title: Application Information API
layout: devpack.njk
---
<div class="govuk-grid-row">
<div class="govuk-grid-column-two-thirds">

<p class="govuk-body-l">Use this service to get information about a specific application.</p>

<div class="govuk-warning-text">
<span class="govuk-warning-text__icon" aria-hidden="true">!</span>
<strong class="govuk-warning-text__text">
<span class="govuk-visually-hidden">Warning</span>
These API endpoints are not currently live.
</strong>
</div>

<aside class="contents-list" role="complementary">
<nav class="govuk-prototype-kit-common-templates-contents-list" aria-label="Pages in this guide" role="navigation">
<h2 class="govuk-heading-m">
Contents
</h2>
<ol class="govuk-list dashed-list">
<li>
<a href="#overview">
Overview
</a>
</li>
<li>
<a href="#view-the-technical-guide">
View the technical guide
</a>
</li>
<li>
<a href="#view-the-api-specification">
View the API specification
</a>
</li>
<li>
<a href="#how-the-service-api-works">
How the service API works
</a>
</li>
<li>
<a href="#how-to-test-this-service-api">
How to test this service API
</a>
</li>
</ol>
</nav>
</aside>

</div>

</div>

<div class="govuk-grid-row">
<div class="govuk-grid-column-two-thirds govuk-prototype-kit-common-templates-mainstream-guide-body">

<div>
<h2 class="govuk-heading-m" id="overview"><br>Overview</h2>

<p class="govuk-body">The Application information service API is used to get detailed information about a specific application. This includes:</p>
<ul class="govuk-list govuk-list--bullet">
<li>the status of an application</li>
<li>the <code style="color: #a71d5d; background-color: #f5f5f5">application_request_id</code> used in the request</li>
<li>an ID for the accepted application, <code style="color: #a71d5d; background-color: #f5f5f5">hmlr_reference</code>, once accepted (previously known as ABR)</li>
<li>the priority of the application, <code style="color: #a71d5d; background-color: #f5f5f5">priority_timestamp</code>, once accepted</li>
<li>any errors that prevented application submission</li>
<li>any warnings that did not prevent submission but need to be addressed before a caseworker can process the application (otherwise a requisition may occur)</li>
</ul>

<p class="govuk-body">This API can be used to get more information after receiving a notification indicating the application has changed. For information about which notifications will be available, visit the notifications section of the   <a class="govuk-body govuk-link" href="/apis/submit-an-application">Submit an application</a> service API page.</p>

</div>

<div>
<h2 class="govuk-heading-m" id="view-the-technical-guide">View the technical guide</h2>

<ul class="govuk-list">
<li>
<a class="govuk-body govuk-link" href="/apis/application-information-technical-guide">Technical guide</a>
</li>
</ul>
</div>

<div>
<h2 class="govuk-heading-m" id="view-the-api-specification">View the API specification</h2>

<ul class="govuk-list">
<li>
<a class="govuk-body govuk-link" href="https://landregistry.github.io/bgtechdoc/vcad/v0_3/vcad-spec.html#tag/Application-information-API" rel="noreferrer noopener" target="_blank">Web version (opens in new tab)</a>
</li>
</ul>
</div>

<div>
<h3 class="govuk-heading-m" id="how-the-service-api-works">How the service API works</h3>
<div class="govuk-!-padding-bottom-3"></div>
<h4 class="govuk-heading-m">Interaction</h4>
<div class="govuk-!-padding-bottom-3"></div>
<img src="/assets/images/ApplicationInformation_interaction_diagram.png" alt="A diagram showing the interaction of the Application Information service API.">
<h4 class="govuk-heading-m">State diagram</h4>
<div class="govuk-!-padding-bottom-3"></div>
<img src="/assets/images/ApplicationInformation_State_diagram.png" alt="A diagram showing how the Application Information service API works.">
</div>
<br>

<div>
<h3 class="govuk-heading-m" id="how-to-test-this-service-api">How to test this service API</h3>
<p class="govuk-body">HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code to demonstrate what you should  expect to see when developing your own services.</p>
<ul class="govuk-list">
<li>
<p class="govuk-body"><a class="govuk-body govuk-link" href="/apis/application-information-test-stubs">View Application information test stubs</a>.</p>
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