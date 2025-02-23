import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register a font that supports Vietnamese characters
Font.register({
  family: 'Open Sans',
  src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
});

interface Good {
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptData {
  customerName: string;
  phoneNumber: string;
  address: string;
  note?: string;
  goods: Good[];
}

// A5 size in points (1 point = 1/72 inch)
const A5_WIDTH = 419.53;
const A5_HEIGHT = 595.28;

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Open Sans', // Use the registered font
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
  customerInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginRight: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 12,
    flex: 1,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
    fontSize: 8.4,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 3,
    fontSize: 8.4,
  },
  col1: {
    width: '40%',
    fontSize: 8.4,
  },
  col2: {
    width: '15%',
    textAlign: 'center',
    fontSize: 8.4,
  },
  col3: {
    width: '25%',
    textAlign: 'right',
    fontSize: 8.4,
  },
  col4: {
    width: '20%',
    textAlign: 'right',
    fontSize: 8.4,
  },
  total: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontSize: 9.1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
});

export const ReceiptPDF: React.FC<{ data: ReceiptData }> = ({ data }) => {
  const calculateTotal = () => {
    return data.goods.reduce((sum, good) => sum + good.quantity * good.price, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <Document>
      <Page size={[A5_WIDTH, A5_HEIGHT]} style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>HÓA ĐƠN BÁN LẺ</Text>
          <Text style={styles.companyInfo}>My Dream Closet by Linh Tracy</Text>
          <Text style={styles.companyInfo}>42 Nguyễn Khắc Hiếu - Trúc Bạch - Ba Đình - HN</Text>
          <Text style={styles.companyInfo}>Hotline: 0982910485</Text>
        </View>

        <View style={styles.customerInfo}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'baseline' }}>
              <Text style={styles.label}>Tên khách hàng:</Text>
              <Text style={styles.value}>{data.customerName}</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'baseline' }}>
              <Text style={styles.label}>Số điện thoại:</Text>
              <Text style={styles.value}>{data.phoneNumber}</Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>Địa chỉ:</Text>
            <Text style={styles.value}>{data.address}</Text>
          </View>

          {data.note && (
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>Ghi chú:</Text>
              <Text style={styles.value}>{data.note}</Text>
            </View>
          )}
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Tên hàng</Text>
            <Text style={styles.col2}>SL</Text>
            <Text style={styles.col3}>Đơn giá</Text>
            <Text style={styles.col4}>Thành tiền</Text>
          </View>

          {data.goods.map((good, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{good.name}</Text>
              <Text style={styles.col2}>{good.quantity}</Text>
              <Text style={styles.col3}>{formatPrice(good.price)}</Text>
              <Text style={styles.col4}>
                {formatPrice(good.quantity * good.price)}
              </Text>
            </View>
          ))}

          <View style={styles.total}>
            <Text style={styles.col4}>
              Tổng tiền: {formatPrice(calculateTotal())}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Cảm ơn quý khách đã mua hàng!
        </Text>
      </Page>
    </Document>
  );
}; 