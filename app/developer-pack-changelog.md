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
            style="color: #a71d5d; background-color: #f5f5f5">ACCEPTED_PRIORITY_PROTECTED</code>, <code
            style="color: #a71d5d; background-color: #f5f5f5">ACCEPTED_AWAITING_PRIORITY</code>, <code
            style="color: #a71d5d; background-color: #f5f5f5">VALIDATION_FAILED</code>, <code
            style="color: #a71d5d; background-color: #f5f5f5">SYSTEM_ERROR</code> and <code
            style="color: #a71d5d; background-color: #f5f5f5">VALIDATING</code></li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">AddressDetails.type</code> to be required
        </li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">BypassValidationData.validation_type</code>
          to have a max length of 250</li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">Charge.value</code> to be required</li>
        <li>a new document type of <code style="color: #a71d5d; background-color: #f5f5f5">RXCD</code></li>
        <li>changing <code
            style="color: #a71d5d; background-color: #f5f5f5">OtherConveyancer.conveyancer_reference</code> to be
          required</li>
        <li>new validation added for <code style="color: #a71d5d; background-color: #f5f5f5">jp1_reference</code></li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">TitleDetails.title_type</code> to be
          required</li>
        <li>changing <code
            style="color: #a71d5d; background-color: #f5f5f5">TitleDetails.disclosable_overriding_interests</code> to be
          required</li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">Party.address_for_service_option</code> to
          be required</li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">Party.representation_type</code> to be
          required</li>
        <li>a new enum value of <code style="color: #a71d5d; background-color: #f5f5f5">NOT_REQUIRED</code> for <code
            style="color: #a71d5d; background-color: #f5f5f5">Party.representation_type</code></li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">PartyRole.party_reference</code> to be
          required</li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">OverseasAddress.country</code> to be
          required</li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">UkAddress.postcode</code> to be required
        </li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">UkAddress.post_town</code> to be required
        </li>
        <li>changing <code style="color: #a71d5d; background-color: #f5f5f5">UkAddress.building_description</code> to be
          required</li>
        <li>changing all successful response objects to have a root level <code
            style="color: #a71d5d; background-color: #f5f5f5">data</code> object</li>
        <li>new schemas for notification <code style="color: #a71d5d; background-color: #f5f5f5">payload</code> elements
        </li>
        <li>a new error response wrapper containing general error information</li>
        <li>removing <code style="color: #a71d5d; background-color: #f5f5f5">summary</code> from the <code
            style="color: #a71d5d; background-color: #f5f5f5">ProblemDetails</code> object</li>
        <li>changing the <code style="color: #a71d5d; background-color: #f5f5f5">BypassValidationData.reason</code> enum
          values to <code style="color: #a71d5d; background-color: #f5f5f5">DISAGREE_WITH_REGISTER</code>, <code
            style="color: #a71d5d; background-color: #f5f5f5">HMLR_DATA_INCORRECT_OR_OUTDATED</code> and <code
            style="color: #a71d5d; background-color: #f5f5f5">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></li>
      </ul>
    </div>
  </div>
</div>
</div>