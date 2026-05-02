import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

const TaskListItem = ({ title, time, status, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      >
      <View style={styles.textGroup}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
        <Text style={[styles.statusText, { color: color }]}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  title: { fontSize: 15, fontWeight: '600', color: COLORS.textMain },
  time: { fontSize: 12, color: '#A0AEC0', marginTop: 4 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
});

export default TaskListItem;
