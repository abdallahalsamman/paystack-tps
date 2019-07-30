const express = require('express');
const cors = require('cors');
const paystack = require('paystack-api')('sk_test_6a395c86e68eaa86165d4401d0cbea05619f8573');
var bodyParser = require('body-parser')

const app = express();
app.use( cors() );
app.use( bodyParser.json() );

app.get('/api/transfers', (req, res) => {
  paystack.transfer
    .list()
    .then(body => res.send(body))
    .catch(error => res.send(error));
});

app.post('/api/transfers', (req, res) => {
  paystack.transfer_recipient
    .create({
      type: "nuban",
      name: req.body.account_name,
      account_number: req.body.account_number,
      bank_code: req.body.bank_code
    })
    .then(body => {
      paystack.transfer.create({
        source: "balance",
        amount: req.body.send_amount,
        recipient: body.data.recipient_code
      })
      .then(body => {
        res.send(body)
      })
      .catch(error => res.send(error));
    })
    .catch(error => res.send(error));
});

app.get('/api/banks', (req, res) => {
  paystack.misc
    .list_banks()
    .then(body => res.send(body))
    .catch(error => res.send(error));
});

app.listen(3000, () => console.log("App is listening on port 3000"));
