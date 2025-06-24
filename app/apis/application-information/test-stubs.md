---
layout: page
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">
      Application information API test stubs
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
    <h3 class="govuk-heading-m">Scenario 1: Information of applicaiton with single charge</h2>
      <h3 class="govuk-heading-s">Request</h3>
      <p class="govuk-body">Method:
        <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
      </p>
      <p class="govuk-body">Endpoint:
        <code
          style="color: #a71d5d; background-color: #f5f5f5">/v0/applications/b3ac19be-2b6d-4b8a-971c-e758b0e8e790/information</code>
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
    "data": {
      "application_request_id": "b3ac19be-2b6d-4b8a-971c-e758b0e8e790",
      "status": "ACCEPTED_PRIORITY_PROTECTED",
      "priority_timestamp": "2024-09-25T18:18:49Z",
      "hmlr_reference": "A123AAA",
      "errors": []
    }
  }
</code>
</pre>
      <div class="govuk-!-padding-bottom-3"></div>
      <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
      <h3 class="govuk-heading-m">Scenario 2: Information of application with single transfer</h2>
        <h3 class="govuk-heading-s">Request</h3>
        <p class="govuk-body">Method:
          <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
        </p>
        <p class="govuk-body">Endpoint:
          <code
            style="color: #a71d5d; background-color: #f5f5f5">/v0/applications/2563940e-ae95-4e7e-9b33-49a6571abdf6/information</code>
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
    "data": {
      "application_request_id": "2563940e-ae95-4e7e-9b33-49a6571abdf6",
      "status": "ACCEPTED_PRIORITY_PROTECTED",
      "priority_timestamp": "2024-09-25T18:18:49Z",
      "hmlr_reference": "B123BBB",
      "errors": []
    }
  }
</code>
</pre>
        <div class="govuk-!-padding-bottom-3"></div>
        <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
        <h3 class="govuk-heading-m">Scenario 3: Information of application with level 2 validation errors</h2>
          <h3 class="govuk-heading-s">Request</h3>
          <p class="govuk-body">Method:
            <code style="color: #a71d5d; background-color: #f5f5f5">GET</code>
          </p>
          <p class="govuk-body">Endpoint:
            <code
              style="color: #a71d5d; background-color: #f5f5f5">/v0/applications/3be62ad3-c542-452d-975e-6cd18d77196f/information</code>
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
    "data": {
      "status": "VALIDATION_FAILED",
      "hmlr_reference": null,
      "priority_timestamp": null,
      "errors": [{
        "type": "mdref-on-record",
        "detail": "MD Ref MD007A does not exist on record",
        "pointer": null
      }, {
        "type": "lender-name-matches-records",
        "detail": "MD Ref MD007A not found on record",
        "pointer": null
      }, {
        "type": "all-mandatory-documents-provided",
        "detail": "Mandatory documents missing for transactions of type [T]",
        "pointer": null
      }, {
        "type": "transferee-has-representation-type",
        "detail": "Transferee Transferee must have a representation type",
        "pointer": null
      }],
      "warnings": [],
      "application_request_id": "3be62ad3-c542-452d-975e-6cd18d77196f"
    }
  }
</code>
</pre>
  </div>
</div>