import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Segment, Header, Form } from 'semantic-ui-react'

class Login extends Component {

    state = {
        user: null
    }

    userOnChange = (e, { value }) => {
        this.setState({ user: value })
    }

    handleOnSubmit = e => {
        e.preventDefault();
        console.log(this.state.user)
        this.props.dispatch(setAuthedUser(this.state.user))
    }

    getUsers = () => {
        const { users } = this.props;

        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { src: user.avatarURL }
        }));
    };

    render() {
        const dropdownList = this.getUsers();

        return (
            <div className="login-wrapper">
                <Segment className="login">
                    <Header as="h1" textAlign="center">Welcome to Would You Rather Game!</Header>
                    <Header as="h3" textAlign="center">Login As:</Header>
                    <Form onSubmit={this.handleOnSubmit}>
                        <Form.Dropdown
                            placeholder="Select User"
                            selection

                            options={dropdownList}
                            value={this.state.user}
                            onChange={this.userOnChange}
                            required
                        />
                        <Form.Button content="Login" color="blue" disabled={this.state.user === null} />
                    </Form>
                </Segment>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    }

}


export default connect(mapStateToProps)(Login)