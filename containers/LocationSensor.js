import React, { Component } from 'react';
import { Platform, Text } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class LocationSensor extends Component {
    state = {
        interval: null,
        location: null,
        isAvailable: false,
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({ isAvailable: false, });
        } else {
            this._getLocationAsync();
        }
    }

    _subscribe = async () => {
        const interval = setInterval(this._getLocationAsync, UPDATE_INTERVAL);
        this.setState({ interval: interval })
    };

    _unsubscribe = () => {
        clearInterval(this.state.interval)
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({ isAvailable: false });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location, isAvailable: true });
    };

    render() {
        if (!this.state.isAvailable) {
            return (
                <Text>GPS not available</Text>
            )
        }

        return (
            <Text>
                Location: {JSON.stringify(this.state.location)}
            </Text>
        );
    }
}