// ===== حاسبة الطاقة الشمسية =====
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const calcLoadBtn = document.getElementById('calc-load-btn');

    // حساب الاستهلاك من الأحمال
    if (calcLoadBtn) {
        calcLoadBtn.addEventListener('click', function() {
            let totalWh = 0;
            document.querySelectorAll('.load-qty').forEach(input => {
                const qty = parseInt(input.value) || 0;
                const watt = parseInt(input.dataset.watt) || 0;
                const hours = parseInt(input.dataset.hours) || 0;
                totalWh += qty * watt * hours;
            });
            const dailyKwh = totalWh / 1000;
            document.getElementById('daily-consumption').value = dailyKwh.toFixed(2);
            alert(`✅ تم حساب الاستهلاك: ${dailyKwh.toFixed(2)} كيلوواط/ساعة يومياً`);
        });
    }

    // زر الحساب الرئيسي
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateSolarSystem);
    }
});

// ===== دالة الحساب الأساسية =====
function calculateSolarSystem() {
    // جلب المدخلات
    const method = document.getElementById('calc-method').value;
    let dailyConsumption = parseFloat(document.getElementById('daily-consumption').value) || 0;
    const sunHours = parseFloat(document.getElementById('sun-hours').value) || 5;
    const systemType = document.getElementById('system-type').value;

    // طريقة المساحة
    if (method === 'area') {
        const area = parseFloat(document.getElementById('available-area').value) || 0;
        const efficiency = parseFloat(document.getElementById('panel-efficiency').value) || 200;
        const panelWatt = area * efficiency;
        dailyConsumption = (panelWatt * sunHours * 0.75) / 1000;
        document.getElementById('daily-consumption').value = dailyConsumption.toFixed(2);
    }

    // التحقق من صحة البيانات
    if (dailyConsumption <= 0 || sunHours <= 0) {
        alert('⚠️ يرجى إدخال قيم صحيحة (استهلاك وساعات شمس)');
        return;
    }

    // ===== المعاملات العلمية =====
    const PANEL_WATT = 550; // واط لكل لوح
    const PANEL_AREA = 2.2; // م² لكل لوح
    const SYSTEM_EFFICIENCY = 0.80; // 80% كفاءة النظام
    const BATTERY_VOLTAGE = 24; // فولت
    const DOD = 0.5; // عمق تفريغ 50%
    const AUTONOMY_DAYS = 2; // يومان تخزين
    const INVERTER_EFFICIENCY = 0.92; // 92% كفاءة العاكس

    // ===== 1. حساب الطاقة المطلوبة من الألواح =====
    const dailyPanelEnergy = dailyConsumption / SYSTEM_EFFICIENCY;
    const requiredPanelWatt = dailyPanelEnergy / sunHours * 1000;
    const panelCount = Math.ceil(requiredPanelWatt / PANEL_WATT);
    const totalPanelWatt = panelCount * PANEL_WATT;

    // ===== 2. حساب العاكس =====
    const inverterPower = Math.ceil((dailyConsumption / 24 * 1000) * 1.3);
    const inverterKVA = Math.ceil(inverterPower / 1000 * 1.1);

    // ===== 3. حساب البطاريات =====
    const batteryWh = dailyConsumption * 1000 * AUTONOMY_DAYS / DOD;
    const batteryAh = Math.ceil(batteryWh / BATTERY_VOLTAGE);

    // ===== 4. حساب المساحة =====
    const requiredArea = panelCount * PANEL_AREA;

    // ===== 5. حساب التكلفة بالريال اليمني =====
    const costPerWatt = 450; // ريال يمني لكل واط
    const estimatedCost = Math.round(totalPanelWatt * costPerWatt * 1.2);

    // ===== عرض النتائج =====
    document.getElementById('result-consumption').textContent = `${dailyConsumption.toFixed(2)} كيلوواط/ساعة`;
    document.getElementById('result-panels').textContent = `${panelCount} لوح (${totalPanelWatt} واط)`;
    document.getElementById('result-inverter').textContent = `${inverterKVA} كيلوواط (${inverterPower} واط)`;
    document.getElementById('result-battery').textContent = `${batteryAh} أمبير/ساعة (${BATTERY_VOLTAGE}V)`;
    document.getElementById('result-area').textContent = `${requiredArea.toFixed(1)} م²`;
    document.getElementById('result-cost').textContent = `${estimatedCost.toLocaleString()} ريال يمني`;

    // ===== تفاصيل الحساب =====
    const details = document.getElementById('details-content');
    details.innerHTML = `
        <p><strong>🔹 طريقة الحساب:</strong> ${getMethodName(method)}</p>
        <p><strong>🔹 نوع النظام:</strong> ${getSystemName(systemType)}</p>
        <p><strong>🔹 ساعات سطوع الشمس:</strong> ${sunHours} ساعة/يوم</p>
        <hr>
        <p><strong>📊 تفاصيل الألواح:</strong></p>
        <ul>
            <li>قدرة اللوح الواحد: ${PANEL_WATT} واط</li>
            <li>عدد الألواح: ${panelCount} لوح</li>
            <li>القدرة الكلية: ${totalPanelWatt} واط</li>
            <li>المساحة المطلوبة: ${requiredArea.toFixed(1)} م²</li>
        </ul>
        <p><strong>📊 تفاصيل العاكس:</strong></p>
        <ul>
            <li>القدرة المستمرة: ${inverterPower} واط</li>
            <li>القدرة الظاهرية: ${inverterKVA} كيلوواط</li>
        </ul>
        <p><strong>📊 تفاصيل البطاريات:</strong></p>
        <ul>
            <li>جهد النظام: ${BATTERY_VOLTAGE} فولت</li>
            <li>السعة المطلوبة: ${batteryAh} أمبير/ساعة</li>
            <li>عمق التفريغ: ${DOD * 100}%</li>
            <li>أيام التخزين: ${AUTONOMY_DAYS} يوم</li>
        </ul>
        <p><strong>💰 التكلفة التقديرية:</strong> ${estimatedCost.toLocaleString()} ريال يمني</p>
        <p style="color: #64748b; font-size: 0.85rem; margin-top: 10px;">
            ⚠️ هذه حسابات تقريبية، يرجى التواصل مع فريقنا للحصول على عرض سعر دقيق.
        </p>
    `;

    // تمرير سريع للنتائج
    document.getElementById('calc-results').scrollIntoView({ behavior: 'smooth' });
}

function getMethodName(method) {
    const map = {
        'consumption': 'حسب الاستهلاك اليومي',
        'load': 'حسب الأحمال',
        'area': 'حسب المساحة المتوفرة'
    };
    return map[method] || method;
}

function getSystemName(type) {
    const map = {
        'on-grid': 'مرتبط بالشبكة (On-Grid)',
        'off-grid': 'منفصل عن الشبكة (Off-Grid)',
        'hybrid': 'هجين (Hybrid)'
    };
    return map[type] || type;
}