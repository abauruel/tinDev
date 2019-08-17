import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient'
import {
  Platform,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';
export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user });
      }
    });
  }, [navigation]);

  async function handleLogin() {
    const response = await api.post('/devs', { username: user });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', { user: _id });
  }
  return (
    <LinearGradient colors={['#ffb95b','#f6652b','#b22e21','#981918']}
      style={styles.container}
      start={{x:0, y: 0.15}}
      end={{x: 0 , y:1}}
    >
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enable={Platform.OS === 'ios'}
    >
      
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite o seu usuário no github"
        placeholderTextColor="#999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
    </KeyboardAvoidingView>
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#ffb95b',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#f6652b',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
