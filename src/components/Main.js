import React, {Component} from 'react';
import Profile from "./Profile";
import nba from '../nba-client';
import ShotChart from "./ShotChart";
import DataViewContainer from "./DataViewContainer";
import SearchBar from "./SearchBar";
import {DEFAULT_PLAYER_INFO} from "../constants";



class Main extends Component {
    constructor () {
        super();
        this.state = {
            playerInfo: DEFAULT_PLAYER_INFO,
        }
    }

    componentDidMount() {
        window.nba = nba;
        this.loadPlayerInfo(this.state.playerInfo.fullName);

    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({PlayerID: nba.findPlayer(playerName).playerId})
            .then (info => {
                const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                console.log(playerInfo);

                this.setState({
                    playerInfo: playerInfo
                });
            })
    }

    handleSelectedPlayer=(playerName)=> {
        this.loadPlayerInfo(playerName)
    }

    render() {
        return (
            <div className = 'main'>

                <SearchBar
                handleSelectedPlayer={this.handleSelectedPlayer}
                />

                <div className="player">
                    <Profile playerInfo = {this.state.playerInfo} />
                    <DataViewContainer playerId = {this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}

export default Main;