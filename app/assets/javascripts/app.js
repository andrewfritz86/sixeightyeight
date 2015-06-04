console.log("app js linked")

//model for a bill
var Bill = Backbone.Model.extend({
  urlRoot: "/bills"
})


//individual bill views that watch individual models
var BillView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "destroy", this.remove)
  },
  events: {
    //listen for an 'input' event on html5 contenteditable areas
    'blur td': 'data',
    'click .delete': 'delete'
  },
  tagName: 'tr',
  template: $("#bill-template").html(),
  remove: function(){
    this.$el.remove()
  },
  render: function(){
    var html = Mustache.render(this.template, this.model.attributes);
    this.$el.html(html);
    $("#main-table").append(this.el);
  },
  delete: function(){
    // this.model.collection.remove(this.model)
    this.model.destroy()
    console.log("Delete")
  },
  data: function(event){
    var value = event.target.textContent.replace(/\s/g, '');
    //switch to "0" to parseInt
    if(value === ""){
      value = "0"
    }
    var isnum = /^\d+$/.test(value);
    if(isnum){
      console.log('valid')
      var updateObject = {};
      updateObject.dom_debt = parseInt(this.$el.find("#dom-debt").text())
      updateObject.andy_debt = parseInt(this.$el.find("#andy-debt").text())
      updateObject.shamy_debt = parseInt(this.$el.find("#shamy-debt").text())
      updateObject.jamie_debt = parseInt(this.$el.find("#jamie-debt").text())
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
    this.listenTo(this.collection, 'remove', this.totalRender)
  },
  //function that fires each time a bill is added, creating a model and rendering out a bill.
  addABill: function(bill){
    var newView = new BillView({model: bill});
    newView.render();
  },
  domOwed:function(){

     var outstanding = _.filter(this.collection.models, function(e){ return e.attributes.owner === "Dom" });

     //shamy owes
     var shamyArray = _.map(outstanding, function(e){
      return e.attributes.shamy_debt
     })
     var shamyTotal = _.reduce(shamyArray, function(memo, num){ return memo + num; }, 0);

     //jamie owes
     var jamieArray = _.map(outstanding, function(e){
      return e.attributes.jamie_debt
     })
     var jamieTotal = _.reduce(jamieArray, function(memo, num){ return memo + num; }, 0);

     //andy owes
     var andyArray = _.map(outstanding, function(e){
      return e.attributes.andy_debt
     })
     var andyTotal = _.reduce(andyArray, function(memo, num){ return memo + num; }, 0);

    //now build and object and return it
    return {shamyTotal: shamyTotal, jamieTotal: jamieTotal, andyTotal: andyTotal}

  },

  shamyOwed:function(){
     var outstanding = _.filter(this.collection.models, function(e){ return e.attributes.owner === "Shamy" });

     //andy owes
     var andyArray = _.map(outstanding, function(e){
      return e.attributes.andy_debt
     })
     var andyTotal = _.reduce(andyArray, function(memo, num){ return memo + num; }, 0);

     //jamie owes
     var jamieArray = _.map(outstanding, function(e){
      return e.attributes.jamie_debt
     })
     var jamieTotal = _.reduce(jamieArray, function(memo, num){ return memo + num; }, 0);

     //dom owes
     var domArray = _.map(outstanding, function(e){
      return e.attributes.dom_debt
     })
     var domTotal = _.reduce(domArray, function(memo, num){ return memo + num; }, 0);

     //now build and object and return it
    return {domTotal: domTotal, jamieTotal: jamieTotal, andyTotal: andyTotal}
  },

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
    this.billsCollectionView = options.billsCollectionView
    this.billsCollection = options.billsCollection
  },

  events:{
    'click #shamy-link': 'renderShamy',
    'click #dom-link': 'renderDom',
    'click #andy-link': 'renderAndy',
    'click #jamie-link': 'renderJamie'
  },

  renderShamy: function(){
    console.log("shamy modal")
    var totalOwed = this.billsCollectionView.shamyTotal()
    var debtors = this.billsCollectionView.shamyOwed()
    debtors.totalOwed = totalOwed
    var template = $("#shamy-modal-template").html()
    var html = Mustache.render(template,debtors)
    $("body").append(html)
    $('#shamy-modal').modal("setting", {onHidden: function(){
      console.log("hidden")
      this.remove()
    }})
    $('#shamy-modal').modal('show')
  },

  renderDom: function(){
    console.log("dommie modal")
    //somewhere in here we want to hit the collection to return the amount Dom owes
    var totalOwed = this.billsCollectionView.domTotal()
    var debtors = this.billsCollectionView.domOwed()
    debtors.totalOwed = totalOwed
    var template = $("#dom-modal-template").html()
    var html = Mustache.render(template,debtors)
    $("body").append(html)
    //add a setting to the modal to fire a callback when it's hidden. modal removes itself from dom.
    $('#dom-modal').modal("setting", {onHidden: function(){
      console.log("hidden")
      this.remove()
    }})
    $('#dom-modal').modal('show')
  },

  renderAndy: function(){
    console.log("andy modal")
  },

  renderJamie: function(){
    console.log("jamie modal")
  }

})


var bills = new Bills()
var billzView = new BillsView({collection: bills})
var form = new FormView({el: $("#form-container")})
var promise = bills.fetch()
var linkView = new LinkView({el: $("#link-bar"), billsCollectionView: billzView, billsCollection: bills})






