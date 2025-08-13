---
title: Learn about the APIs we use

layout: page
noheader: true
noback: true

eleventyNavigation:
  key: Learn about the APIs we use
  parent: Explore APIs

sidenav:
  - theme: Before you start
    text: What to expect from the developer pack
    href: '/what-to-expect-from-the-developer-pack'
  - theme: Before you start
    text: How to access Business Gateway
    href: '/how-to-access-business-gateway'
  - theme: Before you start
    text: Terms of use
    href: '/terms-of-use'
  - theme: Explore APIs
    text: Learn about the APIs we use
    href: '/learn-about-the-apis-we-use'
    current: true
  - theme: Explore APIs
    text: Find an API
    href: '/find-a-service-api'
  - theme: Explore APIs
    text: A guide to testing
    href: '/a-guide-to-testing'
  - theme: Support
    text: Contact us 
    href: '/contact-us'
---

<span class="govuk-caption-xl">Explore APIs</span>
<h1 class="govuk-heading-xl">Learn about the APIs we use</h1>

<p class="govuk-body govuk-!-font-weight-regular">Business Gateway provides two API types for developers to use – REST and SOAP. Using one or both types allows developers to integrate different HMLR services with their own platforms.</p>
<p class="govuk-body govuk-!-font-weight-regular">Learn more about REST and SOAP and how to integrate them below. For a list of APIs, visit <a class="govuk-link" href="/find-a-service-api">Find an API</a>. Here, you’ll find a SOAP or REST tag next to each title. This shows which of the two API types you’ll need to integrate an HMLR service.</p>

<h2 class="govuk-heading-m">How to use our APIs to build services</h2>
<p class="govuk-body">We're working on this section. It will provide an overview of how to use Business Gateway APIs to build HMLR services.</p>


<h3 class="govuk-heading-m">API limitations</h3>
<p class="govuk-body">There are limitations to using REST or SOAP when integrating Business Gateway services.</p>


<h3 class="govuk-heading-m">REST API limitations</h3>

<h4 class="govuk-body govuk-!-font-weight-bold">Rate limiting</h4>
<p class="govuk-body">HMLR may need to restrict the usage of an API to protect it from excessive use. These rate limits are subject to change based on expected loads and uptake of the service.</p>
<p class="govuk-body">If the rate limit is exceeded, you’ll get a HTTP 429 response (Too Many Requests). HTTP headers will be provided in the response to inform you when the next request may be made.</p>
<p class="govuk-body">We currently promote a sliding window rate limiting policy. This ensures an initial burst of requests can be sent and slowly replenished over time. Where possible, spreading requests out over time is highly advised.</p>
<p class="govuk-body">If you are concerned with a rate limit, you can <a class="govuk-link"
    href="/contact-us">contact us</a> and we can discuss whether increasing the rate limit is appropriate.</p>

<h4 class="govuk-body govuk-!-font-weight-bold">Error registry</h4>
<p class="govuk-body">If our systems detect a problem with requests to our REST services, an error registry will capture these problems as headings and pages with primers on how to solve them. We will share a link to these problem pages from within the JSON response.</p>

<h4 class="govuk-body govuk-!-font-weight-bold">HTTP 500 errors</h4>
<p class="govuk-body">Although measures have been taken to ensure the API is robust and readily available, there may be cases where HMLR systems cannot respond to requests correctly. In such cases, the API will respond with a HTTP 500 error (Internal Server Error), meaning we could not process the request due to an issue within HMLR. This error will not provide much detail about the error externally but will alert a member of the HMLR support team to investigate the issue.</p>
<p class="govuk-body">If you receive a 500 error from the API, you should wait a short period of time and then retry the request. If, after a few retries, you are still receiving the same error, please contact the support team.</p>
<p class="govuk-body">Note that a 500 error does not indicate if the request is correct or incorrect, only that there was an issue internal to the API, and the request should be retried. Visit <a
    class="govuk-link" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" rel="noreferrer noopener"
    target="_blank">the Mozilla web documentation (opens in new tab)</a> for more information about HTTP response codes.</p>

<h4 class="govuk-heading-s">HTTP 400 errors</h4>
<p class="govuk-body">Sometimes the requests sent to our APIs are missing parts, have been sent incorrectly or have logical errors within them. When this happens, our APIs will return an error from the HTTP 400 series. The most common include 400, 401, 403, 404 and 429. Below, you'll find information about what these mean at a high level. For further information about the 400 series errors, visit the Mozilla web documentation.</p>

<h4 class="govuk-heading-s">400 errors</h4>
<p class="govuk-body">A 400 error is the result of a "Bad Request" which means we either could not accept or understand the request made. As the most generic of the 400 series, it could be used for any client error, but it usually means there is a missing field, header or parameter.</p>

<h4 class="govuk-heading-s">401 and 403 errors</h4>
<p class="govuk-body">401 and 403 errors are related to authentication and authorisation. If the login information you provide is not successfully accepted, you will get a "401 unauthorised error". If you provide valid login details but do not have access to a service, you may instead receive a "403 forbidden error". If you receive a 401, check your login. If you receive a 403, check you have access to the API you're attempting to use.</p>

<h4 class="govuk-heading-s">404 errors</h4>
<p class="govuk-body">A 404 error typically means the URL provided was wrong. If you receive a 404 you should check the url entered is correct and the resource(s) you're accessing exist. This could include your title numbers or HMLR references.</p>

<h4 class="govuk-heading-s">429 errors</h4>
<p class="govuk-body">A "429 Too Many Requests" error typically means you're calling our APIs too quickly. Our services are often rate limited, so you may only call them a limited number of times in a given timeframe. This is to prevent overuse and keep the APIs available for all. If you get this error, check for a "Retry after" header and make a request after that many seconds.</p>
            

<h3 class="govuk-heading-m">SOAP API limitations</h3>

<h4 class="govuk-body govuk-!-font-weight-bold">Message IDs</h4>
<p class="govuk-body">Web service requests over HTTP/HTTPS internet protocols are not truly reliable and are known for losing messages between request and response.</p>
<p class="govuk-body">To ensure reliable messaging, Business Gateway will rely on your system to produce a unique message ID that is sent with every request. The message ID is used to retrieve a response back from Business Gateway in the case where the original response has been lost (possibly due to network problems).</p>
<p class="govuk-body">The unique combination of message ID, user ID and message type will be used by Business Gateway software to ensure that every request is unique in the system. If two requests are made with the same message ID from different CMS systems, although the message ID is the same the user ID will be different. This forms a unique key, and the message is uniquely identified in the system.</p>

<h4 class="govuk-body govuk-!-font-weight-bold">Outstanding requests</h4>
<p class="govuk-body">We use an outstanding requests service which allows you to obtain a list of available responses from our SOAP services. Each service offered has a corresponding poll request service, that can then be used to retrieve the full response.</p>
<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">
<p class="govuk-body govuk-!-font-weight-regular">We sometimes use technical terms to describe the work we do at HMLR. For a list of commonly used terms and their definitions, visit <a
    class="govuk-link" href="/glossary">our glossary</a>.</p>