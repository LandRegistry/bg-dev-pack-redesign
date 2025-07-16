---
layout: page
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">
      Developer pack changelog
    </h1>
    <div class="govuk-grid-row">
      <p class="govuk-body govuk-!-margin-left-3">
        Updates to the developer pack include:</p>
      <ul class="govuk-list govuk-list--bullet govuk-!-margin-left-3">
        <li>an update to the notifications documentation</li>
        <li>new information about transaction types and application types</li>
        <li>removing calculated fees from the Application information API response. Information about fee calculation
          will be shared at a later date</li>
        <li>new information about bypassing specific validation</l>
      </ul>
      <p class="govuk-body govuk-!-margin-left-3">Updates to the schema include:</p>
      <ul class="govuk-list govuk-list--bullet govuk-!-margin-left-3">
        <li>changing the application statuses to <code
            class="x-govuk-code x-govuk-code--inline">ACCEPTED_PRIORITY_PROTECTED</code>, <code
            class="x-govuk-code x-govuk-code--inline">ACCEPTED_AWAITING_PRIORITY</code>, <code
            class="x-govuk-code x-govuk-code--inline">VALIDATION_FAILED</code>, <code
            class="x-govuk-code x-govuk-code--inline">SYSTEM_ERROR</code> and <code
            class="x-govuk-code x-govuk-code--inline">VALIDATING</code></li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">AddressDetails.type</code> to be required
        </li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">BypassValidationData.validation_type</code>
          to have a max length of 250</li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">Charge.value</code> to be required</li>
        <li>a new document type of <code class="x-govuk-code x-govuk-code--inline">RXCD</code></li>
        <li>changing <code
            class="x-govuk-code x-govuk-code--inline">OtherConveyancer.conveyancer_reference</code> to be
          required</li>
        <li>new validation added for <code class="x-govuk-code x-govuk-code--inline">jp1_reference</code></li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">TitleDetails.title_type</code> to be
          required</li>
        <li>changing <code
            class="x-govuk-code x-govuk-code--inline">TitleDetails.disclosable_overriding_interests</code> to be
          required</li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">Party.address_for_service_option</code> to
          be required</li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">Party.representation_type</code> to be
          required</li>
        <li>a new enum value of <code class="x-govuk-code x-govuk-code--inline">NOT_REQUIRED</code> for <code
            class="x-govuk-code x-govuk-code--inline">Party.representation_type</code></li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">PartyRole.party_reference</code> to be
          required</li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">OverseasAddress.country</code> to be
          required</li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">UkAddress.postcode</code> to be required
        </li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">UkAddress.post_town</code> to be required
        </li>
        <li>changing <code class="x-govuk-code x-govuk-code--inline">UkAddress.building_description</code> to be
          required</li>
        <li>changing all successful response objects to have a root level <code
            class="x-govuk-code x-govuk-code--inline">data</code> object</li>
        <li>new schemas for notification <code class="x-govuk-code x-govuk-code--inline">payload</code> elements
        </li>
        <li>a new error response wrapper containing general error information</li>
        <li>removing <code class="x-govuk-code x-govuk-code--inline">summary</code> from the <code
            class="x-govuk-code x-govuk-code--inline">ProblemDetails</code> object</li>
        <li>changing the <code class="x-govuk-code x-govuk-code--inline">BypassValidationData.reason</code> enum
          values to <code class="x-govuk-code x-govuk-code--inline">DISAGREE_WITH_REGISTER</code>, <code
            class="x-govuk-code x-govuk-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code> and <code
            class="x-govuk-code x-govuk-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></li>
      </ul>
    </div>
  </div>
</div>
</div>