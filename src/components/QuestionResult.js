import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Image, Segment, Divider, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class QuestionResult extends Component {
    render() {
        const { users, id, questions, choosenOption } = this.props;
        return (
            <Segment>
                <Grid divided padded>
                    <Grid.Row>
                        <Header style={{ color: "#9370DB" }}>{users[questions[id]['author']].name} asks..</Header>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Image src={users[questions[id]['author']].avatarURL} size='small' circular />
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <h2>Results</h2>
                            <h4>Would you rather</h4>
                            <div className={choosenOption === "optionOne" ? "ui blue inverted segment" : "ui segment"}>
                                {choosenOption === "optionOne" && (<h3>You Chose:</h3>)}
                                <h4>
                                    {questions[id]['optionOne']['text']}
                                    <Divider />
                                    {questions[id]['optionOne']['votes'].length} out of {questions[id]['optionOne']['votes'].length + questions[id]['optionTwo']['votes'].length} votes
                                </h4>
                            </div>
                            <div className={choosenOption === "optionTwo" ? "ui blue inverted segment" : "ui segment"}>
                                {choosenOption === "optionTwo" && (<h3>You Chose:</h3>)}
                                <h4>
                                    {questions[id]['optionTwo']['text']}
                                    <Divider />
                                    {questions[id]['optionTwo']['votes'].length} out of {questions[id]['optionOne']['votes'].length + questions[id]['optionTwo']['votes'].length} votes
                                </h4>
                            </div>
                            <Link to="/">
                                <Button
                                    color="purple"
                                    size="large"
                                >
                                    Back
                                </Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}

function mapStateToProps({ users, questions }, props) {
    const { id, choosenOption } = props;
    return {
        id,
        users,
        questions,
        choosenOption,
    }
}

export default connect(mapStateToProps)(QuestionResult)
