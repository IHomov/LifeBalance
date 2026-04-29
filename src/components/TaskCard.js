import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const TaskCard = ({ title, subTitle, progress, color }) => {
  return (
    <View style={[styles.card, { borderLeftColor: color, borderLeftWidth: 5 }]}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.progressContainer}>
         <Text style={[styles.progressText, { color: color }]}>{progress}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
  subTitle: { fontSize: 12, color: '#A9A9A9', marginTop: 4 },
  progressText: { fontWeight: 'bold', fontSize: 14 }
});

export default TaskCard;