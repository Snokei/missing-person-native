import { Ionicons, Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GENDER_OPTIONS, STEP_THEMES, STEPS, TEAL, TEAL_LIGHT } from 'components/core/const';
import AppDropdown from 'components/UI/AppDropdown';
import AppInput from 'components/UI/AppInput';
import { ScreenTransition } from 'components/UI/ScreenTransition';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MissingScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      fullName: '',
      gender: null as string | null,
      age: '',
      languages: '',
      height: '',
      weight: '',
      medicalCondition: '',
      identificationMark: '',
      reporterName: '',
      mobileNumber: '',
      alternateNumber: '',
      relationship: '',
      address: '',
      lastSeenDate: new Date(),
      lastSeenTime: new Date(),
      lastSeenLocation: '',
      circumstances: '',
    },
  });

  const lastSeenDate = watch('lastSeenDate');
  const lastSeenTime = watch('lastSeenTime');

  const onSubmit = (data: any) => {
    console.log('Submitted missing person report:', data);
  };

  const formattedDate = `${lastSeenDate.getDate().toString().padStart(2, '0')} / ${lastSeenDate.toLocaleString('en-US', { month: 'long' })} / ${lastSeenDate.getFullYear()}`;
  const formattedTime = lastSeenTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const goNext = () => {
    if (currentStep < 3) setCurrentStep((s) => s + 1);
  };
  const goBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const theme = STEP_THEMES[currentStep as keyof typeof STEP_THEMES];

  return (
    <ScreenTransition>
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      {/* Header — blends into page background */}
      <View style={[styles.header, { backgroundColor: theme.bg }]}>
        {currentStep > 1 && (
          <TouchableOpacity
            onPress={goBack}
            style={[styles.backBtn, { backgroundColor: theme.light }]}>
            <Ionicons name="arrow-back" size={18} color={theme.accent} />
          </TouchableOpacity>
        )}
        <View style={[styles.headerIconBox, { backgroundColor: theme.light }]}>
          <Octicons name="report" size={24} color={theme.accent} />
        </View>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>Report Missing Person</Text>
          <Text style={styles.headerSub}>Complete the steps to submit</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Stepper Card */}
        <View style={styles.stepCard}>
          <View style={styles.stepCardTop}>
            <View style={[styles.stepBadge, { backgroundColor: theme.accent }]}>
              <Text style={styles.stepBadgeText}>Step {currentStep} of 3</Text>
            </View>
            <Text style={styles.stepCardTitle}>{STEPS[currentStep - 1].label}</Text>
          </View>

          <View style={styles.stepRow}>
            {STEPS.map((step, idx) => {
              const done = currentStep > step.id;
              const active = currentStep === step.id;
              return (
                <View key={step.id} style={styles.stepItem}>
                  {idx > 0 && (
                    <View
                      style={[styles.connector, done || active ? styles.connectorActive : {}]}
                    />
                  )}
                  <View
                    style={[
                      styles.stepCircle,
                      done && [
                        styles.stepCircleDone,
                        { backgroundColor: theme.accent, borderColor: theme.accent },
                      ],
                      active && [
                        styles.stepCircleActive,
                        {
                          backgroundColor: theme.accent,
                          borderColor: theme.accent,
                          shadowColor: theme.accent,
                        },
                      ],
                    ]}>
                    <Ionicons
                      name={done ? 'checkmark' : active ? 'ellipse' : 'ellipse-outline'}
                      size={done ? 14 : 10}
                      color={done || active ? '#fff' : '#D1D5DB'}
                    />
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      active && [styles.stepLabelActive, { color: theme.accent }],
                      done && [styles.stepLabelDone, { color: theme.accent }],
                    ]}>
                    {step.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* ─── STEP 1: Person Info ─── */}
        {currentStep === 1 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconBox}>
                <Text style={styles.cardIconText}>👤</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Person Information</Text>
                <Text style={styles.cardSub}>Details about the missing person</Text>
              </View>
            </View>

            <Text style={styles.fieldLabel}>Full Name</Text>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="person-outline"
                  label="Enter full name"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <View style={styles.row}>
              <View style={styles.halfLeft}>
                <Text style={styles.fieldLabel}>Gender</Text>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { onChange, value } }) => (
                    <AppDropdown
                      icon="male-female-outline"
                      label="Gender"
                      value={value}
                      setValue={onChange}
                      data={GENDER_OPTIONS}
                    />
                  )}
                />
              </View>
              <View style={styles.halfRight}>
                <Text style={styles.fieldLabel}>Age</Text>
                <Controller
                  control={control}
                  name="age"
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      icon="calendar-number-outline"
                      label="Age"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
            </View>

            <Text style={styles.fieldLabel}>Languages Spoken</Text>
            <Controller
              control={control}
              name="languages"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="chatbubble-ellipses-outline"
                  label="Languages spoken"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <View style={styles.row}>
              <View style={styles.halfLeft}>
                <Text style={styles.fieldLabel}>Height (cm)</Text>
                <Controller
                  control={control}
                  name="height"
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      icon="resize-outline"
                      label="Height"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              <View style={styles.halfRight}>
                <Text style={styles.fieldLabel}>Weight (kg)</Text>
                <Controller
                  control={control}
                  name="weight"
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      icon="barbell-outline"
                      label="Weight"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
            </View>

            <Text style={styles.fieldLabel}>Medical Condition</Text>
            <Controller
              control={control}
              name="medicalCondition"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="medkit-outline"
                  label="Medical condition (if any)"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Text style={styles.fieldLabel}>Identification Mark</Text>
            <Controller
              control={control}
              name="identificationMark"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="finger-print-outline"
                  label="Birthmark, tattoo, scar etc."
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
        )}

        {/* ─── STEP 2: Reporter Info ─── */}
        {currentStep === 2 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconBox}>
                <Text style={styles.cardIconText}>📋</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Reporter Information</Text>
                <Text style={styles.cardSub}>Your contact details</Text>
              </View>
            </View>

            <Text style={styles.fieldLabel}>Reporter Name</Text>
            <Controller
              control={control}
              name="reporterName"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="person-circle-outline"
                  label="Your full name"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Text style={styles.fieldLabel}>Mobile Number</Text>
            <Controller
              control={control}
              name="mobileNumber"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="call-outline"
                  label="Primary contact number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                />
              )}
            />

            <Text style={styles.fieldLabel}>Alternate Number</Text>
            <Controller
              control={control}
              name="alternateNumber"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="phone-portrait-outline"
                  label="Alternate contact number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                />
              )}
            />

            <Text style={styles.fieldLabel}>Relationship to Missing Person</Text>
            <Controller
              control={control}
              name="relationship"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="people-outline"
                  label="e.g. Parent, Sibling, Friend"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Text style={styles.fieldLabel}>Address</Text>
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="home-outline"
                  label="Your address"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                  className="min-h-28"
                  textAlignVertical="top"
                />
              )}
            />

            <View style={styles.infoNote}>
              <Text style={styles.infoNoteText}>
                ⓘ Your contact details will be used for case updates and follow-ups.
              </Text>
            </View>
          </View>
        )}

        {/* ─── STEP 3: Last Seen ─── */}
        {currentStep === 3 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconBox}>
                <Text style={styles.cardIconText}>📍</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Last Seen Information</Text>
                <Text style={styles.cardSub}>When and where were they last seen?</Text>
              </View>
            </View>

            {/* Date */}
            <Text style={styles.fieldLabel}>Last Seen Date</Text>
            <Controller
              control={control}
              name="lastSeenDate"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity
                    style={styles.dateField}
                    onPress={() => setShowDatePicker(true)}>
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#9CA3AF"
                      style={styles.dateIcon}
                    />
                    <Text style={styles.dateFieldText}>{formattedDate}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={value}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={(_, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) onChange(selectedDate);
                      }}
                    />
                  )}
                </>
              )}
            />

            {/* Time */}
            <Text style={styles.fieldLabel}>Last Seen Time</Text>
            <Controller
              control={control}
              name="lastSeenTime"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity
                    style={styles.dateField}
                    onPress={() => setShowTimePicker(true)}>
                    <Ionicons
                      name="time-outline"
                      size={18}
                      color="#9CA3AF"
                      style={styles.dateIcon}
                    />
                    <Text style={styles.dateFieldText}>{formattedTime}</Text>
                  </TouchableOpacity>
                  {showTimePicker && (
                    <DateTimePicker
                      value={value}
                      mode="time"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={(_, selectedTime) => {
                        setShowTimePicker(false);
                        if (selectedTime) onChange(selectedTime);
                      }}
                    />
                  )}
                </>
              )}
            />

            <Text style={styles.fieldLabel}>Last Seen Location</Text>
            <Controller
              control={control}
              name="lastSeenLocation"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="location-outline"
                  label="Enter detailed location"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={3}
                  className="min-h-24"
                  textAlignVertical="top"
                />
              )}
            />

            <Text style={styles.fieldLabel}>Circumstances</Text>
            <Controller
              control={control}
              name="circumstances"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  icon="document-text-outline"
                  label="Describe the circumstances"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={5}
                  className="min-h-32"
                  textAlignVertical="top"
                />
              )}
            />

            <View style={styles.infoNote}>
              <Text style={styles.infoNoteText}>
                ⓘ By continuing, you agree to our Terms of Service and confirm the information is
                accurate.
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={[styles.backButton, { borderColor: theme.accent }]}
            onPress={goBack}>
            <Text style={[styles.backButtonText, { color: theme.accent }]}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.continueButton,
            currentStep === 1 && styles.continueButtonFull,
            { backgroundColor: theme.accent, shadowColor: theme.accent },
          ]}
          onPress={currentStep < 3 ? goNext : handleSubmit(onSubmit)}>
          <Text style={styles.continueButtonText}>
            {currentStep === 3 ? 'Submit Report' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScreenTransition>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: TEAL_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: TEAL_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 18,
    color: TEAL,
    fontWeight: '600',
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerSub: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },

  // Stepper Card
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  stepCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stepCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },

  // Steps
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    top: 18,
    left: '-30%',
    right: '70%',
    width: '60%',
    height: 2.5,
    backgroundColor: '#E5E7EB',
    zIndex: 0,
  },
  connectorActive: {
    backgroundColor: TEAL,
  },
  stepCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    zIndex: 1,
  },
  stepCircleActive: {
    backgroundColor: TEAL,
    borderColor: TEAL,
    shadowColor: TEAL,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  stepCircleDone: {
    backgroundColor: TEAL,
    borderColor: TEAL,
  },
  stepLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
    fontWeight: '500',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: TEAL,
    fontWeight: '700',
  },
  stepLabelDone: {
    color: TEAL,
    fontWeight: '600',
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },

  // Step badge
  stepBadge: {
    backgroundColor: TEAL,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 14,
  },
  stepBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: TEAL_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconText: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  cardSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  // Fields
  fieldLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 14,
    marginBottom: 2,
    marginLeft: 2,
  },
  row: {
    flexDirection: 'row',
  },
  halfLeft: {
    flex: 1,
    marginRight: 8,
  },
  halfRight: {
    flex: 1,
    marginLeft: 8,
  },

  // Date field
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#FAFAFA',
    marginTop: 6,
    gap: 10,
  },
  dateIcon: {
    marginRight: 2,
  },
  dateFieldText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },

  // Info note
  infoNote: {
    backgroundColor: TEAL_LIGHT,
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  infoNoteText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
  },

  // Bottom bar
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  backButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: TEAL,
    fontSize: 15,
    fontWeight: '600',
  },
  continueButton: {
    flex: 2,
    height: 52,
    borderRadius: 14,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: TEAL,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  continueButtonFull: {
    flex: 1,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
