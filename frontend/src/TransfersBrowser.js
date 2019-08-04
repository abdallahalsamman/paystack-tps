import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
const axios = require('axios');

const API_URL = "https://paystack-evexoio.herokuapp.com:3000/"

class TransfersBrowser extends React.Component {
  constructor(props){
    super(props);
    this.state = {transfers: []};
  }

  componentDidMount(){
    axios.get(API_URL+'/api/transfers')
      .then((resp) => {
        this.setState({transfers: resp.data.data});
      })
  }

  render(){
   return (
     <div>
      <h1>Transfers</h1>
      <Link to="/transfer/new">New Transfer</Link>
      <table border="1" width="100%">
        <thead>
          <tr>
            <td>Account name</td>
            <td>Amount Sent</td>
            <td>Bank Name</td>
            <td>Account Number</td>
            <td>Transfer Note</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {this.state.transfers.length === 0 ?
            <tr><td colSpan="6" align="center">No transactions has been made.</td></tr> : ''}
          {this.state.transfers.map(transfer =>
          <tr key={"transfer-"+transfer.transfer_code}>
            <td>{transfer.recipient.name}</td>
            <td>{transfer.amount / 100} {transfer.currency}</td>
            <td>{transfer.recipient.details.bank_name}</td>
            <td>{transfer.recipient.details.account_number}</td>
            <td>{transfer.reason}</td>
            <td>{transfer.status}</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
    );
  }
}

export default TransfersBrowser;
