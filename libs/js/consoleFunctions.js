/**
 * Created by Nagasudhir on 1/2/2017.
 */
//Console Functions
function WriteLineConsole(str, tag) {
    var mConsole = document.getElementById("console_");
    if (str === "") {
        mConsole.appendChild(document.createElement("br"));
    } else {
        var para = document.createElement("div");
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        var node = document.createTextNode(datetime + " : " + str);
        para.appendChild(node);
        mConsole.appendChild(para);
        //mConsole.insertBefore(para, mConsole.firstChild);
        doStyling(para.style, tag, "small");
    }
}

//Console Functions
function doStyling(style, tag, fontSize) {
    style.display = 'block';
    style.fontSize = fontSize ? fontSize : "0.8em";
    style.fontFamily = "Courier New";
    if (tag == 'error') {
        style.color = 'red';
    } else if (tag == 'warning') {
        style.color = '#FF8C00';
    } else if (tag == 'info') {
        style.color = 'blue';
    } else if (tag == 'success') {
        style.color = 'blue';
    }
}

//Console Functions
function clearConsole() {
    var mConsole = document.getElementById("console_");
    mConsole.innerHTML = "";
}