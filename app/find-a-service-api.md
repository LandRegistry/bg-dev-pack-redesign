---
title: Find an API

layout: find-an-api-page
noheader: true
noback: true

eleventyNavigation:
  key: Find an API
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
  - theme: Explore APIs
    text: Find an API
    href: '/find-a-service-api'
    current: true
  - theme: Explore APIs
    text: A guide to testing
    href: '/a-guide-to-testing'
  - theme: Support
    text: Contact us 
    href: '/contact-us'
---

<span class="govuk-caption-xl">Explore APIs</span>
<h1 class="govuk-heading-xl">Find an API</h1>
<div class="govuk-grid-row">
  <p class="govuk-body govuk-!-font-weight-regular govuk-!-margin-left-3">View documentation for our Business Gateway APIs below.</p>
  <p class="govuk-body govuk-!-font-weight-regular govuk-!-margin-left-3">To read more about the types of APIs we use visit <a class="govuk-link" href="/learn-about-the-apis-we-use">Learn about the APIs we use</a>. For a list of HMLR terms and their definitions, visit <a class="govuk-link" href="/glossary">our glossary</a>.</p>
  <div class="govuk-form-group govuk-!-margin-left-3">
    <label class="govuk-label" for="sort">Service</label>
    <select class="govuk-select" id="sort" name="sort">
      <option value="choose-service-api" selected="selected">Choose API</option>
      <option value="application-enquiry">Application Enquiry</option>
      <option value="discharge-activity">Discharge Activity</option>
      <option value="e-document-registration-service">e-Document Registration Service</option>
      <option value="estimated-completion-date">Estimated Completion Date</option>
      <option value="land-charges-full-search">Land Charges Full Search</option>
      <option value="land-charges-bankruptcy-search">Land Charges Bankruptcy Search</option>
      <option value="local-land-charges-search">Local Land Charges Search</option>
      <option value="official-copy-document-availability-v1">Official Copy Document Availability V1</option>
      <option value="official-copy-document-availability-v2">Official Copy Document Availability V2</option>
      <option value="official-copy-title-known">Official Copy Title Known</option>
      <option value="official-search-of-whole-with-priority">Official Search of Whole (with priority)</option>
      <option value="official-search-of-whole-with-priority-with-data">Official Search if Whole (with priority) with Data</option>
      <option value="official-search-of-part">Official Search of Part</option>
      <option value="online-owner-verification">Online Owner Verification</option>
      <option value="outstanding-requests-service">Outstanding Requests Service</option>
      <option value="poll-request-service">Poll Request Service</option>
      <option value="register-extract-service">Register Extract Service</option>
      <option value="registered-proprietor-names">Registered Proprietor Names</option>
      <option value="search-by-property-description">Search by Property Description</option>
      <option value="search-of-the-index-map">Search of the Index Map</option>
      <option value="submit-an-application-to-change-the-land-register">Submit an application to change the Land Register</option>
    </select>
  </div>
</div>

<div class="govuk-grid-row" data-sortable="application-enquiry">
  <a id="application-enquiry" class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/application_enquiry/">Application Enquiry <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to view applications that are not yet completed by HMLR.</p>
</div>

<div class="govuk-grid-row" data-sortable="discharge-activity">
  <a id="discharge-activity" class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/discharge_activity/">Discharge Activity <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to check if any charges have been removed in the previous 30 days.</p>
</div>

<div class="govuk-grid-row" data-sortable="e-document-registration-service">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/edrs/">e-Document Registration Service <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to send applications to change the register, automate the collection of correspondence and responses and receive completed applications.</p>
</div>

<div class="govuk-grid-row" data-sortable="estimated-completion-date">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/estimated_completion_date/">Estimated Completion Date <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--orange">REST API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">The Estimated Completion Date (ECD) is a date by which the application is likely to be completed.</p>
</div>

<div class="govuk-grid-row" data-sortable="land-charges-full-search">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/land_charges_full_search/">Land Charges Full Search <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to request an official search of the Land Charges Register.</p>
</div>

<div class="govuk-grid-row" data-sortable="land-charges-bankruptcy-search">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/land_charges_bankruptcy_search/">Land Charges Bankruptcy Search <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to find bankruptcy details on the Land Charges Register.</p>
</div>

<div class="govuk-grid-row" data-sortable="local-land-charges-search">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/local_land_charges_search/">Local Land Charges Search <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use the Local Land Charges service to find details of entries relating to land or property.</p>
</div>

<div class="govuk-grid-row" data-sortable="notifications">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="/apis/notifications">Notifications <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--orange">REST API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to get updates about multiple applications submitted by the same business unit.</p>
</div>

<div class="govuk-grid-row" data-sortable="official-copy-document-availability-v1">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/official_copy_document_availability_v1/">Official Copy Document Availability V1 <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--orange">REST API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to order the Official Copy Document.</p>
</div>

<div class="govuk-grid-row" data-sortable="official-copy-document-availability-v2">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/official_copy_document_availability_v2/">Official Copy Document Availability V2 <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--orange">REST API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to order the Official Copy Document.</p>
</div>

<div class="govuk-grid-row" data-sortable="official-copy-title-known">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/official_copy_title_known/">Official Copy Title Known <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to order an official copy of the register, title plan, conveyance referred to on the register, deed referred to on the register and lease.</p>
</div>

<div class="govuk-grid-row" data-sortable="official-search-of-whole-with-priority">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/official_search_of_whole/">Official Search of Whole (with Priority) <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service when your application relates to the whole of the registered title to protect transfers, leases and mortgages.</p>
</div>

<div class="govuk-grid-row" data-sortable="official-search-of-whole-with-priority-with-data">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/official_search_of_whole_rest/">Official Search of Whole (with Priority) with Data <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--orange">REST API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service when your application relates to the whole of the registered title to protect transfers, leases and mortgages.</p>
</div>

<div class="govuk-grid-row" data-sortable="official-search-of-part">
  <a class="govuk-heading-s govuk-link govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/official_search_of_part/">Official Search of Part <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service when your application relates to the whole of the registered title to protect transfers, leases and mortgages.</p>
</div>

<div class="govuk-grid-row" data-sortable="online-owner-verification">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/online_owner_verification/">Online Owner Verification <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to verify property ownership data against HMLR property titles in real time.</p>
</div>

<div class="govuk-grid-row" data-sortable="outstanding-requests-service">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/outstanding_requests_service/">Outstanding Requests Service <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to submit a request to return (or obtain) a list of applications with a new response to collect.</p>
</div>

<div class="govuk-grid-row" data-sortable="poll-request-service">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/poll_request_service/">Poll Request Service <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to collect responses for applications that have been manually processed or submitted outside of working hours.</p>
</div>

<div class="govuk-grid-row" data-sortable="register-extract-service">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/register_extract_service/">Register Extract Service <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to get source data from the Land Register in an electronic data stream (alongside the usual supply of the official copy).</p>
</div>

<div class="govuk-grid-row" data-sortable="registered-proprietor-names">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/registered_proprietor_names/">Registered Proprietor Names <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--orange">REST API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to check the name and type of registered proprietors of a registered title throughout the process from instruction to application submission.</p>
</div>

<div class="govuk-grid-row" data-sortable="search-by-property-description">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/search_property_description/">Search by Property Description <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to find out the title number and tenure of a property based on the address supplied.</p>
</div>

<div class="govuk-grid-row" data-sortable="search-of-the-index-map">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="https://landregistry.github.io/bgtechdoc/services/search_index_map/">Search of the Index Map <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--blue">SOAP API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to find out if land is registered and to get the title number.</p>
</div>

<div class="govuk-grid-row" data-sortable="submit-an-application-to-change-the-land-register">
  <a class="govuk-heading-s govuk-link govuk-!-margin-left-3" href="/apis/submit-an-application-to-change-the-land-register">Submit an application to change the Land Register <strong class="govuk-tag govuk-!-margin-left-3 govuk-tag--orange">REST API</strong></a>
  <p class="govuk-body govuk-!-margin-left-3">Use this service to help lodge applications with HMLR to update the register or create a new lease or transfer of part.</p>
</div>
