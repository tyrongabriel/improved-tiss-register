class DomUtils {
    constructor(logger) {
        this.logger = logger;
        this.extendJQuery();
    }

    extendJQuery() {
        jQuery.fn.justtext = function () {
            return $(this).clone()
                .children()
                .remove()
                .end()
                .text().trim();
        };
    }

    highlight(object) {
        object.css("background-color", "lightgreen");
    }

    getLVANumber() {
        return $('#contentInner').find('h1 span:first').text().trim();
    }

    getLVAName() {
        return $('#contentInner').find('h1').justtext();
    }

    getSelectedTab() {
        return $('li.ui-tabs-selected').text().trim();
    }

    getSubHeader() {
        return $('#contentInner').find('#subHeader').text().trim();
    }

    getRegistrationButton(groupWrapper) {
        let regButton = $(groupWrapper).find("input:submit[value='Anmelden']");
        if (regButton.length === 0) {
            regButton = $(groupWrapper).find("input:submit[value='Voranmelden']");
            if (regButton.length === 0) {
                regButton = $(groupWrapper).find("input:submit[value='Voranmeldung']");
            }
        }
        return regButton;
    }

    getGroupLabel(nameOfGroup) {
        let normConfName = nameOfGroup.trim().replace(/\s\s+/gi, ' ');
        return $(".groupWrapper .header_element span").filter(function () {
            let normName = $(this).text().trim().replace(/\s\s+/gi, ' ');
            return normName === normConfName;
        });
    }
    
    // Add other DOM manipulation methods as needed
}
