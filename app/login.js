import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password');
      return;
    }

    try {
      const users = await AsyncStorage.getItem('users');
      const parsedUsers = users ? JSON.parse(users) : [];
      const userExists = parsedUsers.find(u => u.email === email && u.password === password);

      if (userExists) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(userExists));
        router.replace('/first');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/vetclinic_02.jpg')}
      style={styles.background}
      imageStyle={{ opacity: 0.15 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#6d48ff',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#6d48ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signupText: {
    fontSize: 16,
    color: '#666',
  },
  signupLink: {
    fontSize: 16,
    color: '#6d48ff',
    fontWeight: 'bold',
  },
});
