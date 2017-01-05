var providerObject = {
    "eDNARealPointFetcher": function (pointsArray, done) {
        var resultsArray = [];
        for (var i = 0; i < pointsArray.length; i++) {
            resultsArray[i] = null;
        }
        for (var i = 0; i < pointsArray.length; i++) {
            $.get("http://localhost:62448/api/values/real?pnt=" + pointsArray[i], (function (iterInput) {
                return function (data, status) {
                    if (status == "success") {
                        resultsArray[iterInput] = data;
                    }
                }
            })(i));
        }
        // All the requests have been sent. Wait for 2500 msec and send the result to the callback function
        setTimeout(function () {
            done(null, resultsArray);
        }, 2500);
    }
};

var providerObjectForTest = {
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
    handleConsoleHeight();
    var functionObjects = logic_holder.functionsArray;
    for (var i = 0; i < functionObjects.length; i++) {
        // create function objects from the texts
        functionObjects[i](providerObjectForTest, function (suggestionObjectsArray) {
            if (typeof suggestionObjectsArray == "string") {
                WriteLineConsole(suggestionObjectsArray);
                console_watcher.increment_by(1);
            } else {
                for (var k = 0; k < suggestionObjectsArray.length; k++) {
                    WriteLineConsole(suggestionObjectsArray[k]["suggestionStr"], suggestionObjectsArray[k]["tag"]);
                    console_watcher.increment_by(1);
                }
            }
        });
    }
}

//Timing variable
var timingVar_;

//Timing function
function startMonitoring() {
    pauseMonitoring();
    console.log("Starting logic monitoring", "info");
    timingVar_ = setInterval(executeFunctions, 3000);
}

//Timing function
function pauseMonitoring() {
    console.log("Pausing logic monitoring", "info");
    clearInterval(timingVar_);
}

function handleConsoleHeight() {
    if (console_watcher.count > 150) {
        clearConsole();
        console_watcher.set_count(0);
    }
}
