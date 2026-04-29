import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../components/CustomInput';
import { COLORS } from '../constants/colors';

const RegistrationScreen = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient colors={['#F0F9FF', '#E0F2FE']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Registration</Text>
        
        <CustomInput 
          placeholder="Login" 
          value={login} 
          onChangeText={setLogin} 
        />
        <CustomInput 
          placeholder="E-mail" 
          value={email} 
          onChangeText={setEmail} 
        />
        <CustomInput 
          placeholder="Password" 
          secureTextEntry={true} 
          value={password} 
          onChangeText={setPassword} 
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Registration</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.footerText}>Do you have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 25 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 30 },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  footerText: { marginTop: 20, color: '#7C7C7C' }
});

export default RegistrationScreen;