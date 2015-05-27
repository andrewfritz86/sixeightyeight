
//.form takes an object containing rules for validations, as well as options for the validation
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
          prompt: 'How much does Dom owe?'
        }
      ]
    },
    andy: {
      identifier : 'andy-owes',
      rules: [
        {
          type   : 'integer',
          prompt: 'How much does Andy owe?'
        }
      ]
    },
    jamie: {
      identifier : 'jamie-owes',
      rules: [
        {
          type   : 'integer',
          prompt: 'How much does Jamie owe?'
        }
      ]
    },
    shamy: {
      identifier : 'shamy-owes',
      rules: [
        {
          type   : 'integer',
          prompt: 'How much does Shamy owe?'
        }
      ]
    }
  }, {on: 'submit', inline: 'true'})

