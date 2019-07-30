import React from 'react';
const axios = require('axios');

class TransfersBrowser extends React.Component {
  constructor(props){
    super(props);
    this.state = {transfers: []};
  }

  componentDidMount(){
    axios.get('http://localhost:3000/api/transfers')
      .then((resp) => {
        console.log(resp);
        this.setState({transfers: resp.data.data});
      })
  }

  render(){
   return (
     <div>
      <h1>Transfers</h1>
      <a href="/transfer/new">New Transfer</a>
      <table border="1" width="100%">
        <thead>
          <tr>
            <td>Email</td>
            <td>Amount Sent</td>
            <td>Bank Name</td>
            <td>Account Number</td>
            <td>Transfer Note</td>
            <td>Transfer Reference</td>
          </tr>
        </thead>
        <tbody>
          {this.state.transfers.length === 0 ?
            <tr><td colSpan="6" align="center">No transactions has been made.</td></tr> : ''}
          {this.state.transfers.map(transfer =>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
    );
  }
}

export default TransfersBrowser;
