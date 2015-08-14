var BillsApp = BillsApp || { Models: {}, Views: {}, Collections: {} };

  BillsApp.Views.BillsView = Backbone.View.extend({
  collection: BillsApp.Collections.Bills,
  initialize: function(){
    this.listenTo(this.collection, 'add', this.addABill);
    this.listenTo(this.collection, 'sync', this.totalRender);
    this.listenTo(this.collection, 'remove', this.totalRender);
  },
  //function that fires each time a bill is added, creating a model and rendering out a bill.
  addABill: function(bill){
    var newView = new BillsApp.Views.BillView({model: bill});
    newView.render();
  },
  domOwed: function(){

     var outstanding = _.filter(this.collection.models, function(e){ return e.attributes.owner === "Dom" });

     //shamy owes
     var shamyArray = _.map(outstanding, function(e){
      return e.attributes.shamy_debt;
     })
     var shamyTotal = _.reduce(shamyArray, function(memo, num){ return memo + num; }, 0);

     //jamie owes
     var jamieArray = _.map(outstanding, function(e){
      return e.attributes.jamie_debt;
     })
     var jamieTotal = _.reduce(jamieArray, function(memo, num){ return memo + num; }, 0);

     //andy owes
     var andyArray = _.map(outstanding, function(e){
      return e.attributes.andy_debt;
     })
     var andyTotal = _.reduce(andyArray, function(memo, num){ return memo + num; }, 0);

     //now build and object and return it
     return {shamyTotal: shamyTotal, jamieTotal: jamieTotal, andyTotal: andyTotal};

  },

  shamyOwed: function(){
     var outstanding = _.filter(this.collection.models, function(e){ return e.attributes.owner === "Shamy" });

     //andy owes
     var andyArray = _.map(outstanding, function(e){
      return e.attributes.andy_debt;
     })
     var andyTotal = _.reduce(andyArray, function(memo, num){ return memo + num; }, 0);

     //jamie owes
     var jamieArray = _.map(outstanding, function(e){
      return e.attributes.jamie_debt;
     })
     var jamieTotal = _.reduce(jamieArray, function(memo, num){ return memo + num; }, 0);

     //dom owes
     var domArray = _.map(outstanding, function(e){
      return e.attributes.dom_debt;
     })
     var domTotal = _.reduce(domArray, function(memo, num){ return memo + num; }, 0);

     //now build and object and return it
     return {domTotal: domTotal, jamieTotal: jamieTotal, andyTotal: andyTotal};
  },

  andyOwed: function(){
     var outstanding = _.filter(this.collection.models, function(e){ return e.attributes.owner === "Andy" });

     //jamie owes
     var jamieArray = _.map(outstanding, function(e){
      return e.attributes.jamie_debt;
     })
     var jamieTotal = _.reduce(jamieArray, function(memo, num){ return memo + num; }, 0);

     //dom owes
     var domArray = _.map(outstanding, function(e){
      return e.attributes.dom_debt;
     })
     var domTotal = _.reduce(domArray, function(memo, num){ return memo + num; }, 0);

     //shamy owes
     var shamyArray = _.map(outstanding, function(e){
      return e.attributes.shamy_debt;
     })
     var shamyTotal = _.reduce(shamyArray, function(memo, num){ return memo + num; }, 0);

     //now build and object and return it
     return {domTotal: domTotal, jamieTotal: jamieTotal, shamyTotal: shamyTotal};
  },

  jamieOwed: function(){
    console.log("jamieowed")
    var outstanding = _.filter(this.collection.models, function(e){ return e.attributes.owner === "Jamie" });
     //dom owes
    var domArray = _.map(outstanding, function(e){
      return e.attributes.dom_debt;
    })
    var domTotal = _.reduce(domArray, function(memo, num){ return memo + num; }, 0);

    //shamy owes
    var shamyArray = _.map(outstanding, function(e){
      return e.attributes.shamy_debt;
    })
    var shamyTotal = _.reduce(shamyArray, function(memo, num){ return memo + num; }, 0);

    //andy owes
    var andyArray = _.map(outstanding, function(e){
      return e.attributes.andy_debt;
    })
    var andyTotal = _.reduce(andyArray, function(memo, num){ return memo + num; }, 0);

    //build and return object
    return {domTotal: domTotal, andyTotal: andyTotal, shamyTotal: shamyTotal};
  },

  domTotal: function(){
    var total = this.collection.pluck("dom_debt");
    var sum = _.reduce(total, function(init, num){return init + num}, 0); 
    this.trigger("domTotal");
    return sum;
  },
  andyTotal: function(){
    var total = this.collection.pluck("andy_debt");
    var sum = _.reduce(total, function(init, num){return init + num}, 0);
    this.trigger("domTotal");
    return sum;
  },
  shamyTotal: function(){
    var total = this.collection.pluck("shamy_debt");
    var sum = _.reduce(total, function(init, num){return init + num}, 0);
    this.trigger("domTotal");
    return sum;
  },
  jamieTotal: function(){
    var total = this.collection.pluck("jamie_debt");
    var sum = _.reduce(total, function(init, num){return init + num}, 0); 
    this.trigger("domTotal");
    return sum;
  },
  totalRender: function(){
    var dom = this.domTotal();
    var andy = this.andyTotal();
    var shamy = this.shamyTotal();
    var jamie = this.jamieTotal();
    var template = $("#total-template").html( );
    var html = Mustache.render(template, {andy_total: andy, shamy_total: shamy, jamie_total: jamie, dom_total: dom});
    $("#totals").html(html);
  }
});