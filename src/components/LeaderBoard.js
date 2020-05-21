import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Image, Header, Divider } from 'semantic-ui-react';

class LeaderBoard extends Component {
    render() {
        let { users } = this.props
        users = Object.values(users);
        users = users.sort((a, b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length))
        return (
            <Grid columns={1} centered>
                <Grid.Row>
                    <Grid.Column style={{ width: 800 }}>
                        <Segment>
                            {users.map((user) => (
                                <Segment key={user.id}>
                                    <Grid divided padded>
                                        <Grid.Row>
                                            <Header as="h2" className="name">{user.name}</Header>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={3}>
                                                <Image src={user.avatarURL} size='small' circular />
                                            </Grid.Column>
                                            <Grid.Column width={7}>
                                                <Header as="h5">
                                                    Answerd Questions - {Object.values(user.answers).length}
                                                    <Divider />
                                                    Created Questions - {user.questions.length}
                                                    <Divider />
                                                    <Header>
                                                        Score - {Object.values(user.answers).length + user.questions.length}
                                                    </Header>
                                                </Header>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            ))}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}


export default connect(mapStateToProps)(LeaderBoard)