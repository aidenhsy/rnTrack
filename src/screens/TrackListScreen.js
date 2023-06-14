import React, { useContext } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TrackListScreen = ({ navigation }) => {
  const {
    state: { token },
  } = useContext(AuthContext);
  console.log('token i', AsyncStorage.getItem('token'));

  return (
    <View>
      <Text>TrackList Screen</Text>
      <Button
        title="Track Detail"
        onPress={() => navigation.navigate('Track Detail')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
