// ============================================================
// حاسبة الطاقة الشمسية الاحترافية - الخالدي للطاقة الشمسية
// ============================================================

<<<<<<< HEAD
// ===== التحقق من تحميل المكتبات =====
if (typeof SOLAR_DATABASE === 'undefined') {
    console.error('❌ SOLAR_DATABASE غير محمل!');
}

if (typeof SolarEngineer === 'undefined') {
    console.error('❌ SolarEngineer غير محمل!');
}

// ===== إنشاء كائنات =====
const engineer = new SolarEngineer();
const pdfGen = new PDFGenerator();

// ===== متغيرات الحالة =====
let currentResult = null;
let currentInput = null;
let devicesList = [];

// ===== قائمة الأجهزة الافتراضية =====
const PRESET_DEVICES = [
    { name: 'مكيف (سبليت)', watt: 2000, hours: 8 },
    { name: 'مكيف (شباك)', watt: 1500, hours: 6 },
    { name: 'ثلاجة (كبيرة)', watt: 300, hours: 24 },
    { name: 'ثلاجة (صغيرة)', watt: 180, hours: 24 },
    { name: 'غسالة', watt: 500, hours: 2 },
    { name: 'مجفف', watt: 800, hours: 1 },
    { name: 'تلفزيون LED', watt: 100, hours: 6 },
    { name: 'تلفزيون LCD', watt: 150, hours: 4 },
    { name: 'إضاءة LED', watt: 50, hours: 8 },
    { name: 'إضاءة عادية', watt: 100, hours: 6 },
    { name: 'حاسوب محمول', watt: 65, hours: 4 },
    { name: 'حاسوب مكتبي', watt: 200, hours: 4 },
    { name: 'شاحن هاتف', watt: 20, hours: 6 },
    { name: 'ميكروويف', watt: 1000, hours: 1 },
    { name: 'غلاية كهربائية', watt: 2000, hours: 0.5 },
    { name: 'طباخ كهربائي', watt: 3000, hours: 1 },
    { name: 'مضخة ماء', watt: 500, hours: 3 },
    { name: 'مكنسة كهربائية', watt: 800, hours: 1 },
    { name: 'مروحة', watt: 100, hours: 10 },
    { name: 'سخان ماء', watt: 1500, hours: 2 }
];

// ===== التبويبات =====
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.calc-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });
});

// ===== إضافة جهاز =====
function addDevice(name = '', watt = '', hours = '') {
    const container = document.getElementById('devices-container');
    if (!container) return;
    
    const div = document.createElement('div');
    div.className = 'device-item';
    div.innerHTML = `
        <select class="device-preset" onchange="loadDevicePreset(this)">
            <option value="">-- اختر جهاز --</option>
            ${PRESET_DEVICES.map(d => `<option value="${d.name}|${d.watt}|${d.hours}">${d.name} (${d.watt}W)</option>`).join('')}
        </select>
        <input type="text" class="device-name" placeholder="اسم الجهاز" value="${name}" />
        <input type="number" class="device-watt" placeholder="الواط" value="${watt}" />
        <input type="number" class="device-hours" placeholder="ساعات" value="${hours}" />
        <button class="btn-remove-device" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}

// ===== تحميل بيانات جهاز من القائمة =====
function loadDevicePreset(select) {
    const item = select.closest('.device-item');
    if (!item || !select.value) return;
    const parts = select.value.split('|');
    item.querySelector('.device-name').value = parts[0];
    item.querySelector('.device-watt').value = parts[1];
    item.querySelector('.device-hours').value = parts[2];
    select.value = '';
}

// ===== إضافة أجهزة افتراضية =====
function addPresetDevices() {
    const preset = [
        { name: 'مكيف (سبليت)', watt: 2000, hours: 8 },
        { name: 'ثلاجة (كبيرة)', watt: 300, hours: 24 },
        { name: 'إضاءة LED', watt: 50, hours: 8 },
        { name: 'تلفزيون LED', watt: 100, hours: 6 },
        { name: 'غسالة', watt: 500, hours: 2 }
    ];
    preset.forEach(d => addDevice(d.name, d.watt, d.hours));
}

// ===== زر الحساب =====
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('calculate-btn');
    if (btn) {
        btn.addEventListener('click', calculate);
    }
});

=======
// ===== المعايير الافتراضية =====
const SOLAR = {
    sunHours: 5.5,
    systemEfficiency: 0.80,
    panelPower: 700,
    batteryVoltage: 48,
    batteryDOD: 0.80,
    batteryDays: 2,
    expansionPercent: 20,
    cableLoss: 0.03,
    batteryType: 'lithium',
    systemType: 'off-grid',
    hasGenerator: false,
    panelDirection: 'south',
    panelTilt: 20
};

// ===== قائمة الأجهزة الافتراضية =====
const PRESET_DEVICES = [
    { name: 'مكيف (سبليت)', watt: 2000, hours: 8 },
    { name: 'مكيف (شباك)', watt: 1500, hours: 6 },
    { name: 'ثلاجة (كبيرة)', watt: 300, hours: 24 },
    { name: 'ثلاجة (صغيرة)', watt: 180, hours: 24 },
    { name: 'غسالة', watt: 500, hours: 2 },
    { name: 'مجفف', watt: 800, hours: 1 },
    { name: 'تلفزيون LED', watt: 100, hours: 6 },
    { name: 'تلفزيون LCD', watt: 150, hours: 4 },
    { name: 'إضاءة LED', watt: 50, hours: 8 },
    { name: 'إضاءة عادية', watt: 100, hours: 6 },
    { name: 'حاسوب محمول', watt: 65, hours: 4 },
    { name: 'حاسوب مكتبي', watt: 200, hours: 4 },
    { name: 'شاحن هاتف', watt: 20, hours: 6 },
    { name: 'ميكروويف', watt: 1000, hours: 1 },
    { name: 'غلاية كهربائية', watt: 2000, hours: 0.5 },
    { name: 'طباخ كهربائي', watt: 3000, hours: 1 },
    { name: 'مضخة ماء', watt: 500, hours: 3 },
    { name: 'مكنسة كهربائية', watt: 800, hours: 1 },
    { name: 'مروحة', watt: 100, hours: 10 },
    { name: 'سخان ماء', watt: 1500, hours: 2 }
];

// ===== الأجهزة المضافة =====
let devices = [];

// ===== التبويبات =====
document.querySelectorAll('.calc-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(this.dataset.tab).classList.add('active');
    });
});

// ===== إضافة جهاز =====
function addDevice(name = '', watt = '', hours = '') {
    const container = document.getElementById('devices-container');
    const div = document.createElement('div');
    div.className = 'device-item';
    div.innerHTML = `
        <select class="device-preset" onchange="loadDevicePreset(this)">
            <option value="">-- اختر جهاز --</option>
            ${PRESET_DEVICES.map(d => `<option value="${d.name}|${d.watt}|${d.hours}">${d.name} (${d.watt}W)</option>`).join('')}
        </select>
        <input type="text" class="device-name" placeholder="اسم الجهاز" value="${name}" />
        <input type="number" class="device-watt" placeholder="الواط" value="${watt}" />
        <input type="number" class="device-hours" placeholder="ساعات" value="${hours}" />
        <button class="btn-remove-device" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}

// ===== تحميل بيانات جهاز من القائمة =====
function loadDevicePreset(select) {
    const item = select.closest('.device-item');
    if (!select.value) return;
    const parts = select.value.split('|');
    item.querySelector('.device-name').value = parts[0];
    item.querySelector('.device-watt').value = parts[1];
    item.querySelector('.device-hours').value = parts[2];
    select.value = '';
}

// ===== إضافة أجهزة افتراضية =====
function addPresetDevices() {
    const preset = [
        { name: 'مكيف (سبليت)', watt: 2000, hours: 8 },
        { name: 'ثلاجة (كبيرة)', watt: 300, hours: 24 },
        { name: 'إضاءة LED', watt: 50, hours: 8 },
        { name: 'تلفزيون LED', watt: 100, hours: 6 },
        { name: 'غسالة', watt: 500, hours: 2 }
    ];
    preset.forEach(d => addDevice(d.name, d.watt, d.hours));
}

// ===== زر الحساب =====
document.getElementById('calculate-btn').addEventListener('click', function() {
    calculate();
});

>>>>>>> 8a87fc6e7d911dbd0ebac0fd4f0c0103cb03d493
// ===== الحساب الرئيسي =====
function calculate() {
    // ===== 1. جلب المدخلات =====
    let dailyKwh = 0;
    
    // 1.1 من الاستهلاك اليومي
    const dailyInput = parseFloat(document.getElementById('daily-consumption').value);
    if (!isNaN(dailyInput) && dailyInput > 0) {
        dailyKwh = dailyInput;
    }
    
    // 1.2 من الاستهلاك الشهري
    const monthlyInput = parseFloat(document.getElementById('monthly-consumption').value);
    if (!isNaN(monthlyInput) && monthlyInput > 0) {
        dailyKwh = monthlyInput / 30;
    }
    
    // 1.3 من قيمة الفاتورة
    const billAmount = parseFloat(document.getElementById('bill-amount').value);
    const kwhPrice = parseFloat(document.getElementById('kwh-price').value);
    if (!isNaN(billAmount) && billAmount > 0 && !isNaN(kwhPrice) && kwhPrice > 0) {
        dailyKwh = (billAmount / kwhPrice) / 30;
    }
    
    // 1.4 من الأجهزة
    const deviceItems = document.querySelectorAll('.device-item');
<<<<<<< HEAD
    let devices = [];
    if (deviceItems.length > 0) {
        let totalWh = 0;
        deviceItems.forEach(item => {
            const name = item.querySelector('.device-name')?.value || 'جهاز';
            const watt = parseFloat(item.querySelector('.device-watt')?.value) || 0;
            const hours = parseFloat(item.querySelector('.device-hours')?.value) || 0;
            if (watt > 0 && hours > 0) {
                devices.push({ name, watt, hours });
                totalWh += watt * hours;
            }
        });
        if (devices.length > 0) {
            dailyKwh = totalWh / 1000;
        }
    }

    // ===== 2. الإعدادات المتقدمة =====
    const cityEl = document.getElementById('city');
    const panelEl = document.getElementById('panel-brand');
    const inverterEl = document.getElementById('inverter-brand');
    const batteryEl = document.getElementById('battery-brand');
    const directionEl = document.getElementById('direction');
    const shadowEl = document.getElementById('shadow');
    const roofLengthEl = document.getElementById('roof-length');
    const roofWidthEl = document.getElementById('roof-width');
    const expansionEl = document.getElementById('expansion-percent');
    const batteryDaysEl = document.getElementById('battery-days');

    const city = cityEl ? cityEl.value : 'صنعاء';
    const panelBrand = panelEl ? panelEl.value : 'Jinko Tiger Neo 570W';
    const inverterBrand = inverterEl ? inverterEl.value : 'Deye 8kW';
    const batteryBrand = batteryEl ? batteryEl.value : 'Dyness B3 5.12kWh';
    const direction = directionEl ? directionEl.value : 'جنوب';
    const shadow = shadowEl ? shadowEl.value : 'لا يوجد';
    const roofLength = parseFloat(roofLengthEl?.value) || 5;
    const roofWidth = parseFloat(roofWidthEl?.value) || 4;
    const expansionPercent = parseFloat(expansionEl?.value) || 20;
    const batteryDays = parseFloat(batteryDaysEl?.value) || 2;

    // ===== 3. التحقق من البيانات =====
=======
    if (deviceItems.length > 0) {
        let totalWh = 0;
        deviceItems.forEach(item => {
            const watt = parseFloat(item.querySelector('.device-watt').value) || 0;
            const hours = parseFloat(item.querySelector('.device-hours').value) || 0;
            totalWh += watt * hours;
        });
        dailyKwh = totalWh / 1000;
    }

    // ===== 2. الإعدادات المتقدمة =====
    const sunHours = parseFloat(document.getElementById('sun-hours').value) || 5.5;
    const panelPower = parseInt(document.getElementById('panel-power').value) || 700;
    const systemType = document.getElementById('system-type').value;
    const batteryType = document.getElementById('battery-type').value;
    const batteryVoltage = parseInt(document.getElementById('battery-voltage').value) || 48;
    const batteryDays = parseFloat(document.getElementById('battery-days').value) || 2;
    const expansionPercent = parseFloat(document.getElementById('expansion-percent').value) || 20;
    const systemEfficiency = parseFloat(document.getElementById('system-efficiency').value) / 100 || 0.80;
    const cableLoss = parseFloat(document.getElementById('cable-loss').value) / 100 || 0.03;
    const hasGenerator = document.getElementById('has-generator').value === 'yes';
    const panelDirection = document.getElementById('panel-direction').value;
    const panelTilt = parseInt(document.getElementById('panel-tilt').value) || 20;

    // ===== 3. معاملات حسب نوع البطارية =====
    let batteryDOD = 0.80;
    let batteryEfficiency = 0.90;
    let batteryCostPerKwh = 300; // ريال يمني لكل كيلوواط/ساعة
    
    if (batteryType === 'lead') {
        batteryDOD = 0.50;
        batteryEfficiency = 0.85;
        batteryCostPerKwh = 150;
    } else if (batteryType === 'lithium') {
        batteryDOD = 0.80;
        batteryEfficiency = 0.92;
        batteryCostPerKwh = 450;
    } else if (batteryType === 'hv') {
        batteryDOD = 0.90;
        batteryEfficiency = 0.95;
        batteryCostPerKwh = 600;
    }

    // ===== 4. التحقق من البيانات =====
>>>>>>> 8a87fc6e7d911dbd0ebac0fd4f0c0103cb03d493
    if (dailyKwh <= 0) {
        alert('⚠️ يرجى إدخال بيانات الاستهلاك (يومي، شهري، فاتورة، أو أجهزة)');
        return;
    }

<<<<<<< HEAD
    // ===== 4. تشغيل الحاسبة =====
    const input = {
        dailyKwh: dailyKwh,
        city: city,
        panelBrand: panelBrand,
        inverterBrand: inverterBrand,
        batteryBrand: batteryBrand,
        direction: direction,
        shadow: shadow,
        roofLength: roofLength,
        roofWidth: roofWidth,
        devices: devices,
        expansionPercent: expansionPercent,
        batteryDays: batteryDays
    };

    try {
        const result = engineer.calculateFullSystem(input);
        currentResult = result;
        currentInput = input;
        displayResults(result);
        document.getElementById('results-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('❌ خطأ في الحساب:', error);
        alert('⚠️ حدث خطأ في الحساب. يرجى التحقق من البيانات المدخلة.');
    }
}

// ===== عرض النتائج =====
function displayResults(result) {
    const s = result.system;
    const v = result.voltage;
    const c = result.cables;
    const p = result.protection;
    const cost = result.cost;
    const products = result.products;

    const container = document.getElementById('results-container');
    if (!container) return;
    container.style.display = 'block';
    
    // ===== البطاقات الرئيسية =====
    const resultsGrid = document.getElementById('results-grid');
    if (resultsGrid) {
        resultsGrid.innerHTML = `
            <div class="result-box">
                <span class="icon"><i class="fas fa-bolt"></i></span>
                <div class="value">${s.dailyConsumption.toFixed(2)}</div>
                <div class="label">الاستهلاك اليومي (kWh)</div>
            </div>
            <div class="result-box">
                <span class="icon"><i class="fas fa-solar-panel"></i></span>
                <div class="value">${s.panelCount}</div>
                <div class="label">عدد الألواح (${products.panel.power}W)</div>
            </div>
            <div class="result-box">
                <span class="icon"><i class="fas fa-microchip"></i></span>
                <div class="value">${s.inverterKW} kW</div>
                <div class="label">قدرة الإنفرتر (${products.inverter.brand})</div>
            </div>
            <div class="result-box">
                <span class="icon"><i class="fas fa-battery-full"></i></span>
                <div class="value">${s.batteryCount}</div>
                <div class="label">عدد البطاريات (${s.totalBatteryKwh} kWh)</div>
            </div>
            <div class="result-box">
                <span class="icon"><i class="fas fa-chart-line"></i></span>
                <div class="value">${s.systemKW} kW</div>
                <div class="label">حجم النظام المطلوب</div>
            </div>
            <div class="result-box">
                <span class="icon"><i class="fas fa-sun"></i></span>
                <div class="value">${s.annualProduction.toLocaleString()} kWh</div>
                <div class="label">الإنتاج السنوي المتوقع</div>
            </div>
            <div class="result-box">
                <span class="icon"><i class="fas fa-money-bill-wave"></i></span>
                <div class="value">${cost.totalCost.toLocaleString()}</div>
                <div class="label">التكلفة التقديرية (ريال)</div>
            </div>
            <div class="result-box" style="border-color: #22c55e;">
                <span class="icon"><i class="fas fa-clock"></i></span>
                <div class="value" style="color: #22c55e;">${cost.paybackYears} سنة</div>
                <div class="label">فترة الاسترداد</div>
            </div>
        `;
    }

    // ===== التفاصيل =====
    const detailsContent = document.getElementById('details-content');
    if (detailsContent) {
        detailsContent.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                <div>
                    <h4 style="color: var(--primary-dark);">🔹 بيانات النظام</h4>
                    <ul>
                        <li><strong>المدينة:</strong> ${currentInput ? currentInput.city : '-'}</li>
                        <li><strong>اتجاه السطح:</strong> ${currentInput ? currentInput.direction : '-'}</li>
                        <li><strong>الظل:</strong> ${currentInput ? currentInput.shadow : '-'}</li>
                        <li><strong>التوسع المستقبلي:</strong> ${currentInput ? currentInput.expansionPercent : '-'}%</li>
                        <li><strong>أيام الاحتياط:</strong> ${currentInput ? currentInput.batteryDays : '-'} يوم</li>
                    </ul>
                </div>
                <div>
                    <h4 style="color: var(--primary-dark);">🔸 تفاصيل المنتجات</h4>
                    <ul>
                        <li><strong>اللوح:</strong> ${products.panel.brand} ${products.panel.model}</li>
                        <li><strong>الإنفرتر:</strong> ${products.inverter.brand} ${products.inverter.model}</li>
                        <li><strong>البطارية:</strong> ${products.battery.brand} ${products.battery.model}</li>
                    </ul>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; background: #f8fafc; padding: 15px; border-radius: 8px;">
                <div><strong>جهد الدائرة المفتوحة:</strong> ${v.voc} V</div>
                <div><strong>جهد التشغيل:</strong> ${v.vmp} V</div>
                <div><strong>التوافق مع MPPT:</strong> ${v.mpptCompatible ? '✅ متوافق' : '⚠️ غير متوافق'}</div>
                <div><strong>السلاسل:</strong> ${s.strings} سلسلة</div>
                <div><strong>لوح لكل سلسلة:</strong> ${s.panelsPerString} لوح</div>
                <div><strong>المساحة المطلوبة:</strong> ${s.totalArea} م²</div>
            </div>
            ${!s.areaSufficient ? `<div class="warning-box">⚠️ المساحة المتوفرة (${s.roofArea} م²) غير كافية للمساحة المطلوبة (${s.totalArea} م²)</div>` : ''}
        `;
    }

    // ===== ROI =====
    const roiValue = document.getElementById('roi-value');
    const roiDetails = document.getElementById('roi-details');
    if (roiValue) roiValue.textContent = `${cost.paybackYears} سنة`;
    if (roiDetails) {
        roiDetails.innerHTML = `
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                <span>التوفير الشهري: <strong>${cost.monthlySavings.toLocaleString()} ريال</strong></span>
                <span>التوفير السنوي: <strong>${cost.yearlySavings.toLocaleString()} ريال</strong></span>
                <span>ROI: <strong>${cost.roi}%</strong></span>
            </div>
        `;
    }

    // ===== أزرار التحميل =====
    const pdfBtn = document.getElementById('download-pdf');
    const htmlBtn = document.getElementById('download-html');
    
    if (pdfBtn) {
        pdfBtn.style.display = 'inline-block';
        pdfBtn.onclick = function() {
            if (currentResult && currentInput) {
                pdfGen.downloadPDF(currentResult, currentInput);
            }
        };
    }
    
    if (htmlBtn) {
        htmlBtn.style.display = 'inline-block';
        htmlBtn.onclick = function() {
            if (currentResult && currentInput) {
                pdfGen.downloadHTML(currentResult, currentInput);
            }
        };
    }
}

// ===== إضافة الأجهزة الافتراضية عند التحميل =====
document.addEventListener('DOMContentLoaded', function() {
    addPresetDevices();
    console.log('☀️ حاسبة الخالدي للطاقة الشمسية جاهزة!');
});
=======
    // ===== 5. الحسابات الرئيسية =====
    
    // 5.1 إضافة التوسع المستقبلي
    const dailyWithExpansion = dailyKwh * (1 + expansionPercent / 100);
    
    // 5.2 حجم النظام (kW)
    let systemKW = dailyWithExpansion / (sunHours * systemEfficiency * (1 - cableLoss));
    
    // 5.3 عدد الألواح
    const panels = Math.ceil((systemKW * 1000) / panelPower);
    
    // 5.4 القدرة الكلية للألواح
    const totalPanelWatt = panels * panelPower;
    
    // 5.5 حساب الطاقة المنتجة صيفاً وشتاءً
    const summerProduction = totalPanelWatt * 6 * systemEfficiency / 1000;
    const winterProduction = totalPanelWatt * 4.5 * systemEfficiency / 1000;
    
    // 5.6 حساب البطارية
    const batteryKwh = (dailyWithExpansion * batteryDays) / batteryDOD;
    const batteryAh = Math.ceil((batteryKwh * 1000) / batteryVoltage);
    
    // 5.7 حساب الإنفرتر
    let inverterKW = Math.ceil(systemKW * 1.3);
    if (hasGenerator) inverterKW = Math.ceil(systemKW * 1.1);
    
    // 5.8 التكلفة التقديرية
    const panelCost = panels * 70000; // 70,000 ريال لكل لوح
    const batteryCost = batteryKwh * batteryCostPerKwh * 1000;
    const inverterCost = inverterKW * 50000;
    const installationCost = (panelCost + batteryCost + inverterCost) * 0.15;
    const totalCost = panelCost + batteryCost + inverterCost + installationCost;
    
    // 5.9 العائد على الاستثمار (ROI)
    const monthlySavings = dailyKwh * 30 * (kwhPrice || 150);
    const yearlySavings = monthlySavings * 12;
    const paybackYears = (totalCost / yearlySavings).toFixed(1);

    // ===== 6. عرض النتائج =====
    document.getElementById('results-container').style.display = 'block';
    
    const resultsGrid = document.getElementById('results-grid');
    resultsGrid.innerHTML = `
        <div class="result-box">
            <span class="icon"><i class="fas fa-bolt"></i></span>
            <div class="value">${dailyKwh.toFixed(2)}</div>
            <div class="label">الاستهلاك اليومي (كيلوواط/ساعة)</div>
        </div>
        <div class="result-box">
            <span class="icon"><i class="fas fa-solar-panel"></i></span>
            <div class="value">${panels}</div>
            <div class="label">عدد الألواح (${panelPower} واط)</div>
        </div>
        <div class="result-box">
            <span class="icon"><i class="fas fa-microchip"></i></span>
            <div class="value">${inverterKW} كيلوواط</div>
            <div class="label">قدرة الإنفرتر</div>
        </div>
        <div class="result-box">
            <span class="icon"><i class="fas fa-battery-full"></i></span>
            <div class="value">${batteryAh} أمبير</div>
            <div class="label">سعة البطارية (${batteryVoltage} فولت)</div>
        </div>
        <div class="result-box">
            <span class="icon"><i class="fas fa-chart-line"></i></span>
            <div class="value">${systemKW.toFixed(2)} كيلوواط</div>
            <div class="label">حجم النظام المطلوب</div>
        </div>
        <div class="result-box">
            <span class="icon"><i class="fas fa-sun"></i></span>
            <div class="value">${summerProduction.toFixed(1)} / ${winterProduction.toFixed(1)}</div>
            <div class="label">الطاقة المنتجة (صيف/شتاء) كيلوواط/ساعة</div>
        </div>
        <div class="result-box">
            <span class="icon"><i class="fas fa-money-bill-wave"></i></span>
            <div class="value">${totalCost.toLocaleString()}</div>
            <div class="label">التكلفة التقديرية (ريال يمني)</div>
        </div>
        <div class="result-box">
            <span class="icon"><i class="fas fa-area-chart"></i></span>
            <div class="value">${(panels * 2.2).toFixed(1)} م²</div>
            <div class="label">المساحة المطلوبة</div>
        </div>
    `;

    // ===== 7. التفاصيل =====
    document.getElementById('details-content').innerHTML = `
        <ul>
            <li><strong>نوع النظام:</strong> ${systemType === 'off-grid' ? 'منفصل عن الشبكة' : systemType === 'on-grid' ? 'مرتبط بالشبكة' : 'هجين'}</li>
            <li><strong>نوع البطارية:</strong> ${batteryType === 'lead' ? 'رصاص' : batteryType === 'lithium' ? 'ليثيوم' : 'ليثيوم HV'}</li>
            <li><strong>ساعات سطوع الشمس:</strong> ${sunHours} ساعة/يوم</li>
            <li><strong>اتجاه الألواح:</strong> ${panelDirection === 'south' ? 'جنوب' : panelDirection === 'southeast' ? 'جنوب شرق' : panelDirection === 'southwest' ? 'جنوب غرب' : panelDirection === 'east' ? 'شرق' : 'غرب'} - ميل: ${panelTilt}°</li>
            <li><strong>كفاءة النظام:</strong> ${(systemEfficiency * 100).toFixed(0)}%</li>
            <li><strong>خسائر الكابلات:</strong> ${(cableLoss * 100).toFixed(0)}%</li>
            <li><strong>أيام الاحتياط:</strong> ${batteryDays} يوم</li>
            <li><strong>نسبة التوسع:</strong> ${expansionPercent}%</li>
            <li><strong>وجود مولد:</strong> ${hasGenerator ? 'نعم' : 'لا'}</li>
            <li><strong>تفاصيل التكلفة:</strong> الألواح (${panels}×${panelPower}واط) = ${panelCost.toLocaleString()} ريال | البطارية = ${batteryCost.toLocaleString()} ريال | الإنفرتر = ${inverterCost.toLocaleString()} ريال | التركيب = ${installationCost.toLocaleString()} ريال</li>
        </ul>
    `;

    // ===== 8. ROI =====
    document.getElementById('roi-value').textContent = `${paybackYears} سنة`;
    document.getElementById('roi-details').innerHTML = `
        التوفير الشهري: ${monthlySavings.toLocaleString()} ريال | السنوي: ${yearlySavings.toLocaleString()} ريال
    `;

    // تمرير سريع للنتائج
    document.getElementById('results-container').scrollIntoView({ behavior: 'smooth' });
}

// ===== إضافة الأجهزة الافتراضية عند التحميل =====
document.addEventListener('DOMContentLoaded', function() {
    addPresetDevices();
});
>>>>>>> 8a87fc6e7d911dbd0ebac0fd4f0c0103cb03d493
