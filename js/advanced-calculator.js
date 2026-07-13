// ============================================================
// الحسابات الهندسية المتقدمة - الخالدي للطاقة الشمسية
// ============================================================

class SolarEngineer {
    constructor() {
        this.database = SOLAR_DATABASE;
    }

    // ===== حساب الحمل اللحظي =====
    calculatePeakLoad(devices) {
        let peakLoad = 0;
        devices.forEach(d => { peakLoad += d.watt; });
        return {
            peakLoad: peakLoad,
            recommendedInverter: Math.ceil(peakLoad * 1.25 / 1000) * 1000
        };
    }

    // ===== حساب الجهد مع درجة الحرارة =====
    calculatePanelVoltage(panel, temperature) {
        const tempDiff = temperature - 25;
        const vocAdjusted = panel.voc * (1 + (panel.tempCoef / 100) * tempDiff);
        const vmpAdjusted = panel.vmp * (1 + (panel.tempCoef / 100) * tempDiff);
        return {
            vocAdjusted: Math.round(vocAdjusted * 10) / 10,
            vmpAdjusted: Math.round(vmpAdjusted * 10) / 10
        };
    }

    // ===== التحقق من توافق MPPT =====
    checkMPPTCompatibility(panel, inverter, tempMin, tempMax) {
        const coldResult = this.calculatePanelVoltage(panel, tempMin);
        const hotResult = this.calculatePanelVoltage(panel, tempMax);
        
        const maxPanelsPerString = Math.floor(inverter.maxVoc / coldResult.vocAdjusted);
        const minPanelsPerString = Math.ceil(inverter.mpptVoltageRange[0] / hotResult.vmpAdjusted);
        const recommendedPanels = Math.floor((maxPanelsPerString + minPanelsPerString) / 2);
        const mpptVoltage = recommendedPanels * hotResult.vmpAdjusted;
        
        return {
            compatible: recommendedPanels >= minPanelsPerString && recommendedPanels <= maxPanelsPerString,
            minPanels: minPanelsPerString,
            maxPanels: maxPanelsPerString,
            recommendedPanels: recommendedPanels,
            mpptVoltage: Math.round(mpptVoltage),
            coldVoc: coldResult.vocAdjusted,
            hotVmp: hotResult.vmpAdjusted,
            warnings: []
        };
    }

    // ===== حساب مقاطع الكابلات =====
    calculateCableSizes(current, length, voltage, allowedDrop = 3) {
        const k = 56;
        const area = (2 * length * current * 100) / (k * voltage * allowedDrop);
        const standardSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];
        let selected = 1.5;
        for (let size of standardSizes) {
            if (size >= area) { selected = size; break; }
        }
        const actualDrop = (2 * length * current * 100) / (k * voltage * selected);
        return {
            minArea: Math.round(area * 100) / 100,
            recommendedArea: selected,
            actualDrop: Math.round(actualDrop * 100) / 100,
            isSafe: current <= 100
        };
    }

    // ===== اقتراح قواطع الحماية =====
    suggestProtection(current, voltage, type = 'DC') {
        const breakerSize = Math.ceil(current * 1.25 / 5) * 5;
        const standardBreakers = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
        let selectedBreaker = 6;
        for (let b of standardBreakers) {
            if (b >= breakerSize) { selectedBreaker = b; break; }
        }
        return {
            breaker: `${selectedBreaker}A ${voltage}V ${type}`,
            spd: type === 'DC' ? `SPD 600V ${Math.round(current * 1.5)}kA` : `SPD 275V 20kA`,
            fuse: `${selectedBreaker}A Fuse`,
            isolator: `${selectedBreaker}A Isolator`
        };
    }

    // ===== حساب النظام الكامل =====
    calculateFullSystem(input) {
        const {
            dailyKwh, city, panelBrand, inverterBrand, batteryBrand,
            direction, shadow, roofLength, roofWidth, devices,
            expansionPercent, batteryDays
        } = input;

        const cityData = this.database.cities[city];
        const panel = this.database.panels[panelBrand];
        const inverter = this.database.inverters[inverterBrand];
        const battery = this.database.batteries[batteryBrand];
        const directionFactor = this.database.directionFactors[direction] || 1;
        const shadowFactor = this.database.shadowFactors[shadow] || 1;
        const expansion = (expansionPercent || 20) / 100;
        const days = batteryDays || 2;

        const systemEfficiency = 0.80;
        const cableLoss = 0.03;

        const dailyWithExpansion = dailyKwh * (1 + expansion);
        const effectiveSunHours = cityData.sunHours * directionFactor * shadowFactor;
        let systemKW = dailyWithExpansion / (effectiveSunHours * systemEfficiency * (1 - cableLoss));

        const panelCount = Math.ceil((systemKW * 1000) / panel.power);
        const totalPanelWatt = panelCount * panel.power;

        const peakResult = this.calculatePeakLoad(devices);
        const inverterKW = Math.max(Math.ceil(peakResult.peakLoad / 1000 * 1.25), Math.ceil(systemKW * 1.2));

        const tempMax = cityData.tempMax || cityData.temp + 15;
        const tempMin = cityData.tempMin || cityData.temp - 10;
        const voltageResult = this.calculatePanelVoltage(panel, tempMax);
        const mpptResult = this.checkMPPTCompatibility(panel, inverter, tempMin, tempMax);

        const strings = Math.ceil(panelCount / mpptResult.recommendedPanels);
        const panelsPerString = Math.ceil(panelCount / strings);

        const batteryKwh = (dailyWithExpansion * days) / battery.dod;
        const batteryCount = Math.ceil(batteryKwh / battery.capacity);
        const totalBatteryKwh = batteryCount * battery.capacity;

        const panelCurrent = (totalPanelWatt / voltageResult.vmpAdjusted) / strings;
        const batteryCurrent = (totalBatteryKwh * 1000) / battery.voltage;
        const acCurrent = (inverterKW * 1000) / 220;

        const panelCable = this.calculateCableSizes(panelCurrent, 20, voltageResult.vmpAdjusted);
        const batteryCable = this.calculateCableSizes(batteryCurrent, 5, battery.voltage);
        const acCable = this.calculateCableSizes(acCurrent, 10, 220);

        const dcProtection = this.suggestProtection(panelCurrent * 1.25, voltageResult.vmpAdjusted, 'DC');
        const acProtection = this.suggestProtection(acCurrent * 1.25, 220, 'AC');

        const panelArea = panel.dimensions[0] * panel.dimensions[1] / 1000000;
        const totalArea = panelCount * panelArea;
        const roofArea = roofLength * roofWidth;
        const roofCapacity = Math.floor(roofArea / panelArea);
        const areaSufficient = totalArea <= roofArea;

        const panelCost = panelCount * panel.price;
        const batteryCost = batteryCount * battery.price;
        const inverterCost = inverter.price;
        const cableCost = (panelCable.recommendedArea * 0.5 + batteryCable.recommendedArea * 0.8 + acCable.recommendedArea * 0.3) * 1000;
        const protectionCost = 50000;
        const installationCost = (panelCost + batteryCost + inverterCost) * 0.12;
        const totalCost = panelCost + batteryCost + inverterCost + cableCost + protectionCost + installationCost;

        const monthlySavings = dailyKwh * 30 * 150;
        const yearlySavings = monthlySavings * 12;
        const paybackYears = (totalCost / yearlySavings).toFixed(1);
        const roi = ((yearlySavings / totalCost) * 100).toFixed(1);
        const annualProduction = totalPanelWatt * cityData.sunHours * 365 * systemEfficiency / 1000;

        return {
            system: {
                dailyConsumption: dailyKwh,
                dailyWithExpansion: Math.round(dailyWithExpansion * 100) / 100,
                systemKW: Math.round(systemKW * 100) / 100,
                peakLoad: peakResult.peakLoad,
                inverterKW: inverterKW,
                panelCount: panelCount,
                totalPanelWatt: totalPanelWatt,
                strings: strings,
                panelsPerString: panelsPerString,
                batteryCount: batteryCount,
                totalBatteryKwh: Math.round(totalBatteryKwh * 100) / 100,
                totalArea: Math.round(totalArea * 100) / 100,
                roofArea: roofArea,
                roofCapacity: roofCapacity,
                areaSufficient: areaSufficient,
                annualProduction: Math.round(annualProduction)
            },
            voltage: {
                voc: voltageResult.vocAdjusted,
                vmp: voltageResult.vmpAdjusted,
                tempMax: tempMax,
                tempMin: tempMin,
                maxPanelsPerString: mpptResult.maxPanels,
                minPanelsPerString: mpptResult.minPanels,
                recommendedPanelsPerString: mpptResult.recommendedPanels,
                mpptVoltage: mpptResult.mpptVoltage,
                mpptCompatible: mpptResult.compatible,
                warnings: mpptResult.warnings
            },
            cables: {
                panel: panelCable,
                battery: batteryCable,
                ac: acCable
            },
            protection: {
                dc: dcProtection,
                ac: acProtection
            },
            cost: {
                panelCost: Math.round(panelCost),
                batteryCost: Math.round(batteryCost),
                inverterCost: Math.round(inverterCost),
                cableCost: Math.round(cableCost),
                protectionCost: Math.round(protectionCost),
                installationCost: Math.round(installationCost),
                totalCost: Math.round(totalCost),
                monthlySavings: Math.round(monthlySavings),
                yearlySavings: Math.round(yearlySavings),
                paybackYears: paybackYears,
                roi: roi
            },
            products: {
                panel: panel,
                inverter: inverter,
                battery: battery
            }
        };
    }
}

if (typeof module !== 'undefined') {
    module.exports = SolarEngineer;
}