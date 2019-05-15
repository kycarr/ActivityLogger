import * as React from 'react'
import { Text } from 'react-native';
import { Magnetometer } from 'expo';

import { UPDATE_INTERVAL, round } from '../constants/index'

/**
 * Access the device magnetometer sensor(s) to respond to measure the changes in the magnetic field.
 */
export default class MagnetometerSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAvailable: false,
            magnetometerData: {},
        };
    }

    componentDidMount() {
        Magnetometer.setUpdateInterval(UPDATE_INTERVAL);
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
        this._subscription = Magnetometer.addListener(
            magnetometerData => { this.setState({ magnetometerData }); }
        );

        Magnetometer.isAvailableAsync().then(
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
        let { x, y, z, } = this.state.magnetometerData;

        if (!this.state.isAvailable) {
            return (
                <Text>
                    Magnetometer is unavailable
                </Text>
            )
        }

        return (
            <Text>
                Magnetometer: x={round(x)} y={round(y)} z={round(z)}
            </Text>
        )
    }
}