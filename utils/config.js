function getConfig() {
    return {
        scriptEnabled: true,
        registrationType: "group",
        nameOfGroup: "Gruppe 001",
        nameOfExam: "Name Of Exam",
        dateOfExam: '',
        lvaCheckEnabled: true,
        lvaNumber: "123.456",
        studyCode: '',
        lvaSemesterCheckEnabled: true,
        lvaSemester: "2019W",
        openPanel: true,
        autoRegister: true,
        autoConfirm: true,
        autoRefresh: true,
        autoOkPressAtEnd: true,
        okPressAtEndDelayInMs: 1000,
        startAtSpecificTime: true,
        specificStartTime: new Date(2020, 1 - 1, 9, 20, 27, 0, 0),
        delayAdjustmentInMs: 300,
        showLog: true
    };
}
