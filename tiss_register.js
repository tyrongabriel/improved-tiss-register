// ==UserScript==
// @name       TISS Autoregister
// @namespace  http://www.tyrongabriel.com
// @version    1.0
// @description  Improved and modularized script to help you register quickly for groups, exams, and courses.
// @match      https://tiss.tuwien.ac.at/*
// @copyright  2024 Tyron Gabriel, MIT License
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require    https://raw.githubusercontent.com/tyrongabriel/improved-tiss-register/main/utils/config.js
// @require    https://raw.githubusercontent.com/tyrongabriel/improved-tiss-register/main/utils/logger.js
// @require    https://raw.githubusercontent.com/tyrongabriel/improved-tiss-register/main/utils/domUtils.js
// @require    https://raw.githubusercontent.com/tyrongabriel/improved-tiss-register/main/utils/registrationProcess.js
// ==/UserScript==

/*
MIT License
(...)
*/

(function TissRegister() {
    const config = getConfig();
    const logger = new Logger(config);
    const domUtils = new DomUtils(logger);
    const registrationProcess = new RegistrationProcess(config, logger, domUtils);

    if (config.scriptEnabled) {
        logger.log("TISS Quick Registration Script enabled");
        registrationProcess.init();
    } else {
        logger.log("TISS Quick Registration Script disabled");
    }
})();
