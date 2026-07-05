import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, StatusBar, ActivityIndicator,
  Modal, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/mockData';
import api from '../api/axiosConfig';
import Toast from 'react-native-toast-message';

const FILTERS = ['All', 'cardio', 'strength', 'flexibility', 'hiit', 'mixed', 'rest'];
const WORKOUT_TYPES = ['cardio', 'strength', 'flexibility', 'hiit', 'mixed', 'rest'];

// ─── EXERCISE ROW (inside an expanded workout) ────────────────────────────────
const ExerciseRow = ({ ex }) => (
  <View style={styles.setRow}>
    <View style={styles.setNumBadge}>
      <Ionicons name="barbell-outline" size={12} color={COLORS.accentLight} />
    </View>
    <Text style={styles.setDetail}>{ex.name}</Text>
    <Text style={styles.setVol}>
      {ex.sets ? `${ex.sets} x ${ex.reps || '-'}` : ex.duration_seconds ? `${ex.duration_seconds}s` : ''}
    </Text>
  </View>
);

// ─── WORKOUT CARD ─────────────────────────────────────────────────────────────
const WorkoutCard = ({ workout }) => {
  const [expanded, setExpanded] = useState(false);
  const exerciseCount = workout.exercises?.length || 0;

  return (
    <View style={styles.workoutCard}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.85}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.statusDot, { backgroundColor: COLORS.accent }]} />
          <View>
            <Text style={styles.cardName}>
              {workout.workout_type?.charAt(0).toUpperCase() + workout.workout_type?.slice(1)}
            </Text>
            <Text style={styles.cardDate}>{workout.date}</Text>
          </View>
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={COLORS.textMuted} />
      </TouchableOpacity>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Ionicons name="time-outline" size={14} color={COLORS.textMuted} />
          <Text style={styles.summaryText}>{workout.duration_minutes} min</Text>
        </View>
        <View style={styles.summaryItem}>
          <Ionicons name="barbell-outline" size={14} color={COLORS.textMuted} />
          <Text style={styles.summaryText}>{exerciseCount} exercises</Text>
        </View>
        {workout.notes ? (
          <View style={styles.summaryItem}>
            <Ionicons name="document-text-outline" size={14} color={COLORS.textMuted} />
            <Text style={styles.summaryText} numberOfLines={1}>{workout.notes}</Text>
          </View>
        ) : null}
      </View>

      {expanded && exerciseCount > 0 && (
        <View style={styles.exList}>
          <View style={styles.divider} />
          <View style={styles.setsContainer}>
            {workout.exercises.map((ex, i) => <ExerciseRow key={ex.id || i} ex={ex} />)}
          </View>
        </View>
      )}
    </View>
  );
};

// ─── ADD SESSION MODAL ─────────────────────────────────────────────────────────
const AddSessionModal = ({ visible, onClose, onSaved }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState('');
  const [workoutType, setWorkoutType] = useState('strength');
  const [notes, setNotes] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setDate(new Date().toISOString().split('T')[0]);
    setDuration('');
    setWorkoutType('strength');
    setNotes('');
    setExerciseName('');
    setSets('');
    setReps('');
  };

  const handleSubmit = async () => {
    if (!date.trim()) {
      Toast.show({ type: 'error', text1: 'Date is required' });
      return;
    }
    if (!duration || isNaN(duration) || Number(duration) <= 0) {
      Toast.show({ type: 'error', text1: 'Duration must be a positive number' });
      return;
    }
    if (!WORKOUT_TYPES.includes(workoutType)) {
      Toast.show({ type: 'error', text1: 'Invalid workout type' });
      return;
    }

    const exercises = [];
    if (exerciseName.trim()) {
      if (!sets || isNaN(sets) || Number(sets) <= 0) {
        Toast.show({ type: 'error', text1: 'Sets must be a positive number' });
        return;
      }
      if (!reps || isNaN(reps) || Number(reps) <= 0) {
        Toast.show({ type: 'error', text1: 'Reps must be a positive number' });
        return;
      }
      exercises.push({ name: exerciseName.trim(), sets: Number(sets), reps: Number(reps) });
    }

    setSubmitting(true);
    try {
      await api.post('/workouts', {
        date: date.trim(),
        duration_minutes: Number(duration),
        workout_type: workoutType,
        notes: notes.trim(),
        exercises,
      });
      Toast.show({ type: 'success', text1: 'Workout logged!' });
      resetForm();
      onSaved();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to save workout';
      Toast.show({ type: 'error', text1: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Workout</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Date (YYYY-MM-DD)</Text>
            <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="2026-07-05" placeholderTextColor={COLORS.textFaint} />

            <Text style={styles.inputLabel}>Duration (minutes)</Text>
            <TextInput style={styles.input} value={duration} onChangeText={setDuration} keyboardType="numeric" placeholder="45" placeholderTextColor={COLORS.textFaint} />

            <Text style={styles.inputLabel}>Workout Type</Text>
            <View style={styles.typeRow}>
              {WORKOUT_TYPES.map(t => (
                <TouchableOpacity
                  key={t}
                  style={[styles.typePill, workoutType === t && styles.typePillActive]}
                  onPress={() => setWorkoutType(t)}
                >
                  <Text style={[styles.typeText, workoutType === t && styles.typeTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Notes (optional)</Text>
            <TextInput style={styles.input} value={notes} onChangeText={setNotes} placeholder="Morning session" placeholderTextColor={COLORS.textFaint} />

            <Text style={[styles.inputLabel, { marginTop: 16 }]}>Exercise (optional)</Text>
            <TextInput style={styles.input} value={exerciseName} onChangeText={setExerciseName} placeholder="e.g. Bench Press" placeholderTextColor={COLORS.textFaint} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TextInput style={[styles.input, { flex: 1 }]} value={sets} onChangeText={setSets} keyboardType="numeric" placeholder="Sets" placeholderTextColor={COLORS.textFaint} />
              <TextInput style={[styles.input, { flex: 1 }]} value={reps} onChangeText={setReps} keyboardType="numeric" placeholder="Reps" placeholderTextColor={COLORS.textFaint} />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit} disabled={submitting}>
              {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save Workout</Text>}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────
export default function WorkoutLogScreen() {
  const [filter, setFilter] = useState('All');
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/workouts');
      const data = Array.isArray(res.data) ? res.data : res.data.workouts || [];
      setWorkouts(data);
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Could not load workouts' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const filtered = workouts.filter(w => filter === 'All' || w.workout_type === filter);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Workout Log</Text>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.85} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.totalsRow}>
        <View style={styles.totalItem}>
          <Text style={styles.totalValue}>{workouts.length}</Text>
          <Text style={styles.totalLabel}>Sessions</Text>
        </View>
        <View style={styles.totalDivider} />
        <View style={styles.totalItem}>
          <Text style={styles.totalValue}>
            {workouts.reduce((a, w) => a + (w.duration_minutes || 0), 0)}
          </Text>
          <Text style={styles.totalLabel}>Total Minutes</Text>
        </View>
      </View>

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

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
          {filtered.length === 0 ? (
            <Text style={{ color: COLORS.textMuted, textAlign: 'center', marginTop: 40 }}>
              No workouts yet. Tap + to log one!
            </Text>
          ) : (
            filtered.map(w => <WorkoutCard key={w.id} workout={w} />)
          )}
        </ScrollView>
      )}

      <AddSessionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSaved={fetchWorkouts}
      />
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

  filterRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 4, flexWrap: 'wrap' },
  filterPill: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, marginBottom: 6,
  },
  filterPillActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  filterText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '600' },
  filterTextActive: { color: '#fff' },

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

  exList: { paddingHorizontal: 14, paddingBottom: 14 },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 12 },

  setsContainer: { backgroundColor: COLORS.card, borderRadius: 10, padding: 10 },
  setRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5 },
  setNumBadge: {
    width: 22, height: 22, borderRadius: 6,
    backgroundColor: COLORS.accent + '30', justifyContent: 'center', alignItems: 'center',
  },
  setDetail: { flex: 1, fontSize: 13, color: COLORS.text },
  setVol: { fontSize: 12, color: COLORS.textMuted },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: COLORS.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, maxHeight: '85%',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  inputLabel: { fontSize: 13, color: COLORS.textMuted, fontWeight: '600', marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: COLORS.surface, color: COLORS.text,
    padding: 12, borderRadius: 10, fontSize: 15,
  },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typePill: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
    backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border,
  },
  typePillActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  typeText: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  typeTextActive: { color: '#fff' },
  saveBtn: {
    backgroundColor: COLORS.accent, padding: 16, borderRadius: 10,
    alignItems: 'center', marginTop: 20, marginBottom: 10,
  },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});