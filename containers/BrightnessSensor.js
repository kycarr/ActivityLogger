import * as React from 'react'
import { Text } from 'react-native';
import { Brightness, Permissions } from 'expo';

import { UPDATE_INTERVAL } from '../constants/index'

/**
 * 
 */
export default class BrightnessSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            interval: null,
            brightness: 0,
        };
    }

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentDidUpdate() {

    }

    _subscribe = async () => {
        const interval = setInterval(this.getBrightness, UPDATE_INTERVAL);
        this.setState({ interval: interval })
    };

    _unsubscribe = () => {
        clearInterval(this.state.interval)
    };

    getBrightness = async () => {
        const { status } = await Permissions.getAsync(Permissions.SYSTEM_BRIGHTNESS);

        if (status === 'granted') {
            const brightness = await Brightness.getBrightnessAsync()
            this.setState({ brightness: brightness })
        }
    }

    render() {
        return (
            <Text>
                Brightness: {this.state.brightness}
            </Text>
        )
    }
}