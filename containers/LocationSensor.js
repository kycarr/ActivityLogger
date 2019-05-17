import React, { Component } from 'react';
import { Platform, Text } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';

import { UPDATE_INTERVAL } from '../constants/index'
import { addLog } from '../constants/actions'

class LocationSensor extends Component {
    state = {
        isAvailable: false,
        interval: null,
        data: null,
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

        let data = await Location.getCurrentPositionAsync({});
        this.props.dispatch(addLog('location', data))
        this.setState({ data, isAvailable: true });
    };

    render() {
        if (!this.state.isAvailable) {
            return (
                <Text>GPS not available</Text>
            )
        }

        return (
            <Text>
                Location: {JSON.stringify(this.state.data)}
            </Text>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.logs['location']
    };
};

export default connect(mapStateToProps)(LocationSensor);