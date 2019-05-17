import * as React from 'react'
import { Text } from 'react-native';
import { Gyroscope } from 'expo';
import { connect } from 'react-redux';

import { UPDATE_INTERVAL, round } from '../constants/index'
import { addLog } from '../constants/actions'

/**
 * Access the device gyroscope sensor to respond to changes in rotation in 3d space.
 */
class GyroscopeSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    componentDidMount() {
        Gyroscope.setUpdateInterval(UPDATE_INTERVAL);
        this._toggle();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    update = (data) => {
        this.props.dispatch(addLog('gyroscope', data))
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
        this._subscription = Gyroscope.addListener(
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
                Gyroscope: x={round(x)} y={round(y)} z={round(z)}
            </Text>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.logs['gyroscope']
    };
};

export default connect(mapStateToProps)(GyroscopeSensor);