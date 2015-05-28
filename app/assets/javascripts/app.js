console.log("app js linked")

//model for a bill
var Bill = Backbone.Model.extend({
  urlRoot: "/bills"
})


//individual bill views that watch individual models
var BillView = Backbone.View.extend({
  events: {
    //listen for an 'input' event on html5 contenteditable areas
    'blur td': 'data'
  },
  tagName: 'tr',
  template: $("#bill-template").html(),
  render: function(){
    var html = Mustache.render(this.template, this.model.attributes);
    this.$el.html(html);
    $("table").append(this.el);
  },
  data: function(event){
    //need to run the isnum test on the cell that has been edited
    //use event.target
    //strip out spaces, was throwing off the check to see if a number appears
    var value = event.target.textContent.replace(/\s/g, '');
    var isnum = /^\d+$/.test(value);
    console.log(isnum)
    if(isnum){
      console.log('valid')
      var updateObject = {};
      updateObject.dom_debt = this.$el.find("#dom-debt").text()
      updateObject.andy_debt = this.$el.find("#andy-debt").text()
      updateObject.shamy_debt = this.$el.find("#shamy-debt").text()
      updateObject.jamie_debt = this.$el.find("#jamie-debt").text()
      this.model.set(updateObject)
      this.model.save() 
    }else{
      var currentText = event.target.textContent;
      var resetText = event.target.textContent.replace(/\D/g, "");
      //strip out any non integer, reset content
      event.target.textContent = resetText;
      //TODO reset cell value to be what it was before change(maybe regex to delete all non-integers?)
      //setTimeout change background color of cell
      $(event.target).toggleClass("invalid")
      //change header temporarily
      var header = "<h1 id='warning' class='ui header'> NEEDS TO BE A NUMBER </h1>"
      $("#header").html(header)
      function toggler(){
        $(event.target).toggleClass("invalid")
        $("#header").html("<h1 class= 'ui teal header'> 140 10th Billz, Ya'll </h1>")
      }
      setTimeout(toggler,1000)
    }
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

})

var bills = new Bills()
var billzView = new BillsView({collection: bills})
var form = new FormView({el: $("#form-container")})
bills.fetch()


// var app = {
//   bills: new Bills(),
//   makeViews: function(){
//     var viewz = new BillsView({collection: this.bills})
//   },
//   form: new FormView({el: $("#form-container")}),
//   start: function(){
//     this.makeViews()
//     this.bills.fetch()
//   }
// }


// app.start()

