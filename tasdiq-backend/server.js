const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://tasdiq.uz', 'https://www.tasdiq.uz'],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ MongoDB ulanish muvaffaqiyatli'))
  .catch((err) => console.error('❌ MongoDB xatosi:', err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    message: 'TASDIQ Backend ishlamoqda!'
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Yo\'nalish topilmadi' 
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Server xatosi' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ Server http://localhost:${PORT} da ishlamoqda`);
});