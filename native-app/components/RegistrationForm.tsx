import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';

const RegistrationForm = ({
  error,
  onSubmit
}:
  {
    error?: string;
    onSubmit: (username: string, displayName: string, password: string) => void;
  }) => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isFormValid = useCallback(() => {
    return (
      username.trim() !== '' &&
      displayName.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword
    );
  }, [username, displayName, password, confirmPassword]);

  const handleRegister = useCallback(() => {
    setErrorMessage('');
    onSubmit(username, displayName, password);
  }, [onSubmit, username, displayName, password]);

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.")
    } else {
      setErrorMessage('')
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrorMessage(error as string)
  }, [error]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Text style={styles.label}>Display Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your display name"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={[styles.button, !isFormValid() && styles.disabledButton]}
        onPress={handleRegister}
        disabled={!isFormValid()}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationForm;
