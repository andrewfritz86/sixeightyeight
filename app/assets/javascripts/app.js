console.log("app js linked")

//model for a bill
var Bill = Backbone.Model.extend({
  urlRoot: "/bills"
})


//individual bill views that watch individual models
var BillView = Backbone.View.extend({
  tagName: 'tr',
  template: $("#bill-template").html(),
  render: function(){
    var html = Mustache.render(this.template, this.model.attributes);
    this.$el.html(html);
    $("table").append(this.el);
  }
})


//collection of models
var Bills = Backbone.Collection.extend({
  model: Bill,
  url: "/bills",
})

//view that observes collection of models
var BillsView = Backbone.View.extend({
  collection: Bills,
  initialize: function(){
    this.listenTo(this.collection, 'add', this.addABill);
  },
  //function that fires each time a bill is added, creating a model and rendering out a bill.
  addABill: function(bill){
    var newView = new BillView({model: bill});
    newView.render();
  }
})


//view to watch the form

var FormView = Backbone.View.extend({
  events: {
    'click #addbill': 'createBillModel'
  },
  createBillModel: function(event){
    console.log("yay");
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

})












var bills = new Bills()
var viewz = new BillsView({collection: bills})
bills.fetch()

var f = new FormView({el: $("#form-container")})
