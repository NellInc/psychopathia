# Contact Form Deployment Package
**For Psychopathia Machinalis Sister Sites**

This package contains everything needed to implement the working contact form from the main Psychopathia Machinalis site on sister websites using the same template.

## 🚨 IMPORTANT: Current Configuration Details

**Formspree Account**: This form currently sends to:
- Primary: `nell@nellwatson.com` 
- Secondary: `a.g.hessami@gmail.com`
- **Formspree Form ID**: `myzjkypd`
- **Form URL**: `https://formspree.io/f/myzjkypd`

## 📋 What You Need To Do

### Step 1: Create New Formspree Form
1. Go to [Formspree.io](https://formspree.io)
2. Sign up/login with your account
3. Create a new form
4. **Replace the recipient emails** with the appropriate emails for your sister site
5. **Note down your new Form ID** (it will look like `abc123def`)

### Step 2: Deploy the HTML Code

Replace your current contact section with this complete HTML:

```html
<!-- Contact Section -->
<div class="container blog main gray">
    <h1>Contact Us</h1>
    <p class="text" style="text-align: center; margin-bottom: 40px;">
        We welcome feedback, questions, and collaborative opportunities related to the [YOUR SITE NAME] framework.
    </p>
    
    <form class="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID_HERE" method="POST">
        <input type="hidden" name="_subject" value="[YOUR SITE NAME] Inquiry">
        
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name..." required>

        <label for="email">E-Mail</label>
        <input type="email" id="email" name="email" placeholder="Your email..." required>

        <label for="message">Message</label>
        <textarea id="message" name="message" placeholder="Write something..." style="height: 200px;" required></textarea>

        <div style="text-align: center;">
            <button type="submit" class="send-button">Send Message <i class="fa-solid fa-paper-plane"></i></button>
        </div>
    </form>
</div>
```

**🔧 CUSTOMIZE THESE:**
- Replace `YOUR_FORMSPREE_ID_HERE` with your new Formspree form ID
- Replace `[YOUR SITE NAME]` with your actual site name (2 places)

### Step 3: Add the CSS Styling

Add this CSS to your site's stylesheet (or create a new CSS file):

```css
/* Contact Form Styling */
.contact-form {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
    background: rgba(44, 62, 80, 0.02);
    border-radius: 12px;
    border: 1px solid rgba(44, 62, 80, 0.1);
    box-shadow: 0 4px 12px rgba(44, 62, 80, 0.08);
}

.contact-form label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    margin-top: 20px;
    color: #2c3e50;
    font-size: 1.1em;
}

.contact-form label:first-child {
    margin-top: 0;
}

.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 15px 18px;
    margin-bottom: 20px;
    border: 2px solid rgba(44, 62, 80, 0.15);
    border-radius: 8px;
    font-size: 1em;
    font-family: inherit;
    background: #ffffff;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.contact-form input:focus,
.contact-form textarea:focus {
    outline: none;
    border-color: #2c3e50;
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
    background: #fafbfc;
}

.contact-form textarea {
    resize: vertical;
    min-height: 120px;
    line-height: 1.6;
}

.send-button {
    background: #2c3e50;
    color: white;
    padding: 16px 32px;
    font-size: 1.1em;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(44, 62, 80, 0.2);
}

.send-button:hover {
    background: #34495e;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
}

.send-button:active {
    transform: translateY(0px);
    box-shadow: 0 2px 6px rgba(44, 62, 80, 0.2);
}

.send-button i {
    margin-left: 8px;
}

/* Mobile responsive for contact form */
@media (max-width: 768px) {
    .contact-form {
        padding: 30px 20px;
        margin: 0 10px;
    }
    
    .contact-form input,
    .contact-form textarea {
        padding: 12px 15px;
    }
    
    .send-button {
        padding: 14px 28px;
        font-size: 1em;
    }
}
```

### Step 4: Ensure FontAwesome is Loaded

The send button uses a FontAwesome paper plane icon. Make sure this is in your HTML `<head>`:

```html
<link href="assets/fontawesome-free-6.6.0-web/css/all.min.css" rel="stylesheet">
```

Or use the CDN version:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

## 🎯 What This Gives You

✅ **Professional contact form** with navy theme matching your site  
✅ **Spam protection** via Formspree  
✅ **Mobile responsive** design  
✅ **Email notifications** to your specified addresses  
✅ **Form validation** with required fields  
✅ **Beautiful animations** and hover effects  
✅ **No PHP required** - works on GitHub Pages or any static host  

## 🧪 Testing Your Form

1. **Deploy the code** with your Formspree ID
2. **Submit a test message** through the form
3. **Check your email** for the notification
4. **Verify in Formspree dashboard** that the submission was received

## 🔧 Customization Options

### Change Color Scheme
To match different site themes, update these CSS variables:
- `#2c3e50` = Navy blue (primary color)
- `rgba(44, 62, 80, 0.X)` = Navy with transparency
- `#34495e` = Darker navy (hover state)

### Add Custom Fields
To add more form fields, follow this pattern:
```html
<label for="company">Company</label>
<input type="text" id="company" name="company" placeholder="Your company...">
```

### Customize Subject Line
Change the hidden subject field:
```html
<input type="hidden" name="_subject" value="Your Custom Subject Here">
```

## 🚨 Important Notes

1. **Formspree Free Tier**: 50 submissions/month. Upgrade if you need more.
2. **Form Security**: Formspree handles spam protection automatically.
3. **GDPR Compliance**: Formspree is GDPR compliant for EU users.
4. **No JavaScript Required**: This is a pure HTML form solution.

## 🛠️ Troubleshooting

**Form not working?**
- Check your Formspree form ID is correct
- Verify the form action URL matches your Formspree form
- Ensure required fields (name, email, message) are present

**Not receiving emails?**
- Check spam folder
- Verify email addresses in Formspree dashboard
- Confirm form is properly submitted (check Formspree submissions)

**Styling issues?**
- Ensure CSS is properly loaded
- Check for CSS conflicts with existing styles
- Verify FontAwesome is loaded for the send button icon

## 📞 Support

If you need help implementing this:
1. Check Formspree documentation: https://formspree.io/guides
2. Verify all placeholders are replaced with your actual values
3. Test the form thoroughly before going live

---

**Deployment Summary:**
1. ✅ Create new Formspree form
2. ✅ Replace HTML with your form ID and site name
3. ✅ Add CSS styling
4. ✅ Ensure FontAwesome is loaded
5. ✅ Test the form
6. ✅ Go live!

This package gives you the exact same professional contact form functionality as the main Psychopathia Machinalis site. 