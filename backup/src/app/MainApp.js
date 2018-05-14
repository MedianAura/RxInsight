const Backbone = require("backbone");
const nunjucks = require("nunjucks");
const lodash = require("lodash");
const path = require("path");
const YAML = require('js-yaml');
const jetpack = require('fs-jetpack');
const remote = require('electron').remote;
const {dialog} = require('electron').remote;

const MainApp = Backbone.View.extend({
    "el": "body",

    // DATA
    oArgs: null,

    events: {
        "click .btnNew": "eventClickBtnNew",
        "click .btnOpen": "eventClickBtnOpen",
        "click .btnSave": "eventClickBtnSave",
        "click .btnImport": "eventClickBtnImport",
        "click #ImportModal .btn-primary": "eventClickImportModal"
    },

    initialize: function () {
        this.oArgs = remote.getGlobal('args');
    },

    // PUBLIC

    // PRIVATE

    // EVENTS
    eventClickBtnSave: function (event) {
        $(event.target).blur();
        let sFile = dialog.showSaveDialog(remote.getCurrentWindow(), {
            "filters": [
                {name: 'Fichier YAML', extensions: ['yaml']},
            ]
        });

        jetpack.write(sFile, YAML.safeDump(this.oMainCtrl.oListCriteria.toJSON()));
    },
});

module.exports = MainApp;