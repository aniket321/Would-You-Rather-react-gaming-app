import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Image, Segment, Form, Radio } from 'semantic-ui-react'
import { handleSaveAnswerForUserAndQuestion } from '../actions/users'
import QuestionResult from './QuestionResult'
import { Redirect } from 'react-router-dom'

class QuestionContent extends Component {

    /**
    * state to record selected option by the user
    */
    state = {
        selected: null
    };

    /**
    * @description function to change the state of selected option
    * @param {object} e
    * @param {string} value
    */

    handleChange = (e, { value }) => {
        this.setState({ selected: value })
    };

    /**
    * @description function to dispatch the selected answer by the user for a particular question
    * @param {object} e
    */

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.selected !== null) {
            const { authedUser, id, handleSaveAnswerForUserAndQuestion } = this.props;
            handleSaveAnswerForUserAndQuestion(authedUser, id, this.state.selected);
        }
    }

    render() {
        const { questions, authedUser, users, id } = this.props

        if (!(Object.keys(questions).includes(id))) {
            return <Redirect to="/invalid" />
        }

        if (Object.keys(users[authedUser]['answers']).includes(id)) {
            return (
                <QuestionResult id={id} choosenOption={users[authedUser]['answers'][id]} />
            )
        }

        return (
            <Grid columns={1} centered>
                <Grid.Row>
                    <Grid.Column style={{ width: 600 }}>
                        <Segment>
                            <Grid divided padded>
                                <Grid.Row>
                                    <Header style={{ color: "#9370DB" }}>{users[questions[id]['author']].name} asks..</Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={5}>
                                        <Image src={users[questions[id]['author']].avatarURL} size='small' circular />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Header>Would you rather</Header>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Field>
                                                <Radio
                                                    label={questions[id]['optionOne']['text']}
                                                    name="radioGroup"
                                                    value="optionOne"
                                                    checked={this.state.selected === 'optionOne'}
                                                    onChange={this.handleChange}
                                                />
                                                <br />
                                                <Radio
                                                    label={questions[id]['optionTwo']['text']}
                                                    name="radioGroup"
                                                    value="optionTwo"
                                                    checked={this.state.selected === 'optionTwo'}
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <button
                                                    className="ui purple button"
                                                    size="medium"
                                                    disabled={this.state.selected === null}
                                                    type="submit"
                                                >
                                                    Submit
                                    </button>
                                            </Form.Field>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, props) {
    const { id } = props.match.params
    return {
        questions,
        authedUser,
        users,
        id,
    }
}

export default connect(mapStateToProps, { handleSaveAnswerForUserAndQuestion })(QuestionContent)