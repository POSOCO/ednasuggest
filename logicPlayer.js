var providerObjectTemp = {
    "eDNARealPointFetcher": function (pointsArray, done) {
        for (var i = 0; i < pointsArray.length; i++) {
            $.get("http://localhost:62448/api/values/real?pnt=" + pointsArray[i], (function (iterInput) {
                var iter = iterInput;
                return function (data, status) {
                    if (status == "success") {
                        var pointData = data;
                    }
                }
            })(i));
        }
    }
};

var providerObject = {
    "eDNARealPointFetcher": function (pointsArray, done) {
        // TODO fetch eDNA values via the http ajax api and send the fetched values to the function "done"
        done(null, pointsArray);
    }
};

function createFunctions() {
    var functionTexts = logic_holder.filesAfterReadArrays;
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
    timingVar_ = setInterval(executeFunctions, 500);
}

//Timing function
function pauseMonitoring() {
    console.log("Pausing logic monitoring", "info");
    clearInterval(timingVar_);
}