const axios = require("axios");

class SMSService {
  constructor() {
    this.baseURL = "https://notify.eskiz.uz/api";
    this.token = null;
    this.tokenExpiry = null;
  }
  async login() {
    try {
      const email = process.env.ESKIZ_EMAIL;
      const password = process.env.ESKIZ_PASSWORD;

      console.log("\n🔍 DEBUG - .env dan o'qilgan:");
      console.log("Email:", email);
      console.log("Parol uzunligi:", password?.length);

      if (!email || !password) {
        console.error("❌ Email yoki parol mavjud emas!\n");
        return false;
      }

      console.log("\n🔑 Eskiz.uz ga login qilinmoqda...");

      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        `${this.baseURL}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Eskiz javobi:", response.data);

      if (response.data.data && response.data.data.token) {
        this.token = response.data.data.token;
        this.tokenExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
        console.log("✓ Eskiz.uz token olindi");
        console.log(
          "📝 Token boshlanishi:",
          this.token.substring(0, 30) + "...\n"
        );
        return true;
      }

      console.error("❌ Token topilmadi, javob:", response.data);
      return false;
    } catch (error) {
      console.error("❌ Eskiz login xatosi:");
      console.error("  Status:", error.response?.status);
      console.error("  Data:", error.response?.data || error.message);
      console.log("\n💡 Iltimos tekshiring:");
      console.log(
        "1. Eskiz.uz saytida shu email/parol bilan login qila olasizmi?"
      );
      console.log(
        "2. .env dagi ESKIZ_EMAIL / ESKIZ_PASSWORD da qo‘shtirnoq va bo‘sh joy yo‘qligini:"
      );
      console.log("   ESKIZ_EMAIL=your@mail.uz");
      console.log("   ESKIZ_PASSWORD=your_secret_password\n");
      return false;
    }
  }
  async ensureValidToken() {
    if (!this.token || (this.tokenExpiry && Date.now() >= this.tokenExpiry)) {
      return await this.login();
    }
    return true;
  }

  async sendSMS(phoneNumber, message) {
    try {
      console.log("📱 SMS yuborilmoqda:");
      console.log("  Raqam:", phoneNumber);
      console.log("  Xabar:", message);

      const hasToken = await this.ensureValidToken();
      if (!hasToken) {
        throw new Error("Token olishda xatolik");
      }

      const formData = new URLSearchParams();
      formData.append("mobile_phone", phoneNumber);
      formData.append("message", message);
      formData.append("from", "4546");

      const response = await axios.post(
        `${this.baseURL}/message/sms/send`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      console.log("✓ SMS muvaffaqiyatli yuborildi!");
      console.log("  SMS ID:", response.data.id);
      console.log("  Status:", response.data.status, "\n");

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("❌ SMS yuborish xatosi:");
      console.error("  Status:", error.response?.status);
      console.error(
        "  Data:",
        JSON.stringify(error.response?.data, null, 2),
        "\n"
      );

      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

  async sendVerificationCode(phoneNumber, code) {
    const isTestMode = process.env.NODE_ENV === "development";

    let message;
    if (isTestMode) {
      message = "Bu Eskiz dan test";
    } else {
      message = `TASDIQ tasdiqlash kodi: ${code}. Bu kod 1 daqiqa amal qiladi.`;
    }

    return await this.sendSMS(phoneNumber, message);
  }

//   async sendVerificationCode(phoneNumber, code) {
//   const message = `Bu Eskiz dan test. Kod: ${code}`;
  
//   return await this.sendSMS(phoneNumber, message);
// }
}

module.exports = new SMSService();
