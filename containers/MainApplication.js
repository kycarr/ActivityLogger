import * as React from 'react';
import { Picker, ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements'
import { Appbar, Button, Divider, TextInput } from 'react-native-paper';
import { Stopwatch } from 'react-native-stopwatch-timer'
import { connect } from 'react-redux';

import AccelerometerSensor from './AccelerometerSensor'
import GyroscopeSensor from './GyroscopeSensor'
import MagnetometerSensor from './MagnetometerSensor'
import BrightnessSensor from './BrightnessSensor'
import LocationSensor from './LocationSensor'
import MotionSensor from './MotionSensor'

import { _storeData } from '../constants/Storage'
import { setUser, setActivity, start, end, getUsers, getActivities } from '../constants/actions'

class MainApplication extends React.Component {
    state = {
        activityType: 'other',
        isUserLocked: false,
        didStart: false,
        didReset: false,
        elapsedTime: '',
    };

    componentDidMount() {
        this.props.dispatch(getUsers())
        this.props.dispatch(getActivities())
    }

    clear = () => {
        _storeData('users', JSON.stringify([]))
        _storeData('activities', JSON.stringify([]))
    }

    onUserNameSet = (name) => {
        this.props.dispatch(setUser(name))
    }

    onActivityChosen = (type) => {
        const name = type === 'other' ? '' : type
        this.setState({ activityType: type })
        this.onResetTimer()
        this.props.dispatch(setActivity(name))
    }

    onActivityNameSet = (name) => {
        this.onResetTimer()
        this.props.dispatch(setActivity(name))
    }

    onToggleTimer = () => {
        if (!this.state.didStart) {
            this.props.dispatch(start(this.props.userID, this.props.activityName))
        }
        else {
            this.props.dispatch(end())
        }
        this.setState({ didStart: !this.state.didStart, didReset: false })
    }

    onResetTimer = () => {
        this.setState({
            didStart: false,
            didReset: true,
        });
    }

    getTime = (time) => {
        this.currentTime = time;
        if (this.state.elapsedTime !== time) {
            this.setState({ elapsedTime: time })
        }
    };

    userID() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <TextInput
                        style={{ flex: 1 }}
                        label='User ID'
                        value={this.props.userID}
                        disabled={this.state.isUserLocked || this.state.didStart}
                        onChangeText={text => this.onUserNameSet(text)}
                    />
                    <Icon
                        reverse
                        color='#f50'
                        type='font-awesome'
                        name={this.state.isUserLocked || this.state.didStart ? 'lock' : 'unlock'}
                        onPress={() => this.setState({ isUserLocked: !this.state.isUserLocked })} />
                </View>
                <Picker
                    enabled={!this.state.didStart}
                    selectedValue={this.props.userID}
                    onValueChange={(itemValue, itemIndex) => this.onUserNameSet(itemValue)} >
                    <Picker.Item label="" value="" />
                    {this.props.users.map(item =>
                        <Picker.Item label={item} value={item} />
                    )}
                </Picker>
            </View>
        )
    }

    activity() {
        return (
            <View style={styles.container}>
                <TextInput
                    label='Activity'
                    value={this.props.activityName}
                    disabled={this.state.activityType !== 'other' || this.state.didStart}
                    onChangeText={text => this.onActivityNameSet(text)}
                />
                <Picker
                    enabled={!this.state.didStart}
                    selectedValue={this.state.activityType}
                    onValueChange={(itemValue, itemIndex) => this.onActivityChosen(itemValue)} >
                    <Picker.Item label="other" value="other" />
                    {this.props.activities.map(item =>
                        <Picker.Item label={item} value={item} />
                    )}
                </Picker>
            </View>
        )
    }

    logger() {
        return (
            <View style={styles.container}>
                <Text>Start Time: {this.props.startTime}</Text>
                <Text>End Time: {this.props.endTime}</Text>
                <Stopwatch
                    start={this.state.didStart}
                    reset={this.state.didReset}
                    getTime={this.getTime} />
                <Button
                    mode="contained"
                    disabled={this.props.userID === '' || this.props.activityName === ''}
                    onPress={() => this.onToggleTimer()}>
                    {this.state.didStart ? 'STOP' : 'START'}
                </Button>
            </View>
        )
    }

    sensors() {
        if (!this.state.didStart) {
            return <View />
        }

        return (
            <ScrollView style={styles.container}>
                <MotionSensor />
                <AccelerometerSensor />
                <GyroscopeSensor />
                <MagnetometerSensor />
                <BrightnessSensor />
                <LocationSensor />
            </ScrollView>
        )
    }

    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content title="Activity Logger" />
                    <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
                    <Appbar.Action icon="delete" onPress={() => this.clear()} />
                </Appbar.Header>
                {this.userID()}
                <Divider />
                {this.activity()}
                <Divider />
                {this.logger()}
                <Divider />
                {this.sensors()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    row: {
        flexDirection: 'row',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        userID: state.user,
        activityName: state.activity,
        startTime: state.startTime,
        endTime: state.endTime,
        activities: state.activities,
        users: state.users,
    };
};

export default connect(mapStateToProps)(MainApplication);