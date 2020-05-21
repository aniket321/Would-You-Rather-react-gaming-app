import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab, Header, Grid } from 'semantic-ui-react'
import Card from './Card'

class Home extends Component {

    /**
    * @description function to get answered question list
    * @param {string} authedUser
    * @param {object} users  
    * @param {object} questions 
    */

    getAnsweredList = (authedUser, users, questions) => {
        return Object.keys(users[authedUser]['answers']).sort((a, b) => questions[b].timestamp - questions[a].timestamp);
    }

    /**
    * @description function to get unanswered question list
    * @param {array} questionsList
    * @param {array} answeredList 
    */

    getUnansweredList = (questionsList, answeredList) => {
        return questionsList.filter((question) => !answeredList.includes(question) ? true : false);
    }

    panes = (answeredList, unansweredList, questions, users, authedUser) => {
        return [
            {
                menuItem: 'Unanswered',
                render: () => {
                    if (unansweredList.length === 0) {
                        return (
                            <Header as="h1" textAlign="center">You have answered all the questions</Header>
                        )
                    }

                    return (
                        <Tab.Pane>
                            {unansweredList.map(question => (
                                <Card
                                    key={questions[question].id}
                                    id={question}
                                    questions={questions}
                                    users={users}
                                    authedUser={authedUser}
                                    answered="true"
                                />
                            ))}
                        </Tab.Pane>
                    )
                }

            },
            {
                menuItem: 'Answered',
                render: () => (
                    <Tab.Pane>
                        {answeredList.map(question => (
                            <Card
                                key={questions[question].id}
                                id={question}
                                questions={questions}
                                users={users}
                                authedUser={authedUser}
                                answered="false"
                            />
                        ))}
                    </Tab.Pane>
                )
            }
        ];

    }

    render() {
        const { authedUser, users, questions } = this.props
        let sortedQuestions = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        const answeredList = this.getAnsweredList(authedUser, users, questions)
        const unansweredList = this.getUnansweredList(sortedQuestions, answeredList)
        return (
            <Grid columns={1} centered>
                <Grid.Row>
                    <Grid.Column style={{ width: 800 }}>
                        <Tab menu={{ pointing: true }} panes={this.panes(answeredList, unansweredList, questions, users, authedUser)} />
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        )
    }
}

function mapStateToProps({ authedUser, users, questions }) {
    return {
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Home)
