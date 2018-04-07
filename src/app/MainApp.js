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
const Criteria = require("./Model/Criteria");

nunjucks.configure(path.resolve(__dirname, "./View/").replace(/\\/gmi, "/") + "/");

const MainApp = Backbone.View.extend({
    "el": "body",

    // DATA
    oMainCtrl: null,
    oPreviewCtrl: null,

    events: {
        "click .btnEditor": "eventClickBtnEditor",
        "click .btnPreview": "eventClickBtnPreview",
        "click .btnOpen": "eventClickBtnOpen",
        "click .btnSave": "eventClickBtnSave",
        "click .btnImport": "eventClickBtnImport",
        "click #ImportModal .btn-primary": "eventClickImportModal"
    },

    initialize: function () {
        this.oMainCtrl = new MainController();
        this.oPreviewCtrl = new PreviewController();
        this.showEditor();
    },
    render: function () {
    },

    // PUBLIC
    showEditor: function () {
        this.oPreviewCtrl.$el.hide();
        this.oMainCtrl.$el.show();
    },
    showPreview: function () {
        this.oMainCtrl.$el.hide();

        this.oPreviewCtrl.setModel(this.oMainCtrl.oListCriteria);
        this.oPreviewCtrl.$el.show();
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
        this.__parseLoadedData(sData);
    }
});

module.exports = MainApp;