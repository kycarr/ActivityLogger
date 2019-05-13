import * as React from 'react';
import { Picker, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements'
import { Appbar, Button, Divider, TextInput } from 'react-native-paper';
import { Stopwatch } from 'react-native-stopwatch-timer'

export default class App extends React.Component {
  state = {
    userID: '',
    activityType: 'other',
    activityName: '',
    isUserLocked: false,

    startTime: '',
    endTime: '',
    elapsedTime: '00:00:00:000',
    didStart: false,
  };

  onActivityChosen = (type) => {
    const name = type === 'other' ? '' : type
    this.setState({
      activityType: type,
      activityName: name
    })
  }

  onTimer = () => {
    if (!this.state.didStart) {
      this.setState({ startTime: new Date().toDateString() })
    }
    else {
      this.setState({ endTime: new Date().toDateString() })
    }
    this.setState({ didStart: !this.state.didStart})
  }

  getTime = (time) => {
    this.currentTime = time;
  };

  userID() {
    return (
      <View style={[styles.container, styles.row]}>
        <TextInput
          style={{ flex: 1 }}
          label='User ID'
          value={this.state.userID}
          disabled={this.state.isUserLocked}
          onChangeText={text => this.setState({ userID: text })}
        />
        <Icon
          reverse
          color='#f50'
          type='font-awesome'
          name={this.state.isUserLocked ? 'lock' : 'unlock'}
          onPress={() => this.setState({ isUserLocked: !this.state.isUserLocked })} />
      </View>
    )
  }

  activity() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>Activity:</Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.state.activityType}
            onValueChange={(itemValue, itemIndex) => this.onActivityChosen(itemValue)} >
            <Picker.Item label="Other" value="other" />
            <Picker.Item label="Test" value="test" />
          </Picker>
        </View>
        {this.state.activityType === 'other' ?
          <TextInput
            label='Other activity'
            value={this.state.activityName}
            onChangeText={text => this.setState({ activityName: text })}
          />
          : undefined}
      </View>
    )
  }

  logger() {
    return (
      <View style={styles.container}>
        <Text>Start Time: {this.state.startTime}</Text>
        <Text>End Time: {this.state.endTime}</Text>
        <Stopwatch
          laps
          msecs
          start={this.state.didStart}
          getTime={this.getTime} />
        <Button mode="contained" onPress={() => this.onTimer()}>
          {this.state.didStart ? 'STOP' : 'START'}
        </Button>
        <Button mode="contained" onPress={() => this.onTimer()}>
          RESET
        </Button>
      </View>
    )
  }

  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.Content title="Activity Logger" />
        </Appbar.Header>

        {this.userID()}
        <Divider />
        {this.activity()}
        <Divider />
        {this.logger()}

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
