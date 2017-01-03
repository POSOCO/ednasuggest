var providerObjectTemp = {
    "eDNARealPointFetcher": function (pointsArray, done) {
        var resultsArray = [];
        for (var i = 0; i < pointsArray.length; i++) {
            resultsArray[i] = null;
        }
        for (var i = 0; i < pointsArray.length; i++) {
            $.get("http://localhost:62448/api/values/real?pnt=" + pointsArray[i], (function (iterInput) {
                var iter = iterInput;
                return function (data, status) {
                    if (status == "success") {
                        resultsArray[i] = data;
                    }
                }
            })(i));
        }
        // All the requests have been sent. Wait for 500 msec and send the result to the callback function
        setInterval(function () {
            done(null, resultsArray);
        }, 500);
    }
};

var providerObject = {
    "eDNARealPointFetcher": function (pointsArray, done) {
        done(null, pointsArray);
    }
};

function createFunctions() {
    var functionTexts = logic_holder.filesAfterReadArrays;
    logic_holder.functionsArray = [];
    for (var i = 0; i < functionTexts.length; i++) {
        // create function objects from the texts
        logic_holder.functionsArray[i] = eval(functionTexts[i]);
    }
}

function executeFunctions() {
    var functionObjects = logic_holder.functionsArray;
    clearConsole();
    for (var i = 0; i < functionObjects.length; i++) {
        // create function objects from the texts
        functionObjects[i](providerObject, function (suggestion) {
            WriteLineConsole(suggestion);
        });
    }
}

//Timing variable
var timingVar_;

//Timing function
function startMonitoring() {
    pauseMonitoring();
    console.log("Starting logic monitoring", "info");
    timingVar_ = setInterval(executeFunctions, 1000);
}

//Timing function
function pauseMonitoring() {
    console.log("Pausing logic monitoring", "info");
    clearInterval(timingVar_);
}