import React, { Component } from 'react'
import { Grid, Header, Image, Segment, Button, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Card extends Component {
    render() {
        const { id, questions, users, answered } = this.props
        return (
            <Grid padded="vertically" columns={1} centered>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 550 }}>
                        <Segment>
                            <Grid divided padded>
                                <Grid.Row>
                                    <Header as="h3" style={{ color: "#9370DB" }}>{users[questions[id]['author']].name} asks..</Header>
                                </Grid.Row>
                                <Divider />
                                <Grid.Row>
                                    <Grid.Column width={7}>
                                        <Image src={users[questions[id]['author']].avatarURL} size='small' circular />
                                    </Grid.Column>
                                    <Grid.Column width={9}>
                                        <Header>Would you rather</Header>
                                        <h3>{questions[id]['optionOne']['text']} Or...</h3>
                                        <Link to={`/question/${id}`}>
                                            <Button color='purple' onClick={this.handleOnClick}>{answered === "true" ? "View Poll" : "View Results"}</Button>
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment >
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        )
    }
}


export default (Card)