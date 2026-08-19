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
        overall: 89.99,
        overall_feb: 89.01,
        station: 96,
        station_feb: 95,
        appearance: 88,
        appearance_feb: 87,
        functionality: 97,
        functionality_feb: 98,
        ems: 75.12,
        ems_feb: 76.69,
        operability: 97.32,
        operability_feb: 95.34,
        mapCenter: [
            121.56,
            25.03
        ],
        labelPos: [
            122.5,
            25.3
        ],
        base: {
            s: 150,
            v: 1053,
            e: 151,
            t: "41 輛 (3.9%)"
        },
        tire_history: [
            11,
            10,
            1,
            3,
            3,
            3.8,
            3.9
        ],
        tire_count: 41,
        maintenance_rate: 75.12,
        maintenance_rate_feb: 76.69,
        m_fleet: 50917,
        m_fleet_feb: 50284,
        m_accident: 282,
        m_accident_feb: 195,
        m_records: 36129,
        m_records_feb: 37457,
        m_var: "-1.57%",
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
        overall: 92.01,
        overall_feb: 92.05,
        station: 97,
        station_feb: 97,
        appearance: 91,
        appearance_feb: 90,
        functionality: 95,
        functionality_feb: 97,
        ems: 85.33,
        ems_feb: 85.09,
        operability: 97.58,
        operability_feb: 97.51,
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
            v: 246,
            e: 37,
            t: "28 輛 (11.4%)"
        },
        tire_history: [
            9,
            11,
            3,
            4,
            3,
            4.4,
            11.4
        ],
        tire_count: 28,
        maintenance_rate: 85.33,
        maintenance_rate_feb: 85.09,
        m_fleet: 12107,
        m_fleet_feb: 12107,
        m_accident: 195,
        m_accident_feb: 25,
        m_records: 9905,
        m_records_feb: 9802,
        m_var: "0.24%",
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
        overall: 95.52,
        overall_feb: 95.03,
        station: 96,
        station_feb: 98,
        appearance: 91,
        appearance_feb: 93,
        functionality: 98,
        functionality_feb: 99,
        ems: 95.74,
        ems_feb: 96.2,
        operability: 99.15,
        operability_feb: 96.99,
        mapCenter: [
            121.01,
            24.82
        ],
        labelPos: [
            119.5,
            24.7
        ],
        base: {
            s: 15,
            v: 105,
            e: 29,
            t: "4 輛 (3.8%)"
        },
        tire_history: [
            8,
            8,
            1,
            3,
            1,
            3.4,
            3.8
        ],
        tire_count: 4,
        maintenance_rate: 95.74,
        maintenance_rate_feb: 96.2,
        m_fleet: 5066,
        m_fleet_feb: 5066,
        m_accident: 29,
        m_accident_feb: 26,
        m_records: 4806,
        m_records_feb: 4762,
        m_var: "-0.46%",
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
        overall: 96.17,
        overall_feb: 92.29,
        station: 96,
        station_feb: 95,
        appearance: 94,
        appearance_feb: 85,
        functionality: 99,
        functionality_feb: 98,
        ems: 96.34,
        ems_feb: 98.36,
        operability: 98.58,
        operability_feb: 97.48,
        mapCenter: [
            120.82,
            24.56
        ],
        labelPos: [
            119.5,
            24.3
        ],
        base: {
            s: 9,
            v: 60,
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
        maintenance_rate: 96.34,
        maintenance_rate_feb: 98.36,
        m_fleet: 3220,
        m_fleet_feb: 2950,
        m_accident: 18,
        m_accident_feb: 2,
        m_records: 2952,
        m_records_feb: 2885,
        m_var: "-2.02%",
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
        overall: 93.94,
        overall_feb: 93.13,
        station: 95,
        station_feb: 98,
        appearance: 92,
        appearance_feb: 91,
        functionality: 99,
        functionality_feb: 98,
        ems: 83.56,
        ems_feb: 84.78,
        operability: 99.1,
        operability_feb: 98.56,
        mapCenter: [
            120.67,
            24.14
        ],
        labelPos: [
            119.5,
            23.9
        ],
        base: {
            s: 37,
            v: 264,
            e: 12,
            t: "4 輛 (1.5%)"
        },
        tire_history: [
            1,
            2,
            0,
            3,
            3,
            3.9,
            1.5
        ],
        tire_count: 4,
        maintenance_rate: 83.56,
        maintenance_rate_feb: 84.78,
        m_fleet: 13077,
        m_fleet_feb: 13077,
        m_accident: 59,
        m_accident_feb: 45,
        m_records: 10671,
        m_records_feb: 10851,
        m_var: "-1.22%",
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
        overall: 90.58,
        overall_feb: 92.5,
        station: 99,
        station_feb: 98,
        appearance: 90,
        appearance_feb: 85,
        functionality: 90,
        functionality_feb: 97,
        ems: 97.39,
        ems_feb: 100,
        operability: 99.25,
        operability_feb: 97.3,
        mapCenter: [
            120.45,
            23.48
        ],
        labelPos: [
            119.5,
            23.5
        ],
        base: {
            s: 10,
            v: 66,
            e: 13,
            t: "11 輛 (16.7%)"
        },
        tire_history: [
            1,
            0,
            3,
            1,
            1,
            2.5,
            16.7
        ],
        tire_count: 11,
        maintenance_rate: 97.39,
        maintenance_rate_feb: 100,
        m_fleet: 3356,
        m_fleet_feb: 3266,
        m_accident: 6,
        m_accident_feb: 7,
        m_records: 3248,
        m_records_feb: 3248,
        m_var: "-2.61%",
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
        overall: 94.83,
        overall_feb: 94.34,
        station: 100,
        station_feb: 100,
        appearance: 90,
        appearance_feb: 91,
        functionality: 99,
        functionality_feb: 99,
        ems: 99.85,
        ems_feb: 80.09,
        operability: 97.57,
        operability_feb: 99.49,
        mapCenter: [
            120.25,
            23.14
        ],
        labelPos: [
            119.5,
            23.1
        ],
        base: {
            s: 19,
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
        maintenance_rate: 99.85,
        maintenance_rate_feb: 80.09,
        m_fleet: 8000,
        m_fleet_feb: 8000,
        m_accident: 19,
        m_accident_feb: 26,
        m_records: 7968,
        m_records_feb: 6384,
        m_var: "19.76%",
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
        overall: 89.58,
        overall_feb: 90.18,
        station: 100,
        station_feb: 99,
        appearance: 82,
        appearance_feb: 81,
        functionality: 96,
        functionality_feb: 96,
        ems: 100,
        ems_feb: 97.21,
        operability: 95.56,
        operability_feb: 98.74,
        mapCenter: [
            120.31,
            22.62
        ],
        labelPos: [
            119.5,
            22.7
        ],
        base: {
            s: 44,
            v: 268,
            e: 38,
            t: "25 輛 (9.3%)"
        },
        tire_history: [
            15,
            8,
            3,
            0,
            7,
            4.9,
            9.3
        ],
        tire_count: 25,
        maintenance_rate: 100,
        maintenance_rate_feb: 97.21,
        m_fleet: 13106,
        m_fleet_feb: 13106,
        m_accident: 52,
        m_accident_feb: 48,
        m_records: 12744,
        m_records_feb: 11846,
        m_var: "2.79%",
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
        overall: 94.85,
        overall_feb: 93.9,
        station: 100,
        station_feb: 100,
        appearance: 93,
        appearance_feb: 89,
        functionality: 97,
        functionality_feb: 96,
        ems: 100,
        ems_feb: 100,
        operability: 98.77,
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
            t: "0 輛 (0%)"
        },
        tire_history: [
            13,
            5,
            3,
            6,
            5,
            2.5,
            0
        ],
        tire_count: 0,
        maintenance_rate: 100,
        maintenance_rate_feb: 100,
        m_fleet: 1905,
        m_fleet_feb: 1905,
        m_accident: 12,
        m_accident_feb: 11,
        m_records: 1878,
        m_records_feb: 1859,
        m_var: "0.00%",
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
        overall: 96.42,
        overall_feb: 98,
        station: 100,
        station_feb: 100,
        appearance: 95,
        appearance_feb: 95,
        functionality: 97,
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
            s: 3,
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
        m_accident: 2,
        m_accident_feb: 4,
        m_records: 1118,
        m_records_feb: 1119,
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
    overall_feb: 91.26,
    m_fleet: 111874,
    m_accident: 674,
    m_records: 91419,
    maintenance_rate: 83.98,
    ems: 83.98,
    m_var: "0.81%",
    operability: 97.69,
    total_s: 324,
    total_v: 2282,
    total_e: 366,
    station: 97,
    appearance: 88,
    functionality: 97,
    overall: 91.53,
    maintenance_rate_feb: 83.17,
    ems_feb: 83.17,
    operability_feb: 97.04,
    station_feb: 97,
    appearance_feb: 88,
    functionality_feb: 98
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
window.GLOBAL_MONTH = 7;

if (typeof rawData !== 'undefined' && rawData.length > 0) {
    rawData[0].month = "2026/07";
}
