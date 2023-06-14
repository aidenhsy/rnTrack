import React, { useState, useContext, useEffect } from 'react';
import { Text, Input, Button } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import axios from 'axios';
import { Context as AuthContext } from '../context/AuthContext';

export const LoginScreen = () => {
  const { state, signin, tryLocalSignIn } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        'https://4ae8-54-65-82-171.ngrok-free.app/send-verification-code',
        {
          phoneNumber: `+86 ${phoneNumber}`,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(phoneNumber);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer>
        <Text h2>登录</Text>
      </Spacer>
      <Input
        label="手机验证登录"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(e) => setPhoneNumber(e)}
      />
      <Spacer />
      <Spacer>
        <Button title="登录" onPress={handleSubmit} />
      </Spacer>
      <Input
        label="验证码"
        keyboardType="numeric"
        value={verificationCode}
        onChangeText={(e) => setVerificationCode(e)}
      />
      {state.errorMessage && (
        <Text style={styles.errorStyle}>{state.errorMessage}</Text>
      )}
      <Spacer>
        <Button
          title="验证"
          onPress={() =>
            signin({ phoneNumber: `+86 ${phoneNumber}`, verificationCode })
          }
        />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
  errorStyle: {
    color: 'red',
  },
});
