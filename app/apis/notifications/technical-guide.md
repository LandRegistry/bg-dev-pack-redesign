---
layout: page
---


{% from "govuk/components/back-link/macro.njk" import govukBackLink %}

{{ govukBackLink({
  text: "Back",
  href: "/apis/notifications"
}) }}


<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">Notifications API technical guide</h1>
    <p class="govuk-body-l">Use this service to get updates about multiple applications submitted by the same business unit.</p>
    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span class="govuk-visually-hidden">Warning</span>
        These API endpoints are not currently live.
      </strong>
    </div>
    <aside class="govuk-prototype-kit-common-templates-mainstream-guide-contents-list" role="complementary">
      <nav class="govuk-prototype-kit-common-templates-contents-list" aria-label="Pages in this guide"
        role="navigation">
        <h2 class="govuk-prototype-kit-common-templates-contents-list__title">Contents</h2>
        <ol class="govuk-prototype-kit-common-templates-contents-list__list">
          <li
            class="govuk-prototype-kit-common-templates-contents-list__list-item govuk-prototype-kit-common-templates-contents-list__list-item--dashed govuk-prototype-kit-common-templates-contents-list__list-item--active">
            <a href="#how-to-use-the-notifications-api">How to use the Notifications API</a>
          </li>
          <li
            class="govuk-prototype-kit-common-templates-contents-list__list-item govuk-prototype-kit-common-templates-contents-list__list-item--dashed">
            <a href="#validation-rules">Validation rules</a>
          </li>
          <li
            class="govuk-prototype-kit-common-templates-contents-list__list-item govuk-prototype-kit-common-templates-contents-list__list-item--dashed">
            <a href="#example-requests-and-responses">Example requests and responses</a>
          </li>
        </ol>
      </nav>
    </aside>
  </div>
</div>
<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds govuk-prototype-kit-common-templates-mainstream-guide-body">
    <h2 class="govuk-heading-m" id="how-to-use-the-notifications-api">How to use the Notifications API</h2>
    <div>
      <h3 class="govuk-heading-s">Recieve notifications</h3>
      <p class="govuk-body">The GET request to fetch all notifications takes the following URL query parameters (which
        are optional):</p>
      <ul class="govuk-list govuk-list--bullet">
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">created_after</code> - only retrieve notifications with a <code style="color: #a71d5d; background-color: #f5f5f5">created_timestamp</code> after this date
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">created_before</code> - only retrieve notifications with a <code style="color: #a71d5d; background-color: #f5f5f5">created_timestamp</code> before this date
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">status</code> - only retrieve notifications with a specific status, either <code style="color: #a71d5d; background-color: #f5f5f5">NEW</code> or <code style="color: #a71d5d; background-color: #f5f5f5">ACKNOWLEDGED</code>
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">occured_after</code> - only retrieve notifications with an <code style="color: #a71d5d; background-color: #f5f5f5">event_timestamp</code> after this date
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">occured_before</code> - only retrieve notifications with an <code style="color: #a71d5d; background-color: #f5f5f5">event_timestamp</code> before this date
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">notification_type</code> - only retrieve notifications with the specific <code style="color: #a71d5d; background-color: #f5f5f5">notification_type</code>
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">subject</code> - only retrieve notifications with the specific <code style="color: #a71d5d; background-color: #f5f5f5">subject</code>
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">additional_provider_filter</code> - only retrieve notifications that match the provided <code style="color: #a71d5d; background-color: #f5f5f5">additional_provider_filter</code>
        </li>
        <li>
          <code style="color: #a71d5d; background-color: #f5f5f5">limit</code> - the maximum number of notifications to return in a single response
        </li>
      </ul>
      <p class="govuk-body">Only notifications related to applications submitted by the business unit ID provided will be returned.</p>
    </div>
    <div>
      <p class="govuk-body">Notification delivery is ‘at least once’, meaning a specific event at a specific time may result in one or more notifications (i.e. duplicate notifications for the same event).</p>
      <p class="govuk-body">Duplicate events will have the same <code style="color: #a71d5d; background-color: #f5f5f5">event_datetime</code> field and <code style="color: #a71d5d; background-color: #f5f5f5">notification_type</code> which can be used to locate and ignore duplicates when receiving notifications. Notifications will continue to be returned by the endpoint until they are acknowledged.
      </p>

      <h3 class="govuk-heading-s">Acknowledge notifications</h3>
      <p class="govuk-body">Once a notification has been processed by your system, the notification should be acknowledged. To do this, send a list of <code style="color: #a71d5d; background-color: #f5f5f5">notification_ids</code> to the Acknowledge notifications API as a POST request. This will change the status of those notifications to <code style="color: #a71d5d; background-color: #f5f5f5">ACKNOWLEDGED</code>.
      </p>

      <h2 class="govuk-heading-m" id="validation-rules">Validation rules</h2>
      <div>
        <p class="govuk-body">There are no validation rules for implementing this API.</p>
        <h2 class="govuk-heading-m" id="example-requests-and-responses">Example requests and responses</h2>
        <p class="govuk-body">For specific examples of notification payloads produced during application submission, view <a class="govuk-body govuk-link" href="/apis/submit-an-application">Submit an application notifications</a>.
        </p>
        <h3 class="govuk-heading-s">Get notifications request</h3>
<pre>
<code class="language-json" style="background-color: #f3f2f1">
get /v0/notifications?created_after=2025-01-01t00:00:00 http/1.1
</code>
</pre>

        <div class="govuk-!-padding-bottom-3"></div>

        <h3 class="govuk-heading-s">Get notifications response</h3>

<pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": [
      {
        "notification_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "created_datetime": "2025-03-06t14:32:55.295z",
        "event_datetime": "2025-03-06t14:32:55.295z",
        "payload_schema": "https://example.com/",
        "notification_type": "string",
        "subject_type": "string",
        "subject": "string",
        "additional_provider_filter": "string",
        "status": "new",
        "payload": {
          "additionalprop1": {},
          "additionalprop2": {},
          "additionalprop3": {}
        }
      }
    ]
  }</code>
</pre>
        <div class="govuk-!-padding-bottom-3"></div>
        <h3 class="govuk-heading-s">Acknowledge notifications request</h3>
<pre>
<code class="language-json" style="background-color: #f3f2f1">
  post /v0/notifications/acknowledge http/1.1

  {
    "data": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    ]
  }
</code>
</pre>
        <div class="govuk-!-padding-bottom-3"></div>
        <h3 class="govuk-heading-s">Acknowledge notifications response</h3>
<pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "acknowledged": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ]
    }
  }
</code>
</pre>
        <div class="govuk-!-padding-bottom-6"></div>
      </div>
    </div>
  </div>
  <div class="govuk-grid-column-one-third">
    <aside class="govuk-prototype-kit-common-templates-related-items" role="complementary">
      <h2 class="govuk-heading-m" id="related-apis">Related APIs</h2>
      <nav role="navigation" aria-labelledby="subsection-title">
        <ul class="govuk-list govuk-!-font-size-16">
          <li>
            <a class="govuk-body govuk-link" href="/apis/submit-an-application-to-change-the-land-register">Submit an application to change the Land Register</a>
          </li>
          <li>
            <a class="govuk-body govuk-link" href="/apis/application-information"> Application information </a>
          </li>
          <li>
            <a class="govuk-body govuk-link" href="/apis/send-a-document"> Send a document </a>
          <li>
            <a class="govuk-body govuk-link" href="/apis/submit-an-application"> Submit an application </a>
          </li>
          <li>
            <a class="govuk-body govuk-link govuk-!-font-weight-bold" href="/find-a-service-api"> More <span class="govuk-visually-hidden">in Subsection</span> </a>
          </li>
        </ul>
      </nav>
    </aside>

  </div>

</div>

</div>