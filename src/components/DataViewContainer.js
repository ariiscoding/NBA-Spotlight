import React, {Component} from 'react';
import ShotChart from "./ShotChart";
import CounterSlider from "./CounterSlider";
import _ from "lodash";
import {Row, Col, Radio, Switch, Icon} from "antd";

class DataViewContainer extends Component {
    state = {
        minCount: 2, //default value for slider
        chartType: "hexbin",
        displayToolTip: true,
    }
    onCountSliderChange = (count) => {
        console.log(count);
        this.setState({
            minCount: count
        });
    }

    onChartTypeChange = (e) => {
        console.log(e.target.value);
        this.setState({ chartType: e.target.value });
    }

    onToolTipChange = e => {
        console.log('switch -> ', e);
        this.setState({
            displayToolTip: e
        });
    }

    render() {
        return (
            <div className = "data-view">

                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    chartType = {this.state.chartType}
                    displayTooltip={this.state.displayToolTip}
                />

                <div className="filters">
                    {
                        this.state.chartType==="hexbin" ?
                            <CounterSlider value={this.state.minCount}
                                           onCountSliderChange={
                                               _.debounce(this.onCountSliderChange, 500)}
                            /> : null
                    }

                    <br/>

                    <Row>
                        <Col span = {9}>
                            <Radio.Group onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </Radio.Group>
                        </Col>
                        <Col span = {10}>
                            <Switch checkedChildren="On"
                                    unCheckedChildren="Off"
                                    defaultChecked
                                    onChange={this.onToolTipChange}
                            />
                            Show shot info
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default DataViewContainer;