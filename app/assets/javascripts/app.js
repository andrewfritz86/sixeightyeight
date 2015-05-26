console.log("app js linked")

var Bill = Backbone.Model.extend({
  urlRoot: "/bills"
})

var BillView = Backbone.View.extend({
  tagName: 'tr',
  template: $("#bill-template").html(),
  // template: '<td> {{name}} </td> <td> {{owner}} </td> <td> {{dom_debt}} </td> <td> {{shamy_debt}} </td> <td> {{jamie_debt}} </td> <td> {{andy_debt}} </td>',
  render: function(){
    var html = Mustache.render(this.template, this.model.attributes)
    this.$el.html(html)
    $("table").append(this.el)
  }
})

var b = new Bill({id: 1})
b.fetch()
var view = new BillView({model: b})
