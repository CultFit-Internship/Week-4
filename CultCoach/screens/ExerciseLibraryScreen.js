import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Image, TextInput,
  StatusBar, Modal, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, EXERCISES, MUSCLE_GROUPS } from '../data/mockData';

const DIFFICULTY_COLORS = {
  Beginner: COLORS.success,
  Intermediate: COLORS.warning,
  Advanced: COLORS.danger,
};

const TYPE_ICONS = {
  Compound: 'git-merge-outline',
  Isolation: 'radio-button-on-outline',
  Isometric: 'pause-outline',
};

// ─── DIFFICULTY BADGE ────────────────────────────────────────────────────────
const DiffBadge = ({ difficulty }) => (
  <View style={[styles.badge, { backgroundColor: DIFFICULTY_COLORS[difficulty] + '25' }]}>
    <Text style={[styles.badgeText, { color: DIFFICULTY_COLORS[difficulty] }]}>
      {difficulty}
    </Text>
  </View>
);

// ─── EXERCISE DETAIL MODAL ───────────────────────────────────────────────────
const ExerciseModal = ({ exercise, onClose }) => {
  if (!exercise) return null;
  return (
    <Modal visible={!!exercise} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          {/* Image */}
          <Image source={{ uri: exercise.imageUri }} style={styles.modalImage} />
          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Ionicons name="close" size={20} color={COLORS.text} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
            {/* Title Row */}
            <View style={styles.modalTitleRow}>
              <Text style={styles.modalEmoji}>{exercise.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalName}>{exercise.name}</Text>
                <View style={styles.modalBadgesRow}>
                  <DiffBadge difficulty={exercise.difficulty} />
                  <View style={[styles.badge, { backgroundColor: COLORS.accent + '25' }]}>
                    <Ionicons name={TYPE_ICONS[exercise.type] || 'body-outline'} size={10} color={COLORS.accentLight} />
                    <Text style={[styles.badgeText, { color: COLORS.accentLight }]}>{exercise.type}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Info Grid */}
            <View style={styles.infoGrid}>
              <View style={styles.infoCell}>
                <Text style={styles.infoCellLabel}>Primary</Text>
                <Text style={styles.infoCellValue}>{exercise.muscleGroup}</Text>
              </View>
              <View style={styles.infoCell}>
                <Text style={styles.infoCellLabel}>Equipment</Text>
                <Text style={styles.infoCellValue}>{exercise.equipment}</Text>
              </View>
              {exercise.secondaryMuscles.length > 0 && (
                <View style={[styles.infoCell, { width: '100%' }]}>
                  <Text style={styles.infoCellLabel}>Secondary</Text>
                  <Text style={styles.infoCellValue}>{exercise.secondaryMuscles.join(', ')}</Text>
                </View>
              )}
            </View>

            {/* Description */}
            <Text style={styles.modalSectionLabel}>About</Text>
            <Text style={styles.modalDescription}>{exercise.description}</Text>

            {/* Tips */}
            <Text style={styles.modalSectionLabel}>Coaching Tips</Text>
            {exercise.tips.map((tip, i) => (
              <View key={i} style={styles.tipRow}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}

            {/* Add to Workout Button */}
            <TouchableOpacity style={styles.addToWorkoutBtn} activeOpacity={0.85}>
              <Ionicons name="add-circle" size={18} color="#fff" />
              <Text style={styles.addToWorkoutText}>Add to Workout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ─── EXERCISE CARD ────────────────────────────────────────────────────────────
const ExerciseCard = ({ exercise, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(exercise)} activeOpacity={0.85}>
    <Image source={{ uri: exercise.imageUri }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <View style={styles.cardTop}>
        <Text style={styles.cardEmoji}>{exercise.emoji}</Text>
        <DiffBadge difficulty={exercise.difficulty} />
      </View>
      <Text style={styles.cardName} numberOfLines={1}>{exercise.name}</Text>
      <Text style={styles.cardMuscle}>{exercise.muscleGroup}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.cardTypeRow}>
          <Ionicons name={TYPE_ICONS[exercise.type] || 'body-outline'} size={11} color={COLORS.textMuted} />
          <Text style={styles.cardType}>{exercise.type}</Text>
        </View>
        <Text style={styles.cardEquip}>{exercise.equipment}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────
export default function ExerciseLibraryScreen() {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const filtered = useMemo(() => {
    return EXERCISES.filter(e => {
      const matchesGroup = selectedGroup === 'All' || e.muscleGroup === selectedGroup;
      const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.muscleGroup.toLowerCase().includes(search.toLowerCase());
      return matchesGroup && matchesSearch;
    });
  }, [search, selectedGroup]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Exercises</Text>
        <Text style={styles.screenCount}>{filtered.length} moves</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={16} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor={COLORS.textFaint}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={16} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Muscle Group Filter */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
        style={styles.filterScrollOuter}
      >
        {MUSCLE_GROUPS.map(g => (
          <TouchableOpacity
            key={g}
            style={[styles.filterPill, selectedGroup === g && styles.filterPillActive]}
            onPress={() => setSelectedGroup(g)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterText, selectedGroup === g && styles.filterTextActive]}>
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={COLORS.textFaint} />
            <Text style={styles.emptyText}>No exercises found</Text>
            <Text style={styles.emptySubText}>Try a different search or filter</Text>
          </View>
        ) : (
          <View style={styles.cardGrid}>
            {filtered.map(ex => (
              <ExerciseCard key={ex.id} exercise={ex} onPress={setSelectedExercise} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Detail Modal */}
      <ExerciseModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  screenHeader: {
    flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 56, paddingBottom: 14,
  },
  screenTitle: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  screenCount: { fontSize: 14, color: COLORS.textMuted, fontWeight: '600' },

  // Search
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: COLORS.surface, borderRadius: 14, marginHorizontal: 16,
    paddingHorizontal: 14, paddingVertical: 11,
  },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 14 },

  // Filter
  filterScrollOuter: { marginTop: 12 },
  filterScroll: { paddingHorizontal: 16, gap: 8 },
  filterPill: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border,
  },
  filterPillActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  filterText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '600' },
  filterTextActive: { color: '#fff' },

  // Grid
  grid: { padding: 12, paddingBottom: 32 },
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  emptyState: { flex: 1, alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyText: { fontSize: 17, fontWeight: '700', color: COLORS.textMuted },
  emptySubText: { fontSize: 13, color: COLORS.textFaint },

  // Card
  card: {
    width: '47%', backgroundColor: COLORS.surface, borderRadius: 16, overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 110, resizeMode: 'cover' },
  cardContent: { padding: 12 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardEmoji: { fontSize: 18 },
  cardName: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  cardMuscle: { fontSize: 12, color: COLORS.accentLight, fontWeight: '600', marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTypeRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  cardType: { fontSize: 11, color: COLORS.textMuted },
  cardEquip: { fontSize: 10, color: COLORS.textFaint },

  // Badge
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6,
  },
  badgeText: { fontSize: 10, fontWeight: '700' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: '#000000CC', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: COLORS.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalImage: { width: '100%', height: 200, borderTopLeftRadius: 24, borderTopRightRadius: 24, resizeMode: 'cover' },
  modalClose: {
    position: 'absolute', top: 14, right: 14,
    backgroundColor: '#00000080', borderRadius: 20, padding: 6,
  },
  modalTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  modalEmoji: { fontSize: 32 },
  modalName: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  modalBadgesRow: { flexDirection: 'row', gap: 8 },

  infoGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
    backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, marginBottom: 18,
  },
  infoCell: { width: '45%' },
  infoCellLabel: { fontSize: 10, color: COLORS.textFaint, fontWeight: '700', textTransform: 'uppercase', marginBottom: 2 },
  infoCellValue: { fontSize: 14, fontWeight: '700', color: COLORS.text },

  modalSectionLabel: {
    fontSize: 12, fontWeight: '700', color: COLORS.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8,
  },
  modalDescription: { fontSize: 14, color: COLORS.textMuted, lineHeight: 22, marginBottom: 18 },

  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  tipBullet: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: COLORS.accent, marginTop: 7,
  },
  tipText: { flex: 1, fontSize: 14, color: COLORS.text, lineHeight: 20 },

  addToWorkoutBtn: {
    backgroundColor: COLORS.accent, borderRadius: 14, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginTop: 20, marginBottom: 8,
  },
  addToWorkoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
