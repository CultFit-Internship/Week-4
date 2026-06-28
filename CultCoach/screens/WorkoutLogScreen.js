import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, WORKOUT_LOG, EXERCISES } from '../data/mockData';

const FILTERS = ['All', 'Completed', 'In Progress'];

const difficultyColor = (difficulty) => ({
  Beginner: COLORS.success,
  Intermediate: COLORS.warning,
  Advanced: COLORS.danger,
}[difficulty] || COLORS.accent);

// ─── SET ROW ─────────────────────────────────────────────────────────────────
const SetRow = ({ set, index }) => (
  <View style={styles.setRow}>
    <View style={styles.setNumBadge}>
      <Text style={styles.setNum}>{index + 1}</Text>
    </View>
    <Text style={styles.setDetail}>
      {set.reps} reps {set.weight > 0 ? `@ ${set.weight} kg` : '(BW)'}
    </Text>
    <Text style={styles.setVol}>
      {set.weight > 0 ? `${(set.reps * set.weight).toFixed(0)} kg` : '—'}
    </Text>
  </View>
);

// ─── EXERCISE BLOCK ──────────────────────────────────────────────────────────
const ExerciseBlock = ({ exerciseEntry }) => {
  const [open, setOpen] = useState(false);
  const ex = EXERCISES.find(e => e.id === exerciseEntry.exerciseId);
  if (!ex) return null;
  const totalVol = exerciseEntry.sets.reduce((a, s) => a + s.reps * s.weight, 0);

  return (
    <View style={styles.exBlock}>
      <TouchableOpacity style={styles.exHeader} onPress={() => setOpen(!open)} activeOpacity={0.8}>
        <Text style={styles.exEmoji}>{ex.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.exName}>{ex.name}</Text>
          <Text style={styles.exMeta}>
            {exerciseEntry.sets.length} sets · {ex.muscleGroup}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.exVol}>{totalVol > 0 ? `${totalVol} kg` : 'BW'}</Text>
          <Ionicons
            name={open ? 'chevron-up' : 'chevron-down'}
            size={14} color={COLORS.textMuted} style={{ marginTop: 4 }}
          />
        </View>
      </TouchableOpacity>
      {open && (
        <View style={styles.setsContainer}>
          <View style={styles.setHeader}>
            <Text style={styles.setHeaderText}>SET</Text>
            <Text style={[styles.setHeaderText, { flex: 1 }]}>REPS · WEIGHT</Text>
            <Text style={styles.setHeaderText}>VOLUME</Text>
          </View>
          {exerciseEntry.sets.map((s, i) => <SetRow key={i} set={s} index={i} />)}
        </View>
      )}
    </View>
  );
};

// ─── WORKOUT CARD ─────────────────────────────────────────────────────────────
const WorkoutCard = ({ workout }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.workoutCard}>
      {/* Card Header */}
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.85}
      >
        <View style={styles.cardLeft}>
          <View style={[
            styles.statusDot,
            { backgroundColor: workout.completed ? COLORS.success : COLORS.accent }
          ]} />
          <View>
            <Text style={styles.cardName}>{workout.name}</Text>
            <Text style={styles.cardDate}>{workout.date}</Text>
          </View>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18} color={COLORS.textMuted}
        />
      </TouchableOpacity>

      {/* Summary Row */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Ionicons name="time-outline" size={14} color={COLORS.textMuted} />
          <Text style={styles.summaryText}>{workout.duration}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Ionicons name="barbell-outline" size={14} color={COLORS.textMuted} />
          <Text style={styles.summaryText}>{workout.exercises.length} exercises</Text>
        </View>
        <View style={styles.summaryItem}>
          <Ionicons name="trending-up-outline" size={14} color={COLORS.textMuted} />
          <Text style={styles.summaryText}>{workout.volume}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: workout.completed ? COLORS.success + '20' : COLORS.accent + '20' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: workout.completed ? COLORS.success : COLORS.accentLight }
          ]}>
            {workout.completed ? 'Done' : 'Active'}
          </Text>
        </View>
      </View>

      {/* Expanded Exercise Log */}
      {expanded && (
        <View style={styles.exList}>
          <View style={styles.divider} />
          {workout.exercises.map((ex, i) => (
            <React.Fragment key={i}>
              <ExerciseBlock exerciseEntry={ex} />
              {i < workout.exercises.length - 1 && <View style={styles.dividerLight} />}
            </React.Fragment>
          ))}
        </View>
      )}
    </View>
  );
};

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────
export default function WorkoutLogScreen() {
  const [filter, setFilter] = useState('All');

  const filtered = WORKOUT_LOG.filter(w => {
    if (filter === 'Completed') return w.completed;
    if (filter === 'In Progress') return !w.completed;
    return true;
  });

  const totalVol = WORKOUT_LOG.reduce((a, w) => {
    const n = parseFloat(w.volume.replace(',', ''));
    return a + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Workout Log</Text>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Quick Totals */}
      <View style={styles.totalsRow}>
        <View style={styles.totalItem}>
          <Text style={styles.totalValue}>{WORKOUT_LOG.length}</Text>
          <Text style={styles.totalLabel}>Sessions</Text>
        </View>
        <View style={styles.totalDivider} />
        <View style={styles.totalItem}>
          <Text style={styles.totalValue}>
            {WORKOUT_LOG.filter(w => w.completed).length}
          </Text>
          <Text style={styles.totalLabel}>Completed</Text>
        </View>
        <View style={styles.totalDivider} />
        <View style={styles.totalItem}>
          <Text style={[styles.totalValue, { color: COLORS.accentLight }]}>
            {(totalVol / 1000).toFixed(0)}t
          </Text>
          <Text style={styles.totalLabel}>Total Volume</Text>
        </View>
      </View>

      {/* Filter Pills */}
      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterPill, filter === f && styles.filterPillActive]}
            onPress={() => setFilter(f)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Workout Cards */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {filtered.map(w => <WorkoutCard key={w.id} workout={w} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  screenHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16,
  },
  screenTitle: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  addBtn: {
    backgroundColor: COLORS.accent, width: 40, height: 40,
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
  },

  totalsRow: {
    flexDirection: 'row', backgroundColor: COLORS.surface,
    marginHorizontal: 16, borderRadius: 16, padding: 16, marginBottom: 12,
  },
  totalItem: { flex: 1, alignItems: 'center' },
  totalValue: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  totalLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600', marginTop: 2 },
  totalDivider: { width: 1, backgroundColor: COLORS.border, marginHorizontal: 8 },

  filterRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 4 },
  filterPill: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border,
  },
  filterPillActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  filterText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '600' },
  filterTextActive: { color: '#fff' },

  // Workout Card
  workoutCard: {
    backgroundColor: COLORS.surface, borderRadius: 18,
    marginBottom: 12, overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  cardName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  cardDate: { fontSize: 12, color: COLORS.textMuted, marginTop: 1 },
  summaryRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingBottom: 14, flexWrap: 'wrap',
  },
  summaryItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  summaryText: { fontSize: 12, color: COLORS.textMuted },
  statusBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, marginLeft: 'auto' },
  statusText: { fontSize: 11, fontWeight: '700' },

  // Exercises
  exList: { paddingHorizontal: 14, paddingBottom: 14 },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 12 },
  dividerLight: { height: 1, backgroundColor: COLORS.border + '60', marginVertical: 6 },

  exBlock: { paddingVertical: 4 },
  exHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  exEmoji: { fontSize: 22 },
  exName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  exMeta: { fontSize: 12, color: COLORS.textMuted, marginTop: 1 },
  exVol: { fontSize: 13, fontWeight: '700', color: COLORS.accentLight },

  setsContainer: { marginTop: 10, backgroundColor: COLORS.card, borderRadius: 10, padding: 10 },
  setHeader: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  setHeaderText: { fontSize: 10, color: COLORS.textFaint, fontWeight: '700', letterSpacing: 0.5 },
  setRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5 },
  setNumBadge: {
    width: 22, height: 22, borderRadius: 6,
    backgroundColor: COLORS.accent + '30', justifyContent: 'center', alignItems: 'center',
  },
  setNum: { fontSize: 11, color: COLORS.accentLight, fontWeight: '700' },
  setDetail: { flex: 1, fontSize: 13, color: COLORS.text },
  setVol: { fontSize: 12, color: COLORS.textMuted },
});
