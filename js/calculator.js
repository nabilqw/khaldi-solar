// ============================================================
// حاسبة الطاقة الشمسية - الخالدي
// ============================================================

// ===== انتظار تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('☀️ حاسبة الخالدي جاهزة!');
    
    // ===== التبويبات =====
    const tabs = document.querySelectorAll('.calc-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // إزالة التفعيل من جميع التبويبات
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // تفعيل التبويب الحالي
            this.classList.add('active');
            const target = document.getElementById(this.dataset.tab);
            if (target) target.classList.add('active');
        });
    });
    
    // ===== إضافة جهاز =====
    window.addDevice = function(name = '', watt = '', hours = '') {
        const container = document.getElementById('devices-container');
        if (!container) return;
        
        const div = document.createElement('div');
        div.className = 'device-item';
        div.innerHTML = `
            <input type="text" class="device-name" placeholder="اسم الجهاز" value="${name}" />
            <input type="number" class="device-watt" placeholder="الواط" value="${watt}" />
            <input type="number" class="device-hours" placeholder="ساعات" value="${hours}" />
            <button class="btn-remove-device" onclick="this.parentElement.remove()">✕</button>
        `;
        container.appendChild(div);
    };
    
    // ===== أجهزة افتراضية =====
    window.addPresetDevices = function() {
        const preset = [
            { name: 'مكيف (سبليت)', watt: 2000, hours: 8 },
            { name: 'ثلاجة (كبيرة)', watt: 300, hours: 24 },
            { name: 'إضاءة LED', watt: 50, hours: 8 },
            { name: 'تلفزيون LED', watt: 100, hours: 6 },
            { name: 'غسالة', watt: 500, hours: 2 }
        ];
        preset.forEach(d => addDevice(d.name, d.watt, d.hours));
    };
    
    // ===== إضافة أجهزة افتراضية عند التحميل =====
    addPresetDevices();
    
    // ===== زر الحساب =====
    const calcBtn = document.getElementById('calculate-btn');
    if (calcBtn) {
        calcBtn.addEventListener('click', function() {
            calculate();
        });
    }
});

// ===== دالة الحساب =====
function calculate() {
    // جلب الاستهلاك اليومي
    let dailyKwh = 0;
    const dailyInput = document.getElementById('daily-consumption');
    if (dailyInput) {
        dailyKwh = parseFloat(dailyInput.value) || 0;
    }
    
    // جلب الاستهلاك الشهري
    const monthlyInput = document.getElementById('monthly-consumption');
    if (monthlyInput && monthlyInput.value) {
        const monthly = parseFloat(monthlyInput.value) || 0;
        if (monthly > 0) dailyKwh = monthly / 30;
    }
    
    // جلب قيمة الفاتورة
    const billInput = document.getElementById('bill-amount');
    const priceInput = document.getElementById('kwh-price');
    if (billInput && priceInput) {
        const bill = parseFloat(billInput.value) || 0;
        const price = parseFloat(priceInput.value) || 150;
        if (bill > 0) dailyKwh = (bill / price) / 30;
    }
    
    // حساب من الأجهزة
    const deviceItems = document.querySelectorAll('.device-item');
    let deviceTotal = 0;
    deviceItems.forEach(item => {
        const watt = parseFloat(item.querySelector('.device-watt')?.value) || 0;
        const hours = parseFloat(item.querySelector('.device-hours')?.value) || 0;
        deviceTotal += watt * hours;
    });
    if (deviceTotal > 0) dailyKwh = deviceTotal / 1000;
    
    // التحقق من البيانات
    if (dailyKwh <= 0) {
        alert('⚠️ يرجى إدخال بيانات الاستهلاك');
        return;
    }
    
    // ===== حساب بسيط =====
    const panelPower = 700;
    const sunHours = 5.5;
    const efficiency = 0.80;
    
    const systemKW = dailyKwh / (sunHours * efficiency);
    const panelCount = Math.ceil((systemKW * 1000) / panelPower);
    const totalPanelWatt = panelCount * panelPower;
    const inverterKW = Math.ceil(systemKW * 1.3);
    const batteryKwh = dailyKwh * 2 / 0.8;
    const batteryAh = Math.ceil((batteryKwh * 1000) / 48);
    const totalCost = panelCount * 75000 + inverterKW * 50000 + batteryKwh * 450000 + 50000;
    
    // ===== عرض النتائج =====
    const container = document.getElementById('results-container');
    if (container) container.style.display = 'block';
    
    const grid = document.getElementById('results-grid');
    if (grid) {
        grid.innerHTML = `
            <div class="result-box">
                <span class="icon"><i class="fas fa-bolt"></i></span>
                <div class="value">${dailyKwh.toFixed(2)}</div>
                <div class="label">الاستهلاك اليومي (kWh)</div>
            </div>
            <div class="result-box">
                <span class="icon"><i class="fas fa-solar-panel"></i></span>
                <div class="value">${panelCount}</div>
                <div class="label">عدد الألواح</div>
            </div>
            <div class="result-box">
                <span class="icon"><i class="fas fa-microchip"></i></span>
                <div class="value">${inverterKW} kW</div>
                <div class="label">قدرة الإنفرتر</div>
            </div>
            <div class="result-box">
                <span class="icon"><i class="fas fa-battery-full"></i></span>
                <div class="value">${batteryAh} Ah</div>
                <div class="label">سعة البطارية</div>
            </div>
            <div class="result-box">
                <span class="icon"><i class="fas fa-money-bill-wave"></i></span>
                <div class="value">${totalCost.toLocaleString()}</div>
                <div class="label">التكلفة التقديرية (ريال)</div>
            </div>
        `;
    }
    
    // تفاصيل
    const details = document.getElementById('details-content');
    if (details) {
        details.innerHTML = `
            <ul>
                <li><strong>عدد الألواح:</strong> ${panelCount} لوح (قدرة ${totalPanelWatt} واط)</li>
                <li><strong>قدرة الإنفرتر:</strong> ${inverterKW} كيلوواط</li>
                <li><strong>سعة البطارية:</strong> ${batteryAh} أمبير/ساعة (48 فولت)</li>
                <li><strong>المساحة المطلوبة:</strong> ${(panelCount * 2.2).toFixed(1)} م²</li>
                <li><strong>التكلفة التقديرية:</strong> ${totalCost.toLocaleString()} ريال يمني</li>
            </ul>
            <p style="color: #64748b; font-size: 0.85rem; margin-top: 10px;">
                ⚠️ هذه حسابات تقريبية، يرجى التواصل مع فريقنا للحصول على عرض سعر دقيق.
            </p>
        `;
    }
    
    // ROI
    const roiValue = document.getElementById('roi-value');
    const roiDetails = document.getElementById('roi-details');
    if (roiValue) {
        const monthlySavings = dailyKwh * 30 * 150;
        const yearlySavings = monthlySavings * 12;
        const paybackYears = (totalCost / yearlySavings).toFixed(1);
        roiValue.textContent = `${paybackYears} سنة`;
        if (roiDetails) {
            roiDetails.innerHTML = `
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <span>التوفير الشهري: <strong>${monthlySavings.toLocaleString()} ريال</strong></span>
                    <span>التوفير السنوي: <strong>${yearlySavings.toLocaleString()} ريال</strong></span>
                </div>
            `;
        }
    }
    
    // تمرير للنتائج
    container.scrollIntoView({ behavior: 'smooth' });
}
