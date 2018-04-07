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
    oCurrentCriteria: null,
    oListCriteria: null,
    oEditorCtrl: null,

    events: {
        "click #btnAddCriteria": "eventAddCriteria"
    },

    initialize: function () {
        this.oCurrentCriteria = null;
        this.oListCriteria = new Backbone.Collection(null, {model: Criteria});

        // Ensure our methods keep the `this` reference to the view itself
        lodash.bindAll(this, 'renderList');

        // Bind collection changes to re-rendering
        this.oListCriteria.on('change', this.renderList);
        this.oListCriteria.on('reset', this.renderList);
        this.oListCriteria.on('add', this.renderList);
        this.oListCriteria.on('remove', this.renderList);

        this.render();
        this.oEditorCtrl = new EditorController();
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
            if (item === self.oCurrentCriteria) {
                criteriaView.__highlightCurrent();
            }
        });

        return this;
    },

    // PUBLIC
    showCriteria: function (criteria) {
        this.$el.find("#EditorPanel").html(this.oEditorCtrl.$el);
        this.oCurrentCriteria = criteria;
        this.oEditorCtrl.setCriteria(criteria);
    },
    addCriteria: function () {
        let oCriteria = new Criteria();
        oCriteria.setDefaultValue();
        this.oCurrentCriteria = oCriteria;
        this.oListCriteria.add(oCriteria);
        this.oEditorCtrl.setCriteria(oCriteria);
    },
    removeCriteria: function (criteria) {
        if (criteria === this.oCurrentCriteria) {
            this.oCurrentCriteria = null;
            this.oEditorCtrl.setCriteria(null);
        }
        this.oListCriteria.remove(criteria);
    },
    copyCriteria: function (criteria) {
        let oCriteria = criteria.clone();
        this.oCurrentCriteria = oCriteria;
        this.oListCriteria.add(oCriteria);
        this.oEditorCtrl.setCriteria(oCriteria);
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