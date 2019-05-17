import * as React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { connect } from 'react-redux';

class FileViewer extends React.Component {

    onBack = () => {

    }

    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content title="Activity Logger" />
                    <Appbar.BackAction onPress={() => this.onBack()} />
                </Appbar.Header>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps)(FileViewer);