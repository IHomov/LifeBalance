import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../components/CustomInput';
import { COLORS } from '../constants/colors';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SCREENS } from '../constants/screens';

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[COLORS.tertiaryBg, COLORS.registrationcolor]}
          style={styles.container}
        >
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

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.replace(SCREENS.MAIN)}
            >
              <Text style={styles.buttonText}>Registration</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.footerText}>
                Do you have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1 },
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 30,
    marginTop: 50,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  footerText: { marginTop: 20, color: COLORS.textMain },
});

export default RegistrationScreen;
