import React from "react";
import { Pedometer } from "expo";
import { Text } from "react-native";

export default class PedometerSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            steps: 0
        };
    }

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _subscribe = async () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps
            });
        });
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        return (
            <Text>Pedometer: steps={this.state.steps}</Text>
        );
    }
}