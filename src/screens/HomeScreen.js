import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/colors';
import TaskCard from '../components/TaskCard';
import { SCREENS } from '../constants/screens';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header} />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Iris</Text>
        </View>
        <View style={styles.avatarPlaceholder} />
      </View>

      {/* Main Promo Card */}
      <View style={styles.promoCard}>
        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() =>
            navigation.navigate(SCREENS.ADD_TASK, { groupName: 'General' })
          }
        >
          <Text style={styles.viewBtnText}>View Task</Text>
        </TouchableOpacity>
        <Text style={styles.promoPercent}>85%</Text>
      </View>

      <Text style={styles.sectionTitle}>In progress</Text>
      <TaskCard
        title="Work"
        subTitle="Finish task on week"
        progress={45}
        color="#1E67FF"
        onPress={() => navigation.navigate('AddTask', { groupName: 'Work' })}
      />
      <TaskCard
        title="Study"
        subTitle="Exam last week home"
        progress={80}
        color="#FF6B6B"
        onPress={() => navigation.navigate('AddTask', { groupName: 'Study' })}
      />

      <Text style={styles.sectionTitle}>Task Groups</Text>
      <TaskCard
        title="Work"
        subTitle="22 Tasks"
        progress={70}
        color="#4ECDC4"
        onPress={() => navigation.navigate('AddTask', { groupName: 'Work' })}
      />
      <TaskCard
        title="Study"
        subTitle="12 Tasks"
        progress={30}
        color="#FFD93D"
        onPress={() => navigation.navigate('AddTask', { groupName: 'Study' })}
      />
      <TaskCard
        title="Kids"
        subTitle="10 Tasks"
        progress={20}
        color="#6C5CE7"
        onPress={() => navigation.navigate('AddTask', { groupName: 'Kids' })}
      />

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    paddingHorizontal: 20,
  },

  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 20 },

  greeting: { fontSize: 24, fontWeight: 'bold', color: COLORS.textMain },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#E2E8F0',
  },
  promoCard: {
    backgroundColor: '#EBF2FF',
    borderRadius: 25,
    padding: 30,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  viewBtnText: { color: COLORS.primary, fontWeight: 'bold' },
  promoPercent: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginVertical: 20,
  },
});

export default HomeScreen;
