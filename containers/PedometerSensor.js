import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { Text, View } from "react-native";

export default class PedometerSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAvailable: "checking",
            currentStepCount: 0
        };
    }

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps
            });
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isAvailable: result
                });
            },
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        if (!this.state.isAvailable) {
            return (
                <Text>
                    Pedometer is unavailable
                </Text>
            )
        }

        return (
            <Text>Pedometer: steps={this.state.currentStepCount}</Text>
        );
    }
}

Expo.registerRootComponent(PedometerSensor);