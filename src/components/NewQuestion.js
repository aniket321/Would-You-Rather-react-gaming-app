import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Form, Grid, Button, Divider } from 'semantic-ui-react'
import { handleAddNewQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {

    /**
    * state to record the value of options entered by the user
    */
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    }

    /**
    * @description function to change the state of optionOne
    * @param {object} e
    */

    handleChangeForOptionOne = (e) => {
        this.setState({ optionOne: e.target.value })
    }

    /**
    * @description function to change the state of optionTwo
    * @param {object} e
    */

    handleChangeForOptionTwo = (e) => {
        this.setState({ optionTwo: e.target.value })
    }

    /**
    * @description function to dispatch action to store new question to the state
    * @param {object} e
    */

    handleSubmit = (e) => {
        e.preventDefault();
        const { authedUser, handleAddNewQuestion } = this.props;
        const { optionOne, optionTwo } = this.state;
        handleAddNewQuestion(optionOne, optionTwo, authedUser);
        this.setState({ toHome: true });
    }

    render() {
        if (this.state.toHome === true) {
            return <Redirect to="/" />
        }
        return (
            <Segment>
                <Header as="h2" textAlign="center">
                    Create new Question
                </Header>
                <Divider />
                <Grid>
                    <Grid.Column>
                        <h3><strong>Would you rather...</strong></h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Enter first option</label>
                                <input
                                    placeholder='Enter first option'
                                    value={this.state.optionOne}
                                    onChange={this.handleChangeForOptionOne}
                                    required
                                />
                            </Form.Field>
                            <Header as="h3" textAlign="center">
                                OR
                            </Header>
                            <Form.Field>
                                <label>Enter second option</label>
                                <input
                                    placeholder='Enter second option'
                                    value={this.state.optionTwo}
                                    onChange={this.handleChangeForOptionTwo}
                                    required
                                />
                            </Form.Field>
                            <Header textAlign="center">
                                <Button
                                    type='submit'
                                    className="ui blue button"
                                    disabled={this.state.optionOne === '' || this.state.optionTwo === ''}
                                >
                                    Create Question
                                </Button>
                            </Header>

                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}


export default connect(mapStateToProps, { handleAddNewQuestion })(NewQuestion)