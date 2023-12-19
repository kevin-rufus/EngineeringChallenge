import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import RegistrationForm from '../components/RegistrationForm';
import axios from 'axios';
import { useState, useCallback } from 'react';
import apiUrl from '../constants/apiUrl';
import { router } from 'expo-router';
import { Text } from '../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {

  const [error, setError] = useState('');

  const handleRegistation = useCallback((username: string, displayName: string, password: string) => {
    axios
    .post(`${apiUrl}/auth/register`, {username, displayName, password})
    .then(async ({data: responseData}) => {
      if(responseData.success) {
        router.replace("/login");
      }
    })
    .catch((error) => {
      if(error.response) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later')
      }
    })
  },[]);

  return (
    <View style={styles.container}>
      <Text style={{textAlign: "center", fontWeight: "500" }}> Register</Text>
      <RegistrationForm onSubmit={handleRegistation} error={error}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
