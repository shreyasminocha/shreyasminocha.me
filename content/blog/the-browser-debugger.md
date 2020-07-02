---
title: Debugging JavaScript with the Browser Debugger
description: Finally graduating from `console.log` — an introduction to the Firefox Debugger.
date: 2020-06-20
tags: [programming, tutorial]
---

When I caught myself repeatedly re-running code, adding a `console.log` statement each time, I knew it was time to _finally_ acquaint myself with the debugger.

This post is a quick introduction to Firefox's JavaScript debugger. Chrome's debugger is practically identical. This should also serve as a decent introduction to debuggers in general.

{{< figure src="/img/the-browser-debugger/layout.svg" caption="Firefox Debugger layout" alt="Annotated layout of the Firefox debugger — navigation, line numbers, code, flow controls, right sidebar" >}}

A **breakpoint** is an event at which program flow is paused and you get the opportunity to explore:

-   various scopes
-   the call stack
-   values of variables
-   …

Let's set a breakpoint at line 8. Hover over the line number and click.

{{< figure src="/img/the-browser-debugger/set-breakpoint-line-8.jpg" caption="Breakpoint set at line 8" >}}

Just before this line is executed, _program flow will be paused_. Let's click the theme toggle button to see this in action:

{{< figure src="/img/the-browser-debugger/paused-at-line-8.jpg" caption="Flow paused at line 8" alt="Breakpoint at line 8 activated" >}}

We can now inspect all sorts of stuff, either using the panel on the right, or by hovering over variables in the code.

{{< figure src="/img/the-browser-debugger/variable-hover.jpg" caption="Hover over variables and functions to inspect them" >}}

The right sidebar also bears useful information including, for example, values of variables in various scopes.

{{< figure src="/img/the-browser-debugger/right-sidebar.png" caption="The right sidebar" alt="The right sidebar includes 'Watch expressions', 'Breakpoints', 'Call stack', 'Scopes', 'XHR Breakpoints'" >}}

Flow controls allow tracing the program flow step-by-step. They're very useful when you're trying to pinpoint the location of unexpected behaviour and values.

{{< figure src="/img/the-browser-debugger/flow-controls.jpg" caption="Flow controls!" >}}

Flow controls (left to right):

-   **Play**/**Pause**

    Resume or pause program flow.

-   **Step over**

    Continue to the next instruction in the current method.

-   **Step in**

    If there are any method calls in the current line, descend into them walk through their lines. Else, continue to the next instruction in the current method.

-   **Step out**

    Analogous to `Step in` . Go back to the lines that called the current method — pause after control is returned to those lines.

-   **Deactivate/Re-activate breakpoints**

    Toggle whether _all_ breakpoints are enabled.

Let's try stepping over a couple of times.

{{< figure src="/img/the-browser-debugger/paused-at-if.jpg" caption="Paused at the `if` condition" >}}

{{< figure src="/img/the-browser-debugger/paused-in-else.jpg" caption="Paused inside the `else` clause" >}}

---

The right sidebar has a checkbox to enable pausing each time an exception is encountered. You can use the right sidebar to set breakpoints for XHR requests too.

You can also add _watch expressions_ in the right sidebar. Each time program flow is paused, these expressions will be evaluated and will be visible for inspection.

---

That's all! While not a _complete_ guide, this should be enough to get you started. I used to find the debugger intimidating, but it was easy to get the hang of it once I got my hands dirty.
