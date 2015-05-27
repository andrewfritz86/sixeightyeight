
$('.ui.form')
  .form({
    name: {
      identifier  : 'bill-description',
      rules: [
        {
          type   : 'empty',
          prompt: 'Please enter a description'
        }
      ]
    },
    drop: {
      identifier  : 'bill-owner',
      rules: [
        {
          type   : 'empty',
          prompt: 'Please select an owner'
        }
      ]
    },
    dom: {
      identifier  : 'dom-owes',
      rules: [
        {
          type   : 'integer',
          prompt: 'Please enter how much Dom owes'
        }
      ]
    },
    andy: {
      identifier : 'andy-owes',
      rules: [
        {
          type   : 'integer',
          prompt: 'Please enter how much Andy owes'
        }
      ]
    },
    jamie: {
      identifier : 'jamie-owes',
      rules: [
        {
          type   : 'integer',
          prompt: 'Please enter how much Jamie owes'
        }
      ]
    },
    shamy: {
      identifier : 'shamy-owes',
      rules: [
        {
          type   : 'integer',
          prompt: 'Please enter how much Shamy owes'
        }
      ]
    }
  }, {on: 'submit', inline: 'true',})
;