// js/data.js

// 核心資料庫 (透過 CSV ETL 自動生成)
const rawData = [
    {
        region: "雙北",
        mapNames: [
            "臺北市",
            "台北市",
            "新北市"
        ],
        overall: 90.66,
        overall_feb: 92.23,
        station: 91,
        station_feb: 93,
        appearance: 84,
        appearance_feb: 85,
        functionality: 97,
        functionality_feb: 97,
        ems: 94.1,
        ems_feb: 90.5,
        operability: 96.6,
        operability_feb: 97.03,
        mapCenter: [
            121.56,
            25.03
        ],
        labelPos: [
            122.5,
            25.3
        ],
        base: {
            s: 115,
            v: 866,
            e: 124,
            t: "25 輛 (2.9%)"
        },
        tire_history: [
            11,
            10,
            1,
            3,
            3,
            3.8,
            2.9
        ],
        tire_count: 25,
        maintenance_rate: 94.1,
        maintenance_rate_feb: 90.5,
        m_fleet: 51108,
        m_fleet_feb: 51108,
        m_accident: 240,
        m_accident_feb: 195,
        m_records: 46731,
        m_records_feb: 44880,
        m_var: "3.60%",
        sim_total: 820,
        sim_a_count: 56,
        sim_a_ratio: 6.8,
        sim_a_lm: 5.8,
        sim_a_var: "+1.0%",
        sim_b_count: 166,
        sim_b_ratio: 20.2,
        sim_b_lm: 19.4,
        sim_b_var: "+0.8%",
        sim_c_count: 433,
        sim_c_ratio: 52.8,
        sim_c_lm: 59.6,
        sim_c_var: "-6.8%"
    },
    {
        region: "桃園",
        mapNames: [
            "桃園市",
            "桃園縣"
        ],
        overall: 88.94,
        overall_feb: 91.15,
        station: 99,
        station_feb: 99,
        appearance: 86,
        appearance_feb: 85,
        functionality: 96,
        functionality_feb: 97,
        ems: 79.5,
        ems_feb: 89.1,
        operability: 96.2,
        operability_feb: 96.4,
        mapCenter: [
            121.21,
            24.95
        ],
        labelPos: [
            119.5,
            25.1
        ],
        base: {
            s: 37,
            v: 251,
            e: 45,
            t: "9 輛 (3.6%)"
        },
        tire_history: [
            9,
            11,
            3,
            4,
            3,
            4.4,
            3.6
        ],
        tire_count: 9,
        maintenance_rate: 79.5,
        maintenance_rate_feb: 89.1,
        m_fleet: 13107,
        m_fleet_feb: 12107,
        m_accident: 50,
        m_accident_feb: 46,
        m_records: 10239,
        m_records_feb: 10647,
        m_var: "-9.60%",
        sim_total: 248,
        sim_a_count: 14,
        sim_a_ratio: 5.6,
        sim_a_lm: 3.7,
        sim_a_var: "+1.9%",
        sim_b_count: 40,
        sim_b_ratio: 16.1,
        sim_b_lm: 16.3,
        sim_b_var: "-0.2%",
        sim_c_count: 107,
        sim_c_ratio: 43.1,
        sim_c_lm: 62,
        sim_c_var: "-18.9%"
    },
    {
        region: "新竹",
        mapNames: [
            "新竹市",
            "新竹縣"
        ],
        overall: 92.3,
        overall_feb: 91.64,
        station: 95,
        station_feb: 99,
        appearance: 85,
        appearance_feb: 85,
        functionality: 97,
        functionality_feb: 97,
        ems: 96.1,
        ems_feb: 94.8,
        operability: 97.4,
        operability_feb: 95.78,
        mapCenter: [
            121.01,
            24.82
        ],
        labelPos: [
            119.5,
            24.7
        ],
        base: {
            s: 13,
            v: 105,
            e: 30,
            t: "2 輛 (1.9%)"
        },
        tire_history: [
            8,
            8,
            1,
            3,
            1,
            3.4,
            1.9
        ],
        tire_count: 2,
        maintenance_rate: 96.1,
        maintenance_rate_feb: 94.8,
        m_fleet: 5616,
        m_fleet_feb: 5616,
        m_accident: 40,
        m_accident_feb: 47,
        m_records: 5082,
        m_records_feb: 5276,
        m_var: "1.30%",
        sim_total: 88,
        sim_a_count: 3,
        sim_a_ratio: 3.4,
        sim_a_lm: 3.6,
        sim_a_var: "-0.2%",
        sim_b_count: 4,
        sim_b_ratio: 4.5,
        sim_b_lm: 9.5,
        sim_b_var: "-5.0%",
        sim_c_count: 40,
        sim_c_ratio: 45.5,
        sim_c_lm: 65.5,
        sim_c_var: "-20.0%"
    },
    {
        region: "苗栗",
        mapNames: [
            "苗栗縣"
        ],
        overall: 91.41,
        overall_feb: 95.31,
        station: 99,
        station_feb: 99,
        appearance: 87,
        appearance_feb: 91,
        functionality: 97,
        functionality_feb: 98,
        ems: 98.4,
        ems_feb: 92,
        operability: 94.5,
        operability_feb: 98.18,
        mapCenter: [
            120.82,
            24.56
        ],
        labelPos: [
            119.5,
            24.3
        ],
        base: {
            s: 10,
            v: 68,
            e: 25,
            t: "11 輛 (16.2%)"
        },
        tire_history: [
            0,
            0,
            2,
            3,
            8,
            8,
            16.2
        ],
        tire_count: 11,
        maintenance_rate: 98.4,
        maintenance_rate_feb: 92,
        m_fleet: 3650,
        m_fleet_feb: 3650,
        m_accident: 16,
        m_accident_feb: 15,
        m_records: 3539,
        m_records_feb: 3272,
        m_var: "6.40%",
        sim_total: 50,
        sim_a_count: 5,
        sim_a_ratio: 10,
        sim_a_lm: 4,
        sim_a_var: "+6.0%",
        sim_b_count: 2,
        sim_b_ratio: 4,
        sim_b_lm: 0,
        sim_b_var: "+4.0%",
        sim_c_count: 33,
        sim_c_ratio: 66,
        sim_c_lm: 58,
        sim_c_var: "+8.0%"
    },
    {
        region: "台中",
        mapNames: [
            "臺中市",
            "台中市"
        ],
        overall: 89.89,
        overall_feb: 92.18,
        station: 95,
        station_feb: 96,
        appearance: 92,
        appearance_feb: 91,
        functionality: 98,
        functionality_feb: 97,
        ems: 74.3,
        ems_feb: 78.1,
        operability: 96.2,
        operability_feb: 99.26,
        mapCenter: [
            120.67,
            24.14
        ],
        labelPos: [
            119.5,
            23.9
        ],
        base: {
            s: 41,
            v: 266,
            e: 15,
            t: "17 輛 (6.4%)"
        },
        tire_history: [
            1,
            2,
            0,
            3,
            3,
            3.9,
            6.4
        ],
        tire_count: 17,
        maintenance_rate: 74.3,
        maintenance_rate_feb: 78.1,
        m_fleet: 13227,
        m_fleet_feb: 13227,
        m_accident: 45,
        m_accident_feb: 32,
        m_records: 9681,
        m_records_feb: 10116,
        m_var: "-3.80%",
        sim_total: 259,
        sim_a_count: 9,
        sim_a_ratio: 3.5,
        sim_a_lm: 3.9,
        sim_a_var: "-0.4%",
        sim_b_count: 20,
        sim_b_ratio: 7.7,
        sim_b_lm: 10.9,
        sim_b_var: "-3.2%",
        sim_c_count: 122,
        sim_c_ratio: 47.1,
        sim_c_lm: 52.1,
        sim_c_var: "-5.0%"
    },
    {
        region: "嘉義",
        mapNames: [
            "嘉義市",
            "嘉義縣"
        ],
        overall: 89.79,
        overall_feb: 92.06,
        station: 97,
        station_feb: 99,
        appearance: 89,
        appearance_feb: 85,
        functionality: 97,
        functionality_feb: 97,
        ems: 79.1,
        ems_feb: 91.4,
        operability: 95.1,
        operability_feb: 95.29,
        mapCenter: [
            120.45,
            23.48
        ],
        labelPos: [
            119.5,
            23.5
        ],
        base: {
            s: 9,
            v: 68,
            e: 12,
            t: "2 輛 (2.9%)"
        },
        tire_history: [
            1,
            0,
            3,
            1,
            1,
            2.5,
            2.9
        ],
        tire_count: 2,
        maintenance_rate: 79.1,
        maintenance_rate_feb: 91.4,
        m_fleet: 3586,
        m_fleet_feb: 3456,
        m_accident: 9,
        m_accident_feb: 7,
        m_records: 2810,
        m_records_feb: 3129,
        m_var: "-12.30%",
        sim_total: 80,
        sim_a_count: 6,
        sim_a_ratio: 7.5,
        sim_a_lm: 2,
        sim_a_var: "+5.5%",
        sim_b_count: 22,
        sim_b_ratio: 27.5,
        sim_b_lm: 25,
        sim_b_var: "+2.5%",
        sim_c_count: 45,
        sim_c_ratio: 56.3,
        sim_c_lm: 61,
        sim_c_var: "-4.7%"
    },
    {
        region: "台南",
        mapNames: [
            "臺南市",
            "台南市"
        ],
        overall: 94.79,
        overall_feb: 95.81,
        station: 99,
        station_feb: 100,
        appearance: 90,
        appearance_feb: 90,
        functionality: 98,
        functionality_feb: 98,
        ems: 98.2,
        ems_feb: 98.5,
        operability: 97.1,
        operability_feb: 99.12,
        mapCenter: [
            120.25,
            23.14
        ],
        labelPos: [
            119.5,
            23.1
        ],
        base: {
            s: 21,
            v: 156,
            e: 34,
            t: "6 輛 (3.9%)"
        },
        tire_history: [
            7,
            2,
            0,
            1,
            2,
            4.9,
            3.9
        ],
        tire_count: 6,
        maintenance_rate: 98.2,
        maintenance_rate_feb: 98.5,
        m_fleet: 8000,
        m_fleet_feb: 8000,
        m_accident: 12,
        m_accident_feb: 10,
        m_records: 7843,
        m_records_feb: 7869,
        m_var: "-0.30%",
        sim_total: 142,
        sim_a_count: 2,
        sim_a_ratio: 1.4,
        sim_a_lm: 3.9,
        sim_a_var: "-2.5%",
        sim_b_count: 31,
        sim_b_ratio: 21.8,
        sim_b_lm: 13.3,
        sim_b_var: "+8.5%",
        sim_c_count: 74,
        sim_c_ratio: 52.1,
        sim_c_lm: 65.6,
        sim_c_var: "-13.5%"
    },
    {
        region: "高雄",
        mapNames: [
            "高雄市"
        ],
        overall: 90.15,
        overall_feb: 87.73,
        station: 99,
        station_feb: 99,
        appearance: 87,
        appearance_feb: 84,
        functionality: 95,
        functionality_feb: 95,
        ems: 89.1,
        ems_feb: 82.7,
        operability: 96.8,
        operability_feb: 94.8,
        mapCenter: [
            120.31,
            22.62
        ],
        labelPos: [
            119.5,
            22.7
        ],
        base: {
            s: 42,
            v: 265,
            e: 40,
            t: "33 輛 (12.4%)"
        },
        tire_history: [
            15,
            8,
            3,
            0,
            7,
            4.9,
            12.4
        ],
        tire_count: 33,
        maintenance_rate: 89.1,
        maintenance_rate_feb: 82.7,
        m_fleet: 14070,
        m_fleet_feb: 13825,
        m_accident: 34,
        m_accident_feb: 34,
        m_records: 12355,
        m_records_feb: 11273,
        m_var: "6.40%",
        sim_total: 288,
        sim_a_count: 11,
        sim_a_ratio: 3.8,
        sim_a_lm: 6.2,
        sim_a_var: "-2.4%",
        sim_b_count: 69,
        sim_b_ratio: 24,
        sim_b_lm: 28.9,
        sim_b_var: "-4.9%",
        sim_c_count: 194,
        sim_c_ratio: 67.4,
        sim_c_lm: 70.8,
        sim_c_var: "-3.4%"
    },
    {
        region: "屏東",
        mapNames: [
            "屏東縣"
        ],
        overall: 94,
        overall_feb: 91.8,
        station: 100,
        station_feb: 100,
        appearance: 95,
        appearance_feb: 95,
        functionality: 96,
        functionality_feb: 94,
        ems: 95.3,
        ems_feb: 100,
        operability: 96.5,
        operability_feb: 94.67,
        mapCenter: [
            120.6,
            22.5
        ],
        labelPos: [
            119.5,
            22.3
        ],
        base: {
            s: 6,
            v: 40,
            e: 14,
            t: "6 輛 (15%)"
        },
        tire_history: [
            13,
            5,
            3,
            6,
            5,
            2.5,
            15
        ],
        tire_count: 6,
        maintenance_rate: 95.3,
        maintenance_rate_feb: 100,
        m_fleet: 2145,
        m_fleet_feb: 1985,
        m_accident: 18,
        m_accident_feb: 17,
        m_records: 1981,
        m_records_feb: 1961,
        m_var: "-4.70%",
        sim_total: 40,
        sim_a_count: 2,
        sim_a_ratio: 5,
        sim_a_lm: 10.3,
        sim_a_var: "-5.3%",
        sim_b_count: 6,
        sim_b_ratio: 15,
        sim_b_lm: 17.9,
        sim_b_var: "-2.9%",
        sim_c_count: 25,
        sim_c_ratio: 62.5,
        sim_c_lm: 64.1,
        sim_c_var: "-1.6%"
    },
    {
        region: "台東",
        mapNames: [
            "臺東縣",
            "台東縣"
        ],
        overall: 97.83,
        overall_feb: 97.92,
        station: 96,
        station_feb: 100,
        appearance: 95,
        appearance_feb: 95,
        functionality: 99,
        functionality_feb: 99,
        ems: 100,
        ems_feb: 100,
        operability: 100,
        operability_feb: 100,
        mapCenter: [
            121.14,
            22.75
        ],
        labelPos: [
            122.5,
            22.7
        ],
        base: {
            s: 4,
            v: 24,
            e: 12,
            t: "0 輛 (0%)"
        },
        tire_history: [
            0,
            0,
            0,
            0,
            0,
            4.2,
            0
        ],
        tire_count: 0,
        maintenance_rate: 100,
        maintenance_rate_feb: 100,
        m_fleet: 1120,
        m_fleet_feb: 1120,
        m_accident: 8,
        m_accident_feb: 6,
        m_records: 1110,
        m_records_feb: 1117,
        m_var: "0.00%",
        sim_total: 24,
        sim_a_count: 0,
        sim_a_ratio: 0,
        sim_a_lm: 0,
        sim_a_var: "0.0%",
        sim_b_count: 3,
        sim_b_ratio: 12.5,
        sim_b_lm: 8.3,
        sim_b_var: "+4.2%",
        sim_c_count: 12,
        sim_c_ratio: 50,
        sim_c_lm: 50,
        sim_c_var: "0.0%"
    }
];

const globalAverages = {
    overall: 90.79,
    overall_feb: 91.91,
    total_s: 298,
    total_v: 2109,
    total_e: 351,
    station: 95,
    appearance: 87,
    functionality: 97,
    operability: 96.5,
    m_fleet: 115629,
    m_accident: 472,
    m_records: 101471,
    maintenance_rate: 89.66,
    ems: 89.66,
    m_var: "-",
    station_feb: 96,
    appearance_feb: 86,
    functionality_feb: 97,
    operability_feb: 96.98,
    maintenance_rate_feb: 89.11,
    ems_feb: 89.11
};

// 子選單邏輯
const statsMetrics = [
    { key: 'station', label: '場站妥善度' },
    { key: 'appearance', label: '自行車外觀與標示' },
    { key: 'functionality', label: '自行車重要機能' },
    { key: 'ems', label: '一級維護率(EMS)' },
    { key: 'operability', label: '可動率' }
];

const maintenanceMetrics = [
    { key: 'm_accident', label: '事故車輛數' },
    { key: 'm_records', label: '一級維護記錄數' },
    { key: 'maintenance_rate', label: '一級維護率' },
    { key: 'm_info', label: '一級維護補充說明' }
];

// 模擬體驗數據
const simulationMetrics = [
    { key: 'sim_a', label: 'A級' },
    { key: 'sim_b', label: 'B級' },
    { key: 'sim_c', label: 'C級' }
];

// =====================================================================
// ETL 自動注入全域變數腳本
// =====================================================================
window.GLOBAL_YEAR = 2026;
window.GLOBAL_MONTH = 10;

if (typeof rawData !== 'undefined' && rawData.length > 0) {
    rawData[0].month = "2026/10";
}
