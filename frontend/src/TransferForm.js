import React from 'react';
const axios = require('axios');

class TransferForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {form: {}, banks: []};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.initTransfer = this.initTransfer.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:3000/api/banks')
      .then((resp) => {
        console.log(resp);
        this.setState({banks: resp.data.data});
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      form: {...this.state.form, [name]: value}
    });
  }

  initTransfer(e){
    e.preventDefault();
    axios.post('http://localhost:3000/api/transfers', this.state.form)
      .then(resp => {
        let sms_code = prompt('We sent you a confirmation code by SMS. Please enter the code here to complete this transfer');
        axios.post('http://localhost:3000/api/transfers_finalize', {transfer_code: resp.data.transfer_code, otp: sms_code})
          .then(resp => console.log(resp))
      });
  }

  render(){
   return (
     <div>
       <h1>New Transaction</h1>
       <form onSubmit={this.initTransfer}>
        <label>
          Amount to send:
          <input name="send_amount" value={this.state.form.send_amount} type="number" onChange={this.handleInputChange}/>
        </label>
        <br/>
        <label>
          Bank Name:
          <select name="bank_code" value={this.state.form.bank_code} onChange={this.handleInputChange}>
          {this.state.banks.map(bank =>
            <option value={bank.code}>{bank.name}</option>
          )}
          </select>
        </label>
        <br/>
        <label>
          Account Number:
          <input name="account_number" value={this.state.form.account_number} type="number" onChange={this.handleInputChange}/>
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
          <input name="transfer_note" value={this.state.form.transfer_note} onChange={this.handleInputChange}/>
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
