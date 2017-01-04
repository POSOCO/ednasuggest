(function (provider, done) {
    /* points input */
    var line_flow_Akola_Aurangabad_MW_pnt = "WRLDCMP.SCADA1.A0001682";
    var line_flow_Wardha_Aurangabad_MW_pnt = "WRLDCMP.SCADA1.A0001684";
    var voltage_of_Aurangabad_KV_pnt = "WRLDCMP.SCADA1.A0001653";
    var line_flow_Wardha_Parli_MW_pnt = "WRLDCMP.SCADA1.A0001682";
    var voltage_Parli_KV_pnt = "WRLDCMP.SCADA1.A0001682";
    provider.eDNARealPointFetcher([line_flow_Akola_Aurangabad_MW_pnt, line_flow_Wardha_Aurangabad_MW_pnt, voltage_of_Aurangabad_KV_pnt, line_flow_Wardha_Parli_MW_pnt, voltage_Parli_KV_pnt], function (err, resultsArray) {
        if (err) {
            done(null);
        }
        try {
            /* logic start */
            var line_flow_Akola_Aurangabad_MW = resultsArray[0].dval;
            var line_flow_Wardha_Aurangabad_MW = resultsArray[1].dval;
            var voltage_of_Aurangabad_KV = resultsArray[2].dval;
            var line_flow_Wardha_Parli_MW = resultsArray[3].dval;
            var voltage_Parli_KV = resultsArray[4].dval;

            var suggestionsArray_ = [];
            var resultantSuggestionsArray_ = [];
            var suggest = function (str) {
                if (suggestionsArray_.indexOf(str) == -1) {
                    suggestionsArray_.push(str);
                }
            };

            // Execute the algorithm
            if (line_flow_Akola_Aurangabad_MW >= 600) {
                suggest("Increase Koyna generation");
                suggest("Open one Aurangabad Pune line");
                suggest("Take Bableshwar Ektuni both lines into service");
                suggest("Reduce Mouda, Tirora, Koradi generation, infirm first");
            }
            if (line_flow_Wardha_Aurangabad_MW >= 1500) {
                suggest("Increase Koyna generation");
                suggest("Take Bableshwar Ektuni both lines into service");
                suggest("Reduce Mouda, Tirora, Koradi generation, infirm first");
                suggest("Increase Koina gen. to maintain <1500 MW in each Aurangabad Wardha ckt");
            }
            if (voltage_of_Aurangabad_KV <= 746) {
                suggest("Switch off Bus Reactors at Aurangabad 765 or 400 kV");
            }
            if (line_flow_Wardha_Parli_MW >= 700) {
                suggest("Increase Chandrapur Padge Flow");
                suggest("Increase Talcher Kolar Flow");
            }
            if (voltage_Parli_KV <= 395) {
                suggest("Switch off Bus Reactors at Parli");
            }
            if (suggestionsArray_.length == 0) {
                suggest("Be Alert...");
            }
            for (var i = 0; i < suggestionsArray_.length; i++) {
                resultantSuggestionsArray_[i] = {suggestionStr: suggestionsArray_[i]};
            }
            done(resultantSuggestionsArray_);
            /* logic end */
        } catch (err) {
            done(new Array());
        }
    });
})
