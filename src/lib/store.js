import { create } from 'zustand'

const defaultMaya = {
  patientName: 'Maya Patel',
  patientAge: 34,
  patientSex: 'Female',
  patientHeight: "5'4\"",
  startingWeight: 198,
  currentWeight: 196.4,
  bmi: 34.0,
  medication: 'Tirzepatide 2.5 mg pen',
  deliveryMode: 'single_dose_pen',
  currentWeek: 2,
  currentDoseMg: 2.5,
  proposedDoseMg: 5.0,
  symptoms: { nausea: 1, reflux: 0, dizziness: 0, constipation: 0 },
  weeklyPlan: [
    { week: 1, doseMg: 2.5, status: 'completed' },
    { week: 2, doseMg: 2.5, status: 'hold — mild nausea' },
    { week: 3, doseMg: 5.0, status: 'pending approval' },
    { week: 4, doseMg: 5.0, status: 'planned if tolerated' },
  ],
  weightLog: [
    { label: 'Start', weight: 198.0 },
    { label: 'Day 4', weight: 197.3 },
    { label: 'Day 7', weight: 196.8 },
    { label: 'Day 14', weight: 196.4 },
  ],
  intakeCompleted: true,
  planApproved: true,
  injectionCompleted: true,
  checkInCompleted: true,
  week3Approved: false,
}

const defaultCasey = {
  patientName: 'Casey Rodriguez',
  patientAge: 75,
  patientSex: 'Female',
  patientHeight: "5'3\"",
  startingWeight: 215,
  currentWeight: 215,
  bmi: 38.2,
  medication: 'Tirzepatide 2.5 mg pen',
  deliveryMode: 'single_dose_pen',
  currentWeek: 0,
  currentDoseMg: 0,
  proposedDoseMg: 2.5,
  symptoms: { nausea: 0, reflux: 0, dizziness: 0, constipation: 0 },
  intakeCompleted: true,
  planApproved: false,
  injectionCompleted: false,
  checkInCompleted: false,
  caseyApproved: false,
}

export const useStore = create((set) => ({
  // Alex
  patientName: 'Alex Rivera',
  patientDOB: '',
  patientAge: 38,
  patientSex: 'Female',
  patientHeight: "5'5\"",
  startingWeight: 212,
  currentWeight: 209.8,
  bmi: 35.3,
  medication: 'Tirzepatide',
  vialConcentration: '10 mg/mL',
  deliveryMode: 'vial',
  currentWeek: 1,
  currentDoseMg: 2.5,
  proposedDoseMg: 3.0,
  currentUnits: 25,
  proposedUnits: 30,
  symptoms: { nausea: 0, reflux: 0, dizziness: 0, constipation: 0 },
  riskFlags: {
    hungryGut: true,
    largeMealCapacity: false,
    emotionalEating: true,
    refluxHistory: true,
    orthostatic: false,
    chairStandRisk: false,
    slowBurn: false,
  },
  weeklyPlan: [
    { week: 1, doseMg: 2.5, units: 25, status: 'completed' },
    { week: 2, doseMg: 3.0, units: 30, status: 'pending approval' },
    { week: 3, doseMg: 3.5, units: 35, status: 'planned if tolerated' },
    { week: 4, doseMg: 4.0, units: 40, status: 'planned if tolerated' },
  ],
  weightLog: [
    { label: 'Start', weight: 212.0 },
    { label: 'Day 3',  weight: 211.2 },
    { label: 'Day 5',  weight: 210.5 },
    { label: 'Day 7',  weight: 209.8 },
  ],
  intakeCompleted: false,
  planApproved: false,
  injectionCompleted: false,
  checkInCompleted: false,
  week2Approved: false,
  toastMessage: null,

  intakeOutputs: {
    velocity: 'slow',
    velocityReason: 'Early hunger return + moderate GI sensitivity + constipation baseline',
    safetyFlags: [
      { id: 'mtc', label: 'MTC / MEN2', answer: 'No', status: 'clear', action: 'Continue' },
      { id: 'pregnancy', label: 'Pregnancy / planning', answer: 'No', status: 'clear', action: 'Continue' },
      { id: 'gi', label: 'Gallbladder history', answer: 'Yes — gallstones removed 2019', status: 'caution', action: 'Counsel on abdominal pain red flags before escalating' },
      { id: 'oc', label: 'Oral contraceptive', answer: 'Yes — active', status: 'caution', action: 'Counsel on non-oral or barrier backup for 4 wks after initiation and each dose change' },
      { id: 'insulin', label: 'Insulin / sulfonylurea', answer: 'No', status: 'clear', action: 'Continue' },
    ],
    phenotypeSignals: [
      { id: 'hungry-gut', label: 'Early hunger return', detail: 'Hungry within 1–2h after meals — strong GLP-1 response signal', strength: 'strong' },
      { id: 'food-noise', label: 'Food noise', detail: 'Frequent cravings; hard to stop thinking about food', strength: 'strong' },
      { id: 'emotional-eating', label: 'Emotional eating', detail: 'Stress/boredom often triggers eating even when not hungry', strength: 'moderate' },
      { id: 'meal-capacity', label: 'Large meal capacity', detail: 'Can eat larger portions than most people before feeling full', strength: 'mild' },
    ],
    giRisks: [
      { label: 'Reflux / heartburn', level: 'moderate', reason: 'Weekly heartburn before starting medication' },
      { label: 'Constipation', level: 'high', reason: 'Frequent constipation baseline — fewer than 3×/week common' },
      { label: 'Nausea sensitivity', level: 'moderate', reason: 'Motion sickness and anesthesia nausea history' },
    ],
    hydrationRisk: 'moderate',
    dizzinessFlag: true,
    muscleRisk: 'low',
    moodBaseline: 'clear',
    deliveryConfidence: 'moderate',
    watchItems: [
      'Constipation — monitor before and after first injection; fiber + fluid guidance pre-start',
      'Reflux — pre-dose meal timing, avoid large meals within 2h of injection',
      'Hydration / dizziness — fluid intake target, stand-up slowly reminders',
      'Oral contraceptive — backup contraception counseling required',
      'Nausea — proactive counseling, meal-size guidance on injection day',
    ],
    doseReadiness: 'PAUSE',
    autonomicWearableReady: false,
    behavioralVulnerabilityWindow: 'uniform',
    hedonicToneBaseline: 'intact',
    mitochondrialFatigueRisk: 'low',
    criticalTmaxShiftRisk: 'low',
    uricAcidFlareRisk: 'low',
    nocturnalStasisRisk: 'low',
    sensoryAversionRisk: 'low',
    computedVelocity: 0.70,
    flags: [],
    doctorNotes: [],
  },

  // Multi-patient
  activePatient: 'alex',
  maya: defaultMaya,
  casey: defaultCasey,

  // Alex actions
  completeIntake: () => set({ intakeCompleted: true }),
  setPatientInfo: (name, dob) => set({ patientName: name, patientDOB: dob }),
  approvePlan: () => set({ planApproved: true }),
  completeInjection: () => set({ injectionCompleted: true }),
  completeCheckIn: (symptoms) => set({ checkInCompleted: true, symptoms }),
  logWeight: (weight) =>
    set((state) => {
      const dayNum = state.weightLog.length
      const label = `Day ${dayNum * 2}`
      return {
        currentWeight: weight,
        weightLog: [...state.weightLog, { label, weight }],
      }
    }),
  approveWeek2: () =>
    set((state) => ({
      week2Approved: true,
      currentWeek: 2,
      currentDoseMg: 3.0,
      currentUnits: 30,
      weeklyPlan: state.weeklyPlan.map((item) =>
        item.week === 2 ? { ...item, status: 'approved' } : item
      ),
    })),

  // Maya actions
  approveMayaWeek3: () =>
    set((state) => ({
      maya: {
        ...state.maya,
        week3Approved: true,
        currentWeek: 3,
        currentDoseMg: 5.0,
        weeklyPlan: state.maya.weeklyPlan.map((item) =>
          item.week === 3 ? { ...item, status: 'approved' } : item
        ),
      },
    })),
  completeMayaInjection: () =>
    set((state) => ({ maya: { ...state.maya, injectionCompleted: true } })),
  completeMayaCheckIn: (symptoms) =>
    set((state) => ({ maya: { ...state.maya, checkInCompleted: true, symptoms } })),
  logMayaWeight: (weight) =>
    set((state) => {
      const dayNum = state.maya.weightLog.length
      const label = `Day ${dayNum * 4}`
      return {
        maya: {
          ...state.maya,
          currentWeight: weight,
          weightLog: [...state.maya.weightLog, { label, weight }],
        },
      }
    }),

  // Casey actions
  approveCasey: () =>
    set((state) => ({
      casey: { ...state.casey, caseyApproved: true, planApproved: true, currentDoseMg: 2.5, currentWeek: 1 },
    })),
  rejectCasey: () =>
    set((state) => ({
      casey: { ...state.casey, caseyApproved: false, planApproved: false },
    })),

  // Shared
  setActivePatient: (patient) => set({ activePatient: patient }),
  showToast: (message) => set({ toastMessage: message }),
  clearToast: () => set({ toastMessage: null }),
  setIntakeOutputs: (outputs) => set({ intakeOutputs: outputs }),
  setDemoStage: (stage) => {
    switch (stage) {
      case 'fresh':
        set({
          intakeCompleted: false,
          planApproved: false,
          injectionCompleted: false,
          checkInCompleted: false,
          week2Approved: false,
          currentWeek: 1,
          currentDoseMg: 2.5,
          currentUnits: 25,
          symptoms: { nausea: 0, reflux: 0, dizziness: 0, constipation: 0 },
        })
        break
      case 'intake-done':
        set({ intakeCompleted: true, planApproved: false })
        break
      case 'plan-approved':
        set({ intakeCompleted: true, planApproved: true })
        break
      case 'injection-done':
        set({ intakeCompleted: true, planApproved: true, injectionCompleted: true })
        break
      case 'checkin-done':
        set({
          intakeCompleted: true,
          planApproved: true,
          injectionCompleted: true,
          checkInCompleted: true,
          symptoms: { nausea: 1, reflux: 0, dizziness: 0, constipation: 0 },
        })
        break
      case 'week2-approved':
        set({
          intakeCompleted: true,
          planApproved: true,
          injectionCompleted: true,
          checkInCompleted: true,
          week2Approved: true,
          currentWeek: 2,
          currentDoseMg: 3.0,
          currentUnits: 30,
          symptoms: { nausea: 1, reflux: 0, dizziness: 0, constipation: 0 },
        })
        break
    }
  },
}))
