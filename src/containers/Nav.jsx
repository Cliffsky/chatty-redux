import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserCount } from '../actions/index.jsx';
import { bindActionCreators } from 'redux';

class Nav extends Component {
  render() {
    return (
      <nav>
        <div id="logo">
          <h1>Chatty</h1>
        </div>
        <div id="usersOnline">
          Users online: {this.props.userCount}
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state){
  return({userCount: state.userCount})
}

export default connect(mapStateToProps)(Nav);