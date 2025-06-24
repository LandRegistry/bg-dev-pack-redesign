---
layout: page
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-one-third">
    <nav class="moj-side-navigation" aria-label="Side navigation">
      <h4 class="moj-side-navigation__title">Before you start</h4>
      <ul class="moj-side-navigation__list">
        <li class="moj-side-navigation__item">
          <a href="/what-to-expect-from-the-developer-pack">What to expect from the developer pack</a>
        </li>
        <li class="moj-side-navigation__item">
          <a href="/how-to-access-business-gateway">How to access Business Gateway</a>
        </li>
        <li class="moj-side-navigation__item">
          <a href="/terms-of-use">Terms of use</a>
        </li>
      </ul>
      <h4 class="moj-side-navigation__title">Explore APIs</h4>
      <ul class="moj-side-navigation__list">
        <li class="moj-side-navigation__item moj-side-navigation__item--active">
          <a href="/learn-about-the-apis-we-use" aria-current="location">Learn about the APIs we use</a>
        </li>
        <li class="moj-side-navigation__item">
          <a href="/find-a-service-api">Find an API</a>
        </li>
        <li class="moj-side-navigation__item">
          <a href="/a-guide-to-testing">A guide to testing</a>
        </li>
      </ul>
      <h4 class="moj-side-navigation__title">Support</h4>
      <ul class="moj-side-navigation__list">
        <li class="moj-side-navigation__item">
          <a href="/contact-us">Contact us</a>
        </li>
      <ul>
    </nav>
  </div>
  <div class="govuk-grid-column-two-thirds">
    <span class="govuk-caption-xl">Explore APIs</span>
    <h1 class="govuk-heading-xl">Learn about the APIs we use</h1>
    <div class="govuk-grid-row">
      <p class="govuk-body govuk-!-font-weight-regular govuk-!-margin-left-3">Business Gateway provides two API types for developers to use – REST and SOAP. Using one or both types allows developers to integrate different HMLR services with their own platforms.</p>
      <p class="govuk-body govuk-!-font-weight-regular govuk-!-margin-left-3">Learn more about REST and SOAP and how to integrate them below. For a list of APIs, visit <a class="govuk-link" href="/find-a-service-api">Find an API</a>. Here, you’ll find a SOAP or REST tag next to each title. This shows which of the two API types you’ll need to integrate an HMLR service.</p>
      <h3 class="govuk-heading-m govuk-!-margin-left-3">How to use our APIs to build services</h3>
      <p class="govuk-body govuk-!-font-weight-regular govuk-!-margin-left-3">We're working on this section. It will provide an overview of how to use Business Gateway APIs to build HMLR services.</p>
      <h3 class="govuk-heading-m govuk-!-margin-left-3">API limitations</h3>
      <p class="govuk-body govuk-!-font-weight-regular govuk-!-margin-left-3">There are limitations to using REST or SOAP when integrating Business Gateway services.</p>
      <h3 class="govuk-heading-m govuk-!-margin-left-3">REST API limitations</h3>
      <p class="govuk-body govuk-!-font-weight-bold govuk-!-margin-left-3">Rate limiting</p>
      <p class="govuk-body govuk-!-margin-left-3">HMLR may need to restrict the usage of an API to protect it from excessive use. These rate limits are subject to change based on expected loads and uptake of the service.</p>
      <p class="govuk-body govuk-!-margin-left-3">If the rate limit is exceeded, you’ll get a HTTP 429 response (Too Many Requests). HTTP headers will be provided in the response to inform you when the next request may be made.</p>
      <p class="govuk-body govuk-!-margin-left-3">We currently promote a sliding window rate limiting policy. This ensures an initial burst of requests can be sent and slowly replenished over time. Where possible, spreading requests out over time is highly advised.</p>
      <p class="govuk-body govuk-!-margin-left-3">If you are concerned with a rate limit, you can <a class="govuk-link"
          href="/contact-us">contact us</a> and we can discuss whether increasing the rate limit is appropriate.</p>
      <p class="govuk-body govuk-!-font-weight-bold govuk-!-margin-left-3">Error registry</p>
      <p class="govuk-body govuk-!-margin-left-3">If our systems detect a problem with requests to our REST services, an error registry will capture these problems as headings and pages with primers on how to solve them. We will share a link to these problem pages from within the JSON response.</p>
      <p class="govuk-body govuk-!-font-weight-bold govuk-!-margin-left-3">HTTP 500 errors</p>
      <p class="govuk-body govuk-!-margin-left-3">Although measures have been taken to ensure the API is robust and readily available, there may be cases where HMLR systems cannot respond to requests correctly. In such cases, the API will respond with a HTTP 500 error (Internal Server Error), meaning we could not process the request due to an issue within HMLR. This error will not provide much detail about the error externally but will alert a member of the HMLR support team to investigate the issue.</p>
      <p class="govuk-body govuk-!-margin-left-3">If you receive a 500 error from the API, you should wait a short period of time and then retry the request. If, after a few retries, you are still receiving the same error, please contact the support team.</p>
      <p class="govuk-body govuk-!-margin-left-3">Note that a 500 error does not indicate if the request is correct or incorrect, only that there was an issue internal to the API, and the request should be retried. Visit <a
          class="govuk-link" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" rel="noreferrer noopener"
          target="_blank">the Mozilla web documentation (opens in new tab)</a> for more information about HTTP response codes.</p>
      <h3 class="govuk-heading-m govuk-!-margin-left-3">SOAP API limitations</h3>
      <p class="govuk-body govuk-!-font-weight-bold govuk-!-margin-left-3">Message IDs</p>
      <p class="govuk-body govuk-!-margin-left-3">Web service requests over HTTP/HTTPS internet protocols are not truly reliable and are known for losing messages between request and response.</p>
      <p class="govuk-body govuk-!-margin-left-3">To ensure reliable messaging, Business Gateway will rely on your system to produce a unique message ID that is sent with every request. The message ID is used to retrieve a response back from Business Gateway in the case where the original response has been lost (possibly due to network problems).</p>
      <p class="govuk-body govuk-!-margin-left-3">The unique combination of message ID, user ID and message type will be used by Business Gateway software to ensure that every request is unique in the system. If two requests are made with the same message ID from different CMS systems, although the message ID is the same the user ID will be different. This forms a unique key, and the message is uniquely identified in the system.</p>
      <p class="govuk-body govuk-!-font-weight-bold govuk-!-margin-left-3">Outstanding requests</p>
      <p class="govuk-body govuk-!-margin-left-3">We use an outstanding requests service which allows you to obtain a list of available responses from our SOAP services. Each service offered has a corresponding poll request service, that can then be used to retrieve the full response.</p>
      <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible govuk-!-margin-left-3">
      <p class="govuk-body govuk-!-font-weight-regular govuk-!-margin-left-3">We sometimes use technical terms to describe the work we do at HMLR. For a list of commonly used terms and their definitions, visit <a
          class="govuk-link" href="/glossary">our glossary</a>.</p>
    </div>
  </div>
</div>