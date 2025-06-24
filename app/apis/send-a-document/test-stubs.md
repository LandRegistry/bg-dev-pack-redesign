---
layout: page
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">
      Send a document API test stubs
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
    <p class="govuk-body">Due to technical limitations, these stubs will only allow you to get an upload url. The URL
      won’t work and the
      <code style="color: #a71d5d; background-color: #f5f5f5">PUT</code>
      endpoint is not stubbed.
    </p>
    <p class="govuk-body">Base URL:
      <code style="color: #a71d5d; background-color: #f5f5f5">https://bgtest.landregistry.gov.uk/bg2test/api</code>
    </p>
    <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
    <h3 class="govuk-heading-m">Scenario 1: Success</h2>
      <h3 class="govuk-heading-s">Request</h3>
      <p class="govuk-body">Method:
        <code style="color: #a71d5d; background-color: #f5f5f5">POST</code>
      </p>
      <p class="govuk-body">Endpoint:
        <code style="color: #a71d5d; background-color: #f5f5f5">/v0/documents/url</code>
      </p>
      <p class="govuk-body">Headers:
        <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
        </code>
      </p>
      <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "document_type": "CHARGE",
      "additional_provider_filter": "string",
      "file_length": 123123,
      "file_sha256": "This is a 44 character string. blah blah bla"
    }
  }
</code>
</pre>
      <div class="govuk-!-padding-bottom-6"></div>
      <h3 class="govuk-heading-s">Response</h3>
      <p class="govuk-body">Status:
        <code style="color: #a71d5d; background-color: #f5f5f5">200</code>
      </p>
      <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "upload_url": "https://www.your-upload-url-would-be-here.com",
      "document_id": "12345678-1234-1234-1234-1234-123456789abc"
    }
  }
</code>
</pre>
      <p class="govuk-body">Note: This response body may contain any random UUID.</p>
      <div class="govuk-!-padding-bottom-3"></div>
      <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
      <h3 class="govuk-heading-m">Scenario 2: Invalid Document Type</h2>
        <h3 class="govuk-heading-s">Request</h3>
        <p class="govuk-body">Method:
          <code style="color: #a71d5d; background-color: #f5f5f5">POST</code>
        </p>
        <p class="govuk-body">Endpoint:
          <code style="color: #a71d5d; background-color: #f5f5f5">/v0/documents/url</code>
        </p>
        <p class="govuk-body">Headers:
          <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
        </code>
        </p>
        <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "document_type": "INVALID",
      "additional_provider_filter": "string",
      "file_length": 123123,
      "file_sha256": "This is a 44 character string. blah blah bla"
    }
  }
</code>
</pre>
        <div class="govuk-!-padding-bottom-6"></div>
        <h3 class="govuk-heading-s">Response</h3>
        <p class="govuk-body">Status:
          <code style="color: #a71d5d; background-color: #f5f5f5">400</code>
        </p>
        <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "type": "https://landregistry.github.io/bgtechdoc/problems/global#bad-request",
    "title": "Bad Request",
    "detail": "The request is invalid or malformed.",
    "status": "400",
    "errors": [{
      "type": "L1A_JSON_PARSE_ERROR",
      "detail": "Invalid document_type: 'INVALID'"
    }]
  }
</code>
</pre>
        <div class="govuk-!-padding-bottom-3"></div>
        <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
        <h3 class="govuk-heading-m">Scenario 3: Invalid file length (too small)</h2>
          <h3 class="govuk-heading-s">Request</h3>
          <p class="govuk-body">Method:
            <code style="color: #a71d5d; background-color: #f5f5f5">POST</code>
          </p>
          <p class="govuk-body">Endpoint:
            <code style="color: #a71d5d; background-color: #f5f5f5">/v0/documents/url</code>
          </p>
          <p class="govuk-body">Headers:
            <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
        </code>
          </p>
          <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "document_type": "CHARGE",
      "additional_provider_filter": "string",
      "file_length": 0,
      "file_sha256": "This is a 44 character string. blah blah bla"
    }
  }
</code>
</pre>
          <div class="govuk-!-padding-bottom-6"></div>
          <h3 class="govuk-heading-s">Response</h3>
          <p class="govuk-body">Status:
            <code style="color: #a71d5d; background-color: #f5f5f5">400</code>
          </p>
          <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "type": "https://landregistry.github.io/bgtechdoc/problems/global#bad-request",
    "title": "Bad Request",
    "detail": "The request is invalid or malformed.",
    "status": "400",
    "errors": [{
      "type": "L1A_SCHEMA_VALIDATION_ERROR",
      "detail": "There are problems with the JSON provided [must be greater than or equal to 1]"
    }]
  }
</code>
</pre>
          <div class="govuk-!-padding-bottom-3"></div>
          <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
          <h3 class="govuk-heading-m">Scenario 4: Invalid file length (too large)</h2>
            <h3 class="govuk-heading-s">Request</h3>
            <p class="govuk-body">Method:
              <code style="color: #a71d5d; background-color: #f5f5f5">POST</code>
            </p>
            <p class="govuk-body">Endpoint:
              <code style="color: #a71d5d; background-color: #f5f5f5">/v0/documents/url</code>
            </p>
            <p class="govuk-body">Headers:
              <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
        </code>
            </p>
            <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "document_type": "CHARGE",
      "additional_provider_filter": "string",
      "file_length": 419430401,
      "file_sha256": "This is a 44 character string. blah blah bla"
    }
  }
</code>
</pre>
            <div class="govuk-!-padding-bottom-6"></div>
            <h3 class="govuk-heading-s">Response</h3>
            <p class="govuk-body">Status:
              <code style="color: #a71d5d; background-color: #f5f5f5">400</code>
            </p>
            <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "type": "https://landregistry.github.io/bgtechdoc/problems/global#bad-request",
    "title": "Bad Request",
    "detail": "The request is invalid or malformed.",
    "status": "400",
    "errors": [{
      "type": "L1A_SCHEMA_VALIDATION_ERROR",
      "detail": "There are problems with the JSON provided [must be less than or equal to 41943040]"
    }]
  }
</code>
</pre>
            <div class="govuk-!-padding-bottom-3"></div>
            <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
            <h3 class="govuk-heading-m">Scenario 5: Invalid File_SHA256</h2>
              <h3 class="govuk-heading-s">Request</h3>
              <p class="govuk-body">Method:
                <code style="color: #a71d5d; background-color: #f5f5f5">POST</code>
              </p>
              <p class="govuk-body">Endpoint:
                <code style="color: #a71d5d; background-color: #f5f5f5">/v0/documents/url</code>
              </p>
              <p class="govuk-body">Headers:
                <code style="color: #a71d5d; background-color: #f5f5f5">Authorization: &ltany-value&gt
        </code>
              </p>
              <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "data": {
      "document_type": "CHARGE",
      "additional_provider_filter": "string",
      "file_length": 123123,
      "file_sha256": "This is less than 44 characters."
    }
  }
</code>
</pre>
              <div class="govuk-!-padding-bottom-6"></div>
              <h3 class="govuk-heading-s">Response</h3>
              <p class="govuk-body">Status:
                <code style="color: #a71d5d; background-color: #f5f5f5">400</code>
              </p>
              <pre>
<code class="language-json" style="background-color: #f3f2f1">
  {
    "type": "https://landregistry.github.io/bgtechdoc/problems/global#bad-request",
    "title": "Bad Request",
    "detail": "The request is invalid or malformed.",
    "status": "400",
    "errors": [{
      "type": "L1A_SCHEMA_VALIDATION_ERROR",
      "detail": "There are problems with the JSON provided [size must be between 44 and 44]"
    }]
  }
</code>
</pre>
  </div>
</div>