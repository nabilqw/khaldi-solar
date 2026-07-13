// ============================================================
// مولد تقرير PDF - الخالدي للطاقة الشمسية
// ============================================================

class PDFGenerator {
    constructor() {
        this.engineer = null;
        try {
            this.engineer = new SolarEngineer();
        } catch(e) {
            console.warn('SolarEngineer not available');
        }
    }

    // ===== توليد التقرير كـ HTML =====
    generateReportHTML(result, input) {
        const s = result.system;
        const v = result.voltage;
        const c = result.cables;
        const p = result.protection;
        const cost = result.cost;
        const products = result.products;

        return `
            <!DOCTYPE html>
            <html dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>تقرير النظام الشمسي</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 20px; background: white; color: #1e293b; }
                    .header { text-align: center; border-bottom: 3px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px; }
                    .header h1 { color: #f59e0b; font-size: 28px; margin: 0; }
                    .header p { color: #64748b; margin: 5px 0; }
                    .section { margin-bottom: 25px; }
                    .section-title { background: #f1f5f9; padding: 10px 15px; border-radius: 8px; font-weight: bold; color: #1e293b; margin-bottom: 15px; }
                    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; }
                    .info-box { background: #f8fafc; padding: 12px 16px; border-radius: 6px; border-right: 3px solid #f59e0b; }
                    .info-box .label { font-size: 12px; color: #64748b; }
                    .info-box .value { font-size: 18px; font-weight: bold; color: #1e293b; }
                    .table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                    .table th { background: #1e293b; color: white; padding: 10px; text-align: right; }
                    .table td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
                    .table tr:nth-child(even) { background: #f8fafc; }
                    .total-box { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
                    .total-box .big { font-size: 32px; font-weight: 800; }
                    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; margin-top: 30px; color: #64748b; font-size: 12px; }
                    .roi-box { background: #22c55e; color: white; padding: 15px 20px; border-radius: 8px; margin-top: 15px; }
                    .warning { background: #fee2e2; color: #dc2626; padding: 10px 15px; border-radius: 6px; margin: 10px 0; }
                    .success { background: #dcfce7; color: #16a34a; padding: 10px 15px; border-radius: 6px; margin: 10px 0; }
                    @media print { body { padding: 10px; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>☀️ الخالدي للطاقة الشمسية</h1>
                    <p>تقرير تصميم النظام الشمسي</p>
                    <p style="font-size: 14px;">تاريخ التقرير: ${new Date().toLocaleDateString('ar-EG')}</p>
                </div>

                <div class="section">
                    <div class="section-title">📋 بيانات العميل</div>
                    <div class="grid-3">
                        <div class="info-box">
                            <div class="label">المدينة</div>
                            <div class="value">${input.city}</div>
                        </div>
                        <div class="info-box">
                            <div class="label">اتجاه السطح</div>
                            <div class="value">${input.direction}</div>
                        </div>
                        <div class="info-box">
                            <div class="label">الظل</div>
                            <div class="value">${input.shadow}</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">⚡ ملخص النظام</div>
                    <div class="grid-3">
                        <div class="info-box">
                            <div class="label">الاستهلاك اليومي</div>
                            <div class="value">${s.dailyConsumption} kWh</div>
                        </div>
                        <div class="info-box">
                            <div class="label">حجم النظام</div>
                            <div class="value">${s.systemKW} kW</div>
                        </div>
                        <div class="info-box">
                            <div class="label">الحمل اللحظي</div>
                            <div class="value">${s.peakLoad} W</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">🟦 الألواح الشمسية</div>
                    <div class="grid-3">
                        <div class="info-box">
                            <div class="label">الموديل</div>
                            <div class="value">${products.panel.brand} ${products.panel.model}</div>
                        </div>
                        <div class="info-box">
                            <div class="label">عدد الألواح</div>
                            <div class="value">${s.panelCount} لوح</div>
                        </div>
                        <div class="info-box">
                            <div class="label">القدرة الكلية</div>
                            <div class="value">${s.totalPanelWatt} W</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">🔌 الإنفرتر</div>
                    <div class="grid-3">
                        <div class="info-box">
                            <div class="label">الموديل</div>
                            <div class="value">${products.inverter.brand} ${products.inverter.model}</div>
                        </div>
                        <div class="info-box">
                            <div class="label">القدرة</div>
                            <div class="value">${products.inverter.power / 1000} kW</div>
                        </div>
                        <div class="info-box">
                            <div class="label">عدد MPPT</div>
                            <div class="value">${products.inverter.mppt}</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">🔋 البطاريات</div>
                    <div class="grid-3">
                        <div class="info-box">
                            <div class="label">الموديل</div>
                            <div class="value">${products.battery.brand} ${products.battery.model}</div>
                        </div>
                        <div class="info-box">
                            <div class="label">عدد البطاريات</div>
                            <div class="value">${s.batteryCount} وحدة</div>
                        </div>
                        <div class="info-box">
                            <div class="label">السعة الكلية</div>
                            <div class="value">${s.totalBatteryKwh} kWh</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">💰 التكلفة والعائد</div>
                    <div class="roi-box">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                            <div>
                                <div style="font-size: 14px; opacity: 0.9;">العائد السنوي</div>
                                <div style="font-size: 32px; font-weight: 800;">${cost.yearlySavings.toLocaleString()} ريال</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 14px; opacity: 0.9;">فترة الاسترداد</div>
                                <div style="font-size: 28px; font-weight: 800;">${cost.paybackYears} سنة</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 14px; opacity: 0.9;">ROI</div>
                                <div style="font-size: 28px; font-weight: 800;">${cost.roi}%</div>
                            </div>
                        </div>
                        <div style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px; display: flex; justify-content: space-between; flex-wrap: wrap;">
                            <span>التكلفة الإجمالية: <strong>${cost.totalCost.toLocaleString()} ريال</strong></span>
                            <span>التوفير الشهري: <strong>${cost.monthlySavings.toLocaleString()} ريال</strong></span>
                        </div>
                    </div>
                </div>

                <div class="footer">
                    <p>هذا التقرير تم إنشاؤه بواسطة نظام الخالدي للطاقة الشمسية</p>
                    <p style="color: #94a3b8;">للتواصل: info@khaldi-solar.com | ☎️ 0123456789</p>
                </div>
            </body>
            </html>
        `;
    }

    // ===== تحميل التقرير كـ PDF (طباعة) =====
    downloadPDF(result, input) {
        const html = this.generateReportHTML(result, input);
        const win = window.open('', '_blank');
        if (win) {
            win.document.write(html);
            win.document.close();
            setTimeout(() => { win.print(); }, 500);
        } else {
            alert('⚠️ يرجى السماح للنوافذ المنبثقة');
        }
    }

    // ===== تحميل التقرير كـ HTML =====
    downloadHTML(result, input) {
        const html = this.generateReportHTML(result, input);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `تقرير_الطاقة_الشمسية_${new Date().toISOString().slice(0,10)}.html`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

if (typeof module !== 'undefined') {
    module.exports = PDFGenerator;
}