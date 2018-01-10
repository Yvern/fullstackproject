import React from 'react'
import { Menu } from 'semantic-ui-react'
import logo from '../../logo.svg'

class HeaderMenu extends React.Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu size='large' pointing secondary inverted>
                    <Menu.Item> <img src={logo} className="App-logo" alt="logo" /> </Menu.Item>
                    <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                    <Menu.Item name='teams' active={activeItem === 'teams'} onClick={this.handleItemClick} />
                    <Menu.Item name='events' active={activeItem === 'events'} onClick={this.handleItemClick} />
                    <Menu.Menu position='right'>
                        <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

export default HeaderMenu