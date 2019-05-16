import * as React from 'react'
import { Text, View } from 'react-native';
import { DangerZone } from 'expo';
const { DeviceMotion } = DangerZone;

import { UPDATE_INTERVAL, round } from '../constants/index'

/**
 * Access the device motion and orientation sensors.
 * All data is presented in terms of three axes that run through a device.
 * According to portrait orientation: X runs from left to right, Y from bottom to top and Z perpendicularly through the screen from back to front.
 */
export default class MotionSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceMotionData: {}
        };
    }

    componentDidMount() {
        DeviceMotion.setUpdateInterval(UPDATE_INTERVAL);
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

    _subscribe = async () => {
        this._subscription = DangerZone.DeviceMotion.addListener(deviceMotionData => {
            this.setState({ deviceMotionData })
        });
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        try {
            let a = this.state.deviceMotionData.acceleration;
            let g = this.state.deviceMotionData.accelerationIncludingGravity;
            let r = this.state.deviceMotionData.rotationRate;
            let o = this.state.deviceMotionData.orientation

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