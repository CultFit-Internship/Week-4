import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Image, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, USER, WORKOUT_LOG, WEEKLY_STATS, EXERCISES } from '../data/mockData';

// ─── MINI VOLUME BAR ──────────────────────────────────────────────────────────
const VolumeBar = ({ day, trained, volume, maxVolume }) => {
  const height = trained ? Math.max(8, (volume / maxVolume) * 52) : 6;
  return (
    <View style={styles.barWrap}>
      <View style={[styles.bar, { height, backgroundColor: trained ? COLORS.accent : COLORS.border }]} />
      <Text style={styles.barLabel}>{day}</Text>
    </View>
  );
};

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }) => (
  <View style={[styles.statCard, { borderColor: color + '40' }]}>
    <Ionicons name={icon} size={20} color={color} />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ─── RECENT WORKOUT ROW ───────────────────────────────────────────────────────
const WorkoutRow = ({ workout }) => (
  <View style={styles.workoutRow}>
    <View style={[styles.workoutDot, { backgroundColor: workout.completed ? COLORS.success : COLORS.accent }]} />
    <View style={{ flex: 1 }}>
      <Text style={styles.workoutRowName}>{workout.name}</Text>
      <Text style={styles.workoutRowMeta}>{workout.date} · {workout.duration}</Text>
    </View>
    <Text style={styles.workoutRowVol}>{workout.volume}</Text>
  </View>
);

export default function HomeScreen() {
  const maxVol = Math.max(...WEEKLY_STATS.map(s => s.volume), 1);
  const todayWorkout = WORKOUT_LOG[0];
  const nextExercise = EXERCISES.find(e => e.id === todayWorkout.exercises[0].exerciseId);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.userName}>{USER.name}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{USER.avatarInitials}</Text>
          </View>
        </View>

        {/* ── TOP STATS ── */}
        <View style={styles.statsRow}>
          <StatCard icon="flame" label="Streak" value={`${USER.streak}d`} color={COLORS.warning} />
          <StatCard icon="barbell" label="Workouts" value={USER.totalWorkouts} color={COLORS.accent} />
          <StatCard icon="trending-up" label="This Week" value="4 / 5" color={COLORS.success} />
        </View>

        {/* ── TODAY'S WORKOUT ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          <View style={styles.todayCard}>
            <View style={styles.todayCardTop}>
              <View>
                <Text style={styles.todayName}>{todayWorkout.name}</Text>
                <Text style={styles.todayMeta}>
                  {todayWorkout.exercises.length} exercises · ~{todayWorkout.duration}
                </Text>
              </View>
              <View style={styles.todayBadge}>
                <Text style={styles.todayBadgeText}>In Progress</Text>
              </View>
            </View>

            {/* Next up */}
            <View style={styles.nextUp}>
              <Text style={styles.nextUpLabel}>Next up</Text>
              <View style={styles.nextUpRow}>
                <Text style={styles.nextUpEmoji}>{nextExercise?.emoji}</Text>
                <View>
                  <Text style={styles.nextUpName}>{nextExercise?.name}</Text>
                  <Text style={styles.nextUpSets}>
                    {todayWorkout.exercises[0].sets.length} sets ·{' '}
                    {todayWorkout.exercises[0].sets[0].reps} reps @{' '}
                    {todayWorkout.exercises[0].sets[0].weight} kg
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.startBtn} activeOpacity={0.85}>
              <Ionicons name="play" size={16} color="#fff" />
              <Text style={styles.startBtnText}>Continue Workout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── WEEKLY VOLUME ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Volume</Text>
          <View style={styles.chartCard}>
            <View style={styles.barsRow}>
              {WEEKLY_STATS.map((s, i) => (
                <VolumeBar key={i} {...s} maxVolume={maxVol} />
              ))}
            </View>
            <Text style={styles.chartFooter}>
              Total this week:{' '}
              <Text style={{ color: COLORS.accent, fontWeight: '700' }}>
                {(WEEKLY_STATS.reduce((a, s) => a + s.volume, 0) / 1000).toFixed(1)}t
              </Text>
            </Text>
          </View>
        </View>

        {/* ── RECENT WORKOUTS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          <View style={styles.card}>
            {WORKOUT_LOG.slice(0, 3).map((w, i) => (
              <React.Fragment key={w.id}>
                <WorkoutRow workout={w} />
                {i < 2 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 56, paddingBottom: 20,
  },
  greeting: { fontSize: 14, color: COLORS.textMuted, marginBottom: 2 },
  userName: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  // Stats row
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 4 },
  statCard: {
    flex: 1, backgroundColor: COLORS.surface, borderRadius: 14,
    padding: 14, alignItems: 'center', gap: 4,
    borderWidth: 1,
  },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600' },

  // Section
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 12 },

  // Today card
  todayCard: { backgroundColor: COLORS.surface, borderRadius: 18, padding: 18 },
  todayCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  todayName: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  todayMeta: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  todayBadge: {
    backgroundColor: COLORS.accent + '25', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  todayBadgeText: { color: COLORS.accentLight, fontSize: 12, fontWeight: '700' },
  nextUp: {
    backgroundColor: COLORS.card, borderRadius: 12, padding: 14, marginTop: 14,
  },
  nextUpLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  nextUpRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  nextUpEmoji: { fontSize: 28 },
  nextUpName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  nextUpSets: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  startBtn: {
    backgroundColor: COLORS.accent, borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginTop: 14,
  },
  startBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  // Chart
  chartCard: { backgroundColor: COLORS.surface, borderRadius: 18, padding: 18 },
  barsRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    justifyContent: 'space-around', height: 68,
  },
  barWrap: { alignItems: 'center', gap: 6 },
  bar: { width: 28, borderRadius: 6 },
  barLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600' },
  chartFooter: { fontSize: 13, color: COLORS.textMuted, marginTop: 12, textAlign: 'center' },

  // Recent workouts
  card: { backgroundColor: COLORS.surface, borderRadius: 18, padding: 16 },
  workoutRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  workoutDot: { width: 8, height: 8, borderRadius: 4 },
  workoutRowName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  workoutRowMeta: { fontSize: 12, color: COLORS.textMuted, marginTop: 1 },
  workoutRowVol: { fontSize: 12, color: COLORS.accentLight, fontWeight: '600' },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
});
