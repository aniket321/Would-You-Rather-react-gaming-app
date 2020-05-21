import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Error extends Component {
    render() {
        const { authedUser } = this.props;
        return (
            <div className="error-wrapper">
                <Segment textAlign="center" className="error">
                    <Header as="h1">404 Error</Header>
                    <p>The URL you are trying to access does not Exist</p>
                    <Link to="/">{authedUser === null ? "Go to Login Page" : "Go to Home Page"}</Link>
                </Segment>
            </div>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}


export default connect(mapStateToProps)(Error)
