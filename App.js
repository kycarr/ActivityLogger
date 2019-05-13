import React from 'react';
import { StyleSheet, Text, TextInput, View, Picker } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      activity: ''
    };
  }

  render() {
    let activityInput = this.state.activity !== 'other' ? undefined :
      <>
        <Text>Other Activity:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.activity}
        />
      </>

    return (
      <View style={styles.container}>
        <Text>User ID:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.userID}
        />

        <Text>Activity:</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ activity: itemValue })
          }>
          <Picker.Item label="Other" value="other" />
        </Picker>

        {activityInput}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1
  },

  dropdown: {
    width: '100%',
  },

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
