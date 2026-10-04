/**
 * Professional Single-Page Invoice Generator for Gadget Hub Mart
 * Re-designed to match the exact clean, modern 1-page layout from customer specification:
 * - Bold Store Header & Subtitle ("Your Trusted Shopping Partner")
 * - Vibrant Orange "INVOICE" badge with #ID and Date
 * - Two-column Customer (Billed To) & Order Details layout
 * - Minimalist, elegant Items Table with light grey header
 * - Clear Subtotal, Delivery & Highlighted Orange Total
 * - Clean centered footer message ("Thank you for shopping with us!")
 * - Strict 1-Page print and PDF layout without page overflow
 */

export interface InvoiceItem {
  productName: string;
  quantity: number;
  price?: number;
  priceBdt?: number;
  selectedColor?: string;
}

export interface InvoiceOrderData {
  id?: string | number;
  orderId?: string | number;
  customerName?: string;
  phone?: string;
  address?: string;
  thana?: string;
  city?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  status?: string;
  deliveryZone?: string;
  deliveryChargeBdt?: number;
  subtotalBdt?: number;
  discountBdt?: number;
  totalBdt?: number;
  total?: number;
  date?: string;
  items?: InvoiceItem[];
}

const formatDate = (dateInput?: string): string => {
  try {
    if (!dateInput) {
      const now = new Date();
      return now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return dateInput;
    }
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '04 Oct 2026';
  }
};

/**
 * Downloads a single-page clean printable invoice
 */
export const downloadOrderInvoice = async (order: any): Promise<boolean> => {
  if (!order) return false;

  // Format Order ID
  const rawId = String(order.id || order.orderId || '').trim();
  let formattedId = rawId.replace(/^GHM-?/i, '');
  if (!formattedId) {
    formattedId = Math.random().toString(36).substring(2, 10).toUpperCase();
  } else {
    formattedId = formattedId.toUpperCase();
  }

  const customerName = order.customerName || 'Valued Customer';
  const phone = order.phone || '01XXXXXXXXX';
  const address = order.address || 'Chattogram, Bangladesh';
  const paymentMethod = String(order.paymentMethod || 'cod').toLowerCase();
  const paymentStatus = String(order.paymentStatus || 'pending').toLowerCase();
  const orderStatus = String(order.status || 'pending').toLowerCase();

  // Normalize items
  const items: InvoiceItem[] = (order.items && order.items.length > 0)
    ? order.items.map((it: any) => {
        const qty = it.quantity || 1;
        const p = it.priceBdt ?? Math.round(it.price || 0);
        return {
          productName: it.productName || it.name || 'Premium Tech Gadget',
          quantity: qty,
          priceBdt: p,
          selectedColor: it.selectedColor || it.color
        };
      })
    : [{
        productName: 'Gadget Hub Mart Item',
        quantity: 1,
        priceBdt: Math.round(order.total || 1330),
      }];

  const subtotal = order.subtotalBdt ?? items.reduce((sum, it) => sum + (it.priceBdt || 0) * (it.quantity || 1), 0);
  const deliveryCharge = order.deliveryChargeBdt ?? (order.deliveryZone?.includes('80') ? 80 : 120);
  const discount = order.discountBdt || order.discount || 0;
  const grandTotal = order.totalBdt ?? Math.round(order.total || (subtotal + deliveryCharge - discount));
  const dateStr = formatDate(order.date);

  const invoiceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice_${formattedId}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    html, body {
      background: #ffffff;
      color: #1e293b;
      font-size: 13px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      width: 100%;
      height: 100%;
    }
    .print-bar {
      background: #0f172a;
      color: #ffffff;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .print-btn {
      background: #ea580c;
      color: #ffffff;
      border: none;
      padding: 8px 18px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s;
    }
    .print-btn:hover {
      background: #c2410c;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 48px;
      background: #ffffff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    /* Header Row */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }
    .store-name {
      font-size: 24px;
      font-weight: 900;
      color: #0b1f3f;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      line-height: 1.1;
    }
    .store-sub {
      font-size: 11.5px;
      color: #64748b;
      margin-top: 4px;
      font-weight: 500;
    }
    .invoice-meta {
      text-align: right;
    }
    .invoice-title {
      font-size: 20px;
      font-weight: 900;
      color: #ea580c;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      line-height: 1.1;
    }
    .invoice-number {
      font-size: 12.5px;
      font-weight: 700;
      color: #475569;
      margin-top: 4px;
      letter-spacing: 0.3px;
    }
    .invoice-date {
      font-size: 11.5px;
      color: #64748b;
      margin-top: 2px;
    }

    /* Subtle Divider */
    .divider {
      height: 1px;
      background: #e2e8f0;
      margin-bottom: 28px;
    }

    /* Two-column Billed To & Order Details */
    .details-row {
      display: flex;
      justify-content: space-between;
      gap: 32px;
      margin-bottom: 32px;
    }
    .details-col {
      flex: 1;
    }
    .details-col h4 {
      font-size: 13px;
      font-weight: 800;
      color: #0b1f3f;
      margin-bottom: 8px;
    }
    .details-col p {
      font-size: 12px;
      color: #334155;
      line-height: 1.55;
      margin-bottom: 2px;
    }

    /* Table */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    thead tr {
      background: #f8fafc;
    }
    th {
      padding: 10px 14px;
      font-size: 12px;
      font-weight: 700;
      color: #334155;
      text-align: left;
    }
    th.col-qty {
      text-align: center;
      width: 15%;
    }
    th.col-price {
      text-align: right;
      width: 20%;
    }
    th.col-total {
      text-align: right;
      width: 20%;
    }
    tbody td {
      padding: 12px 14px;
      font-size: 12.5px;
      color: #334155;
      border-bottom: 1px solid #f1f5f9;
    }
    td.col-qty {
      text-align: center;
      color: #475569;
    }
    td.col-price {
      text-align: right;
      color: #475569;
    }
    td.col-total {
      text-align: right;
      font-weight: 600;
      color: #0f172a;
    }
    .item-name {
      font-weight: 600;
      color: #0f172a;
    }
    .item-meta {
      font-size: 11px;
      color: #64748b;
      margin-top: 2px;
    }

    /* Summary / Totals block */
    .summary-section {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 40px;
    }
    .summary-box {
      width: 290px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12.5px;
      color: #475569;
      margin-bottom: 7px;
    }
    .summary-row .label {
      font-weight: 500;
      color: #475569;
    }
    .summary-row .value {
      font-weight: 700;
      color: #0f172a;
      text-align: right;
    }
    .summary-divider {
      border-top: 2px solid #0f172a;
      margin: 10px 0 10px 0;
    }
    .summary-row.grand-total {
      font-size: 14.5px;
      font-weight: 900;
      color: #0f172a;
      margin-bottom: 0;
    }
    .summary-row.grand-total .value {
      font-size: 15.5px;
      font-weight: 900;
      color: #ea580c;
    }

    /* Footer message */
    .invoice-footer {
      text-align: center;
      padding-top: 30px;
      border-top: 1px solid #f1f5f9;
      margin-top: auto;
    }
    .footer-heading {
      font-size: 12px;
      color: #475569;
      font-weight: 500;
      margin-bottom: 3px;
    }
    .footer-sub {
      font-size: 11px;
      color: #64748b;
    }

    @media print {
      .print-bar {
        display: none !important;
      }
      body, html {
        background: #ffffff !important;
        padding: 0 !important;
      }
      .invoice-container {
        padding: 0 !important;
        max-width: 100% !important;
        min-height: auto !important;
      }
    }
  </style>
</head>
<body>

  <!-- Top Print Toolbar for browser view -->
  <div class="print-bar no-print">
    <div style="font-weight: 700; font-size: 13px; display: flex; align-items: center; gap: 8px;">
      <span>Gadget Hub Mart &bull; Invoice #${formattedId}</span>
    </div>
    <button class="print-btn" onclick="window.print()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
      Print / Save PDF
    </button>
  </div>

  <div class="invoice-container">
    <div>
      <!-- Header -->
      <div class="header">
        <div>
          <div class="store-name">Gadget Hub Mart</div>
          <div class="store-sub">Your Trusted Shopping Partner</div>
        </div>
        <div class="invoice-meta">
          <div class="invoice-title">INVOICE</div>
          <div class="invoice-number">#${formattedId}</div>
          <div class="invoice-date">Date: ${dateStr}</div>
        </div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Billed To & Order Details -->
      <div class="details-row">
        <div class="details-col">
          <h4>Billed To:</h4>
          <p style="font-weight: 700; color: #0f172a;">${customerName}</p>
          <p>${phone}</p>
          <p>${address}</p>
        </div>
        <div class="details-col">
          <h4>Order Details:</h4>
          <p><span style="color: #64748b;">Payment Method:</span> <strong style="text-transform: lowercase;">${paymentMethod}</strong></p>
          <p><span style="color: #64748b;">Payment Status:</span> <strong style="text-transform: lowercase;">${paymentStatus}</strong></p>
          <p><span style="color: #64748b;">Order Status:</span> <strong style="text-transform: lowercase;">${orderStatus}</strong></p>
        </div>
      </div>

      <!-- Items Table -->
      <table>
        <thead>
          <tr>
            <th>Item Description</th>
            <th class="col-qty">Quantity</th>
            <th class="col-price">Unit Price</th>
            <th class="col-total">Total</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(it => `
            <tr>
              <td>
                <div class="item-name">${it.productName}</div>
                ${it.selectedColor ? `<div class="item-meta">Color: ${it.selectedColor}</div>` : ''}
              </td>
              <td class="col-qty">${it.quantity}</td>
              <td class="col-price">BDT ${(it.priceBdt || 0).toLocaleString()}</td>
              <td class="col-total">BDT ${((it.priceBdt || 0) * it.quantity).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Summary / Totals -->
      <div class="summary-section">
        <div class="summary-box">
          <div class="summary-row">
            <span class="label">Subtotal:</span>
            <span class="value">BDT ${subtotal.toLocaleString()}</span>
          </div>
          ${deliveryCharge > 0 ? `
          <div class="summary-row">
            <span class="label">Delivery Charge:</span>
            <span class="value">BDT ${deliveryCharge.toLocaleString()}</span>
          </div>
          ` : ''}
          ${discount > 0 ? `
          <div class="summary-row" style="color: #16a34a;">
            <span class="label" style="color: #16a34a;">Discount:</span>
            <span class="value" style="color: #16a34a;">-BDT ${discount.toLocaleString()}</span>
          </div>
          ` : ''}
          <div class="summary-divider"></div>
          <div class="summary-row grand-total">
            <span class="label">Total:</span>
            <span class="value">BDT ${grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Centered Footer -->
    <div class="invoice-footer">
      <p class="footer-heading">Thank you for shopping with us!</p>
      <p class="footer-sub">If you have any questions about this invoice, please contact support.</p>
    </div>
  </div>

</body>
</html>`;

  // Direct download file
  const blob = new Blob([invoiceHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Invoice_${formattedId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
};
