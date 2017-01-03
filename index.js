var logic_holder = new LogicsHolder();

function addLogicFiles() {
    var fileInput = document.getElementById("logicFilesInput");
    for (var b = 0; b < fileInput.files.length; b++) {
        logic_holder.pushFiles(fileInput.files[b]);
    }
    logic_holder.afterEachRead();
}

function clearLogicFiles() {
    logic_holder.resetAndCreateArrays();
    logic_holder.functionsArray = [];
    document.getElementById("logicFilesInput").value = "";
}