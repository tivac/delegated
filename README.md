delegated
=========

A tiny little cross-browser event delegation library. Uses [Element.matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) for CSS selector-based filtering.

## Example

```js
var parent = document.querySelector(".parent-of-many-nodes");

parent.addEventListener("click", delegated(".filter", function(<event>, <element>) {
    // event is the raw DOM event
    // element is the nearest element matching the filter string
}));

```

## Example using Mithril

```js
m(".parent-of-many-nodes", {
        onclick: delegated(".filter", function(e, el) {
            // el is the nearest element with a class of "filter" to the source event
        })
    },
    ...
);
```
