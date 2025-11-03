---
title: Submit an application to change the Land Register APIs
layout: page.njk
versioned: true

noheader: true
breadcrumb: false
eleventyNavigation:
    key: submit-an-application-to-change-the-land-register
    parent: apis

spy: true
sidenav:
    - theme: Contents
      text: Overview
      href: '#overview'
      selected: true
    - theme: Contents
      text: View the API specification
      href: '#view-the-api-specification'
    - theme: Contents
      text: How the service API works
      href: '#how-the-service-api-works'

options:
    stylesheets:
        - /assets/side-by-side.css
---

<h1 class="govuk-heading-xl">Submit an Application to change the Land Register APIs</h1>
<p class="govuk-body-l">Use this service to help lodge applications with HMLR to update the register or create a new lease or transfer of part.</p>

<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

<div class="govuk-grid-row">
    <div class="govuk-grid-column-one-half version-label-center-y">
        <h2 class="govuk-heading-m govuk-!-margin-0" id="version-and-status">Version and status</h2>
    </div>
    <div class="govuk-grid-column-one-half">{% from "govuk/components/select/macro.njk" import govukSelect %}{% from "govuk/components/button/macro.njk" import govukButton %}
        {{ govukSelect({
        id: "version",
        name: "version",
        label: {
            text: "Version and status dropdown",
            classes: "govuk-visually-hidden"
        },
        items: [{
            value: "1.0",
            text: "v1.0 (latest)",
            selected: true
        },{
            value: "0.3",
            text: "v0.3"
        }, {
            value: "0.2",
            text: "v0.2"
        }, {
            value: "0.1",
            text: "v0.1"
        }],
        formGroup: {
            classes: "version-group govuk-!-margin-0",
            afterInput: {
                html: '<button type="submit" 
                class="govuk-button govuk-!-margin-0" 
                data-module="govuk-button"
                onclick="setVersion();"
                >View</button>'
            }
        }
        }) }}</div>
</div>

<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

<p>Select a version</p>

<aside class="govuk-!-margin-top-5 related-items" role="complementary">
    <h2 class="govuk-heading-m" id="subsection-title">
        Related APIs
    </h2>
    <nav role="navigation" aria-labelledby="subsection-title">
        <ul class="govuk-list govuk-!-font-size-16">
            <li>
                <a class="govuk-body govuk-link" href="/apis/send-a-document">
                    Send a document API
                </a>
            </li>
            <li>
                <a class="govuk-body govuk-link" href="/apis/submit-an-application">
                    Submit an application API
                </a>
            </li>
            <li>
                <a class="govuk-body govuk-link" href="/apis/application-information">
                    Application information API
                </a>
            </li>
            <li>
                <a class="govuk-body govuk-link" href="/apis/attach-a-document">
                    Attach a document
                </a>
            </li>
            <li>
                <a class="govuk-body govuk-link" href="/apis/attach-a-message">
                    Attach a message
                </a>
            </li>
            <li>
                <a class="govuk-body govuk-link" href="/apis/notifications">
                    Notifications API
                </a>
            </li>
            <li>
                <a class="govuk-body govuk-link" href="/apis/download-a-document">
                    Download a document
                </a>
            </li>
            <li>
                <a class="govuk-body govuk-link govuk-!-font-weight-bold" href="/find-a-service-api">
                    More <span class="govuk-visually-hidden">in Subsection</span>
                </a>
            </li>
        </ul>
    </nav>
</aside>
