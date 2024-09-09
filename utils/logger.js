class Logger {
    constructor(config) {
        this.config = config;
    }

    log(message) {
        console.log(message);
        if (this.config.showLog) {
            this.appendToLogField(message);
        }
    }

    appendToLogField(text) {
        let logField = $('#TQRScriptLog');
        if (logField.length === 0) {
            this.injectLogField();
            logField = $('#TQRScriptLog');
        }
        let newText = logField.html() + "<br />" + text;
        logField.html(newText);
    }

    injectLogField() {
        $('#contentInner').before('<div id="TQRScriptLog" style="color: black; background-color: #FFFCD9; font-size: 10pt;"><b>Information Log:</b></div>');
    }
}
