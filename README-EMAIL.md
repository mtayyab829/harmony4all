# Quick Email Setup Guide

## 🚀 Quick Start

1. **Get Brevo API Key**
   - Sign up at [https://www.brevo.com/](https://www.brevo.com/)
   - Go to Settings → API Keys
   - Create new API key with "Transactional Email" permissions

2. **Create Environment File**
   ```bash
   # In frontend directory, create .env.local
   BREVO_API_KEY=your_api_key_here
   ADMIN_EMAIL=your_email@example.com
   ```

3. **Test Email Service**
   ```bash
   # Install dependencies
   npm install
   
   # Test email functionality
   node scripts/test-email.js
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📧 Forms That Send Emails

- ✅ **Contact Form** - Admin notification + User confirmation
- ✅ **Newsletter Subscription** - Admin notification only  
- ✅ **Welcome Popup** - Admin notification + User confirmation

## 🔧 Troubleshooting

- **"API key not found"** → Check `.env.local` file exists and has correct API key
- **Emails not sending** → Verify Brevo account is active and API key has proper permissions
- **Environment not loading** → Restart development server after adding `.env.local`

## 📖 Full Documentation

See `EMAIL_SETUP.md` for detailed setup instructions and troubleshooting.

