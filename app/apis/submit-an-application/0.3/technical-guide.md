---
layout: guidance.njk

title: Submit an application API Technical guide
description: Use this service to provide data to HMLR for updating the register

eleventyNavigation:
    key: Submit an application API v0.3 technical guide
    parent: Submit an application API

notlive: true

versions:
  - value: "1.0"
    text: "v1.0 (latest)"
  - value: "0.3"
    text: "v0.3"
    selected: true
    
relatedAPIs:
  - text: Submit an application to change the Land Register
    href: /apis/submit-an-application-to-change-the-land-register 
  - text: Send a document
    href: /apis/send-a-document
  - text: Application information
    href: /apis/application-information
  - text: Notifications
    href: /apis/notifications
  - text: Download a document
    href: /apis/download-a-document
  - text: More
    href: /find-a-service-api
    classes: govuk-!-font-weight-bold

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
---
{% from "govuk/components/button/macro.njk" import govukButton %}
{% from "govuk/components/table/macro.njk" import govukTable %}
{% from "govuk/components/details/macro.njk" import govukDetails %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

<section id="how-to-use-the-submit-an-application-api">

## How to use the Submit an application API {.govuk-heading-m}

To submit an application request, make an HTTP POST request to the application request endpoint, the body of which contains the information about the application using the `application/json` content type.

This endpoint will return an object containing a unique ID for the request, `application_request_id`, which is then used when fetching the status of the application. Any errors in the schema will be rejected as a 400 HTTP error. Any other validation errors will be returned in the application information response.

### Notifications {.govuk-heading-s}

Note: For general information, view the [notifications API page](/apis/notifications).</p>

During application submission, notifications will be available from the notifications API about changes that happen to the application. These notifications currently include:

- `application.accepted-priority-protected` - the application has been accepted and is on the day list
- `application.accepted-priority-pending` - the application has been accepted and is queuing for the day list
- `application.validation-failed` - the application submission has failed
- `application.error` - the application has not been added to the day list due to an error
- `application.correspondence-despatched` - the application has had a correspondence raised against it
- `application.cancelled` - the application has been cancelled
- `application.completed` - the application has been completed

The notifications will contain the following information:

- `application.accepted-priority-protected`, `application.accepted-priority-pending` and `application.error` will contain the updated application status only
- `application.accepted-priority-protected` will contain updated application status, the priority of the application and the HMLR reference for the accepted application
- `application.correspondence-despatched`, `application.cancelled` and `application.completed` will contain a list of correspondence documents that can be downloaded using the [download a document API](/apis/download-a-document).

To get more detailed information about an application that caused the notification, use the [Application information API](/apis/application-information). For example, after receiving an `application.validation-failed` notification, use the Application information API to get a list of the validation errors.

### Schemas {.govuk-heading-s}

JSON schemas can be found below:

- [`application.accepted-priority-protected`](/schemas/v1/application/accepted-priority-protected.json)
- [`application.accepted-priority-pending`](/schemas/v1/application/accepted-awaiting-priority.json)
- [`application.validation-failed`](/schemas/v1/application/validation-error.json)
- [`application.error`](/schemas/v1/application/application-error.json)
- [`application.correspondence-despatched`](/schemas/v1/application/correspondence-despatched.json)
- [`application.cancelled`](/schemas/v1/application/cancelled.json)
- [`application.completed`](/schemas/v1/application/completed.json)
</section>

<section id="validation-rules">

## Validation rules {.govuk-heading-m}

To pass validation, you must follow the guidance for implementing this API below.

### SOAP migration guide {.govuk-heading-s}

The structure has changed between the SOAP and REST APIs. Most fields retain their existing names, but some have changed, as noted below:

{{ govukTable({
  head: [{ text: "SOAP field" }, { text: "REST field" }, { text: "Comment" }],
  rows: [
    [{ text: "AddressForService" }, { text: "full_address" }, { html: '' }],
    [{ text: "AP1WarningUnderstood" }, { text: "submission_warning_understood" }, { html: '' }],
    [{ text: "ApplicationAffectsContent" }, { text: "scope" }, { html: 'Field on <code class="app-code app-code--inline">TitleScopeDetails</code> object' }],
    [{ text: "ApplicationAffectsContent" }, { text: "scope" }, { html: 'Field on <code class="app-code app-code--inline">TitleScopeDetails</code> object' }],
    [{ text: "Applications" }, { text: "Transaction" }, { html: '' }],
    [{ text: "CareOfReference" }, { text: "" }, { text: "Care of reference should not be sent" }],
    [{ text: "CertifiedCopy" }, { text: "certification_statement_type" }, { html: 'Field on <code class="app-code app-code--inline">DocumentDetails.DocumentMetadata</code> object' }],
    [{ text: "ChargeDate" }, { text: "date" }, { html: 'Field on <code class="app-code app-code--inline">Charge</code> object' }],
    [{ text: "CompanyName" }, { text: "organisation_name" }, { html: 'Field on <code class="app-code app-code--inline">OverseasCompany</code>, <code class="app-code app-code--inline">UKCompany</code> and <code class="app-code app-code--inline">OtherOrganisation</code> objects' }],
    [{ text: "CertifiedCopy" }, { text: "certification_statement_type" }, { html: 'Field on <code class="app-code app-code--inline">DocumentDetails.DocumentMetadata</code> object' }],
    [{ text: "ChargeDate" }, { text: "date" }, { html: 'Field on <code class="app-code app-code--inline">Charge</code> object' }],
    [{ text: "CompanyName" }, { text: "organisation_name" }, { html: 'Field on <code class="app-code app-code--inline">OverseasCompany</code>, <code class="app-code app-code--inline">UKCompany</code> and <code class="app-code app-code--inline">OtherOrganisation</code> objects' }],
    [{ text: "CompanyRegistrationNumber" }, { text: "company_number" }, { html: '' }],
    [{ text: "ConveyancerName" }, { text: "full_name" }, { html: 'Field on <code class="app-code app-code--inline">OtherConveyancer</code> object' }],
    [{ text: "ConveyancerName" }, { text: "full_name" }, { html: 'Field on <code class="app-code app-code--inline">OtherConveyancer</code> object' }],
    [{ text: "Dealing" }, { text: "REGISTER_UPDATE type" }, { html: 'Service title type corresponds to the application type' }],
    [{ text: "DisclosableOveridingInterests" }, { text: "disclosable_overriding_interests" }, { html: 'Field on <code class="app-code app-code--inline">TitleDetails</code> object' }],
    [{ text: "DocumentNameContent" }, { text: "type" }, { html: 'Field on <code class="app-code app-code--inline">DocumentDetails</code> object' }],
    [{ text: "DXExchange" }, { text: "exchange_name" }, { html: 'Field on <code class="app-code app-code--inline">DxAddress</code> object' }],
    [{ text: "DXNumber" }, { text: "number" }, { html: 'Field on <code class="app-code app-code--inline">DxAddress</code> object' }],
    [{ text: "EmailAddress.Email" }, { text: "email" }, { html: 'Field on <code class="app-code app-code--inline">Address</code> object, where type is <code class="app-code app-code--inline">Email</code>' }],
    [{ text: "IsApplicant" }, { text: "applicants[]" }, { html: 'Array containing <code class="app-code app-code--inline">PartyReferences</code> for applicants' }],
    [{ text: "DisclosableOveridingInterests" }, { text: "disclosable_overriding_interests" }, { html: 'Field on <code class="app-code app-code--inline">TitleDetails</code> object' }],
    [{ text: "DocumentNameContent" }, { text: "type" }, { html: 'Field on <code class="app-code app-code--inline">DocumentDetails</code> object' }],
    [{ text: "DXExchange" }, { text: "exchange_name" }, { html: 'Field on <code class="app-code app-code--inline">DxAddress</code> object' }],
    [{ text: "DXNumber" }, { text: "number" }, { html: 'Field on <code class="app-code app-code--inline">DxAddress</code> object' }],
    [{ text: "EmailAddress.Email" }, { text: "email" }, { html: 'Field on <code class="app-code app-code--inline">Address</code> object, where type is <code class="app-code app-code--inline">Email</code>' }],
    [{ text: "IsApplicant" }, { text: "applicants[]" }, { html: 'Array containing <code class="app-code app-code--inline">PartyReferences</code> for applicants' }],
    [{ text: "LeaseExtension" }, { text: "DISPOSITIONARY_FIRST_LEASE" }, { html: 'Service title type corresponds to the application type' }],
    [{ text: "LesseeTitles" }, { text: "TENANT_TITLE" }, { html: '' }],
    [{ text: "LessorTitles" }, { text: "LANDLORD_TITLE" }, { html: '' }],
    [{ text: "LocalAuthority" }, { text: "" }, { html: 'Local authority should not be sent' }],
    [{ text: "MessageID" }, { text: "Idempotency-Key" }, { html: 'Idempotency-Key is a HTTP Header' }],
    [{ text: "NewLease" }, { text: "DISPOSITIONARY_FIRST_LEASE type" }, { html: 'Service title type corresponds to the application type' }],
    [{ text: "NoMDRef" }, { text: "" }, { html: 'If the MDref is not sent, it is assumed the MDRef is not known and lender information must be provided' }],
    [{ text: "OverseasTerritory" }, { text: "incorporation_territory" }, { html: '' }],
    [{ text: "PostalAddress" }, { text: "UKAddress" }, { html: 'A type on the <code class="app-code app-code--inline">Address</code> object' }],
    [{ text: "PostcodeOfProperty" }, { text: "postcode" }, { html: 'Field on <code class="app-code app-code--inline">UKAddress</code> object' }],
    [{ text: "Product.Email" }, { text: "email" }, { html: 'Field on <code class="app-code app-code--inline">ApplicationLodger</code> object' }],
    [{ text: "PostalAddress" }, { text: "UKAddress" }, { html: 'A type on the <code class="app-code app-code--inline">Address</code> object' }],
    [{ text: "PostcodeOfProperty" }, { text: "postcode" }, { html: 'Field on <code class="app-code app-code--inline">UKAddress</code> object' }],
    [{ text: "Product.Email" }, { text: "email" }, { html: 'Field on <code class="app-code app-code--inline">ApplicationLodger</code> object' }],
    [{ text: "Reference" }, { text: "customer_reference" }, { html: '' }],
    [{ text: "Reference" }, { text: "conveyancer_reference" }, { html: 'Field on <code class="app-code app-code--inline">OtherConveyancer</code> object' }],
    [{ text: "RoleType" }, { text: "Role" }, { html: 'Field on <code class="app-code app-code--inline">PartyRole</code> object' }],
    [{ text: "ServiceTitlesType" }, { text: "type" }, { html: 'Field on <code class="app-code app-code--inline">substantiveOrderV5Data</code> object' }],
    [{ text: "Reference" }, { text: "conveyancer_reference" }, { html: 'Field on <code class="app-code app-code--inline">OtherConveyancer</code> object' }],
    [{ text: "RoleType" }, { text: "Role" }, { html: 'Field on <code class="app-code app-code--inline">PartyRole</code> object' }],
    [{ text: "ServiceTitlesType" }, { text: "type" }, { html: 'Field on <code class="app-code app-code--inline">substantiveOrderV5Data</code> object' }],
    [{ text: "SortCode" }, { text: "" }, { html: 'Sort code should not be sent' }],
    [{ text: "TelephoneNumber" }, { text: "telephone" }, { html: 'Field on <code class="app-code app-code--inline">ApplicationLodger</code> object' }],
    [{ text: "TitleType" }, { text: "title_type" }, { html: 'Changed from an object containing a title number to a enum on the <code class="app-code app-code--inline">titleDetails</code> object</td>' }],
    [{ text: "TelephoneNumber" }, { text: "telephone" }, { html: 'Field on <code class="app-code app-code--inline">ApplicationLodger</code> object' }],
    [{ text: "TitleType" }, { text: "title_type" }, { html: 'Changed from an object containing a title number to a enum on the <code class="app-code app-code--inline">titleDetails</code> object</td>' }],
    [{ text: "TransferOfPart" }, { text: "TRANSFER_OF_PART type" }, { html: 'Service title type corresponds to the application type' }],
    [{ text: "UK-LLPRegistrationNumber" }, { text: "company_number" }, { html: '' }]
  ]
}) }}

### List of valid territories {.govuk-heaidng-s}

When a party is an overseas company, you must provide the territory of incorporation. This territory must be one of the territories defined below:

{{ govukDetails({
  summaryText: "Valid territories",
  html: "<ul class=\"govuk-list govuk-list--bullet\">
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
</ul>"
}) }}

### Transaction and document types {.govuk-heading-s}

The application submission API accepts several transaction and document types that describe the desired outcome of the application. These types are defined in the schema in their shortened form, but full definitions of each type can be viewed below:

{% call govukDetails({summaryText: "Transaction types"}) %}
{{ govukTable({
  caption: "Transaction types",
  captionClasses: "govuk-table__caption--m",
  head: [{ text: "Code" }, { text: "Description" }],
  rows: [
    [{ text: "ADV1" }, { text: "First notice of adverse possession" }],
    [{ text: "ADV2" }, { text: "Adverse possession: notification" }],
    [{ text: "AGN" }, { text: "Agreed notice (AN1)" }],
    [{ text: "AML" }, { text: "Amalgamation " }],
    [{ text: "APLC" }, { text: "Appointment of liquidator (creditor’s voluntary winding up)" }],
    [{ text: "APLCO" }, { text: "Appointment of liquidator (compulsory winding up)" }],
    [{ text: "APLM" }, { text: "Appointment of liquidator (members’ voluntary winding up)" }],
    [{ text: "APR" }, { text: "Apportionment of rent" }],
    [{ text: "APT" }, { text: "Appointment of new trustee" }],
    [{ text: "ARC" }, { text: "Apportionment of rent charge" }],
    [{ text: "ASSTTP" }, { text: "Assent (Transfer of Part)" }],
    [{ text: "ASTC" }, { text: "Assent of charge" }],
    [{ text: "ASTT" }, { text: "Assent" }],
    [{ text: "ATP" }, { text: "Amendment to title plan" }],
    [{ text: "ATR" }, { text: "Rule 130 Alteration of Title Register" }],
    [{ text: "AUN" }, { text: "Amendment of unilateral notice (UN3)" }],
    [{ text: "BKN" }, { text: "Bankruptcy notice/Creditors’ notice" }],
    [{ text: "BKR" }, { text: "Bankruptcy restriction/Bankruptcy inhibition" }],
    [{ text: "C" }, { text: "Charge" }],
    [{ text: "CAG" }, { text: "Cancellation of notice (not unilateral) (CN1)" }],
    [{ text: "CANI" }, { text: "Cancellation of inhibition (RX3)" }],
    [{ text: "CANR" }, { text: "Cancellation of restriction (RX3)" }],
    [{ text: "CANU" }, { text: "Cancellation of unilateral notice (UN4)" }],
    [{ text: "CBKN" }, { text: "Cancellation of bankruptcy notice" }],
    [{ text: "CBKR" }, { text: "Cancellation of bankruptcy restriction" }],
    [{ text: "CCT" }, { text: "Cancellation of a caution (CCD)" }],
    [{ text: "CH2" }, { text: "Obligation to make further advances (CH2)" }],
    [{ text: "CH3" }, { text: "Agreed maximum amount of security (CH3)" }],
    [{ text: "CHOA" }, { text: "Charging order - Agreed notice (AN1)" }],
    [{ text: "CHOU" }, { text: "Charging order - Unilateral notice (UN1)" }],
    [{ text: "CHR" }, { text: "Cancellation of home rights (HR4)" }],
    [{ text: "CN" }, { text: "Change of name" }],
    [{ text: "CNC" }, { text: "Change of name - chargee" }],
    [{ text: "CNL" }, { text: "Cancellation of an unregistered noted lease (CN1)" }],
    [{ text: "COA" }, { text: "Change of address for service" }],
    [{ text: "COAC" }, { text: "Change of address for service - chargee" }],
    [{ text: "CON" }, { text: "Consolidation of charge" }],
    [{ text: "COP" }, { text: "Charge of part" }],
    [{ text: "CPD" }, { text: "Change of property description" }],
    [{ text: "CPVK" }, { text: "Compulsory purchase (property value known)" }],
    [{ text: "CPVU" }, { text: "Compulsory purchase (property value unknown)" }],
    [{ text: "CTD" }, { text: "Commonhold transitional dealing" }],
    [{ text: "CUR" }, { text: "Cancellation of notice of unregistered Rentcharge" }],
    [{ text: "DB" }, { text: "Determined boundary (DB)" }],
    [{ text: "DCLN" }, { text: "Disclaimer - notification" }],
    [{ text: "DCLV" }, { text: "Disclaimer - notice" }],
    [{ text: "DEB" }, { text: "Debenture" }],
    [{ text: "DFL1" }, { text: "New lease - other" }],
    [{ text: "DFL3" }, { text: "New lease - shared ownership" }],
    [{ text: "DFL4" }, { text: "New lease - right to buy or right to acquire" }],
    [{ text: "DFL5" }, { text: "Dispositionary first lease extension of a term" }],
    [{ text: "DFT" }, { text: "Defect in title s64(1) LRA 2002" }],
    [{ text: "DIS" }, { text: "Discharge of charge" }],
    [{ text: "DJP" }, { text: "Death of a joint proprietor" }],
    [{ text: "DL" }, { text: "Discontinuous lease - non-timeshare" }],
    [{ text: "DMR" }, { text: "Disapplication of restriction (RX2)" }],
    [{ text: "DOG" }, { text: "Deed of grant of easement" }],
    [{ text: "DP" }, { text: "Discharge of part" }],
    [{ text: "DSP" }, { text: "Death of a sole proprietor" }],
    [{ text: "DSS" }, { text: "Deed of substituted security" }],
    [{ text: "DTL" }, { text: "Discontinuous lease - timeshare" }],
    [{ text: "EX1" }, { text: "Exempt information document registration" }],
    [{ text: "EX3" }, { text: "Remove emption of document registration" }],
    [{ text: "EXR" }, { text: "Extinguishment of rentcharge" }],
    [{ text: "HR" }, { text: "Notice of home rights (HR1)" }],
    [{ text: "JP1" }, { text: "Removal of default Form A restriction" }],
    [{ text: "LCATCO" }, { text: "Lease closure - of assured tenancies following court order" }],
    [{ text: "LCBD" }, { text: "Lease closure - by disclaimer" }],
    [{ text: "LCBET" }, { text: "Lease closure - by effluxion of time" }],
    [{ text: "LCBN" }, { text: "Lease closure - by notice" }],
    [{ text: "LCF" }, { text: "Lease closure - forfeiture" }],
    [{ text: "LCMRE" }, { text: "Lease closure - merger with reversionary estate" }],
    [{ text: "LCOE" }, { text: "Lease closure - on enlargement" }],
    [{ text: "LCOF" }, { text: "Lease closure - on frustration" }],
    [{ text: "LCSD" }, { text: "Lease closure - surrender by deed (not for value or reverse premium)" }],
    [{ text: "LCSDM" }, { text: "Lease closure - surrender by deed" }],
    [{ text: "LCSDWT" }, { text: "Lease closure - surrender by deed with a transfer (not for value or reverse premium)" }],
    [{ text: "LCSDMWT" }, { text: "Lease closure - surrender by deed (together with transfer)" }],
    [{ text: "LCSOL" }, { text: "Lease closure - surrender by operation of law (not for value or reverse premium)" }],
    [{ text: "LCSOLM" }, { text: "Lease closure - surrender by operation of law" }],
    [{ text: "MDR" }, { text: "Modification of Restriction" }],
    [{ text: "NCT" }, { text: "Caution amendment, new cautioner" }],
    [{ text: "NDC" }, { text: "Notification of dissolution of company" }],
    [{ text: "NFR" }, { text: "Noting of an affecting franchise" }],
    [{ text: "NOE" }, { text: "Noting an easement" }],
    [{ text: "NOL" }, { text: "Noting a lease" }],
    [{ text: "NOPSC" }, { text: "Note overriding priority of a statutory charge" }],
    [{ text: "NPR" }, { text: "Noting of a profit" }],
    [{ text: "NRT" }, { text: "Notice of rentcharge" }],
    [{ text: "PC" }, { text: "Postponement of charge" }],
    [{ text: "PER" }, { text: "Personal covenants" }],
    [{ text: "PRO" }, { text: "Provisions" }],
    [{ text: "RC" }, { text: "Restrictive covenants - entry of" }],
    [{ text: "RE" }, { text: "Register Easement" }],
    [{ text: "RFN" }, { text: "Deed of rectification" }],
    [{ text: "RHR" }, { text: "Renewal of home rights (HR2)" }],
    [{ text: "ROCA" }, { text: "Release of covenants - agreed notice (AN1)" }],
    [{ text: "ROCC" }, { text: "Release of covenants - cancellation (CN1)" }],
    [{ text: "ROCU" }, { text: "Release of covenants - unilateral notice (UN1)" }],
    [{ text: "RNT" }, { text: "Overriding lease granted under s.19, Landlord & Tenant (Covenants) Act 1995" }],
    [{ text: "ROE" }, { text: "Release of easements" }],
    [{ text: "RRC" }, { text: "Registration of rent charge" }],
    [{ text: "RRD" }, { text: "Removal of a right to determine" }],
    [{ text: "RTM" }, { text: "Acquisition of right to manage" }],
    [{ text: "RUN" }, { text: "Removal of unilateral notice (UN2)" }],
    [{ text: "RXL" }, { text: "Form ll restriction entered - simple request" }],
    [{ text: "RXN" }, { text: "Restriction (non-standard wording) (RX1)" }],
    [{ text: "RXS" }, { text: "Restriction (standard wording) (RX1)" }],
    [{ text: "SBC" }, { text: "Sub charge" }],
    [{ text: "SHO" }, { text: "Shared ownership - additional share" }],
    [{ text: "SJT" }, { text: "Severance of joint tenancy (SEV, RX1)" }],
    [{ text: "SOT" }, { text: "Subdivision of title" }],
    [{ text: "STVC" }, { text: "Statutory vestings charge" }],
    [{ text: "STVL" }, { text: "Statutory vestings land" }],
    [{ text: "T" }, { text: "Transfer for value" }],
    [{ text: "TNV" }, { text: "Transfer (not for value or reverse premium)" }],
    [{ text: "TNVTP" }, { text: "Transfer (not for value or reverse premium) (Transfer of part)" }],
    [{ text: "TOC" }, { text: "Transfer of charge" }],
    [{ text: "TOSNV" }, { text: "Transfer of share (not for value or reverse premium)" }],
    [{ text: "TOSNVTP" }, { text: "Transfer of share (not for value or reverse premium) (Transfer of part)" }],
    [{ text: "TOSTP" }, { text: "Transfer of share for value (Transfer of part)" }],
    [{ text: "TOSV" }, { text: "Transfer of share for value" }],
    [{ text: "TPS" }, { text: "Transfer under power of sale" }],
    [{ text: "TPSTP" }, { text: "Transfer under power of sale (Transfer of part)" }],
    [{ text: "TRC" }, { text: "Termination of commonhold" }],
    [{ text: "TRM" }, { text: "Transfer by operation of law on death" }],
    [{ text: "TSCNV" }, { text: "Transfer subject to a charge (not for value or reverse premium)" }],
    [{ text: "TSCNVTP" }, { text: "Transfer subject to a charge (not for value or reverse premium) (Transfer of part)" }],
    [{ text: "TSCTP" }, { text: "Transfer subject to a charge for value (Transfer of part)" }],
    [{ text: "TSCV" }, { text: " Transfer subject to a charge for value (Transfer of part)" }],
    [{ text: "TTP" }, { text: "Transfer for value (Transfer of part)" }],
    [{ text: "TVR" }, { text: "Transfer for value RTB/RTA" }],
    [{ text: "TVRTP" }, { text: "Transfer for value RTB/RTA (Transfer of part)" }],
    [{ text: "UNN" }, { text: "Unilateral notice (UN1)" }],
    [{ text: "UPT" }, { text: "Upgrade class of title (UT1)" }],
    [{ text: "VC" }, { text: "Variation of charge" }],
    [{ text: "VLAN" }, { text: "Variation of lease - agreed notice (AN1)" }],
    [{ text: "VLAP" }, { text: "Deed of variation of a lease - not increasing the term of or adding new land to the extent demised" }],
    [{ text: "VLUN" }, { text: "Variation of lease - unilateral notice (UN1)" }],
    [{ text: "VO" }, { text: "Vesting order" }],
    [{ text: "VOC" }, { text: "Variation of covenants" }],
    [{ text: "VOCA" }, { text: "Variation of covenants - agreed notice (AN1)" }],
    [{ text: "VOCU" }, { text: "Variation of covenants - unilateral notice (UN1)" }],
    [{ text: "VOE" }, { text: "Variation of easements" }],
    [{ text: "VOEA" }, { text: "Variation of easements - agreed notice (AN1)" }],
    [{ text: "VOEU" }, { text: "Variation of easements - unilateral notice (UN1)" }],
    [{ text: "VRC" }, { text: "Variation of rent charge" }],
    [{ text: "WCT" }, { text: "Withdrawal of caution" }],
    [{ text: "WDR" }, { text: "Withdraw a restriction (RX4)" }]
  ]})
}}
{% endcall %}

{% call govukDetails({summaryText: "Document types"}) %}
{{ govukTable({
  caption: "Document types",
  captionClasses: "govuk-table__caption--m",
  head: [{ text: "Code" }, { text: "Description" }],
  rows: [
    [{ text: "ABSTRACT" }, { text: "Abstract" }],
    [{ text: "ACKAPU" }, { text: "Adjudicator’s Letter Confirming a Court’s Decision (ACKAPU)" }],
    [{ text: "ADJAR" }, { text: "Adjudicator’s Letter of Refusal (ADJAR)" }],
    [{ text: "ADJREVU" }, { text: "Adjudicator’s Letter of Confirmation (ADJREVU)" }],
    [{ text: "ADMIN_LTRS" }, { text: "Letters of Administration" }],
    [{ text: "ADV1" }, { text: "Adverse possession: registration (ADV1)" }],
    [{ text: "ADV2" }, { text: "Adverse possession: notification (ADV2)" }],
    [{ text: "AGREEMENT" }, { text: "Agreement" }],
    [{ text: "AMS1" }, { text: "Application to use Application Management Service (AMS1)" }],
    [{ text: "AN1" }, { text: "AN1 Agreed notice" }],
    [{ text: "AP1" }, { text: "AP1 Application to change the register" }],
    [{ text: "APPL_FRM" }, { text: "Application Form" }],
    [{ text: "APPOINTMENT_OF_TRUSTEE" }, { text: "Deed of Appointment of New Trustee" }],
    [{ text: "AS1" }, { text: "AS1 registered title(s): assent of whole" }],
    [{ text: "AS2" }, { text: "AS2: Assent of Charge" }],
    [{ text: "AS3" }, { text: "AS3 Assent of Part" }],
    [{ text: "ASSENT" }, { text: "Assent" }],
    [{ text: "ASSIGNMENT" }, { text: "Assignment" }],
    [{ text: "BIRTH_CERT" }, { text: "Birth Certificate" }],
    [{ text: "BOUND_PLAN" }, { text: "Determined Boundary Plan" }],
    [{ text: "CC" }, { text: "CC" }],
    [{ text: "CCD" }, { text: "CCD Cancel caution against dealings" }],
    [{ text: "CERT_CON_CH" }, { text: "Original or certified copy of the certificate of incorporation of change of name issued by Companies House" }],
    [{ text: "CERT_DEATH" }, { text: "Certificate of Presumed Death" }],
    [{ text: "CERT_REG_CH" }, { text: "Certificate of registration issued by Companies House" }],
    [{ text: "CERT_RED_EX" }, { text: "Correctly certified and redacted exempt information document" }],
    [{ text: "CERT_S89" }, { text: "Certificate of Filing to Comply with s. 89 of the Insolvency Act 1987" }],
    [{ text: "CH1" }, { text: "CH1 Legal charge (mortgage) of a registered estate" }],
    [{ text: "CH2" }, { text: "CH2 Obligation to make further advances" }],
    [{ text: "CH3" }, { text: "CH3 Note agreed maximum amount of security" }],
    [{ text: "CHARGE" }, { text: "Charge" }],
    [{ text: "CHARG_ORD" }, { text: "Charging Order" }],
    [{ text: "CIVIL_CERT" }, { text: "Marriage/civil partnership certificate" }],
    [{ text: "CM2" }, { text: "Commonhold land: registered freehold termination (CM2)" }],
    [{ text: "CM5" }, { text: "Commonhold land: termination (CM5)" }],
    [{ text: "CM6" }, { text: "Commonhold successor: registration (CM6)" }],
    [{ text: "CN1" }, { text: "CN1 Cancel notice" }],
    [{ text: "CNFRM_DTMN_LTA_LGHA" }, { text: "Confirmation of determination of lease in accordance with the LTA 1954 or the LGHA 1989" }],
    [{ text: "CNFRM_NO_DEED_SUR" }, { text: "Confirmation that no deed of surrender has been entered into" }],
    [{ text: "CNFRM_NO_LTA_LGHA" }, { text: "Confirmation that neither the LTA 1954 nor the LGHA 1989 affect the lease" }],
    [{ text: "CNSNT_ADMIN_COURT" }, { text: "Consent of the administrator or the court (if lessee is in administration)" }],
    [{ text: "COMP_DOC" }, { text: "Company Documentation" }],
    [{ text: "CONSENT" }, { text: "Consent" }],
    [{ text: "CONST_COMP" }, { text: "Document(s) constituting the company" }],
    [{ text: "CONTR_RES" }, { text: "Contributory’s resolution appointing the liquidator" }],
    [{ text: "CONV_CERT" }, { text: "Conveyancer’s Certificate" }],
    [{ text: "CONV_CERT_DEATH" }, { text: "Conveyancer’s Certificate of the fact of death" }],
    [{ text: "CONVEYANCE" }, { text: "Conveyance" }],
    [{ text: "COR_CERT" }, { text: "Coroner’s Certificate" }],
    [{ text: "CORRES" }, { text: "Correspondence" }],
    [{ text: "COSR" }, { text: "Company search result" }],
    [{ text: "COURT_ORD" }, { text: "Court Order" }],
    [{ text: "CRALIQ" }, { text: "Company resolution appointing the liquidator" }],
    [{ text: "CRED_DEC" }, { text: "Creditor’s decision notice" }],
    [{ text: "CRED_RES" }, { text: "Creditor’s resolution appointing the liquidator" }],
    [{ text: "CRT_FORM_7" }, { text: "Certificate in Form 7" }],
    [{ text: "CRWALIQ" }, { text: "Company resolution that it be wound up and appointing the liquidator" }],
    [{ text: "DB" }, { text: "DB Determine the exact line of a boundary" }],
    [{ text: "DEATH_CERT" }, { text: "Death Certificate" }],
    [{ text: "DEC_AB_NULL_MARR" }, { text: "Decree absolute or nullity of marriage" }],
    [{ text: "DEED" }, { text: "Deed" }],
    [{ text: "DEED_POLL" }, { text: "Deed poll" }],
    [{ text: "DEED_REG_DIS" }, { text: "Deed which is a registrable disposition" }],
    [{ text: "DEED_SUR" }, { text: "Deed of Surrender" }],
    [{ text: "DISCHARGE" }, { text: "Discharge" }],
    [{ text: "DJP" }, { text: "DJP Death of joint proprietor" }],
    [{ text: "DL" }, { text: "Document List" }],
    [{ text: "DOP" }, { text: "Deed of postponement" }],
    [{ text: "DRIVING_LICENCE" }, { text: "Driving licence" }],
    [{ text: "DS1" }, { text: "DS1" }],
    [{ text: "DS2" }, { text: "DS2 Cancel entries relating to registered charge" }],
    [{ text: "DS3" }, { text: "DS3 Release of Part of the Land from a registered charge" }],
    [{ text: "DS3_SHORT" }, { text: "DS3" }],
    [{ text: "EOB" }, { text: "Evidence of bankruptcy" }],
    [{ text: "EOL" }, { text: "Evidence of liquidation" }],
    [{ text: "EVD_NO_RENEW" }, { text: "Evidence that any option to renew has not been, and cannot be, exercised" }],
    [{ text: "EVIDENCE" }, { text: "Evidence" }],
    [{ text: "EV_OV_NAME_CHANGE" }, { text: "Evidence of an overseas company name change" }],
    [{ text: "EX1" }, { text: "EX1 Exempt information document" }],
    [{ text: "EX1A" }, { text: "EX1A" }],
    [{ text: "EX3" }, { text: "EX3 Remove exemption of document" }],
    [{ text: "FORM_600" }, { text: "Companies House Form 600" }],
    [{ text: "FORM_600CH" }, { text: "Companies House Form 600CH" }],
    [{ text: "FORM_DI" }, { text: "Form DI" }],
    [{ text: "FORM_JO" }, { text: "Form JO (Trust Information)" }],
    [{ text: "FR1" }, { text: "FR1 Application for First Registration" }],
    [{ text: "GENDER_CERT" }, { text: "Gender recognition certificate" }],
    [{ text: "GVD" }, { text: "General vesting declaration" }],
    [{ text: "HR1" }, { text: "HR1 Notice of home rights" }],
    [{ text: "HR2" }, { text: "HR2 Renew notice of home rights" }],
    [{ text: "HR4" }, { text: "HR4 Cancel notice of home rights" }],
    [{ text: "ID1" }, { text: "ID1 - Verify identity: citizen" }],
    [{ text: "ID2" }, { text: "ID2 - Verify identity: body corporate" }],
    [{ text: "ID3" }, { text: "ID3 - Certificate of identity for a private individual" }],
    [{ text: "ID4" }, { text: "ID4 - Certificate of identity for a body corporate" }],
    [{ text: "ID5" }, { text: "ID5 - Certificate to be given by a conveyancer where a person’s identity has been verified by way of an online video call" }],
    [{ text: "ID_EV" }, { text: "Identity Evidence" }],
    [{ text: "ID_FRM" }, { text: "Identity Form" }],
    [{ text: "INDENTURE" }, { text: "Indenture" }],
    [{ text: "JP1" }, { text: "JP1 Letter" }],
    [{ text: "K17_OR_K18" }, { text: "Land Charge Search in Form K17 or K18" }],
    [{ text: "K20" }, { text: "Certificate of Cancellation of Bankruptcy Notice in Form K20" }],
    [{ text: "K22" }, { text: "Acknowledgement of Application for Cancellation of Bankruptcy Notice in Form K22" }],
    [{ text: "K3" }, { text: "HMLR Form K3" }],
    [{ text: "K4" }, { text: "HMLR Form K4" }],
    [{ text: "LEASE" }, { text: "Lease" }],
    [{ text: "LICENCE" }, { text: "Licence" }],
    [{ text: "LIQ01" }, { text: "Companies House Form LIQ01" }],
    [{ text: "LIQ_CERT_1" }, { text: "Liquidator’s certificate confirming liquidator’s appointment or that no resolution was passed nominating one" }],
    [{ text: "LIQ_CERT_2" }, { text: "Liquidator’s certificate that a meeting was held in accordance with s. 98(1) of the Insolvency Act 1986" }],
    [{ text: "LIQ_CERT_3" }, { text: "Liquidator’s certificate that appointment confirmed by a creditor’s qualifying decision procedure" }],
    [{ text: "LNDLD_CNSNT" }, { text: "Landlord’s consent" }],
    [{ text: "LONP" }, { text: "Letter or notice of postponement" }],
    [{ text: "LR_CORRES" }, { text: "LR Correspondence should only be used for copies of correspondence sent by HMLR" }],
    [{ text: "LTT" }, { text: "Land Transaction Tax" }],
    [{ text: "MARR_CERT" }, { text: "Marriage Certificate" }],
    [{ text: "MEMO" }, { text: "Memorandum" }],
    [{ text: "MORD" }, { text: "Ministerial order" }],
    [{ text: "MRTG_DEED" }, { text: "Mortgage Deed" }],
    [{ text: "NOD" }, { text: "Notice of disclaimer" }],
    [{ text: "ORD_DISS_NULL_CP" }, { text: "Order of dissolution or nullity of civil partnership" }],
    [{ text: "PASSPORT" }, { text: "Passport" }],
    [{ text: "PLAN" }, { text: "Plan" }],
    [{ text: "POA" }, { text: "Power of Attorney" }],
    [{ text: "PROBATE" }, { text: "Probate" }],
    [{ text: "PSS1" }, { text: "Application to use Pre-submission Enquiry Service (PSS1)" }],
    [{ text: "REVERS_INT" }, { text: "Examined Abstract of Reversionary Interest(s)" }],
    [{ text: "RN" }, { text: "Receipted Notice" }],
    [{ text: "RX1" }, { text: "RX1 Restriction" }],
    [{ text: "RX2" }, { text: "RX2 Disapply or modify restriction" }],
    [{ text: "RX3" }, { text: "RX3 Cancel restriction" }],
    [{ text: "RX4" }, { text: "RX4 Withdraw restriction" }],
    [{ text: "RXC" }, { text: "RXC Restriction: consent or certificate" }],
    [{ text: "SC" }, { text: "SC Note overriding priority of statutory charge" }],
    [{ text: "SDLT" }, { text: "Stamp Duty Land Tax" }],
    [{ text: "SEV" }, { text: "SEV Severance of Joint Tenancy" }],
    [{ text: "SHRF_RTN" }, { text: "Sheriff’s Return" }],
    [{ text: "SIDE_LTR" }, { text: "Side Letter" }],
    [{ text: "SOT" }, { text: "Statement Of Truth" }],
    [{ text: "SSALIQ" }, { text: "Appointment of Liquidator by The Secretary of State" }],
    [{ text: "STAT_DEC" }, { text: "Statutory Declaration" }],
    [{ text: "SUB_CHARGE" }, { text: "Sub Charge" }],
    [{ text: "TP1" }, { text: "TP1 Transfer of part of registered title(s)" }],
    [{ text: "TP2" }, { text: "TP2 Transfer of part under power of sale" }],
    [{ text: "TR1" }, { text: "TR1 Registered title(s): whole transfer" }],
    [{ text: "TR2" }, { text: "TR2 Registered title(s) under power of sale: whole transfer" }],
    [{ text: "TR4" }, { text: "TR4" }],
    [{ text: "TRANSFER" }, { text: "Transfer" }],
    [{ text: "TRUSTEE_RESOLUTION" }, { text: "Trustee resolution" }],
    [{ text: "UN1" }, { text: "UN1 Unilateral notice" }],
    [{ text: "UN2" }, { text: "UN2 Remove unilateral notice" }],
    [{ text: "UN3" }, { text: "UN3 Beneficiary of an existing unilateral notice" }],
    [{ text: "UN4" }, { text: "UN4 Cancel unilateral notice" }],
    [{ text: "UT1" }, { text: "UT1 Upgrade of title" }],
    [{ text: "VAR_CHARGE" }, { text: "Deed of Variation of Charge" }],
    [{ text: "VAR_COV" }, { text: "Deed of Variation of Covenants" }],
    [{ text: "VAR_EAS" }, { text: "Deed of Variation of Easements" }],
    [{ text: "VAR_LEASE" }, { text: "Deed of Variation of Lease" }],
    [{ text: "VESTING_ORDER" }, { text: "Vesting order" }],
    [{ text: "WCT" }, { text: "WCT Withdraw caution" }],
    [{ text: "WINDING_UP" }, { text: "Winding up order" }],
    [{ text: "WIT_STATE" }, { text: "Witness Statement" }]
  ]})
}}
{% endcall %}

As well as the definition of each transaction/document, we have also provided a mapping, showing the required documents for each transaction type. There are three categories of documents that can be uploaded for a transaction:

- **Compulsory** - this document is required for the transaction type
- **Either** - at least one of the documents marked as Either must be submitted with the transaction
- **Suggested** - these documents are not required, but are commonly attached alongside the transaction

For example, for an `ADV1` transaction type, the following documents need to be uploaded:

- An `ADV1` document must be uploaded
- At least one of an `SOT` or `STAT_DEC` document must be uploaded
- `COSR`, `EVIDENCE`, `PLAN` and `POA` documents are not required, but may help when processing your application

During application submission, validation will be applied for each transaction to ensure the rules regarding the Compulsory and Either document types have been satisfied correctly:

{% call govukDetails({summaryText: "Transaction/document mapping"}) %}
{{ govukTable({
  caption: "Transaction/document mapping",
  captionClasses: "govuk-table__caption--m",
  head: [{ text: "Transaction type code" }, { text: "Document type code" }, { text: "Document class code" }],
  rows: [
    [{ text: "ADV1" }, { text: "ADV1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "SOT" }, { text: "Either" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Either" }],
    [{ text: "" }, { text: "COSR" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "ADV2" }, { text: "ADV2" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "AGN" }, { text: "AN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CHARGE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CHARG_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SOT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "TRANSFER" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEED" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "AML" }, { text: "CORRES" }, { text: "Suggested" }],
    [{ text: "APLC" }, { text: "CRWALIQ" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_600" }, { text: "Either" }],
    [{ text: "" }, { text: "FORM_600CH" }, { text: "Either" }],
    [{ text: "" }, { text: "CRED_DEC" }, { text: "Either" }],
    [{ text: "" }, { text: "CRED_RES" }, { text: "Either" }],
    [{ text: "" }, { text: "LIQ_CERT_2" }, { text: "Either" }],
    [{ text: "" }, { text: "LIQ_CERT_3" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "APLCO" }, { text: "WINDING_UP" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_600" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_600CH" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CRED_RES" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONTR_RES" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LIQ_CERT_1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SSALIQ" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "APLM" }, { text: "CERT_S89" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "LIQ01" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "FORM_600" }, { text: "Either" }],
    [{ text: "" }, { text: "FORM_600CH" }, { text: "Either" }],
    [{ text: "" }, { text: "CRALIQ" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "APR" }, { text: "DEED" }, { text: "Either" }],
    [{ text: "" }, { text: "TRANSFER" }, { text: "Either" }],
    [{ text: "" }, { text: "MORD" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "APT" }, { text: "TRANSFER" }, { text: "Either" }],
    [{ text: "" }, { text: "TRUSTEE_RESOLUTION" }, { text: "Either" }],
    [{ text: "" }, { text: "VESTING_ORDER" }, { text: "Either" }],
    [{ text: "" }, { text: "APPOINTMENT_OF_TRUSTEE" }, { text: "Either" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "ARC" }, { text: "DEED" }, { text: "Either" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RXC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "TP1" }, { text: "Either" }],
    [{ text: "ASSTTP" }, { text: "AS3" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "ADMIN_LTRS" }, { text: "Either" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Either" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Suggested" }],
    [{ text: "ASTC" }, { text: "AS2" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "ADMIN_LTRS" }, { text: "Either" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Either" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Suggested" }],
    [{ text: "ASTT" }, { text: "AS1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Either" }],
    [{ text: "" }, { text: "ADMIN_LTRS" }, { text: "Either" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "ATP" }, { text: "CORRES" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "ATR" }, { text: "CORRES" }, { text: "Either" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SOT" }, { text: "Either" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Either" }],
    [{ text: "AUN" }, { text: "UN3" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "BKN" }, { text: "K3" }, { text: "Either" }],
    [{ text: "" }, { text: "K4" }, { text: "Either" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "BKR" }, { text: "RX1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "C" }, { text: "CH1" }, { text: "Either" }],
    [{ text: "" }, { text: "MRTG_DEED" }, { text: "Either (Compulsory if mdref is provided)" }],
    [{ text: "" }, { text: "CH2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX1" }, { text: "Suggested" }],
    [{ text: "CAG" }, { text: "CN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SOT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CANI" }, { text: "RX3" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CANR" }, { text: "RX3" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SOT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CANU" }, { text: "UN4" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SOT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CBKN" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "K22" }, { text: "Either" }],
    [{ text: "" }, { text: "ADJAR" }, { text: "Either" }],
    [{ text: "" }, { text: "ACKAPU" }, { text: "Either" }],
    [{ text: "" }, { text: "ADJREVU" }, { text: "Either" }],
    [{ text: "" }, { text: "K20" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CBKR" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CCT" }, { text: "CCD" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CH2" }, { text: "CH2" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CH3" }, { text: "CH3" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CHOA" }, { text: "AN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "CHOU" }, { text: "UN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "CHR" }, { text: "HR4" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CN" }, { text: "CORRES" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "BIRTH_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "DEED_POLL" }, { text: "Either" }],
    [{ text: "" }, { text: "DRIVING_LICENCE" }, { text: "Either" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Either" }],
    [{ text: "" }, { text: "GENDER_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "CIVIL_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "PASSPORT" }, { text: "Either" }],
    [{ text: "" }, { text: "SOT" }, { text: "Either" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CNC" }, { text: "CORRES" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "BIRTH_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "DEED_POLL" }, { text: "Either" }],
    [{ text: "" }, { text: "DRIVING_LICENCE" }, { text: "Either" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Either" }],
    [{ text: "" }, { text: "GENDER_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "CIVIL_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "PASSPORT" }, { text: "Either" }],
    [{ text: "" }, { text: "SOT" }, { text: "Either" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CNL" }, { text: "CN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "COA" }, { text: "CORRES" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "COAC" }, { text: "CORRES" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CON" }, { text: "CC" }, { text: "Compulsory" }],
    [{ text: "COP" }, { text: "CH1" }, { text: "Either" }],
    [{ text: "" }, { text: "MRTG_DEED" }, { text: "Either" }],
    [{ text: "" }, { text: "CH2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX1" }, { text: "Suggested" }],
    [{ text: "CPD" }, { text: "CORRES" }, { text: "Either" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CPVK" }, { text: "DEED_POLL" }, { text: "Either" }],
    [{ text: "" }, { text: "GVD" }, { text: "Either" }],
    [{ text: "CPVU" }, { text: "DEED_POLL" }, { text: "Either" }],
    [{ text: "" }, { text: "GVD" }, { text: "Either" }],
    [{ text: "CTD" }, { text: "CM2" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "CUR" }, { text: "CN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "DB" }, { text: "BOUND_PLAN" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "DB" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "DCLN" }, { text: "EVIDENCE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "DCLV" }, { text: "EVIDENCE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "DEB" }, { text: "AN1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CH2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEBENTURE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "RX1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RXC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN1" }, { text: "Suggested" }],
    [{ text: "DFL1" }, { text: "LEASE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "SDLT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LTT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "DFL3" }, { text: "LEASE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "SDLT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LTT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "DFL4" }, { text: "LEASE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "SDLT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LTT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "DFL5" }, { text: "LEASE" }, { text: "Either" }],
    [{ text: "" }, { text: "VAR_LEASE" }, { text: "Either" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_JO" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SDLT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LTT" }, { text: "Suggested" }],
    [{ text: "DFT" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "DIS" }, { text: "DS1" }, { html: "Compulsory (When <code>discharge_submission_type</code> is <code>ATTACHED</code>)" }],
    [{ text: "DJP" }, { text: "DJP" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Either" }],
    [{ text: "" }, { text: "CERT_DEATH" }, { text: "Either" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "COR_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "ADMIN_LTRS" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "DL" }, { text: "LEASE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "SDLT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LTT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "DMR" }, { text: "RX2" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "DOG" }, { text: "DEED" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "DP" }, { text: "DS1" }, { text: "Compulsory" }],
    [{ text: "DSP" }, { text: "DEATH_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Either" }],
    [{ text: "" }, { text: "CERT_DEATH" }, { text: "Either" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "COR_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "ADMIN_LTRS" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "DSS" }, { text: "CH2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEED" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RXC" }, { text: "Suggested" }],
    [{ text: "DTL" }, { text: "LEASE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "SDLT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LTT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "EX1" }, { text: "CERT_RED_EX" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CORRES" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EX1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EX1A" }, { text: "Compulsory" }],
    [{ text: "EX3" }, { text: "BIRTH_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CIVIL_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEC_AB_NULL_MARR" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEED_POLL" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DRIVING_LICENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EX3" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "GENDER_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "ORD_DISS_NULL_CP" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PASSPORT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SOT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Suggested" }],
    [{ text: "EXR" }, { text: "CN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "HR" }, { text: "HR1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "JP1" }, { text: "JP1" }, { text: "Compulsory" }],
    [{ text: "LCATCO" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Either" }],
    [{ text: "" }, { text: "SHRF_RTN" }, { text: "Either" }],
    [{ text: "LCBD" }, { text: "NOD" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EOB" }, { text: "Either" }],
    [{ text: "" }, { text: "EOL" }, { text: "Either" }],
    [{ text: "" }, { text: "CN1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "HR4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN4" }, { text: "Suggested" }],
    [{ text: "LCBET" }, { text: "CNFRM_DTMN_LTA_LGHA" }, { text: "Either" }],
    [{ text: "" }, { text: "CNFRM_NO_LTA_LGHA" }, { text: "Either" }],
    [{ text: "" }, { text: "CN1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVD_NO_RENEW" }, { text: "Suggested" }],
    [{ text: "LCBN" }, { text: "RN" }, { text: "Either" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Either" }],
    [{ text: "LCF" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Either" }],
    [{ text: "" }, { text: "CNSNT_ADMIN_COURT" }, { text: "Suggested" }],
    [{ text: "LCMRE" }, { text: "CN1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "HR4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN4" }, { text: "Suggested" }],
    [{ text: "LCOE" }, { text: "FR1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "DEED_REG_DIS" }, { text: "Compulsory" }],
    [{ text: "LCOF" }, { text: "EVIDENCE" }, { text: "Compulsory" }],
    [{ text: "LCSD" }, { text: "DEED_SUR" }, { text: "Either" }],
    [{ text: "" }, { text: "LNDLD_CNSNT" }, { text: "Either" }],
    [{ text: "" }, { text: "TR1" }, { text: "Either" }],
    [{ text: "" }, { text: "TP1" }, { text: "Either" }],
    [{ text: "" }, { text: "CN1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "HR4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN4" }, { text: "Suggested" }],
    [{ text: "LCSDM" }, { text: "DEED_SUR" }, { text: "Either" }],
    [{ text: "" }, { text: "TR1" }, { text: "Either" }],
    [{ text: "" }, { text: "TP1" }, { text: "Either" }],
    [{ text: "" }, { text: "LNDLD_CNSNT" }, { text: "Either" }],
    [{ text: "" }, { text: "CN1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "HR4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN4" }, { text: "Suggested" }],
    [{ text: "LCSDMWT" }, { text: "DEED_SUR" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LNDLD_CNSNT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CN1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "HR4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN4" }, { text: "Suggested" }],
    [{ text: "LCSDWT" }, { text: "DEED_SUR" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LNDLD_CNSNT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CN1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "HR4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN4" }, { text: "Suggested" }],
    [{ text: "LCSOL" }, { text: "CN1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "HR4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SOT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CNFRM_NO_DEED_SUR" }, { text: "Suggested" }],
    [{ text: "LCSOLM" }, { text: "STAT_DEC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CNFRM_NO_DEED_SUR" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CN1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DS3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "HR4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX3" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RX4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN2" }, { text: "Suggested" }],
    [{ text: "" }, { text: "UN4" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SOT" }, { text: "Suggested" }],
    [{ text: "MDR" }, { text: "RX2" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "NCT" }, { text: "EVIDENCE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "NDC" }, { text: "CORRES" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "NFR" }, { text: "AN1" }, { text: "Either" }],
    [{ text: "" }, { text: "UN1" }, { text: "Either" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "NOE" }, { text: "DEED" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "NOL" }, { text: "LEASE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "AN1" }, { text: "Either" }],
    [{ text: "" }, { text: "UN1" }, { text: "Either" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "NOPSC" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SC" }, { text: "Compulsory" }],
    [{ text: "NPR" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "NRT" }, { text: "AN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "PC" }, { text: "DOP" }, { text: "Either" }],
    [{ text: "" }, { text: "LONP" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "PER" }, { text: "DEED" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "PRO" }, { text: "DEED" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "RC" }, { text: "DEED" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "RE" }, { text: "AN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CHARGE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CHARG_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEED" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SOT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "STAT_DEC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "TRANSFER" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RXC" }, { text: "Suggested" }],
    [{ text: "RFN" }, { text: "DEED" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "RHR" }, { text: "HR2" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "RNT" }, { text: "LEASE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "SDLT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LTT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "ROCA" }, { text: "AN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "DEED" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "ROCC" }, { text: "CN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "DEED" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "ROCU" }, { text: "UN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "DEED" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "ROE" }, { text: "DEED" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "RRC" }, { text: "DEED" }, { text: "Either" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LEASE" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RXC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "TP1" }, { text: "Either" }],
    [{ text: "RRD" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "RTM" }, { text: "EVIDENCE" }, { text: "Either" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "RUN" }, { text: "UN2" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "RXL" }, { text: "RX1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "RXN" }, { text: "RX1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "RXS" }, { text: "RX1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CHARG_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SEV" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "SBC" }, { text: "MRTG_DEED" }, { text: "Compulsory" }],
    [{ text: "SHO" }, { text: "MEMO" }, { text: "Either" }],
    [{ text: "" }, { text: "DEED" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "SJT" }, { text: "RX1" }, { text: "Either" }],
    [{ text: "" }, { text: "SEV" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "SOT" }, { text: "CORRES" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Compulsory" }],
    [{ text: "STVC" }, { text: "EVIDENCE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COR_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "STVL" }, { text: "EVIDENCE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COR_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "T" }, { text: "TR1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CIVIL_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SDLT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LTT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Suggested" }],
    [{ text: "TNV" }, { text: "TR1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_JO" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CIVIL_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Suggested" }],
    [{ text: "TNVTP" }, { text: "TP1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "TOC" }, { text: "TR4" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "TOSNV" }, { text: "TR1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_JO" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CIVIL_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Suggested" }],
    [{ text: "TOSNVTP" }, { text: "TP1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "TOSTP" }, { text: "TP1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "TOSV" }, { text: "TR1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_JO" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CIVIL_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Suggested" }],
    [{ text: "TPS" }, { text: "TR2" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_JO" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CIVIL_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Suggested" }],
    [{ text: "TPSTP" }, { text: "TP2" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "TRC" }, { text: "CM5" }, { text: "Either" }],
    [{ text: "" }, { text: "CM6" }, { text: "Either" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "TRM" }, { text: "ADMIN_LTRS" }, { text: "Either" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Either" }],
    [{ text: "" }, { text: "TR1" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_JO" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CERT_DEATH" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COR_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Suggested" }],
    [{ text: "TSCNV" }, { text: "TR1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_JO" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CIVIL_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Suggested" }],
    [{ text: "TSCNVTP" }, { text: "TP1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "TSCTP" }, { text: "TP1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "TSCV" }, { text: "TR1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_JO" }, { text: "Suggested" }],
    [{ text: "" }, { text: "DEATH_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CIVIL_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PROBATE" }, { text: "Suggested" }],
    [{ text: "TTP" }, { text: "TP1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COMP_DOC" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "PLAN" }, { text: "Suggested" }],
    [{ text: "" }, { text: "SDLT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LTT" }, { text: "Suggested" }],
    [{ text: "TVR" }, { text: "TR1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_JO" }, { text: "Suggested" }],
    [{ text: "TVRTP" }, { text: "TP1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "FORM_JO" }, { text: "Suggested" }],
    [{ text: "UNN" }, { text: "UN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "DEED" }, { text: "Suggested" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "UPT" }, { text: "UT1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "REVERS_INT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "K17_OR_K18" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONSENT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONVEYANCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LEASE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VC" }, { text: "VAR_CHARGE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VLAN" }, { text: "AN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "VAR_LEASE" }, { text: "Either" }],
    [{ text: "" }, { text: "SIDE_LTR" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VLAP" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "VAR_LEASE" }, { text: "Either" }],
    [{ text: "" }, { text: "SIDE_LTR" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VLUN" }, { text: "UN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "VAR_LEASE" }, { text: "Either" }],
    [{ text: "" }, { text: "SIDE_LTR" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "" }, { text: "LEASE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VC" }, { text: "VAR_CHARGE" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "CONV_CERT" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VLAN" }, { text: "AN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "VAR_LEASE" }, { text: "Either" }],
    [{ text: "" }, { text: "SIDE_LTR" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VLAP" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "VAR_LEASE" }, { text: "Either" }],
    [{ text: "" }, { text: "SIDE_LTR" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VLUN" }, { text: "UN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "VAR_LEASE" }, { text: "Either" }],
    [{ text: "" }, { text: "SIDE_LTR" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VO" }, { text: "COURT_ORD" }, { text: "Compulsory" }],
    [{ text: "VOC" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "VAR_COV" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VOCA" }, { text: "AN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "VAR_COV" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VOCU" }, { text: "UN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "COURT_ORD" }, { text: "Either" }],
    [{ text: "" }, { text: "VAR_COV" }, { text: "Either" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VOE" }, { text: "VAR_EAS" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VOEA" }, { text: "VAR_EAS" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "AN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VOEU" }, { text: "VAR_EAS" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "UN1" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "VRC" }, { text: "DEED" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "EVIDENCE" }, { text: "Suggested" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "" }, { text: "RXC" }, { text: "Suggested" }],
    [{ text: "WCT" }, { text: "WCT" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }],
    [{ text: "WDR" }, { text: "RX4" }, { text: "Compulsory" }],
    [{ text: "" }, { text: "POA" }, { text: "Suggested" }]
  ]})
}}
{% endcall %}

### Valid transaction types per application type {.govuk-heading-s}

For each application type (`REGISTER_UPDATE`, `DISPOSITIONARY_FIRST_LEASE`, `TRANSFER_OF_PART` and `REMOVE_JP1`), only certain transaction types can be supplied. The sections below detail which transaction types are valid for each application type.

{% call govukDetails({summaryText: "Valid transaction types"}) %}

### <code>REGISTER_UPDATE</code> {.govuk-heading-s}

<ul class="govuk-list govuk-list--bullet">
  <li><code class="app-code app-code--inline">ADV1</code> - First notice of adverse possession</li>
  <li><code class="app-code app-code--inline">ADV2</code> - Adverse possession: notification</li>
  <li><code class="app-code app-code--inline">AGN</code> - Agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">APLC</code> - Appointment of liquidator (creditor’s voluntary winding up)</li>
  <li><code class="app-code app-code--inline">APLCO</code> - Appointment of liquidator (compulsory winding up)</li>
  <li><code class="app-code app-code--inline">APLM</code> - Appointment of liquidator (members’ voluntary winding up)</li>
  <li><code class="app-code app-code--inline">APR</code> - Apportionment of rent</li>
  <li><code class="app-code app-code--inline">APT</code> - Appointment of new trustee</li>
  <li><code class="app-code app-code--inline">ASTC</code> - Assent of charge</li>
  <li><code class="app-code app-code--inline">ATP</code> - Amendment to title plan</li>
  <li><code class="app-code app-code--inline">AUN</code> - Amendment of unilateral notice (UN3)</li>
  <li><code class="app-code app-code--inline">BKN</code> - Bankruptcy notice/Creditors’ notice</li>
  <li><code class="app-code app-code--inline">BKR</code> - Bankruptcy restriction/Bankruptcy inhibition</li>
  <li><code class="app-code app-code--inline">C</code> - Charge</li>
  <li><code class="app-code app-code--inline">CAG</code> - Cancellation of notice (not unilateral) (CN1)</li>
  <li><code class="app-code app-code--inline">CANI</code> - Cancellation of inhibition (RX3)</li>
  <li><code class="app-code app-code--inline">CANR</code> - Cancellation of restriction (RX3)</li>
  <li><code class="app-code app-code--inline">CANU</code> - Cancellation of unilateral notice (UN4)</li>
  <li><code class="app-code app-code--inline">CBKN</code> - Cancellation of bankruptcy notice</li>
  <li><code class="app-code app-code--inline">CBKR</code> - Cancellation of bankruptcy restriction</li>
  <li><code class="app-code app-code--inline">CCT</code> - Cancellation of a caution (CCD)</li>
  <li><code class="app-code app-code--inline">CH2</code> - Obligation to make further advances (CH2)</li>
  <li><code class="app-code app-code--inline">CH3</code> - Agreed maximum amount of security (CH3)</li>
  <li><code class="app-code app-code--inline">CHOA</code> - Charging order - Agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">CHOU</code> - Charging order - Unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">CHR</code> - Cancellation of home rights (HR4)</li>
  <li><code class="app-code app-code--inline">CN</code> - Change of name</li>
  <li><code class="app-code app-code--inline">CNC</code> - Change of name - chargee</li>
  <li><code class="app-code app-code--inline">CNL</code> - Cancellation of an unregistered noted lease (CN1)</li>
  <li><code class="app-code app-code--inline">COA</code> - Change of address for service</li>
  <li><code class="app-code app-code--inline">COAC</code> - Change of address for service - chargee</li>
  <li><code class="app-code app-code--inline">CON</code> - Consolidation of charge</li>
  <li><code class="app-code app-code--inline">COP</code> - Charge of part</li>
  <li><code class="app-code app-code--inline">CPD</code> - Change of property description</li>
  <li><code class="app-code app-code--inline">CPVK</code> - Compulsory purchase (property value known)</li>
  <li><code class="app-code app-code--inline">CTD</code> - Commonhold transitional dealing</li>
  <li><code class="app-code app-code--inline">CUR</code> - Cancellation of notice of unregistered Rentcharge</li>
  <li><code class="app-code app-code--inline">DB</code> - Determined boundary (DB)</li>
  <li><code class="app-code app-code--inline">DCLN</code> - Disclaimer - notification</li>
  <li><code class="app-code app-code--inline">DCLV</code> - Disclaimer - notice</li>
  <li><code class="app-code app-code--inline">DFL1</code> - New lease - other</li>
  <li><code class="app-code app-code--inline">DFT</code> - Defect in title s64(1) LRA 2002</li>
  <li><code class="app-code app-code--inline">DIS</code> - Discharge of charge</li>
  <li><code class="app-code app-code--inline">DJP</code> - Death of a joint proprietor</li>
  <li><code class="app-code app-code--inline">DL</code> - Discontinuous lease - non-timeshare</li>
  <li><code class="app-code app-code--inline">DMR</code> - Disapplication of restriction (RX2)</li>
  <li><code class="app-code app-code--inline">DOG</code> - Deed of grant of easement</li>
  <li><code class="app-code app-code--inline">DP</code> - Discharge of part</li>
  <li><code class="app-code app-code--inline">DSP</code> - Death of a sole proprietor</li>
  <li><code class="app-code app-code--inline">JP1</code> - Removal of default Form A restriction</li>
  <li><code class="app-code app-code--inline">LCATCO</code> - Lease closure - of assured tenancies following court order</li>
  <li><code class="app-code app-code--inline">LCBD</code> - Lease closure - by disclaimer</li>
  <li><code class="app-code app-code--inline">LCBET</code> - Lease closure - by effluxion of time</li>
  <li><code class="app-code app-code--inline">LCBN</code> - Lease closure - by notice</li>
  <li><code class="app-code app-code--inline">LCF</code> - Lease closure - forfeiture</li>
  <li><code class="app-code app-code--inline">LCMRE</code> - Lease closure - merger with reversionary estate</li>
  <li><code class="app-code app-code--inline">LCOE</code> - Lease closure - on enlargement</li>
  <li><code class="app-code app-code--inline">LCOF</code> - Lease closure - on frustration</li>
  <li><code class="app-code app-code--inline">LCSD</code> - Lease closure - surrender by deed (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">LCSDM</code> - Lease closure - surrender by deed</li>
  <li><code class="app-code app-code--inline">LCSDMWT</code> - Lease closure - surrender by deed (together with transfer)</li>
  <li><code class="app-code app-code--inline">LCSDWT</code> - Lease closure - surrender by deed with a transfer (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">LCSOL</code> - Lease closure - surrender by operation of law (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">LCSOLM</code> - Lease closure - surrender by operation of law</li>
  <li><code class="app-code app-code--inline">MDR</code> - Modification of Restriction</li>
  <li><code class="app-code app-code--inline">NCT</code> - Caution amendment</li>
  <li><code class="app-code app-code--inline">NDC</code> - Notification of dissolution of company</li>
  <li><code class="app-code app-code--inline">NFR</code> - Noting of an affecting franchise</li>
  <li><code class="app-code app-code--inline">NOE</code> - Noting an easement</li>
  <li><code class="app-code app-code--inline">NOL</code> - Noting a lease</li>
  <li><code class="app-code app-code--inline">NPR</code> - Noting of a profit</li>
  <li><code class="app-code app-code--inline">NRT</code> - Notice of rentcharge</li>
  <li><code class="app-code app-code--inline">PC</code> - Postponement of charge</li>
  <li><code class="app-code app-code--inline">PRO</code> - Provisions</li>
  <li><code class="app-code app-code--inline">RC</code> - Restrictive covenants - entry of</li>
  <li><code class="app-code app-code--inline">RFN</code> - Deed of rectification</li>
  <li><code class="app-code app-code--inline">RHR</code> - Renewal of home rights (HR2)</li>
  <li><code class="app-code app-code--inline">RNT</code> - Overriding lease granted under s.19</li>
  <li><code class="app-code app-code--inline">ROCA</code> - Release of covenants - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">ROCC</code> - Release of covenants - cancellation (CN1)</li>
  <li><code class="app-code app-code--inline">ROCU</code> - Release of covenants - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">ROE</code> - Release of easements</li>
  <li><code class="app-code app-code--inline">RRD</code> - Removal of a right to determine</li>
  <li><code class="app-code app-code--inline">RTM</code> - Acquisition of right to manage</li>
  <li><code class="app-code app-code--inline">RUN</code> - Removal of unilateral notice (UN2)</li>
  <li><code class="app-code app-code--inline">RXL</code> - Form || restriction entered - simple request</li>
  <li><code class="app-code app-code--inline">RXN</code> - Restriction (non-standard wording) (RX1)</li>
  <li><code class="app-code app-code--inline">RXS</code> - Restriction (standard wording) (RX1)</li>
  <li><code class="app-code app-code--inline">SBC</code> - Sub charge</li>
  <li><code class="app-code app-code--inline">SHO</code> - Shared ownership - additional share</li>
  <li><code class="app-code app-code--inline">SJT</code> - Severance of joint tenancy (SEV)</li>
  <li><code class="app-code app-code--inline">STVC</code> - Statutory vestings charge</li>
  <li><code class="app-code app-code--inline">STVL</code> - Statutory vestings land</li>
  <li><code class="app-code app-code--inline">T</code> - Transfer for value</li>
  <li><code class="app-code app-code--inline">TNV</code> - Transfer (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">TOC</code> - Transfer of charge</li>
  <li><code class="app-code app-code--inline">TOSNV</code> - Transfer of share (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">TOSV</code> - Transfer of share for value</li>
  <li><code class="app-code app-code--inline">TPS</code> - Transfer under power of sale</li>
  <li><code class="app-code app-code--inline">TRC</code> - Termination of commonhold</li>
  <li><code class="app-code app-code--inline">TRM</code> - Transfer by operation of law on death</li>
  <li><code class="app-code app-code--inline">TSCNV</code> - Transfer subject to a charge (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">TSCV</code> - Transfer subject to a charge for value</li>
  <li><code class="app-code app-code--inline">TVR</code> - Transfer for value RTB/RTA</li>
  <li><code class="app-code app-code--inline">UNN</code> - Unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">UPT</code> - Upgrade class of title (UT1)</li>
  <li><code class="app-code app-code--inline">VC</code> - Variation of charge</li>
  <li><code class="app-code app-code--inline">VLAN</code> - Variation of lease - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VLAP</code> - Deed of variation of a lease - not increasing the term of or adding new land to the extent demised</li>
  <li><code class="app-code app-code--inline">VLUN</code> - Variation of lease - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">VO</code> - Vesting order</li>
  <li><code class="app-code app-code--inline">VOC</code> - Variation of covenants</li>
  <li><code class="app-code app-code--inline">VOCA</code> - Variation of covenants - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VOCU</code> - Variation of covenants - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">VOE</code> - Variation of easements</li>
  <li><code class="app-code app-code--inline">VOEA</code> - Variation of easements - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VOEU</code> - Variation of easements - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">WCT</code> - Withdrawal of caution</li>
  <li><code class="app-code app-code--inline">WDR</code> - Withdraw a restriction (RX4)</li>
</ul>

### <code>TRANSFER_OF_PART</code> {.govuk-heading-s}

<ul class="govuk-list govuk-list--bullet">
  <li><code class="app-code app-code--inline">ADV1</code> - First notice of adverse possession</li>
  <li><code class="app-code app-code--inline">ADV2</code> - Adverse possession: notification</li>
  <li><code class="app-code app-code--inline">AGN</code> - Agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">APLM</code> - Appointment of liquidator (members’ voluntary winding up)</li>
  <li><code class="app-code app-code--inline">APR</code> - Apportionment of rent</li>
  <li><code class="app-code app-code--inline">ASSTTP</code> - Assent (Transfer of Part)</li>
  <li><code class="app-code app-code--inline">C</code> - Charge</li>
  <li><code class="app-code app-code--inline">CAG</code> - Cancellation of notice (not unilateral) (CN1)</li>
  <li><code class="app-code app-code--inline">CANI</code> - Cancellation of inhibition (RX3)</li>
  <li><code class="app-code app-code--inline">CANR</code> - Cancellation of restriction (RX3)</li>
  <li><code class="app-code app-code--inline">CANU</code> - Cancellation of unilateral notice (UN4)</li>
  <li><code class="app-code app-code--inline">CBKN</code> - Cancellation of bankruptcy notice</li>
  <li><code class="app-code app-code--inline">CBKR</code> - Cancellation of bankruptcy restriction</li>
  <li><code class="app-code app-code--inline">CCT</code> - Cancellation of a caution (CCD)</li>
  <li><code class="app-code app-code--inline">CH2</code> - Obligation to make further advances (CH2)</li>
  <li><code class="app-code app-code--inline">CH3</code> - Agreed maximum amount of security (CH3)</li>
  <li><code class="app-code app-code--inline">CHOA</code> - Charging order - Agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">CHOU</code> - Charging order - Unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">CHR</code> - Cancellation of home rights (HR4)</li>
  <li><code class="app-code app-code--inline">CNL</code> - Cancellation of an unregistered noted lease (CN1)</li>
  <li><code class="app-code app-code--inline">CON</code> - Consolidation of charge</li>
  <li><code class="app-code app-code--inline">COP</code> - Charge of part</li>
  <li><code class="app-code app-code--inline">CPVU</code> - Compulsory purchase (property value unknown)</li>
  <li><code class="app-code app-code--inline">CTD</code> - Commonhold transitional dealing</li>
  <li><code class="app-code app-code--inline">CUR</code> - Cancellation of notice of unregistered Rentcharge</li>
  <li><code class="app-code app-code--inline">DB</code> - Determined boundary (DB)</li>
  <li><code class="app-code app-code--inline">DCLN</code> - Disclaimer - notification</li>
  <li><code class="app-code app-code--inline">DFL1</code> - New lease - other</li>
  <li><code class="app-code app-code--inline">DFT</code> - Defect in title s64(1) LRA 2002</li>
  <li><code class="app-code app-code--inline">DIS</code> - Discharge of charge</li>
  <li><code class="app-code app-code--inline">DL</code> - Discontinuous lease - non-timeshare</li>
  <li><code class="app-code app-code--inline">DMR</code> - Disapplication of restriction (RX2)</li>
  <li><code class="app-code app-code--inline">DOG</code> - Deed of grant of easement</li>
  <li><code class="app-code app-code--inline">DP</code> - Discharge of part</li>
  <li><code class="app-code app-code--inline">DSP</code> - Death of a sole proprietor</li>
  <li><code class="app-code app-code--inline">LCATCO</code> - Lease closure - of assured tenancies following court order</li>
  <li><code class="app-code app-code--inline">LCBD</code> - Lease closure - by disclaimer</li>
  <li><code class="app-code app-code--inline">LCBET</code> - Lease closure - by effluxion of time</li>
  <li><code class="app-code app-code--inline">LCF</code> - Lease closure - forfeiture</li>
  <li><code class="app-code app-code--inline">LCSDWT</code> - Lease closure - surrender by deed with a transfer (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">LCSOL</code> - Lease closure - surrender by operation of law (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">LCSOLM</code> - Lease closure - surrender by operation of law</li>
  <li><code class="app-code app-code--inline">MDR</code> - Modification of Restriction</li>
  <li><code class="app-code app-code--inline">NFR</code> - Noting of an affecting franchise</li>
  <li><code class="app-code app-code--inline">NOE</code> - Noting an easement</li>
  <li><code class="app-code app-code--inline">NOL</code> - Noting a lease</li>
  <li><code class="app-code app-code--inline">NPR</code> - Noting of a profit</li>
  <li><code class="app-code app-code--inline">NRT</code> - Notice of rentcharge</li>
  <li><code class="app-code app-code--inline">PRO</code> - Provisions</li>
  <li><code class="app-code app-code--inline">RC</code> - Restrictive covenants - entry of</li>
  <li><code class="app-code app-code--inline">RFN</code> - Deed of rectification</li>
  <li><code class="app-code app-code--inline">RNT</code> - Overriding lease granted under s.19</li>
  <li><code class="app-code app-code--inline">ROCC</code> - Release of covenants - cancellation (CN1)</li>
  <li><code class="app-code app-code--inline">ROCU</code> - Release of covenants - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">ROE</code> - Release of easements</li>
  <li><code class="app-code app-code--inline">RRD</code> - Removal of a right to determine</li>
  <li><code class="app-code app-code--inline">RUN</code> - Removal of unilateral notice (UN2)</li>
  <li><code class="app-code app-code--inline">RXL</code> - Form || restriction entered - simple request</li>
  <li><code class="app-code app-code--inline">RXN</code> - Restriction (non-standard wording) (RX1)</li>
  <li><code class="app-code app-code--inline">RXS</code> - Restriction (standard wording) (RX1)</li>
  <li><code class="app-code app-code--inline">SBC</code> - Sub charge</li>
  <li><code class="app-code app-code--inline">SJT</code> - Severance of joint tenancy (SEV)</li>
  <li><code class="app-code app-code--inline">STVC</code> - Statutory vestings charge</li>
  <li><code class="app-code app-code--inline">STVL</code> - Statutory vestings land</li>
  <li><code class="app-code app-code--inline">TNVTP</code> - Transfer (not for value or reverse premium) (Transfer of part)</li>
  <li><code class="app-code app-code--inline">TOSNVTP</code> - Transfer of share (not for value or reverse premium) (Transfer of part)</li>
  <li><code class="app-code app-code--inline">TOSTP</code> - Transfer of share for value (Transfer of part)</li>
  <li><code class="app-code app-code--inline">TPSTP</code> - Transfer under power of sale (Transfer of part)</li>
  <li><code class="app-code app-code--inline">TRC</code> - Termination of commonhold</li>
  <li><code class="app-code app-code--inline">TSCNVTP</code> - Transfer subject to a charge (not for value or reverse premium) (Transfer of part)</li>
  <li><code class="app-code app-code--inline">TSCVTP</code> - Transfer subject to a charge for value (Transfer of part)</li>
  <li><code class="app-code app-code--inline">TTP</code> - Transfer for value (Transfer of part)</li>
  <li><code class="app-code app-code--inline">TVRTP</code> - Transfer for value RTB/RTA (Transfer of part)</li>
  <li><code class="app-code app-code--inline">UNN</code> - Unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">UPT</code> - Upgrade class of title (UT1)</li>
  <li><code class="app-code app-code--inline">VC</code> - Variation of charge</li>
  <li><code class="app-code app-code--inline">VLAN</code> - Variation of lease - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VLAP</code> - Deed of variation of a lease - not increasing the term of or adding new land to the extent demised</li>
  <li><code class="app-code app-code--inline">VLUN</code> - Variation of lease - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">VO</code> - Vesting order</li>
  <li><code class="app-code app-code--inline">VOC</code> - Variation of covenants</li>
  <li><code class="app-code app-code--inline">VOCA</code> - Variation of covenants - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VOCU</code> - Variation of covenants - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">VOE</code> - Variation of easements</li>
  <li><code class="app-code app-code--inline">VOEA</code> - Variation of easements - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VOEU</code> - Variation of easements - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">WCT</code> - Withdrawal of caution</li>
  <li><code class="app-code app-code--inline">WDR</code> - Withdraw a restriction (RX4)</li>
</ul>

### <code>DISPOSITIONARY_FIRST_LEASE</code> {.govuk-heading-s}

New leases

<ul class="govuk-list govuk-list--bullet">
  <li><code class="app-code app-code--inline">ADV1</code> - First notice of adverse possession</li>
  <li><code class="app-code app-code--inline">AGN</code> - Agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">AUN</code> - Amendment of unilateral notice (UN3)</li>
  <li><code class="app-code app-code--inline">BKR</code> - Bankruptcy restriction/Bankruptcy inhibition</li>
  <li><code class="app-code app-code--inline">C</code> - Charge</li>
  <li><code class="app-code app-code--inline">CAG</code> - Cancellation of notice (not unilateral) (CN1)</li>
  <li><code class="app-code app-code--inline">CANI</code> - Cancellation of inhibition (RX3)</li>
  <li><code class="app-code app-code--inline">CANR</code> - Cancellation of restriction (RX3)</li>
  <li><code class="app-code app-code--inline">CANU</code> - Cancellation of unilateral notice (UN4)</li>
  <li><code class="app-code app-code--inline">CBKN</code> - Cancellation of bankruptcy notice</li>
  <li><code class="app-code app-code--inline">CBKR</code> - Cancellation of bankruptcy restriction</li>
  <li><code class="app-code app-code--inline">CCT</code> - Cancellation of a caution (CCD)</li>
  <li><code class="app-code app-code--inline">CH2</code> - Obligation to make further advances (CH2)</li>
  <li><code class="app-code app-code--inline">CH3</code> - Agreed maximum amount of security (CH3)</li>
  <li><code class="app-code app-code--inline">CHOA</code> - Charging order - Agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">CHOU</code> - Charging order - Unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">CHR</code> - Cancellation of home rights (HR4)</li>
  <li><code class="app-code app-code--inline">CN</code> - Change of name</li>
  <li><code class="app-code app-code--inline">CNC</code> - Change of name- chargee</li>
  <li><code class="app-code app-code--inline">CNL</code> - Cancellation of an unregistered noted lease (CN1)</li>
  <li><code class="app-code app-code--inline">COA</code> - Change of address for service</li>
  <li><code class="app-code app-code--inline">COAC</code> - Change of address for service - chargee</li>
  <li><code class="app-code app-code--inline">COP</code> - Charge of part</li>
  <li><code class="app-code app-code--inline">CUR</code> - Cancellation of notice of unregistered Rentcharge</li>
  <li><code class="app-code app-code--inline">DCLV</code> - Disclaimer - notice</li>
  <li><code class="app-code app-code--inline">DFL1</code> - New lease - other</li>
  <li><code class="app-code app-code--inline">DFL3</code> - New lease - shared ownership</li>
  <li><code class="app-code app-code--inline">DFL4</code> - New lease - right to buy or right to acquire</li>
  <li><code class="app-code app-code--inline">DFT</code> - Defect in title s64(1) LRA 2002</li>
  <li><code class="app-code app-code--inline">DIS</code> - Discharge of charge</li>
  <li><code class="app-code app-code--inline">DJP</code> - Death of a joint proprietor</li>
  <li><code class="app-code app-code--inline">DMR</code> - Disapplication of restriction (RX2)</li>
  <li><code class="app-code app-code--inline">DOG</code> - Deed of grant of easement</li>
  <li><code class="app-code app-code--inline">DP</code> - Discharge of part</li>
  <li><code class="app-code app-code--inline">DSP</code> - Death of a sole proprietor</li>
  <li><code class="app-code app-code--inline">DTL</code> - Discontinuous lease - timeshare</li>
  <li><code class="app-code app-code--inline">HR</code> - Notice of home rights (HR1)</li>
  <li><code class="app-code app-code--inline">LCBD</code> - Lease closure - by disclaimer</li>
  <li><code class="app-code app-code--inline">LCBN</code> - Lease closure - by notice</li>
  <li><code class="app-code app-code--inline">LCF</code> - Lease closure - forfeiture</li>
  <li><code class="app-code app-code--inline">LCMRE</code> - Lease closure - merger with reversionary estate</li>
  <li><code class="app-code app-code--inline">LCOE</code> - Lease closure - on enlargement</li>
  <li><code class="app-code app-code--inline">LCSD</code> - Lease closure - surrender by deed (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">LCSDM</code> - Lease closure - surrender by deed</li>
  <li><code class="app-code app-code--inline">LCSDMWT</code> - Lease closure - surrender by deed (together with transfer)</li>
  <li><code class="app-code app-code--inline">LCSOL</code> - Lease closure - surrender by operation of law (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">MDR</code> - Modification of Restriction</li>
  <li><code class="app-code app-code--inline">NDC</code> - Notification of dissolution of company</li>
  <li><code class="app-code app-code--inline">NFR</code> - Noting of an affecting franchise</li>
  <li><code class="app-code app-code--inline">NOL</code> - Noting a lease</li>
  <li><code class="app-code app-code--inline">NPR</code> - Noting of a profit</li>
  <li><code class="app-code app-code--inline">NRT</code> - Notice of rentcharge</li>
  <li><code class="app-code app-code--inline">PC</code> - Postponement of charge</li>
  <li><code class="app-code app-code--inline">PER</code> - Personal covenants</li>
  <li><code class="app-code app-code--inline">PRO</code> - Provisions</li>
  <li><code class="app-code app-code--inline">RC</code> - Restrictive covenants - entry of</li>
  <li><code class="app-code app-code--inline">RFN</code> - Deed of rectification</li>
  <li><code class="app-code app-code--inline">RHR</code> - Renewal of home rights (HR2)</li>
  <li><code class="app-code app-code--inline">RNT</code> - Overriding lease granted under s.19</li>
  <li><code class="app-code app-code--inline">ROCA</code> - Release of covenants - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">ROCC</code> - Release of covenants - cancellation (CN1)</li>
  <li><code class="app-code app-code--inline">ROCU</code> - Release of covenants - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">ROE</code> - Release of easements</li>
  <li><code class="app-code app-code--inline">RRD</code> - Removal of a right to determine</li>
  <li><code class="app-code app-code--inline">RUN</code> - Removal of unilateral notice (UN2)</li>
  <li><code class="app-code app-code--inline">RXN</code> - Restriction (non-standard wording) (RX1)</li>
  <li><code class="app-code app-code--inline">RXS</code> - Restriction (standard wording) (RX1)</li>
  <li><code class="app-code app-code--inline">SBC</code> - Sub charge</li>
  <li><code class="app-code app-code--inline">SJT</code> - Severance of joint tenancy (SEV)</li>
  <li><code class="app-code app-code--inline">UNN</code> - Unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">UPT</code> - Upgrade class of title (UT1)</li>
  <li><code class="app-code app-code--inline">VC</code> - Variation of charge</li>
  <li><code class="app-code app-code--inline">VLAN</code> - Variation of lease - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VLAP</code> - Deed of variation of a lease - not increasing the term of or adding new land to the extent demised</li>
  <li><code class="app-code app-code--inline">VLUN</code> - Variation of lease - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">VOC</code> - Variation of covenants</li>
  <li><code class="app-code app-code--inline">VOCA</code> - Variation of covenants - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VOCU</code> - Variation of covenants - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">VOE</code> - Variation of easements</li>
  <li><code class="app-code app-code--inline">VOEA</code> - Variation of easements - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VOEU</code> - Variation of easements - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">WCT</code> - Withdrawal of caution</li>
  <li><code class="app-code app-code--inline">WDR</code> - Withdraw a restriction (RX4)</li>
</ul>

Lease extensions

For a lease extension application, the `DFL5` (Dispositionary first lease extension of a term) transaction type must be used.

<ul class="govuk-list govuk-list--bullet">
  <li><code class="app-code app-code--inline">ADV1</code> - First notice of adverse possession</li>
  <li><code class="app-code app-code--inline">AGN</code> - Agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">APLC</code> - Appointment of liquidator (creditor’s voluntary winding up)</li>
  <li><code class="app-code app-code--inline">APLCO</code> - Appointment of liquidator (compulsory winding up)</li>
  <li><code class="app-code app-code--inline">APLM</code> - Appointment of liquidator (members’ voluntary winding up)</li>
  <li><code class="app-code app-code--inline">AUN</code> - Amendment of unilateral notice (UN3)</li>
  <li><code class="app-code app-code--inline">C</code> - Charge</li>
  <li><code class="app-code app-code--inline">CAG</code> - Cancellation of notice (not unilateral) (CN1)</li>
  <li><code class="app-code app-code--inline">CANI</code> - Cancellation of inhibition (RX3)</li>
  <li><code class="app-code app-code--inline">CANR</code> - Cancellation of restriction (RX3)</li>
  <li><code class="app-code app-code--inline">CANU</code> - Cancellation of unilateral notice (UN4)</li>
  <li><code class="app-code app-code--inline">CBKN</code> - Cancellation of bankruptcy notice</li>
  <li><code class="app-code app-code--inline">CBKR</code> - Cancellation of bankruptcy restriction</li>
  <li><code class="app-code app-code--inline">CCT</code> - Cancellation of a caution (CCD)</li>
  <li><code class="app-code app-code--inline">CH3</code> - Agreed maximum amount of security (CH3)</li>
  <li><code class="app-code app-code--inline">CHOA</code> - Charging order - Agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">CHOU</code> - Charging order - Unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">CHR</code> - Cancellation of home rights (HR4)</li>
  <li><code class="app-code app-code--inline">CN</code> - Change of name</li>
  <li><code class="app-code app-code--inline">CNC</code> - Change of name- chargee</li>
  <li><code class="app-code app-code--inline">CNL</code> - Cancellation of an unregistered noted lease (CN1)</li>
  <li><code class="app-code app-code--inline">COA</code> - Change of address for service</li>
  <li><code class="app-code app-code--inline">COAC</code> - Change of address for service - chargee</li>
  <li><code class="app-code app-code--inline">COP</code> - Charge of part</li>
  <li><code class="app-code app-code--inline">CUR</code> - Cancellation of notice of unregistered Rentcharge</li>
  <li><code class="app-code app-code--inline">DCLN</code> - Disclaimer - notification</li>
  <li><code class="app-code app-code--inline">DCLV</code> - Disclaimer - notice</li>
  <li><code class="app-code app-code--inline">DFL1</code> - New lease - other</li>
  <li><code class="app-code app-code--inline">DFL5</code> - Dispositionary first lease extension of a term</li>
  <li><code class="app-code app-code--inline">DFT</code> - Defect in title s64(1) LRA 2002</li>
  <li><code class="app-code app-code--inline">DIS</code> - Discharge of charge</li>
  <li><code class="app-code app-code--inline">DJP</code> - Death of a joint proprietor</li>
  <li><code class="app-code app-code--inline">DL</code> - Discontinuous lease - non-timeshare</li>
  <li><code class="app-code app-code--inline">DMR</code> - Disapplication of restriction (RX2)</li>
  <li><code class="app-code app-code--inline">DOG</code> - Deed of grant of easement</li>
  <li><code class="app-code app-code--inline">DP</code> - Discharge of part</li>
  <li><code class="app-code app-code--inline">DSP</code> - Death of a sole proprietor</li>
  <li><code class="app-code app-code--inline">EXR</code> - Extinguishment of rentcharge</li>
  <li><code class="app-code app-code--inline">LCBD</code> - Lease closure - by disclaimer</li>
  <li><code class="app-code app-code--inline">NRT</code> - Notice of rentcharge</li>
  <li><code class="app-code app-code--inline">PRO</code> - Provisions</li>
  <li><code class="app-code app-code--inline">RFN</code> - Deed of rectification</li>
  <li><code class="app-code app-code--inline">RNT</code> - Overriding lease granted under s.19</li>
  <li><code class="app-code app-code--inline">ROCC</code> - Release of covenants - cancellation (CN1)</li>
  <li><code class="app-code app-code--inline">ROCU</code> - Release of covenants - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">ROE</code> - Release of easements</li>
  <li><code class="app-code app-code--inline">RRD</code> - Removal of a right to determine</li>
  <li><code class="app-code app-code--inline">RUN</code> - Removal of unilateral notice (UN2)</li>
  <li><code class="app-code app-code--inline">RXN</code> - Restriction (non-standard wording) (RX1)</li>
  <li><code class="app-code app-code--inline">RXS</code> - Restriction (standard wording) (RX1)</li>
  <li><code class="app-code app-code--inline">SBC</code> - Sub charge</li>
  <li><code class="app-code app-code--inline">STVC</code> - Statutory vestings charge</li>
  <li><code class="app-code app-code--inline">STVL</code> - Statutory vestings land</li>
  <li><code class="app-code app-code--inline">UNN</code> - Unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">UPT</code> - Upgrade class of title (UT1)</li>
  <li><code class="app-code app-code--inline">VC</code> - Variation of charge</li>
  <li><code class="app-code app-code--inline">VLAN</code> - Variation of lease - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VLUN</code> - Variation of lease - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">VO</code> - Vesting order</li>
  <li><code class="app-code app-code--inline">VOC</code> - Variation of covenants</li>
  <li><code class="app-code app-code--inline">VOCA</code> - Variation of covenants - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VOCU</code> - Variation of covenants - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">VOE</code> - Variation of easements</li>
  <li><code class="app-code app-code--inline">VOEA</code> - Variation of easements - agreed notice (AN1)</li>
  <li><code class="app-code app-code--inline">VOEU</code> - Variation of easements - unilateral notice (UN1)</li>
  <li><code class="app-code app-code--inline">WDR</code> - Withdraw a restriction (RX4)</li>
</ul>

### <code>REMOVE_JP1</code> {.govuk-heading-s}

The only valid transaction type for the `REMOVE_JP1` application type is `JP1`. This must be the only transaction, and there must only be a single `JP1` transaction per application.

{% endcall %}

### Additional transaction details {.govuk-heading-s}

For certain transaction types, more detailed information is needed (via the `Transaction.details` field). This field can be one of several different types:

- `Transfer`  (dates must not be in the future)
- `Charge`  (dates must not be in the future)
- `Discharge`
- `AmountDetails`

The data below details which transactions require which details type. If a transaction is not listed, it does not require additional details.

<code>Transfer</code>

- `T` - Transfer for value
- `TNV` - Transfer (not for value or reverse premium)
- `TOSNV` - Transfer of share (not for value or reverse premium)
- `TSCNV` - Transfer subject to a charge (not for value or reverse premium)
- `TSCV` - Transfer subject to a charge for value

<code>Charge</code>

- `C` - Charge
- `COP` - Charge of part
- `SBC` - Sub charge


<code>Discharge</code>

- `DIS` - Discharge
- `DP` - Discharge of part


<code>AmountDetails</code>

- ASTT - Assent
- ASTC - Assent of charge
- APT - Appointment of new trustee
- ASSTTP - Assent (Transfer of part)
- CPVK - Compulsory purchase (property value known)
- CPVU - Compulsory purchase (property value unknown)
- DFL1 - New lease - other
- DFL3 - New lease - shared ownership
- DFL4 - New lease - right to buy or right to acquire
- DFL5 - Dispositionary first lease extension of a term
- DL - Discontinuous lease - non-timeshare
- DTL - Discontinuous lease - timeshare
- LCSD - Lease closure - surrender by deed (not for value or reverse premium)
- LCSDM - Lease closure - surrender by deed
- LCSDWT - Lease closure - surrender by deed with a transfer (not for value or reverse premium)
- LCSDMWT - Lease closure - surrender by deed (together with transfer)
- LCSOL - Lease closure - surrender by operation of law (not for value or reverse premium)
- LCSOLM - Lease closure - surrender by operation of law
- RNT - Overriding lease granted under s.19, Landlord & Tenant (Covenants) Act 1995
- TNVTP - Transfer (not for value or reverse premium) (Transfer of part)
- TOC - Transfer of charge
- TOSNVTP - Transfer of share (not for value or reverse premium) (Transfer of part)
- TOSTP - Transfer of share for value (Transfer of part)
- TOSV - Transfer of share for value
- TPS - Transfer under power of sale
- TPSTP - Transfer under power of sale (Transfer of part)
- TRM - Transfer by operation of law on death
- TSCNVTP - Transfer subject to a charge (not for value or reverse premium) (Transfer of part)
- TSCTP - Transfer subject to a charge for value (Transfer of part)
- TTP - Transfer for value (Transfer of part)
- TVR - Transfer for value RTB/RTA
- TVRTP - Transfer for value RTB/RTA (Transfer of part)
- VO - Vesting order

### Title types {.govuk-heading-s}

Titles included as part of submission have a `type` field that informs HMLR how to process the application. This type depends on the application type, and the usage of the title within the application.

### <code>REGISTER_UPDATE</code> and <code>REMOVE_JP1</code> application types {.govuk-heading-s}

Only title types of `REGISTER_TITLE` are supported.

### <code>TRANSFER_OF_PART</code> application types {.govuk-heading-s}

The following title types are supported:

- `TRANSFEROR_TITLE` - titles related to the transferor(s) on the application
- `ADDITIONAL_TITLE` - any other titles on the application

### <code>DISPOSITIONARY_FIRST_LEASE</code> application types {.govuk-heading-s}

The following title types are supported:

- `LANDLORD_TITLES` - titles related to the landlord(s) on the application
- `ADDITIONAL_TITLE` - any other titles on the application

For a lease extension application (where the transaction type is `DFL5` Dispositionary first lease extension of a term) a single title with type `TENANT_TITLE` must also be provided, which is related to the tenant on the application.

### Change of name / Death of a joint proprietor (DJP) {.govuk-heading-s}

HMLR will not accept applications where the registered proprietor information does not match the register (in the case of a change of name, or a death of a joint proprietor). The relevant transaction type must be applied for (ie. Change of name or DJP) with the corresponding evidence attached.

### Party roles {.govuk-heading-s}

Each party included in an application should be given a party role for each transaction it is used in. Parties can be given the following roles: 

- `ATTORNEY`
- `TRANSFEROR`
- `TRANSFEREE`
- `LENDER`
- `BORROWER`
- `PERSONAL_REPRESENTATIVE`
- `ASSENTOR`
- `LANDLORD`
- `TENANT`

A party may be given different roles in different transactions. A party must not be used for multiple party roles within a single transaction, with the exception of the following transactions: ASTT, ASSTTP, ASTC, TOSNV, TOSNVTP, TOSTP, TOSV 

### Capacity fields {.govuk-heading-s}

The capacity field is a data item within the party role object. The capacity field must be provided for Landlords, Tenants and Transferors when they are added as additional parties to transactions. It can be provided for any other party role, but this is optional.

The options for the capacity field are: 

- `REGISTERED_PROPRIETOR`
- `ENTITLED_REGISTERED_PROPRIETOR`
- `ADDITIONAL_TRUSTEE`
- `INSOLVENCY_PRACTITIONER`
- `RECEIVER`
- `DEPUTY`
- `GUARDIAN`
- `PERSONAL_REPRESENTATIVE`
- `NOT_REQUIRED`

Example request for capacity field:

“Select the capacity the Transferor is acting in. You’ll need to evidence the capacity to act and check whether ID evidence will be required.”

The capacity field is currently optional, but it may become mandatory in the future.</p>

{{ govukInsetText({
  text: "Field type: This field is a type String, with a set of enumerated values."
}) }}

{% call govukDetails({summaryText: "Acceptable values"}) %}

The following values are acceptable:

{{ govukTable({
  caption: "Transaction/document mapping",
  captionClasses: "govuk-table__caption--m",
  head: [{ text: "Transaction type code" }, { text: "Document type code" }, { text: "Document class code" }],
  rows: [
    [{ text: "ADDITIONAL_TRUSTEE" },{ text: "Trustee" },{ text: "For example, for the purposes of over-reaching" }],
    [{ text: "DEPUTY" },{ text: "" },{ text: "Appointed under the Mental Capacity Act 2005" }],
    [{ text: "ENTITLED_REGISTERED_PROPRIETOR" },{ text: "" },{ text: "Person entitled to be registered as proprietor" }],
    [{ text: "GUARDIAN" },{ text: "" },{ text: "Appointed under the Guardianship (Missing Persons) Act 2017" }],
    [{ text: "INSOLVENCY_PRACTITIONER" },{ text: "Trustee" },{ text: "In bankruptcy, liquidator, supervisor, administrator or administrative receiver appointed under the Insolvency Act 1986" }],
    [{ text: "PERSONAL_REPRESENTATIVE" },{ text: "" },{ text: "Such as an executor, who assents or transfers the land or charge" }],
    [{ text: "RECEIVER" },{ text: "" },{ text: "Appointed under the Law of Property Act 1925" }],
    [{ text: "REGISTERED_PROPRIETOR" },{ text: "The proprietor is registered" },{ text: "Default for those already on the Land Register. Applies to any manually entered details" }]
  ]})
}}
{% endcall %}

Example:

The following JSON extract begins at the transactions node for an application’s submission. It is taken from the open API specification Exhaustive Example.

<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
"transactions": {
  "discharge-transaction-reference": {
    "type": "DIS",
    "documents": [
      "document-reference"
    ],
    "party_roles": [
      {
        "party_reference": "private-individual-reference",
        "role": "ATTORNEY",
        "capacity": "REGISTERED_PROPRIETOR"
      }
    ],
    "details": {
      "type": "DISCHARGE",
      "discharge_submission_type": "ATTACHED"
    },
    "fee_in_pence": 0,
    "relates_to_new_title": false,
    "priority": 1,
    "title_references": [
      "title-ref"
    ]
  }
}
```

### Attorneys {.govuk-heading-s}

The attorney field is a data item within the party role object. It should be used to add a party reference for the attorney acting on behalf of that party.

### Representation {.govuk-heading-s}

All parties require a representation type. The representation type cannot be `NOT_REQUIRED` for Borrowers, Transferees and Transferors. The options are as follows:


<ul class="govuk-list govuk-list--bullet">
- `LODGING_CONVEYANCER` - the conveyancer lodging the application
- `OTHER_CONVEYANCER` - the party is represented by another conveyancer. Details will be included with the application
- `NOT_REPRESENTED` - the party is not represented by a conveyancer and identity evidence has been provided
- `NOT_REQUIRED` - the party is not required to have a representation type. This should never be selected for Borrowers, Transferees or Transferors

## List of validation rules {.govuk-heading-m}

During application submission, several validation rules will run against the data provided to ensure it is valid. A number of these rules run synchronously before an `application_request_id` is returned and they are documented in the schema documentation. Other rules run asynchronously, after the `application_request_id` has been returned.

## Bypass validation {.govuk-heading-s}

If an application fails validation, users should rectify validation errors to avoid the need for bypassing, for example by adding the correct transactions (eg. DJP or Change of name for name discrepancies, and RX1 for restrictions within a transfer). Incorrect use of bypass rules will delay the processing of an application and could result in requisition points.

For exceptions to specific rules, we provide a `bypass_validation` array that applies to specific objects, as defined by the `pointer`.

Usage of validation bypass will be monitored. To use the bypass functionality, the following information is required:

- `validation_type` - the type of validation rule you want to bypass. This is returned in the <code class="app-code app-code--inline">type</code> field from any validation error
- `validation_pointer` - the location of the object in the payload structure. This is returned in the <code class="app-code app-code--inline">pointer</code>field from some validation errors
- `reason` - the specific reason the bypass was required. Must be one of:
    - `DISAGREE_WITH_REGISTER` - the validation rule is incorrect because the data on the register is incorrect
    - `HMLR_DATA_INCORRECT_OR_OUTDATED` - there is missing, outdated or incorrect data in a comparison database
    - `EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES` - the application is valid. An exception should apply but is not covered by current business rules
- `comment` - a user inputted description of why the validation is being bypassed

Bypassing validation can only be done for specific rules, and each rule is only permitted to have specific reasons for bypassing the validation. Information about which validation types support bypassing and which reasons are valid for those types are defined below:-color:

<!--LG: Refactored to markdown up to here-->

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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">all-proprietors-matched-to-borrowers</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">DISAGREE_WITH_REGISTER</code><br><code
          class="app-code app-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">lender-name-matches-records</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">mdref-on-record</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">all-proprietors-matched-to-transferors</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">DISAGREE_WITH_REGISTER</code><br><code
          class="app-code app-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">transferee-has-a-valid-address</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">all-mandatory-documents-provided</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">identity-evidence-has-type</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">required-identity-evidence-provided</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">EXCEPTION_NOT_COVERED_BY_BUSINESS_RULES</code></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">unique-lender</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">no-duplicate-lender-refs-on-charge </code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">address-for-service-postcode-exists </code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">HMLR_DATA_INCORRECT_OR_OUTDATED</code></td>
    </tr>
  </tbody>
</table>
<p class="govuk-body">For an example; if after submitting an application the following error was received:</p>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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
<p class="govuk-body">The additional provisions code is specific to Tranfer transactions and is part of the Transfer object. For transfers, one of the following Additional Provision code options must be selected:</p>
<ol class="govuk-list govuk-list--number">
  <li>No provisions</li>
  <li>Manual TR1 form</li>
  <li>Details entered</li>
</ol>
<p class="govuk-body">For option three, details must be entered in the <code class="app-code app-code--inline">additional_provisions</code> field.</p>
<p class="govuk-body">Error types for this validator will be provided at a later date.</p>
<h3 class="govuk-heading-s">Address for service validation</h3>
<p class="govuk-body">Lenders and transferees must have an address for service option of “provided address”, with the exception of lenders which are only on a discharge transaction, or which appear on charge transactions with an MDRef.</p>
<p class="govuk-body">If a party has an address for service option of “provided address”, at least one postal address must be provided. A maximum of three addresses can be provided per party. </p>
<p class="govuk-body">The customer provided address will be validated.</p>


<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">An address for service validation error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">address-for-service-postcode-exists</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">Postcode provided does not exist in our records </code></td>
    </tr>
      <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">address-for-service-option-is-valid</code></td>
      <td class="govuk-table__cell">
        <code class="app-code app-code--inline">Each lender party must provide an address for service option</code></br>
        <code class="app-code app-code--inline">Each lender party must have an address for service option of PROVIDED_ADDRESS, unless an MD Ref is provided</code><br>
        <code class="app-code app-code--inline">Each transferee party must have an address for service option of PROVIDED_ADDRESS </code> <br>
        <code class="app-code app-code--inline">Each party must not have more than three addresses </code><br>
        <code class="app-code app-code--inline">A party with an address for service option of PROVIDED_ADDRESS must contain at least one address of the following types: UK, OVERSEAS, PO_BOX, BFPO </code>
        </td>
    </tr>
    </tbody>
    </table>

<h3 class="govuk-heading-s">Applicant validation</h3>
<p class="govuk-body">Applicant must not have a party type of <code class="app-code app-code--inline">UNKNOWN</code>.</p>

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Applicant validation error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">applicant-not-unknown-type</code></td>
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">Applicant must not be of type UNKNOWN</code></td>
    </tr>
    </tbody>
    </table>


<h3 class="govuk-heading-s">Borrower name validation</h3>
<p class="govuk-body">For charge transactions, all registered proprietors must match to a borrower in the transaction. This does not apply when a transfer transaction is included in the application.</p>
<p class="govuk-body">If any registered proprietors are not matched, then the appropriate transaction (ie. Change of name or DJP) must be added to the application.</p>
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">all-proprietors-matched-to-borrowers</code></td>
      <td class="govuk-table__cell">Can apply to one of the following:<ul>
          <li>There must be at least as many borrowers as there are proprietors. There can be more, but no fewer
          </li>
          <li>A proprietor was not matched to a borrower and the corresponding evidence was not attached. Where there has been a change of name or the death of a joint proprietor and the register needs updating, the user must add the correct transaction and provide the appropriate evidence 
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<h3 class="govuk-heading-s">Borrower representation validation</h3>
<p class="govuk-body">Representation type must be provided for the borrower role type. The respresentation type must not be <code class="app-code app-code--inline">NOT-REQUIRED</code>.</p>
<p class="govuk-body">Error types for this validator will be provided at a later date.</p>


<h3 class="govuk-heading-s">Borrower validation</h3>
<p class="govuk-body">For a charge or sub-charge transaction, at least one borrower must be present.</p>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Borrower validation error types
  </caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">transaction-has-valid-borrower</code></td>
      <td class="govuk-table__cell">Sub-charge transactions or charge transactions
        unaccompanied by a transfer transaction must have a borrower</td>
    </tr>
  </tbody>
</table>
<h3 class="govuk-heading-s">Capacity validation</h3>
<p class="govuk-body">The capacity field must be provided for Landlords, Tenants and Transferors when they are added as additional parties to transactions.</p>
<p class="govuk-body">Error types for this validator will be provided at a later date.  </p>

<h3 class="govuk-heading-s">Charge amount validation</h3>
<p class="govuk-body">All charge transactions must have a charge value of 0 or greater.</p>

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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">charge-must-have-non-negative-value</code></td>
      <td class="govuk-table__cell">Charge value must be 0 or greater</td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Charge date validation</h3>
<p class="govuk-body">Charge date must be present and not a date in the future. Customer provided date must
  match the date in the charge deed.</p>


<h3 class="govuk-heading-s">Charge fee validation</h3>
<p class="govuk-body">The fee for charge transactions must be more than or equal to 2,000 pence, unless it is accompanied by a Scale Fee Transaction. If a charge is accompanied by a Scale Fee transaction then the charge fee must be 0. </p>

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Charge fee validation error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">CHARGE-FEE</code></td>
      <td class="govuk-table__cell">Fee for a charge transaction must be at least 2,000 pence <br>
Fee must be 0 pence for a charge transaction accompanied by a Scale Fee transaction </td>
    </tr>
  </tbody>
</table>

<h3 class="govuk-heading-s">Company number validation</h3>
<p class="govuk-body">For any party of type UKCompany, the data item <code class="app-code app-code--inline">company_number</code> is required, except when any of the following are true: </p>
<ul class="govuk-list govuk-list--bullet">
<li>The party is being used as a lender on a transaction with a valid MDRef</li>
<li>The party is being used as a borrower</li>
</ul>
<p class="govuk-body">In these cases the <code class="app-code app-code--inline">company_number</code> is optional.</p>

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Company number validation error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">uk-company-has-company-number</code></td>
      <td class="govuk-table__cell">A party with type UKCompany didn’t include a company number and it wasn’t a borrower or a lender with a valid MDRef for the transaction on which it is being used as a lender </td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Consideration type validation</h3>
<p class="govuk-body">For Transfer transactions, a consideration type of either Monetary Value, No Monetary Value, or
  Other must be present.</p>
<p class="govuk-body">When consideration type is <code class="app-code app-code--inline">MONETARY_VALUE</code>, a transfer value must be present. When consideration type is <code class="app-code app-code--inline">OTHER</code>, a consideration description must be provided. </p>
<p class="govuk-body">The consideration type must be <code class="app-code app-code--inline">MONETARY_VALUE</code> for the following transactions: T, TOSV, TSCV. </p>
<p class="govuk-body">The consideration type must be either <code class="app-code app-code--inline">NO_MONETARY_VALUE</code> or <code class="app-code app-code--inline">OTHER</code> for the following transactions: TNV, TOSNV, TSCNV </p>

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Consideration type validation error types
  </caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">consideration-type-is-valid </code></td>
      <td class="govuk-table__cell">Transactions type was paired with an invalid consideration type  <br>
 
A transfer value must be provided when consideration type is <code class="app-code app-code--inline">MONETARY_VALUE</code> </td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Conveyancers certificate validation</h3>
<p class="govuk-body">Checks the <code class="app-code app-code--inline">conveyancers_certificate</code> field is set for any
  document of type <code class="app-code app-code--inline">CERT_REG_CH</code>.</p>

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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">conveyancers-certificate-provided</code></td>
      <td class="govuk-table__cell">Conveyancers certificate was not provided for Certificate
        of registration issued by Companies House documents</td>
    </tr>
  </tbody>
</table>

<h3 class="govuk-heading-s">Customer ID validation</h3>
<p class="govuk-body">The provided customer ID must exist in the HMLR system.</p>

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Customer ID validation error types
  </caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">customer-id-exists </code></td>
      <td class="govuk-table__cell">The provided customer ID was not found in HMLR internal systems </td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Customer type validation</h3>
<p class="govuk-body">Customer type of conveyancer or non-conveyancer must be present.</p>



<h3 class="govuk-heading-s">Declaration of trust validation</h3>
<p class="govuk-body">A declaration of trust must be provided for transfers with two or more transferees.</p>
<p class="govuk-body">The "trust declaration type" field must include one of the following options:</p>
<ol class="govuk-list govuk-list--number">
  <li>Joint Tenants</li>
  <li>Tenants in Common</li>
  <li>Trust Details</li>
  <li>Form JO</li>
</ol>
<p class="govuk-body">For option three, the "trust details" field must be provided. For option four, HMLR form JO must be provided as an attachment.</p>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Declaration of trust validation error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
  </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code class="app-code app-code--inline">declaration-of-trust</code></td>
      <td class="govuk-table__cell">The trust declaration type must be provided<br><br>The details of trust must be provided where the “trust details” option was selected<br><br>The JO form must be provided where “Form JO was provided” </td>
    </tr>
  </tbody>
</table>

<h3 class="govuk-heading-s">DFL5 validation</h3>
<p class="govuk-body">For DFL5 applications (Dispositionary first lease extension of a term) there must be at least one title with type <code class="app-code app-code--inline">LANDLORD_TITLE</code> and a single title with type <code class="app-code app-code--inline">TENANT_TITLE</code>, which is related to the tenant on the application. </p>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">DFL5 validation error types </caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
  </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code class="app-code app-code--inline">lease-extension-is-valid</code></td>
      <td class="govuk-table__cell">DFL5 transactions must contain exactly one tenant title <br><br>DFL5 transactions must contain at least one landlord titled</td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Discharge fee validation</h3>
<p class="govuk-body">The fee provided for discharge transactions must be 0. </p>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Discharge fee validator error types  </caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
  </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code class="app-code app-code--inline">discharge-fee-zero</code></td>
      <td class="govuk-table__cell">Discharge transaction must have a fee of 0 </td>
    </tr>
  </tbody>
</table>





<h3 class="govuk-heading-s">Disclosable overriding interests validation</h3>
<p class="govuk-body">When <code
    class="app-code app-code--inline">disclosable_overriding_interests</code> is set to <code
    class="app-code app-code--inline">true</code> on any title, a <code
    class="app-code app-code--inline">FORM_DI</code> document must be provided with the application.</p>
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">di-form-required</code></td>
      <td class="govuk-table__cell">A Disclosable Overriding Interests (DI) Form is required
        but has not been provided</td>
    </tr>
  </tbody>
</table>

<h3 class="govuk-heading-s">Document type validation</h3>
<p class="govuk-body">The documents mentioned in the order/submission request must have the same <code
          class="app-code app-code--inline">DocumentType</code> as those uploaded.</p>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Document type validation
    error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">document-type-valid </code></td>
      <td class="govuk-table__cell">The document type submitted was not the same as the document type uploaded  </td>
    </tr>
  </tbody>
</table>

### Document validation {.govuk-heading-s}

<p class="govuk-body">The file size of documents must be below 40mb (but must not have a zero size). Files must be either PDF, GIF, TIFF or JPG format. The file must not be encrypted or password protected. If a TIFF file, it must be a valid TIFF file. </p>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Document validation
    error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">document-valid</code></td>
      <td class="govuk-table__cell">This could be because the document is too large, of zero size, the wrong format, an invalid TIFF file, encrypted or password protected  </td>
    </tr>
  </tbody>
</table>



<h3 class="govuk-heading-s">Evidence of consent to restriction warning</h3>
<p class="govuk-body">This warning is displayed when there is a restriction on a title and evidence of consent to that restriction has not been provided. If it is not provided but it is required, there will be delays to the application. </p>



<h3 class="govuk-heading-s">Evidence of discharge warning</h3>
<p class="govuk-body">This warning is displayed when evidence of discharge may be required, for example when the application is a transfer and a charge exists on the register, or if certain entries are present on the register. If evidence of discharge is not provided and early completion cannot be applied, there will be delays to the application.  </p>




<h3 class="govuk-heading-s">Identity evidence validation</h3>
<p class="govuk-body">Identity evidence type must be provided for each party with a representation type of <code
          class="app-code app-code--inline">NOT_REPRESENTED</code> - view
  <a class="govuk-body govuk-link"
    href="https://www.gov.uk/government/publications/evidence-of-identity-conveyancers/practice-guide-67-evidence-of-identity-conveyancers"
    rel="noreferrer noopener" target="_blank">Practice Guide 67 (opens in new tab)</a>.</p>
    <p class="govuk-body">There must be at least as many evidence documents as the number of parties that have indicated they are providing evidence. </p>


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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">identity-evidence-has-type</code></td>
      <td class="govuk-table__cell">One of the following options must be provided for unrepresented parties:
        <ol class="govuk-list govuk-list--number">
          <li>Evidence</li>
          <li>Verified</li>
          <li>Not required</li>
        </ol>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">required-identity-evidence-provided</code></td>
      <td class="govuk-table__cell">At least one HMLR identity form must be provided for each
        unrepresented party</td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">JP1 validation</h3>
<p class="govuk-body">If the application type is “Remove JP1” then there must be exactly one transaction within that application. This must be a JP1 transaction. There must be exactly one title number in this application. A JP1 reference must be provided and this must match a JP1 reference within our records that is attached to the title in the application. </p>
  <p class="govuk-body">If the application type is not “Remove JP1”, there must not be a JP1 transaction present. A JP1 reference must not be provided.  </p>
   <p class="govuk-body">Error type for this validator will be provided at a later date. </p>


<h3 class="govuk-heading-s">Lease transactions party role validation</h3>
<p class="govuk-body"> 
For the following lease transactions, there must be at least one tenant and one landlord party: 
</p>
  <ul class="govuk-list govuk-list--bullet">
<li>DFL1 </li>
<li>DFL3  </li>
<li>DFL4  </li>
<li>DFL5  </li>
<li>DL  </li>
<li>DTL  </li>
  </ul>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Lease transactions party role validation error types 
</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">lease-extension-has-landlord-and-tenant </code></td>
      <td class="govuk-table__cell">The lease transaction is missing a landlord and/or tenant party </td>
    </tr>
    </tbody>
    </table>




<h3 class="govuk-heading-s">Lender name validation</h3>
<p class="govuk-body">When an MD reference is provided, a charge can only have one lender party. A charge without an MD reference may have more than one lender party. These lenders must be unique parties.  </p>

<p class="govuk-body">Warning: When an MD reference is provided, the lender name associated with the charge must match the lender name associated with the MD reference in HMLR systems.</p>
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">unique-lender</code></td>
      <td class="govuk-table__cell">Each charge should only have one lender</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">lender-name-matches-records</code></td>
      <td class="govuk-table__cell">Warning: The lender name provided in the application data must
        match that recorded for the lender in our MD reference database</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">no-duplicate-lender-refs-on-charge</code></td>
      <td class="govuk-table__cell">Lender references must be unique</td>
    </tr>
  </tbody>
</table>



<h3 class="govuk-heading-s">Lender validation</h3>
<p class="govuk-body">All charges require at least one party with the role type of lender. The lender address is not required if a valid MD reference is provided. If the charge does not have an MD reference, a full postal address for the lender is required. </p>

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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">charge-has-valid-lender</code></td>
      <td class="govuk-table__cell">This could be due to:
      <ul class="govuk-list govuk-list--bullet"><li>no lenders on the charge application</li><li>the lender having an invalid address for service when an MD reference was not provided. At least one valid full postal address must be provided</li></ul></td>
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">all-mandatory-documents-provided</code></td>
      <td class="govuk-table__cell">Each transaction must have the mandatory deed(s) or document(s)
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">mdref-on-record</code></td>
      <td class="govuk-table__cell">The MD reference supplied cannot be found in our database
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">address-for-service-option-is-valid</code></td>
      <td class="govuk-table__cell">The address for service option provided for the party is
        invalid</td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Representation type validation</h3>
<p class="govuk-body">One of the following options must be selected: </p>
<ul class="govuk-list govuk-list--bullet"><li>Lodging conveyancer </li>
<li>Other conveyancer </ul>
<p class="govuk-body">The party roles of borrower, transferor and transferee cannot have the representation type of <code
          class="app-code app-code--inline">NOT_REQUIRED</code>.</p>  
 
<p class="govuk-body">If the application lodger is not a conveyancer, then no parties can use the <code
          class="app-code app-code--inline">LODGING_CONVEYANCER</code> representation type. </p>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Representation validation error
    types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">party-representation-type-is-valid</code></td>
      <td class="govuk-table__cell">For an application lodged by a non-conveyancer, no representation type may be <code
          class="app-code app-code--inline">LODGING_CONVEYANCER</code> </td>
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">submission-warning-understood</code></td>
      <td class="govuk-table__cell">A legal declaration is made when submitting an application
        with regards dishonesty etc. The conveyancer must agree to comply with the warning</td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Title number validation</h3>
<p class="govuk-body">The title number in the application must match a title number in the land register. The title number must be valid - view the <code class="app-code app-code--inline">TITLE_NOT_VALID</code> error type below for information on valid titles. For multi-title applications please provide each title once. </p>
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">unknown-title-number</code></td>
      <td class="govuk-table__cell">Title number not matched to HMLR systems</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">title-must-be-valid</code></td>
      <td class="govuk-table__cell">Can apply to one of the following:
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
<p class="govuk-body">Title scopes of “whole” must not have a part description. Title scopes of “part” must have a part description. 
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">title-scope-is-valid</code></td>
      <td class="govuk-table__cell">
        <ul class="govuk-list govuk-list--bullet">
          <li>Title scopes of ‘part’ must have a part description</li>
          <li>Title scopes of ‘whole’ must not have a part description</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Title type validation</h3>
<p class="govuk-body">If the title type provided for a title number is <code class="app-code app-code--inline">LANDLORD_TITLE</code>, the title tenure on our records for title number must be “freehold”. </p>
 
<p class="govuk-body">If the title type provided for a title number is <code class="app-code app-code--inline">TENANT_TITLE</code>, the title tenure on our records for the title number must be “leasehold”. </p>
 
<p class="govuk-body">If the title type provided for a title number is <code class="app-code app-code--inline">REGISTER_TITLE</code>, <code class="app-code app-code--inline">TRANSFEROR_TITLE</code>, or <code class="app-code app-code--inline">ADDITIONAL_TITLE</code>, the title tenure on our records for the title number can be either “freehold” or “leasehold”. </p>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Title type validation error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">title-type-matches-tenure
	</code></td>
      <td class="govuk-table__cell">The title type provided does not have the appropriate tenure in our records
      </td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Transfer amount validation</h3>
<p class="govuk-body">Value must be provided, either as an exact value or a value band (where transfer is not for monetary value).</p>


<h3 class="govuk-heading-s">Transfer date validation</h3>
<p class="govuk-body">The transfer date must match what is on the transfer deed to be correct. It must not be in the future.</p>

<h3 class="govuk-heading-s">Transfer number validation</h3>
<p class="govuk-body">An application must have a maximum of one transfer transaction. </p>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Transfer number validation error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">order-contains-one-transfer
	</code></td>
      <td class="govuk-table__cell">Order must contain at most one transfer transaction</td>
    </tr>
    
  </tbody>
</table>



<h3 class="govuk-heading-s">Transferee validation</h3>
<p class="govuk-body">All Transfer transactions must have at least one transferee present. Each transferee must have a representation type that is not <code
          class="app-code app-code--inline">NOT_REQUIRED</code>.  </p>
 
<p class="govuk-body">At least one valid postal address must be provided as the address for service. If overseas, the address must have a country. </p>
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">transfer-has-transferee</code></td>
      <td class="govuk-table__cell">A transfer involves a change of proprietor(s). If making
        an application for a transfer, there must be at least one transferee</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">transferee-has-valid-address</code></td>
      <td class="govuk-table__cell">At least one postal address must be provided in the
        application</td>
    </tr>
  </tbody>
</table>



<h3 class="govuk-heading-s">Transferor name validation</h3>
<p class="govuk-body">For transfer transactions, all registered proprietors must match to a transferor in the transaction. If a registered proprietor does not match a transferor then the appropriate transaction (i./e Change of Name or Death of Joint Proprietor) must be added to the application.</p>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Transferor name error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">all-proprietors-matched-to-transferors </code></td>
      <td class="govuk-table__cell">There must be at least as many transferors as there are proprietors. There can be more, but no fewer <br><br> A proprietor was not matched to a transferor and the corresponding evidence was not attached. Where there has been a change of name or the death of a joint proprietor and the register needs updating evidence must be provided </td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Transferor validation</h3>
<p class="govuk-body">There must be at least one transferor name on each transfer transaction, with the exception of TRM transactions.</p>
<p class="govuk-body">Each transferor must have a representation type that is not
  <code class="app-code app-code--inline">NOT_REQUIRED</code>.
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
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">transfer-has-transferors</code></td>
      <td class="govuk-table__cell">A transfer involves a change of proprietor(s). If making
        an application for a transfer, there must be at least one transferor</td>
    </tr>
  </tbody>
</table>


<h3 class="govuk-heading-s">Value bands</h3>
<p class="govuk-body">Value bands specify the approximate value of a property, or the equity being transferred,
  where the exact value is not known. The value band fields can be found on the <code
    class="app-code app-code--inline">Transfer</code> and <code
    class="app-code app-code--inline">AmountDetails</code> objects in the API specification.</p>
<p class="govuk-body">The valid value bands are as follows (in pounds):</p>
<ul class="govuk-list govuk-list--bullet">
  <li><code class="app-code app-code--inline">lower_band</code>: 0, <code
      class="app-code app-code--inline">upper_band</code>: 100,000</li>
  <li><code class="app-code app-code--inline">lower_band</code>: 100,001, <code
      class="app-code app-code--inline">upper_band</code>: 200,000</li>
  <li><code class="app-code app-code--inline">lower_band</code>: 200,001, <code
      class="app-code app-code--inline">upper_band</code>: 500,000</li>
  <li><code class="app-code app-code--inline">lower_band</code>: 500,001, <code
      class="app-code app-code--inline">upper_band</code>: 1,000,000</li>
  <li><code class="app-code app-code--inline">lower_band</code>: 1,000,001, <code
      class="app-code app-code--inline">upper_band</code>: <code
      class="app-code app-code--inline">null</code></li>
</ul>
<p class="govuk-body">Value bands are only applicable to the following transaction types:</p>
<ul class="govuk-list govuk-list--bullet">
  <li><code class="app-code app-code--inline">APT</code> - Appointment of new trustee</li>
  <li><code class="app-code app-code--inline">ASTT</code> - Assent</li>
  <li><code class="app-code app-code--inline">ASSTTP</code> - Assent (Transfer of part)</li>
  <li><code class="app-code app-code--inline">TNV</code> - Transfer (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">TNVTP</code> - Transfer (not for value or reverse premium) (Transfer of part)</li>
  <li><code class="app-code app-code--inline">TOSNV</code> - Transfer of share (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">TOSNVTP</code> - Transfer of share (not for value or reverse premium) (Transfer of part)</li>
  <li><code class="app-code app-code--inline">TRM</code> - Transfer by operation of law on death</li>
  <li><code class="app-code app-code--inline">TSCNV</code> - Transfer subject to a charge (not for value or reverse premium)</li>
  <li><code class="app-code app-code--inline">TSCNVTP</code> - Transfer subject to a charge (not for value or reverse premium) (Transfer of part)</li>
  <li><code class="app-code app-code--inline">VO</code> - Vesting order</li>
</ul>
<p class="govuk-body">There are several rules regarding value band usage:</p>
<ul class="govuk-list govuk-list--bullet">
  <li>Both <code class="app-code app-code--inline">value</code> (i.e. value of equity being
    transferred) and <code class="app-code app-code--inline">full_value_of_property</code> must be either value bands, or exact values</li>
  <li>The <code class="app-code app-code--inline">full_value_of_property_band</code> must be greater than or equal to the <code class="app-code app-code--inline">value_band</code> (i.e. the value of equity being transferred)</li>
</ul>
<div class="govuk-!-padding-bottom-6"></div>
<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--s">Value band error types</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error type</th>
      <th scope="col" class="govuk-table__header">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell"><code
          class="app-code app-code--inline">full-value-of-property-or-band-is-valid 
	</code></td>
      <td class="govuk-table__cell">	
Full value of property must be greater than or equal to property value<br><br>Full value of property band must be greater than or equal to property value band<br><br>Value bands were used for a transaction type that does not allow value band usage </td>
    </tr>
  </tbody>
</table>
<div class="govuk-!-padding-bottom-6"></div>
<div>
  <p class="govuk-body">Example:</p>
  <div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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
<h3 class="govuk-heading-s"><code>application.accepted-priority-protected</code> notification</h3>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": [
    {
      "notification_id": "7788bfb3-02f2-4c9b-be58-94e9df010ac8",
      "created_datetime": "2025-02-25T16:17:19.120585661Z",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/accepted-priority-protected.json",
      "notification_type": "application.accepted-priority-protected",
      "subject_type": "APPLICATION",
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
<h3 class="govuk-heading-s"><code>application.validation-failed</code> notification</h3>
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": [
    {
      "notification_id": "7788bfb3-02f2-4c9b-be58-94e9df010ac8",
      "created_datetime": "2025-02-25T16:17:19.120585661Z",
      "payload_schema": "https://landregistry.github.io/bgtechdoc/schemas/v1/application/validation-failed.json",
      "notification_type": "application.validation-failed",
      "subject_type": "APPLICATION",
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
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
    "data": {
        "type": "REGISTER_UPDATE",
        "submission_warning_understood": true,
        "customer_reference": "MyApplication",
        "application_lodger": {
            "email": "user@company.com",
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
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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
<div class="code-wrapper">{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

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