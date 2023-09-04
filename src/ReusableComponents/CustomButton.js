import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

export default function CustomButton(props) {
  return (
    <View style={styles.button}>
      <Button title={props.title} onPress={props.onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {width: 100, alignSelf: 'center', padding: 10},
});
