/**
 * Official Invoice Generator for Gadget Hub Mart
 * Produces a sleek, compact single-page printable A4 receipt in 100% English
 * with embedded official brand logo.
 */

export interface InvoiceItem {
  productName: string;
  quantity: number;
  price?: number;
  priceBdt?: number;
  selectedColor?: string;
}

export interface InvoiceOrderData {
  orderId: string | number;
  customerName: string;
  phone: string;
  address: string;
  thana?: string;
  city?: string;
  deliveryZone?: string;
  deliveryChargeBdt?: number;
  subtotalBdt?: number;
  discountBdt?: number;
  totalBdt?: number;
  total?: number;
  date?: string;
  time?: string;
  status?: string;
  items: InvoiceItem[];
}

/**
 * Converts image to base64 Data URL so the downloaded invoice is 100% self-contained
 */
const getLogoDataUrl = async (): Promise<string> => {
  try {
    const res = await fetch('/favicon.jpeg');
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve('/favicon.jpeg');
      reader.readAsDataURL(blob);
    });
  } catch {
    return '/favicon.jpeg';
  }
};

/**
 * Downloads a single-page compact printable A4 invoice
 */
export const downloadOrderInvoice = async (order: any): Promise<boolean> => {
  if (!order) return false;

  // Format order data
  const rawId = String(order.id || order.orderId || 'GHM-100000');
  const formattedId = rawId.startsWith('GHM-') ? rawId : `GHM-${rawId.slice(0, 6).toUpperCase()}`;

  const customerName = order.customerName || 'Valued Customer';
  const phone = order.phone || 'N/A';
  const address = order.address || 'Dhaka, Bangladesh';
  const deliveryZone = order.deliveryZone || (address.toLowerCase().includes('dhaka') ? 'Inside Dhaka (৳80)' : 'Outside Dhaka (৳120)');
  const deliveryCharge = order.deliveryChargeBdt ?? (deliveryZone.includes('80') ? 80 : 120);

  // Normalize items
  const items: InvoiceItem[] = (order.items && order.items.length > 0)
    ? order.items.map((it: any) => {
        const qty = it.quantity || 1;
        const p = it.priceBdt ?? (it.price && it.price < 500 ? Math.round(it.price * 120) : Math.round(it.price || 0));
        return {
          productName: it.productName || it.name || 'Premium Tech Gadget',
          quantity: qty,
          priceBdt: p,
          selectedColor: it.selectedColor || it.color
        };
      })
    : [{
        productName: 'Gadget Hub Mart Tech Item',
        quantity: 1,
        priceBdt: Math.round(order.total < 500 ? order.total * 120 : (order.total || 1500)),
      }];

  const subtotal = order.subtotalBdt ?? items.reduce((sum, it) => sum + (it.priceBdt || 0) * (it.quantity || 1), 0);
  const discount = order.discountBdt || order.discount || 0;
  const grandTotal = order.totalBdt ?? (order.total < 500 ? Math.round(order.total * 120) : Math.round(order.total || (subtotal + deliveryCharge - discount)));

  const dateStr = order.date || new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = order.time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Get embedded logo data
  const logoSrc = await getLogoDataUrl();

  const invoiceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice-${formattedId} - Gadget Hub Mart</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 10mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    body {
      background: #f1f5f9;
      color: #0f172a;
      padding: 16px;
      line-height: 1.4;
      font-size: 12px;
    }
    .invoice-wrapper {
      max-width: 720px;
      margin: 0 auto;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 24px 28px;
      background: #ffffff;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0a192f;
      padding-bottom: 16px;
      margin-bottom: 14px;
    }
    .brand-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-logo-img {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      object-fit: cover;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      border: 1px solid #0284c7;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 900;
      color: #0a192f;
      letter-spacing: -0.5px;
      line-height: 1.1;
    }
    .brand-sub {
      font-size: 10px;
      color: #64748b;
      margin-top: 2px;
      font-weight: 600;
      letter-spacing: 0.3px;
      text-transform: uppercase;
    }
    .brand-contacts {
      font-size: 10.5px;
      color: #475569;
      margin-top: 3px;
    }
    .meta-box {
      text-align: right;
    }
    .meta-badge {
      display: inline-block;
      padding: 3px 10px;
      background: #0a192f;
      color: #38bdf8;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 1px;
      border-radius: 6px;
    }
    .meta-num {
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 14px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 4px;
    }
    .meta-date {
      font-size: 10px;
      color: #64748b;
      margin-top: 2px;
    }

    .barcode-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
      padding: 6px 12px;
      margin-bottom: 14px;
    }
    .barcode-text {
      font-size: 9.5px;
      color: #475569;
      font-weight: 700;
      letter-spacing: 0.3px;
    }
    .barcode-bars {
      display: flex;
      gap: 2.5px;
      height: 18px;
      align-items: center;
    }
    .bar {
      height: 100%;
      background: #0f172a;
      border-radius: 0.5px;
    }

    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 14px;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
    }
    .card-label {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #64748b;
      margin-bottom: 5px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
    }
    .card-val {
      font-size: 11px;
      color: #1e293b;
      margin-bottom: 2px;
      line-height: 1.35;
    }
    .badge {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 9.5px;
      font-weight: 800;
      background: #dcfce7;
      color: #15803d;
      border: 1px solid #bbf7d0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
    }
    th {
      background: #0a192f;
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      padding: 8px 10px;
      text-align: left;
    }
    th:first-child { border-radius: 6px 0 0 6px; text-align: center; width: 30px; }
    th:last-child { border-radius: 0 6px 6px 0; text-align: right; width: 100px; }
    td {
      padding: 8px 10px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 11px;
      color: #334155;
    }
    td:first-child { text-align: center; color: #64748b; }
    td:last-child { text-align: right; font-weight: 700; color: #0f172a; }

    .bottom-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 14px;
    }
    .policy-box {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 10px;
      color: #475569;
      line-height: 1.4;
    }
    .policy-title {
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      margin-bottom: 4px;
      font-size: 9.5px;
    }
    .totals-box {
      width: 250px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #64748b;
      margin-bottom: 5px;
    }
    .row.grand {
      border-top: 1.5px solid #cbd5e1;
      padding-top: 6px;
      margin-top: 6px;
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 900;
      color: #0f172a;
    }
    .row.grand span:last-child {
      color: #2563eb;
    }

    .footer {
      border-top: 1px dashed #cbd5e1;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #64748b;
      font-size: 9.5px;
    }
    .verified-seal {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 12px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 9999px;
      color: #1d4ed8;
      font-weight: 800;
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .sign-box {
      text-align: right;
    }
    .sign-line {
      width: 120px;
      border-top: 1px solid #94a3b8;
      margin-top: 16px;
      margin-left: auto;
      padding-top: 2px;
      font-size: 9px;
      font-weight: 700;
      color: #475569;
    }

    @media print {
      body { padding: 0; background: #fff; }
      .invoice-wrapper { border: none; padding: 0; box-shadow: none; max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="invoice-wrapper">
    
    <!-- Top Header with Official Favicon Logo -->
    <div class="header">
      <div class="brand-section">
        <img src="${logoSrc}" alt="Gadget Hub Mart Logo" class="brand-logo-img" />
        <div>
          <div class="brand-title">Gadget Hub Mart</div>
          <div class="brand-sub">Official Premium Tech & Electronics Store</div>
          <div class="brand-contacts">
            Helpline: +880 1835-985730 &bull; Web: www.gadgethubmart.bd &bull; Email: support@gadgethubmart.bd
          </div>
        </div>
      </div>
      <div class="meta-box">
        <div class="meta-badge">TAX INVOICE</div>
        <div class="meta-num">#${formattedId}</div>
        <div class="meta-date">Date: ${dateStr} (${timeStr})</div>
      </div>
    </div>

    <!-- Security & Verification Barcode Header -->
    <div class="barcode-strip">
      <div class="barcode-text">
        <span>SECURITY TOKEN: <strong>GHM-SEC-${Math.floor(100000 + Math.random() * 900000)}</strong> &bull; OFFICIAL CASH ON DELIVERY RECEIPT</span>
      </div>
      <div class="barcode-bars">
        <div class="bar" style="width: 2px;"></div>
        <div class="bar" style="width: 4px;"></div>
        <div class="bar" style="width: 1px;"></div>
        <div class="bar" style="width: 3px;"></div>
        <div class="bar" style="width: 1px;"></div>
        <div class="bar" style="width: 5px;"></div>
        <div class="bar" style="width: 2px;"></div>
        <div class="bar" style="width: 3px;"></div>
        <div class="bar" style="width: 1px;"></div>
        <div class="bar" style="width: 4px;"></div>
        <div class="bar" style="width: 2px;"></div>
      </div>
    </div>

    <!-- Customer & Logistics Details -->
    <div class="details-grid">
      <div class="card">
        <div class="card-label">Billed & Delivered To</div>
        <div class="card-val">Customer Name: <strong>${customerName}</strong></div>
        <div class="card-val">Mobile Phone: <strong>${phone}</strong></div>
        <div class="card-val">Delivery Address: ${address}</div>
      </div>
      <div class="card">
        <div class="card-label">Order & Logistics Information</div>
        <div class="card-val">Payment Method: <span class="badge">Cash on Delivery (COD)</span></div>
        <div class="card-val">Delivery Zone: <strong>${deliveryZone}</strong></div>
        <div class="card-val">Courier Partner: <strong>Steadfast Express Logistics</strong></div>
        <div class="card-val">Order Status: <strong>Confirmed & Processing</strong></div>
      </div>
    </div>

    <!-- Items Table -->
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Item Description & Specifications</th>
          <th style="width: 50px; text-align: center;">Qty</th>
          <th style="width: 90px; text-align: right;">Unit Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((it, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td>
              <strong style="color: #0f172a;">${it.productName}</strong>
              ${it.selectedColor ? `<span style="font-size: 10px; color: #64748b; margin-left: 6px;">[Color: ${it.selectedColor}]</span>` : ''}
              <div style="font-size: 9.5px; color: #94a3b8;">100% Genuine Brand Product &bull; 7 Days Replacement Warranty</div>
            </td>
            <td style="text-align: center; font-weight: bold;">${it.quantity}</td>
            <td style="text-align: right;">৳${(it.priceBdt || 0).toLocaleString()}</td>
            <td>৳${((it.priceBdt || 0) * it.quantity).toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Bottom Totals & Policies -->
    <div class="bottom-section">
      <div class="policy-box">
        <div class="policy-title">Terms & Customer Guarantee:</div>
        <p>&bull; 7 Days Replacement Warranty applicable for any manufacturing fault.</p>
        <p>&bull; Please inspect package and test products before handing payment to courier.</p>
        <p>&bull; For customer support, reach out via WhatsApp/Call at +880 1835-985730.</p>
      </div>

      <div class="totals-box">
        <div class="row">
          <span>Subtotal:</span>
          <span style="font-weight: bold; color: #0f172a;">৳${subtotal.toLocaleString()}</span>
        </div>
        <div class="row">
          <span>Delivery Charge:</span>
          <span style="font-weight: bold; color: #0f172a;">৳${deliveryCharge}</span>
        </div>
        ${discount > 0 ? `
          <div class="row" style="color: #16a34a;">
            <span>Coupon Discount:</span>
            <span style="font-weight: bold;">-৳${discount.toLocaleString()}</span>
          </div>
        ` : ''}
        <div class="row grand">
          <span>Total Payable:</span>
          <span>৳${grandTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Official Verified Footer -->
    <div class="footer">
      <div class="verified-seal">
        &check; Official Verified Cash On Delivery Invoice &bull; Gadget Hub Mart
      </div>
      <div class="sign-box">
        <div class="sign-line">Authorized Signatory</div>
      </div>
    </div>

  </div>
</body>
</html>`;

  // Silent in-page direct download
  const blob = new Blob([invoiceHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Invoice-${formattedId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
};
