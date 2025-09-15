---
title: Notifications API
layout: page.njk

noheader: true
versioned: true

breadcrumb: false
eleventyNavigation:
    key: notifications-api
    parent: apis

---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">
      Notifications API
    </h1>
    <p class="govuk-body-l">Use this service to get updates about multiple applications submitted by the same business
      unit.</p>
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
    <p class="govuk-body">The Notifications API provides a way of fetching updates about multiple applications
      submitted by the same business unit. Currently, this service only supports a pull interaction model, where
      notifications must be requested periodically. However, more information about a push interaction model will be
      shared in future.</p>
    <p class="govuk-body">This API has two endpoints:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="app-code app-code--inline">GET /v0/notifications</code> get all notifications
        that match the provided filters</li>
      <li><code class="app-code app-code--inline">POST /v0/notifications/acknowledge</code> - notify
        HMLR that notifications have been received</li>
    </ul>
    <p class="govuk-body">This API can be used to get more information after receiving a notification indicating the
      application has changed. For information about which notifications will be available, visit the notifications
      section of the <a class="govuk-body govuk-link" href="/apis/submit-an-application">Submit an application</a> API
      page.</p>
  </div>
  <div>
    <h2 class="govuk-heading-m" id="view-the-technical-guide">View the Technical guide</h2>
    <ul class="govuk-list">
      <li>
        <a class="govuk-body govuk-link" href="/apis/notifications/0.3/technical-guide">Technical guide</a>
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
  <div>
    <h3 class="govuk-heading-m" id="how-the-service-api-works">How the API works</h3>
    <div class="govuk-!-padding-bottom-3"></div>
    <a target="_blank" href="/assets/images/NotificationInteraction.png"><img src="/assets/images/NotificationInteraction.png"
      alt="A diagram showing the interaction of the Notification API."></a>
    <p class="govuk-body">This diagram demonstrates how the Notifications API works to support users.</p>
  <p class="govuk-body">A user may send requests to receive notifications about multiple applications at the same time using the Get notifications API. The HMLR system will respond by providing information relevant to the request.</p>
  <p class="govuk-body">A user can also notify HMLR that it has received notifications using the Acknowledge notifications API. The system will acknolwedge this notification.</p>
  </div>
  <br>
  <div>
    <h3 class="govuk-heading-m" id="how-to-test-this-service-api">How to test this API</h3>
    <p class="govuk-body">HMLR has created a test environment for the Notifications API. We’ve also provided example code to demonstrate what you should expect when developing your own services.</p>
    <ul class="govuk-list">
      <li>
        <p class="govuk-body"><a class="govuk-body govuk-link" href="/apis/notifications/0.3/test-stubs">View
            Notifications test stubs</a>.</p>
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
          <a class="govuk-body govuk-link" href="/apis/application-information">
            Application information
          </a>
        </li>
        <li>
          <a class="govuk-body govuk-link" href="/apis/send-a-document">
            Send a document
          </a>
        <li>
          <a class="govuk-body govuk-link" href="/apis/submit-an-application">
            Submit an application
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