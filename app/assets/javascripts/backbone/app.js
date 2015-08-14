var BillsApp = BillsApp || { Models: {}, Views: {}, Collections: {} };

var bills;

BillsApp.Initialize = function(){

  bills = new BillsApp.Collections.Bills()
  var billzView = new BillsApp.Views.BillsView({collection: bills})
  var form = new BillsApp.Views.FormView({el: $("#form-container")})
  var promise = bills.fetch()
  var linkView = new BillsApp.Views.LinkView({el: $("#link-bar"), billsCollectionView: billzView, billsCollection: bills})

}

$(function(){
  BillsApp.Initialize();
});