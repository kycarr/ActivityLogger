import * as React from 'react'
import { Text } from 'react-native';
import { Accelerometer } from 'expo';
import { connect } from 'react-redux';

import { UPDATE_INTERVAL, round } from '../constants/index'
import { addLog } from '../constants/actions'

/**
 * Access the device accelerometer sensor(s) to respond to changes in acceleration in 3d space.
 */
class AccelerometerSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    componentDidMount() {
        Accelerometer.setUpdateInterval(UPDATE_INTERVAL);
        this._toggle();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    update = (data) => {
        this.props.dispatch(addLog('accelerometer', data))
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
        this._subscription = Accelerometer.addListener(
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
                Accelerometer: x={round(x)} y={round(y)} z={round(z)}
            </Text>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.logs['accelerometer']
    };
};

export default connect(mapStateToProps)(AccelerometerSensor);