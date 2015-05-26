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
    var html = Mustache.render(this.template, this.model.attributes)
    this.$el.html(html)
    $("table").append(this.el)
  }
})


//collection of models
var Bills = Backbone.Collection.extend({
  model: Bill,
  url: "/bills",
  addABill: function(){
    console.log("added a bill!");
  }
})

//view that observes collection of models
var BillsView = Backbone.View.extend({
  collection: Bills,
  initialize: function(){
    this.listenTo(this.collection, 'add', this.collection.addABill);
  }
})














// var b = new Bill({id: 1})
// b.fetch()
// var view = new BillView({model: b})


var bills = new Bills()
var viewz = new BillsView({collection: bills})
