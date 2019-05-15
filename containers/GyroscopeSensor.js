import * as React from 'react'
import { Text } from 'react-native';
import { Gyroscope } from 'expo';

import { UPDATE_INTERVAL, round } from '../constants/index'

/**
 * Access the device gyroscope sensor to respond to changes in rotation in 3d space.
 */
export default class GyroscopeSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAvailable: false,
            gyroscopeData: {},
        };
    }

    componentDidMount() {
        Gyroscope.setUpdateInterval(UPDATE_INTERVAL);
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
        this._subscription = Gyroscope.addListener(
            gyroscopeData => { this.setState({ gyroscopeData }); }
        );

        Gyroscope.isAvailableAsync().then(
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
        let { x, y, z, } = this.state.gyroscopeData;

        if (!this.state.isAvailable) {
            return (
                <Text>
                    Gyroscope is unavailable
                </Text>
            )
        }

        return (
            <Text>
                Gyroscope: x={round(x)} y={round(y)} z={round(z)}
            </Text>
        )
    }
}