import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

const FormItem = ({ label, value, onChangeText, onPress, isMultiline = false, placeholder = '', isInput = false }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      
      {isInput ? (
       
        <TextInput
          style={[styles.container, styles.inputValue, isMultiline && styles.multiline]}
          value={value}
          onChangeText={onChangeText} 
          multiline={isMultiline}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          textAlignVertical={isMultiline ? 'top' : 'center'}
        />
      ) : (
      
        <TouchableOpacity
          style={[styles.container,styles.buttonContainer, isMultiline && styles.multiline]}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.value}>{value || placeholder}</Text>
          {!isMultiline && <Text style={styles.arrow}>⌵</Text>}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20, width: '100%' },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  
  container: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    padding: 15,
    width: '100%',
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inputValue: {
    color: COLORS.inputText,
    fontSize: 15,
    height: 52, 
    paddingHorizontal: 15,
  },
  multiline: { 
    height: 100, 
    textAlignVertical: 'top', 
  },
  value: { color: COLORS.inputText, fontSize: 15 },
  arrow: { fontSize: 18, color: COLORS.placeholder },
});

export default FormItem;