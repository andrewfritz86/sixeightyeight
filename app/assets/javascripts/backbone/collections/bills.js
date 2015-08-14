var BillsApp = BillsApp || { Models: {}, Views: {}, Collections: {} };

BillsApp.Collections.Bills = Backbone.Collection.extend({
  model: BillsApp.Models.Bill,
  url: "/bills",
});