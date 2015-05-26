console.log("app js linked")

var Bill = Backbone.Model.extend({
  urlRoot: "/bills"
})

var BillView = Backbone.View.extend({
  tagName: 'tr',
  template: '<td> {{owner}} </td> <td> {{name}} </td>',
  render: function(){
    var html = Mustache.render(this.template, this.model.attributes)
    this.$el.html(html)
    $("table").append(this.el)
  }
})

var b = new Bill({id: 1})
b.fetch()
var view = new BillView({model: b})