import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants';
import LoginForm from '../components/LoginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState, useCallback } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { router } from 'expo-router';
import apiUrl from '../constants/apiUrl';
import { Button } from '../components/Themed';
export default function Login() {

  const authContext = useContext(AuthContext)
  const [error, setError] = useState('');

  const handleLogin = useCallback((username: string, password: string) => {
    axios
    .post(`${apiUrl}/auth/login`, { username, password })
    .then(async ({ data: responseData }) => {
      console.log(responseData)
      if (responseData.success) {
        const token = responseData.data.token;
        await AsyncStorage.setItem(AUTH_TOKEN, token);
        authContext?.setAuth({ isLoggedIn: true, token });
        router.replace('/');
      }
    })
    .catch((error) => {
      console.log(error.response)
      if(error.response) {
        setError(error.response.data.message)
      } else {
        setError('Something went wrong. Please try again later')
      }
    });
  },[authContext?.setAuth]);

  return (
    <View style={styles.container}>
      <Text style={{textAlign: "center", fontWeight: "500" }}>Login</Text>
      <LoginForm onSubmit={handleLogin} error={error}/>
      <Button style={{marginHorizontal: 18}} onPress={() => router.replace('/register')} text="Register"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
