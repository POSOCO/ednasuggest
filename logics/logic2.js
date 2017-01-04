(function (provider, done) {
    provider.eDNARealPointFetcher([2, 3], function (err, resultsArray) {
        var resultsArrayRaw = resultsArray.map(function (x) {
            return x * x * x;
        });
        var resultsArrayTagged = [];
        for (var i = 0; i < resultsArrayRaw.length; i++) {
            resultsArrayTagged[i] = {suggestionStr: resultsArrayRaw[i], tag: null};
        }
        done(resultsArrayTagged);
    });
})