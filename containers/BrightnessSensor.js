import * as React from 'react'
import { Text } from 'react-native';
import { Brightness, Permissions } from 'expo';
import { connect } from 'react-redux';

import { UPDATE_INTERVAL } from '../constants/index'
import { addLog } from '../constants/actions'

/**
 * 
 */
class BrightnessSensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: 0,
        };
    }

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    update = (data) => {
        this.props.dispatch(addLog('brightness', data))
        this.setState({ data });
    }

    _subscribe = async () => {
        this.subscription = setInterval(this.getBrightness, UPDATE_INTERVAL);
    };

    _unsubscribe = () => {
        clearInterval(this.subscription)
    };

    getBrightness = async () => {
        let { status } = await Permissions.askAsync(Permissions.SYSTEM_BRIGHTNESS);
        if (status === 'granted') {
            const data = await Brightness.getBrightnessAsync()
            this.update(data)
        }
    }

    render() {
        return (
            <Text>
                Brightness: {this.state.data}
            </Text>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.logs['brightness']
    };
};

export default connect(mapStateToProps)(BrightnessSensor);