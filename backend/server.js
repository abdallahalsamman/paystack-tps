const express = require('express');
const path = require("path");
const cors = require('cors');
const paystack = require('paystack-api')('sk_test_6a395c86e68eaa86165d4401d0cbea05619f8573');
var bodyParser = require('body-parser')

const port = process.env.PORT || 80

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
        amount: req.body.send_amount * 100,
        recipient: body.data.recipient_code,
        reason: req.body.reason,
        reference: req.body.reference,
      })
      .then(body => {
        res.send(body)
      })
      .catch(error => {
        res.send(error)
      });
    })
    .catch(error => res.send(error));
});

app.post('/api/transfers_finalize', (req, res) => {
  console.log(req.body)
  paystack.transfer
    .finalize({
      transfer_code: req.body.transfer_code,
      otp: req.body.otp
    })
    .then(body => {
      console.log("transfer.finalize", body)
      res.send(body)
    })
    .catch(error => {
      console.log("transfer.finalize:error", error)
      res.send(error)
    });
})

app.get('/api/banks', (req, res) => {
  paystack.misc
    .list_banks()
    .then(body => res.send(body))
    .catch(error => res.send(error));
});

app.use(express.static(path.join(__dirname, '../', 'frontend', 'build')));

app.listen(port, () => console.log("App is listening on port "+port));
