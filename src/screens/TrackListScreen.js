import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export const TrackListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>TrackListScreen</Text>
      <Button
        title="Track Detail"
        onPress={() => navigation.navigate('Track Detail')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
