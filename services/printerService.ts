import { Alert } from 'react-native';

export interface PrinterSettings {
  enabled: boolean;
  printerName?: string;
  printerAddress?: string;
  printerType: 'thermal' | 'inkjet' | 'laser';
  paperSize: '58mm' | '80mm';
  autoPrint: boolean;
}

export interface BillData {
  orderNumber: string;
  tokenNumber: string;
  date: string;
  time: string;
  customerType: string;
  orderMode: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  gst: number;
  total: number;
  paymentMethod: string;
  amountReceived?: number;
  change?: number;
}

class PrinterService {
  private settings: PrinterSettings = {
    enabled: false,
    printerType: 'thermal',
    paperSize: '58mm',
    autoPrint: false,
  };

  // Initialize printer settings
  initialize(settings: Partial<PrinterSettings>) {
    this.settings = { ...this.settings, ...settings };
  }

  // Get current printer settings
  getSettings(): PrinterSettings {
    return this.settings;
  }

  // Update printer settings
  updateSettings(newSettings: Partial<PrinterSettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  // Check if printer is enabled
  isEnabled(): boolean {
    return this.settings.enabled;
  }

  // Print bill
  async printBill(billData: BillData): Promise<boolean> {
    if (!this.settings.enabled) {
      Alert.alert(
        'Printer Not Configured',
        'Please configure your printer in Settings to print bills.',
        [{ text: 'OK' }]
      );
      return false;
    }

    try {
      // Simulate printer connection and printing
      await this.simulatePrint(billData);
      
      Alert.alert(
        'Bill Printed Successfully',
        `Bill #${billData.orderNumber} has been sent to the printer.`,
        [{ text: 'OK' }]
      );
      
      return true;
    } catch (error) {
      Alert.alert(
        'Print Failed',
        'Failed to print the bill. Please check your printer connection.',
        [{ text: 'OK' }]
      );
      return false;
    }
  }

  // Simulate printing process
  private async simulatePrint(billData: BillData): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Printing bill:', billData);
        resolve();
      }, 1000);
    });
  }

  // Generate bill text for printing
  generateBillText(billData: BillData): string {
    const { orderNumber, tokenNumber, date, time, customerType, orderMode, items, subtotal, gst, total, paymentMethod } = billData;
    
    let billText = '';
    
    // Header
    billText += '================================\n';
    billText += '        RESTAURANT BILL\n';
    billText += '================================\n\n';
    
    // Bill details
    billText += `Bill #: ${orderNumber}\n`;
    billText += `Token: ${tokenNumber}\n`;
    billText += `Date: ${date}\n`;
    billText += `Time: ${time}\n`;
    billText += `Type: ${customerType} - ${orderMode}\n\n`;
    
    // Items
    billText += '--------------------------------\n';
    billText += 'ITEMS:\n';
    billText += '--------------------------------\n';
    
    items.forEach(item => {
      billText += `${item.name} x ${item.quantity}\n`;
      billText += `₹${item.total.toFixed(2)}\n`;
    });
    
    // Summary
    billText += '--------------------------------\n';
    billText += `Subtotal: ₹${subtotal.toFixed(2)}\n`;
    billText += `GST (18%): ₹${gst.toFixed(2)}\n`;
    billText += '--------------------------------\n';
    billText += `TOTAL: ₹${total.toFixed(2)}\n`;
    billText += '--------------------------------\n';
    
    // Payment details
    billText += `Payment: ${paymentMethod.toUpperCase()}\n`;
    if (billData.amountReceived && billData.change !== undefined) {
      billText += `Received: ₹${billData.amountReceived.toFixed(2)}\n`;
      billText += `Change: ₹${billData.change.toFixed(2)}\n`;
    }
    
    // Footer
    billText += '\n================================\n';
    billText += 'Thank you for your visit!\n';
    billText += '================================\n';
    
    return billText;
  }

  // Test printer connection
  async testConnection(): Promise<boolean> {
    if (!this.settings.enabled) {
      return false;
    }

    try {
      // Simulate connection test
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const printerService = new PrinterService();
export default printerService;
