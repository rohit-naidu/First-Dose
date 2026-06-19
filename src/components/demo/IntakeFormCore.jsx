'use client'
import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import {
  ArrowLeft, ShieldCheck, AlertCircle, AlertTriangle, XCircle,
  Clock, Zap, Flame, Coffee, Smile, Meh, Frown, CloudRain,
  Droplets, Wind, Activity, PersonStanding, Dumbbell, HelpCircle,
  Star, CheckCircle2, ThumbsDown, Ban,
  TrendingUp, CheckCircle, ChevronRight,
  Shield, Heart, Syringe, Pill, Eye, Timer,
} from 'lucide-react'
import rawQuestions from '@/lib/glp-intake-questions.json'

// ── theme palette (dark glass variants) ───────────────────────────────────────
const T = {
  green:  { bg: 'rgba(127,181,201,0.06)', icon: '#7fb5c9', border: 'rgba(127,181,201,0.25)', selected: 'rgba(127,181,201,0.14)' },
  teal:   { bg: 'rgba(127,181,201,0.06)', icon: '#7fb5c9', border: 'rgba(127,181,201,0.25)', selected: 'rgba(127,181,201,0.14)' },
  yellow: { bg: 'rgba(201,184,150,0.06)', icon: '#c9b896', border: 'rgba(201,184,150,0.25)', selected: 'rgba(201,184,150,0.14)' },
  orange: { bg: 'rgba(201,184,150,0.08)', icon: '#c9b896', border: 'rgba(201,184,150,0.3)',  selected: 'rgba(201,184,150,0.16)' },
  red:    { bg: 'rgba(201,127,127,0.06)', icon: '#c97f7f', border: 'rgba(201,127,127,0.25)', selected: 'rgba(201,127,127,0.14)' },
  indigo: { bg: 'rgba(169,156,196,0.06)', icon: '#a99cc4', border: 'rgba(169,156,196,0.25)', selected: 'rgba(169,156,196,0.14)' },
  blue:   { bg: 'rgba(127,181,201,0.06)', icon: '#7fb5c9', border: 'rgba(127,181,201,0.25)', selected: 'rgba(127,181,201,0.14)' },
  purple: { bg: 'rgba(169,156,196,0.06)', icon: '#a99cc4', border: 'rgba(169,156,196,0.25)', selected: 'rgba(169,156,196,0.14)' },
  pink:   { bg: 'rgba(201,127,127,0.06)', icon: '#c97f7f', border: 'rgba(201,127,127,0.25)', selected: 'rgba(201,127,127,0.14)' },
}

// ── Phase color map ───────────────────────────────────────────────────────────
const phaseColorMap = {
  mandatory_safety_biological: '#c97f7f',
  female_specific_safety: '#c97f7f',
  female_specific_hormonal_context: '#c97f7f',
  female_specific_medication_absorption: '#c97f7f',
  mandatory_medication_safety: '#c97f7f',
  mandatory_delivery_mode: '#7fb5c9',
  delivery_support: '#7fb5c9',
  motility_and_efficacy: '#7fb5c9',
  efficacy_profile: '#7fb5c9',
  reward_and_medication_fit: '#a99cc4',
  gi_brake_discovery: '#c9b896',
  emetic_risk: '#c9b896',
  hydration_autonomic: '#7fb5c9',
  structural_risk_trigger: '#c9b896',
  structural_risk_assessment: '#c9b896',
  mood_reward_baseline: '#a99cc4',
  prior_experience: '#7fb5c9',
  prior_experience_detail: '#7fb5c9',
  medication_fit: '#a99cc4',
}

// ── Icon picker ───────────────────────────────────────────────────────────────
function pickIcon(optionText, phase) {
  const t = optionText.toLowerCase()
  // Safety phase icons
  const safetyPhases = ['mandatory_safety_biological', 'female_specific_safety', 'mandatory_medication_safety']
  if (safetyPhases.includes(phase)) {
    if (t.includes('no') && t.length < 10) return ShieldCheck
    if (t.includes('none')) return ShieldCheck
    if (t.includes('yes')) return AlertTriangle
    if (t.includes('not sure')) return HelpCircle
    if (t.includes('pancreatitis')) return XCircle
    if (t.includes('gastroparesis')) return Wind
    if (t.includes('gallstone') || t.includes('gallbladder')) return AlertCircle
    if (t.includes('pregnant') || t.includes('breastfeed') || t.includes('trying')) return AlertTriangle
    return Shield
  }
  // GI / nausea
  if (phase === 'emetic_risk' || phase === 'gi_brake_discovery') {
    if (t.includes('no') && t.length < 10) return ShieldCheck
    if (t.includes('rarely')) return ShieldCheck
    if (t.includes('mildly') || t.includes('sometimes') || t.includes('weekly')) return AlertCircle
    if (t.includes('very prone') || t.includes('often') || t.includes('severe') || t.includes('most days')) return Wind
    if (t.includes('extremely')) return Flame
    if (t.includes('normal')) return CheckCircle
    if (t.includes('not very')) return CheckCircle
    return Wind
  }
  // Mood / reward
  if (phase === 'mood_reward_baseline' || phase === 'reward_and_medication_fit') {
    if (t.includes('not at all') || t.includes('rarely')) return Smile
    if (t.includes('several days') || t.includes('sometimes')) return Meh
    if (t.includes('half') || t.includes('often')) return Frown
    if (t.includes('nearly every') || t.includes('weekend') || t.includes('mid-week')) return CloudRain
    if (t.includes('evening')) return Meh
    return Heart
  }
  // Hydration / autonomic
  if (phase === 'hydration_autonomic') {
    if (t.includes('no') && t.length < 10) return ShieldCheck
    if (t.includes('sometimes')) return AlertCircle
    if (t.includes('often')) return Wind
    if (t.includes('yes')) return CheckCircle2
    if (t.includes('more than')) return Droplets
    if (t.includes('1–2')) return Droplets
    if (t.includes('less than')) return AlertTriangle
    return Activity
  }
  // Structural / activity
  if (phase === 'structural_risk_trigger' || phase === 'structural_risk_assessment') {
    if (t.includes('regular exercise') || t.includes('3+')) return Dumbbell
    if (t.includes('moderate') || t.includes('2')) return Activity
    if (t.includes('light walking') || t.includes('1')) return PersonStanding
    if (t.includes('sedentary') || t.includes('0')) return Meh
    if (t.includes('easily')) return PersonStanding
    if (t.includes('difficult')) return Activity
    if (t === 'no') return Dumbbell
    if (t.includes('yes')) return CheckCircle
    if (t.includes('prone to heavy')) return CloudRain
    if (t.includes('normal')) return Smile
    if (t.includes('highly energetic')) return Zap
    if (t.includes('gout') || t.includes('joint') || t.includes('kidney')) return AlertTriangle
    return CheckCircle
  }
  // Delivery
  if (phase === 'mandatory_delivery_mode' || phase === 'delivery_support') {
    if (t.includes('pen') || t.includes('prefilled')) return Syringe
    if (t.includes('vial') || t.includes('syringe')) return Syringe
    if (t.includes('oral') || t.includes('tablet')) return Pill
    if (t.includes('confident') || t.includes('very confident')) return CheckCircle
    if (t.includes('somewhat')) return AlertCircle
    if (t.includes('nervous')) return AlertTriangle
    if (t.includes('need help') || t.includes('i need')) return HelpCircle
    if (t.includes('not sure') || t.includes('i am not')) return HelpCircle
    return ShieldCheck
  }
  // Female-specific
  if (phase && phase.startsWith('female_specific')) {
    if (t.includes('no') && t.length < 10) return ShieldCheck
    if (t.includes('yes')) return AlertCircle
    if (t.includes('not sure') || t.includes('not applicable')) return HelpCircle
    if (t.includes('regularly')) return CheckCircle
    if (t.includes('post-menopausal')) return Shield
    if (t.includes('irregular')) return AlertCircle
    return Shield
  }
  // Efficacy / motility
  if (phase === 'motility_and_efficacy' || phase === 'efficacy_profile') {
    if (t.includes('often')) return Clock
    if (t.includes('sometimes')) return Coffee
    if (t.includes('rarely')) return Zap
    return CheckCircle
  }
  // Prior experience
  if (phase === 'prior_experience' || phase === 'prior_experience_detail') {
    if (t === 'no') return Star
    if (t.includes('tolerated')) return CheckCircle2
    if (t.includes('side effects')) return ThumbsDown
    if (t.includes('did not work') || t.includes('didn\'t work')) return Ban
    if (t.includes('cost') || t.includes('access')) return AlertCircle
    if (t.includes('nausea')) return Frown
    if (t.includes('vomit')) return Wind
    if (t.includes('reflux')) return AlertTriangle
    if (t.includes('constipation')) return AlertCircle
    if (t.includes('dizziness')) return Droplets
    if (t.includes('fatigue')) return Smile
    if (t.includes('mood')) return CloudRain
    if (t.includes('other')) return HelpCircle
    return CheckCircle
  }
  // Medication fit
  if (phase === 'medication_fit') {
    if (t.includes('very important')) return Star
    if (t.includes('somewhat')) return Meh
    if (t.includes('not')) return CheckCircle
    if (t.includes('yes')) return CheckCircle2
    return CheckCircle
  }
  // Fallback by text
  if (t.includes('not sure') || t.includes('uncertain')) return HelpCircle
  if (t === 'no' || t.includes('none')) return CheckCircle
  if (t === 'yes') return AlertTriangle
  if (t.includes('n/a') || t.includes('not applicable')) return Ban
  return CheckCircle
}

// ── Theme picker ──────────────────────────────────────────────────────────────
function pickTheme(optionText, phase) {
  const t = optionText.toLowerCase()
  // Clear / safe
  if ((t === 'no' || t === 'none' || t.includes('none of these') || t === 'rarely' || t === 'not at all') && !t.includes('not sure'))
    return T.green
  if (t.includes('clear') || t.includes('easily') || t.includes('very confident') || t.includes('regular exercise') || t === '3+')
    return T.green
  if (t.includes('normal') || t.includes('not very sensitive') || t.includes('highly energetic') || t.includes('intact'))
    return T.green
  // Uncertain
  if (t.includes('not sure') || t.includes('uncertain') || t.includes('i am not sure') || t.includes('not applicable') || t.includes('n/a'))
    return T.indigo
  // Mild / moderate
  if (t.includes('mildly') || t.includes('sometimes') || t.includes('several days') || t.includes('weekly') || t.includes('somewhat'))
    return T.yellow
  if (t.includes('light walking') || t === '1' || t === '2')
    return T.yellow
  // Warning
  if (t.includes('often') || t.includes('very prone') || t.includes('severe') || t.includes('most days'))
    return T.red
  if (t.includes('half') || t.includes('nearly every'))
    return T.red
  if (t.includes('nervous') || t.includes('need help') || t.includes('i need'))
    return T.orange
  // Safety / danger
  const safetyPhases = ['mandatory_safety_biological', 'female_specific_safety', 'mandatory_medication_safety']
  if (safetyPhases.includes(phase)) {
    if (t === 'yes' || t.includes('pancreatitis') || t.includes('gastroparesis') || t.includes('allergy'))
      return T.red
    if (t.includes('pregnant') || t.includes('breastfeed') || t.includes('trying'))
      return T.red
    if (t.includes('gallstone') || t.includes('gallbladder'))
      return T.orange
  }
  if (t === 'yes') return T.orange
  // Delivery
  if (t.includes('prefilled pen') || t.includes('vial') || t.includes('oral tablet'))
    return T.teal
  // Prior experience
  if (t.includes('tolerated')) return T.green
  if (t.includes('side effects') || t.includes('did not work') || t.includes('didn\'t work')) return T.orange
  if (t.includes('cost') || t.includes('access')) return T.red
  // Specific answers
  if (t.includes('sedentary') || t === '0') return T.orange
  if (t.includes('prone to heavy fatigue')) return T.orange
  if (t.includes('gout') || t.includes('joint swelling')) return T.red
  if (t.includes('kidney stones')) return T.orange
  if (t.includes('less than 2 hours') || t.includes('less than 1 liter')) return T.orange
  if (t.includes('2 to 4') || t.includes('1–2 liters')) return T.yellow
  if (t.includes('more than 4') || t.includes('more than 2')) return T.green
  // Female-specific
  if (t.includes('regularly menstruating') || t.includes('post-menopausal') && !t.includes('hrt'))
    return T.teal
  if (t.includes('hrt')) return T.orange
  if (t.includes('irregular')) return T.yellow
  // Weekend/weekday
  if (t.includes('weekend') || t.includes('mid-week') || t.includes('evening'))
    return T.teal
  // Medication fit
  if (t.includes('very important')) return T.orange
  if (t.includes('not important') || t.includes('not a major')) return T.green
  // Intersex
  if (t.includes('intersex') || t.includes('prefer to discuss'))
    return T.indigo
  // Fallback
  return T.teal
}

// ── Exclusive option detection ────────────────────────────────────────────────
function findExclusiveOptions(options) {
  return options.filter(opt => {
    const t = opt.toLowerCase()
    return t === 'no' || t.includes('none') || t.includes('not sure') || t.includes('not applicable')
  })
}

// ── Show-if evaluator ─────────────────────────────────────────────────────────
function buildShowIf(shownIfStr) {
  // Skip questions that reference q_lmp (which we skip)
  if (shownIfStr.includes('q_lmp.valid_date_provided')) return () => false

  // "sex == 'Female'"
  if (shownIfStr === "sex == 'Female'") {
    return (answers) => answers['q_sex'] === 'Female'
  }

  // "sex == 'Female' && q_lmp.valid_date_provided"
  if (shownIfStr.includes("sex == 'Female'") && shownIfStr.includes('q_lmp')) {
    return () => false // skip — q_lmp is skipped
  }

  // "delivery_mode in ['pen', 'vial']"
  if (shownIfStr === "delivery_mode in ['pen', 'vial']") {
    return (answers) => ['Prefilled pen', 'Vial with syringe'].includes(answers['q_delivery_mode'])
  }

  // "delivery_mode == 'pen'"
  if (shownIfStr === "delivery_mode == 'pen'") {
    return (answers) => answers['q_delivery_mode'] === 'Prefilled pen'
  }

  // "delivery_mode == 'vial'"
  if (shownIfStr === "delivery_mode == 'vial'") {
    return (answers) => answers['q_delivery_mode'] === 'Vial with syringe'
  }

  // "delivery_mode == 'oral' || injection_support_need == 'high' || cost_access_barrier == true"
  if (shownIfStr.includes("delivery_mode == 'oral'") && shownIfStr.includes('cost_access_barrier')) {
    return (answers, _scores) => {
      if (answers['q_delivery_mode'] === 'Oral tablet') return true
      if (answers['q_injection_confidence'] === 'I need help') return true
      if (answers['q_prior_glp'] === 'Yes, stopped due to cost/access') return true
      return false
    }
  }

  // "hydration_autonomic_risk in ['moderate', 'high']"
  if (shownIfStr.includes('hydration_autonomic_risk')) {
    return (answers) => {
      const a = answers['q_dizzy_standing']
      return a === 'Sometimes' || a === 'Often'
    }
  }

  // "age >= 65 || q_activity_level == 'Mostly sedentary'"
  if (shownIfStr.includes('age >= 65') && shownIfStr.includes('q_activity_level')) {
    return (answers, _scores, patientAge) => {
      return (patientAge && patientAge >= 65) || answers['q_activity_level'] === 'Mostly sedentary'
    }
  }

  // "age >= 65 || q_activity_level == 'Mostly sedentary' || sarcopenia_risk in ['moderate', 'high']"
  if (shownIfStr.includes('sarcopenia_risk')) {
    return (answers, _scores, patientAge) => {
      if (patientAge && patientAge >= 65) return true
      if (answers['q_activity_level'] === 'Mostly sedentary') return true
      const chair = answers['q_chair_stand']
      if (chair === 'Yes, but difficult' || chair === 'No') return true
      return false
    }
  }

  // "prior_glp_intolerance == true"
  if (shownIfStr === 'prior_glp_intolerance == true') {
    return (answers) => answers['q_prior_glp'] === 'Yes, stopped due to side effects'
  }

  // "prior_glp_cost_access_barrier == true || medication_fit_unknown == true"
  if (shownIfStr.includes('prior_glp_cost_access_barrier') || shownIfStr.includes('medication_fit_unknown')) {
    return (answers) => answers['q_prior_glp'] === 'Yes, stopped due to cost/access'
  }

  // "q_prior_glp starts_with 'Yes'" — skipped (free_text type)
  if (shownIfStr.includes('q_prior_glp starts_with')) {
    return () => false // q_highest_tolerated_dose is free_text, already skipped
  }

  // Default: show the question (better to show too many than miss one)
  return () => true
}

// ── Map JSON question to rendering format ─────────────────────────────────────
function mapJsonQuestion(q) {
  return {
    id: q.id,
    category: q.phase.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    categoryColor: phaseColorMap[q.phase] || '#7fb5c9',
    shortQ: q.patient_text,
    sub: q.phase === 'mandatory_safety_biological'
      ? 'Safety screening'
      : q.phase.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    type: q.type,
    options: q.options.map(opt => ({
      icon: pickIcon(opt, q.phase),
      label: opt,
      sub: '',
      theme: pickTheme(opt, q.phase),
    })),
    accentColor: phaseColorMap[q.phase] || '#7fb5c9',
    bgFrom: '#0a0e14',
    bgTo: '#0d1220',
    showIf: q.shown_if ? buildShowIf(q.shown_if) : undefined,
    multiExclusive: q.type === 'multi_select' ? findExclusiveOptions(q.options) : undefined,
    ifThenRules: q.if_then || [],
  }
}

// ── Filter and map questions ──────────────────────────────────────────────────
const SKIP_TYPES = new Set(['number', 'height_weight', 'date_or_not_applicable', 'free_text_or_not_sure'])
const questions = rawQuestions.questions
  .filter(q => !SKIP_TYPES.has(q.type))
  .map(mapJsonQuestion)

// ── Scoring engine ────────────────────────────────────────────────────────────
function evaluateCondition(condStr, answer, allAnswers, scores, patientAge) {
  if (!condStr) return false
  const c = condStr.trim()

  // Simple "answer == 'X'" or "answer == 'X' || answer == 'Y'"
  const simpleEqMatch = c.match(/^answer\s*==\s*'([^']+)'$/)
  if (simpleEqMatch) {
    if (Array.isArray(answer)) return answer.includes(simpleEqMatch[1])
    return answer === simpleEqMatch[1]
  }

  // "answer != 'X'"
  const neqMatch = c.match(/^answer\s*!=\s*'([^']+)'$/)
  if (neqMatch) {
    if (Array.isArray(answer)) return !answer.includes(neqMatch[1])
    return answer !== neqMatch[1]
  }

  // "answer contains 'X'"
  const containsMatch = c.match(/^answer\s+contains\s+'([^']+)'$/)
  if (containsMatch) {
    if (Array.isArray(answer)) return answer.some(a => a.includes(containsMatch[1]))
    return typeof answer === 'string' && answer.includes(containsMatch[1])
  }

  // "answer contains any GI symptom"
  if (c.includes('answer contains any GI symptom')) {
    const giSymptoms = ['Nausea', 'Vomiting', 'Reflux', 'Constipation', 'Diarrhea', 'Dizziness']
    if (Array.isArray(answer)) return answer.some(a => giSymptoms.some(s => a.includes(s)))
    return false
  }

  // "answer == 'X' || answer == 'Y'" (simple OR)
  const orParts = c.split(/\s*\|\|\s*/)
  if (orParts.length > 1 && orParts.every(p => p.startsWith('answer'))) {
    return orParts.some(part => evaluateCondition(part, answer, allAnswers, scores, patientAge))
  }

  // "answer in ['X', 'Y', 'Z']"
  const inMatch = c.match(/^answer\s+in\s+\[([^\]]+)\]$/)
  if (inMatch) {
    const vals = inMatch[1].split(',').map(v => v.trim().replace(/^'|'$/g, ''))
    if (Array.isArray(answer)) return answer.some(a => vals.includes(a))
    return vals.includes(answer)
  }

  // "answer == 'X' && age >= N"
  const ageCompound = c.match(/answer\s*==\s*'([^']+)'\s*&&\s*age\s*>=\s*(\d+)/)
  if (ageCompound) {
    const val = ageCompound[1]
    const ageThreshold = parseInt(ageCompound[2])
    const answerMatch = Array.isArray(answer) ? answer.includes(val) : answer === val
    return answerMatch && (patientAge || 0) >= ageThreshold
  }

  // "answer == 'X' && q_xxx.answer == 'Y'"
  const crossRefMatch = c.match(/answer\s*==\s*'([^']+)'\s*&&\s*(\w+)\.answer\s*==\s*'([^']+)'/)
  if (crossRefMatch) {
    const val = crossRefMatch[1]
    const refQId = crossRefMatch[2]
    const refVal = crossRefMatch[3]
    const answerMatch = Array.isArray(answer) ? answer.includes(val) : answer === val
    const refAnswer = allAnswers[refQId]
    const refMatch = Array.isArray(refAnswer) ? refAnswer.includes(refVal) : refAnswer === refVal
    return answerMatch && refMatch
  }

  // "age >= N"
  const ageMatch = c.match(/^age\s*>=\s*(\d+)$/)
  if (ageMatch) {
    return (patientAge || 0) >= parseInt(ageMatch[1])
  }

  // "answer == 'X' && Y == true"  (flag-based compound — check answer part only for demo)
  const flagCompound = c.match(/answer\s*==\s*'([^']+)'\s*&&\s*\w+\s*==\s*true/)
  if (flagCompound) {
    const val = flagCompound[1]
    return Array.isArray(answer) ? answer.includes(val) : answer === val
  }

  // "bmi < clinic_threshold" — skip for demo
  if (c.includes('bmi') || c.includes('clinic_threshold')) return false

  // "known_dose_provided" / "valid_date_provided" — skip
  if (c.includes('known_dose_provided') || c.includes('valid_date_provided')) return false

  // OR conditions with mixed types
  if (orParts.length > 1) {
    return orParts.some(part => evaluateCondition(part.trim(), answer, allAnswers, scores, patientAge))
  }

  // AND conditions
  const andParts = c.split(/\s*&&\s*/)
  if (andParts.length > 1) {
    return andParts.every(part => evaluateCondition(part.trim(), answer, allAnswers, scores, patientAge))
  }

  return false
}

function computeScores(answers, allQuestions, patientAge) {
  let velocity = 0.70
  const scores = {
    safety_gate: 'none',
    gi_risk: 0,
    nausea_sensitivity: 0,
    reflux_risk: 0,
    constipation_risk: 0,
    hydration_autonomic_risk: 'low',
    mood_reward_risk: 'low',
    sarcopenia_risk: 'low',
    autonomic_wearable_ready: 'false',
    behavioral_vulnerability_window: 'uniform',
    hedonic_tone_baseline: 'intact',
    mitochondrial_fatigue_risk: 'low',
    critical_tmax_shift_risk: 'low',
    uric_acid_flare_risk: 'low',
    nocturnal_stasis_risk: 'low',
    sensory_aversion_risk: 'low',
    injection_support_need: 'low',
    medication_fit: 'GLP_candidate',
    delivery_mode: 'pen',
    cycle_context_risk: 'none',
  }
  const flags = []
  const doctorNotes = []

  for (const q of allQuestions) {
    const answer = answers[q.id]
    if (!answer) continue

    for (const rule of (q.ifThenRules || [])) {
      if (evaluateCondition(rule.if, answer, answers, scores, patientAge)) {
        const t = rule.then
        if (t.set) {
          for (const [key, val] of Object.entries(t.set)) {
            scores[key] = val
          }
        }
        if (t.add_flags) flags.push(...t.add_flags)
        if (t.doctor_note) doctorNotes.push({ qId: q.id, note: t.doctor_note })
        if (t.modify_scores) {
          for (const [key, val] of Object.entries(t.modify_scores)) {
            if (key === 'titration_velocity_v') {
              velocity += val
            } else if (typeof val === 'string' && val.startsWith('+')) {
              scores[key] = (scores[key] || 0) + parseInt(val)
            } else if (typeof val === 'number') {
              velocity += val
            }
          }
        }
      }
    }
  }

  // Clamp velocity
  velocity = Math.max(0, Math.min(1, velocity))

  // Convert numeric scores to levels
  const giLevel = scores.gi_risk >= 4 ? 'high' : scores.gi_risk >= 2 ? 'moderate' : 'low'
  const nauseaLevel = typeof scores.nausea_sensitivity === 'string' ? scores.nausea_sensitivity :
    scores.nausea_sensitivity >= 2 ? 'high' : scores.nausea_sensitivity >= 1 ? 'moderate' : 'low'
  const refluxLevel = typeof scores.reflux_risk === 'string' ? scores.reflux_risk :
    scores.reflux_risk >= 2 ? 'high' : scores.reflux_risk >= 1 ? 'moderate' : 'low'
  const constipLevel = typeof scores.constipation_risk === 'string' ? scores.constipation_risk :
    scores.constipation_risk >= 2 ? 'high' : scores.constipation_risk >= 1 ? 'moderate' : 'low'

  // Determine dose readiness
  let doseReadiness = 'PAUSE'
  if (scores.safety_gate === 'stop_intake' || scores.safety_gate === 'review_required') {
    doseReadiness = 'SAFETY_REVIEW'
  } else if (velocity >= 0.55 && scores.gi_risk < 2) {
    doseReadiness = 'PUSH'
  } else if (velocity < 0.35) {
    doseReadiness = 'PAUSE'
  }

  return {
    velocity,
    scores,
    flags,
    doctorNotes,
    doseReadiness,
    giLevel,
    nauseaLevel,
    refluxLevel,
    constipationLevel: constipLevel,
  }
}

// ── Analyze steps ─────────────────────────────────────────────────────────────
const analyzeSteps = [
  'Running safety screening\u2026',
  'Processing biological baseline\u2026',
  'Evaluating emetic sensitivity\u2026',
  'Mapping GI motility brakes\u2026',
  'Assessing autonomic stability\u2026',
  'Reading appetite response signal\u2026',
  'Analyzing reward and food noise\u2026',
  'Evaluating mood baseline\u2026',
  'Checking strength floor\u2026',
  'Reviewing prior GLP response\u2026',
  'Generating Dose Readiness Report\u2026',
]

export default function IntakeFormCore({ onComplete, mode = 'patient' }) {
  const { completeIntake, showToast, setIntakeOutputs, setPatientInfo } = useStore()
  const store = useStore()

  const [screen, setScreen] = useState('welcome')
  const [infoName, setInfoName] = useState('Sarah Johnson')
  const [infoDOB, setInfoDOB] = useState('03 / 14 / 1989')
  const [direction, setDirection] = useState(1)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState({})
  const [multiSelected, setMultiSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [analyzeStep, setAnalyzeStep] = useState(0)
  const [analyzeProgress, setAnalyzeProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const topRef = useRef(null)

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [screen])

  const visibleQuestions = useMemo(() =>
    questions.filter(q => !q.showIf || q.showIf(answers, {}, store.patientAge)),
    [answers, store.patientAge]
  )
  const totalQ = visibleQuestions.length
  const currentQ = typeof screen === 'number' ? screen : 0
  const q = visibleQuestions[currentQ]

  const handleAnswer = (i) => {
    if (selected !== null) return
    setSelected(i)
    setTimeout(() => {
      const newAnswers = { ...answers, [q.id]: q.options[i].label }
      setAnswers(newAnswers)
      if (typeof screen === 'number' && screen < totalQ - 1) {
        setDirection(1)
        setSelected(null)
        setScreen(screen + 1)
      } else {
        setLoading(true)
        setScreen('analyze')
      }
    }, 520)
  }

  const handleMultiSelect = (label) => {
    const exclusive = q.multiExclusive || []
    const isExclusive = exclusive.includes(label)
    const otherExclusive = exclusive.filter(e => e !== label)

    setMultiSelected((prev) => {
      if (prev.includes(label)) {
        return prev.filter(l => l !== label)
      } else {
        const updated = [...prev, label]
        if (isExclusive) {
          // Selecting an exclusive option: keep only this one and remove all non-exclusive
          return [label]
        } else {
          // Selecting a non-exclusive option: remove any exclusive options
          return updated.filter(l => !exclusive.includes(l))
        }
      }
    })
  }

  const handleMultiContinue = () => {
    if (multiSelected.length > 0) {
      const newAnswers = { ...answers, [q.id]: multiSelected }
      setAnswers(newAnswers)
      if (typeof screen === 'number' && screen < totalQ - 1) {
        setDirection(1)
        setMultiSelected([])
        setScreen(screen + 1)
      } else {
        setLoading(true)
        setScreen('analyze')
      }
    }
  }

  const goBack = () => {
    if (selected !== null || multiSelected.length > 0) return
    if (typeof screen === 'number') {
      if (screen > 0) {
        setDirection(-1)
        setScreen(screen - 1)
      } else {
        setDirection(-1)
        setScreen('welcome')
      }
    }
  }

  useEffect(() => {
    if (!loading) return
    let step = 0
    const timer = setInterval(() => {
      step++
      if (step < analyzeSteps.length) {
        setAnalyzeStep(step)
        setAnalyzeProgress((step / analyzeSteps.length) * 100)
      } else {
        clearInterval(timer)
        setAnalyzeProgress(100)
        setTimeout(() => {
          // Compute scores from all questions and answers
          const result = computeScores(answers, questions, store.patientAge)

          setIntakeOutputs({
            ...store.intakeOutputs,
            doseReadiness: result.doseReadiness,
            computedVelocity: result.velocity,
            flags: result.flags,
            doctorNotes: result.doctorNotes,
            autonomicWearableReady: result.scores.autonomic_wearable_ready === 'true',
            behavioralVulnerabilityWindow: result.scores.behavioral_vulnerability_window,
            hedonicToneBaseline: result.scores.hedonic_tone_baseline,
            mitochondrialFatigueRisk: result.scores.mitochondrial_fatigue_risk,
            criticalTmaxShiftRisk: result.scores.critical_tmax_shift_risk,
            uricAcidFlareRisk: result.scores.uric_acid_flare_risk,
            nocturnalStasisRisk: result.scores.nocturnal_stasis_risk,
            sensoryAversionRisk: result.scores.sensory_aversion_risk,
          })
          setPatientInfo(infoName.trim() || 'Patient', infoDOB.trim())
          completeIntake()
          setCompleted(true)
        }, 700)
      }
    }, 430)
    return () => clearInterval(timer)
  }, [loading])

  // ── Analyze screen ──────────────────────────────────────────────────────────
  if (screen === 'analyze') {
    if (completed) {
      return (
        <div ref={topRef} className="flex flex-col items-center justify-center px-8 py-16 min-h-screen" style={{ background: 'rgba(10,14,20,0.92)' }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 20 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
            style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', boxShadow: '0 0 40px rgba(127,181,201,0.3)' }}
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-extrabold text-white text-center mb-3"
            style={{ textShadow: '0 0 24px rgba(127,181,201,0.25)' }}
          >
            Report complete
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="text-sm text-center mb-2 max-w-xs"
            style={{ color: 'rgba(240,244,248,0.55)' }}
          >
            {infoName ? `${infoName}'s` : 'The'} Dose Readiness Report has been generated and sent to their doctor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full mb-10 mt-1"
            style={{ background: 'rgba(127,181,201,0.1)', border: '1px solid rgba(127,181,201,0.2)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-clinical animate-pulse" style={{ background: '#7fb5c9' }} />
            <span className="text-xs font-medium" style={{ color: '#7fb5c9' }}>Sent to doctor</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={onComplete}
            className="w-full max-w-xs py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', boxShadow: '0 8px 24px rgba(127,181,201,0.25)' }}
          >
            See Clinician View
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      )
    }

    return (
      <div ref={topRef} className="flex flex-col items-center justify-center px-8 py-16 min-h-screen" style={{ background: 'rgba(10,14,20,0.92)' }}>
        <div className="relative w-28 h-28 mx-auto mb-10">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="absolute inset-0 rounded-full"
              style={{ border: `2px solid rgba(127,181,201,${0.35 - i * 0.1})` }}
              animate={{ scale: [1, 1.5 + i * 0.2], opacity: [1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }} />
          ))}
          <motion.div className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}>
            <TrendingUp className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p key={analyzeStep}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-base font-bold text-white mb-2 text-center"
            style={{ textShadow: '0 0 24px rgba(127,181,201,0.25)' }}>
            {analyzeSteps[analyzeStep]}
          </motion.p>
        </AnimatePresence>
        <p className="text-sm mb-10" style={{ color: 'rgba(240,244,248,0.45)' }}>Building your Dose Readiness Report</p>

        <div className="w-full max-w-xs">
          <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #7fb5c9, #a99cc4)' }}
              animate={{ width: `${analyzeProgress}%` }}
              transition={{ duration: 0.35 }} />
          </div>
          <div className="flex justify-between">
            <span className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>Generating report</span>
            <span className="text-xs font-bold" style={{ color: '#7fb5c9' }}>{Math.round(analyzeProgress)}%</span>
          </div>
        </div>
      </div>
    )
  }

  // ── Info screen ─────────────────────────────────────────────────────────────
  if (screen === 'info') {
    const canContinue = infoName.trim().length > 0 && infoDOB.trim().length > 0
    return (
      <div ref={topRef} className="flex flex-col items-center justify-center min-h-screen px-8" style={{ background: 'linear-gradient(160deg, #0a0e14 0%, #0d1220 60%, #0a0e14 100%)' }}>
        <div className="w-full max-w-sm flex flex-col">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#7fb5c9' }}>
            Patient Info
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
            className="text-2xl font-extrabold text-white mb-6 leading-snug">
            Who is this intake for?
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3 mb-8">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'rgba(240,244,248,0.45)' }}>Full name</label>
              <input
                type="text"
                value={infoName}
                onChange={e => setInfoName(e.target.value)}
                placeholder="e.g. Sarah Johnson"
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-white placeholder-slate-600 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#7fb5c9' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'rgba(240,244,248,0.45)' }}>Date of birth</label>
              <input
                type="text"
                value={infoDOB}
                onChange={e => setInfoDOB(e.target.value)}
                placeholder="MM / DD / YYYY"
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-white placeholder-slate-600 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#7fb5c9' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            onClick={() => { if (canContinue) setScreen(0) }}
            className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-opacity"
            style={{
              background: canContinue ? 'linear-gradient(135deg, #7fb5c9, #a99cc4)' : 'rgba(255,255,255,0.08)',
              color: canContinue ? 'white' : 'rgba(240,244,248,0.35)',
              boxShadow: canContinue ? '0 8px 24px rgba(127,181,201,0.25)' : 'none',
              cursor: canContinue ? 'pointer' : 'not-allowed',
            }}
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    )
  }

  // ── Welcome screen ──────────────────────────────────────────────────────────
  if (screen === 'welcome') {
    return (
      <div ref={topRef} className="flex flex-col items-center justify-center min-h-screen px-8 text-center" style={{ background: 'linear-gradient(160deg, #0a0e14 0%, #0d1220 60%, #0a0e14 100%)' }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', boxShadow: '0 12px 32px rgba(127,181,201,0.25)' }}
        >
          <TrendingUp className="w-7 h-7 text-white" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: '#7fb5c9' }}
        >
          {mode === 'clinician' ? 'Clinician-Led' : 'Patient Intake'}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="text-3xl font-extrabold text-white leading-tight mb-3"
        >
          {mode === 'clinician' ? 'Patient Intake' : 'Dose Readiness'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="text-sm leading-relaxed mb-10 max-w-xs"
          style={{ color: 'rgba(240,244,248,0.45)' }}
        >
          {mode === 'clinician'
            ? "Read each question aloud and tap the patient's answer."
            : 'A short adaptive assessment to personalize your dose pacing.'}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          onClick={() => setScreen('info')}
          className="w-full max-w-xs py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', boxShadow: '0 8px 24px rgba(127,181,201,0.25)' }}
        >
          Begin
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    )
  }

  // ── Card question screen ─────────────────────────────────────────────────────
  return (
    <div ref={topRef} className="flex flex-col min-h-screen" style={{ background: `linear-gradient(160deg, ${q.bgFrom} 0%, ${q.bgTo} 100%)` }}>

      {/* Top bar */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={goBack} disabled={selected !== null || multiSelected.length > 0}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ArrowLeft className="w-3.5 h-3.5" style={{ color: 'rgba(240,244,248,0.7)' }} />
          </button>

          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div className="h-full rounded-full"
              style={{ background: q.accentColor }}
              animate={{ width: `${((currentQ + 1) / totalQ) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
          </div>

          <span className="text-xs font-medium flex-shrink-0" style={{ color: 'rgba(240,244,248,0.45)' }}>
            <span className="font-bold" style={{ color: q.accentColor }}>{currentQ + 1}</span>/{totalQ}
          </span>
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={`${q.id}-view`} custom={direction}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-1 flex flex-col px-5">

          <div className="mb-5">
            {/* Category badge */}
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ background: `${q.categoryColor}18`, color: q.categoryColor }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: q.categoryColor }} />
              {q.category}
            </motion.div>

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, delay: 0.05 }}
              className="w-7 h-7 rounded-xl flex items-center justify-center text-sm font-extrabold text-white mb-2"
              style={{ background: q.accentColor }}>
              {currentQ + 1}
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}
              className="text-xs font-medium mb-1" style={{ color: 'rgba(240,244,248,0.45)' }}>{q.sub}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-2xl font-extrabold leading-tight" style={{ color: '#f0f4f8' }}>
              {q.shortQ}
            </motion.h2>
          </div>

          {q.type === 'single_select' ? (
            <div className={`grid ${q.options.length <= 3 ? 'grid-cols-1' : 'grid-cols-2'} gap-3 pb-8`}>
              {q.options.map((opt, i) => {
                const Icon = opt.icon
                const isSelected = selected === i
                return (
                  <motion.button key={i}
                    initial={{ opacity: 0, y: 16, scale: 0.94 }}
                    animate={{
                      opacity: 1, y: 0,
                      scale: isSelected ? 1.04 : 1,
                      background: isSelected ? opt.theme.selected : 'rgba(255,255,255,0.04)',
                    }}
                    transition={{ delay: 0.12 + i * 0.06, type: 'spring', stiffness: 280, damping: 24 }}
                    onClick={() => handleAnswer(i)}
                    className="relative flex flex-col items-center justify-center rounded-3xl py-7 px-3 text-center overflow-hidden"
                    style={{
                      border: isSelected ? `2px solid ${opt.theme.border}` : '1px solid rgba(240,244,248,0.08)',
                      boxShadow: isSelected
                        ? `0 0 0 2px ${opt.theme.border}, 0 8px 20px rgba(0,0,0,0.3)`
                        : 'none',
                    }}
                    whileTap={{ scale: 0.91 }}>

                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                      style={{ background: opt.theme.bg, border: `1.5px solid ${opt.theme.border}` }}
                      animate={isSelected ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.35 }}>
                      <Icon style={{ width: 28, height: 28, color: opt.theme.icon }} />
                    </motion.div>

                    <p className="text-sm font-bold leading-tight" style={{ color: '#f0f4f8' }}>{opt.label}</p>
                    {opt.sub && <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,248,0.45)' }}>{opt.sub}</p>}

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: opt.theme.icon }}>
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                          <path d="M1 4.5l3 3L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {q.options.map((opt, i) => {
                  const Icon = opt.icon
                  const isSelected = multiSelected.includes(opt.label)
                  return (
                    <motion.button key={i}
                      initial={{ opacity: 0, y: 16, scale: 0.94 }}
                      animate={{
                        opacity: 1, y: 0,
                        scale: isSelected ? 1.02 : 1,
                        background: isSelected ? opt.theme.selected : 'rgba(255,255,255,0.04)',
                      }}
                      transition={{ delay: 0.12 + i * 0.06, type: 'spring', stiffness: 280, damping: 24 }}
                      onClick={() => handleMultiSelect(opt.label)}
                      className="relative flex items-center gap-3 rounded-2xl py-4 px-4 text-left overflow-hidden"
                      style={{
                        border: isSelected ? `2px solid ${opt.theme.border}` : '1px solid rgba(240,244,248,0.08)',
                        boxShadow: isSelected
                          ? `0 0 0 2px ${opt.theme.border}, 0 8px 20px rgba(0,0,0,0.3)`
                          : 'none',
                      }}
                      whileTap={{ scale: 0.98 }}>

                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: opt.theme.bg, border: `1.5px solid ${opt.theme.border}` }}>
                        <Icon style={{ width: 20, height: 20, color: opt.theme.icon }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold" style={{ color: '#f0f4f8' }}>{opt.label}</p>
                        {opt.sub && <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>{opt.sub}</p>}
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: opt.theme.icon }}>
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={handleMultiContinue}
                disabled={multiSelected.length === 0}
                className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                style={multiSelected.length > 0
                  ? { background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', color: 'white', boxShadow: '0 8px 24px rgba(127,181,201,0.25)' }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(240,244,248,0.35)' }
                }
              >
                Continue
                {multiSelected.length > 0 && <ChevronRight className="w-5 h-5" />}
              </motion.button>
            </>
          )}

          {q.type === 'single_select' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 0.5 }}
              className="text-center text-xs pb-6 px-5" style={{ color: 'rgba(240,244,248,0.45)' }}>
              Tap an answer to continue
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
