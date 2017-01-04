(function (provider, done) {
    /* points input */
    var indoreReactorFlowPoint = "WRLDCMP.SCADA1.A0001682";
    var indoreReactorFlowPoint_2 = "WRLDCMP.SCADA1.A0001684";
    var indoreBusVoltagePoint = "WRLDCMP.SCADA1.A0001653";
    provider.eDNARealPointFetcher([indoreBusVoltagePoint, indoreReactorFlowPoint, indoreReactorFlowPoint_2], function (err, resultsArray) {
        if (err) {
            done(null);
        }
        try {
            /* logic start */
            var indoreBusVolt = resultsArray[0].dval;
            var indoreReactorFlow = resultsArray[1].dval;
            var indoreReactorFlow_2 = resultsArray[2].dval;
            if (indoreBusVolt < 760 && (indoreReactorFlow > 5 || indoreReactorFlow_2 > 5)) {
                done([{
                    suggestionStr: "Indore 765 B/R can be taken OUT since voltage is " + indoreBusVolt + " & reactor flows are " + indoreReactorFlow + " , " + indoreReactorFlow_2,
                    tag: "success"
                }]);
            } else if (indoreBusVolt > 780 && (indoreReactorFlow < 5 || indoreReactorFlow_2 < 5)) {
                done([{
                    suggestionStr: "Indore 765 B/R can be taken into SERVICE since voltage is " + indoreBusVolt + " & reactor flows are " + indoreReactorFlow + " , " + indoreReactorFlow_2,
                    tag: "warning"
                }]);
            } else {
                done(new Array());
            }
            /* logic end */
        } catch (err) {
            done(new Array());
        }
    });
})
