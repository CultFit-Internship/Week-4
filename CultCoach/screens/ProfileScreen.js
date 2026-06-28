import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, StatusBar, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, USER, WORKOUT_LOG } from '../data/mockData';

// ─── BMI HELPERS ──────────────────────────────────────────────────────────────
const calcBMI = (weightKg, heightCm) => {
  const hM = heightCm / 100;
  return weightKg / (hM * hM);
};

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { label: 'Underweight', color: COLORS.warning };
  if (bmi < 25) return { label: 'Normal', color: COLORS.success };
  if (bmi < 30) return { label: 'Overweight', color: COLORS.warning };
  return { label: 'Obese', color: COLORS.danger };
};

// Scale 10–40 mapped to 0–100%
const bmiToPercent = (bmi) => Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));

// ─── BMI GAUGE ────────────────────────────────────────────────────────────────
const BMIGauge = ({ bmi }) => {
  const cat = getBMICategory(bmi);
  const pct = bmiToPercent(bmi);

  return (
    <View style={styles.gaugeWrap}>
      {/* Track */}
      <View style={styles.gaugeTrack}>
        {/* Segments */}
        <View style={[styles.gaugeSegment, { backgroundColor: COLORS.warning + 'AA', flex: 1.85 }]} />
        <View style={[styles.gaugeSegment, { backgroundColor: COLORS.success + 'AA', flex: 2.6 }]} />
        <View style={[styles.gaugeSegment, { backgroundColor: COLORS.warning + 'AA', flex: 2.5 }]} />
        <View style={[styles.gaugeSegment, { backgroundColor: COLORS.danger + 'AA', flex: 3.05 }]} />
      </View>
      {/* Needle */}
      <View style={[styles.needle, { left: `${pct}%` }]} />
      {/* Labels */}
      <View style={styles.gaugeLabels}>
        {['10', '18.5', '25', '30', '40'].map(l => (
          <Text key={l} style={styles.gaugeLabel}>{l}</Text>
        ))}
      </View>
      {/* Result */}
      <View style={styles.bmiResult}>
        <Text style={[styles.bmiNumber, { color: cat.color }]}>{bmi.toFixed(1)}</Text>
        <View style={[styles.bmiCatBadge, { backgroundColor: cat.color + '25' }]}>
          <Text style={[styles.bmiCatText, { color: cat.color }]}>{cat.label}</Text>
        </View>
      </View>
    </View>
  );
};

// ─── STAT ROW ─────────────────────────────────────────────────────────────────
const StatRow = ({ icon, label, value, color }) => (
  <View style={styles.statRow}>
    <View style={[styles.statIcon, { backgroundColor: (color || COLORS.accent) + '20' }]}>
      <Ionicons name={icon} size={16} color={color || COLORS.accent} />
    </View>
    <Text style={styles.statRowLabel}>{label}</Text>
    <Text style={styles.statRowValue}>{value}</Text>
  </View>
);

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const [heightInput, setHeightInput] = useState(String(USER.heightCm));
  const [weightInput, setWeightInput] = useState(String(USER.weightKg));
  const [calcHeight, setCalcHeight] = useState(USER.heightCm);
  const [calcWeight, setCalcWeight] = useState(USER.weightKg);

  const bmi = calcBMI(calcWeight, calcHeight);
  const cat = getBMICategory(bmi);

  const handleRecalc = () => {
    const h = parseFloat(heightInput);
    const w = parseFloat(weightInput);
    if (h > 50 && h < 300 && w > 20 && w < 500) {
      setCalcHeight(h);
      setCalcWeight(w);
    }
  };

  const completedWorkouts = WORKOUT_LOG.filter(w => w.completed).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ── HERO ── */}
        <View style={styles.hero}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{USER.avatarInitials}</Text>
          </View>
          <Text style={styles.heroName}>{USER.name}</Text>
          <View style={styles.heroBadgesRow}>
            <View style={styles.heroBadge}>
              <Ionicons name="star" size={12} color={COLORS.warning} />
              <Text style={styles.heroBadgeText}>{USER.level}</Text>
            </View>
            <View style={styles.heroBadge}>
              <Ionicons name="trophy" size={12} color={COLORS.accentLight} />
              <Text style={styles.heroBadgeText}>{USER.goal}</Text>
            </View>
          </View>
          <Text style={styles.heroJoined}>Member since {USER.joinDate}</Text>
        </View>

        {/* ── ACTIVITY STATS ── */}
        <View style={styles.section}>
          <View style={styles.activityGrid}>
            <View style={styles.activityCell}>
              <Text style={[styles.activityValue, { color: COLORS.warning }]}>{USER.streak}</Text>
              <Text style={styles.activityLabel}>Day Streak 🔥</Text>
            </View>
            <View style={styles.activityDivider} />
            <View style={styles.activityCell}>
              <Text style={[styles.activityValue, { color: COLORS.accent }]}>{USER.totalWorkouts}</Text>
              <Text style={styles.activityLabel}>Total Sessions</Text>
            </View>
            <View style={styles.activityDivider} />
            <View style={styles.activityCell}>
              <Text style={[styles.activityValue, { color: COLORS.success }]}>{completedWorkouts}</Text>
              <Text style={styles.activityLabel}>Completed</Text>
            </View>
          </View>
        </View>

        {/* ── BODY METRICS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Body Metrics</Text>
          <View style={styles.card}>
            <StatRow icon="person" label="Age" value={`${USER.age} yrs`} color={COLORS.accentLight} />
            <View style={styles.divider} />
            <StatRow icon="resize" label="Height" value={`${USER.heightCm} cm`} color={COLORS.success} />
            <View style={styles.divider} />
            <StatRow icon="scale" label="Weight" value={`${USER.weightKg} kg`} color={COLORS.warning} />
            <View style={styles.divider} />
            <StatRow icon="fitness" label="Level" value={USER.level} color={COLORS.accentLight} />
          </View>
        </View>

        {/* ── BMI CALCULATOR ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BMI Calculator</Text>
          <View style={styles.card}>
            {/* Inputs */}
            <View style={styles.bmiInputsRow}>
              <View style={styles.bmiInputGroup}>
                <Text style={styles.bmiInputLabel}>Height (cm)</Text>
                <TextInput
                  style={styles.bmiInput}
                  value={heightInput}
                  onChangeText={setHeightInput}
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.textFaint}
                />
              </View>
              <View style={styles.bmiInputGroup}>
                <Text style={styles.bmiInputLabel}>Weight (kg)</Text>
                <TextInput
                  style={styles.bmiInput}
                  value={weightInput}
                  onChangeText={setWeightInput}
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.textFaint}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={handleRecalc} activeOpacity={0.85}>
              <Ionicons name="calculator" size={15} color="#fff" />
              <Text style={styles.calcBtnText}>Calculate BMI</Text>
            </TouchableOpacity>

            {/* Gauge */}
            <BMIGauge bmi={bmi} />

            {/* Tip */}
            <View style={[styles.bmiTip, { borderColor: cat.color + '50', backgroundColor: cat.color + '12' }]}>
              <Ionicons name="information-circle" size={16} color={cat.color} />
              <Text style={[styles.bmiTipText, { color: cat.color }]}>
                {cat.label === 'Normal'
                  ? 'Great — your BMI is within the healthy range. Keep it up!'
                  : cat.label === 'Underweight'
                  ? 'Consider increasing caloric intake and strength training to build mass.'
                  : cat.label === 'Overweight'
                  ? 'A mix of resistance training and a modest calorie deficit can help.'
                  : 'Consult a healthcare professional for a personalised plan.'}
              </Text>
            </View>

            {/* BMI Range Table */}
            <Text style={styles.rangeTitle}>BMI Reference Ranges</Text>
            {[
              { range: '< 18.5', label: 'Underweight', color: COLORS.warning },
              { range: '18.5 – 24.9', label: 'Normal weight', color: COLORS.success },
              { range: '25 – 29.9', label: 'Overweight', color: COLORS.warning },
              { range: '≥ 30', label: 'Obese', color: COLORS.danger },
            ].map(r => (
              <View key={r.range} style={styles.rangeRow}>
                <View style={[styles.rangeDot, { backgroundColor: r.color }]} />
                <Text style={styles.rangeRange}>{r.range}</Text>
                <Text style={[styles.rangeLabel, { color: r.color }]}>{r.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── SETTINGS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.card}>
            {[
              { icon: 'notifications-outline', label: 'Notifications', color: COLORS.accentLight },
              { icon: 'moon-outline', label: 'Dark Mode', color: COLORS.textMuted },
              { icon: 'share-outline', label: 'Share Progress', color: COLORS.success },
              { icon: 'log-out-outline', label: 'Log Out', color: COLORS.danger },
            ].map((item, i, arr) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
                  <View style={[styles.settingIcon, { backgroundColor: item.color + '20' }]}>
                    <Ionicons name={item.icon} size={16} color={item.color} />
                  </View>
                  <Text style={[styles.settingLabel, item.label === 'Log Out' && { color: COLORS.danger }]}>
                    {item.label}
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color={COLORS.textFaint} />
                </TouchableOpacity>
                {i < arr.length - 1 && <View style={styles.divider} />}
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

  // Hero
  hero: { alignItems: 'center', paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 },
  avatarLarge: {
    width: 84, height: 84, borderRadius: 42,
    backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center',
    marginBottom: 14, borderWidth: 3, borderColor: COLORS.accentLight + '50',
  },
  avatarLargeText: { color: '#fff', fontSize: 30, fontWeight: '800' },
  heroName: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  heroBadgesRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  heroBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: COLORS.surface, borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  heroBadgeText: { fontSize: 12, color: COLORS.text, fontWeight: '600' },
  heroJoined: { fontSize: 12, color: COLORS.textMuted },

  // Activity
  activityGrid: {
    flexDirection: 'row', backgroundColor: COLORS.surface,
    borderRadius: 18, padding: 18, marginHorizontal: 16,
  },
  activityCell: { flex: 1, alignItems: 'center' },
  activityDivider: { width: 1, backgroundColor: COLORS.border, marginHorizontal: 8 },
  activityValue: { fontSize: 26, fontWeight: '900' },
  activityLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600', marginTop: 2, textAlign: 'center' },

  // Section
  section: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  card: { backgroundColor: COLORS.surface, borderRadius: 18, padding: 16 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },

  // Stat Row
  statRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statIcon: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  statRowLabel: { flex: 1, fontSize: 14, color: COLORS.textMuted },
  statRowValue: { fontSize: 14, fontWeight: '700', color: COLORS.text },

  // BMI Inputs
  bmiInputsRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  bmiInputGroup: { flex: 1 },
  bmiInputLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase' },
  bmiInput: {
    backgroundColor: COLORS.card, borderRadius: 10, padding: 12,
    color: COLORS.text, fontSize: 16, fontWeight: '700',
    borderWidth: 1, borderColor: COLORS.border,
  },
  calcBtn: {
    backgroundColor: COLORS.accent, borderRadius: 12, padding: 13,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginBottom: 20,
  },
  calcBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // BMI Gauge
  gaugeWrap: { marginBottom: 16 },
  gaugeTrack: {
    flexDirection: 'row', height: 10, borderRadius: 5, overflow: 'hidden',
    marginBottom: 4, gap: 2,
  },
  gaugeSegment: { borderRadius: 5 },
  needle: {
    position: 'absolute',
    top: -4, width: 4, height: 18,
    backgroundColor: COLORS.text, borderRadius: 2,
    marginLeft: -2,
  },
  gaugeLabels: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 6,
  },
  gaugeLabel: { fontSize: 9, color: COLORS.textFaint },
  bmiResult: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
  bmiNumber: { fontSize: 40, fontWeight: '900' },
  bmiCatBadge: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  bmiCatText: { fontSize: 15, fontWeight: '800' },

  // BMI Tip
  bmiTip: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 18,
  },
  bmiTipText: { flex: 1, fontSize: 13, lineHeight: 19 },

  // Range Table
  rangeTitle: {
    fontSize: 11, color: COLORS.textFaint, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8,
  },
  rangeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  rangeDot: { width: 8, height: 8, borderRadius: 4 },
  rangeRange: { fontSize: 13, color: COLORS.textMuted, width: 90 },
  rangeLabel: { fontSize: 13, fontWeight: '700' },

  // Settings
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  settingIcon: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  settingLabel: { flex: 1, fontSize: 14, color: COLORS.text },
});
