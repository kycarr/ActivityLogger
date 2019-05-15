import * as React from 'react'
import { Text } from 'react-native';
import { Accelerometer } from 'expo';

import { UPDATE_INTERVAL, round } from '../constants/index'

/**
 * Access the device accelerometer sensor(s) to respond to changes in acceleration in 3d space.
 */
export default class AccelerometerSensor extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isAvailable: false,
            accelerometerData: {},
        };
    }

    componentDidMount() {
        Accelerometer.setUpdateInterval(UPDATE_INTERVAL);
        this._toggle();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentDidUpdate() {

    }

    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    };

    _subscribe = () => {
        this._subscription = Accelerometer.addListener(
            accelerometerData => { this.setState({ accelerometerData }); }
        );

        Accelerometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isAvailable: result
                });
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        let { x, y, z, } = this.state.accelerometerData;

        if (!this.state.isAvailable) {
            return (
                <Text>
                    Accelerometer is unavailable
                </Text>
            )
        }

        return (
            <Text>
                Accelerometer: x={round(x)} y={round(y)} z={round(z)}
            </Text>
        )
    }
}