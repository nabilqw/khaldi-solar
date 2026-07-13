// ============================================================
// قاعدة بيانات منتجات الطاقة الشمسية - الخالدي للطاقة الشمسية
// ============================================================

const SOLAR_DATABASE = {
    // ===== الألواح الشمسية =====
    panels: {
        'Jinko Tiger Neo 570W': {
            brand: 'Jinko',
            model: 'Tiger Neo 570W',
            power: 570,
            voc: 52.8,
            vmp: 43.2,
            isc: 13.9,
            imp: 13.2,
            efficiency: 22.1,
            tempCoef: -0.29,
            dimensions: [2278, 1134, 35],
            weight: 32,
            price: 75000,
            warranty: 25
        },
        'Longi Hi-MO 6 580W': {
            brand: 'Longi',
            model: 'Hi-MO 6 580W',
            power: 580,
            voc: 53.5,
            vmp: 44.0,
            isc: 14.1,
            imp: 13.5,
            efficiency: 22.5,
            tempCoef: -0.28,
            dimensions: [2278, 1134, 35],
            weight: 32.5,
            price: 80000,
            warranty: 25
        },
        'Trina Vertex S 570W': {
            brand: 'Trina',
            model: 'Vertex S 570W',
            power: 570,
            voc: 52.6,
            vmp: 43.1,
            isc: 13.8,
            imp: 13.1,
            efficiency: 21.8,
            tempCoef: -0.30,
            dimensions: [2278, 1134, 35],
            weight: 31.8,
            price: 72000,
            warranty: 25
        },
        'JA Solar Deep Blue 575W': {
            brand: 'JA Solar',
            model: 'Deep Blue 575W',
            power: 575,
            voc: 53.0,
            vmp: 43.5,
            isc: 14.0,
            imp: 13.3,
            efficiency: 22.0,
            tempCoef: -0.29,
            dimensions: [2278, 1134, 35],
            weight: 32.2,
            price: 73000,
            warranty: 25
        },
        'Canadian Solar HiKu 580W': {
            brand: 'Canadian Solar',
            model: 'HiKu 580W',
            power: 580,
            voc: 53.2,
            vmp: 43.8,
            isc: 14.2,
            imp: 13.4,
            efficiency: 22.3,
            tempCoef: -0.27,
            dimensions: [2278, 1134, 35],
            weight: 32.8,
            price: 78000,
            warranty: 25
        }
    },

    // ===== الإنفرترات =====
    inverters: {
        'Deye 8kW': {
            brand: 'Deye',
            model: 'SUN-8K-SG01LP1-EU',
            power: 8000,
            mppt: 2,
            mpptVoltageRange: [150, 500],
            maxVoc: 550,
            efficiency: 97.6,
            batteryCompatibility: ['lithium', 'lead'],
            price: 450000,
            warranty: 5
        },
        'Deye 10kW': {
            brand: 'Deye',
            model: 'SUN-10K-SG01LP1-EU',
            power: 10000,
            mppt: 2,
            mpptVoltageRange: [150, 550],
            maxVoc: 600,
            efficiency: 97.8,
            batteryCompatibility: ['lithium', 'lead'],
            price: 520000,
            warranty: 5
        },
        'Growatt SPF 5000': {
            brand: 'Growatt',
            model: 'SPF 5000 ES',
            power: 5000,
            mppt: 2,
            mpptVoltageRange: [120, 450],
            maxVoc: 500,
            efficiency: 97.0,
            batteryCompatibility: ['lithium', 'lead'],
            price: 320000,
            warranty: 3
        },
        'Growatt SPF 8000': {
            brand: 'Growatt',
            model: 'SPF 8000 ES',
            power: 8000,
            mppt: 2,
            mpptVoltageRange: [150, 500],
            maxVoc: 550,
            efficiency: 97.3,
            batteryCompatibility: ['lithium', 'lead'],
            price: 420000,
            warranty: 3
        },
        'SRNE 10kW': {
            brand: 'SRNE',
            model: 'SRNE 10kW Hybrid',
            power: 10000,
            mppt: 3,
            mpptVoltageRange: [150, 550],
            maxVoc: 600,
            efficiency: 97.5,
            batteryCompatibility: ['lithium', 'lead'],
            price: 520000,
            warranty: 5
        }
    },

    // ===== البطاريات =====
    batteries: {
        'Dyness B3 5.12kWh': {
            brand: 'Dyness',
            model: 'B3 5.12kWh',
            capacity: 5.12,
            voltage: 48,
            type: 'lithium',
            dod: 0.85,
            cycles: 6000,
            price: 380000,
            warranty: 10
        },
        'Pylontech US3000C 4.8kWh': {
            brand: 'Pylontech',
            model: 'US3000C',
            capacity: 4.8,
            voltage: 48,
            type: 'lithium',
            dod: 0.90,
            cycles: 6000,
            price: 350000,
            warranty: 10
        },
        'Huawei LUNA2000 5kWh': {
            brand: 'Huawei',
            model: 'LUNA2000-5-E0',
            capacity: 5,
            voltage: 48,
            type: 'lithium',
            dod: 0.90,
            cycles: 8000,
            price: 450000,
            warranty: 10
        },
        'Narada 6kWh': {
            brand: 'Narada',
            model: 'Narada 6kWh',
            capacity: 6,
            voltage: 48,
            type: 'lithium',
            dod: 0.80,
            cycles: 5000,
            price: 400000,
            warranty: 8
        }
    },

    // ===== بيانات المدن =====
    cities: {
        'صنعاء': { sunHours: 5.8, lat: 15.35, lon: 44.21, temp: 22, tempMax: 35, tempMin: 5 },
        'عدن': { sunHours: 6.2, lat: 12.78, lon: 45.02, temp: 30, tempMax: 40, tempMin: 20 },
        'تعز': { sunHours: 6.0, lat: 13.58, lon: 44.02, temp: 28, tempMax: 38, tempMin: 15 },
        'حضرموت': { sunHours: 6.5, lat: 14.53, lon: 49.13, temp: 32, tempMax: 42, tempMin: 18 },
        'إب': { sunHours: 5.5, lat: 13.97, lon: 44.17, temp: 25, tempMax: 33, tempMin: 10 },
        'مأرب': { sunHours: 6.3, lat: 15.46, lon: 45.32, temp: 30, tempMax: 40, tempMin: 15 },
        'الحديدة': { sunHours: 6.0, lat: 14.79, lon: 42.95, temp: 33, tempMax: 42, tempMin: 22 },
        'المكلا': { sunHours: 6.4, lat: 14.53, lon: 49.13, temp: 32, tempMax: 40, tempMin: 20 },
        'ذمار': { sunHours: 5.5, lat: 14.55, lon: 44.40, temp: 20, tempMax: 30, tempMin: 2 },
        'صعدة': { sunHours: 5.7, lat: 16.94, lon: 43.77, temp: 22, tempMax: 32, tempMin: 5 }
    },

    // ===== معاملات الاتجاه =====
    directionFactors: {
        'جنوب': 1.00,
        'جنوب شرق': 0.97,
        'جنوب غرب': 0.97,
        'شرق': 0.88,
        'غرب': 0.88,
        'شمال شرق': 0.75,
        'شمال غرب': 0.75,
        'شمال': 0.65
    },

    // ===== معاملات الظل =====
    shadowFactors: {
        'لا يوجد': 1.00,
        'قليل (أقل من 2 ساعة)': 0.95,
        'متوسط (2-4 ساعات)': 0.85,
        'شديد (أكثر من 4 ساعات)': 0.70
    }
};

// ===== تصدير للاستخدام =====
if (typeof module !== 'undefined') {
    module.exports = SOLAR_DATABASE;
}