import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import TextInputGroup from './../layout/TextInputGroup';

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;

    // if no balance, make 0

    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    const { firestore, history } = this.props;
    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));
  };

  render() {
    const { firstName, lastName, email, phone, balance } = this.state;

    const { disableBalanceOnAdd } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextInputGroup
                label="First Name"
                name="firstName"
                placeholder="Enter First Name"
                value={firstName}
                minLength="2"
                onChange={this.onChange}
                required
              />
              <TextInputGroup
                label="Last Name"
                name="lastName"
                placeholder="Enter Last Name"
                value={lastName}
                minLength="2"
                onChange={this.onChange}
                required
              />
              <TextInputGroup
                label="Email"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={this.onChange}
              />
              <TextInputGroup
                label="Phone"
                name="phone"
                placeholder="Enter Phone Number"
                value={phone}
                minLength="10"
                onChange={this.onChange}
              />
              <TextInputGroup
                label="Balance"
                name="balance"
                placeholder="Enter Balance"
                value={balance}
                onChange={this.onChange}
                disabled={disableBalanceOnAdd}
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propType = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
