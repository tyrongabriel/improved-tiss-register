class RegistrationProcess {
    constructor(config, logger, domUtils) {
        this.config = config;
        this.logger = logger;
        this.domUtils = domUtils;
    }

    init() {
        // Initialization logic
        this.logger.log("Initializing registration process...");
        this.tissQuickRegistration();
    }

    tissQuickRegistration() {
        if (this.config.scriptEnabled) {
            this.logger.log("TISS Quick Registration Script enabled");
            this.logger.log("LVA Number: " + this.domUtils.getLVANumber());
            this.logger.log("LVA Name: " + this.domUtils.getLVAName());
            this.logger.log("Selected Tab: " + this.domUtils.getSelectedTab());

            if (this.config.registrationType === "lva") {
                this.config.nameOfGroup = "LVA-Anmeldung";
            }

            if (!this.config.lvaCheckEnabled || this.doLvaCheck()) {
                if (!this.config.lvaSemesterCheckEnabled || this.doSemesterCheck()) {
                    if (this.config.registrationType !== "exam") {
                        let groupLabel = this.doGroupCheck();
                        if (groupLabel !== null) {
                            this.domUtils.highlight(groupLabel);
                        }
                    } else {
                        let examLabel = this.doExamCheck();
                        if (examLabel !== null) {
                            this.domUtils.highlight(examLabel);
                            this.logger.log("Prüfung: " + examLabel.text().trim());
                        }
                    }
                }
            }

            if (this.config.startAtSpecificTime) {
                this.logger.log("Scripts starts at: " + this.getFormatedDate(this.config.specificStartTime));
                this.logger.log("Delay adjustment in ms: " + this.config.delayAdjustmentInMs);
                this.startTimer(this.config.specificStartTime.getTime() - this.config.delayAdjustmentInMs);
            } else {
                this.analysePage();
            }

        } else {
            this.logger.log("TISS Quick Registration Script disabled");
        }
    }

    startTimer(startTime) {
        let offset = startTime - new Date().getTime();
        if (offset > 0) {
            this.startRefreshTimer(startTime);
        } else {
            this.analysePage();
        }
    }

    startRefreshTimer(startTime) {
        this.printTimeToStart(startTime);

        let maxMillis = 2147483647;
        let offset = startTime - new Date().getTime();

        if (offset > maxMillis) {
            offset = maxMillis;
        }

        window.setTimeout(this.refreshPage, offset);
    }

    printTimeToStart(startTime) {
        let offset = (startTime - new Date().getTime()) / 1000;
        let out = "Refresh in: ";
        let minutes = offset / 60;
        if (minutes > 1) {
            let hours = minutes / 60;
            if (hours > 1) {
                out += Math.floor(hours) + " hours, ";
                minutes = minutes % 60;
            }
            out += Math.floor(minutes) + " minutes and ";
        }
        let seconds = offset % 60;
        out += Math.floor(seconds) + " seconds";
        this.logger.log(out);

        window.setTimeout(() => {
            this.printTimeToStart(startTime);
        }, 1000);
    }

    refreshPage() {
        location.reload();
    }

    analysePage() {
        let tab = this.domUtils.getSelectedTab();
        let confirmButton = this.domUtils.getConfirmButton();
        let okButton = this.domUtils.getOkButton();
        let studyCodeSelect = this.domUtils.getStudyCodeSelect();

        if (tab === "LVA-Anmeldung") {
            this.onLVAPage();
        } else if (tab === "Gruppen") {
            this.onGroupPage();
        } else if (tab === "Prüfungen") {
            this.onExamPage();
        } else if (studyCodeSelect.length > 0) {
            this.onStudyCodeSelectPage();
        } else if (confirmButton.length > 0) {
            this.onConfirmPage();
        } else if (okButton.length > 0) {
            this.onConfirmInfoPage();
        }
    }

    // Add other necessary methods as needed

    doLvaCheck() {
        let lvaNumber = this.domUtils.getLVANumber().replace(/[^\d]/, '');
        let optionsLvaNumber = this.config.lvaNumber.replace(/[^\d]/, '');
        if (lvaNumber !== optionsLvaNumber) {
            this.logger.log('wrong lva number error: expected: ' + optionsLvaNumber + ', got: ' + lvaNumber);
            return false;
        }
        return true;
    }

    doSemesterCheck() {
        let subheader = this.domUtils.getSubHeader();
        if (subheader.indexOf(this.config.lvaSemester) === -1) {
            this.logger.log('wrong semester error: expected: ' + this.config.lvaSemester + ', got: ' + subheader.substring(0, 5));
            return false;
        }
        return true;
    }

    doGroupCheck() {
        let groupLabel = this.domUtils.getGroupLabel(this.config.nameOfGroup);
        if (groupLabel.length === 0) {
            this.logger.log('group not found error: ' + this.config.nameOfGroup);
            return null;
        } else {
            return groupLabel;
        }
    }

    // Add other methods like doExamCheck, onLVAPage, onGroupPage, etc.

    getFormatedDate(date) {
        return "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
    }
}
