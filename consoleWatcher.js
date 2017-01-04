/**
 * Created by Nagasudhir on 1/2/2017.
 */
"use strict";

function consoleWatcher() {
    this.count = 0;
    this.increment_by = increment_by.bind(this);
    this.set_count = set_count.bind(this);

    function increment_by(num) {
        if (num == null || isNaN(num)) {
            num = 1;
        }
        this.count += num;
    }

    function set_count(num) {
        if (num == null || isNaN(num)) {
            return;
        }
        this.count = num;
    }
}