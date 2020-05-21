import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from '../components/Login'
import Home from '../components/Home'
import NavBar from '../components/NavBar'
import NewQuestion from '../components/NewQuestion'
import QuestionContent from '../components/QuestionContent'
import LeaderBoard from '../components/LeaderBoard'
import Error from '../components/Error'
import LoadingBar from 'react-redux-loading'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        const { authedUser } = this.props;
        return (
            <Router>
                <div>
                    <LoadingBar />
                    {authedUser === null ? (
                        <Login />
                    ) : (
                            <Container>
                                <NavBar />
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route path="/question/:id" component={QuestionContent} />
                                    <Route path="/add" component={NewQuestion} />
                                    <Route path="/leaderboard" component={LeaderBoard} />
                                    <Route path="/questions/invalid" component={Error} />
                                    <Route component={Error} />
                                </Switch>
                            </Container>
                        )}
                </div>
            </Router>
        )
    }
}


function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}


export default connect(mapStateToProps)(App)
