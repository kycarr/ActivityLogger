import * as React from 'react'
import { Text } from 'react-native';
import { Magnetometer } from 'expo';
import { connect } from 'react-redux';

import { UPDATE_INTERVAL, round } from '../constants/index'
import { addLog } from '../constants/actions'

/**
 * Access the device magnetometer sensor(s) to respond to measure the changes in the magnetic field.
 */
class MagnetometerSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    componentDidMount() {
        Magnetometer.setUpdateInterval(UPDATE_INTERVAL);
        this._toggle();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    update = (data) => {
        this.props.dispatch(addLog('magnetometer', data))
        this.setState({ data });
    }

    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    };

    _subscribe = async () => {
        this._subscription = Magnetometer.addListener(
            data => { this.update(data) }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        let { x, y, z, } = this.state.data;

        return (
            <Text>
                Magnetometer: x={round(x)} y={round(y)} z={round(z)}
            </Text>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.logs['magnetometer']
    };
};

export default connect(mapStateToProps)(MagnetometerSensor);