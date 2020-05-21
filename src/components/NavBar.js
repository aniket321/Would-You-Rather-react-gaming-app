import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Container, Divider } from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
    state = { activeItem: 'Home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    /**
    * @description function to handle logout
    * @param {object} questionsList
    */

    handleClick = (e) => {
        e.preventDefault();
        this.props.setAuthedUser(null);
    };


    render() {
        const { activeItem } = this.state
        const { users, authedUser } = this.props

        return (
            <Container>
                <Menu secondary>
                    <Menu.Item
                        name='Home'
                        as={NavLink}
                        to="/" exact
                        active={activeItem === 'Home'}
                        onClick={this.handleItemClick}
                        style={activeItem === 'Home' ? { backgroundColor: "#1E90FF", color: "white" } : { backgroundColor: "white", color: "black" }}
                    />
                    <Menu.Item
                        name='New Question'
                        as={NavLink}
                        to="/add"
                        active={activeItem === 'New Question'}
                        onClick={this.handleItemClick}
                        style={activeItem === 'New Question' ? { backgroundColor: "#1E90FF", color: "white" } : { backgroundColor: "white", color: "black" }}
                    />
                    <Menu.Item
                        name='LeaderBoard'
                        as={NavLink}
                        to="/leaderboard"
                        active={activeItem === 'LeaderBoard'}
                        onClick={this.handleItemClick}
                        style={activeItem === 'LeaderBoard' ? { backgroundColor: "#1E90FF", color: "white" } : { backgroundColor: "white", color: "black" }}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <div className="ui basic image label" style={{ backgroundColor: "#1E90FF", color: "white" }}>
                                <img className="ui right spaced avatar image" src={users[authedUser]['avatarURL']} alt="user" />
                                    Hi, {users[authedUser]['name']}
                            </div>
                        </Menu.Item>
                        <Menu.Item
                            name='Logout'
                            active={activeItem === 'logout'}
                            onClick={this.handleClick}
                        />
                    </Menu.Menu>
                </Menu>
                <Divider />
            </Container>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        authedUser,
        users
    };
}

export default connect(mapStateToProps, { setAuthedUser })(NavBar);
