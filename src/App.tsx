import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Button } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ReceiptForm } from './components/ReceiptForm';
import { ReceiptPDF } from './components/ReceiptPDF';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    success: {
      main: '#4caf50',
    },
  },
});

interface ReceiptData {
  customerName: string;
  phoneNumber: string;
  address: string;
  note?: string;
  goods: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

function App() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  const handleFormSubmit = (data: ReceiptData) => {
    setReceiptData(data);
  };

  const getFormattedDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}_${hours}-${minutes}.pdf`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <ReceiptForm onSubmit={handleFormSubmit} />
        
        {receiptData && (
          <div style={{
            margin: '20px auto',
            maxWidth: '600px',
          }}>
            <PDFDownloadLink
              document={<ReceiptPDF data={receiptData} />}
              fileName={getFormattedDateTime()}
            >
              <Button
                variant="contained"
                color="success"
                fullWidth
              >
                Tải hóa đơn PDF
              </Button>
            </PDFDownloadLink>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
