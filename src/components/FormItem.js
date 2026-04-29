import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

const FormItem = ({ label, value, onPress, isMultiline = false }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.container, isMultiline && styles.multiline]}
        onPress={onPress}
        disabled={!onPress}
      >
        <Text style={styles.value}>{value}</Text>
        {!isMultiline && <Text style={styles.arrow}>⌵</Text>}
      </TouchableOpacity>
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
    backgroundColor: '#EDF2F7',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  multiline: { height: 100, alignItems: 'flex-start' },
  value: { color: '#4A5568', fontSize: 15 },
  arrow: { fontSize: 18, color: '#A0AEC0' },
});

export default FormItem;
