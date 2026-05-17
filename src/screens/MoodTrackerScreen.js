import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, LayoutAnimation } from 'react-native';
import { COLORS } from '../constants/colors';
import MoodBar from '../components/MoodBar';

const MoodTrackerScreen = ({ navigation }) => {
  const emojis = ['😊', '😐', '😔'];
  // State to save the index of the selected emoji
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState(null);

  const handleSelectEmoji = (index) => {
    // smooth animation of button selection change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedEmojiIndex(index);
  };

  const handleSaveMood = () => {
    if (selectedEmojiIndex === null) {
      Alert.alert('Mood Tracker', 'Please select how you feel today before saving! 😊');
      return;
    }

    const moodResponses = [
      "Awesome! Keep up this amazing positive energy! 🌟",
      "Neutral day. Steady steps achieve great things! 🐾",
      "Sad day. Please take it easy and don't overwork yourself today. ☕"
    ];

    // Display feedback to the user and return to the main screen
    Alert.alert(
      'Mood Saved!',
      moodResponses[selectedEmojiIndex],
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mood Tracker</Text>

      {/* Графік прогресу емоцій по категоріях */}
      <View style={styles.chartContainer}>
        <MoodBar label="Work" percentage={85} color={COLORS.moodWork} />
        <MoodBar label="Study" percentage={70} color={COLORS.moodStudy} />
        <MoodBar label="Kids" percentage={20} color={COLORS.moodKids} />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How do you feel today?</Text>
        <View style={styles.emojiRow}>
          {emojis.map((emoji, index) => {
            const isSelected = selectedEmojiIndex === index;
            return (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.emojiBtn,
                  // The active button gets a light background color and border
                  isSelected && styles.activeEmojiBtn
                ]}
                onPress={() => handleSelectEmoji(index)}
                activeOpacity={0.7}
              >
                <Text style={[styles.emojiText, isSelected && { transform: [{ scale: 1.15 }] }]}>
                  {emoji}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Add an onPress event for the save mood button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSaveMood} activeOpacity={0.8}>
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
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
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
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 70,
    alignItems: 'center'
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
  saveBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  activeEmojiBtn: {
    backgroundColor: COLORS.activeButton,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
});

export default MoodTrackerScreen;