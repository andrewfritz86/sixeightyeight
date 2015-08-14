// var BillsApp = BillsApp || { Models: {}, Views: {}, Collections: {} };

  BillsApp.Views.FormView = Backbone.View.extend({
  events: {
    'click #addbill': 'createBillModel'
  },
  createBillModel: function(event){
    if($(".ui.form").form('validate form')){
      var input = {
        owner: $("#bill-owner").val(),
        name: $("#bill-description").val(),
        andy_debt: $("#andy-owes").val(),
        dom_debt: $("#dom-owes").val(),
        jamie_debt: $("#jamie-owes").val(),
        shamy_debt: $("#shamy-owes").val()
      }
      $('#billform').trigger("reset");
      var newModel = new Bill(input);
      newModel.save();
      bills.add(newModel);
    }
  }
});