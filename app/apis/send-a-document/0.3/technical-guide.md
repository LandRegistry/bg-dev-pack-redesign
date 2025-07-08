---
layout: guidance.njk

title: Send a document API technical guide
description: Use this service to attach documents to your application.

notlive: true

eleventyNavigation:
    key: technical-guide
    parent: send-a-document

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

versions:
  - value: "0.3"
    text: "v0.3 (latest)"
    selected: true

relatedAPIs:
  - text: Submit an application API
    href: /apis/submit-an-application
  - text: Application information API
    href: /apis/application-information
  - text: Notifications API
    href: /apis/notifications
  - text: Submit an application to change the land register API
    href: /apis/submit-an-application-to-change-the-land-register 
---
{% from "govuk/components/button/macro.njk" import govukButton %}

<h2 class="govuk-heading-m" id="how-to-use-the-send-a-document-api">How to use the Send a document API</h2>
<div>
  <p class="govuk-body">This API consists of two endpoints that must be used together to upload a single document.
  </p>
  <ol class="govuk-list govuk-list--number">
    <li>
      <code class="x-govuk-code x-govuk-code--inline">POST /v0/documents/url</code>
      - The generate an upload URL endpoint. The HTTP body of the request contains information about the file being
      uploaded
    </li>
    <li>
      <code class="x-govuk-code x-govuk-code--inline">PUT documentcapture.landregistry.gov.uk/...</code>
      - The upload a document endpoint. The HTTP body of the request is the bytes of the document
    </li>
  </ol>
</div>
<div>
  <h3 class="govuk-heading-s">Generate an upload URL</h3>
  <p class="govuk-body">Making a POST request to the create upload URL endpoint will result in the following items
    being returned:</p>
  <p class="govuk-body">
  <ul class="govuk-list govuk-list--bullet">
    <li><code class="x-govuk-code x-govuk-code--inline">upload_url</code>
      - This is the URL to make the PUT request to. This URL will only be valid for ten minutes after generation.
      Ten minutes is timed from the generation of the URL to the start of the upload. Neither the size of the
      document nor the speed of internet
      connection will cause the upload to timeout</p>
    </li>
    <p class="govuk-body">
      <li><code class="x-govuk-code x-govuk-code--inline">document_id</code>
        - This is a unique ID for this document, and must be included in the application submission payload
    </p>
    </li>
  </ul>
  <h3 class="govuk-heading-s">Upload a document</h3>
  <p class="govuk-body">To upload a document, make a PUT request to the URL returned from the ‘Create an upload URL’
    POST request above. This request should contain the document as the body content. A 200 HTTP code will be
    returned if the upload was
    successful. Documents will asynchronously be virus scanned and validated. Issues found during this process will
    be surfaced via the Application information API. Do not modify the URL received in the response.</p>
</div>
<div>
  <h2 class="govuk-heading-m" id="validation-rules">Validation rules</h2>
  <p class="govuk-body">To pass validation, you must follow the guidance for implementing this API below.</p>
  <h3 class="govuk-heading-s">File types</h3>
  <p class="govuk-body">Only four file types are supported by HMLR document upload:</p>
  <ul class="govuk-list govuk-list--bullet">
    <li>PDFs (must not be password protected)</li>
    <li>TIFFs</li>
    <li>GIFs</li>
    <li>PNGs</li>
  </ul>
  <p class="govuk-body">Any other file types are not supported and will cause application submission to fail.</p>
  <h3 class="govuk-heading-s">File length/SHA-256</h3>
  <p class="govuk-body">As part of the API to generate an upload URL, the API expects
    <code class="x-govuk-code x-govuk-code--inline">file_length</code>
    and
    <code class="x-govuk-code x-govuk-code--inline">file_sha256</code>
    parameters. These parameters refer to the file that will be uploaded to the URL.
  </p>
  <p class="govuk-body">These values must also be provided when making the PUT request to the upload URL, as
    headers:</p>
  <ul class="govuk-list govuk-list--bullet">
    <li>
      <code class="x-govuk-code x-govuk-code--inline">Content-Length : &ltvalue of file_length&gt
        </code>
    </li>
    <li>
      <code class="x-govuk-code x-govuk-code--inline">X-Amz-Checksum-Sha256 : &ltvalue of file_sha256&gt
        </code>
    </li>
  </ul>
  <p class="govuk-body">Where
    <code class="x-govuk-code x-govuk-code--inline">
        &ltvalue of x&gt</code>
    are the values that were given to the request to generate the upload URL and match the file that is included
    in the body of the request. If either of these values do not match or are not provided, you will receive a
    signature verification failure
    (HTTP 403).
  </p>
  <p class="govuk-body">The maximum size permitted for a single document upload is 40MiB (41943040 bytes).</p>
  <h3 class="govuk-heading-s">File length</h3>
  <p class="govuk-body">The
    <code class="x-govuk-code x-govuk-code--inline">file_length</code>
    should be the size of the file in bytes. See below for code examples in different languages:
  </p>
  <p class="govuk-body">Python</p>
<div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```py
with open("test.pdf", "rb") as f:
    file_bytes = f.read()
    file_length = len(file_bytes)
```
</div>
  <p class="govuk-body">Bash</p>
<div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```sh
du -b test.pdf
```
</div>
  <p class="govuk-body">Java</p>
<div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```java
File f = new File("test.pdf");
long fileLength = f.length();
```
</div>
  <p class="govuk-body">JavaScript (Node)</p>
<div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```js
const fs = require("fs");
const stats = fs.statsync("test.pdf");
const filelength = stats.size;
```
</div>
  <h3 class="govuk-heading-s">File Sha256</h3>
  <p class="govuk-body">The
    <code class="x-govuk-code x-govuk-code--inline">file_sha256</code>
    is the base64 encoded 256-bit binary digest of the bytes of the file. This should be exactly 44 characters
    long, regardless of the length of the file. See below for code examples in several languages:
  </p>
  <p class="govuk-body">Python</p>
<div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```py
with open("test.pdf", "rb") as f:
  file_bytes = f.read()
  hash = sha256(file_bytes)
  file_sha256 = b64encode(hash.digest())
```
</div>
  <p class="govuk-body">Bash</p>
<div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```sh
cat test.pdf | \
 openssl sha256 -binary | \
 openssl enc -base64
```
</div>
        <p class="govuk-body">Java</p>
<div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```sh
File f = new File("test.pdf");
byte[] data = Files.readAllBytes(f);
MessageDigest digester = MessageDigest.getInstance("sha-256");
digester.update(data);
String filesha256 = Base64.getEncoder().encodeToString(digester.digest());
```
</div>
  <p class="govuk-body">JavaScript (Node)</p>
<div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```js
const fs = require("fs");
const crypto = require("crypto");
const shasum = crypto.createhash("sha256");
shasum.update(fs.getbytes());
shasum.digest("base64");
```
</div>
  <h2 class="govuk-heading-m govuk-!-margin-top-6" id="example-requests-and-responses">Example requests and responses</h2>
  <div class="govuk-!-padding-bottom-3"></div>
  <h3 class="govuk-heading-s"><code>POST /v0/documents/url</code> - Request</h3>
<div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

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
  <h3 class="govuk-heading-s"><code>POST /v0/documents/url</code> - Response</h3>
<div class="code-wrapper">{{ govukButton({ text: "Code code", classes: "govuk-button--secondary copy-code" }) }}

```json
{
  "data": {
    "upload_url": "documentcapture.landregistry.gov.uk/04c5c3fe-aa08-473b-9944-64ef5506f8e2",
    "document_id": "04c5c3fe-aa08-473b-9944-64ef5506f8e2"
  }
}
```
</div>
  <p class="govuk-body">Note: The URL in the example may not be representative of the actual URL received.</p>
  <p class="govuk-body">
    <b>PUT document - Request</b>
  </p>
  <ul class="govuk-list govuk-list--bullet">
    <li>URL matches upload_url in<code class="x-govuk-code x-govuk-code--inline">/v0/documents/url</code>
      response</li>
    <li>Body content is the document to upload</li>
  </ul>
  <p class="govuk-body">
    <b>PUT document - Response</b>
  </p>
  <ul class="govuk-list govuk-list--bullet">
    <li>HTTP 200 on successful upload</li>
    <li>HTTP 4xx on failure</li>
  </ul>
</div>
