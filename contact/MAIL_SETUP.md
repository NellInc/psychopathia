# Contact Form Mail Server Setup Guide

## Current Status
✅ **Updated**: Email addresses set to `nell@nellwatson.com` and `a.g.hessami@gmail.com`

## Option 1: Use Your Web Host's Mail Server (Simplest)

If your web hosting provider includes mail services:

1. **Check with your host** if they have a mail server configured
2. **Use the current `send.php`** - it should work as-is
3. **Test the form** after uploading to your live server

## Option 2: Use SMTP Service (Recommended)

For better reliability, use an SMTP service:

### Using Gmail SMTP:
1. **Enable 2-Factor Authentication** on a Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Download PHPMailer**:
   ```bash
   composer require phpmailer/phpmailer
   ```
   Or download manually from: https://github.com/PHPMailer/PHPMailer
4. **Update `send_smtp.php`** with your credentials
5. **Change form action** in Index.html to `contact/send_smtp.php`

### Using SendGrid (100 emails/day free):
1. **Sign up** at sendgrid.com
2. **Get API key** from dashboard
3. **Modify script** to use SendGrid API instead of SMTP

## Option 3: Contact Form Services (No coding required)

Alternative services that handle everything:

- **Netlify Forms** (if hosting on Netlify)
- **Formspree** (formspree.io)
- **EmailJS** (emailjs.com)
- **Typeform** (typeform.com)

## Testing

1. **Test locally** won't work (needs real mail server)
2. **Upload to live server** and test there
3. **Check spam folders** for test emails
4. **Monitor server logs** for any PHP errors

## Files Included

- `send.php` - Simple version using PHP mail() function
- `send_smtp.php` - Advanced version using SMTP (requires PHPMailer)
- `style.css` - Contact form styling (already integrated into main CSS)

## Need Help?

Most web hosting providers can help configure mail settings. Contact your host's support if the simple version doesn't work. 