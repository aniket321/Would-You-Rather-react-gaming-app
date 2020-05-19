import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {

    render() {
        const { authedUser } = this.props
        return (
            <div>
                Logged in user is {authedUser}
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Home)