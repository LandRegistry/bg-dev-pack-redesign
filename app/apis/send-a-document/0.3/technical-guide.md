---
layout: guidance.njk

title: Send a document API technical guide
description: Use this service to attach documents to your application

eleventyNavigation:
  key: Send a document API v0.3 technical guide
  parent: Send a document API v0.3

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
  - text: Submit an application
    href: /apis/submit-an-application
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
    text: 'How to use the Send a document API'
    href: '#how-to-use-the-send-a-document-api'
  - theme: Contents
    text: 'Validation rules'
    href: '#validation-rules'
  - theme: Contents
    text: 'Example requests and responses'
    href: '#example-requests-and-responses'
---
{% from "govuk/components/button/macro.njk" import govukButton %}

<section>

## How to use the Send a document API {.govuk-heading-m}

This API consists of two endpoints that must be used together to upload a single document.

1. `POST /v0/documents/url` - The generate an upload URL endpoint. The HTTP body of the request contains information about the file being uploaded
2. `PUT documentcapture.landregistry.gov.uk/...` - The upload a document endpoint. The HTTP body of the request is the bytes of the document

### Generate an upload URL {.govuk-heading-s}
  
Making a POST request to the create upload URL endpoint will result in the following items being returned:

- `upload_url` - This is the URL to make the PUT request to. This URL will only be valid for ten minutes after generation. Ten minutes is timed from the generation of the URL to the start of the upload. Neither the size of the document nor the speed of internet connection will cause the upload to timeout
- `document_id` - This is a unique ID for this document, and must be included in the application submission payload

### Upload a document {.govuk-heading-s}

To upload a document, make a PUT request to the URL returned from the ‘Create an upload URL’ POST request above. This request should contain the document as the body content. A 200 HTTP code will be returned if the upload was successful. Documents will asynchronously be virus scanned and validated. Issues found during this process will be surfaced via the Application information API. Do not modify the URL received in the response.

</section>

<section>

## Validation rules {.govuk-heading-m}

To pass validation, you must follow the guidance for implementing this API below.

### File types {.govuk-heading-s}

Only four file types are supported by HMLR document upload:

- PDFs (must not be password protected)
- TIFFs
- GIFs
- PNGs

Any other file types are not supported and will cause application submission to fail.

### File length/SHA-256 {.govuk-heading-s}

As part of the API to generate an upload URL, the API expects `file_length` and `file_sha256` parameters. These parameters refer to the file that will be uploaded to the URL.

These values must also be provided when making the PUT request to the upload URL, as headers:

- `Content-Length : <value of file_length>`
- `X-Amz-Checksum-Sha256 : value of file_sha256`

Where `<value of x>` are the values that were given to the request to generate the upload URL and match the file that is included in the body of the request. If either of these values do not match or are not provided, you will receive a signature verification failure (HTTP 403).

The maximum size permitted for a single document upload is 40MiB (41943040 bytes).

### File length {.govuk-heading-s}

The `file_length` should be the size of the file in bytes. See below for code examples in different languages:

Python

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```py
with open("test.pdf", "rb") as f:
    file_bytes = f.read()
    file_length = len(file_bytes)
```
</div>

Bash

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```sh
du -b test.pdf
```
</div>

Java

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```java
File f = new File("test.pdf");
long fileLength = f.length();
```
</div>

JavaScript (Node)

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```js
const fs = require("fs");
const stats = fs.statsync("test.pdf");
const filelength = stats.size;
```
</div>

### File Sha256 {.govuk-heading-s}

The `file_sha256` is the base64 encoded 256-bit binary digest of the bytes of the file. This should be exactly 44 characters long, regardless of the length of the file. See below for code examples in several languages:

Python

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```py
with open("test.pdf", "rb") as f:
  file_bytes = f.read()
  hash = sha256(file_bytes)
  file_sha256 = b64encode(hash.digest())
```
</div>

Bash

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```sh
cat test.pdf | \
 openssl sha256 -binary | \
 openssl enc -base64
```
</div>

Java

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```sh
File f = new File("test.pdf");
byte[] data = Files.readAllBytes(f);
MessageDigest digester = MessageDigest.getInstance("sha-256");
digester.update(data);
String filesha256 = Base64.getEncoder().encodeToString(digester.digest());
```
</div>

JavaScript (Node)

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```js
const fs = require("fs");
const crypto = require("crypto");
const shasum = crypto.createhash("sha256");
shasum.update(fs.getbytes());
shasum.digest("base64");
```
</div>

</section>

## Example requests and responses {.govuk-heading-m}

### <code>POST /v0/documents/url</code> - Request {.govuk-heading-s}

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "document_type": "tr1",
    "file_length": 6362,
    "file_sha256": "xhepsrlehdpshynpjwwarzerivlcpvn8f8pycs7crqa="
  }
}
```
</div>

### <code>POST /v0/documents/url</code> - Response {.govuk-heading-s}

<div class="code-wrapper">
{{ govukButton({ text: "Copy code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "upload_url": "documentcapture.landregistry.gov.uk/04c5c3fe-aa08-473b-9944-64ef5506f8e2",
    "document_id": "04c5c3fe-aa08-473b-9944-64ef5506f8e2"
  }
}
```
</div>

Note: The URL in the example may not be representative of the actual URL received.

**PUT document - Request**

- URL matches upload_url in `/v0/documents/url` response
- Body content is the document to upload

**PUT document - Response**

- HTTP 200 on successful upload
- HTTP 4xx on failure

</section>
