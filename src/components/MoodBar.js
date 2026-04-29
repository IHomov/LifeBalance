import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const MoodBar = ({ label, percentage, color }) => {
  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { height: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.percentText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginHorizontal: 10 },
  barBackground: {
    height: 150,
    width: 40,
    backgroundColor: '#EDF2F7',
    borderRadius: 10,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: { width: '100%', borderRadius: 10 },
  label: { marginTop: 10, fontWeight: 'bold', color: COLORS.textMain },
  percentText: { fontSize: 12, color: '#A0AEC0', marginTop: 4 }
});

export default MoodBar;