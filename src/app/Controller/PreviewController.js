const Backbone = require("backbone");
const lodash = require("lodash");
const nunjucks = require("nunjucks");
const {clipboard} = require('electron')

module.exports = Backbone.View.extend({
    "el": "#PreviewContainer",
    "template": "PreviewView.twig",

    // DATA
    parent: null,
    oListCriteria: null,
    sDisplayItem: "",

    events: {
        "click .btnCopyHTML": "eventClickBtnCopy"
    },

    initialize: function (options) {
        this.oListCriteria = null;
        this.sDisplayItem = "";
        this.parent = lodash.get(options, "parent", null);
    },
    render: function () {
        this.__buildCriteriaDisplay();
        this.$el.html(nunjucks.render(this.template, {"item": this.sDisplayItem}));
        return this;
    },

    // PUBLIC
    setModel: function (oListCriteria) {
        this.oListCriteria = oListCriteria;
        this.render();
    },

    // PRIVATE
    __buildCriteriaDisplay: function () {
        let self = this;

        this.sDisplayItem = "<ol>\n";
        this.oListCriteria.forEach(function (item) {
            self.sDisplayItem += "\t<li><p>" + item.prettyPrint() + "</p></li>\n";
        });
        this.sDisplayItem += "</ol>\n";
    },

    // EVENTS
    eventClickBtnCopy: function (event) {
        clipboard.write({"text": this.sDisplayItem, "html": this.sDisplayItem});
    }
});