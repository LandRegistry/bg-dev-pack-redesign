---
title: Application Information API
layout: page.njk

noheader: true
versioned: true

breadcrumb: false
eleventyNavigation:
    key: application-information-api
    parent: apis
---

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">
      Application Information API
    </h1>
    <p class="govuk-body-l">Use this service to get information about a specific application.</p>
    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
      <span class="govuk-visually-hidden">Warning</span>
        These API endpoints are not currently live.
      </strong>
    </div>
  </div>
</div>

<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

<div class="govuk-grid-row">
    <div class="govuk-grid-column-one-half version-label-center-y">
        <h2 class="govuk-heading-m govuk-!-margin-0" id="version-and-status">Version and Status</h2>
    </div>
    <div class="govuk-grid-column-one-half">{% from "govuk/components/select/macro.njk" import govukSelect %}{% from "govuk/components/button/macro.njk" import govukButton %}
        {{ govukSelect({
        id: "version",
        name: "version",
        label: {
            text: "Version and Status dropdown",
            classes: "govuk-visually-hidden"
        },
        items: [{
            value: "0.3",
            text: "v0.3 (latest)",
            selected: true
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

<div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
    <h3>Select a version for content</h3>
</div>