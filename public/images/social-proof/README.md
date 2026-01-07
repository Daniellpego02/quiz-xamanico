# Social Proof Images

## PIX Notifications

Add real PIX notification screenshots here to display in the offers page social proof section.

### Guidelines:

1. **Format**: PNG or JPG
2. **Size**: Recommended 600x400px minimum
3. **Content**: Screenshots of PIX notifications showing:
   - Payment received notifications
   - WhatsApp conversations about payments (with sensitive info obscured)
   - Bank app notifications
   
4. **Privacy**: Always obscure:
   - Full names (keep only first name)
   - CPF/CNPJ numbers
   - Full bank account numbers
   - Exact transaction IDs

### Example filenames:
- `pix-notification-1.png`
- `pix-notification-2.png`
- `whatsapp-payment-1.png`
- `bank-notification-1.png`

### Usage:

Once you add images here, update the `OfferNew.tsx` component to display them in the PIX notifications section (around line 887).

Replace the placeholder div with actual images:

```tsx
<div className="pix-notifications">
  <img src="/images/social-proof/pix-notification-1.png" alt="PIX Notification" className="rounded-lg shadow-lg" />
  <img src="/images/social-proof/pix-notification-2.png" alt="PIX Notification" className="rounded-lg shadow-lg" />
</div>
```
