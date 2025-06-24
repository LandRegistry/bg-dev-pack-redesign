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

    <h1 class="govuk-heading-xl">
      Notifications API test stubs
    </h1>
    {# <p class="govuk-body-l">Use these test stubs to service to attach documents to your application.</p> #}

    {# <aside class="govuk-prototype-kit-common-templates-mainstream-guide-contents-list" role="complementary">
      <nav class="govuk-prototype-kit-common-templates-contents-list" aria-label="Pages in this guide"
        role="navigation">
        <h2 class="govuk-prototype-kit-common-templates-contents-list__title">
          Contents
        </h2>
        <ol class="govuk-prototype-kit-common-templates-contents-list__list">
          <li
            class="govuk-prototype-kit-common-templates-contents-list__list-item govuk-prototype-kit-common-templates-contents-list__list-item--dashed govuk-prototype-kit-common-templates-contents-list__list-item--active">
            <a href="#how-to-use-the-send-a-document-api">
              How to use the Send a document API
            </a>
          </li>
          <li
            class="govuk-prototype-kit-common-templates-contents-list__list-item govuk-prototype-kit-common-templates-contents-list__list-item--dashed">
            <a href="#validation-rules">
              Validation rules
            </a>
          </li>
          <li
            class="govuk-prototype-kit-common-templates-contents-list__list-item govuk-prototype-kit-common-templates-contents-list__list-item--dashed">
            <a href="#example-requests-and-responses">
              Example requests and responses
            </a>
          </li>
        </ol>
      </nav>
    </aside> #}

  </div>

</div>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds govuk-prototype-kit-common-templates-mainstream-guide-body">
    {# <h2 class="govuk-heading-m" id="how-to-use-the-send-a-document-api">How to test the Send a document API</h2> #}
    <p class="govuk-body">HMLR does not currently provide a test environment for integrators using our Business Gateway
      APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to see
      when developing your own services.</p>
    <p class="govuk-body">Base URL:
      <code style="color: #a71d5d; background-color: #f5f5f5">https://bgtest.landregistry.gov.uk/bg2test/api</code>
    </p>
    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <h2 class="govuk-heading-m">Scenario 1: Get all notifications</h2>

    <h3 class="govuk-heading-s">Request</h3>
    <p class="govuk-body">Method:
      <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
    </p>
    <p class="govuk-body">Endpoint:
      <code style="color: #a71d5d; background-color: #f5f5f5">/v0/notifications</code>
    </p>
    <p class="govuk-body">Headers:
      <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
        </code>
    </p>

    <h3 class="govuk-heading-s">Response</h3>
    <p class="govuk-body">Status:
      <code style="color: #a71d5d; background-color: #f5f5f5">200</code>
    </p>
    <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": [
      {
        "notification_id": "&#123;&#123;ID&#125;&#125;",
        "created_datetime": "2024-01-01T12:00:00.000",
        "event_datetime": "2024-01-01T12:00:00.000",
        "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-priority-protected.json",
        "notification_type": "APPLICATION_ACCEPTED_ON_DAY_LIST",
        "subject_type": "LAND_REGISTER_APPLICATION",
        "subject": "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
        "additional_provider_filter": "subUnit1",
        "status": "ACKNOWLEDGED",
        "payload": {
          "data": {
            "hmlr_reference": "ABC456A",
            "status": "ACCEPTED",
            "priority": "2024-09-20T09:56:46"
          }
        }
      },
      {
        "notification_id": "&#123;&#123;ID&#125;&#125;",
        "created_datetime": "2024-01-01T12:00:00.000",
        "event_datetime": "2024-01-01T12:00:00.000",
        "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-priority-protected.json",
        "notification_type": "APPLICATION_ACCEPTED_ON_DAY_LIST",
        "subject_type": "LAND_REGISTER_APPLICATION",
        "subject": "2563940e-ae95-4e7e-9b33-49a6571abdf6",
        "additional_provider_filter": "subUnit1",
        "status": "NEW",
        "payload": {
          "data": {
            "hmlr_reference": "ABC456B",
            "status": "ACCEPTED",
            "priority": "2024-09-20T09:56:46"
          }
        }
      },
      {
        "notification_id": "&#123;&#123;ID&#125;&#125;",
        "created_datetime": "2024-01-01T12:00:00.000",
        "event_datetime": "2024-01-01T12:00:00.000",
        "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/validation-failed.json",
        "notification_type": "APPLICATION_VALIDATION_FAILED",
        "subject_type": "LAND_REGISTER_APPLICATION",
        "subject": "3be62ad3-c542-452d-975e-6cd18d77196f",
        "additional_provider_filter": "subUnit1",
        "status": "NEW",
        "payload": {
          "data": {
            "status": "VALIDATION_FAILED"
          }
        }
      }
    ]
  }

</code>
</pre>
    <div class="govuk-!-padding-bottom-3"></div>

    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <h2 class="govuk-heading-m">Scenario 2: Get all new notifications</h2>

    <h3 class="govuk-heading-s">Request</h3>
    <p class="govuk-body">Method:
      <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
    </p>
    <p class="govuk-body">Endpoint:
      <code style="color: #a71d5d; background-color: #f5f5f5">/v0/notifications?status=NEW</code>
    </p>
    <p class="govuk-body">Headers:
      <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
        </code>
    </p>

    <h3 class="govuk-heading-s">Response</h3>
    <p class="govuk-body">Status:
      <code style="color: #a71d5d; background-color: #f5f5f5">200</code>
    </p>

    <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": [
      {
        "notification_id": "&#123;&#123;ID&#125;&#125;",
        "created_datetime": "2024-01-01T12:00:00.000",
        "event_datetime": "2024-01-01T12:00:00.000",
        "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-priority-protected.json",
        "notification_type": "APPLICATION_ACCEPTED_ON_DAY_LIST",
        "subject_type": "LAND_REGISTER_APPLICATION",
        "subject": "2563940e-ae95-4e7e-9b33-49a6571abdf6",
        "additional_provider_filter": "subUnit1",
        "status": "NEW",
        "payload": {
          "data": {
            "hmlr_reference": "ABC456B",
            "status": "ACCEPTED",
            "priority": "2024-09-20T09:56:46"
          }
        }
      },
      {
        "notification_id": "&#123;&#123;ID&#125;&#125;",
        "created_datetime": "2024-01-01T12:00:00.000",
        "event_datetime": "2024-01-01T12:00:00.000",
        "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/validation-failed.json",
        "notification_type": "APPLICATION_VALIDATION_FAILED",
        "subject_type": "LAND_REGISTER_APPLICATION",
        "subject": "3be62ad3-c542-452d-975e-6cd18d77196f",
        "additional_provider_filter": "subUnit1",
        "status": "NEW",
        "payload": {
          "data": {
            "status": "VALIDATION_FAILED"
          }
        }
      }
    ]
  }

</code>
</pre>

    <div class="govuk-!-padding-bottom-3"></div>

    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <h2 class="govuk-heading-m">Scenario 3: Get all acknowledged notifications</h2>

    <h3 class="govuk-heading-s">Request</h3>
    <p class="govuk-body">Method:
      <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
    </p>
    <p class="govuk-body">Endpoint:
      <code style="color: #a71d5d; background-color: #f5f5f5">/v0/notifications?status=ACKNOWLEDGED</code>
    </p>
    <p class="govuk-body">Headers:
      <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
        </code>
    </p>

    <h3 class="govuk-heading-s">Response</h3>
    <p class="govuk-body">Status:
      <code style="color: #a71d5d; background-color: #f5f5f5">200</code>
    </p>
    <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": [
      {
        "notification_id": "&#123;&#123;ID&#125;&#125;",
        "created_datetime": "2024-01-01T12:00:00.000",
        "event_datetime": "2024-01-01T12:00:00.000",
        "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-priority-protected.json",
        "notification_type": "APPLICATION_ACCEPTED_ON_DAY_LIST",
        "subject_type": "LAND_REGISTER_APPLICATION",
        "subject": "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
        "additional_provider_filter": "subUnit1",
        "status": "ACKNOWLEDGED",
        "payload": {
          "data": {
            "hmlr_reference": "ABC456A",
            "status": "ACCEPTED",
            "priority": "2024-09-20T09:56:46"
          }
        }
      }
    ]
  }

</code>
</pre>

    <div class="govuk-!-padding-bottom-3"></div>

    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <h2 class="govuk-heading-m">Scenario 4: Get all with invalid date filter</h2>

    <h3 class="govuk-heading-s">Request</h3>
    <p class="govuk-body">Method:
      <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
    </p>
    <p class="govuk-body">Endpoint:
      <code
        style="color: #a71d5d; background-color: #f5f5f5">/v0/notifications?created_after=2020-01-01T00:00:00&created_before=2015-01-01T00:00:00</code>
    </p>
    <p class="govuk-body">Headers:
      <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
        </code>
    </p>

    <h3 class="govuk-heading-s">Response</h3>
    <p class="govuk-body">Status:
      <code style="color: #a71d5d; background-color: #f5f5f5">400</code>
    </p>

    <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "type": "https://problems-registry.smartbear.com/bad-request/",
    "title": "Bad Request",
    "status": 400,
    "detail": "created_after parameter cannot be after created_before parameter",
    "instance": "/v0/notifications",
    "code": "400-01"
  }

</code>
</pre>

    <div class="govuk-!-padding-bottom-3"></div>

    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <h2 class="govuk-heading-m">Scenario 5: Acknowledge notifications</h2>

    <h3 class="govuk-heading-s">Request</h3>
    <p class="govuk-body">Method:
      <code style="color: #a71d5d; background-color: #f5f5f5">POST</code>
    </p>
    <p class="govuk-body">Endpoint:
      <code style="color: #a71d5d; background-color: #f5f5f5">/v0/notifications/acknowledge</code>
    </p>
    <p class="govuk-body">Headers:
      <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
        </code>
    </p>

    <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": [
      "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
      "87654321-2b6d-4b8a-971c-e758b0e8e790",
      "12345678-2b6d-4b8a-971c-e758b0e8e790"
    ]
  }

</code>
</pre>

    <h3 class="govuk-heading-s">Response</h3>
    <p class="govuk-body">Status:
      <code style="color: #a71d5d; background-color: #f5f5f5">200</code>
    </p>
    <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "acknowledged": [
        "b3ac19be-2b6d-4b8a-971c-e758b0e8e790"
      ],
      "not_found": [
        "87654321-2b6d-4b8a-971c-e758b0e8e790",
        "12345678-2b6d-4b8a-971c-e758b0e8e790"
      ]
    }
  }

</code>
</pre>

    <div class="govuk-!-padding-bottom-3"></div>

    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <h2 class="govuk-heading-m">Scenario 6: Application queued notification</h2>

    <h3 class="govuk-heading-s">Request</h3>
    <p class="govuk-body">Method:
      <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
    </p>
    <p class="govuk-body">Endpoint:
      <code
        style="color: #a71d5d; background-color: #f5f5f5">/v0/notifications?notification_type=APPLICATION_ACCEPTED_QUEUED_FOR_DAY_LIST</code>
    </p>
    <p class="govuk-body">Headers:
      <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
  </code>
    </p>

    <h3 class="govuk-heading-s">Response</h3>
    <p class="govuk-body">Status:
      <code style="color: #a71d5d; background-color: #f5f5f5">200</code>
    </p>
    <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": [{
      "notification_id": "&#123;&#123;ID&#125;&#125;",
      "created_datetime": "2024-01-01T12:00:00.000",
      "event_datetime": "2024-01-01T12:00:00.000",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-awaiting-priority.json",
      "notification_type": "APPLICATION_ACCEPTED_QUEUED_FOR_DAY_LIST",
      "subject_type": "LAND_REGISTER_APPLICATION",
      "subject": "45454545-2b6d-4b8a-971c-e758b0e8e790",
      "additional_provider_filter": "subUnit1",
      "status": "NEW",
      "payload": {
        "data" : {
          "status": "ACCEPTED_AWAITING_PRIORITY"
        }
      }
    }]
  }

</code>
</pre>

    <div class="govuk-!-padding-bottom-3"></div>

    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <h2 class="govuk-heading-m">Scenario 7: System error notification</h2>

    <h3 class="govuk-heading-s">Request</h3>
    <p class="govuk-body">Method:
      <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
    </p>
    <p class="govuk-body">Endpoint:
      <code style="color: #a71d5d; background-color: #f5f5f5">/v0/notifications?notification_type=SYSTEM_ERROR</code>
    </p>
    <p class="govuk-body">Headers:
      <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
  </code>
    </p>

    <h3 class="govuk-heading-s">Response</h3>
    <p class="govuk-body">Status:
      <code style="color: #a71d5d; background-color: #f5f5f5">200</code>
    </p>
    <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": [{
      "notification_id": "&#123;&#123;ID&#125;&#125;",
      "created_datetime": "2024-01-01T12:00:00.000",
      "event_datetime": "2024-01-01T12:00:00.000",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/system-error.json",
      "notification_type": "SYSTEM_ERROR",
      "subject_type": "LAND_REGISTER_APPLICATION",
      "subject": "45454545-2b6d-4b8a-971c-e758b0e8e790",
      "additional_provider_filter": "subUnit1",
      "status": "NEW",
      "payload": {
        "data" : {
          "status": "SYSTEM_ERROR"
        }
      }
    }]
  }

</code>
</pre>

    <div class="govuk-!-padding-bottom-3"></div>

    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <h2 class="govuk-heading-m">Scenario 8: Application cancelled notification</h2>

    <h3 class="govuk-heading-s">Request</h3>
    <p class="govuk-body">Method:
      <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
    </p>
    <p class="govuk-body">Endpoint:
      <code
        style="color: #a71d5d; background-color: #f5f5f5">/v0/notifications?notification_type=APPLICATION_CANCELLED</code>
    </p>
    <p class="govuk-body">Headers:
      <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
  </code>
    </p>

    <h3 class="govuk-heading-s">Response</h3>
    <p class="govuk-body">Status:
      <code style="color: #a71d5d; background-color: #f5f5f5">200</code>
    </p>
    <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": [{
      "notification_id": "&#123;&#123;ID&#125;&#125;",
      "created_datetime": "2024-01-01T12:00:00.000",
      "event_datetime": "2024-01-01T12:00:00.000",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/application-cancelled.json",
      "notification_type": "APPLICATION_CANCELLED",
      "subject_type": "LAND_REGISTER_APPLICATION",
      "subject": "45454545-2b6d-4b8a-971c-e758b0e8e790",
      "additional_provider_filter": "subUnit1",
      "status": "NEW",
      "payload": {
        "data" : {
          "status": "CANCELLED"
        }
      }
    }]
  }

</code>
</pre>

    <div class="govuk-!-padding-bottom-3"></div>

    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <h2 class="govuk-heading-m">Scenario 9: Application completed notification</h2>

    <h3 class="govuk-heading-s">Request</h3>
    <p class="govuk-body">Method:
      <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
    </p>
    <p class="govuk-body">Endpoint:
      <code
        style="color: #a71d5d; background-color: #f5f5f5">/v0/notifications?notification_type=APPLICATION_COMPLETED</code>
    </p>
    <p class="govuk-body">Headers:
      <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
  </code>
    </p>

    <h3 class="govuk-heading-s">Response</h3>
    <p class="govuk-body">Status:
      <code style="color: #a71d5d; background-color: #f5f5f5">200</code>
    </p>
    <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": [{
      "notification_id": "&#123;&#123;ID&#125;&#125;",
      "created_datetime": "2024-01-01T12:00:00.000",
      "event_datetime": "2024-01-01T12:00:00.000",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/application-completed.json",
      "notification_type": "APPLICATION_COMPLETED",
      "subject_type": "LAND_REGISTER_APPLICATION",
      "subject": "45454545-2b6d-4b8a-971c-e758b0e8e790",
      "additional_provider_filter": "subUnit1",
      "status": "NEW",
      "payload": {
        "data" : {
          "status": "COMPLETED"
        }
      }
    }]
  }

</code>
</pre>

    <div class="govuk-!-padding-bottom-3"></div>

    </main>

  </div>
</div>