(function (provider, done) {
    var indoreReactorFlowPoint = "WRLDCMP.SCADA1.A0001682";
    var indoreBusVoltagePoint = "WRLDCMP.SCADA1.A0001653";
    provider.eDNARealPointFetcher([indoreBusVoltagePoint, indoreReactorFlowPoint], function (err, resultsArray) {
        if (err) {
            done(null);
        }
        //run the logic now
        var indoreBusVolt = resultsArray[0];
        var indoreReactorFlow = resultsArray[1];
        if (indoreBusVolt < 760 && indoreReactorFlow > 5) {
            done("Indore 765 B/R can be taken out since voltage at Indore is " + indoreBusVolt);
        } else if (indoreBusVolt > 780 && indoreReactorFlow < 5) {
            done("Indore 765 B/R can be taken into service since voltage at Indore is " + indoreBusVolt);
        } else{
            done(null);
        }
    });
})
