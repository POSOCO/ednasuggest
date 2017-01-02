/**
 * Created by Nagasudhir on 1/2/2017.
 */
"use strict";

function LogicsHolder() {
    this.filesArray = [];
    this.filesAfterReadArrays = [];
    this.fileIterator = 0;
    this.resetAndCreateArrays = resetAndCreateArrays.bind(this);
    this.pushFiles = pushFiles.bind(this);
    this.afterEachRead = afterEachRead.bind(this);
    this.loadNext = loadNext.bind(this);

    this.functionsArray = [];

    function resetAndCreateArrays() {
        this.filesArray = [];
        this.filesAfterReadArrays = [];
        this.fileIterator = 0;
    }

    function pushFiles(newFile) {
        if (!Array.isArray(this.filesArray)) {
            this.filesArray = [];
        }
        this.filesArray.push(newFile);
    }

    //file reader feature
    function loadNext() {
        //remove file from array to save memory
        this.filesArray[this.fileIterator] = null;
        this.fileIterator = this.fileIterator + 1;
        if (this.fileIterator < this.filesArray.length) {
            this.afterEachRead();
        }
    }

    //file reader feature
    function afterEachRead() {
        var reader = new FileReader();
        if (!Array.isArray(this.filesAfterReadArrays)) {
            this.filesAfterReadArrays = [];
        }
        var file = this.filesArray[this.fileIterator];
        reader.onload = function (e) {
            this.filesAfterReadArrays[this.fileIterator] = reader.result;
            //do something with the text here
            console.log("The parsed file is ");
            console.log(this.filesAfterReadArrays[this.fileIterator]);
            this.loadNext();
        }.bind(this);
        reader.readAsText(file);
    }
}