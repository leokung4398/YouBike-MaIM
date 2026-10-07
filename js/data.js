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
        overall: 92.23,
        overall_feb: 89.08,
        station: 93,
        station_feb: 94,
        appearance: 85,
        appearance_feb: 86,
        functionality: 97,
        functionality_feb: 98,
        ems: 90.5,
        ems_feb: 75.07,
        operability: 97.03,
        operability_feb: 96.87,
        mapCenter: [
            121.56,
            25.03
        ],
        labelPos: [
            122.5,
            25.3
        ],
        base: {
            s: 119,
            v: 870,
            e: 125,
            t: "36 輛 (4.1%)"
        },
        tire_history: [
            11,
            10,
            1,
            3,
            3,
            3.8,
            4.1
        ],
        tire_count: 36,
        maintenance_rate: 90.5,
        maintenance_rate_feb: 75.07,
        m_fleet: 51108,
        m_fleet_feb: 51108,
        m_accident: 195,
        m_accident_feb: 227,
        m_records: 44880,
        m_records_feb: 37237,
        m_var: "15.43%",
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
        overall: 91.15,
        overall_feb: 89.26,
        station: 99,
        station_feb: 98,
        appearance: 85,
        appearance_feb: 84,
        functionality: 97,
        functionality_feb: 98,
        ems: 89.1,
        ems_feb: 80.12,
        operability: 96.4,
        operability_feb: 94.35,
        mapCenter: [
            121.21,
            24.95
        ],
        labelPos: [
            119.5,
            25.1
        ],
        base: {
            s: 31,
            v: 238,
            e: 35,
            t: "8 輛 (3.4%)"
        },
        tire_history: [
            9,
            11,
            3,
            4,
            3,
            4.4,
            3.4
        ],
        tire_count: 8,
        maintenance_rate: 89.1,
        maintenance_rate_feb: 80.12,
        m_fleet: 12107,
        m_fleet_feb: 12107,
        m_accident: 46,
        m_accident_feb: 58,
        m_records: 10647,
        m_records_feb: 9463,
        m_var: "8.98%",
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
        overall: 91.64,
        overall_feb: 93.41,
        station: 99,
        station_feb: 97,
        appearance: 85,
        appearance_feb: 85,
        functionality: 97,
        functionality_feb: 98,
        ems: 94.8,
        ems_feb: 95.55,
        operability: 95.78,
        operability_feb: 97.8,
        mapCenter: [
            121.01,
            24.82
        ],
        labelPos: [
            119.5,
            24.7
        ],
        base: {
            s: 16,
            v: 105,
            e: 30,
            t: "6 輛 (5.7%)"
        },
        tire_history: [
            8,
            8,
            1,
            3,
            1,
            3.4,
            5.7
        ],
        tire_count: 6,
        maintenance_rate: 94.8,
        maintenance_rate_feb: 95.55,
        m_fleet: 5616,
        m_fleet_feb: 5421,
        m_accident: 47,
        m_accident_feb: 51,
        m_records: 5276,
        m_records_feb: 5047,
        m_var: "-0.75%",
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
        overall: 95.31,
        overall_feb: 98.13,
        station: 99,
        station_feb: 98,
        appearance: 91,
        appearance_feb: 96,
        functionality: 98,
        functionality_feb: 99,
        ems: 92,
        ems_feb: 92.19,
        operability: 98.18,
        operability_feb: 100,
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
            v: 64,
            e: 26,
            t: "0 輛 (0%)"
        },
        tire_history: [
            0,
            0,
            2,
            3,
            8,
            8,
            0
        ],
        tire_count: 0,
        maintenance_rate: 92,
        maintenance_rate_feb: 92.19,
        m_fleet: 3650,
        m_fleet_feb: 3490,
        m_accident: 15,
        m_accident_feb: 21,
        m_records: 3272,
        m_records_feb: 3138,
        m_var: "-0.19%",
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
        overall: 92.18,
        overall_feb: 92.31,
        station: 96,
        station_feb: 97,
        appearance: 91,
        appearance_feb: 92,
        functionality: 97,
        functionality_feb: 98,
        ems: 78.1,
        ems_feb: 78.41,
        operability: 99.26,
        operability_feb: 97.02,
        mapCenter: [
            120.67,
            24.14
        ],
        labelPos: [
            119.5,
            23.9
        ],
        base: {
            s: 40,
            v: 254,
            e: 13,
            t: "16 輛 (6.3%)"
        },
        tire_history: [
            1,
            2,
            0,
            3,
            3,
            3.9,
            6.3
        ],
        tire_count: 16,
        maintenance_rate: 78.1,
        maintenance_rate_feb: 78.41,
        m_fleet: 13227,
        m_fleet_feb: 13077,
        m_accident: 32,
        m_accident_feb: 41,
        m_records: 10116,
        m_records_feb: 10142,
        m_var: "-0.31%",
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
        overall: 92.06,
        overall_feb: 94.36,
        station: 99,
        station_feb: 98,
        appearance: 85,
        appearance_feb: 92,
        functionality: 97,
        functionality_feb: 98,
        ems: 91.4,
        ems_feb: 96.88,
        operability: 95.29,
        operability_feb: 96.12,
        mapCenter: [
            120.45,
            23.48
        ],
        labelPos: [
            119.5,
            23.5
        ],
        base: {
            s: 11,
            v: 66,
            e: 13,
            t: "2 輛 (3%)"
        },
        tire_history: [
            1,
            0,
            3,
            1,
            1,
            2.5,
            3
        ],
        tire_count: 2,
        maintenance_rate: 91.4,
        maintenance_rate_feb: 96.88,
        m_fleet: 3456,
        m_fleet_feb: 3456,
        m_accident: 7,
        m_accident_feb: 4,
        m_records: 3129,
        m_records_feb: 3322,
        m_var: "-5.48%",
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
        overall: 95.81,
        overall_feb: 95.92,
        station: 100,
        station_feb: 100,
        appearance: 90,
        appearance_feb: 88,
        functionality: 98,
        functionality_feb: 99,
        ems: 98.5,
        ems_feb: 100,
        operability: 99.12,
        operability_feb: 99.55,
        mapCenter: [
            120.25,
            23.14
        ],
        labelPos: [
            119.5,
            23.1
        ],
        base: {
            s: 22,
            v: 156,
            e: 34,
            t: "10 輛 (6.4%)"
        },
        tire_history: [
            7,
            2,
            0,
            1,
            2,
            4.9,
            6.4
        ],
        tire_count: 10,
        maintenance_rate: 98.5,
        maintenance_rate_feb: 100,
        m_fleet: 8000,
        m_fleet_feb: 8000,
        m_accident: 10,
        m_accident_feb: 8,
        m_records: 7869,
        m_records_feb: 7992,
        m_var: "-1.50%",
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
        overall: 87.73,
        overall_feb: 89.31,
        station: 99,
        station_feb: 99,
        appearance: 84,
        appearance_feb: 80,
        functionality: 95,
        functionality_feb: 95,
        ems: 82.7,
        ems_feb: 92.41,
        operability: 94.8,
        operability_feb: 96.18,
        mapCenter: [
            120.31,
            22.62
        ],
        labelPos: [
            119.5,
            22.7
        ],
        base: {
            s: 41,
            v: 267,
            e: 37,
            t: "29 輛 (10.9%)"
        },
        tire_history: [
            15,
            8,
            3,
            0,
            7,
            4.9,
            10.9
        ],
        tire_count: 29,
        maintenance_rate: 82.7,
        maintenance_rate_feb: 92.41,
        m_fleet: 13825,
        m_fleet_feb: 13690,
        m_accident: 34,
        m_accident_feb: 57,
        m_records: 11273,
        m_records_feb: 12472,
        m_var: "-9.71%",
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
        overall: 91.8,
        overall_feb: 94.3,
        station: 100,
        station_feb: 100,
        appearance: 95,
        appearance_feb: 95,
        functionality: 94,
        functionality_feb: 95,
        ems: 100,
        ems_feb: 96.42,
        operability: 94.67,
        operability_feb: 98.31,
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
            t: "5 輛 (12.5%)"
        },
        tire_history: [
            13,
            5,
            3,
            6,
            5,
            2.5,
            12.5
        ],
        tire_count: 5,
        maintenance_rate: 100,
        maintenance_rate_feb: 96.42,
        m_fleet: 1985,
        m_fleet_feb: 1985,
        m_accident: 17,
        m_accident_feb: 16,
        m_records: 1961,
        m_records_feb: 1884,
        m_var: "3.58%",
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
        overall: 97.92,
        overall_feb: 97.42,
        station: 100,
        station_feb: 96,
        appearance: 95,
        appearance_feb: 97,
        functionality: 99,
        functionality_feb: 98,
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
        m_accident: 6,
        m_accident_feb: 1,
        m_records: 1117,
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
    overall_feb: 90.83,
    total_s: 300,
    total_v: 2084,
    total_e: 339,
    station: 96,
    appearance: 86,
    functionality: 97,
    overall: 91.91,
    m_fleet: 114094,
    m_fleet_feb: 113454,
    m_accident: 409,
    m_records: 99540,
    maintenance_rate: 89.11,
    ems: 89.11,
    m_var: "7.63%",
    operability: 96.98,
    station_feb: 96,
    appearance_feb: 86,
    functionality_feb: 98,
    operability_feb: 96.86,
    maintenance_rate_feb: 81.48,
    ems_feb: 81.48
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
window.GLOBAL_MONTH = 9;

if (typeof rawData !== 'undefined' && rawData.length > 0) {
    rawData[0].month = "2026/09";
}
