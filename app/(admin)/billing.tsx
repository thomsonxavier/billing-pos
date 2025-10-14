import React from 'react';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { 
  DirectBilling, 
  CustomerDetails, 
  AddItems, 
  Payment, 
  BillSummary 
} from '@/components/View/billing';
import { useBillingStore } from '@/stores/billingStore';
import { useColorModeStore } from '@/lib/colorModeStore';

export default function Billing() {
  const { 
    currentStep, 
    setCurrentStep, 
    nextStep, 
    prevStep, 
    resetBilling,
    createOrder 
  } = useBillingStore();
  const { colorMode } = useColorModeStore();
  function renderScreen() {
    switch (currentStep) {
      case 0:
        return (
          <DirectBilling 
            onQuickBilling={() => setCurrentStep(1)}
            onDineIn={() => setCurrentStep(1)}
          />
        );
      case 1:
        return (
          <CustomerDetails 
            onNext={nextStep}
            onSkip={nextStep}
            onClose={() => setCurrentStep(0)}
          />
        );
      case 2:
        return (
          <AddItems 
            onBack={prevStep}
            onNext={nextStep}
          />
        );
      case 3:
        return (
          <Payment 
            onBack={prevStep}
            onSavePending={() => { createOrder(); nextStep(); }}
            onMarkPaid={() => { createOrder(); nextStep(); }}
          />
        );
      case 4:
        return (
          <BillSummary 
            onPrintBill={() => {}}
            onNewBill={resetBilling}
            onDashboard={() => {}}
          />
        );
      default:
        return <></>;
    }
  }

  return (
    <SafeAreaView className={`flex-1 ${colorMode === 'dark' ? 'dark' : ''} bg-background-0`} edges={['top', 'left', 'right']}>  
      {renderScreen()}
    </SafeAreaView>
  );
}
