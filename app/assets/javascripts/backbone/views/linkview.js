var BillsApp = BillsApp || { Models: {}, Views: {}, Collections: {} };

  BillsApp.Views.LinkView = Backbone.View.extend({

  initialize: function(options){
    this.billsCollectionView = options.billsCollectionView;
    this.billsCollection = options.billsCollection;
  },

  events:{
    'click #shamy-link': 'renderShamy',
    'click #dom-link': 'renderDom',
    'click #andy-link': 'renderAndy',
    'click #jamie-link': 'renderJamie'
  },

  renderShamy: function(){
    var totalOwed = this.billsCollectionView.shamyTotal();
    var debtors = this.billsCollectionView.shamyOwed();
    debtors.totalOwed = totalOwed;
    var template = $("#shamy-modal-template").html();
    var html = Mustache.render(template,debtors);
    $("body").append(html);
    $('#shamy-modal').modal("setting", {onHidden: function(){
      this.remove();
    }});
    $('#shamy-modal').modal('show');
  },

  renderDom: function(){
    var totalOwed = this.billsCollectionView.domTotal();
    var debtors = this.billsCollectionView.domOwed();
    debtors.totalOwed = totalOwed;
    var template = $("#dom-modal-template").html();
    var html = Mustache.render(template,debtors);
    $("body").append(html);
    $('#dom-modal').modal("setting", {onHidden: function(){
      this.remove();
    }})
    $('#dom-modal').modal('show');
  },

  renderAndy: function(){
    var totalOwed = this.billsCollectionView.andyTotal();
    var debtors = this.billsCollectionView.andyOwed();
    debtors.totalOwed = totalOwed;
    var template = $("#andy-modal-template").html();
    var html = Mustache.render(template,debtors);
    $("body").append(html);
    $('#andy-modal').modal("setting", {onHidden: function(){
      this.remove();
    }})
    $('#andy-modal').modal('show');
  },

  renderJamie: function(){
    var totalOwed = this.billsCollectionView.jamieTotal();
    var debtors = this.billsCollectionView.jamieOwed();
    debtors.totalOwed = totalOwed;
    var template = $("#jamie-modal-template").html();
    var html = Mustache.render(template,debtors);
    $("body").append(html);
    $('#jamie-modal').modal("setting", {onHidden: function(){
      this.remove();
    }})
    $('#jamie-modal').modal('show');
  }

});