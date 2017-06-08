+++
date = "2017-06-08T15:18:13+05:30"
title = "Dummy.js"
description = "A simple, no-nonsense library for injecting dummy text in html pages"
+++
## Introduction

Dummy.js is a simple script to automatically insert dummy text when prototyping web designs. 

## Quick Start

```html
<body>

    <!-- The /s plural is just for the semantics. -->
    <!-- You are well of with `5-sentence` -->

    <h1 data-dummy-fill="5,word(/s)"></h1>
    <p data-dummy-fill="6,sentence"></p>
    <p data-dummy-fill="1,paragraph"></p>
    ...
    <script src="/path/to/dummy.min.js"></script>

</body>
```

There! Dummy.js is at your service.

## Configuration

### Fill types

* Word(s)
* Sentence(s)
* Paragraph(s)

### Configuring fill amount

It is necessary to specify some integer fill amount. This is done by inserting an integer value followed by a comma before the fill type.

```html
<p data-dummy-fill="6,sentence"></p>
```

### Configuring the number of words in a sentence

The following example will fill the `<p>` tag with five sentences of dummy text with each sentence having between four and twelve words.

```html
<p data-dummy-fill="5,sentences,4-12 words"></p>
```

### Configuring the number of sentences in a paragraph

The following markup would fill the `<p>` tag with one paragraph of anywhere between fifteen and eighteen sentences.

```html
<p data-dummy-fill="1,paragraph,15-18 sentences"></p>
```

### Configuring the number of words in each sentence of a paragraph

To generate a paragraph with 6–9 words per sentence, use the following markup:

```html
<p data-dummy-fill="1,paragraph,6-9 words"></p>
```

## CDN

Dummy.js is hosted on the JSDelivr CDN: https://cdn.jsdelivr.net/dummyjs/latest/dummy.min.js.

## Disable

Dummy.js can temporarily be disabled with a slight modification to the `<script>` tag which loads Dummy.js:

```html
<script src="/path/to/Dummy.js" data-dummy="disable"></script>
```

## License

[MIT License](https://shreyas.mit-license.org/2016)

## Github

Find the source code [here](https://github.com/shreyasminocha/Dummy.js). Contributions are more than welcome!
