import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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

interface ReceiptFormProps {
  onSubmit: (data: ReceiptData) => void;
}

export const ReceiptForm: React.FC<ReceiptFormProps> = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [goods, setGoods] = useState<Good[]>([]);
  const [newGood, setNewGood] = useState<Good>({ name: '', quantity: 1, price: 0 });

  const handleAddGood = () => {
    if (newGood.name && newGood.quantity > 0 && newGood.price >= 0) {
      setGoods([...goods, newGood]);
      setNewGood({ name: '', quantity: 1, price: 0 });
    }
  };

  const handleRemoveGood = (index: number) => {
    setGoods(goods.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalGoods = [...goods];
    if (newGood.name && newGood.quantity > 0 && newGood.price > 0) {
      finalGoods.push(newGood);
    }
    onSubmit({
      customerName,
      phoneNumber,
      address,
      note,
      goods: finalGoods,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Tạo Hóa Đơn
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Tên khách hàng"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Số điện thoại"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
          required
          multiline
          rows={2}
        />
        <TextField
          fullWidth
          label="Ghi chú"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          margin="normal"
          multiline
          rows={2}
        />

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Danh sách hàng hóa
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            label="Tên hàng"
            value={newGood.name}
            onChange={(e) => setNewGood({ ...newGood, name: e.target.value })}
            size="small"
          />
          <TextField
            label="Số lượng"
            type="number"
            value={newGood.quantity}
            onChange={(e) => setNewGood({ ...newGood, quantity: Number(e.target.value) })}
            size="small"
            sx={{ width: 100 }}
          />
          <TextField
            label="Đơn giá"
            type="number"
            value={newGood.price}
            onChange={(e) => setNewGood({ ...newGood, price: Number(e.target.value) })}
            size="small"
            sx={{ width: 150 }}
          />
          <IconButton onClick={handleAddGood} color="primary" title="Thêm hàng hóa">
            <AddIcon />
          </IconButton>
        </Box>

        <List>
          {goods.map((good, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={good.name}
                secondary={`Số lượng: ${good.quantity}, Đơn giá: ${formatPrice(good.price)}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleRemoveGood(index)} title="Xóa">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={goods.length === 0 && !(newGood.name && newGood.quantity > 0 && newGood.price > 0)}
        >
          Tạo hóa đơn
        </Button>
      </Box>
    </Paper>
  );
}; 