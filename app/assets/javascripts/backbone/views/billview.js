var BillsApp = BillsApp || { Models: {}, Views: {}, Collections: {} };

  BillsApp.Views.BillView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "destroy", this.remove);
  },
  events: {
    //listen for an 'input' event on html5 contenteditable areas
    'blur td': 'data',
    'click .delete': 'delete'
  },
  tagName: 'tr',
  template: $("#bill-template").html(),
  remove: function(){
    this.$el.remove();
  },
  render: function(){
    var html = Mustache.render(this.template, this.model.attributes);
    this.$el.html(html);
    $("#main-table").append(this.el);
  },
  delete: function(){
    // this.model.collection.remove(this.model)
    this.model.destroy();
  },
  data: function(event){
    var value = event.target.textContent.replace(/\s/g, '');
    //switch to "0" to parseInt
    if(value === ""){
      value = "0";
    }
    var isnum = /^\d+$/.test(value);
    if(isnum){
      console.log('valid')
      var updateObject = {};
      updateObject.dom_debt = parseInt(this.$el.find("#dom-debt").text());
      updateObject.andy_debt = parseInt(this.$el.find("#andy-debt").text());
      updateObject.shamy_debt = parseInt(this.$el.find("#shamy-debt").text());
      updateObject.jamie_debt = parseInt(this.$el.find("#jamie-debt").text());
      this.model.set(updateObject);
      this.model.save();
    }else{

      //grab current text, strip out bad characters, replace text in cell
      var currentText = event.target.textContent;
      var resetText = event.target.textContent.replace(/\D/g, "");
      event.target.textContent = resetText;

      //setTimeout change background color of cell
      $(event.target).toggleClass("invalid");
      //change header temporarily
      var header = "<h1 id='warning' class='ui header animated pulse'> Please Enter a Number! </h1>";
      $("#header").html(header);
      function toggler(){
        $(event.target).toggleClass("invalid");
        $("#header").html("<h1 class= 'ui teal header animated pulse'> 140 10th Billz, Ya'll </h1>");
      }
      setTimeout(toggler,1300);
    }
  }
});