import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

const TaskListItem = ({ title, time, status, color, onPress, onLongPress }) => {
  return (
    <TouchableOpacity style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
      >
      <View style={styles.textContainer}>
        <Text style={styles.title}numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.statusContainer}>
      <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
        <Text style={[styles.statusText, { color: color }]}>{status}</Text>
      </View>
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
    width: '100%',
    alignItems: 'center',
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  textContainer: {
    flex: 1, 
    paddingRight: 10,
    justifyContent: 'center',
   
  },
  statusContainer: {
    alignItems: 'flex-end', 
    justifyContent: 'center',
    width: 85, 
  },
  title: { fontSize: 15, fontWeight: '600', color: COLORS.textMain },
  time: { fontSize: 12, color: COLORS.time, marginTop: 4 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, width: '100%',alignItems: 'center'},
  statusText: { fontSize: 11, fontWeight: 'bold' },
});

export default TaskListItem;
