import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AlertConfig, useAppStore } from '../../src/store/useAppStore';

type ShowAlertPayload = Pick<AlertConfig, 'title' | 'message' | 'type'>;

interface AlertContextType {
  showAlert: (alert: ShowAlertPayload) => void;
}

const AlertContext = createContext<AlertContextType>({
  showAlert: () => {},
});

export function useAlertPanel() {
  return useContext(AlertContext);
}

function getAlertTypeColor(type: AlertConfig['type']) {
  switch (type) {
    case 'info':
      return '#3B82F6';
    case 'success':
      return '#10B981';
    case 'error':
      return '#EF4444';
  }
}

function getAlertTypeIcon(type: AlertConfig['type']) {
  switch (type) {
    case 'info':
      return 'information';
    case 'success':
      return 'checkmark';
    case 'error':
      return 'alert';
  }
}

function getDefaultTitle(type: AlertConfig['type']) {
  switch (type) {
    case 'info':
      return 'Info';
    case 'success':
      return 'Success';
    case 'error':
      return 'Error';
  }
}

function AlertSheetContent({ onDismiss }: { onDismiss: () => void }) {
  const { title, message, type } = useAppStore((state) => state.showAlert);
  const typeColor = getAlertTypeColor(type);

  return (
    <BottomSheetView style={styles.sheetContent}>
      <View style={[styles.iconCircle, { backgroundColor: typeColor }]}>
        {type === 'error' ? (
          <Text style={styles.errorMark}>!</Text>
        ) : (
          <Ionicons name={getAlertTypeIcon(type) as any} size={28} color="#FFFFFF" />
        )}
      </View>

      <Text style={styles.alertTitle}>{title || getDefaultTitle(type)}</Text>
      <Text style={styles.alertMessage}>{message}</Text>

      <TouchableOpacity onPress={onDismiss} activeOpacity={0.85} style={styles.okButton}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </BottomSheetView>
  );
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const alertSheetRef = useRef<BottomSheetModal>(null);
  const setShowAlert = useAppStore((state) => state.setShowAlert);
  const [presentTrigger, setPresentTrigger] = useState(0);

  const snapPoints = useMemo(() => ['42%'], []);

  const handleSheetDismiss = useCallback(() => {
    setShowAlert({ visible: false });
  }, [setShowAlert]);

  const dismissAlert = useCallback(() => {
    alertSheetRef.current?.dismiss();
  }, []);

  const showAlert = useCallback(
    (alert: ShowAlertPayload) => {
      setShowAlert({ ...alert, visible: true });
      setPresentTrigger((trigger) => trigger + 1);
    },
    [setShowAlert]
  );

  useEffect(() => {
    if (presentTrigger === 0) {
      return;
    }

    const timer = setTimeout(() => {
      alertSheetRef.current?.present();
    }, 50);

    return () => clearTimeout(timer);
  }, [presentTrigger]);

  return (
    <BottomSheetModalProvider>
      <AlertContext.Provider value={{ showAlert }}>
        {children}

        <BottomSheetModal
          ref={alertSheetRef}
          snapPoints={snapPoints}
          index={0}
          enablePanDownToClose
          enableOverDrag={false}
          onDismiss={handleSheetDismiss}
          backgroundStyle={styles.sheetBackground}
          handleIndicatorStyle={styles.sheetHandle}
          handleStyle={styles.sheetHandleContainer}
          animateOnMount
          keyboardBlurBehavior="restore">
          <AlertSheetContent onDismiss={dismissAlert} />
        </BottomSheetModal>
      </AlertContext.Provider>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  sheetHandleContainer: {
    paddingTop: 12,
    paddingBottom: 4,
  },
  sheetHandle: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  sheetContent: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 40,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  errorMark: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 32,
  },
  alertTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: -0.3,
  },
  alertMessage: {
    fontSize: 15,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
    paddingHorizontal: 8,
  },
  okButton: {
    marginTop: 36,
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 999,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
