const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Verification = require('../models/Verification');
const smsService = require('../services/smsService');

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

router.post('/send-code', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber || !phoneNumber.match(/^\+998\d{9}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Noto\'g\'ri telefon raqam formati. (+998XXXXXXXXX)',
      });
    }

    const recentCode = await Verification.findOne({
      phoneNumber,
      createdAt: { $gte: new Date(Date.now() - 60000) }, // 1 daqiqa
    });

    if (recentCode) {
      return res.status(429).json({
        success: false,
        message: '1 daqiqa kutib, qayta urinib ko\'ring',
      });
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 60000); // 1 daqiqa

    const verification = new Verification({
      phoneNumber,
      code,
      expiresAt,
    });
    await verification.save();

    try {
      await smsService.sendVerificationCode(phoneNumber, code);
    } catch (smsError) {
      console.error('SMS xatosi:', smsError);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`📱 DEVELOPMENT - Verification code for ${phoneNumber}: ${code}`);
      }
    }

    res.json({
      success: true,
      message: 'Tasdiqlash kodi yuborildi',
      ...(process.env.NODE_ENV === 'development' && { code }),
    });
  } catch (error) {
    console.error('Send code error:', error);
    res.status(500).json({
      success: false,
      message: 'Xatolik yuz berdi',
    });
  }
});

router.post('/verify-code', async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
      return res.status(400).json({
        success: false,
        message: 'Telefon raqam va kod talab qilinadi',
      });
    }

    const verification = await Verification.findOne({
      phoneNumber,
      code,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!verification) {
      return res.status(400).json({
        success: false,
        message: 'Noto\'g\'ri yoki muddati tugagan kod',
      });
    }

    verification.isUsed = true;
    await verification.save();

    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = new User({
        phoneNumber,
        isVerified: true,
      });
      await user.save();
    } else {
      user.isVerified = true;
      await user.save();
    }

    res.json({
      success: true,
      message: 'Ro\'yxatdan o\'tish muvaffaqiyatli!',
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Verify code error:', error);
    res.status(500).json({
      success: false,
      message: 'Xatolik yuz berdi',
    });
  }
});

router.get('/user/:phoneNumber', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.params.phoneNumber });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi',
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Xatolik yuz berdi',
    });
  }
});

module.exports = router;