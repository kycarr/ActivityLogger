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
    elapsedTime: '',
    didStart: false,
    didReset: false,
  };

  onActivityChosen = (type) => {
    const name = type === 'other' ? '' : type
    this.onResetTimer()
    this.setState({
      activityType: type,
      activityName: name
    })
  }

  onActivityName = (name) => {
    this.onResetTimer()
    this.setState({ activityName: name })
  }

  onToggleTimer = () => {
    if (!this.state.didStart) {
      this.setState({ startTime: new Date().toLocaleString() })
    }
    else {
      this.setState({ endTime: new Date().toLocaleString() })
    }
    this.setState({ didStart: !this.state.didStart, didReset: false })
  }

  onResetTimer = () => {
    this.setState({
      startTime: '',
      endTime: '',
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
      <View style={[styles.container, styles.row]}>
        <TextInput
          style={{ flex: 1 }}
          label='User ID'
          value={this.state.userID}
          disabled={this.state.isUserLocked || this.state.didStart}
          onChangeText={text => this.setState({ userID: text })}
        />
        <Icon
          reverse
          color='#f50'
          type='font-awesome'
          name={this.state.isUserLocked || this.state.didStart ? 'lock' : 'unlock'}
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
            enabled={!this.state.didStart}
            selectedValue={this.state.activityType}
            onValueChange={(itemValue, itemIndex) => this.onActivityChosen(itemValue)} >
            <Picker.Item label="Other" value="other" />
            <Picker.Item label="Test" value="test" />
          </Picker>
        </View>
        {this.state.activityType !== 'other' ? undefined :
          <TextInput
            label='Other activity'
            value={this.state.activityName}
            disabled={this.state.didStart}
            onChangeText={text => this.onActivityName(text)}
          />}
      </View>
    )
  }

  logger() {
    return (
      <View style={styles.container}>
        <Text>Start Time: {this.state.startTime}</Text>
        <Text>End Time: {this.state.endTime}</Text>
        <Stopwatch
          start={this.state.didStart}
          reset={this.state.didReset}
          getTime={this.getTime} />
        <Button mode="contained" onPress={() => this.onToggleTimer()}>
          {this.state.didStart ? 'STOP' : 'START'}
        </Button>
        {this.state.didStart ? undefined :
          <Button mode="contained" onPress={() => this.onResetTimer()}>
            RESET
          </Button>}
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
