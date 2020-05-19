import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from '../components/Login'
import Home from '../components/Home'
import LoadingBar from 'react-redux-loading'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        const { authedUser } = this.props;
        return (
            <div>
                <LoadingBar />
                {authedUser === null ? (
                    <Login />
                ) : (
                        <Home />
                    )}
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}


export default connect(mapStateToProps)(App)
