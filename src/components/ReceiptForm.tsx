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

  const formStyles = {
    paper: {
      p: 4,
      maxWidth: 600,
      mx: 'auto',
      mt: 4,
      borderRadius: 4,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      background: 'linear-gradient(to bottom right, #ffffff, #fff5f5)',
    },
    title: {
      color: '#bf1922',
      fontWeight: 600,
      textAlign: 'center',
      mb: 4,
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    },
    subtitle: {
      color: '#bf1922',
      fontSize: '1.1rem',
      fontWeight: 500,
      mb: 2,
      mt: 4,
    },
    textField: {
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: '#bf1922',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#bf1922',
        },
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#bf1922',
      },
    },
    addButton: {
      color: '#bf1922',
      '&:hover': {
        backgroundColor: 'rgba(191, 25, 34, 0.04)',
      },
    },
    deleteButton: {
      color: '#bf1922',
      '&:hover': {
        backgroundColor: 'rgba(191, 25, 34, 0.04)',
      },
    },
    submitButton: {
      mt: 4,
      backgroundColor: '#bf1922',
      '&:hover': {
        backgroundColor: '#a11219',
      },
      '&.Mui-disabled': {
        backgroundColor: '#f8b4b7',
      },
      borderRadius: '8px',
      py: 1.5,
    },
    listItem: {
      bgcolor: 'rgba(191, 25, 34, 0.03)',
      borderRadius: 2,
      mb: 1,
      '&:hover': {
        bgcolor: 'rgba(191, 25, 34, 0.06)',
      },
    },
    goodsBox: {
      display: 'flex',
      gap: 1,
      mb: 2,
      '& .MuiTextField-root': {
        bgcolor: '#ffffff',
        borderRadius: 1,
      },
    },
  };

  return (
    <Paper elevation={0} sx={formStyles.paper}>
      <Typography variant="h5" sx={formStyles.title}>
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
          sx={formStyles.textField}
        />
        <TextField
          fullWidth
          label="Số điện thoại"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
          required
          sx={formStyles.textField}
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
          sx={formStyles.textField}
        />
        <TextField
          fullWidth
          label="Ghi chú"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          margin="normal"
          multiline
          rows={2}
          sx={formStyles.textField}
        />

        <Typography variant="h6" sx={formStyles.subtitle}>
          Danh sách hàng hóa
        </Typography>

        <Box sx={formStyles.goodsBox}>
          <TextField
            label="Tên hàng"
            value={newGood.name}
            onChange={(e) => setNewGood({ ...newGood, name: e.target.value })}
            size="small"
            sx={formStyles.textField}
          />
          <TextField
            label="Số lượng"
            type="number"
            value={newGood.quantity}
            onChange={(e) => setNewGood({ ...newGood, quantity: Number(e.target.value) })}
            size="small"
            sx={{ ...formStyles.textField, width: 100 }}
          />
          <TextField
            label="Đơn giá"
            type="number"
            value={newGood.price}
            onChange={(e) => setNewGood({ ...newGood, price: Number(e.target.value) })}
            size="small"
            sx={{ ...formStyles.textField, width: 150 }}
          />
          <IconButton onClick={handleAddGood} title="Thêm hàng hóa" sx={formStyles.addButton}>
            <AddIcon />
          </IconButton>
        </Box>

        <List>
          {goods.map((good, index) => (
            <ListItem key={index} sx={formStyles.listItem}>
              <ListItemText
                primary={good.name}
                secondary={`Số lượng: ${good.quantity}, Đơn giá: ${formatPrice(good.price)}`}
              />
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  onClick={() => handleRemoveGood(index)} 
                  title="Xóa"
                  sx={formStyles.deleteButton}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={formStyles.submitButton}
          disabled={goods.length === 0 && !(newGood.name && newGood.quantity > 0 && newGood.price > 0)}
        >
          Tạo hóa đơn
        </Button>
      </Box>
    </Paper>
  );
}; 