import * as React from 'react'
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { DangerZone } from 'expo';
const { DeviceMotion } = DangerZone;

import { UPDATE_INTERVAL, round } from '../constants/index'
import { addLog } from '../constants/actions'

/**
 * Access the device motion and orientation sensors.
 * All data is presented in terms of three axes that run through a device.
 * According to portrait orientation: X runs from left to right, Y from bottom to top and Z perpendicularly through the screen from back to front.
 */
class MotionSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        DeviceMotion.setUpdateInterval(UPDATE_INTERVAL);
        this._toggle();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    update = (data) => {
        this.props.dispatch(addLog('motion', data))
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
        this._subscription = DangerZone.DeviceMotion.addListener(data => {
            this.update(data)
        });
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        try {
            let a = this.state.data.acceleration;
            let g = this.state.data.accelerationIncludingGravity;
            let r = this.state.data.rotationRate;
            let o = this.state.data.orientation

            return (
                <View>
                    <Text>
                        Acceleration: x={round(a.x)} y={round(a.y)} z={round(a.z)}
                    </Text>
                    <Text>
                        Acceleration with gravity: x={round(g.x)} y={round(g.y)} z={round(g.z)}
                    </Text>
                    <Text>
                        Rotation rate: x={round(r.x)} y={round(r.y)} z={round(r.z)}
                    </Text>
                    <Text>
                        Orientation: {o}
                    </Text>
                </View>
            )
        }
        catch (e) {
            return <View />
        }
    }
}

const mapStateToProps = state => {
    return {
        data: state.logs['motion']
    };
};

export default connect(mapStateToProps)(MotionSensor);