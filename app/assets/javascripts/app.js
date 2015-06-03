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
    $("#main-table").append(this.el);
  },
  data: function(event){
    //need to run the isnum test on the cell that has been edited
    //use event.target
    //strip out spaces, was throwing off the check to see if a number appears
    var value = event.target.textContent.replace(/\s/g, '');
    var isnum = /^\d+$/.test(value);
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

      //grab current text, strip out bad characters, replace text in cell
      var currentText = event.target.textContent;
      var resetText = event.target.textContent.replace(/\D/g, "");
      event.target.textContent = resetText;

      //setTimeout change background color of cell
      $(event.target).toggleClass("invalid")
      //change header temporarily
      var header = "<h1 id='warning' class='ui header animated pulse'> Please Enter a Number! </h1>"
      $("#header").html(header)
      function toggler(){
        $(event.target).toggleClass("invalid")
        $("#header").html("<h1 class= 'ui teal header animated pulse'> 140 10th Billz, Ya'll </h1>")
      }
      setTimeout(toggler,1300)
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
    this.listenTo(this.collection, 'sync', this.totalRender);
  },
  //function that fires each time a bill is added, creating a model and rendering out a bill.
  addABill: function(bill){
    var newView = new BillView({model: bill});
    newView.render();
  },
  //this should be a function where a name of a person owed is passed in as an argument
  domTotal: function(){
    var total = this.collection.pluck("dom_debt");
    var sum = _.reduce(total, function(init, num){return init + num}, 0) 
    this.trigger("domTotal")
    return sum
  },
  andyTotal: function(){
    var total = this.collection.pluck("andy_debt");
    var sum = _.reduce(total, function(init, num){return init + num}, 0) 
    this.trigger("domTotal")
    return sum
  },
  shamyTotal: function(){
    var total = this.collection.pluck("shamy_debt");
    var sum = _.reduce(total, function(init, num){return init + num}, 0) 
    this.trigger("domTotal")
    return sum
  },
  jamieTotal: function(){
    var total = this.collection.pluck("jamie_debt");
    var sum = _.reduce(total, function(init, num){return init + num}, 0) 
    this.trigger("domTotal")
    return sum
  },
  totalRender: function(){
    var dom = this.domTotal()
    var andy = this.andyTotal()
    var shamy = this.shamyTotal()
    var jamie = this.jamieTotal()
    var template = $("#total-template").html( )
    var html = Mustache.render(template, {andy_total: andy, shamy_total: shamy, jamie_total: jamie, dom_total: dom})
    $("#totals").html(html)
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

//view observing link bar
var LinkView = Backbone.View.extend({

  initialize: function(options){
    this.billsCollection = options.billsCollection
  },

  events:{
    'click #shamy-link': 'renderShamy',
    'click #dom-link': 'renderDom',
    'click #andy-link': 'renderAndy',
    'click #jamie-link': 'renderJamie'
  },

  renderShamy: function(){
    $(".ui.card").remove()
    var template = $("#shamy-card").html()
    $("#bio").append(template)
  },

  renderDom: function(){
    //somewhere in here we want to hit the collection to return the amount Dom owes
    var sum = this.billsCollection.domTotal()
    //grab the sum above, now we need to actually mustache in the template
    $(".ui.card").remove()
    var template = $("#dom-card").html()
    $("#bio").append(template)
  },

  renderAndy: function(){
    $(".ui.card").remove()
    var template = $("#andy-card").html()
    $("#bio").append(template)
  },

  renderJamie: function(){
    console.log("renderDom")
    $(".ui.card").remove()
    var template = $("#jamie-card").html()
    $("#bio").append(template)
  }

})


var bills = new Bills()
var billzView = new BillsView({collection: bills})
var form = new FormView({el: $("#form-container")})
var promise = bills.fetch()
var linkView = new LinkView({el: $("#link-bar"), billsCollection: billzView})






