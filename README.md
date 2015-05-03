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

parent.addEventListener("click", delegated({
    ".filter" : function(<event>, <element>) {
        ...
    },
    ".filter2" : function(<event>, <element>) {
        ...
    }
}));

```

### Example using Mithril

```js
m(".parent-of-many-nodes", {
        onclick: delegated(".filter", function(e, el) {
            // el is the nearest element with a class of "filter" to the source event
        })
    },
    ...
);

m(".parent-of-many-nodes", {
        onclick: delegated({
            ".filter" : function(e, el) {
                ...
            },
            ".filter2" : function(e, el) {
                ...
            }
        })
    },
    ...
);
```

## API

All calls to `delegated(...)` return an event handling function that will check nodes up to the parent to see if they match specified filter(s).

`delegated(<string>, <function>)` - Single string filter & callback function.

`delegated(<object>)` - Each property of the object is used as the filter, and the value of the property should be the callback function.
