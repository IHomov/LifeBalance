import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/colors';

const CustomInput = ({ placeholder, secureTextEntry, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
    // Ефект легкої тіні
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    height: 55,
    fontSize: 16,
    color: COLORS.textMain,
  },
});

export default CustomInput;