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
        overall: 89.08,
        overall_feb: 89.71,
        station: 94,
        station_feb: 95,
        appearance: 86,
        appearance_feb: 87,
        functionality: 98,
        functionality_feb: 97,
        ems: 75.07,
        ems_feb: 84.8,
        operability: 96.87,
        operability_feb: 95.85,
        mapCenter: [
            121.56,
            25.03
        ],
        labelPos: [
            122.5,
            25.3
        ],
        base: {
            s: 124,
            v: 935,
            e: 122,
            t: "39 輛 (4.2%)"
        },
        tire_history: [
            11,
            10,
            1,
            3,
            3,
            3.8,
            4.2
        ],
        tire_count: 39,
        maintenance_rate: 75.07,
        maintenance_rate_feb: 84.83,
        m_fleet: 51108,
        m_fleet_feb: 49635,
        m_accident: 227,
        m_accident_feb: 178,
        m_records: 37237,
        m_records_feb: 40837,
        m_var: "-0.05%",
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
        overall: 89.26,
        overall_feb: 89.83,
        station: 98,
        station_feb: 98,
        appearance: 84,
        appearance_feb: 89,
        functionality: 98,
        functionality_feb: 97,
        ems: 80.12,
        ems_feb: 88.4,
        operability: 94.35,
        operability_feb: 92.89,
        mapCenter: [
            121.21,
            24.95
        ],
        labelPos: [
            119.5,
            25.1
        ],
        base: {
            s: 34,
            v: 244,
            e: 25,
            t: "9 輛 (3.7%)"
        },
        tire_history: [
            9,
            11,
            3,
            4,
            3,
            4.4,
            3.7
        ],
        tire_count: 9,
        maintenance_rate: 80.12,
        maintenance_rate_feb: 88.36,
        m_fleet: 12107,
        m_fleet_feb: 12107,
        m_accident: 58,
        m_accident_feb: 35,
        m_records: 9463,
        m_records_feb: 10489,
        m_var: "-5.21%",
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
        overall: 93.41,
        overall_feb: 95.41,
        station: 97,
        station_feb: 96,
        appearance: 85,
        appearance_feb: 93,
        functionality: 98,
        functionality_feb: 98,
        ems: 95.55,
        ems_feb: 98.3,
        operability: 97.8,
        operability_feb: 98.27,
        mapCenter: [
            121.01,
            24.82
        ],
        labelPos: [
            119.5,
            24.7
        ],
        base: {
            s: 17,
            v: 102,
            e: 27,
            t: "1 輛 (1%)"
        },
        tire_history: [
            8,
            8,
            1,
            3,
            1,
            3.4,
            1
        ],
        tire_count: 1,
        maintenance_rate: 95.55,
        maintenance_rate_feb: 98.32,
        m_fleet: 5421,
        m_fleet_feb: 4796,
        m_accident: 51,
        m_accident_feb: 21,
        m_records: 5047,
        m_records_feb: 4620,
        m_var: "-0.19%",
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
        overall: 98.13,
        overall_feb: 92.96,
        station: 98,
        station_feb: 97,
        appearance: 96,
        appearance_feb: 91,
        functionality: 99,
        functionality_feb: 95,
        ems: 92.19,
        ems_feb: 93,
        operability: 100,
        operability_feb: 97.35,
        mapCenter: [
            120.82,
            24.56
        ],
        labelPos: [
            119.5,
            24.3
        ],
        base: {
            s: 12,
            v: 61,
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
        maintenance_rate: 92.19,
        maintenance_rate_feb: 92.97,
        m_fleet: 3490,
        m_fleet_feb: 2500,
        m_accident: 21,
        m_accident_feb: 21,
        m_records: 3138,
        m_records_feb: 2276,
        m_var: "-4.15%",
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
        overall: 92.31,
        overall_feb: 96.46,
        station: 97,
        station_feb: 98,
        appearance: 92,
        appearance_feb: 92,
        functionality: 98,
        functionality_feb: 99,
        ems: 78.41,
        ems_feb: 93.4,
        operability: 97.02,
        operability_feb: 99.47,
        mapCenter: [
            120.67,
            24.14
        ],
        labelPos: [
            119.5,
            23.9
        ],
        base: {
            s: 39,
            v: 273,
            e: 9,
            t: "6 輛 (2.2%)"
        },
        tire_history: [
            1,
            2,
            0,
            3,
            3,
            3.9,
            2.2
        ],
        tire_count: 6,
        maintenance_rate: 78.41,
        maintenance_rate_feb: 93.44,
        m_fleet: 13077,
        m_fleet_feb: 12987,
        m_accident: 41,
        m_accident_feb: 58,
        m_records: 10142,
        m_records_feb: 11870,
        m_var: "-5.15%",
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
        overall: 94.36,
        overall_feb: 93.83,
        station: 98,
        station_feb: 98,
        appearance: 92,
        appearance_feb: 88,
        functionality: 98,
        functionality_feb: 96,
        ems: 96.88,
        ems_feb: 94.9,
        operability: 96.12,
        operability_feb: 99.25,
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
            v: 66,
            e: 13,
            t: "4 輛 (6.1%)"
        },
        tire_history: [
            1,
            0,
            3,
            1,
            1,
            2.5,
            6.1
        ],
        tire_count: 4,
        maintenance_rate: 96.88,
        maintenance_rate_feb: 94.86,
        m_fleet: 3456,
        m_fleet_feb: 2936,
        m_accident: 4,
        m_accident_feb: 7,
        m_records: 3322,
        m_records_feb: 2767,
        m_var: "-0.51%",
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
        overall: 95.92,
        overall_feb: 94.03,
        station: 100,
        station_feb: 99,
        appearance: 88,
        appearance_feb: 90,
        functionality: 99,
        functionality_feb: 97,
        ems: 100,
        ems_feb: 93.5,
        operability: 99.55,
        operability_feb: 98.42,
        mapCenter: [
            120.25,
            23.14
        ],
        labelPos: [
            119.5,
            23.1
        ],
        base: {
            s: 23,
            v: 156,
            e: 34,
            t: "5 輛 (3.2%)"
        },
        tire_history: [
            7,
            2,
            0,
            1,
            2,
            4.9,
            3.2
        ],
        tire_count: 5,
        maintenance_rate: 100,
        maintenance_rate_feb: 93.49,
        m_fleet: 8000,
        m_fleet_feb: 7580,
        m_accident: 8,
        m_accident_feb: 24,
        m_records: 7992,
        m_records_feb: 7018,
        m_var: "0.15%",
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
        overall: 89.31,
        overall_feb: 91.72,
        station: 99,
        station_feb: 100,
        appearance: 80,
        appearance_feb: 83,
        functionality: 95,
        functionality_feb: 97,
        ems: 92.41,
        ems_feb: 100,
        operability: 96.18,
        operability_feb: 98.31,
        mapCenter: [
            120.31,
            22.62
        ],
        labelPos: [
            119.5,
            22.7
        ],
        base: {
            s: 37,
            v: 268,
            e: 38,
            t: "36 輛 (13.4%)"
        },
        tire_history: [
            15,
            8,
            3,
            0,
            7,
            4.9,
            13.4
        ],
        tire_count: 36,
        maintenance_rate: 92.41,
        maintenance_rate_feb: 100,
        m_fleet: 13690,
        m_fleet_feb: 13106,
        m_accident: 57,
        m_accident_feb: 53,
        m_records: 12472,
        m_records_feb: 12989,
        m_var: "-7.59%",
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
        overall: 94.3,
        overall_feb: 95.2,
        station: 100,
        station_feb: 100,
        appearance: 95,
        appearance_feb: 89,
        functionality: 95,
        functionality_feb: 98,
        ems: 96.42,
        ems_feb: 100,
        operability: 98.31,
        operability_feb: 100,
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
        maintenance_rate: 96.42,
        maintenance_rate_feb: 100,
        m_fleet: 1985,
        m_fleet_feb: 1905,
        m_accident: 16,
        m_accident_feb: 14,
        m_records: 1884,
        m_records_feb: 1886,
        m_var: "-3.58%",
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
        overall: 97.42,
        overall_feb: 96.58,
        station: 96,
        station_feb: 100,
        appearance: 97,
        appearance_feb: 93,
        functionality: 98,
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
            t: "1 輛 (4.2%)"
        },
        tire_history: [
            0,
            0,
            0,
            0,
            0,
            4.2,
            4.2
        ],
        tire_count: 1,
        maintenance_rate: 100,
        maintenance_rate_feb: 100,
        m_fleet: 1120,
        m_fleet_feb: 1120,
        m_accident: 1,
        m_accident_feb: 7,
        m_records: 1117,
        m_records_feb: 1138,
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
    overall_feb: 91.84,
    total_s: 305,
    total_v: 2169,
    total_e: 320,
    station: 96,
    appearance: 86,
    functionality: 98,
    overall: 90.83,
    operability: 96.86,
    m_fleet: 113454,
    m_accident: 484,
    m_records: 91814,
    maintenance_rate: 81.48,
    ems: 81.48,
    m_var: "-2.50%"
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
window.GLOBAL_MONTH = 8;

if (typeof rawData !== 'undefined' && rawData.length > 0) {
    rawData[0].month = "2026/08";
}
