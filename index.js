function delegate(filter, fn) {
    if(!delegate.matches) {
        [
            "matches",
            "webkitMatchesSelector",
            "mozMatchesSelector",
            "msMatchesSelector"
        ].some(function(method) {
            if(method in document.body) {
                delegate.matches = method;
            }
            
            return delegate.matches;
        });
    }

    return function(e) {
        var el = e.target,
            match = delegate.filter(el, e.currentTarget, filter);
        
        if(!match) {
           return;
        }
        
        fn(e, match);
    };
}

delegate.filter = function(el, src, filter) {
    if(el === src) {
        return false;
    }
        
    if(el[delegate.matches](filter)) {
        return el;
    }
    
    return delegate.filter(el.parentNode, src, filter);
};
