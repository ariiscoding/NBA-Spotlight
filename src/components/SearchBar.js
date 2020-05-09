import React, {Component} from 'react';
import nba from "../nba-client";
import {PROFILE_PIC_URL_PREFIX} from "../constants";
import {Icon, Button, Input, AutoComplete} from 'antd';
const {Option} = AutoComplete;


class SearchBar extends Component {
    state = {
        dataSource:[],
    }

    handleSearch = (value) => {
        const players = nba.searchPlayers(value);
        this.setState({
            dataSource: players.map(player => ({ //map() traverse the entire array
                fullName: player.fullName,
                playerId: player.playerId,
            }))
        });
    }

    onSelect = (value) => {
        console.log("selected -> ",value);
        this.props.handleSelectedPlayer(value);
    }

    render() {
        const {dataSource} = this.state;
        const options = dataSource.map(player => (
            <Option key ={player.playerId} value = {player.fullName} className="player-option">
                <img className="player-option-image"
                src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}/>
                <span className="player-option-label">{player.fullName}</span>
            </Option>
        ));
        return (
            <AutoComplete
                className="search-bar"
                size="large"
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                dataSource={options}
                placeholder="Search NBA player here"
                optionLabelProp="value"
            >
                <Input
                    suffix={
                        <Icon type="search"
                              className="certain-category-icon"
                        />
                    }
                />
            </AutoComplete>
        );
    }
}

export default SearchBar;