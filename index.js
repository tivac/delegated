function delegated(filter, fn) {
    if(!delegated.matches) {
        delegated.matchers.some(function(method) {
            if(method in document.body) {
                delegated.matches = method;
            }
            
            return delegated.matches;
        });
    }

    return function(e) {
        var el = e.target,
            match = delegated.filter(el, e.currentTarget, filter);
        
        if(!match) {
           return;
        }
        
        fn(e, match);
    };
}

delegated.matchers = [
    "matches",
    "webkitMatchesSelector",
    "mozMatchesSelector",
    "msMatchesSelector"
];

delegated.filter = function(el, src, filter) {
    if(el === src) {
        return false;
    }
        
    if(el[delegated.matches](filter)) {
        return el;
    }
    
    return delegated.filter(el.parentNode, src, filter);
};

if(typeof module !== "undefined" && module.exports) {
    module.exports = delegated;
}
