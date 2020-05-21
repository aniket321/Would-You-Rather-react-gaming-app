import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Container, Divider } from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser';
import { NavLink, withRouter } from 'react-router-dom';

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeItem: props.location.pathname.substr(1) === 'add' ? 'new question' : props.location.pathname.substr(1) || 'home'
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

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
                        name='home'
                        as={NavLink}
                        to="/" exact
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        style={activeItem === 'home' ? { backgroundColor: "#1E90FF", color: "white" } : { backgroundColor: "white", color: "black" }}
                    />
                    <Menu.Item
                        name='new question'
                        as={NavLink}
                        to="/add"
                        active={activeItem === 'new question'}
                        onClick={this.handleItemClick}
                        style={activeItem === 'new question' ? { backgroundColor: "#1E90FF", color: "white" } : { backgroundColor: "white", color: "black" }}
                    />
                    <Menu.Item
                        name='leaderboard'
                        as={NavLink}
                        to="/leaderboard"
                        active={activeItem === 'leaderboard'}
                        onClick={this.handleItemClick}
                        style={activeItem === 'leaderboard' ? { backgroundColor: "#1E90FF", color: "white" } : { backgroundColor: "white", color: "black" }}
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

export default withRouter(connect(mapStateToProps, { setAuthedUser })(NavBar));
