import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

    state = {
        user: null
    }

    userOnChange = e => {
        this.setState({ user: e.target.value })
    }

    handleOnSubmit = e => {
        e.preventDefault();
        this.props.dispatch(setAuthedUser(this.state.user))
    }

    render() {
        const dropdownList = this.props.users;

        return (
            <div>
                Login page
                <form onSubmit={this.handleOnSubmit}>
                    <select
                        onChange={this.userOnChange}
                    >
                        {dropdownList.map((user) => (
                            <option value={user.id}
                                key={user.id}
                            >
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <button type='submit'>Login</button>
                </form>

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