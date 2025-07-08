---
layout: guidance.njk

title: Submit an application API technical guide
description: Use this service to provide data to HMLR for updating the register.

notlive: true

eleventyNavigation:
    key: Technical guide
    parent: Submit an application API

sidenav:
  - theme: Contents
    text: How to use the Submit an application API
    href: '#how-to-use-the-submit-an-application-api'
  - theme: Contents
    text: Validation rules
    href: '#validation-rules'
  - theme: Contents
    text: Example requests and responses
    href: '#example-requests-and-responses'

versions:
  - value: "0.3"
    text: "v0.3 (latest)"
    selected: true
    
relatedAPIs:
  - text: Send a document API
    href: /apis/send-a-document
  - text: Application information API
    href: /apis/application-information
  - text: Notifications API
    href: /apis/notifications
  - text: Submit an application to change the land register API
    href: /apis/submit-an-application-to-change-the-land-register
---
{% from "govuk/components/button/macro.njk" import govukButton %}

<h2 class="govuk-heading-m" id="how-to-use-the-submit-an-application-api">How to use the Submit an application API</h2>
<div>
  <p class="govuk-body">To submit an application request, make an HTTP POST request to the application request
    endpoint, the body of which contains the information about the application using the <code
      class="x-govuk-code x-govuk-code--inline">application/json</code> content type.</p>
  <p class="govuk-body">This endpoint will return an object containing a unique ID for the request, <code
      class="x-govuk-code x-govuk-code--inline">application_request_id</code>, which is then used when
    fetching the status of the application. Any errors in the schema will be rejected as a 400 HTTP error. Any other
    validation errors will be returned in the application information response.</p>
</div>
<div>
  <h3 class="govuk-heading-s">Notifications</h3>
  <p class="govuk-body">Note: For general information, view the <a class="govuk-body govuk-link"
      href="/apis/notifications">notifications API page</a>.</p>
  <p class="govuk-body">During application submission, notifications will be available from the notifications API
    about changes that happen to the application. These notifications currently include:</p>
  <ul class="govuk-list govuk-list--bullet">
    <li><code class="x-govuk-code x-govuk-code--inline">APPLICATION_ACCEPTED_ON_DAY_LIST</code> - the
      application has been accepted and is on the day list</li>
    <li><code class="x-govuk-code x-govuk-code--inline">APPLICATION_ACCEPTED_QUEUED_FOR_DAY_LIST</code> -
      the application has been accepted and is queuing for the day list</li>
    <li><code class="x-govuk-code x-govuk-code--inline">APPLICATION_VALIDATION_FAILED</code> - the
      application submission has failed</li>
    <li><code class="x-govuk-code x-govuk-code--inline">APPLICATION_ERROR</code> - the application has not
      been added to the day list due to an error</li>
  </ul>
  <p class="govuk-body">The notifications will contain the following information:</p>
  <ul class="govuk-list govuk-list--bullet">
    <li><code class="x-govuk-code x-govuk-code--inline">APPLICATION_ACCEPTED_QUEUED_FOR_DAY_LIST</code>,
      <code class="x-govuk-code x-govuk-code--inline">APPLICATION_VALIDATION_FAILED</code> and <code
        class="x-govuk-code x-govuk-code--inline">APPLICATION_ERROR</code> will contain the updated order
      status only</li>
    <li><code class="x-govuk-code x-govuk-code--inline">APPLICATION_ACCEPTED_ON_DAY_LIST</code> will contain
      the updated order status, the priority of the application and the HMLR reference for the accepted application
    </li>
  </ul>
  <p class="govuk-body">To get more detailed information about an application that caused the notification, use the
    <a class="govuk-body govuk-link"
      href="https://customer-documentation-business-gateway-35cf334e5a1aeb361fcf62d.git.tooling.stp.hmlr.zone/vcad/v0_3/application-information.html">Application
      information API</a>. For example, after receiving an <code
      class="x-govuk-code x-govuk-code--inline">APPLICATION_VALIDATION_FAILED</code> notification, use the
    Application information API to get a list of the validation errors.</p>
  <h3 class="govuk-heading-s">Schemas</h3>
  <p class="govuk-body">JSON schemas can be found below:</p>
  <ul class="govuk-list govuk-list--bullet">
    <li><a class="govuk-body govuk-link"
        href="https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-priority-protected.json"><code
          style="color: 	#1d70b8; background-color: #f5f5f5">APPLICATION_ACCEPTED_ON_DAY_LIST</code></a></li>
    <li><a class="govuk-body govuk-link"
        href="https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/accepted-awaiting-priority.json"><code
          style="color: 	#1d70b8; background-color: #f5f5f5">APPLICATION_ACCEPTED_QUEUED_FOR_DAY_LIST</code></a>
    </li>
    <li><a class="govuk-body govuk-link"
        href="https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/validation-failed.json"><code
          style="color: 	#1d70b8; background-color: #f5f5f5">APPLICATION_VALIDATION_FAILED</code></a></li>
    <li><a class="govuk-body govuk-link"
        href="https://landregistry.github.io/bgtechdoc/vcad/schemas/v1/system-error.json"><code
          style="color: 	#1d70b8; background-color: #f5f5f5">APPLICATION_ERROR</code></a></li>
  </ul>
  <h2 class="govuk-heading-m" id="validation-rules">Validation rules</h2>
  <div>
    <p class="govuk-body">The structure has changed between the SOAP and REST APIs. Most fields retain their
      existing names, but some have changed, as noted below:</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--m">SOAP migration guide</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">SOAP field</th>
          <th scope="col" class="govuk-table__header">REST field</th>
          <th scope="col" class="govuk-table__header">Comment</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">AddressForService</td>
          <td class="govuk-table__cell govuk-table__cell">full_address</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">AP1WarningUnderstood</td>
          <td class="govuk-table__cell govuk-table__cell">submission_warning_understood</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">ApplicationAffectsContent</td>
          <td class="govuk-table__cell govuk-table__cell">scope</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">TitleScopeDetails</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">Applications</td>
          <td class="govuk-table__cell govuk-table__cell">Transaction</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">CareOfReference</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
          <td class="govuk-table__cell govuk-table__cell">Care of reference should not be sent</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">CertifiedCopy</td>
          <td class="govuk-table__cell govuk-table__cell">certification_statement_type</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">DocumentDetails.DocumentMetadata</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">ChargeDate</td>
          <td class="govuk-table__cell govuk-table__cell">date</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">Charge</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">CompanyName</td>
          <td class="govuk-table__cell govuk-table__cell">organisation_name</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">OverseasCompany</code>, <code
              class="x-govuk-code x-govuk-code--inline">UKCompany</code> and <code
              class="x-govuk-code x-govuk-code--inline">OtherOrganisation</code> objects</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">CompanyRegistrationNumber</td>
          <td class="govuk-table__cell govuk-table__cell">company_number</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">ConveyancerName</td>
          <td class="govuk-table__cell govuk-table__cell">full_name</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">OtherConveyancer</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">Dealing</td>
          <td class="govuk-table__cell govuk-table__cell">REGISTER_UPDATE type</td>
          <td class="govuk-table__cell govuk-table__cell">Service title type corresponds to the application type
          </td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">DisclosableOveridingInterests</td>
          <td class="govuk-table__cell govuk-table__cell">disclosable_overriding_interests</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">TitleDetails</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">DocumentNameContent</td>
          <td class="govuk-table__cell govuk-table__cell">type</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">DocumentDetails</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">DXExchange</td>
          <td class="govuk-table__cell govuk-table__cell">exchange_name</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">DxAddress</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">DXNumber</td>
          <td class="govuk-table__cell govuk-table__cell">number</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">DxAddress</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">EmailAddress.Email</td>
          <td class="govuk-table__cell govuk-table__cell">email</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">Address</code> object, where type is <code
              class="x-govuk-code x-govuk-code--inline">Email</code></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">IsApplicant</td>
          <td class="govuk-table__cell govuk-table__cell">applicants[]</td>
          <td class="govuk-table__cell govuk-table__cell">Array containing <code
              class="x-govuk-code x-govuk-code--inline">PartyReferences</code> for applicants</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">LeaseExtension</td>
          <td class="govuk-table__cell govuk-table__cell">DISPOSITIONARY_FIRST_LEASE type</td>
          <td class="govuk-table__cell govuk-table__cell">Service title type corresponds to the application type
          </td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">LesseeTitles</td>
          <td class="govuk-table__cell govuk-table__cell">TENANT_TITLE</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">LessorTitles</td>
          <td class="govuk-table__cell govuk-table__cell">LANDLORD_TITLE</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">LocalAuthority</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
          <td class="govuk-table__cell govuk-table__cell">Local authority should not be sent</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">MessageID</td>
          <td class="govuk-table__cell govuk-table__cell">Idempotency-Key</td>
          <td class="govuk-table__cell govuk-table__cell">Idempotency-Key is a HTTP Header</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">NewLease</td>
          <td class="govuk-table__cell govuk-table__cell">DISPOSITIONARY_FIRST_LEASE type</td>
          <td class="govuk-table__cell govuk-table__cell">Service title type corresponds to the application type
          </td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">NoMDRef</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
          <td class="govuk-table__cell govuk-table__cell">If the MDref is not sent, it is assumed the MDRef is not
            known and lender information must be provided</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">OverseasTerritory</td>
          <td class="govuk-table__cell govuk-table__cell">incorporation_territory</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">PostalAddress</td>
          <td class="govuk-table__cell govuk-table__cell">UKAddress</td>
          <td class="govuk-table__cell govuk-table__cell">A type on the <code
              class="x-govuk-code x-govuk-code--inline">Address</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">PostcodeOfProperty</td>
          <td class="govuk-table__cell govuk-table__cell">postcode</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">UKAddress</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">Product.Email</td>
          <td class="govuk-table__cell govuk-table__cell">email</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">ApplicationLodger</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">Reference</td>
          <td class="govuk-table__cell govuk-table__cell">customer_reference</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">Reference</td>
          <td class="govuk-table__cell govuk-table__cell">conveyancer_reference</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">OtherConveyancer</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">RoleType</td>
          <td class="govuk-table__cell govuk-table__cell">Role</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">PartyRole</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">ServiceTitlesType</td>
          <td class="govuk-table__cell govuk-table__cell">type</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">substantiveOrderV5Data</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">SortCode</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
          <td class="govuk-table__cell govuk-table__cell">Sort code should not be sent</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">TelephoneNumber</td>
          <td class="govuk-table__cell govuk-table__cell">telephone</td>
          <td class="govuk-table__cell govuk-table__cell">Field on <code
              class="x-govuk-code x-govuk-code--inline">ApplicationLodger</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">TitleType</td>
          <td class="govuk-table__cell govuk-table__cell">title_type</td>
          <td class="govuk-table__cell govuk-table__cell">Changed from an object containing a title number to a enum
            on the <code class="x-govuk-code x-govuk-code--inline">titleDetails</code> object</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">TransferOfPart</td>
          <td class="govuk-table__cell govuk-table__cell">TRANSFER_OF_PART type</td>
          <td class="govuk-table__cell govuk-table__cell">Service title type corresponds to the application type
          </td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell">UK-LLPRegistrationNumber</td>
          <td class="govuk-table__cell govuk-table__cell">company_number</td>
          <td class="govuk-table__cell govuk-table__cell"></td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">List of valid territories</h3>
    <p class="govuk-body">When a party is an overseas company, you must provide the territory of incorporation. This
      territory must be one of the territories defined below:</p>
    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          Valid territories
        </span>
      </summary>
      <div class="govuk-details__text">
        <ul class="govuk-list govuk-list--bullet">
          <li>Abu Dhabi, United Arab Emirates</li>
          <li>Afghanistan</li>
          <li>Ajman Free Zone, United Arab Emirates</li>
          <li>Ajman, United Arab Emirates</li>
          <li>Alabama, United States of America</li>
          <li>Aland</li>
          <li>Alaska, United States of America</li>
          <li>Albania</li>
          <li>Alberta, Canada</li>
          <li>Alderney</li>
          <li>Algeria</li>
          <li>American Samoa</li>
          <li>Andorra</li>
          <li>Angola</li>
          <li>Anguilla</li>
          <li>Antarctica</li>
          <li>Antigua & Barbuda</li>
          <li>Antigua and Barbuda</li>
          <li>Argentina</li>
          <li>Arizona, United States of America</li>
          <li>Arkansas, United States of America</li>
          <li>Armenia</li>
          <li>Aruba</li>
          <li>Ascension Island</li>
          <li>Australia</li>
          <li>Australian Antarctic Territory</li>
          <li>Austria</li>
          <li>Azerbaijan</li>
          <li>Azores</li>
          <li>Bahamas</li>
          <li>Bahrain</li>
          <li>Bangladesh</li>
          <li>Barbados</li>
          <li>Belarus</li>
          <li>Belau</li>
          <li>Belgium</li>
          <li>Belize</li>
          <li>Benin</li>
          <li>Bermuda</li>
          <li>Bhutan</li>
          <li>Bolivarian Republic of Venezuela</li>
          <li>Bolivia</li>
          <li>Bonaire</li>
          <li>Bonaire, Sint Eustatius and Saba</li>
          <li>Bosnia & Herzegovina</li>
          <li>Bosnia and Herzegovina</li>
          <li>Botswana</li>
          <li>Bouvet Island</li>
          <li>Brazil</li>
          <li>British Antarctic Territory</li>
          <li>British Colombia, Canada</li>
          <li>British Indian Ocean Territory</li>
          <li>British Virgin Islands</li>
          <li>Brunei Darussalam</li>
          <li>Bulgaria</li>
          <li>Burkina Faso</li>
          <li>Burundi</li>
          <li>Cabo Verde</li>
          <li>California, United States of America</li>
          <li>Cambodia</li>
          <li>Cameroon</li>
          <li>Canada</li>
          <li>Cape Verde</li>
          <li>Carolina Islands</li>
          <li>Cayman Islands</li>
          <li>Central African Republic</li>
          <li>Chad</li>
          <li>Channel Islands</li>
          <li>Chile</li>
          <li>China</li>
          <li>Christmas Island</li>
          <li>Christmas Island (Indian Ocean)</li>
          <li>Christmas Island (Pacific Ocean)</li>
          <li>Cocos (Keeling) Islands</li>
          <li>Cocos Islands</li>
          <li>Colombia</li>
          <li>Colorado, United States of America</li>
          <li>Comoros</li>
          <li>Congo</li>
          <li>Connecticut, United States of America</li>
          <li>Cook Islands</li>
          <li>Costa Rica</li>
          <li>Cote D'Ivoire</li>
          <li>Cote D’‘Ivoire</li>
          <li>Croatia</li>
          <li>Cuba</li>
          <li>Curacao</li>
          <li>Cyprus</li>
          <li>Czech Republic</li>
          <li>Czechia</li>
          <li>Delaware, United States of America</li>
          <li>Democratic People’s Republic of Korea</li>
          <li>Democratic Republic of Congo</li>
          <li>Democratic Republic of the Congo</li>
          <li>Denmark</li>
          <li>Djibouti</li>
          <li>Dominica</li>
          <li>Dominican Republic</li>
          <li>Dubai International Financial Centre, United Arab Emirates</li>
          <li>Dubai Silicon Oasis, United Arab Emirates</li>
          <li>Dubai, United Arab Emirates</li>
          <li>East Timor</li>
          <li>Ecuador</li>
          <li>Egypt</li>
          <li>Eire</li>
          <li>El Salvador</li>
          <li>Equatorial Guinea</li>
          <li>Eritrea</li>
          <li>Estonia</li>
          <li>Eswatini</li>
          <li>Ethiopia</li>
          <li>Europe under the Treaty on European Union and the Treaty on the Functioning of the European Union</li>
          <li>Falkland Islands</li>
          <li>Faroe Islands</li>
          <li>Federated States of Micronesia</li>
          <li>Fiji</li>
          <li>Finland</li>
          <li>Florida, United States of America</li>
          <li>France</li>
          <li>French Guinea</li>
          <li>French Polynesia</li>
          <li>French Southern Antarctic Territory</li>
          <li>Fujairah Media Free Zone, United Arab Emirates</li>
          <li>Fujairah, United Arab Emirates</li>
          <li>Fyr Macedonia</li>
          <li>Gabon</li>
          <li>Gambia</li>
          <li>Georgia</li>
          <li>Georgia, United States of America</li>
          <li>Germany</li>
          <li>Ghana</li>
          <li>Gibraltar</li>
          <li>Greece</li>
          <li>Greenland</li>
          <li>Grenada</li>
          <li>Guadeloupe</li>
          <li>Guam</li>
          <li>Guatemala</li>
          <li>Guernsey</li>
          <li>Guinea</li>
          <li>Guinea-Bissau</li>
          <li>Guyana</li>
          <li>Haiti</li>
          <li>Hawaii, United States of America</li>
          <li>Heard & Mcdonald Islands</li>
          <li>Heard and Mcdonald Islands</li>
          <li>Holy See</li>
          <li>Honduras</li>
          <li>Hong Kong</li>
          <li>Hungary</li>
          <li>Iceland</li>
          <li>Idaho, United States of America</li>
          <li>Illinois, United States of America</li>
          <li>India</li>
          <li>Indiana, United States of America</li>
          <li>Indonesia</li>
          <li>Iowa, United States of America</li>
          <li>Iran</li>
          <li>Iraq</li>
          <li>Ireland</li>
          <li>Isle of Man</li>
          <li>Israel</li>
          <li>Italy</li>
          <li>Ivory Coast</li>
          <li>Jamaica</li>
          <li>Japan</li>
          <li>Jebel Ali Free Zone, United Arab Emirates</li>
          <li>Jersey</li>
          <li>Jordan</li>
          <li>Kansas, United States of America</li>
          <li>Kazakhstan</li>
          <li>Kentucky, United States of America</li>
          <li>Kenya</li>
          <li>Kiribati</li>
          <li>Kosovo</li>
          <li>Kuwait</li>
          <li>Kyrgyzstan</li>
          <li>Labuan</li>
          <li>Labuan, Malaysia</li>
          <li>Lao People’s Democratic Republic</li>
          <li>Laos</li>
          <li>Latvia</li>
          <li>Lebanon</li>
          <li>Lesotho</li>
          <li>Liberia</li>
          <li>Libya</li>
          <li>Liechtenstein</li>
          <li>Lithuania</li>
          <li>Louisiana, United States of America</li>
          <li>Luxembourg</li>
          <li>Macao</li>
          <li>Madagascar</li>
          <li>Madeira Free Trade Zone</li>
          <li>Maine, United States of America</li>
          <li>Malawi</li>
          <li>Malaysia</li>
          <li>Maldives</li>
          <li>Mali</li>
          <li>Malta</li>
          <li>Manitoba, Canada</li>
          <li>Mariana Islands</li>
          <li>Marshall Islands</li>
          <li>Martinique</li>
          <li>Maryland, United States of America</li>
          <li>Massachusetts, United States of America</li>
          <li>Mauritania</li>
          <li>Mauritius</li>
          <li>Mayotte</li>
          <li>Mexico</li>
          <li>Michigan, United States of America</li>
          <li>Minnesota, United States of America</li>
          <li>Mississippi, United States of America</li>
          <li>Missouri, United States of America</li>
          <li>Moldova</li>
          <li>Monaco</li>
          <li>Mongolia</li>
          <li>Montana, United States of America</li>
          <li>Montenegro</li>
          <li>Montserrat</li>
          <li>Morocco</li>
          <li>Mozambique</li>
          <li>Myanmar</li>
          <li>Namibia</li>
          <li>Nauru</li>
          <li>Nauru Island</li>
          <li>Nebraska, United States of America</li>
          <li>Nepal</li>
          <li>Netherland Antarctic Territory</li>
          <li>Netherlands</li>
          <li>Netherlands Antilles</li>
          <li>Nevada, United States of America</li>
          <li>Nevis</li>
          <li>New Brunswick, Canada</li>
          <li>New Caledonia</li>
          <li>New Hampshire, United States of America</li>
          <li>New Jersey, United States of America</li>
          <li>New Mexico, United States of America</li>
          <li>New York, United States of America</li>
          <li>New Zealand</li>
          <li>New Zealand Antarctic Territory</li>
          <li>Newfoundland and Labrador, Canada</li>
          <li>Nicaragua</li>
          <li>Niger</li>
          <li>Nigeria</li>
          <li>Niue</li>
          <li>Niue</li>
          <li>Norfolk Island</li>
          <li>North Carolina, United States of America</li>
          <li>North Dakota, United States of America</li>
          <li>North Macedonia</li>
          <li>Northern Mariana Islands</li>
          <li>Northwest Territories, Canada</li>
          <li>Norway</li>
          <li>Norwegian Antarctic Territory</li>
          <li>Nova Scotia, Canada</li>
          <li>Nunavut, Canada</li>
          <li>Ohio, United States of America</li>
          <li>Oklahoma, United States of America</li>
          <li>Oman</li>
          <li>Ontario, Canada</li>
          <li>Oregon, United States of America</li>
          <li>Pakistan</li>
          <li>Palau</li>
          <li>Palestine</li>
          <li>Palestine Territory</li>
          <li>Panama</li>
          <li>Papua New Guinea</li>
          <li>Paraguay</li>
          <li>Pennsylvania, United States of America</li>
          <li>Peoples Republic of Congo</li>
          <li>Peru</li>
          <li>Philippines</li>
          <li>Pitcairn Island</li>
          <li>Poland</li>
          <li>Portugal</li>
          <li>Prince Edward Island, Canada</li>
          <li>Puerto Rico</li>
          <li>Qatar</li>
          <li>Quebec, Canada</li>
          <li>Ras Al Khaimah Free Trade Zone, United Arab Emirates</li>
          <li>Ras Al Khaimah, United Arab Emirates</li>
          <li>Republic of Korea</li>
          <li>Republic of Moldova</li>
          <li>Reunion</li>
          <li>Rhode Island, United States of America</li>
          <li>Romania</li>
          <li>Russian Federation</li>
          <li>Rwanda</li>
          <li>S Georgia and S Sandwich Islands</li>
          <li>Saint Barthelemy</li>
          <li>Saint Helena</li>
          <li>Saint Kitts</li>
          <li>Saint Lucia</li>
          <li>Saint Martin</li>
          <li>Saint Pierre and Miquelon</li>
          <li>Saint Vincent & Grenadines</li>
          <li>Saint Vincent and the Grenadines</li>
          <li>Samoa</li>
          <li>San Marino</li>
          <li>Sao Tome & Principe</li>
          <li>Sao Tome and Principe</li>
          <li>Sark</li>
          <li>Saskatchewan, Canada</li>
          <li>Saudi Arabia</li>
          <li>Scattered Islands</li>
          <li>Senegal</li>
          <li>Serbia</li>
          <li>Serbia and Montenegro</li>
          <li>Seychelles</li>
          <li>Sharjah, United Arab Emirates</li>
          <li>Sierra Leone</li>
          <li>Singapore</li>
          <li>Sint Eustatius and Saba</li>
          <li>Sint Maarten</li>
          <li>Slovakia</li>
          <li>Slovenia</li>
          <li>Solomon Islands</li>
          <li>Somalia</li>
          <li>South Africa</li>
          <li>South Carolina, United States of America</li>
          <li>South Dakota, United States of America</li>
          <li>South Sudan</li>
          <li>Spain</li>
          <li>Spanish Territory of North Africa</li>
          <li>Spitzbergen</li>
          <li>Sri Lanka</li>
          <li>St Barthelemy</li>
          <li>St Helena</li>
          <li>St Kitts & Nevis</li>
          <li>St Lucia</li>
          <li>St Martin</li>
          <li>St Pierre and Miquelon</li>
          <li>Sudan</li>
          <li>Sultanate of Oman</li>
          <li>Suriname</li>
          <li>Svalbard and Jan Mayen</li>
          <li>Swaziland</li>
          <li>Sweden</li>
          <li>Switzerland</li>
          <li>Syria</li>
          <li>Syrian Arab Republic</li>
          <li>Tahiti</li>
          <li>Taiwan</li>
          <li>Taiwan, Province of China</li>
          <li>Tajikistan</li>
          <li>Tanzania</li>
          <li>Tasmania</li>
          <li>Tasmania, Australia</li>
          <li>Tennessee, United States of America</li>
          <li>Texas, United States of America</li>
          <li>Thailand</li>
          <li>The Bahamas</li>
          <li>The Congo</li>
          <li>The Democratic Republic of Korea</li>
          <li>The Dominican Republic</li>
          <li>The Peoples Republic of Korea</li>
          <li>Tibet</li>
          <li>Timor-Leste</li>
          <li>Togo</li>
          <li>Tokelau</li>
          <li>Tonga</li>
          <li>Trinidad and Tobago</li>
          <li>Tristan Da Cunha</li>
          <li>Tunisia</li>
          <li>Turkey</li>
          <li>Turkmenistan</li>
          <li>Turks and Caicos Islands</li>
          <li>Tuvalu</li>
          <li>Uganda</li>
          <li>Ukraine</li>
          <li>Umm Al Quwain, United Arab Emirates</li>
          <li>United Arab Emirates</li>
          <li>United Kingdom</li>
          <li>United Republic of Tanzania</li>
          <li>United States Minor Outlying Islands</li>
          <li>United States of America</li>
          <li>Uruguay</li>
          <li>Us Minor Outlying Islands</li>
          <li>Us Virgin Islands</li>
          <li>Utah, United States of America</li>
          <li>Uzbekistan</li>
          <li>Vanuatu</li>
          <li>Vatican</li>
          <li>Venezuela</li>
          <li>Vermont, United States of America</li>
          <li>Vietnam</li>
          <li>Virginia, United States of America</li>
          <li>Wallis and Futuna</li>
          <li>Washington, United States of America</li>
          <li>West Virginia, United States of America</li>
          <li>Western Sahara</li>
          <li>Wisconsin, United States of America</li>
          <li>Wyoming, United States of America</li>
          <li>Yemen</li>
          <li>Yukon, Canada</li>
          <li>Zambia</li>
          <li>Zimbabwe</li>
        </ul>
      </div>
    </details>
    <h3 class="govuk-heading-s">Transaction and document types</h3>
    <p class="govuk-body">The application submission API accepts several transaction and document types that
      describe the desired outcome of the application. These types are defined in the schema in their shortened
      form, but full definitions of each type can be viewed below:</p>
    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          Transaction types
        </span>
      </summary>
      <div class="govuk-details__text">
        <table class="govuk-table">
          <caption class="govuk-table__caption govuk-table__caption--m">Transaction types</caption>
          <thead class="govuk-table__head">
            <tr class="govuk-table__row">
              <th scope="col" class="govuk-table__header">Code</th>
              <th scope="col" class="govuk-table__header">Description</th>
            </tr>
          </thead>
          <tbody class="govuk-table__body">
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ADV1</td>
              <td class="govuk-table__cell govuk-table__cell">First notice of adverse possession</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ADV2</td>
              <td class="govuk-table__cell govuk-table__cell">Adverse possession: notification</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">AGN</td>
              <td class="govuk-table__cell govuk-table__cell">Agreed notice (AN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">APLC</td>
              <td class="govuk-table__cell govuk-table__cell">Appointment of liquidator (creditor’s voluntary
                winding up)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">APLCO</td>
              <td class="govuk-table__cell govuk-table__cell">Appointment of liquidator (compulsory winding up)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">APLM</td>
              <td class="govuk-table__cell govuk-table__cell">Appointment of liquidator (members’ voluntary winding
                up)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">APR</td>
              <td class="govuk-table__cell govuk-table__cell">Apportionment of rent</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">APT</td>
              <td class="govuk-table__cell govuk-table__cell">Appointment of new trustee</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ASSTTP</td>
              <td class="govuk-table__cell govuk-table__cell">Assent (Transfer of Part)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ASTC</td>
              <td class="govuk-table__cell govuk-table__cell">Assent of charge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ASTT</td>
              <td class="govuk-table__cell govuk-table__cell">Assent</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ATP</td>
              <td class="govuk-table__cell govuk-table__cell">Amendment to title plan</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">AUN</td>
              <td class="govuk-table__cell govuk-table__cell">Amendment of unilateral notice (UN3)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">BKN</td>
              <td class="govuk-table__cell govuk-table__cell">Bankruptcy notice/Creditors’ notice</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">BKR</td>
              <td class="govuk-table__cell govuk-table__cell">Bankruptcy restriction/Bankruptcy inhibition</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">C</td>
              <td class="govuk-table__cell govuk-table__cell">Charge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CAG</td>
              <td class="govuk-table__cell govuk-table__cell">Cancellation of notice (not unilateral) (CN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CANI</td>
              <td class="govuk-table__cell govuk-table__cell">Cancellation of inhibition (RX3)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CANR</td>
              <td class="govuk-table__cell govuk-table__cell">Cancellation of restriction (RX3)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CANU</td>
              <td class="govuk-table__cell govuk-table__cell">Cancellation of unilateral notice (UN4)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CBKN</td>
              <td class="govuk-table__cell govuk-table__cell">Cancellation of bankruptcy notice</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CBKR</td>
              <td class="govuk-table__cell govuk-table__cell">Cancellation of bankruptcy restriction</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CCT</td>
              <td class="govuk-table__cell govuk-table__cell">Cancellation of a caution (CCD)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CH2</td>
              <td class="govuk-table__cell govuk-table__cell">Obligation to make further advances (CH2)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CH3</td>
              <td class="govuk-table__cell govuk-table__cell">Agreed maximum amount of security (CH3)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CHOA</td>
              <td class="govuk-table__cell govuk-table__cell">Charging order - Agreed notice (AN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CHOU</td>
              <td class="govuk-table__cell govuk-table__cell">Charging order - Unilateral notice (UN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CHR</td>
              <td class="govuk-table__cell govuk-table__cell">Cancellation of home rights (HR4)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CN</td>
              <td class="govuk-table__cell govuk-table__cell">Change of name</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CNC</td>
              <td class="govuk-table__cell govuk-table__cell">Change of name - chargee</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CNL</td>
              <td class="govuk-table__cell govuk-table__cell">Cancellation of an unregistered noted lease (CN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">COA</td>
              <td class="govuk-table__cell govuk-table__cell">Change of address for service</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">COAC</td>
              <td class="govuk-table__cell govuk-table__cell">Change of address for service - chargee</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CON</td>
              <td class="govuk-table__cell govuk-table__cell">Consolidation of charge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">COP</td>
              <td class="govuk-table__cell govuk-table__cell">Charge of part</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CPD</td>
              <td class="govuk-table__cell govuk-table__cell">Change of property description</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CPVK</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory purchase (property value known)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CPVU</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory purchase (property value unknown)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CTD</td>
              <td class="govuk-table__cell govuk-table__cell">Commonhold transitional dealing</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">CUR</td>
              <td class="govuk-table__cell govuk-table__cell">Cancellation of notice of unregistered Rentcharge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DB</td>
              <td class="govuk-table__cell govuk-table__cell">Determined boundary (DB)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DCLN</td>
              <td class="govuk-table__cell govuk-table__cell">Disclaimer - notification</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DCLV</td>
              <td class="govuk-table__cell govuk-table__cell">Disclaimer - notice</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DFL1</td>
              <td class="govuk-table__cell govuk-table__cell">New lease - other</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DFL3</td>
              <td class="govuk-table__cell govuk-table__cell">New lease - shared ownership</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DFL4</td>
              <td class="govuk-table__cell govuk-table__cell">New lease - right to buy or right to acquire</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DFL5</td>
              <td class="govuk-table__cell govuk-table__cell">Dispositionary first lease extension of a term</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DFT</td>
              <td class="govuk-table__cell govuk-table__cell">Defect in title s64(1) LRA 2002</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DIS</td>
              <td class="govuk-table__cell govuk-table__cell">Discharge of charge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DJP</td>
              <td class="govuk-table__cell govuk-table__cell">Death of a joint proprietor</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DL</td>
              <td class="govuk-table__cell govuk-table__cell">Discontinuous lease - non-timeshare</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DMR</td>
              <td class="govuk-table__cell govuk-table__cell">Disapplication of restriction (RX2)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DOG</td>
              <td class="govuk-table__cell govuk-table__cell">Deed of grant of easement</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DP</td>
              <td class="govuk-table__cell govuk-table__cell">Discharge of part</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DSP</td>
              <td class="govuk-table__cell govuk-table__cell">Death of a sole proprietor</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">DTL</td>
              <td class="govuk-table__cell govuk-table__cell">Discontinuous lease - timeshare</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">EXR</td>
              <td class="govuk-table__cell govuk-table__cell">Extinguishment of rentcharge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">HR</td>
              <td class="govuk-table__cell govuk-table__cell">Notice of home rights (HR1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">JP1</td>
              <td class="govuk-table__cell govuk-table__cell">Removal of default Form A restriction</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCATCO</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - of assured tenancies following court
                order</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCBD</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - by disclaimer</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCBET</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - by effluxion of time</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCBN</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - by notice</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCF</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - forfeiture</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCMRE</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - merger with reversionary estate</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCOE</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - on enlargement</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCOF</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - on frustration</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCSD</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - surrender by deed (not for value or
                reverse premium)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCSDM</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - surrender by deed</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCSDWT</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - surrender by deed with a transfer (not
                for value or reverse premium)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCSDMWT</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - surrender by deed (together with
                transfer)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCSOL</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - surrender by operation of law (not for
                value or reverse premium)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">LCSOLM</td>
              <td class="govuk-table__cell govuk-table__cell">Lease closure - surrender by operation of law</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">MDR</td>
              <td class="govuk-table__cell govuk-table__cell">Modification of Restriction</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NCT</td>
              <td class="govuk-table__cell govuk-table__cell">Caution amendment, new cautioner</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NDC</td>
              <td class="govuk-table__cell govuk-table__cell">Notification of dissolution of company</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NFR</td>
              <td class="govuk-table__cell govuk-table__cell">Noting of an affecting franchise</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NOE</td>
              <td class="govuk-table__cell govuk-table__cell">Noting an easement</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NOL</td>
              <td class="govuk-table__cell govuk-table__cell">Noting a lease</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NPR</td>
              <td class="govuk-table__cell govuk-table__cell">Noting of a profit</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NRT</td>
              <td class="govuk-table__cell govuk-table__cell">Notice of rentcharge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">PC</td>
              <td class="govuk-table__cell govuk-table__cell">Postponement of charge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">PER</td>
              <td class="govuk-table__cell govuk-table__cell">Personal covenants</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">PRO</td>
              <td class="govuk-table__cell govuk-table__cell">Provisions</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RC</td>
              <td class="govuk-table__cell govuk-table__cell">Restrictive covenants - entry of</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RFN</td>
              <td class="govuk-table__cell govuk-table__cell">Deed of rectification</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RHR</td>
              <td class="govuk-table__cell govuk-table__cell">Renewal of home rights (HR2)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ROCA</td>
              <td class="govuk-table__cell govuk-table__cell">Release of covenants - agreed notice (AN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ROCC</td>
              <td class="govuk-table__cell govuk-table__cell">Release of covenants - cancellation (CN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ROCU</td>
              <td class="govuk-table__cell govuk-table__cell">Release of covenants - unilateral notice (UN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RNT</td>
              <td class="govuk-table__cell govuk-table__cell">Overriding lease granted under s.19, Landlord &amp;
                Tenant (Covenants) Act 1995</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ROE</td>
              <td class="govuk-table__cell govuk-table__cell">Release of easements</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RRD</td>
              <td class="govuk-table__cell govuk-table__cell">Removal of a right to determine</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RTM</td>
              <td class="govuk-table__cell govuk-table__cell">Acquisition of right to manage</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RUN</td>
              <td class="govuk-table__cell govuk-table__cell">Removal of unilateral notice (UN2)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RXL</td>
              <td class="govuk-table__cell govuk-table__cell">Form ll restriction entered - simple request</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RXN</td>
              <td class="govuk-table__cell govuk-table__cell">Restriction (non-standard wording) (RX1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RXS</td>
              <td class="govuk-table__cell govuk-table__cell">Restriction (standard wording) (RX1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">SBC</td>
              <td class="govuk-table__cell govuk-table__cell">Sub charge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">SHO</td>
              <td class="govuk-table__cell govuk-table__cell">Shared ownership - additional share</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">SJT</td>
              <td class="govuk-table__cell govuk-table__cell">Severance of joint tenancy (SEV, RX1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">STVC</td>
              <td class="govuk-table__cell govuk-table__cell">Statutory vestings charge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">STVL</td>
              <td class="govuk-table__cell govuk-table__cell">Statutory vestings land</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">T</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer for value</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TNV</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer (not for value or reverse premium)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TNVTP</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer (not for value or reverse premium) (Transfer
                of part)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TOC</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer of charge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TOSNV</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer of share (not for value or reverse premium)
              </td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TOSNVTP</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer of share (not for value or reverse premium)
                (Transfer of part)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TOSTP</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer of share for value (Transfer of part)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TOSV</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer of share for value</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TPS</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer under power of sale</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TPSTP</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer under power of sale (Transfer of part)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TRC</td>
              <td class="govuk-table__cell govuk-table__cell">Termination of commonhold</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TRM</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer by operation of law on death</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TSCNV</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer subject to a charge (not for value or reverse
                premium)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TSCNVTP</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer subject to a charge (not for value or reverse
                premium) (Transfer of part)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TSCTP</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer subject to a charge for value (Transfer of
                part)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TSCV</td>
              <td class="govuk-table__cell govuk-table__cell"> Transfer subject to a charge for value (Transfer of
                part)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TTP</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer for value (Transfer of part)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TVR</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer for value RTB/RTA</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TVRTP</td>
              <td class="govuk-table__cell govuk-table__cell">Transfer for value RTB/RTA (Transfer of part)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">UNN</td>
              <td class="govuk-table__cell govuk-table__cell">Unilateral notice (UN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">UPT</td>
              <td class="govuk-table__cell govuk-table__cell">Upgrade class of title (UT1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VC</td>
              <td class="govuk-table__cell govuk-table__cell">Variation of charge</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VLAN</td>
              <td class="govuk-table__cell govuk-table__cell">Variation of lease - agreed notice (AN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VLAP</td>
              <td class="govuk-table__cell govuk-table__cell">Deed of variation of a lease - not increasing the term
                of or adding new land to the extent demised</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VLUN</td>
              <td class="govuk-table__cell govuk-table__cell">Variation of lease - unilateral notice (UN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VO</td>
              <td class="govuk-table__cell govuk-table__cell">Vesting order</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOC</td>
              <td class="govuk-table__cell govuk-table__cell">Variation of covenants</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOCA</td>
              <td class="govuk-table__cell govuk-table__cell">Variation of covenants - agreed notice (AN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOCU</td>
              <td class="govuk-table__cell govuk-table__cell">Variation of covenants - unilateral notice (UN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOE</td>
              <td class="govuk-table__cell govuk-table__cell">Variation of easements</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOEA</td>
              <td class="govuk-table__cell govuk-table__cell">Variation of easements - agreed notice (AN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOEU</td>
              <td class="govuk-table__cell govuk-table__cell">Variation of easements - unilateral notice (UN1)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">WCT</td>
              <td class="govuk-table__cell govuk-table__cell">Withdrawal of caution</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">WDR</td>
              <td class="govuk-table__cell govuk-table__cell">Withdraw a restriction (RX4)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          Document types
        </span>
      </summary>
      <div class="govuk-details__text">
        <table class="govuk-table">
          <caption class="govuk-table__caption govuk-table__caption--m">Document types</caption>
          <thead class="govuk-table__head">
            <tr class="govuk-table__row">
              <th scope="col" class="govuk-table__header">Type</th>
              <th scope="col" class="govuk-table__header">Details</th>
            </tr>
          </thead>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ABSTRACT</td>
            <td class="govuk-table__cell govuk-table__cell">Abstract</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ACKAPU</td>
            <td class="govuk-table__cell govuk-table__cell">Adjudicator’s Letter Confirming a Court’s Decision
              (ACKAPU)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ADJAR</td>
            <td class="govuk-table__cell govuk-table__cell">Adjudicator’s Letter of Refusal (ADJAR)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ADJREVU</td>
            <td class="govuk-table__cell govuk-table__cell">Adjudicator’s Letter of Confirmation (ADJREVU)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ADMIN_LTRS</td>
            <td class="govuk-table__cell govuk-table__cell">Letters of Administration</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ADV1</td>
            <td class="govuk-table__cell govuk-table__cell">Adverse possession: registration (ADV1)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ADV2</td>
            <td class="govuk-table__cell govuk-table__cell">Adverse possession: notification (ADV2)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">AGREEMENT</td>
            <td class="govuk-table__cell govuk-table__cell">Agreement</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">AMS1</td>
            <td class="govuk-table__cell govuk-table__cell">Application to use Application Management Service (AMS1)
            </td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">AN1</td>
            <td class="govuk-table__cell govuk-table__cell">AN1 Agreed notice</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">AP1</td>
            <td class="govuk-table__cell govuk-table__cell">AP1 Application to change the register</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">APPL_FRM</td>
            <td class="govuk-table__cell govuk-table__cell">Application Form</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">APPOINTMENT_OF_TRUSTEE</td>
            <td class="govuk-table__cell govuk-table__cell">Deed of Appointment of New Trustee</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">AS1</td>
            <td class="govuk-table__cell govuk-table__cell">AS1 registered title(s): assent of whole</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">AS2</td>
            <td class="govuk-table__cell govuk-table__cell">AS2: Assent of Charge</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">AS3</td>
            <td class="govuk-table__cell govuk-table__cell">AS3 Assent of Part</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ASSENT</td>
            <td class="govuk-table__cell govuk-table__cell">Assent</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ASSIGNMENT</td>
            <td class="govuk-table__cell govuk-table__cell">Assignment</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">BIRTH_CERT</td>
            <td class="govuk-table__cell govuk-table__cell">Birth Certificate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">BOUND_PLAN</td>
            <td class="govuk-table__cell govuk-table__cell">Determined Boundary Plan</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CC</td>
            <td class="govuk-table__cell govuk-table__cell">CC</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CCD</td>
            <td class="govuk-table__cell govuk-table__cell">CCD Cancel caution against dealings</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CERT_CON_CH</td>
            <td class="govuk-table__cell govuk-table__cell">Original or certified copy of the certificate of
              incorporation of change of name issued by Companies House</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CERT_DEATH</td>
            <td class="govuk-table__cell govuk-table__cell">Certificate of Presumed Death</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CERT_REG_CH</td>
            <td class="govuk-table__cell govuk-table__cell">Certificate of registration issued by Companies House
            </td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CERT_S89</td>
            <td class="govuk-table__cell govuk-table__cell">Certificate of Filing to Comply with s. 89 of the
              Insolvency Act 1987</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CH1</td>
            <td class="govuk-table__cell govuk-table__cell">CH1 Legal charge (mortgage) of a registered estate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CH2</td>
            <td class="govuk-table__cell govuk-table__cell">CH2 Obligation to make further advances</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CH3</td>
            <td class="govuk-table__cell govuk-table__cell">CH3 Note agreed maximum amount of security</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CHARGE</td>
            <td class="govuk-table__cell govuk-table__cell">Charge</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CHARG_ORD</td>
            <td class="govuk-table__cell govuk-table__cell">Charging Order</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CIVIL_CERT</td>
            <td class="govuk-table__cell govuk-table__cell">Marriage/civil partnership certificate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CM2</td>
            <td class="govuk-table__cell govuk-table__cell">Commonhold land: registered freehold termination (CM2)
            </td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CM5</td>
            <td class="govuk-table__cell govuk-table__cell">Commonhold land: termination (CM5)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CM6</td>
            <td class="govuk-table__cell govuk-table__cell">Commonhold successor: registration (CM6)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CN1</td>
            <td class="govuk-table__cell govuk-table__cell">CN1 Cancel notice</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CNFRM_DTMN_LTA_LGHA</td>
            <td class="govuk-table__cell govuk-table__cell">Confirmation of determination of lease in accordance
              with the LTA 1954 or the LGHA 1989</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CNFRM_NO_DEED_SUR</td>
            <td class="govuk-table__cell govuk-table__cell">Confirmation that no deed of surrender has been entered
              into</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CNFRM_NO_LTA_LGHA</td>
            <td class="govuk-table__cell govuk-table__cell">Confirmation that neither the LTA 1954 nor the LGHA 1989
              affect the lease</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CNSNT_ADMIN_COURT</td>
            <td class="govuk-table__cell govuk-table__cell">Consent of the administrator or the court (if lessee is
              in administration)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
            <td class="govuk-table__cell govuk-table__cell">Company Documentation</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
            <td class="govuk-table__cell govuk-table__cell">Consent</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CONST_COMP</td>
            <td class="govuk-table__cell govuk-table__cell">Document(s) constituting the company</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CONTR_RES</td>
            <td class="govuk-table__cell govuk-table__cell">Contributory’s resolution appointing the liquidator</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
            <td class="govuk-table__cell govuk-table__cell">Conveyancer’s Certificate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CONV_CERT_DEATH</td>
            <td class="govuk-table__cell govuk-table__cell">Conveyancer’s Certificate of the fact of death</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CONVEYANCE</td>
            <td class="govuk-table__cell govuk-table__cell">Conveyance</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">COR_CERT</td>
            <td class="govuk-table__cell govuk-table__cell">Coroner’s Certificate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CORRES</td>
            <td class="govuk-table__cell govuk-table__cell">Correspondence</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">COSR</td>
            <td class="govuk-table__cell govuk-table__cell">Company search result</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
            <td class="govuk-table__cell govuk-table__cell">Court Order</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CRALIQ</td>
            <td class="govuk-table__cell govuk-table__cell">Company resolution appointing the liquidator</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CRED_DEC</td>
            <td class="govuk-table__cell govuk-table__cell">Creditor’s decision notice</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CRED_RES</td>
            <td class="govuk-table__cell govuk-table__cell">Creditor’s resolution appointing the liquidator</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CRT_FORM_7</td>
            <td class="govuk-table__cell govuk-table__cell">Certificate in Form 7</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">CRWALIQ</td>
            <td class="govuk-table__cell govuk-table__cell">Company resolution that it be wound up and appointing
              the liquidator</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DB</td>
            <td class="govuk-table__cell govuk-table__cell">DB Determine the exact line of a boundary</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DEATH_CERT</td>
            <td class="govuk-table__cell govuk-table__cell">Death Certificate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DEC_AB_NULL_MARR</td>
            <td class="govuk-table__cell govuk-table__cell">Decree absolute or nullity of marriage</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DEED</td>
            <td class="govuk-table__cell govuk-table__cell">Deed</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DEED_POLL</td>
            <td class="govuk-table__cell govuk-table__cell">Deed poll</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DEED_REG_DIS</td>
            <td class="govuk-table__cell govuk-table__cell">Deed which is a registrable disposition</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DEED_SUR</td>
            <td class="govuk-table__cell govuk-table__cell">Deed of Surrender</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DISCHARGE</td>
            <td class="govuk-table__cell govuk-table__cell">Discharge</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DJP</td>
            <td class="govuk-table__cell govuk-table__cell">DJP Death of joint proprietor</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DL</td>
            <td class="govuk-table__cell govuk-table__cell">Document List</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DOP</td>
            <td class="govuk-table__cell govuk-table__cell">Deed of postponement</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DRIVING_LICENCE</td>
            <td class="govuk-table__cell govuk-table__cell">Driving licence</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DS1</td>
            <td class="govuk-table__cell govuk-table__cell">DS1</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DS2</td>
            <td class="govuk-table__cell govuk-table__cell">DS2 Cancel entries relating to registered charge</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DS3</td>
            <td class="govuk-table__cell govuk-table__cell">DS3 Release of Part of the Land from a registered charge
            </td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">DS3_SHORT</td>
            <td class="govuk-table__cell govuk-table__cell">DS3</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">EOB</td>
            <td class="govuk-table__cell govuk-table__cell">Evidence of bankruptcy</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">EOL</td>
            <td class="govuk-table__cell govuk-table__cell">Evidence of liquidation</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">EVD_NO_RENEW</td>
            <td class="govuk-table__cell govuk-table__cell">Evidence that any option to renew has not been, and
              cannot be, exercised</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
            <td class="govuk-table__cell govuk-table__cell">Evidence</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">EV_OV_NAME_CHANGE</td>
            <td class="govuk-table__cell govuk-table__cell">Evidence of an overseas company name change</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">EX1</td>
            <td class="govuk-table__cell govuk-table__cell">EX1 Exempt information document</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">EX1A</td>
            <td class="govuk-table__cell govuk-table__cell">EX1A</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">FORM_600</td>
            <td class="govuk-table__cell govuk-table__cell">Companies House Form 600</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">FORM_600CH</td>
            <td class="govuk-table__cell govuk-table__cell">Companies House Form 600CH</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">FORM_DI</td>
            <td class="govuk-table__cell govuk-table__cell">Form DI</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">FORM_JO</td>
            <td class="govuk-table__cell govuk-table__cell">Form JO (Trust Information)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">FR1</td>
            <td class="govuk-table__cell govuk-table__cell">FR1 Application for First Registration</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">GENDER_CERT</td>
            <td class="govuk-table__cell govuk-table__cell">Gender recognition certificate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">GVD</td>
            <td class="govuk-table__cell govuk-table__cell">General vesting declaration</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">HR1</td>
            <td class="govuk-table__cell govuk-table__cell">HR1 Notice of home rights</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">HR2</td>
            <td class="govuk-table__cell govuk-table__cell">HR2 Renew notice of home rights</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">HR4</td>
            <td class="govuk-table__cell govuk-table__cell">HR4 Cancel notice of home rights</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ID1</td>
            <td class="govuk-table__cell govuk-table__cell">ID1 - Verify identity: citizen</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ID2</td>
            <td class="govuk-table__cell govuk-table__cell">ID2 - Verify identity: body corporate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ID3</td>
            <td class="govuk-table__cell govuk-table__cell">ID3 - Certificate of identity for a private individual
            </td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ID4</td>
            <td class="govuk-table__cell govuk-table__cell">ID4 - Certificate of identity for a body corporate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ID5</td>
            <td class="govuk-table__cell govuk-table__cell">ID5 - Certificate to be given by a conveyancer where a
              person’s identity has been verified by way of an online video call</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ID_EV</td>
            <td class="govuk-table__cell govuk-table__cell">Identity Evidence</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ID_FRM</td>
            <td class="govuk-table__cell govuk-table__cell">Identity Form</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">INDENTURE</td>
            <td class="govuk-table__cell govuk-table__cell">Indenture</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">JP1</td>
            <td class="govuk-table__cell govuk-table__cell">JP1 Letter</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">K17_OR_K18</td>
            <td class="govuk-table__cell govuk-table__cell">Land Charge Search in Form K17 or K18</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">K20</td>
            <td class="govuk-table__cell govuk-table__cell">Certificate of Cancellation of Bankruptcy Notice in Form
              K20</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">K22</td>
            <td class="govuk-table__cell govuk-table__cell">Acknowledgement of Application for Cancellation of
              Bankruptcy Notice in Form K22</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">K3</td>
            <td class="govuk-table__cell govuk-table__cell">HMLR Form K3</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">K4</td>
            <td class="govuk-table__cell govuk-table__cell">HMLR Form K4</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">LEASE</td>
            <td class="govuk-table__cell govuk-table__cell">Lease</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">LICENCE</td>
            <td class="govuk-table__cell govuk-table__cell">Licence</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">LIQ01</td>
            <td class="govuk-table__cell govuk-table__cell">Companies House Form LIQ01</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">LIQ_CERT_1</td>
            <td class="govuk-table__cell govuk-table__cell">Liquidator’s certificate confirming liquidator’s
              appointment or that no resolution was passed nominating one</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">LIQ_CERT_2</td>
            <td class="govuk-table__cell govuk-table__cell">Liquidator’s certificate that a meeting was held in
              accordance with s. 98(1) of the Insolvency Act 1986</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">LIQ_CERT_3</td>
            <td class="govuk-table__cell govuk-table__cell">Liquidator’s certificate that appointment confirmed by a
              creditor’s qualifying decision procedure</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">LNDLD_CNSNT</td>
            <td class="govuk-table__cell govuk-table__cell">Landlord’s consent</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">LONP</td>
            <td class="govuk-table__cell govuk-table__cell">Letter or notice of postponement</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">LR_CORRES</td>
            <td class="govuk-table__cell govuk-table__cell">LR Correspondence</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">LTT</td>
            <td class="govuk-table__cell govuk-table__cell">Land Transaction Tax</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">MARR_CERT</td>
            <td class="govuk-table__cell govuk-table__cell">Marriage Certificate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">MEMO</td>
            <td class="govuk-table__cell govuk-table__cell">Memorandum</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">MORD</td>
            <td class="govuk-table__cell govuk-table__cell">Ministerial order</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">MRTG_DEED</td>
            <td class="govuk-table__cell govuk-table__cell">Mortgage Deed</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">NOD</td>
            <td class="govuk-table__cell govuk-table__cell">Notice of disclaimer</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">ORD_DISS_NULL_CP</td>
            <td class="govuk-table__cell govuk-table__cell">Order of dissolution or nullity of civil partnership
            </td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">PASSPORT</td>
            <td class="govuk-table__cell govuk-table__cell">Passport</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">PLAN</td>
            <td class="govuk-table__cell govuk-table__cell">Plan</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">POA</td>
            <td class="govuk-table__cell govuk-table__cell">Power of Attorney</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">PROBATE</td>
            <td class="govuk-table__cell govuk-table__cell">Probate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">PSS1</td>
            <td class="govuk-table__cell govuk-table__cell">Application to use Pre-submission Enquiry Service (PSS1)
            </td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">REVERS_INT</td>
            <td class="govuk-table__cell govuk-table__cell">Examined Abstract of Reversionary Interest(s)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">RN</td>
            <td class="govuk-table__cell govuk-table__cell">Receipted Notice</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">RX1</td>
            <td class="govuk-table__cell govuk-table__cell">RX1 Restriction</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">RX2</td>
            <td class="govuk-table__cell govuk-table__cell">RX2 Disapply or modify restriction</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">RX3</td>
            <td class="govuk-table__cell govuk-table__cell">RX3 Cancel restriction</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">RX4</td>
            <td class="govuk-table__cell govuk-table__cell">RX4 Withdraw restriction</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">RXC</td>
            <td class="govuk-table__cell govuk-table__cell">RXC Restriction: consent or certificate</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">SC</td>
            <td class="govuk-table__cell govuk-table__cell">SC Note overriding priority of statutory charge</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">SDLT</td>
            <td class="govuk-table__cell govuk-table__cell">Stamp Duty Land Tax</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">SEV</td>
            <td class="govuk-table__cell govuk-table__cell">SEV Severance of Joint Tenancy</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">SHRF_RTN</td>
            <td class="govuk-table__cell govuk-table__cell">Sheriff’s Return</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">SIDE_LTR</td>
            <td class="govuk-table__cell govuk-table__cell">Side Letter</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">SOT</td>
            <td class="govuk-table__cell govuk-table__cell">Statement Of Truth</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">SSALIQ</td>
            <td class="govuk-table__cell govuk-table__cell">Appointment of Liquidator by The Secretary of State</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">STAT_DEC</td>
            <td class="govuk-table__cell govuk-table__cell">Statutory Declaration</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">SUB_CHARGE</td>
            <td class="govuk-table__cell govuk-table__cell">Sub Charge</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">TP1</td>
            <td class="govuk-table__cell govuk-table__cell">TP1 Transfer of part of registered title(s)</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">TP2</td>
            <td class="govuk-table__cell govuk-table__cell">TP2 Transfer of part under power of sale</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">TR1</td>
            <td class="govuk-table__cell govuk-table__cell">TR1 Registered title(s): whole transfer</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">TR2</td>
            <td class="govuk-table__cell govuk-table__cell">TR2 Registered title(s) under power of sale: whole
              transfer</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">TR4</td>
            <td class="govuk-table__cell govuk-table__cell">TR4</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">TRANSFER</td>
            <td class="govuk-table__cell govuk-table__cell">Transfer</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">TRUSTEE_RESOLUTION</td>
            <td class="govuk-table__cell govuk-table__cell">Trustee resolution</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">UN1</td>
            <td class="govuk-table__cell govuk-table__cell">UN1 Unilateral notice</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">UN2</td>
            <td class="govuk-table__cell govuk-table__cell">UN2 Remove unilateral notice</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">UN3</td>
            <td class="govuk-table__cell govuk-table__cell">UN3 Beneficiary of an existing unilateral notice</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">UN4</td>
            <td class="govuk-table__cell govuk-table__cell">UN4 Cancel unilateral notice</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">UT1</td>
            <td class="govuk-table__cell govuk-table__cell">UT1 Upgrade of title</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">VAR_CHARGE</td>
            <td class="govuk-table__cell govuk-table__cell">Deed of Variation of Charge</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">VAR_COV</td>
            <td class="govuk-table__cell govuk-table__cell">Deed of Variation of Covenants</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">VAR_EAS</td>
            <td class="govuk-table__cell govuk-table__cell">Deed of Variation of Easements</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">VAR_LEASE</td>
            <td class="govuk-table__cell govuk-table__cell">Deed of Variation of Lease</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">VESTING_ORDER</td>
            <td class="govuk-table__cell govuk-table__cell">Vesting order</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">WCT</td>
            <td class="govuk-table__cell govuk-table__cell">WCT Withdraw caution</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">WINDING_UP</td>
            <td class="govuk-table__cell govuk-table__cell">Winding up order</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell govuk-table__cell">WIT_STATE</td>
            <td class="govuk-table__cell govuk-table__cell">Witness Statement</td>
          </tr>
          </tbody>
        </table>
      </div>
    </details>
    <p class="govuk-body">As well as the definition of each transaction/document, we have also provided a mapping,
      showing the required documents for each transaction type. There are three categories of documents that can be
      uploaded for a transaction:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li><b>Compulsory</b> - this document is required for the transaction type</li>
      <li><b>Either</b> - at least one of the documents marked as Either must be submitted with the transaction</li>
      <li><b>Suggested</b> - these documents are not required, but are commonly attached alongside the transaction
      </li>
    </ul>
    <p class="govuk-body">For example, for an <code class="x-govuk-code x-govuk-code--inline">ADV1</code>
      transaction type, the following documents need to be uploaded:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>An <code class="x-govuk-code x-govuk-code--inline">ADV1</code> document must be uploaded </li>
      <li>At least one of an <code class="x-govuk-code x-govuk-code--inline">SOT</code> or <code
          class="x-govuk-code x-govuk-code--inline">STAT_DEC</code> document must be uploaded</li>
      <li><code class="x-govuk-code x-govuk-code--inline">COSR</code>, <code
          class="x-govuk-code x-govuk-code--inline">EVIDENCE</code>, <code
          class="x-govuk-code x-govuk-code--inline">PLAN</code> and <code
          class="x-govuk-code x-govuk-code--inline">POA</code> documents are not required, but may help when
        processing your application</p>
    </ul>
    <p class="govuk-body">During application submission, validation will be applied for each transaction to ensure
      the rules regarding the Compulsory and Either document types have been satisfied correctly:</p>
    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          Transaction/document mapping
        </span>
      </summary>
      <div class="govuk-details__text">
        <table class="govuk-table">
          <caption class="govuk-table__caption govuk-table__caption--m">Transaction/document mapping</caption>
          <thead class="govuk-table__head">
            <tr class="govuk-table__row">
              <th scope="col" class="govuk-table__header">Transaction type code</th>
              <th scope="col" class="govuk-table__header">Document type code</th>
              <th scope="col" class="govuk-table__header">Document class code</th>
            </tr>
          </thead>
          <tbody class="govuk-table__body">
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">ADV1</td>
              <td class="govuk-table__cell">ADV1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SOT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COSR</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">ADV2</td>
              <td class="govuk-table__cell">ADV2</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">AGN</td>
              <td class="govuk-table__cell">AN1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CHARGE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CHARG_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SOT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">TRANSFER</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DEED</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">APLC</td>
              <td class="govuk-table__cell">CRWALIQ</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">FORM_600</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">FORM_600CH</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CRED_DEC</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CRED_RES</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LIQ_CERT_2</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LIQ_CERT_3</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">APLCO</td>
              <td class="govuk-table__cell">WINDING_UP</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">FORM_600</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">FORM_600CH</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CRED_RES</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONTR_RES</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LIQ_CERT_1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SSALIQ</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">APLM</td>
              <td class="govuk-table__cell">CERT_S89</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LIQ01</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">FORM_600</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">FORM_600CH</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CRALIQ</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">APR</td>
              <td class="govuk-table__cell">DEED</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">TRANSFER</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">MORD</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">APT</td>
              <td class="govuk-table__cell">TRANSFER</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">TRUSTEE_RESOLUTION</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">VESTING_ORDER</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">APPOINTMENT_OF_TRUSTEE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">ASSTTP</td>
              <td class="govuk-table__cell">AS3</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">ADMIN_LTRS</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">ASTC</td>
              <td class="govuk-table__cell">AS2</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">ADMIN_LTRS</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">ASTT</td>
              <td class="govuk-table__cell">AS1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">ADMIN_LTRS</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">ATP</td>
              <td class="govuk-table__cell">CORRES</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">AUN</td>
              <td class="govuk-table__cell">UN3</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">BKN</td>
              <td class="govuk-table__cell">K3</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">K4</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">BKR</td>
              <td class="govuk-table__cell">RX1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">Compulsory</td>
              <td class="govuk-table__cell">CH1</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">MRTG_DEED</td>
              <td class="govuk-table__cell">Either (Compulsory if mdref is provided)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CH2</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr <tr class="govuk-table__row">
              <td class="govuk-table__cell">CAG</td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SOT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CANI</td>
              <td class="govuk-table__cell">RX3</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CANR</td>
              <td class="govuk-table__cell">RX3</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SOT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CANU</td>
              <td class="govuk-table__cell">UN4</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SOT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CBKN</td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">K22</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">ADJAR</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">ACKAPU</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">ADJREVU</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">K20</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CBKR</td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CCT</td>
              <td class="govuk-table__cell">CCD</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CH2</td>
              <td class="govuk-table__cell">CH2</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CH3</td>
              <td class="govuk-table__cell">CH3</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CHOA</td>
              <td class="govuk-table__cell">AN1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CHOU</td>
              <td class="govuk-table__cell">UN1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CHR</td>
              <td class="govuk-table__cell">HR4</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CN</td>
              <td class="govuk-table__cell">CORRES</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">BIRTH_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DEED_POLL</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DRIVING_LICENCE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">GENDER_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CIVIL_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PASSPORT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SOT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CNC</td>
              <td class="govuk-table__cell">CORRES</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">BIRTH_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DEED_POLL</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DRIVING_LICENCE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">GENDER_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CIVIL_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PASSPORT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SOT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CNL</td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">COA</td>
              <td class="govuk-table__cell">CORRES</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">COAC</td>
              <td class="govuk-table__cell">CORRES</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CON</td>
              <td class="govuk-table__cell">CC</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">COP</td>
              <td class="govuk-table__cell">CH1</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">MRTG_DEED</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CH2</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CPD</td>
              <td class="govuk-table__cell">CORRES</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CPVK</td>
              <td class="govuk-table__cell">DEED_POLL</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">GVD</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CPVU</td>
              <td class="govuk-table__cell">DEED_POLL</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">GVD</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CTD</td>
              <td class="govuk-table__cell">CM2</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">CUR</td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DB</td>
              <td class="govuk-table__cell">BOUND_PLAN</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DB</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DCLN</td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DCLV</td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DFL1</td>
              <td class="govuk-table__cell">LEASE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SDLT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LTT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DFL3</td>
              <td class="govuk-table__cell">LEASE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SDLT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LTT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DFL4</td>
              <td class="govuk-table__cell">LEASE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SDLT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LTT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DFL5</td>
              <td class="govuk-table__cell">LEASE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">VAR_LEASE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">FORM_JO</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SDLT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LTT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DFT</td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DIS</td>
              <td class="govuk-table__cell">DS1</td>
              <td class="govuk-table__cell">Compulsory (When <code>discharge_submission_type</code> is
                <code>ATTACHED</code>)</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DJP</td>
              <td class="govuk-table__cell">DJP</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CERT_DEATH</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COR_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">ADMIN_LTRS</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DL</td>
              <td class="govuk-table__cell">LEASE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SDLT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LTT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DMR</td>
              <td class="govuk-table__cell">RX2</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DOG</td>
              <td class="govuk-table__cell">DEED</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DP</td>
              <td class="govuk-table__cell">DS1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DSP</td>
              <td class="govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CERT_DEATH</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COR_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">ADMIN_LTRS</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">DTL</td>
              <td class="govuk-table__cell">LEASE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SDLT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LTT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">EXR</td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">HR</td>
              <td class="govuk-table__cell">HR1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">JP1</td>
              <td class="govuk-table__cell">JP1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCATCO</td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SHRF_RTN</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCBD</td>
              <td class="govuk-table__cell">NOD</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EOB</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EOL</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">HR4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN2</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCBET</td>
              <td class="govuk-table__cell">CNFRM_DTMN_LTA_LGHA</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CNFRM_NO_LTA_LGHA</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">EVD_NO_RENEW</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCBN</td>
              <td class="govuk-table__cell">RN</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCF</td>
              <td class="govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CNSNT_ADMIN_COURT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCMRE</td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">HR4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN2</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCOE</td>
              <td class="govuk-table__cell">FR1</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DEED_REG_DIS</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCOF</td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCSD</td>
              <td class="govuk-table__cell">DEED_SUR</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">TR1</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">TP1</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">HR4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN2</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LNDLD_CNSNT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCSDM</td>
              <td class="govuk-table__cell">DEED_SUR</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">TR1</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">TP1</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LNDLD_CNSNT</td>
              <td class="govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">HR4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN2</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCSDMWT</td>
              <td class="govuk-table__cell">DEED_SUR</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LNDLD_CNSNT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">HR4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN2</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCSDWT</td>
              <td class="govuk-table__cell">DEED_SUR</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">LNDLD_CNSNT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">HR4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN2</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCSOL</td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">HR4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN2</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SOT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CNFRM_NO_DEED_SUR</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">LCSOLM</td>
              <td class="govuk-table__cell">STAT_DEC</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CNFRM_NO_DEED_SUR</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">CN1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS1</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">DS3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">HR4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX3</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">RX4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN2</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">UN4</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">SOT</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">MDR</td>
              <td class="govuk-table__cell">RX2</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">NCT</td>
              <td class="govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell"></td>
              <td class="govuk-table__cell">POA</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">NDC</td>
              <td class="govuk-table__cell">CORRES</td>
              <td class="govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NFR</td>
              <td class="govuk-table__cell govuk-table__cell">AN1</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">UN1</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NOE</td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NOL</td>
              <td class="govuk-table__cell govuk-table__cell">LEASE</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">AN1</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">UN1</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NPR</td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">NRT</td>
              <td class="govuk-table__cell govuk-table__cell">AN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">PC</td>
              <td class="govuk-table__cell govuk-table__cell">DOP</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">LONP</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">PER</td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">PRO</td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RC</td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RFN</td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RHR</td>
              <td class="govuk-table__cell govuk-table__cell">HR2</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RNT</td>
              <td class="govuk-table__cell govuk-table__cell">LEASE</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SDLT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">LTT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ROCA</td>
              <td class="govuk-table__cell govuk-table__cell">AN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ROCC</td>
              <td class="govuk-table__cell govuk-table__cell">CN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ROCU</td>
              <td class="govuk-table__cell govuk-table__cell">UN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">ROE</td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RRD</td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RTM</td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RUN</td>
              <td class="govuk-table__cell govuk-table__cell">UN2</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RXL</td>
              <td class="govuk-table__cell govuk-table__cell">RX1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RXN</td>
              <td class="govuk-table__cell govuk-table__cell">RX1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">RXS</td>
              <td class="govuk-table__cell govuk-table__cell">RX1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CHARG_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SEV</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">SBC</td>
              <td class="govuk-table__cell govuk-table__cell">MRTG_DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">SHO</td>
              <td class="govuk-table__cell govuk-table__cell">MEMO</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">SJT</td>
              <td class="govuk-table__cell govuk-table__cell">RX1</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SEV</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">STVC</td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COR_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">STVL</td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COR_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">T</td>
              <td class="govuk-table__cell govuk-table__cell">TR1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CIVIL_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SDLT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">LTT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TNV</td>
              <td class="govuk-table__cell govuk-table__cell">TR1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">FORM_JO</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CIVIL_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TNVTP</td>
              <td class="govuk-table__cell govuk-table__cell">TP1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TOC</td>
              <td class="govuk-table__cell govuk-table__cell">TR4</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TOSNV</td>
              <td class="govuk-table__cell govuk-table__cell">TR1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">FORM_JO</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CIVIL_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TOSNVTP</td>
              <td class="govuk-table__cell govuk-table__cell">TP1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TOSTP</td>
              <td class="govuk-table__cell govuk-table__cell">TP1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TOSV</td>
              <td class="govuk-table__cell govuk-table__cell">TR1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">FORM_JO</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CIVIL_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TPS</td>
              <td class="govuk-table__cell govuk-table__cell">TR2</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">FORM_JO</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CIVIL_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TPSTP</td>
              <td class="govuk-table__cell govuk-table__cell">TP2</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TRC</td>
              <td class="govuk-table__cell govuk-table__cell">CM5</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CM6</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TRM</td>
              <td class="govuk-table__cell govuk-table__cell">ADMIN_LTRS</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">TR1</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">FORM_JO</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CERT_DEATH</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COR_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TSCNV</td>
              <td class="govuk-table__cell govuk-table__cell">TR1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">FORM_JO</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CIVIL_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TSCNVTP</td>
              <td class="govuk-table__cell govuk-table__cell">TP1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TSCTP</td>
              <td class="govuk-table__cell govuk-table__cell">TP1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TSCV</td>
              <td class="govuk-table__cell govuk-table__cell">TR1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">FORM_JO</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEATH_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CIVIL_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PROBATE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TTP</td>
              <td class="govuk-table__cell govuk-table__cell">TP1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COMP_DOC</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">PLAN</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SDLT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">LTT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TVR</td>
              <td class="govuk-table__cell govuk-table__cell">TR1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">FORM_JO</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">TVRTP</td>
              <td class="govuk-table__cell govuk-table__cell">TP1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">FORM_JO</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">UNN</td>
              <td class="govuk-table__cell govuk-table__cell">UN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">DEED</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">UPT</td>
              <td class="govuk-table__cell govuk-table__cell">UT1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">EVIDENCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">REVERS_INT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">K17_OR_K18</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONSENT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONVEYANCE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">LEASE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VC</td>
              <td class="govuk-table__cell govuk-table__cell">VAR_CHARGE</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VLAN</td>
              <td class="govuk-table__cell govuk-table__cell">AN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">VAR_LEASE</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SIDE_LTR</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VLAP</td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">VAR_LEASE</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SIDE_LTR</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VLUN</td>
              <td class="govuk-table__cell govuk-table__cell">UN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">VAR_LEASE</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SIDE_LTR</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">LEASE</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VC</td>
              <td class="govuk-table__cell govuk-table__cell">VAR_CHARGE</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">CONV_CERT</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VLAN</td>
              <td class="govuk-table__cell govuk-table__cell">AN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">VAR_LEASE</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SIDE_LTR</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VLAP</td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">VAR_LEASE</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SIDE_LTR</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VLUN</td>
              <td class="govuk-table__cell govuk-table__cell">UN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">VAR_LEASE</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">SIDE_LTR</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VO</td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOC</td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">VAR_COV</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOCA</td>
              <td class="govuk-table__cell govuk-table__cell">AN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">VAR_COV</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOCU</td>
              <td class="govuk-table__cell govuk-table__cell">UN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">COURT_ORD</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">VAR_COV</td>
              <td class="govuk-table__cell govuk-table__cell">Either</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOE</td>
              <td class="govuk-table__cell govuk-table__cell">VAR_EAS</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOEA</td>
              <td class="govuk-table__cell govuk-table__cell">VAR_EAS</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">AN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">VOEU</td>
              <td class="govuk-table__cell govuk-table__cell">VAR_EAS</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">UN1</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">WCT</td>
              <td class="govuk-table__cell govuk-table__cell">WCT</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell">WDR</td>
              <td class="govuk-table__cell govuk-table__cell">RX4</td>
              <td class="govuk-table__cell govuk-table__cell">Compulsory</td>
            </tr>
            <tr class="govuk-table__row">
              <td class="govuk-table__cell govuk-table__cell"></td>
              <td class="govuk-table__cell govuk-table__cell">POA</td>
              <td class="govuk-table__cell govuk-table__cell">Suggested</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
    <h3 class="govuk-heading-s">Valid transaction types per application type</h3>
    <p class="govuk-body">For each application type (<code
        class="x-govuk-code x-govuk-code--inline">REGISTER_UPDATE</code>, <code
        class="x-govuk-code x-govuk-code--inline">DISPOSITIONARY_FIRST_LEASE</code>, <code
        class="x-govuk-code x-govuk-code--inline">TRANSFER_OF_PART</code> and <code
        class="x-govuk-code x-govuk-code--inline">REMOVE_JP1</code>), only certain transaction types can be
      supplied. The sections below detail which transaction types are valid for each application type.</p>
    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          Valid transaction types
        </span>
      </summary>
      <div class="govuk-details__text">
        <h3 class="govuk-heading-s"><code>REGISTER_UPDATE</code></h3>
        <ul class="govuk-list govuk-list--bullet">
          <li><code class="x-govuk-code x-govuk-code--inline">ADV1</code> - First notice of adverse
            possession</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ADV2</code> - Adverse possession: notification
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">AGN</code> - Agreed notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">APLC</code> - Appointment of liquidator
            (creditor’s voluntary winding up)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">APLCO</code> - Appointment of liquidator
            (compulsory winding up)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">APLM</code> - Appointment of liquidator
            (members’ voluntary winding up)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">APR</code> - Apportionment of rent</li>
          <li><code class="x-govuk-code x-govuk-code--inline">APT</code> - Appointment of new trustee</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ASTC</code> - Assent of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ATP</code> - Amendment to title plan</li>
          <li><code class="x-govuk-code x-govuk-code--inline">AUN</code> - Amendment of unilateral notice
            (UN3)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">BKN</code> - Bankruptcy notice/Creditors’
            notice</li>
          <li><code class="x-govuk-code x-govuk-code--inline">BKR</code> - Bankruptcy restriction/Bankruptcy
            inhibition</li>
          <li><code class="x-govuk-code x-govuk-code--inline">C</code> - Charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CAG</code> - Cancellation of notice (not
            unilateral) (CN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CANI</code> - Cancellation of inhibition (RX3)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CANR</code> - Cancellation of restriction
            (RX3)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CANU</code> - Cancellation of unilateral
            notice (UN4)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CBKN</code> - Cancellation of bankruptcy
            notice</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CBKR</code> - Cancellation of bankruptcy
            restriction</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CCT</code> - Cancellation of a caution (CCD)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CH2</code> - Obligation to make further
            advances (CH2)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CH3</code> - Agreed maximum amount of security
            (CH3)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CHOA</code> - Charging order - Agreed notice
            (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CHOU</code> - Charging order - Unilateral
            notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CHR</code> - Cancellation of home rights (HR4)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CN</code> - Change of name</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CNC</code> - Change of name - chargee</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CNL</code> - Cancellation of an unregistered
            noted lease (CN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">COA</code> - Change of address for service
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">COAC</code> - Change of address for service -
            chargee</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CON</code> - Consolidation of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">COP</code> - Charge of part</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CPD</code> - Change of property description
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CPVK</code> - Compulsory purchase (property
            value known)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CTD</code> - Commonhold transitional dealing
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CUR</code> - Cancellation of notice of
            unregistered Rentcharge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DB</code> - Determined boundary (DB)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DCLN</code> - Disclaimer - notification</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DCLV</code> - Disclaimer - notice</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DFL1</code> - New lease - other</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DFT</code> - Defect in title s64(1) LRA 2002
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">DIS</code> - Discharge of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DJP</code> - Death of a joint proprietor</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DL</code> - Discontinuous lease -
            non-timeshare</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DMR</code> - Disapplication of restriction
            (RX2)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DOG</code> - Deed of grant of easement</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DP</code> - Discharge of part</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DSP</code> - Death of a sole proprietor</li>
          <li><code class="x-govuk-code x-govuk-code--inline">JP1</code> - Removal of default Form A
            restriction</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCATCO</code> - Lease closure - of assured
            tenancies following court order</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCBD</code> - Lease closure - by disclaimer
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCBET</code> - Lease closure - by effluxion of
            time</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCBN</code> - Lease closure - by notice</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCF</code> - Lease closure - forfeiture</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCMRE</code> - Lease closure - merger with
            reversionary estate</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCOE</code> - Lease closure - on enlargement
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCOF</code> - Lease closure - on frustration
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCSD</code> - Lease closure - surrender by
            deed (not for value or reverse premium)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCSDM</code> - Lease closure - surrender by
            deed</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCSDMWT</code> - Lease closure - surrender by
            deed (together with transfer)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCSDWT</code> - Lease closure - surrender by
            deed with a transfer (not for value or reverse premium)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCSOL</code> - Lease closure - surrender by
            operation of law (not for value or reverse premium)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCSOLM</code> - Lease closure - surrender by
            operation of law</li>
          <li><code class="x-govuk-code x-govuk-code--inline">MDR</code> - Modification of Restriction</li>
          <li><code class="x-govuk-code x-govuk-code--inline">NCT</code> - Caution amendment</li>
          <li><code class="x-govuk-code x-govuk-code--inline">NDC</code> - Notification of dissolution of
            company</li>
          <li><code class="x-govuk-code x-govuk-code--inline">NFR</code> - Noting of an affecting franchise
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">NOE</code> - Noting an easement</li>
          <li><code class="x-govuk-code x-govuk-code--inline">NOL</code> - Noting a lease</li>
          <li><code class="x-govuk-code x-govuk-code--inline">NPR</code> - Noting of a profit</li>
          <li><code class="x-govuk-code x-govuk-code--inline">NRT</code> - Notice of rentcharge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">PC</code> - Postponement of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">PRO</code> - Provisions</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RC</code> - Restrictive covenants - entry of
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">RFN</code> - Deed of rectification</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RHR</code> - Renewal of home rights (HR2)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RNT</code> - Overriding lease granted under
            s.19</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ROCA</code> - Release of covenants - agreed
            notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ROCC</code> - Release of covenants -
            cancellation (CN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ROCU</code> - Release of covenants -
            unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ROE</code> - Release of easements</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RRD</code> - Removal of a right to determine
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">RTM</code> - Acquisition of right to manage
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">RUN</code> - Removal of unilateral notice
            (UN2)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RXL</code> - Form || restriction entered -
            simple request</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RXN</code> - Restriction (non-standard
            wording) (RX1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RXS</code> - Restriction (standard wording)
            (RX1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">SBC</code> - Sub charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">SHO</code> - Shared ownership - additional
            share</li>
          <li><code class="x-govuk-code x-govuk-code--inline">SJT</code> - Severance of joint tenancy (SEV)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">STVC</code> - Statutory vestings charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">STVL</code> - Statutory vestings land</li>
          <li><code class="x-govuk-code x-govuk-code--inline">T</code> - Transfer for value</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TNV</code> - Transfer (not for value or
            reverse premium)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TOC</code> - Transfer of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TOSNV</code> - Transfer of share (not for
            value or reverse premium)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TOSV</code> - Transfer of share for value</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TPS</code> - Transfer under power of sale</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TRC</code> - Termination of commonhold</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TRM</code> - Transfer by operation of law on
            death</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TSCNV</code> - Transfer subject to a charge
            (not for value or reverse premium)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TSCV</code> - Transfer subject to a charge for
            value</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TVR</code> - Transfer for value RTB/RTA</li>
          <li><code class="x-govuk-code x-govuk-code--inline">UNN</code> - Unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">UPT</code> - Upgrade class of title (UT1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VC</code> - Variation of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VLAN</code> - Variation of lease - agreed
            notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VLAP</code> - Deed of variation of a lease -
            not increasing the term of or adding new land to the extent demised</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VLUN</code> - Variation of lease - unilateral
            notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VO</code> - Vesting order</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOC</code> - Variation of covenants</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOCA</code> - Variation of covenants - agreed
            notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOCU</code> - Variation of covenants -
            unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOE</code> - Variation of easements</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOEA</code> - Variation of easements - agreed
            notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOEU</code> - Variation of easements -
            unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">WCT</code> - Withdrawal of caution</li>
          <li><code class="x-govuk-code x-govuk-code--inline">WDR</code> - Withdraw a restriction (RX4)</li>
        </ul>
        <h3 class="govuk-heading-s"><code>TRANSFER_OF_PART</code></h3>
        <ul class="govuk-list govuk-list--bullet">
          <li><code class="x-govuk-code x-govuk-code--inline">ADV1</code> - First notice of adverse
            possession</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ADV2</code> - Adverse possession: notification
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">AGN</code> - Agreed notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">APLM</code> - Appointment of liquidator
            (members’ voluntary winding up)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">APR</code> - Apportionment of rent</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ASSTTP</code> - Assent (Transfer of Part)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">C</code> - Charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CAG</code> - Cancellation of notice (not
            unilateral) (CN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CANI</code> - Cancellation of inhibition (RX3)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CANR</code> - Cancellation of restriction
            (RX3)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CANU</code> - Cancellation of unilateral
            notice (UN4)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CBKN</code> - Cancellation of bankruptcy
            notice</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CBKR</code> - Cancellation of bankruptcy
            restriction</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CCT</code> - Cancellation of a caution (CCD)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CH2</code> - Obligation to make further
            advances (CH2)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CH3</code> - Agreed maximum amount of security
            (CH3)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CHOA</code> - Charging order - Agreed notice
            (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CHOU</code> - Charging order - Unilateral
            notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CHR</code> - Cancellation of home rights (HR4)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CNL</code> - Cancellation of an unregistered
            noted lease (CN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CON</code> - Consolidation of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">COP</code> - Charge of part</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CPVU</code> - Compulsory purchase (property
            value unknown)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CTD</code> - Commonhold transitional dealing
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CUR</code> - Cancellation of notice of
            unregistered Rentcharge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DB</code> - Determined boundary (DB)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DCLN</code> - Disclaimer - notification</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DFL1</code> - New lease - other</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DFT</code> - Defect in title s64(1) LRA 2002
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">DIS</code> - Discharge of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DL</code> - Discontinuous lease -
            non-timeshare</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DMR</code> - Disapplication of restriction
            (RX2)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DOG</code> - Deed of grant of easement</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DP</code> - Discharge of part</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DSP</code> - Death of a sole proprietor</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCATCO</code> - Lease closure - of assured
            tenancies following court order</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCBD</code> - Lease closure - by disclaimer
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCBET</code> - Lease closure - by effluxion of
            time</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCF</code> - Lease closure - forfeiture</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCSDWT</code> - Lease closure - surrender by
            deed with a transfer (not for value or reverse premium)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCSOL</code> - Lease closure - surrender by
            operation of law (not for value or reverse premium)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCSOLM</code> - Lease closure - surrender by
            operation of law</li>
          <li><code class="x-govuk-code x-govuk-code--inline">MDR</code> - Modification of Restriction</li>
          <li><code class="x-govuk-code x-govuk-code--inline">NFR</code> - Noting of an affecting franchise
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">NOE</code> - Noting an easement</li>
          <li><code class="x-govuk-code x-govuk-code--inline">NOL</code> - Noting a lease</li>
          <li><code class="x-govuk-code x-govuk-code--inline">NPR</code> - Noting of a profit</li>
          <li><code class="x-govuk-code x-govuk-code--inline">NRT</code> - Notice of rentcharge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">PRO</code> - Provisions</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RC</code> - Restrictive covenants - entry of
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">RFN</code> - Deed of rectification</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RNT</code> - Overriding lease granted under
            s.19</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ROCC</code> - Release of covenants -
            cancellation (CN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ROCU</code> - Release of covenants -
            unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ROE</code> - Release of easements</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RRD</code> - Removal of a right to determine
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">RUN</code> - Removal of unilateral notice
            (UN2)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RXL</code> - Form || restriction entered -
            simple request</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RXN</code> - Restriction (non-standard
            wording) (RX1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RXS</code> - Restriction (standard wording)
            (RX1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">SBC</code> - Sub charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">SJT</code> - Severance of joint tenancy (SEV)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">STVC</code> - Statutory vestings charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">STVL</code> - Statutory vestings land</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TNVTP</code> - Transfer (not for value or
            reverse premium) (Transfer of part)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TOSNVTP</code> - Transfer of share (not for
            value or reverse premium) (Transfer of part)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TOSTP</code> - Transfer of share for value
            (Transfer of part)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TPSTP</code> - Transfer under power of sale
            (Transfer of part)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TRC</code> - Termination of commonhold</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TSCNVTP</code> - Transfer subject to a charge
            (not for value or reverse premium) (Transfer of part)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TSCVTP</code> - Transfer subject to a charge
            for value (Transfer of part)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TTP</code> - Transfer for value (Transfer of
            part)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">TVRTP</code> - Transfer for value RTB/RTA
            (Transfer of part)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">UNN</code> - Unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">UPT</code> - Upgrade class of title (UT1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VC</code> - Variation of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VLAN</code> - Variation of lease - agreed
            notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VLAP</code> - Deed of variation of a lease -
            not increasing the term of or adding new land to the extent demised</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VLUN</code> - Variation of lease - unilateral
            notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VO</code> - Vesting order</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOC</code> - Variation of covenants</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOCA</code> - Variation of covenants - agreed
            notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOCU</code> - Variation of covenants -
            unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOE</code> - Variation of easements</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOEA</code> - Variation of easements - agreed
            notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOEU</code> - Variation of easements -
            unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">WCT</code> - Withdrawal of caution</li>
          <li><code class="x-govuk-code x-govuk-code--inline">WDR</code> - Withdraw a restriction (RX4)</li>
        </ul>
        <h3 class="govuk-heading-s">
          <code>DISPOSITIONARY_FIRST_LEASE</code>
        </h3>
        <p class="govuk-body">New leases</p>
        <ul class="govuk-list govuk-list--bullet">
          <li>
            <code class="x-govuk-code x-govuk-code--inline">ADV1</code>
            - First notice of adverse possession
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">AGN</code>
            - Agreed notice (AN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">AUN</code>
            - Amendment of unilateral notice (UN3)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">BKR</code>
            - Bankruptcy restriction/Bankruptcy inhibition
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">C</code>
            - Charge
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CAG</code>
            - Cancellation of notice (not unilateral) (CN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CANI</code>
            - Cancellation of inhibition (RX3)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CANR</code>
            - Cancellation of restriction (RX3)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CANU</code>
            - Cancellation of unilateral notice (UN4)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CBKN</code>
            - Cancellation of bankruptcy notice
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CBKR</code>
            - Cancellation of bankruptcy restriction
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CCT</code>
            - Cancellation of a caution (CCD)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CH2</code>
            - Obligation to make further advances (CH2)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CH3</code>
            - Agreed maximum amount of security (CH3)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CHOA</code>
            - Charging order - Agreed notice (AN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CHOU</code>
            - Charging order - Unilateral notice (UN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CHR</code>
            - Cancellation of home rights (HR4)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CN</code>
            - Change of name
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CNC</code>
            - Change of name- chargee
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CNL</code>
            - Cancellation of an unregistered noted lease (CN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">COA</code>
            - Change of address for service
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">COAC</code>
            - Change of address for service - chargee
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">COP</code>
            - Charge of part
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">CUR</code>
            - Cancellation of notice of unregistered Rentcharge
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DCLV</code>
            - Disclaimer - notice
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DFL1</code>
            - New lease - other
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DFL3</code>
            - New lease - shared ownership
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DFL4</code>
            - New lease - right to buy or right to acquire
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DFT</code>
            - Defect in title s64(1) LRA 2002
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DIS</code>
            - Discharge of charge
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DJP</code>
            - Death of a joint proprietor
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DMR</code>
            - Disapplication of restriction (RX2)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DOG</code>
            - Deed of grant of easement
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DP</code>
            - Discharge of part
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DSP</code>
            - Death of a sole proprietor
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">DTL</code>
            - Discontinuous lease - timeshare
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">HR</code>
            - Notice of home rights (HR1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">LCBD</code>
            - Lease closure - by disclaimer
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">LCBN</code>
            - Lease closure - by notice
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">LCF</code>
            - Lease closure - forfeiture
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">LCMRE</code>
            - Lease closure - merger with reversionary estate
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">LCOE</code>
            - Lease closure - on enlargement
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">LCSD</code>
            - Lease closure - surrender by deed (not for value or reverse premium)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">LCSDM</code>
            - Lease closure - surrender by deed
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">LCSDMWT</code>
            - Lease closure - surrender by deed (together with transfer)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">LCSOL</code>
            - Lease closure - surrender by operation of law (not for value or reverse premium)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">MDR</code>
            - Modification of Restriction
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">NDC</code>
            - Notification of dissolution of company
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">NFR</code>
            - Noting of an affecting franchise
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">NOL</code>
            - Noting a lease
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">NPR</code>
            - Noting of a profit
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">NRT</code>
            - Notice of rentcharge
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">PC</code>
            - Postponement of charge
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">PER</code>
            - Personal covenants
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">PRO</code>
            - Provisions
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">RC</code>
            - Restrictive covenants - entry of
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">RFN</code>
            - Deed of rectification
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">RHR</code>
            - Renewal of home rights (HR2)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">RNT</code>
            - Overriding lease granted under s.19
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">ROCA</code>
            - Release of covenants - agreed notice (AN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">ROCC</code>
            - Release of covenants - cancellation (CN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">ROCU</code>
            - Release of covenants - unilateral notice (UN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">ROE</code>
            - Release of easements
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">RRD</code>
            - Removal of a right to determine
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">RUN</code>
            - Removal of unilateral notice (UN2)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">RXN</code>
            - Restriction (non-standard wording) (RX1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">RXS</code>
            - Restriction (standard wording) (RX1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">SBC</code>
            - Sub charge
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">SJT</code>
            - Severance of joint tenancy (SEV)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">UNN</code>
            - Unilateral notice (UN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">UPT</code>
            - Upgrade class of title (UT1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">VC</code>
            - Variation of charge
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">VLAN</code>
            - Variation of lease - agreed notice (AN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">VLAP</code>
            - Deed of variation of a lease - not increasing the term of or adding new land to the extent demised
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">VLUN</code>
            - Variation of lease - unilateral notice (UN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">VOC</code>
            - Variation of covenants
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">VOCA</code>
            - Variation of covenants - agreed notice (AN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">VOCU</code>
            - Variation of covenants - unilateral notice (UN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">VOE</code>
            - Variation of easements
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">VOEA</code>
            - Variation of easements - agreed notice (AN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">VOEU</code>
            - Variation of easements - unilateral notice (UN1)
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">WCT</code>
            - Withdrawal of caution
          </li>
          <li>
            <code class="x-govuk-code x-govuk-code--inline">WDR</code>
            - Withdraw a restriction (RX4)
          </li>
        </ul>
        <p class="govuk-body">Lease extensions</p>
        <p class="govuk-body">For a lease extension application, the <code
            class="x-govuk-code x-govuk-code--inline">DFL5</code> (Dispositionary first lease extension of a
          term) transaction type must be used.</p>
        <ul class="govuk-list govuk-list--bullet">
          <li><code class="x-govuk-code x-govuk-code--inline">ADV1</code> - First notice of adverse
            possession</li>
          <li><code class="x-govuk-code x-govuk-code--inline">AGN</code> - Agreed notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">APLC</code> - Appointment of liquidator
            (creditor’s voluntary winding up)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">APLCO</code> - Appointment of liquidator
            (compulsory winding up)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">APLM</code> - Appointment of liquidator
            (members’ voluntary winding up)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">AUN</code> - Amendment of unilateral notice
            (UN3)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">C</code> - Charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CAG</code> - Cancellation of notice (not
            unilateral) (CN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CANI</code> - Cancellation of inhibition (RX3)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CANR</code> - Cancellation of restriction
            (RX3)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CANU</code> - Cancellation of unilateral
            notice (UN4)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CBKN</code> - Cancellation of bankruptcy
            notice</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CBKR</code> - Cancellation of bankruptcy
            restriction</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CCT</code> - Cancellation of a caution (CCD)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CH3</code> - Agreed maximum amount of security
            (CH3)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CHOA</code> - Charging order - Agreed notice
            (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CHOU</code> - Charging order - Unilateral
            notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CHR</code> - Cancellation of home rights (HR4)
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">CN</code> - Change of name</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CNC</code> - Change of name- chargee</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CNL</code> - Cancellation of an unregistered
            noted lease (CN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">COA</code> - Change of address for service
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">COAC</code> - Change of address for service -
            chargee</li>
          <li><code class="x-govuk-code x-govuk-code--inline">COP</code> - Charge of part</li>
          <li><code class="x-govuk-code x-govuk-code--inline">CUR</code> - Cancellation of notice of
            unregistered Rentcharge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DCLN</code> - Disclaimer - notification</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DCLV</code> - Disclaimer - notice</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DFL1</code> - New lease - other</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DFL5</code> - Dispositionary first lease
            extension of a term</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DFT</code> - Defect in title s64(1) LRA 2002
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">DIS</code> - Discharge of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DJP</code> - Death of a joint proprietor</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DL</code> - Discontinuous lease -
            non-timeshare</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DMR</code> - Disapplication of restriction
            (RX2)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DOG</code> - Deed of grant of easement</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DP</code> - Discharge of part</li>
          <li><code class="x-govuk-code x-govuk-code--inline">DSP</code> - Death of a sole proprietor</li>
          <li><code class="x-govuk-code x-govuk-code--inline">EXR</code> - Extinguishment of rentcharge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">LCBD</code> - Lease closure - by disclaimer
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">NRT</code> - Notice of rentcharge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">PRO</code> - Provisions</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RFN</code> - Deed of rectification</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RNT</code> - Overriding lease granted under
            s.19</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ROCC</code> - Release of covenants -
            cancellation (CN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ROCU</code> - Release of covenants -
            unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">ROE</code> - Release of easements</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RRD</code> - Removal of a right to determine
          </li>
          <li><code class="x-govuk-code x-govuk-code--inline">RUN</code> - Removal of unilateral notice
            (UN2)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RXN</code> - Restriction (non-standard
            wording) (RX1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">RXS</code> - Restriction (standard wording)
            (RX1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">SBC</code> - Sub charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">STVC</code> - Statutory vestings charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">STVL</code> - Statutory vestings land</li>
          <li><code class="x-govuk-code x-govuk-code--inline">UNN</code> - Unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">UPT</code> - Upgrade class of title (UT1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VC</code> - Variation of charge</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VLAN</code> - Variation of lease - agreed
            notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VLUN</code> - Variation of lease - unilateral
            notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VO</code> - Vesting order</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOC</code> - Variation of covenants</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOCA</code> - Variation of covenants - agreed
            notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOCU</code> - Variation of covenants -
            unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOE</code> - Variation of easements</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOEA</code> - Variation of easements - agreed
            notice (AN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">VOEU</code> - Variation of easements -
            unilateral notice (UN1)</li>
          <li><code class="x-govuk-code x-govuk-code--inline">WDR</code> - Withdraw a restriction (RX4)</li>
        </ul>
        <h3 class="govuk-heading-s"><code>REMOVE_JP1</code></h3>
        <p class="govuk-body">The only valid transaction type for the <code
            class="x-govuk-code x-govuk-code--inline">REMOVE_JP1</code> application type is <code
            class="x-govuk-code x-govuk-code--inline">JP1</code>. This must be the only transaction, and
          there must only be a single <code class="x-govuk-code x-govuk-code--inline">JP1</code> transaction
          per application.</p>
      </div>
    </details>
    <h3 class="govuk-heading-s">Additional transaction details</h3>
    <p class="govuk-body">For certain transaction types, more detailed information is needed (via the <code
        class="x-govuk-code x-govuk-code--inline">Transaction.details</code> field). This field can be one
      of several different types:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">Transfer</code></li>
      <li><code class="x-govuk-code x-govuk-code--inline">Charge</code></li>
      <li><code class="x-govuk-code x-govuk-code--inline">Discharge</code></li>
      <li><code class="x-govuk-code x-govuk-code--inline">AmountDetails</code></li>
    </ul>
    <p class="govuk-body">The data below details which transactions require which details type. If a transaction is
      not listed, it does not require additional details.</p>
    <p class="govuk-body"><code>Transfer</code></p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">T</code> - Transfer for value</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TNV</code> - Transfer (not for value or reverse
        premium)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TOSNV</code> - Transfer of share (not for value or
        reverse premium)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TSCNV</code> - Transfer subject to a charge (not
        for value or reverse premium)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TSCV</code> - Transfer subject to a charge for
        value</li>
    </ul>
    <p class="govuk-body"><code>Charge</code></p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">C</code> - Charge</li>
      <li><code class="x-govuk-code x-govuk-code--inline">COP</code> - Charge of part</li>
      <li><code class="x-govuk-code x-govuk-code--inline">SBC</code> - Sub charge</li>
    </ul>
    <p class="govuk-body"><code>Discharge</code></p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">DIS</code> - Discharge</li>
      <li><code class="x-govuk-code x-govuk-code--inline">DP</code> - Discharge of part</li>
    </ul>
    <p class="govuk-body"><code>AmountDetails</code></p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">ASTT</code> - Assent</li>
      <li><code class="x-govuk-code x-govuk-code--inline">ASTC</code> - Assent of charge</li>
      <li><code class="x-govuk-code x-govuk-code--inline">APT</code> - Appointment of new trustee</li>
      <li><code class="x-govuk-code x-govuk-code--inline">ASSTTP</code> - Assent (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">CPVK</code> - Compulsory purchase (property value
        known)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">CPVU</code> - Compulsory purchase (property value
        unknown)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">DFL1</code> - New lease - other</li>
      <li><code class="x-govuk-code x-govuk-code--inline">DFL3</code> - New lease - shared ownership</li>
      <li><code class="x-govuk-code x-govuk-code--inline">DFL4</code> - New lease - right to buy or right to
        acquire</li>
      <li><code class="x-govuk-code x-govuk-code--inline">DFL5</code> - Dispositionary first lease extension
        of a term</li>
      <li><code class="x-govuk-code x-govuk-code--inline">DL</code> - Discontinuous lease - non-timeshare
      </li>
      <li><code class="x-govuk-code x-govuk-code--inline">DTL</code> - Discontinuous lease - timeshare</li>
      <li><code class="x-govuk-code x-govuk-code--inline">LCSD</code> - Lease closure - surrender by deed
        (not for value or reverse premium)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">LCSDM</code> - Lease closure - surrender by deed
      </li>
      <li><code class="x-govuk-code x-govuk-code--inline">LCSDWT</code> - Lease closure - surrender by deed
        with a transfer (not for value or reverse premium)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">LCSDMWT</code> - Lease closure - surrender by deed
        (together with transfer)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">LCSOL</code> - Lease closure - surrender by
        operation of law (not for value or reverse premium)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">LCSOLM</code> - Lease closure - surrender by
        operation of law</li>
      <li><code class="x-govuk-code x-govuk-code--inline">RNT</code> - Overriding lease granted under s.19,
        Landlord & Tenant (Covenants) Act 1995</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TNVTP</code> - Transfer (not for value or reverse
        premium) (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TOC</code> - Transfer of charge</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TOSNVTP</code> - Transfer of share (not for value
        or reverse premium) (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TOSTP</code> - Transfer of share for value
        (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TOSV</code> - Transfer of share for value</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TPS</code> - Transfer under power of sale</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TPSTP</code> - Transfer under power of sale
        (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TRM</code> - Transfer by operation of law on death
      </li>
      <li><code class="x-govuk-code x-govuk-code--inline">TSCNVTP</code> - Transfer subject to a charge (not
        for value or reverse premium) (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TSCTP</code> - Transfer subject to a charge for
        value (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TTP</code> - Transfer for value (Transfer of part)
      </li>
      <li><code class="x-govuk-code x-govuk-code--inline">TVR</code> - Transfer for value RTB/RTA </li>
      <li><code class="x-govuk-code x-govuk-code--inline">TVRTP</code> - Transfer for value RTB/RTA
        (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">VO</code> - Vesting order</li>
    </ul>
    <h3 class="govuk-heading-s">Title types</h3>
    <p class="govuk-body">Titles included as part of submission have a <code
        class="x-govuk-code x-govuk-code--inline">type</code> field that informs HMLR how to process the
      application. This type depends on the application type, and the usage of the title within the application.</p>
    <h3 class="govuk-heading-s"><code>REGISTER_UPDATE</code> and <code>REMOVE_JP1</code> application types</h3>
    <p class="govuk-body">Only title types of <code
        class="x-govuk-code x-govuk-code--inline">REGISTER_TITLE</code> are supported.</p>
    <h3 class="govuk-heading-s"><code>TRANSFER_OF_PART</code> application types</h3>
    <p class="govuk-body">The following title types are supported:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">TRANSFEROR_TITLE</code> - titles related to the
        transferor(s) on the application</li>
      <li><code class="x-govuk-code x-govuk-code--inline">ADDITIONAL_TITLE</code> - any other titles on the
        application</li>
    </ul>
    <h3 class="govuk-heading-s"><code>DISPOSITIONARY_FIRST_LEASE</code> application types</h3>
    <p class="govuk-body">The following title types are supported:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">LANDLORD_TITLES</code> - titles related to the
        landlord(s) on the application</li>
      <li><code class="x-govuk-code x-govuk-code--inline">ADDITIONAL_TITLE</code> - any other titles on the
        application</li>
    </ul>
    <p class="govuk-body">For a lease extension application (where the transaction type is <code
        class="x-govuk-code x-govuk-code--inline">DFL5</code> Dispositionary first lease extension of a
      term) a single title with type <code class="x-govuk-code x-govuk-code--inline">TENANT_TITLE</code>
      must also be provided, which is related to the tenant on the application.</p>
    <h3 class="govuk-heading-s">Change of name / Death of a joint proprietor (DJP)</h3>
    <p class="govuk-body">HMLR will accept Transfers where the proprietor information does not match the register
      (in the case of a change of name, or a death of a joint proprietor) without needing to specify the relevant
      transactions, so long as the correct identity documentation has been supplied with the accompanying
      transaction(s).</p>
    <p class="govuk-body">To trigger this functionality, the <code
        class="x-govuk-code x-govuk-code--inline">register_action</code> field on the <code
        class="x-govuk-code x-govuk-code--inline">party</code> object can be used. This field has two
      options:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">AMEND</code> - the party information is different
        to the currently held register information</li>
      <li><code class="x-govuk-code x-govuk-code--inline">REMOVE</code> - The party on the register should
        be removed</li>
    </ul>
    <h3 class="govuk-heading-s">Amend</h3>
    <p class="govuk-body">A value of amend will trigger a change of name transaction to be created internally. The
      party information must be the new proprietor information. Identity evidence must be provided as documents on
      the transaction.</p>
    <p class="govuk-body">Example:</p>
    <div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
"parties": {
  "party1": {
    "details": {
      "type": "PRIVATE_INDIVIDUAL",
      "forenames": "New",
      "surname": "Doe"
    },
    "register_action": "AMEND",
    "identity_evidence_type": "EVIDENCE",
    "representation_type": "LODGING_CONVEYANCER",
    "addresses": "ADDR1",
    "address_for_service_option": "PROVIDED_ADDRESS"
  }
}
``` 
</div>
    <div class="govuk-!-padding-bottom-6"></div>
    <h3 class="govuk-heading-s">Remove</h3>
    <p class="govuk-body">A value of remove will trigger a DJP transaction to be created internally. The party
      information must be the existing proprietor information. Identity evidence must be provided as documents on
      the transaction.</p>
    <p class="govuk-body">Example:</p>
    <div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
"party1": {
  "details": {
    "type": "PRIVATE_INDIVIDUAL",
    "forenames": "existing",
    "surname": "doe"
  },
  "register_action": "REMOVE",
  "identity_evidence_type": "EVIDENCE",
  "representation_type": "LODGING_CONVEYANCER",
  "addresses": "ADDR1",
  "address_for_service_option": "PROVIDED_ADDRESS"
},
"party2": {
  "details": {
    "type": "PRIVATE_INDIVIDUAL",
    "forenames": "jane",
    "surname": "doe"
  },
  "identity_evidence_type": "EVIDENCE",
  "representation_type": "LODGING_CONVEYANCER",
  "addresses": "ADDR1",
  "address_for_service_option": "PROVIDED_ADDRESS"
}
```
</div>
    <div class="govuk-!-padding-bottom-6"></div>
    <h3 class="govuk-heading-m">List of validation rules</h3>
    <p class="govuk-body">During application submission, several validation rules will run against the data provided
      to ensure it is valid. A number of these rules run synchronously before an <code
        class="x-govuk-code x-govuk-code--inline">application_request_id</code> is returned and they are
      documented in the schema documentation. Other rules run asynchronously, after the <code
        class="x-govuk-code x-govuk-code--inline">application_request_id</code> has been returned.</p>
    <h3 class="govuk-heading-s">Bypass validation</h3>
    <p class="govuk-body">If an application fails validation, there may be legitimate reasons why you might want
      HMLR to ignore specific rules. In this case, we provide a <code
        class="x-govuk-code x-govuk-code--inline">bypass_validation</code> array that can be used to ignore
      validation rules for specific objects, as defined by the <code
        class="x-govuk-code x-govuk-code--inline">pointer</code>.</p>
    <p class="govuk-body">Usage of validation bypass will be monitored. To use the bypass functionality, the
      following information is required:</p>
    <p class="govuk-body">Value bands are only applicable to the following transaction types:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">validation_type</code> - the type of validation
        rule you want to bypass. This is returned in the <code
          class="x-govuk-code x-govuk-code--inline">type</code> field from any validation erro</li>
      <li><code class="x-govuk-code x-govuk-code--inline">validation_pointer</code> - the location of the
        object in the payload structure. This is returned in the <code
          class="x-govuk-code x-govuk-code--inline">pointer</code>field from some validation errors</li>
      <li><code class="x-govuk-code x-govuk-code--inline">reason</code> - the specific reason the bypass was
        required. Must be one of:</li>
      <ul class="govuk-list govuk-list--bullet">
        <li><code class="x-govuk-code x-govuk-code--inline">DISAGREE_WITH_REGISTER</code> - the validation
          rule is incorrect because the data on the register is incorrect</li>
        <li><code class="x-govuk-code x-govuk-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code> - there
          is missing, outdated or incorrect data in a comparison database</li>
        <li><code class="x-govuk-code x-govuk-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code> -
          the application is valid. An exception should apply but is not covered by current business rules</li>
      </ul>
      <li><code class="x-govuk-code x-govuk-code--inline">comment</code> - a user inputted description of
        why the validation is being bypassed</li>
    </ul>
    <p class="govuk-body">Bypassing validation can only be done for specific rules, and each rule is only permitted
      to have specific reasons for bypassing the validation. Information about which validation types support
      bypassing and which reasons are valid for those types are defined below:-color:</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Validation bypass rules</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Validation type</th>
          <th scope="col" class="govuk-table__header">Valid bypass reasons</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">all-proprietors-matched-to-borrowers</code></td>
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">DISAGREE_WITH_REGISTER</code><br><code
              class="x-govuk-code x-govuk-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">lender-name-matches-records</code></td>
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">mdref-on-record</code></td>
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">all-proprietors-matched-to-transferors</code></td>
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">DISAGREE_WITH_REGISTER</code><br><code
              class="x-govuk-code x-govuk-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">transferee-has-a-valid-address</code></td>
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">all-mandatory-documents-provided</code></td>
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">identity-evidence-has-type</code></td>
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></td>
        </tr>
      </tbody>
    </table>
    <p class="govuk-body">For an example; if after submitting an application the following error was received:</p>
    <div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
    "status": "VALIDATION_FAILED",
    "errors": [
        {
            "type": "all-proprietors-matched-to-borrowers",
            "detail": "There was a problem",
            "pointer": "/data/parties/borrower-1"
        }
    ]
}
```
</div>
    <p class="govuk-body">The validation rule could then be overridden by submitting the same payload, but with the
      following addition:</p>
    <div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "bypass_validation": [{
      "validation_type": "all-proprietors-matched-to-borrowers",
      "validation_pointer": "/data/parties/borrower-1",
      "reason": "DISAGREE_WITH_REGISTER",
      "comment": "A comment about why the validation was incorrect"
    }],
    "addresses": {...},
    "parties": {...},
    // etc.
  }
}
```
</div>
    <p class="govuk-body">This would resubmit the application, but this time ignoring the validation rule for the
      specific field identified by the pointer.</p>
    <h3 class="govuk-heading-s">Additional provisions validation</h3>
    <p class="govuk-body">One of the following Additional Provision options must be selected:</p>
    <ol class="govuk-list govuk-list--number">
      <li>No provisions</li>
      <li>Manual TR1 form</li>
      <li>Details entered</li>
    </ol>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Applicant validation</h3>
    <p class="govuk-body">Applicant name must be present using the English alphabet. Applicant must not have a party
      type of <code class="x-govuk-code x-govuk-code--inline">UNKNOWN</code>.</p>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Borrower name validation</h3>
    <p class="govuk-body">Customer provided names must match the names in the charge deed. If the borrower is a
      registered proprietor, the customer provided names must match the register. If they do not then relevant
      evidence needs to be attached.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Borrower name validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">all-proprietors-matched-to-borrowers</code></td>
          <td class="govuk-table__cell govuk-table__cell">Can apply to one of the following:<ul>
              <li>There must be at least as many borrowers as there are proprietors. There can be more, but no fewer
              </li>
              <li>Where there has been a change of name and the register needs updating evidence must be provided.
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Borrower representation validation</h3>
    <p class="govuk-body">Representation is always required for the borrower role type.</p>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Borrower validation</h3>
    <p class="govuk-body">For a charge, borrower names must be present.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Borrower representation validation error types
      </caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">transaction-has-valid-borrower</code></td>
          <td class="govuk-table__cell govuk-table__cell">Subcharge transactions or charge transactions
            unaccompanied by a transfer transaction must have a borrower</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Charge amount validation</h3>
    <p class="govuk-body">Must be a positive number.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Charge amount validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">charge-must-have-non-negative-value</code></td>
          <td class="govuk-table__cell govuk-table__cell">Charge value must be non-negative</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Charge date validation</h3>
    <p class="govuk-body">Charge date must be present and not a date in the future. Customer provided date must
      match the date in the charge deed.</p>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Consideration type validation</h3>
    <p class="govuk-body">The request must contain the appropriate statement - Monetary Value, No Monetary Value, or
      Other. Monetary Value requires a value to be present.</p>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Conveyancers certificate validation</h3>
    <p class="govuk-body">Checks the <code
        class="x-govuk-code x-govuk-code--inline">conveyancers_certificate</code> field is set for any
      document of type <code class="x-govuk-code x-govuk-code--inline">CERT_REG_CH</code>.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Conveyancer certificate validation error types
      </caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">conveyancers-certificate-provided</code></td>
          <td class="govuk-table__cell govuk-table__cell">Conveyancers certificate was not provided for Certificate
            of registration issued by Companies House documents</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Customer type validation</h3>
    <p class="govuk-body">Customer type of conveyancer or non-conveyancer must be present.</p>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Declaration of trust validation</h3>
    <p class="govuk-body">The declaration of trust field must include one of the following options:</p>
    <ol class="govuk-list govuk-list--number">
      <li>Joint Tenants</li>
      <li>Tenants in Common</li>
      <li>Trust Details</li>
      <li>Form JO</li>
    </ol>
    <p class="govuk-body">For option three, details must be provided. For option four, HMLR form JO must be provided
      as an attachment.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Declaration of trust validation error types
      </caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">declaration-of-trust</code></td>
          <td class="govuk-table__cell govuk-table__cell"> The declaration of trust option must be provided for the
            application</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Disclosable overriding interests validation</h3>
    <p class="govuk-body">When <code
        class="x-govuk-code x-govuk-code--inline">disclosable_overriding_interests</code> is set to <code
        class="x-govuk-code x-govuk-code--inline">true</code> on any transaction, a <code
        class="x-govuk-code x-govuk-code--inline">FORM_DI</code> document must be provided with the
      application.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Disclosable overriding interests validation
        error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">di-form-required</code></td>
          <td class="govuk-table__cell govuk-table__cell">A Disclosable Overriding Interests (DI) Form is required
            but has not been provided</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Evidence of consent to restriction validation</h3>
    <p class="govuk-body">Evidence of consent to a restriction should be provided where required. If it is not
      provided, a requisition will be sent.</p>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Evidence of discharge validation</h3>
    <p class="govuk-body">If evidence of discharge is not provided and early completion cannot be applied, a
      requisition will be sent.</p>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Identity evidence validation</h3>
    <p class="govuk-body">An HMLR identity form must be provided for each unrepresented party when required - view
      <a class="govuk-body govuk-link"
        href="https://www.gov.uk/government/publications/evidence-of-identity-conveyancers/practice-guide-67-evidence-of-identity-conveyancers"
        rel="noreferrer noopener" target="_blank">Practice Guide 67 (opens in new tab)</a>.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Identity evidence validation error types
      </caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">identity-evidence-has-type</code></td>
          <td class="govuk-table__cell govuk-table__cell">One of the following options must be provided:
            <ol class="govuk-list govuk-list--number">
              <li>Evidence</li>
              <li>Verified</li>
              <li>Not required</li>
            </ol>
          </td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">required-identity-evidence-provided</code></td>
          <td class="govuk-table__cell govuk-table__cell">An HMLR identity form must be provided for each
            unrepresented party</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Identity type validation</h3>
    <p class="govuk-body">One of the following options must be selected:</p>
    <ol class="govuk-list govuk-list--number">
      <li>Lodging conveyancer</li>
      <li>Other conveyancer</li>
      <li>Not represented</li>
    </ol>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Lender address validation</h3>
    <p class="govuk-body">The lender address is not required if a valid MD reference is provided. If the charge does
      not have an MD reference, a full postal address for the lender is required.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Lender address validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">charge-has-valid-lender</code></td>
          <td class="govuk-table__cell govuk-table__cell">The lender has an invalid address for service when an MD
            reference was not provided</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Lender name validation</h3>
    <p class="govuk-body">The pre-approved MD reference included in the charge should be included in the
      application.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Lender name validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">unique-lender</code></td>
          <td class="govuk-table__cell govuk-table__cell">Each charge should only have one lender</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">lender-name-matches-records</code></td>
          <td class="govuk-table__cell govuk-table__cell">The lender name provided in the application data must
            match that recorded for the lender in our MD reference database</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">no-duplicate-lender-refs-on-charge</code></td>
          <td class="govuk-table__cell govuk-table__cell">Lender references must be unique</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Lender validation</h3>
    <p class="govuk-body">All charges require at least one party with the role type of lender. If there is no MD
      reference on the transaction, all lenders must have at least one address.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Lender validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">charge-has-valid-lender</code></td>
          <td class="govuk-table__cell govuk-table__cell">There are no lenders on the charge application</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Mandatory documents validation</h3>
    <p class="govuk-body">Validation will be applied for each transaction to ensure the rules regarding the
      Compulsory and Either document types have been satisfied correctly.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Mandatory documents validation error types
      </caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">all-mandatory-documents-provided</code></td>
          <td class="govuk-table__cell govuk-table__cell">Each transaction must have the mandatory deed or document
            provided</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">MD reference validation</h3>
    <p class="govuk-body">The MD reference included in the application must be in the right format, exist as a live
      MD reference and match the MD reference contained in the charge.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">MD reference validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">mdref-on-record</code></td>
          <td class="govuk-table__cell govuk-table__cell">The MD reference supplied cannot be found in our database
          </td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Property address validation</h3>
    <p class="govuk-body">The HMLR property description associated with customer supplied title number will be
      compared against the property description contained in the charge and/or transfer deeds.</p>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Proprietor address for service validation</h3>
    <p class="govuk-body">Proprietor address for service must be a valid postal address. The customer provided
      address will be validated.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Proprietor address for service validation error
        types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">address-for-service-option-is-valid</code></td>
          <td class="govuk-table__cell govuk-table__cell">The address for service option provided for the party is
            invalid</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Submission warning validation</h3>
    <p class="govuk-body">A legal declaration is made when submitting an application with regards dishonesty etc.
      The conveyancer must agree to comply with the warning.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Submission warning validation error types
      </caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">submission-warning-understood</code></td>
          <td class="govuk-table__cell govuk-table__cell">A legal declaration is made when submitting an application
            with regards dishonesty etc. The conveyancer must agree to comply with the warning</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Title number validation</h3>
    <p class="govuk-body">The title number in the application must be valid. The title number provided must also
      match with one of the attached deeds. For multi-title applications please provide each title once.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Title number validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">request-has-title-number</code></td>
          <td class="govuk-table__cell govuk-table__cell">At least one title number must be provided (including
            applications for New Lease, Lease Extension or Transfer of Part). In these circumstances, at least a
            lessor’s or vendor’s title will be required</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">request-has-title-number</code></td>
          <td class="govuk-table__cell govuk-table__cell">Title number not matched to HMLR systems</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">title-must-be-valid</code></td>
          <td class="govuk-table__cell govuk-table__cell">Can apply to one of the following:
            <ul class="govuk-list govuk-list--bullet">
              <li>For an application type of ‘Transfer of Part’, ‘Removal of default form A restriction’ or
                ‘Dispositionary first lease’, the title number must have a single valid district code</li>
              <li>An application type of ‘Transfer of Part’ or ‘Dispositionary first lease’ cannot be lodged against
                a title with an estate interest of ‘Affecting Franchise’ or ‘Relating Franchise’</li>
              <li>An application cannot be lodged against a caution title</li>
              <li>The title number must not be recorded as a closed title</li>
              <li>The title number must exist and not be recorded as a closed title, a scheme title, or a new title
                allocated to a new title dealing on Land Registry systems</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Title scope validation</h3>
    <p class="govuk-body">Application of whole or part must be provided for each title number within a transaction.
    </p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Title scope validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">title-scope-is-valid</code></td>
          <td class="govuk-table__cell govuk-table__cell">Can apply to one of the following:
            <ul class="govuk-list govuk-list--bullet">
              <li>Title scopes of ‘part’ must have a part description</li>
              <li>Title scopes of ‘whole’ must not have a part description</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Transaction priority validation</h3>
    <p class="govuk-body">Transactions are applied for in priority order, for example:</p>
    <ol class="govuk-list govuk-list--number">
      <li>Discharge</li>
      <li>Transfer</li>
      <li>Charge</li>
    </ol>
    <p class="govuk-body">Each must have a unique, consecutive number.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Transaction priority validation error types
      </caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">OCV_L1A_005</code></td>
          <td class="govuk-table__cell govuk-table__cell">Non unique transaction priorities were found</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Transfer amount validation</h3>
    <p class="govuk-body">Value must be provided, either as an exact value or a value band (where transfer is not
      for monetary value).</p>
    <p class="govuk-body">Error types for this validator will be provided at a later date.</p>
    <h3 class="govuk-heading-s">Transfer date validation</h3>
    <p class="govuk-body">The transfer date must match what is on the transfer deed to be correct.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Transfer date validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">transfer-date-not-in-future</code></td>
          <td class="govuk-table__cell govuk-table__cell">The date of the transfer must not be in the future</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Transferee validation</h3>
    <p class="govuk-body">The transferee name provided in the application must match the transferee name in the
      transfer deed. The proprietor address for service must be a valid postal address. The customer provided
      address will be validated. If overseas, the address must have a country.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Transferee validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">transfer-has-transferee</code></td>
          <td class="govuk-table__cell govuk-table__cell">A transfer involves a change of proprietor(s). If making
            an application for a transfer, there must be at least one transferee</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">transferee-has-valid-address</code></td>
          <td class="govuk-table__cell govuk-table__cell">At least one postal address must be provided in the
            application</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Transferor validation</h3>
    <p class="govuk-body">For a transfer, there must be at least one transferor name without the register action of
      <code class="x-govuk-code x-govuk-code--inline">REMOVE</code>.</p>
    <table class="govuk-table">
      <caption class="govuk-table__caption govuk-table__caption--s">Transferor validation error types</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Error type</th>
          <th scope="col" class="govuk-table__header">Description</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell govuk-table__cell"><code
              class="x-govuk-code x-govuk-code--inline">transfer-has-transferors</code></td>
          <td class="govuk-table__cell govuk-table__cell">A transfer involves a change of proprietor(s). If making
            an application for a transfer, there must be at least one transferor</td>
        </tr>
      </tbody>
    </table>
    <h3 class="govuk-heading-s">Value bands</h3>
    <p class="govuk-body">Value bands specify the approximate value of a property, or the equity being transferred,
      where the full value is not known. The value band fields can be found on the <code
        class="x-govuk-code x-govuk-code--inline">Transfer</code> and <code
        class="x-govuk-code x-govuk-code--inline">AmountDetails</code> objects in the API specification.</p>
    <p class="govuk-body">The valid value bands are as follows (in pounds):</p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">lower_band</code>: 0, <code
          class="x-govuk-code x-govuk-code--inline">upper_band</code>: 100,000</li>
      <li><code class="x-govuk-code x-govuk-code--inline">lower_band</code>: 100,001, <code
          class="x-govuk-code x-govuk-code--inline">upper_band</code>: 200,000</li>
      <li><code class="x-govuk-code x-govuk-code--inline">lower_band</code>: 200,001, <code
          class="x-govuk-code x-govuk-code--inline">upper_band</code>: 500,000</li>
      <li><code class="x-govuk-code x-govuk-code--inline">lower_band</code>: 500,001, <code
          class="x-govuk-code x-govuk-code--inline">upper_band</code>: 1,000,000</li>
      <li><code class="x-govuk-code x-govuk-code--inline">lower_band</code>: 1,000,001, <code
          class="x-govuk-code x-govuk-code--inline">upper_band</code>: <code
          class="x-govuk-code x-govuk-code--inline">null</code></li>
    </ul>
    <p class="govuk-body">Value bands are only applicable to the following transaction types:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li><code class="x-govuk-code x-govuk-code--inline">APT</code> - Appointment of new trustee</li>
      <li><code class="x-govuk-code x-govuk-code--inline">ASTT</code> - Assent</li>
      <li><code class="x-govuk-code x-govuk-code--inline">ASSTTP</code> - Assent (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TNV</code> - Transfer (not for value or reverse
        premium)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TNVTP</code> - Transfer (not for value or reverse
        premium) (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TOSNV</code> - Transfer of share (not for value or
        reverse premium)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TSCNVTP</code> - Transfer of share (not for value
        or reverse premium) (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TRM</code> - Transfer by operation of law on death
      </li>
      <li><code class="x-govuk-code x-govuk-code--inline">TSCNV</code> - Transfer subject to a charge (not
        for value or reverse premium)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">TSCNVTP</code> - Transfer subject to a charge (not
        for value or reverse premium) (Transfer of part)</li>
      <li><code class="x-govuk-code x-govuk-code--inline">VO</code> - Vesting order</li>
    </ul>
    <p class="govuk-body">There are several rules regarding value band usage:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Both <code class="x-govuk-code x-govuk-code--inline">value</code> (i.e. value of equity being
        transferred) and <code class="x-govuk-code x-govuk-code--inline">full_value_of_property</code> must
        be either value bands, or exact values</li>
      <li>The <code class="x-govuk-code x-govuk-code--inline">full_value_of_property_band</code> must be
        greater than or equal to the <code class="x-govuk-code x-govuk-code--inline">value_band</code> (i.e.
        the value of equity being transferred)</li>
    </ul>
    <div class="govuk-!-padding-bottom-6"></div>
    <div>
      <p class="govuk-body">Example:</p>
      <div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
"transactions": {
  "transaction-1": {
    "type": "TNV",
    "details": {
      "type": "transfer",
      "value_band": {
        "lower_value_band": 100001,
        "upper_value_band": 200000
      },
      "outstanding_charge": 0,
      "full_value_of_property_band": {
        "lower_value_band": 200001,
        "upper_value_band": 500000
      }
    },
    "title_numbers": [...]
  }
}
```
</div>
    <div class="govuk-!-padding-bottom-3"></div>
  </div>
  <h2 class="govuk-heading-m" id="example-requests-and-responses">Example requests and responses</h2>
  <div class="govuk-!-padding-bottom-3"></div>
  <h3 class="govuk-heading-s"><code>APPLICATION_ACCEPTED_ON_DAY_LIST</code> notification</h3>
  <div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": [
    {
      "notification_id": "7788bfb3-02f2-4c9b-be58-94e9df010ac8",
      "created_datetime": "2025-02-25T16:17:19.120585661Z",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/accepted-priority-protected.json",
      "notification_type": "APPLICATION_ACCEPTED_ON_DAY_LIST",
      "subject_type": "LAND_REGISTER_APPLICATION",
      "subject": "3d4b51cf-76ab-40ad-9b09-099323034adf",
      "event_datetime": "2025-02-20T09:06:29.120585661Z",
      "status": "NEW",
      "payload": {
        "data": {
          "status": "ACCEPTED_PRIORITY_PROTECTED",
          "priority": "2025-02-20T09:06:29.04",
          "hmlr_reference": "A123ABR"
        }
      }
    }
  ]
}
```
</div>
  <h3 class="govuk-heading-s"><code>APPLICATION_VALIDATION_FAILED</code> notification</h3>
  <div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": [
    {
      "notification_id": "7788bfb3-02f2-4c9b-be58-94e9df010ac8",
      "created_datetime": "2025-02-25T16:17:19.120585661Z",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/vcad/schemas/accepted-priority-protected.json",
      "notification_type": "APPLICATION_VALIDATION_FAILED",
      "subject_type": "LAND_REGISTER_APPLICATION",
      "subject": "3d4b51cf-76ab-40ad-9b09-099323034adf",
      "event_datetime": "2025-02-20T09:06:29.120585661Z",
      "status": "NEW",
      "payload": {
        "data": {
          "status": "VALIDATION_FAILED"
        }
      }
    }
  ]
}
```
</div>
  <h3 class="govuk-heading-s"><code>POST - /v0/applications</code> - Charge</h3>
  <div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
    "data": {
        "type": "REGISTER_UPDATE",
        "submission_warning_understood": true,
        "customer_reference": "MyApplication",
        "application_lodger": {
            "email": user@company.com,
            "telephone": "07000000000",
            "type": "CONVEYANCER"
        },
        "addresses": {
            "borrower-address-1": {
                "details": {
                    "type": "UK",
                    "number": "1",
                    "postcode": "AA1 00Z"
                }
            }
        },
        "applicants": [
            "borrower-1"
        ],
        "documents": {
            "mortgage-deed": {
                "document_id": "0001",
                "document_metadata": {
                    "certification_statement_type": "CERTIFIED",
                    "document_filename": "deed.pdf"
                },
                "type": "MRTG_DEED"
            }
        },
        "parties": {
            "borrower-1": {
                "address_for_service_option": "PROVIDED_ADDRESS",
                "addresses": [
                    "borrower-address-1"
                ],
                "details": {
                    "type": "PRIVATE_INDIVIDUAL",
                    "forenames": "Alice",
                    "surname": "Smith"
                },
                "identity_evidence_type": "NOT_REQUIRED",
                "representation_type": "LODGING_CONVEYANCER"
            },
            "lender-1": {
                "address_for_service_option": "NOT_REQUIRED",
                "identity_evidence_type": "NOT_REQUIRED",
                "details": {
                    "type": "UK_COMPANY",
                    "company_number": "543252345",
                    "organisation_name": "A. Bank"
                },
                "representation_type": "NOT_REPRESENTED"
            }
        },
        "titles": {
            "tn1": {
                "title_number": "TN001",
                "title_type": "REGISTER_TITLE",
                "disclosable_overriding_interests": false,
                "scope_details": {
                    "scope": "WHOLE"
                }
            }
        },
        "transactions": {
            "C1": {
                "type": "C",
                "fee_in_pence": 100,
                "priority": 1,
                "details": {
                    "type": "CHARGE",
                    "date": "2024-01-01",
                    "mdref": "MD00AA",
                    "value": 345000
                },
                "documents": [
                    "mortgage-deed"
                ],
                "party_roles": [
                    {
                        "capacity": "REGISTERED_PROPRIETOR",
                        "party_reference": "borrower-1",
                        "role": "BORROWER"
                    },
                    {
                        "capacity": "NOT_REQUIRED ",
                        "party_reference": "lender-1",
                        "role": "LENDER"
                    }
                ],
                "title_references": [
                    "tn1"
                ]
            }
        }
    }
}
```
</div>
  <h3 class="govuk-heading-s"><code>POST - /v0/applications</code> - Transfer</h3>
  <div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "submission_warning_understood": true,
    "customer_reference": "MyApplication",
    "type": "REGISTER_UPDATE",
    "application_lodger": {
      "email": user@company.com,
      "telephone": "07000000000",
      "type": "CONVEYANCER"
    },
    "applicants": [
      "transferor-1",
      "transferor-2"
    ],
    "addresses": {
      "transferor-address-1": {
        "details": {
          "type": "UK",
          "building_description": "1",
          "post_town": "Fake Town",
          "postcode": "AA1 00Z"
        }
      },
      "transferee-address-1": {
        "details": {
          "type": "UK",
          "building_description": "2",
          "post_town": "Fake Town",
          "postcode": "AA1 00Z"
        }
      }
    },
    "parties": {
      "transferor-1": {
        "reference": "transferor-1",
        "addresses": [
          "transferor-address-1"
        ],
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "Jane",
          "surname": "Doe"
        },
        "representation_type": "LODGING_CONVEYANCER",
        "address_for_service_option": "PROVIDED_ADDRESS"
      },
      "transferor-2": {
        "reference": "transferor-2",
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "John",
          "surname": "Doe"
        },
        "addresses": [
          "transferor-address-1"
        ],
        "representation_type": "LODGING_CONVEYANCER",
        "address_for_service_option": "PROVIDED_ADDRESS"
      },
      "transferee-1": {
        "reference": "transferee-1",
        "details": {
          "type": "OVERSEAS_COMPANY",
          "organisation_name": "OverseaComp Inc.",
          "incorporation_territory": "Europe under the Treaty on European Union and the Treaty on the Functioning of the European Union",
          "company_number": "123456"
        },
        "addresses": [
          "transferee-address-1"
        ],
        "representation_type": "NOT_REPRESENTED",
        "identity_evidence_type": "VERIFIED",
        "address_for_service_option": "PROVIDED_ADDRESS"
      },
      "lender-1": {
        "reference": "lender-1",
        "address_for_service_option": "NOT_REQUIRED",
        "identity_evidence_type": "NOT_REQUIRED",
        "representation_type": "NOT_REPRESENTED",
        "details": {
          "type": "UK_COMPANY",
          "company_number": "543252345",
          "organisation_name": "A. Bank"
        }
      }
    },
    "titles": {
      "tn1": {
        "title_number": "TN001",
        "title_type": "REGISTER_TITLE",
        "disclosable_overriding_interests": false,
        "scope_details": {
          "scope": "WHOLE"
        }
      },
      "tn2": {
        "title_number": "TN002",
        "title_type": "REGISTER_TITLE",
        "disclosable_overriding_interests": false,
        "scope_details": {
          "scope": "PART",
          "part_description": "The field on the north side of the property"
        }
      }
    },
    "transactions": {
      "dis": {
        "type": "DIS",
        "fee_in_pence": 0,
        "priority": 1,
        "details": {
          "type": "DISCHARGE",
          "discharge_submission_type": "ATTACHED"
        },
        "party_roles": [
          {
            "party_reference": "transferor-1",
            "role": "BORROWER",
            "capacity": "REGISTERED_PROPRIETOR"
          },
          {
            "party_reference": "transferor-2",
            "role": "BORROWER",
            "capacity": "REGISTERED_PROPRIETOR"
          }
        ],
        "title_references": [
          "tn1"
        ],
        "documents": [
          "discharge"
        ]
      },
      "transfer": {
        "type": "T",
        "fee_in_pence": 135,
        "priority": 2,
        "details": {
          "type": "TRANSFER",
          "additional_provisions_code": "MANUAL_TR1_FORM",
          "date": "2024-01-01",
          "value": 500000,
          "consideration_type": "MONETARY_VALUE",
          "consideration_description": "Value of 500000 including VAT",
          "title_guarantee_code": "FULL",
          "trust_declaration_type": "JOINT_TENANTS"
        },
        "party_roles": [
          {
            "party_reference": "transferor-1",
            "role": "TRANSFEROR",
            "capacity": "REGISTERED_PROPRIETOR"
          },
          {
            "party_reference": "transferor-2",
            "role": "TRANSFEROR",
            "capacity": "REGISTERED_PROPRIETOR"
          },
          {
            "party_reference": "transferee-1",
            "role": "TRANSFEREE",
            "capacity": "ENTITLED_REGISTERED_PROPRIETOR"
          }
        ],
        "title_references": [
          "tn1",
          "tn2"
        ],
        "documents": [
          "tr1",
          "identity-evidence"
        ]
      },
      "charge": {
        "type": "C",
        "fee_in_pence": 0,
        "priority": 3,
        "details": {
          "type": "CHARGE",
          "date": "2024-01-01",
          "mdref": "MD00AA",
          "value": 200000
        },
        "documents": [
          "mortgage-deed"
        ],
        "party_roles": [
          {
            "capacity": "REGISTERED_PROPRIETOR",
            "party_reference": "transferee-1",
            "role": "BORROWER"
          },
          {
            "capacity": "NOT_REQUIRED",
            "party_reference": "lender-1",
            "role": "LENDER"
          }
        ],
        "title_references": [
          "tn1",
          "tn2"
        ]
      }
    },
    "documents": {
      "tr1": {
        "type": "TR1",
        "document_id": "00001",
        "document_metadata": {
          "certification_statement_type": "CERTIFIED",
          "document_filename": "tr1.pdf"
        }
      },
      "identity-evidence": {
        "type": "EVIDENCE",
        "document_id": "00002",
        "document_metadata": {
          "certification_statement_type": "CERTIFIED_BY_ANOTHER",
          "document_filename": "evidence.pdf"
        }
      },
      "discharge": {
        "type": "DISCHARGE",
        "document_id": "00003",
        "document_metadata": {
          "certification_statement_type": "CERTIFIED",
          "document_filename": "discharge.pdf"
        }
      },
      "mortgage-deed": {
        "type": "MRTG_DEED",
        "document_id": "00004",
        "document_metadata": {
          "certification_statement_type": "CERTIFIED_BY_ANOTHER",
          "document_filename": "deed.pdf"
        }
      }
    }
  }
}
```
</div>
        <h3 class="govuk-heading-s"><code>POST - /v0/applications</code> - Transfer of Part</h3>
        <div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "type": "TRANSFER_OF_PART",
    "customer_reference": "tp-not-for-value",
    "submission_warning_understood": true,
    "application_lodger": {
      "email": user@company.com,
      "telephone": "07000000000",
      "type": "NON_CONVEYANCER"
    },
    "addresses": {
      "transferor-address-1": {
        "details": {
          "type": "UK",
          "building_description": "1",
          "post_town": "Fake Town",
          "postcode": "AA1 00Z"
        }
      },
      "transferee-address-1": {
        "details": {
          "type": "UK",
          "building_description": "2",
          "post_town": "Fake Town",
          "postcode": "AA1 00Z"
        }
      }
    },
    "applicants": [
      "transferor-1"
    ],
    "parties": {
      "transferor-1": {
        "addresses": [
          "transferor-address-1"
        ],
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "Jane",
          "surname": "Doe"
        },
        "representation_type": "LODGING_CONVEYANCER",
        "address_for_service_option": "PROVIDED_ADDRESS"
      },
      "transferee-1": {
        "addresses": [
          "transferee-address-1"
        ],
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "John",
          "surname": "Doe"
        },
        "representation_type": "OTHER_CONVEYANCER",
        "other_conveyancer": {
          "conveyancer_reference": "ABC123",
          "full_name": "Mike Ross",
          "registered_address": "1234 56th Street, New York, 10001"
        },
        "address_for_service_option": "PROVIDED_ADDRESS"
      }
    },
    "titles": {
      "tn1": {
        "title_number": "TN001",
        "title_type": "TRANSFEROR_TITLE",
        "disclosable_overriding_interests": false,
        "scope_details": {
          "scope": "PART",
          "part_description": "The field on the north side of the property"
        }
      }
    },
    "transactions": {
      "tnv": {
        "type": "TNVTP",
        "fee_in_pence": 45,
        "priority": 1,
        "details": {
          "type": "TRANSFER",
          "value_band": {
            "lower_value_band": 100001,
            "upper_value_band": 200000
          },
          "outstanding_charge": 0,
          "full_value_of_property_band": {
            "lower_value_band": 1000001
          },
          "date": "2024-01-01",
          "title_guarantee_code": "LIMITED",
          "consideration_type": "NO_MONETARY_VALUE",
          "additional_provisions_code": "NO_PROVISIONS"
        },
        "documents": [
          "tp-1"
        ],
        "party_roles": [
          {
            "party_reference": "transferor-1",
            "role": "TRANSFEROR",
            "capacity": "REGISTERED_PROPRIETOR"
          },
          {
            "party_reference": "transferee-1",
            "role": "TRANSFEREE",
            "capacity": "ENTITLED_REGISTERED_PROPRIETOR"
          }
        ],
        "title_references": [
          "tn1"
        ]
      }
    },
    "documents": {
      "tp-1": {
        "reference": "tp-1",
        "type": "TP1",
        "document_id": "00001",
        "document_metadata": {
          "certification_statement_type": "CERTIFIED_BY_ANOTHER",
          "document_filename": "tp1.gif"
        }
      }
    }
  }
}
```