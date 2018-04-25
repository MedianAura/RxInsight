const Backbone = require("backbone");
const nunjucks = require("nunjucks");
const lodash = require("lodash");
const path = require("path");
const YAML = require('js-yaml');
const jetpack = require('fs-jetpack');
const remote = require('electron').remote;
const {dialog} = require('electron').remote;

const MainController = require("./Controller/MainController");
const PreviewController = require("./Controller/PreviewController");
const RedmineController = require("./Controller/RedmineController");
const Criteria = require("./Model/Criteria");

nunjucks.configure(path.resolve(__dirname, "./View/").replace(/\\/gmi, "/") + "/");

const MainApp = Backbone.View.extend({
    "el": "body",

    // DATA
    oArgs: null,
    oMainCtrl: null,
    oPreviewCtrl: null,
    oRedmineCtrl: null,

    events: {
        "click .btnEditor": "eventClickBtnEditor",
        "click .btnPreview": "eventClickBtnPreview",
        "click .btnRedmine": "eventClickBtnRedmine",
        "click .btnNew": "eventClickBtnNew",
        "click .btnOpen": "eventClickBtnOpen",
        "click .btnSave": "eventClickBtnSave",
        "click .btnImport": "eventClickBtnImport",
        "click #ImportModal .btn-primary": "eventClickImportModal"
    },

    initialize: function () {
        this.oArgs = remote.getGlobal('args');
        this.oMainCtrl = new MainController();
        this.oPreviewCtrl = new PreviewController();
        this.oRedmineCtrl = new RedmineController();
        this.showEditor();
    },
    render: function () {
    },

    // PUBLIC
    showEditor: function () {
        this.$el.find(".app-container-panel").hide();
        this.oMainCtrl.$el.show();
    },
    showPreview: function () {
        this.$el.find(".app-container-panel").hide();

        this.oPreviewCtrl.setModel(this.oMainCtrl.oListCriteria);
        this.oPreviewCtrl.$el.show();
    },
    showRedmine: function () {
        this.$el.find(".app-container-panel").hide();

        this.oRedmineCtrl.setModel(this.oMainCtrl.oListCriteria);
        this.oRedmineCtrl.$el.show();
    },

    // PRIVATE
    __changeActiveLink: function ($el) {
        this.$el.find(".rx-main-navbar").find("li").removeClass("active");
        $el.addClass("active");
    },
    __parseLoadedData: function (sData) {
        let aListCriteria = [];
        let oData = YAML.safeLoad(sData);
        lodash.each(oData, function (item) {
            let oCriteria = new Criteria();
            oCriteria.set("given", item.given);
            oCriteria.set("when", item.when);
            oCriteria.set("then", item.then);
            aListCriteria.push(oCriteria);
        });
        this.oMainCtrl.oListCriteria.reset(aListCriteria);
        this.oPreviewCtrl.setModel(this.oMainCtrl.oListCriteria);
    },
    __parseFormatedText: function (sData) {
        const RegEx = require('regex-match-all');
        let aLine = sData.replace(/\r\n/gmi, "\n").split("\n");

        const updateCriteriaField = function (oCriteria, fullMatch, fieldType, field, text) {
            if (fieldType.toLowerCase() === field) {

                if (fullMatch.toLowerCase().indexOf("or") > -1) {
                    oCriteria.set(field, oCriteria.get(field) + "\r\n~ " + text);
                } else if (fullMatch.toLowerCase().indexOf("and") > -1) {
                    oCriteria.set(field, oCriteria.get(field) + "\r\n" + text);
                } else {
                    oCriteria.set(field, text);
                }
            }
        };

        let aListCriteria = [];
        let oCriteria = new Criteria();
        lodash.each(aLine, function (sLine, ndx) {
            if (sLine.trim() === "" && ndx !== 0) {
                aListCriteria.push(oCriteria);
                oCriteria = new Criteria();
                return;
            }

            let oMatch = RegEx.matchAll(/\((?:and|or)?\s*(given|when|then)\)/gmi, sLine);
            let sCondition = sLine.split(oMatch[0][0])[1].trim();

            updateCriteriaField(oCriteria, oMatch[0][0], oMatch[1][0], "given", sCondition);
            updateCriteriaField(oCriteria, oMatch[0][0], oMatch[1][0], "when", sCondition);
            updateCriteriaField(oCriteria, oMatch[0][0], oMatch[1][0], "then", sCondition);
        });

        aListCriteria.push(oCriteria);
        this.oMainCtrl.oListCriteria.reset(aListCriteria);
        this.oPreviewCtrl.setModel(this.oMainCtrl.oListCriteria);
    },

    // EVENTS
    eventClickBtnEditor: function (event) {
        $(event.target).blur();
        let $el = $(event.target).closest("li");
        this.showEditor();
        this.__changeActiveLink($el);
    },
    eventClickBtnPreview: function (event) {
        $(event.target).blur();
        let $el = $(event.target).closest("li");
        this.showPreview();
        this.__changeActiveLink($el);
    },
    eventClickBtnRedmine: function (event) {
        $(event.target).blur();
        let $el = $(event.target).closest("li");
        this.showRedmine();
        this.__changeActiveLink($el);
    },
    eventClickBtnNew: function (event) {
        $(event.target).blur();
        this.oMainCtrl.oListCriteria.reset();
        this.oMainCtrl.oEditorCtrl.setCriteria(null);
        this.oMainCtrl.addCriteria();
    },
    eventClickBtnOpen: function (event) {
        $(event.target).blur();
        let sFile = dialog.showOpenDialog(remote.getCurrentWindow(), {
            "properties": ['openFile', 'promptToCreate'], "filters": [
                {name: 'Fichier YAML', extensions: ['yaml']},
            ]
        });

        if (sFile.length > 0) {
            let sData = jetpack.read(sFile[0]);
            this.__parseLoadedData(sData);
        }
    },
    eventClickBtnSave: function (event) {
        $(event.target).blur();
        let sFile = dialog.showSaveDialog(remote.getCurrentWindow(), {
            "filters": [
                {name: 'Fichier YAML', extensions: ['yaml']},
            ]
        });

        jetpack.write(sFile, YAML.safeDump(this.oMainCtrl.oListCriteria.toJSON()));
    },
    eventClickBtnImport: function (event) {
        $(event.target).blur();
        this.$el.find("#form-import-data").val("");
        $('#ImportModal').modal('show');
    },
    eventClickImportModal: function () {
        let sData = this.$el.find("#form-import-data").val();
        $('#ImportModal').modal('hide');
        this.$el.find("#form-import-data").val("");
        this.__parseFormatedText(sData);
    }
});

module.exports = MainApp;