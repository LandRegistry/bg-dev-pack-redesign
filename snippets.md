## Custom attributes on a markdown item

This is a paragraph with a {.class #id attr="value"}

## Code block

### Imports

{% from "govuk/components/button/macro.njk" import govukButton %}

### Code block

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```lang
insert code here
```
</div>
