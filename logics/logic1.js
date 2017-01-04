(function (provider, done) {
    provider.eDNARealPointFetcher([2, 3], function (err, resultsArray) {
        /* logic start */
        var resultsArrayRaw = resultsArray.map(function (x) {
            return x * x;
        });
        var resultsArrayTagged = [];
        for (var i = 0; i < resultsArrayRaw.length; i++) {
            resultsArrayTagged[i] = {suggestionStr: resultsArrayRaw[i], tag: "info"};
        }
        done(resultsArrayTagged);
        /* logic end */
    });
})