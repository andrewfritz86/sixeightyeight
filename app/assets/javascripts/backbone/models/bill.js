var BillsApp = BillsApp || { Models: {}, Views: {}, Collections: {} };


BillsApp.Models.Bill = Backbone.Model.extend({
  urlRoot: "/bills"
});