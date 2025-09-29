---
layout: guidance.njk

title: Submit an application API test stubs

notlive: 

eleventyNavigation:
  key: Submit an application API v0.3 test stubs
  parent: Submit an application API v0.3

versions:
  - value: "1.0"
    text: "v1.0 (latest)"
  - value: "0.3"
    text: "v0.3"
    selected: 
    
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
    text: "Scenario 1: Submit a single charge"
    href: '#scenario-1'
  - theme: Contents
    text: "Scenario 2: Submit a single transfer"
    href: '#scenario-2'
  - theme: Contents
    text: "Scenario 3: Submit an application with Level 1 validation errors"
    href: '#scenario-3'
  - theme: Contents
    text: "Scenario 4: Submit an application with Level 2 validation errors"
    href: '#scenario-4'
---
{% from "govuk/components/button/macro.njk" import govukButton %}

HMLR does not currently provide a test environment for integrators using our Business Gateway APIs. Instead, we’ve provided example code for different scenarios to demonstrate what you should expect to see when developing your own services.

Base URL: `https://bgtest.landregistry.gov.uk/bg2test/api`

--- {.govuk-section-break--l}

## Scenario 1: Submit a single charge {.govuk-heading-m #scenario-1}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v0/applications`

Headers:

- `Authorization: <any-value>`
- `Idempotency-Key: <any-value>`

Note: The idempotency key should be unique for each request (this is not enforced by the stubs).

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "submission_warning_understood": ,
    "applicants": [
      "Borrower1",
      "Borrower2"
    ],
    "customer_reference": "CustomerRef",
    "documents": {
      "Deed": {
        "type": "MRTG_DEED",
        "document_id": "0d7bd3a5-1aec-4862-9fc9-f796dfc11d35",
        "document_metadata": {
          "certification_statement_type": "CERTIFIED",
          "document_filename": "Deed.pdf"
        }
      }
    },
    "application_lodger": {
      "email": "valid.email@landregistry.gov.uk",
      "type": "CONVEYANCER"
    },
    "parties": {
      "Borrower1": {
        "address_for_service_option": "NOT_REQUIRED",
        "representation_type": "LODGING_CONVEYANCER",
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "Tony",
          "surname": "Bonito"
        }
      },
      "Borrower2": {
        "address_for_service_option": "NOT_REQUIRED",
        "representation_type": "LODGING_CONVEYANCER",
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "Toni",
          "surname": "Bonito"
        }
      },
      "TheBank": {
        "address_for_service_option": "NOT_REQUIRED",
        "representation_type": "LODGING_CONVEYANCER",
        "details": {
          "type": "UK_COMPANY",
          "company_number": "12345",
          "organisation_name": "Albion Home Loans Limited"
        }
      }
    },
    "titles": {
      "MS305610": {
        "disclosable_overriding_interests": "false",
        "title_number": "MS305610",
        "scope_details": {
          "scope": "WHOLE",
          "part_description": null
        },
        "title_type": "REGISTER_TITLE"
      }
    },
    "transactions": {
      "Charge": {
        "details": {
          "type": "CHARGE",
          "date": "2024-01-01",
          "mdref": "MD006A",
          "value": 120000
        },
        "documents": [
          "Deed"
        ],
        "priority": 1,
        "fee_in_pence": 3000,
        "party_roles": [
          {
            "party_reference": "Borrower1",
            "role": "BORROWER"
          },
          {
            "party_reference": "Borrower2",
            "role": "BORROWER"
          },
          {
            "party_reference": "TheBank",
            "role": "LENDER"
          }
        ],
        "type": "C",
        "title_references": [
          "MS305610"
        ]
      }
    },
    "type": "REGISTER_UPDATE"
  }
}
```
</div>

### Response {.govuk-heading-s .govuk-!-margin-top-6}

Status: `202`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "application_request_id": "b3ac19be-2b6d-4b8a-971c-e758b0e8e790"
  }
}
```
</div>

--- {.govuk-section-break--l}

## Scenario 2: Submit a single transfer {.govuk-heading-m #scenario-2}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v0/applications`

Headers:

- `Authorization: <any-value>`
- `Idempotency-Key: <any-value>`

Note: The idempotency key should be unique for each request (this is not enforced by the stubs).

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "submission_warning_understood": ,
    "customer_reference": "CustomerRef",
    "addresses": {
      "transferee_address": {
        "details": {
          "type": "UK",
          "uprn": 100040203976,
          "organisation_name": null,
          "department_name": null,
          "sub_building_description": null,
          "building_description": "Apartment 11",
          "street": "113 Newton Street",
          "dependent_street": null,
          "dependent_locality": null,
          "double_dependent_locality": null,
          "post_town": "MANCHESTER",
          "postcode": "M1 1AE",
          "full_address": "Apartment 11 ,113 Newton Street, MANCHESTER, M1 1AE",
          "care_of_name": "SP"
        }
      }
    },
    "documents": {
      "TR1": {
        "document_id": "a40d6fe0-bd45-4c49-b72a-0d80cf43db83",
        "type": "TR1",
        "document_metadata": {
          "certification_statement_type": "CERTIFIED",
          "document_filename": "TR1.pdf"
        }
      }
    },
    "parties": {
      "Transferee": {
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "John",
          "surname": "Smith"
        },
        "address_for_service_option": "PROVIDED_ADDRESS",
        "representation_type": "LODGING_CONVEYANCER",
        "addresses": "transferee_address"
      },
      "Transferor1": {
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "Tony",
          "surname": "Bonito"
        },
        "other_conveyancer": {
          "full_name": "ABC Conveyancers",
          "registered_address": "13 Coral Close, Tuffley, Gloucester, GL4 0RG",
          "conveyancer_reference": "abc-conveyancers-ref"
        },
        "address_for_service_option": "NOT_REQUIRED",
        "representation_type": "OTHER_CONVEYANCER"
      },
      "Transferor2": {
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "Toni",
          "surname": "Bonito"
        },
        "other_conveyancer": {
          "full_name": "ABC Conveyancers",
          "registered_address": "13 Coral Close, Tuffley, Gloucester, GL4 0RG",
          "conveyancer_reference": "abc-conveyancers-ref"
        },
        "address_for_service_option": "NOT_REQUIRED",
        "representation_type": "OTHER_CONVEYANCER"
      }
    },
    "applicants": [
      "Transferee"
    ],
    "application_lodger": {
      "email": "valid.email@landregistry.gov.uk",
      "type": "CONVEYANCER"
    },
    "titles": {
      "MS312531": {
        "disclosable_overriding_interests": "false",
        "title_number": "MS312531",
        "scope_details": {
          "scope": "WHOLE",
          "part_description": null
        },
        "title_type": "REGISTER_TITLE"
      }
    },
    "transactions": {
      "Transfer": {
        "details": {
          "type": "TRANSFER",
          "title_guarantee_code": "FULL",
          "additional_provisions_code": "NO_PROVISIONS",
          "consideration_description": "string",
          "consideration_type": "MONETARY_VALUE",
          "value": 1300000,
          "date": "2023-12-12"
        },
        "documents": [
          "TR1"
        ],
        "priority": 1,
        "fee_in_pence": 3000,
        "party_roles": [
          {
            "party_reference": "Transferee",
            "role": "TRANSFEREE"
          },
          {
            "party_reference": "Transferor1",
            "role": "TRANSFEROR"
          },
          {
            "party_reference": "Transferor2",
            "role": "TRANSFEROR"
          }
        ],
        "type": "T",
        "title_references": [
          "MS312531"
        ]
      }
    },
    "type": "REGISTER_UPDATE"
  }
}
```
</div>

<div class="govuk-!-padding-bottom-6"></div>

### Response {.govuk-heading-s .govuk-!-margin-top-6}

Status: `202`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "application_request_id": "2563940e-ae95-4e7e-9b33-49a6571abdf6"
  }
}
```
</div>

--- {.govuk-section-break--l}

## Scenario 3: Submit an application with Level 1 validation errors {.govuk-heading-m #scenario-3}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v0/applications`

Headers:

- `Authorization: <any-value>`
- `Idempotency-Key: <any-value>`

Note: The idempotency key should be unique for each request (this is not enforced by the stubs).

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "submission_warning_understood": ,
    "applicants": [
      "Borrower1",
      "Borrower2"
    ],
    "customer_reference": "CustomerRef",
    "documents": {
      "Deed": {
        "type": "MRTG_DEED",
        "document_id": "0d7bd3a5-1aec-4862-9fc9-f796dfc11d35",
        "document_metadata": {
          "certification_statement_type": "CERTIFIED",
          "document_filename": "Deed.pdf"
        }
      }
    },
    "parties": {
      "Borrower1": {
        "representation_type": "LODGING_CONVEYANCER",
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "Tony",
          "surname": "Bonito"
        }
      },
      "Borrower2": {
        "representation_type": "LODGING_CONVEYANCER",
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "Toni",
          "surname": "Bonito"
        }
      },
      "TheBank": {
        "representation_type": "LODGING_CONVEYANCER",
        "details": {
          "type": "UK_COMPANY",
          "company_number": "12345",
          "organisation_name": "Albion Home Loans Limited"
        }
      }
    },
    "application_lodger": {
      "email": "valid.email@landregistry.gov.uk",
      "type": "CONVEYANCER"
    },
    "titles": {
      "MS305610": {
        "disclosable_overriding_interests": "false",
        "title_number": "MS305610",
        "scope_details": {
          "scope": "WHOLE",
          "part_description": null
        },
        "title_type": "REGISTER_TITLE"
      }
    },
    "transactions": {
      "Charge": {
        "documents": [
          "Deed"
        ],
        "type": "C",
        "priority": 1,
        "fee_in_pence": 3000,
        "details": {
          "type": "CHARGE",
          "date": "3000-01-01",
          "mdref": "MD006A"
        },
        "party_roles": [
          {
            "party_reference": "Borrower1",
            "role": "BORROWER"
          },
          {
            "party_reference": "Borrower2",
            "role": "BORROWER"
          },
          {
            "party_reference": "TheBank",
            "role": "LENDER"
          }
        ]
      }
    },
    "type": null
  }
}
```
</div>

### Response {.govuk-heading-s .govuk-!-margin-top-6}

Status: `400`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "type": "https://landregistry.github.io/bgtechdoc/problems/global#bad-request",
  "title": "Bad Request",
  "detail": "The request is invalid or malformed.",
  "status": "400",
  "errors": [
    {
      "type": "OCV_L1A_000",
      "pointer": "/data/transactions/Charge/details/date",
      "detail": "Date must be in the past or in the present"
    },
    {
      "type": "OCV_L1A_000",
      "pointer": "/data/type",
      "detail": "Type must not be null"
    }
  ]
}
```
</div>

--- {.govuk-section-break--l}

## Scenario 4: Submit an application with Level 2 validation errors {.govuk-heading-m #scenario-4}
### Request {.govuk-heading-s}

Method: `POST`

Endpoint: `/v0/applications`

Headers:

- `Authorization: <any-value>`
- `Idempotency-Key: <any-value>`

Note: The idempotency key should be unique for each request (this is not enforced by the stubs).

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "submission_warning_understood": ,
    "customer_reference": "CustomerRef",
    "addresses": {
      "transferee_address": {
        "details": {
          "type": "UK",
          "uprn": 100040203976,
          "organisation_name": null,
          "department_name": null,
          "sub_building_description": null,
          "building_description": "Apartment 11",
          "street": "113 Newton Street",
          "dependent_street": null,
          "dependent_locality": null,
          "double_dependent_locality": null,
          "post_town": "MANCHESTER",
          "postcode": "M1 1AE",
          "full_address": "Apartment 11 ,113 Newton Street, MANCHESTER, M1 1AE",
          "care_of_name": "SP"
        }
      }
    },
    "documents": {
      "TR1": {
        "document_id": "a40d6fe0-bd45-4c49-b72a-0d80cf43db83",
        "type": "TR1",
        "document_metadata": {
          "certification_statement_type": "CERTIFIED",
          "document_filename": "TR1.pdf"
        }
      },
      "Deed": {
        "type": "MRTG_DEED",
        "document_id": "e10f5369-a623-43fb-aeaa-5e02625e9f83",
        "document_metadata": {
          "certification_statement_type": "CERTIFIED",
          "document_filename": "Deed.pdf"
        }
      }
    },
    "parties": {
      "Transferee": {
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "John",
          "surname": "Smith"
        },
        "addresses": "transferee_address",
        "representation_type": "LODGING_CONVEYANCER"
      },
      "Transferor1": {
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "Tony",
          "surname": "Bonito"
        },
        "other_conveyancer": {
          "full_name": "ABC Conveyancers",
          "registered_address": "13 Coral Close, Tuffley, Gloucester, GL4 0RG",
          "conveyancer_reference": "abc-conveyancers-ref"
        },
        "representation_type": "OTHER_CONVEYANCER"
      },
      "Transferor2": {
        "details": {
          "type": "PRIVATE_INDIVIDUAL",
          "forenames": "Toni",
          "surname": "Bonito"
        },
        "other_conveyancer": {
          "full_name": "ABC Conveyancers",
          "registered_address": "13 Coral Close, Tuffley, Gloucester, GL4 0RG",
          "conveyancer_reference": "abc-conveyancers-ref"
        },
        "representation_type": "OTHER_CONVEYANCER"
      },
      "TheBank": {
        "details": {
          "type": "UK_COMPANY",
          "company_number": "12345",
          "organisation_name": "Albion Home Loans Limited"
        },
        "representation_type": "LODGING_CONVEYANCER"
      }
    },
    "applicants": [
      "Transferee"
    ],
    "application_lodger": {
      "email": "valid.email@landregistry.gov.uk",
      "type": "CONVEYANCER"
    },
    "titles": {
      "MS312531": {
        "disclosable_overriding_interests": "false",
        "title_number": "MS312531",
        "scope_details": {
          "scope": "WHOLE",
          "part_description": null
        }
      }
    },
    "transactions": {
      "Transfer": {
        "documents": [],
        "type": "T",
        "priority": 1,
        "fee_in_pence": 3000,
        "details": {
          "type": "TRANSFER",
          "title_guarantee_code": "FULL",
          "additional_provisions_code": "NO_PROVISIONS",
          "consideration_description": "string",
          "consideration_type": "MONETARY_VALUE",
          "value": 1300000,
          "date": "2023-12-12"
        },
        "party_roles": [
          {
            "party_reference": "Transferee",
            "role": "TRANSFEREE"
          },
          {
            "party_reference": "Transferor1",
            "role": "TRANSFEROR"
          },
          {
            "party_reference": "Transferor2",
            "role": "TRANSFEROR"
          }
        ],
        "title_references": [
          "MS312531"
        ]
      },
      "Charge": {
        "documents": [
          "Deed"
        ],
        "type": "C",
        "priority": 2,
        "fee_in_pence": 3000,
        "details": {
          "type": "CHARGE",
          "date": "2024-01-01",
          "mdref": "MD007A"
        },
        "party_roles": [
          {
            "party_reference": "Transferee",
            "role": "BORROWER"
          },
          {
            "party_reference": "TheBank",
            "role": "LENDER"
          }
        ],
        "title_references": [
          "MS312531"
        ]
      }
    },
    "type": "REGISTER_UPDATE"
  }
}
```
</div>

### Response {.govuk-heading-s .govuk-!-margin-top-6}

Status: `202`

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "application_request_id": "3be62ad3-c542-452d-975e-6cd18d77196f"
  }
}
```
</div>
