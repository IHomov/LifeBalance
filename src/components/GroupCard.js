import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const GroupCard = ({ title, taskCount, icon, color, progress, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color + '15' }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon name={icon} size={20} color="#fff" />
        </View>
        <Text style={[styles.progressText, { color: color }]}>
          {progress}%{' '}
        </Text>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.taskCount}>{taskCount} Tasks</Text>
        </View>
      </View>

      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progress}%`, backgroundColor: color },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'space-between',
    minHeight: 130,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1C24',
  },
  taskCount: {
    fontSize: 12,
    color: '#707070',
    marginTop: 2,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 2,
    marginTop: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});

export default GroupCard;
