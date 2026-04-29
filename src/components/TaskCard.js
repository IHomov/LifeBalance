import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { Pressable } from 'react-native';


const TaskCard = ({ title, subTitle, progress, color, onPress }) => {
return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { 
          borderLeftColor: color, 
          borderLeftWidth: 5,
          opacity: pressed ? 0.7 : 1, 
          transform: [{ scale: pressed ? 0.98 : 1 }] 
        }
      ]}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.progressContainer}>
        <Text style={[styles.progressText, { color: color }]}>{progress}%</Text>
      </View>
    </Pressable>
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