// ─── THEME ──────────────────────────────────────────────────────────────────
export const COLORS = {
  bg: '#0F172A',
  surface: '#1E293B',
  card: '#263347',
  accent: '#6366F1',
  accentLight: '#818CF8',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  text: '#F1F5F9',
  textMuted: '#94A3B8',
  textFaint: '#475569',
  border: '#334155',
};

// ─── USER PROFILE ────────────────────────────────────────────────────────────
export const USER = {
  name: 'K V Srinidhi',
  age: 27,
  heightCm: 178,
  weightKg: 78,
  goal: 'Build Muscle',
  level: 'Intermediate',
  joinDate: 'Jan 2024',
  streak: 12,
  totalWorkouts: 84,
  avatarInitials: 'AR',
};

// ─── EXERCISES ───────────────────────────────────────────────────────────────
export const EXERCISES = [
  {
    id: 'e1',
    name: 'Barbell Back Squat',
    muscleGroup: 'Legs',
    secondaryMuscles: ['Glutes', 'Core'],
    difficulty: 'Advanced',
    type: 'Compound',
    equipment: 'Barbell',
    description:
      'The king of lower-body movements. Builds quad, hamstring and glute mass while demanding serious core stability.',
    imageUri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    emoji: '🏋️',
    tips: ['Keep chest up', 'Drive knees out', 'Break parallel for full ROM'],
  },
  {
    id: 'e2',
    name: 'Bench Press',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Front Delts'],
    difficulty: 'Intermediate',
    type: 'Compound',
    equipment: 'Barbell',
    description:
      'A classic horizontal push that develops upper-body pushing strength across the chest, shoulders, and triceps.',
    imageUri: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
    emoji: '💪',
    tips: ['Retract scapula', 'Arch slightly', 'Touch chest lightly'],
  },
  {
    id: 'e3',
    name: 'Deadlift',
    muscleGroup: 'Back',
    secondaryMuscles: ['Hamstrings', 'Glutes', 'Core'],
    difficulty: 'Advanced',
    type: 'Compound',
    equipment: 'Barbell',
    description:
      'The ultimate full-body strength test. Targets the entire posterior chain from traps to calves.',
    imageUri: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80',
    emoji: '🔥',
    tips: ['Bar over mid-foot', 'Hinge at hips first', 'Lock out at top'],
  },
  {
    id: 'e4',
    name: 'Pull-Up',
    muscleGroup: 'Back',
    secondaryMuscles: ['Biceps', 'Rear Delts'],
    difficulty: 'Intermediate',
    type: 'Compound',
    equipment: 'Pull-Up Bar',
    description:
      'A bodyweight staple for developing lat width and vertical pulling strength.',
    imageUri: 'https://images.unsplash.com/photo-1611352709521-b6888eded96e?w=400&q=80',
    emoji: '⬆️',
    tips: ['Full dead hang start', 'Drive elbows down', 'Chin over bar'],
  },
  {
    id: 'e5',
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Upper Chest'],
    difficulty: 'Intermediate',
    type: 'Compound',
    equipment: 'Barbell',
    description:
      'The foundational vertical push. Builds overhead strength and shoulder mass.',
    imageUri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
    emoji: '🙌',
    tips: ['Brace core hard', 'Squeeze glutes', 'Press in a slight arc'],
  },
  {
    id: 'e6',
    name: 'Romanian Deadlift',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: ['Glutes', 'Lower Back'],
    difficulty: 'Intermediate',
    type: 'Compound',
    equipment: 'Barbell',
    description:
      'A hip-hinge movement with a massive stretch on the hamstrings and strong glute activation.',
    imageUri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80',
    emoji: '📐',
    tips: ['Soft knee bend', 'Push hips back', 'Feel the stretch'],
  },
  {
    id: 'e7',
    name: 'Dumbbell Curl',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Forearms'],
    difficulty: 'Beginner',
    type: 'Isolation',
    equipment: 'Dumbbells',
    description:
      'The classic arm builder. Targets the biceps brachii with direct, concentrated load.',
    imageUri: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80',
    emoji: '💪',
    tips: ['Supinate at top', 'No swinging', 'Full extension at bottom'],
  },
  {
    id: 'e8',
    name: 'Cable Tricep Pushdown',
    muscleGroup: 'Triceps',
    secondaryMuscles: [],
    difficulty: 'Beginner',
    type: 'Isolation',
    equipment: 'Cable Machine',
    description:
      'Isolates the triceps through the full range of elbow extension. Great for arm definition.',
    imageUri: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=80',
    emoji: '↓',
    tips: ['Keep elbows tucked', 'Extend fully', 'Control the negative'],
  },
  {
    id: 'e9',
    name: 'Plank',
    muscleGroup: 'Core',
    secondaryMuscles: ['Shoulders', 'Glutes'],
    difficulty: 'Beginner',
    type: 'Isometric',
    equipment: 'None',
    description:
      'An isometric core staple. Builds anti-extension strength and spinal stability.',
    imageUri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80',
    emoji: '🧘',
    tips: ['Neutral spine', 'Squeeze everything', 'Breathe steadily'],
  },
  {
    id: 'e10',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Front Delts', 'Triceps'],
    difficulty: 'Intermediate',
    type: 'Compound',
    equipment: 'Dumbbells',
    description:
      'Targets the upper pec fibres for a full, rounded chest appearance.',
    imageUri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    emoji: '📈',
    tips: ['30-45° incline', 'Touch upper chest', 'Slow descent'],
  },
];

// ─── MUSCLE GROUP FILTERS ─────────────────────────────────────────────────────
export const MUSCLE_GROUPS = [
  'All', 'Chest', 'Back', 'Legs', 'Shoulders',
  'Biceps', 'Triceps', 'Hamstrings', 'Core',
];

// ─── WORKOUT LOG ──────────────────────────────────────────────────────────────
export const WORKOUT_LOG = [
  {
    id: 'w1',
    name: 'Push Day A',
    date: 'Today, Jun 28',
    duration: '52 min',
    volume: '8,240 kg',
    completed: false,
    exercises: [
      { exerciseId: 'e2', sets: [{ reps: 8, weight: 80 }, { reps: 8, weight: 82.5 }, { reps: 6, weight: 85 }, { reps: 5, weight: 85 }] },
      { exerciseId: 'e5', sets: [{ reps: 6, weight: 60 }, { reps: 6, weight: 62.5 }, { reps: 5, weight: 65 }] },
      { exerciseId: 'e10', sets: [{ reps: 10, weight: 30 }, { reps: 10, weight: 30 }, { reps: 9, weight: 30 }] },
      { exerciseId: 'e8', sets: [{ reps: 12, weight: 20 }, { reps: 12, weight: 20 }, { reps: 12, weight: 20 }] },
    ],
  },
  {
    id: 'w2',
    name: 'Pull Day A',
    date: 'Yesterday, Jun 27',
    duration: '48 min',
    volume: '6,150 kg',
    completed: true,
    exercises: [
      { exerciseId: 'e3', sets: [{ reps: 5, weight: 120 }, { reps: 5, weight: 125 }, { reps: 4, weight: 130 }] },
      { exerciseId: 'e4', sets: [{ reps: 8, weight: 0 }, { reps: 7, weight: 0 }, { reps: 6, weight: 5 }] },
      { exerciseId: 'e7', sets: [{ reps: 12, weight: 16 }, { reps: 12, weight: 16 }, { reps: 10, weight: 18 }] },
    ],
  },
  {
    id: 'w3',
    name: 'Leg Day',
    date: 'Jun 25',
    duration: '61 min',
    volume: '12,800 kg',
    completed: true,
    exercises: [
      { exerciseId: 'e1', sets: [{ reps: 5, weight: 100 }, { reps: 5, weight: 105 }, { reps: 5, weight: 105 }, { reps: 4, weight: 110 }] },
      { exerciseId: 'e6', sets: [{ reps: 10, weight: 60 }, { reps: 10, weight: 62.5 }, { reps: 8, weight: 65 }] },
      { exerciseId: 'e9', sets: [{ reps: 1, weight: 0 }, { reps: 1, weight: 0 }, { reps: 1, weight: 0 }] },
    ],
  },
  {
    id: 'w4',
    name: 'Upper Body Hypertrophy',
    date: 'Jun 23',
    duration: '55 min',
    volume: '7,600 kg',
    completed: true,
    exercises: [
      { exerciseId: 'e2', sets: [{ reps: 10, weight: 75 }, { reps: 10, weight: 77.5 }, { reps: 8, weight: 80 }] },
      { exerciseId: 'e4', sets: [{ reps: 10, weight: 0 }, { reps: 9, weight: 0 }, { reps: 8, weight: 5 }] },
      { exerciseId: 'e5', sets: [{ reps: 8, weight: 55 }, { reps: 8, weight: 57.5 }, { reps: 7, weight: 60 }] },
    ],
  },
];

// ─── WEEKLY STATS ─────────────────────────────────────────────────────────────
export const WEEKLY_STATS = [
  { day: 'M', trained: true, volume: 8200 },
  { day: 'T', trained: true, volume: 6100 },
  { day: 'W', trained: false, volume: 0 },
  { day: 'T', trained: true, volume: 12800 },
  { day: 'F', trained: false, volume: 0 },
  { day: 'S', trained: true, volume: 7600 },
  { day: 'S', trained: false, volume: 0 },
];
