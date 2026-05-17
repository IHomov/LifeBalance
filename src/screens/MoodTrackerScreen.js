import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import MoodBar from '../components/MoodBar';

const MoodTrackerScreen = () => {
  const emojis = ['😊', '😐', '😔'];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mood Tracker</Text>

      {/* Графік */}
      <View style={styles.chartContainer}>
        <MoodBar label="Work" percentage={85} color= {COLORS.moodWork} />
        <MoodBar label="Study" percentage={70} color= {COLORS.moodStudy} />
        <MoodBar label="Kids" percentage={20} color= {COLORS.moodKids} />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How do you feel today?</Text>
        <View style={styles.emojiRow}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity key={index} style={styles.emojiBtn}>
              <Text style={styles.emojiText}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 25, paddingTop: 60 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.textMain, textAlign: 'center', marginBottom: 40 },
  chartContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 25,
    elevation: 2
  },
  questionContainer: { marginTop: 50, alignItems: 'center' },
  questionText: { fontSize: 18, fontWeight: '600', color: COLORS.textMain, marginBottom: 20 },
  emojiRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  emojiBtn: { 
    backgroundColor: COLORS.white, 
    padding: 15, 
    borderRadius: 20, 
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
  },
  emojiText: { fontSize: 30 },
  saveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 25,
    right: 25
  },
  saveBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' }
});

export default MoodTrackerScreen;