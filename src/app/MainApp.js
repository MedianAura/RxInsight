const Backbone = require("backbone");
const nunjucks = require("nunjucks");
const lodash = require("lodash");
const path = require("path");

const EditorController = require("./Controller/EditorController");
const CriteriaController = require("./Controller/CriteriaController");
const Criteria = require("./Model/Criteria");

nunjucks.configure(path.resolve(__dirname, "./View/").replace(/\\/gmi, "/") + "/");

const MainApp = Backbone.View.extend({
    "el": "#MainContent",
    "template": "MainApp.twig",

    // DATA
    oListCriteria: null,
    oEditorCtrl: null,

    events: {
        "click #btnAddCriteria": "eventAddCriteria"
    },

    initialize: function () {
        this.oListCriteria = new Backbone.Collection(null, {model: Criteria});

        // Ensure our methods keep the `this` reference to the view itself
        lodash.bindAll(this, 'renderList');

        // Bind collection changes to re-rendering
        this.oListCriteria.on('reset', this.renderList);
        this.oListCriteria.on('add', this.renderList);
        this.oListCriteria.on('remove', this.renderList);

        this.render();
        this.oEditorCtrl = new EditorController();
        this.addCriteria();
    },
    render: function () {
        this.$el.html(nunjucks.render(this.template));
    },
    renderList: function() {
        let self = this;
        let $container = this.$el.find(".list-criteria");
        $container.empty();

        // Go through the collection items
        this.oListCriteria.forEach(function (item) {
            let criteriaView = new CriteriaController({"model": item, "parent": self});
            criteriaView.render().$el.appendTo($container);
        });

        return this;
    },

    // PUBLIC
    showCriteria: function (criteria) {
        this.$el.find("#EditorPanel").html(this.oEditorCtrl.$el);
        this.oEditorCtrl.setCriteria(criteria);
    },
    addCriteria: function () {
        let oCriteriaController = new Criteria();
        this.oListCriteria.add(oCriteriaController);
    },
    removeCriteria: function (criteria) {
        this.oListCriteria.remove(criteria);
    },
    sortCriteria: function () {

    },

    // PRIVATE

    // EVENTS
    eventAddCriteria: function () {
        this.addCriteria();
    },
});

module.exports = MainApp;