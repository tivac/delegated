(function(win, body) {
"use strict";

// Store the right method name to call
var matches;

[ "matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector" ].some(function(method) {
    if(method in body) {
        matches = method;
    }
    
    return matches;
});

function filter(el, src, selectors) {
    var selector;
    
    if(el === src) {
        return false;
    }
    
    for(selector in selectors) {
        if(el[matches](selector)) {
            return {
                el : el,
                fn : selectors[selector]
            };
        }
    }
    
    return filter(el.parentNode, src, selectors);
}

// delegated("a.foo", fn(e, a) { ... })
// delegated({
//    "a.foo" : fn(e, a) { ... },
//    ".bar"  : fn(e, el) { ... }
// })
function delegated(selectors, fn) {
    var _selectors = selectors;
    
    if(typeof selectors === "string") {
        _selectors = {};
        _selectors[selectors] = fn;
    }

    return function(e) {
        var el = e.target,
            match = filter(el, e.currentTarget, _selectors);
        
        if(!match) {
           return;
        }
        
        match.fn(e, match.el);
    };
}

if(typeof module !== "undefined" && module.exports) {
    module.exports = delegated;
} else {
    win.delegated = delegated;
}

}(window, document.body));
