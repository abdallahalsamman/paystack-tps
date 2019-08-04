import React from 'react';
import { Redirect } from 'react-router'
const axios = require('axios');

const API_URL = "https://paystack-evexoio.herokuapp.com:3000/"

class TransferForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {form: {}, banks: []};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.initTransfer = this.initTransfer.bind(this);
  }

  componentDidMount(){
    axios.get(API_URL+'/api/banks')
      .then((resp) => {
        this.setState({banks: resp.data.data});
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;

    this.setState({
      form: {...this.state.form, [name]: value}
    });
  }

  initTransfer(e){
    e.preventDefault();

    if (!window.confirm('Are you sure you want to send '
      + this.state.form.send_amount
      + 'NGN to ' + this.state.form.account_name
      + ' ' + this.state.form.account_number)) return

    axios.post(API_URL+'/api/transfers', this.state.form)
      .then(resp => {
        // if otp enabled
        // let sms_code = prompt('We sent you a confirmation code by SMS. Please enter the code here to complete this transfer');
        // axios.post(API_URL+'/api/transfers_finalize', {transfer_code: resp.data.data.transfer_code, otp: sms_code})
        //   .then(resp => console.log(resp))

        if(resp.data.message == 'Transfer has been queued') {
          alert(resp.data.message)
          return window.location.href = "/"
        }
      });
  }

  render(){
   return (
     <div>
       <h1>New Transaction</h1>
       <form onSubmit={this.initTransfer}>
        <label>
          Amount to send:
          <input name="send_amount" value={this.state.form.send_amount} type="number" onChange={this.handleInputChange} required/>
          NGN
        </label>
        <br/>
        <label>
          Bank Name:
          <select name="bank_code" value={this.state.form.bank_code} onChange={this.handleInputChange} required>
          {this.state.banks.map(bank =>
            <option value={bank.code}>{bank.name}</option>
          )}
          </select>
        </label>
        <br/>
        <label>
          Account Number:
          <input name="account_number" value={this.state.form.account_number} type="number" onChange={this.handleInputChange} required/>
        </label>
        <br/>
        <label>
          Account Name:
          <input name="account_name" value={this.state.form.account_name} onChange={this.handleInputChange}/>
        </label>
        <br/>
        <label>
          Email Address:
          <input name="email_address" value={this.state.form.email_address} type="email" onChange={this.handleInputChange}/>
        </label>
        <br/>
        <label>
          Transfer Note:
          <input name="reason" value={this.state.form.reason} onChange={this.handleInputChange}/>
        </label>
        <br/>
        <label>
          Transfer Reference:
          <input name="transfer_reference" value={this.state.form.transfer_reference} onChange={this.handleInputChange}/>
        </label>
        <br/>
        <button type="submit">Send</button>
       </form>
     </div>
   );
  }
}

export default TransferForm;
