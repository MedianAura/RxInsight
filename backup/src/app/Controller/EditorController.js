const Backbone = require("backbone");
const lodash = require("lodash");
const nunjucks = require("nunjucks");

module.exports = Backbone.View.extend({
    "el": "#EditorPanel",
    "template": "EditorView.twig",

    // DATA

    events: {
        "keyup textarea": "eventBlurInput"
    },

    initialize: function () {
        // this.render();
    },
    render: function () {
        this.$el.html(nunjucks.render(this.template, {"item": this.model}));
    },
    renderPreview: function () {
        this.$el.find("#criteria-preview").html(this.model.prettyPrint());
    },

    // PUBLIC
    setCriteria: function (criteria) {
        this.$el.empty();
        this.model = criteria;
        if (criteria !== null) {
            this.render();
            this.renderPreview();
        }
    },

    // PRIVATE
    __editGiven: function (value) {
        this.model.set("given", value);
    },
    __editWhen: function (value) {
        this.model.set("when", value);
    },
    __editThen: function (value) {
        this.model.set("then", value);
    },

    // EVENTS
    eventBlurInput: lodash.debounce(function (event) {
        let $el = $(event.target);
        let id = $el.closest("div").data("section");
        switch (id) {
            case "given":
                this.__editGiven($el.val());
                break;
            case "when":
                this.__editWhen($el.val());
                break;
            case "then":
                this.__editThen($el.val());
                break;
        }

        this.renderPreview();
    }, 150),

});