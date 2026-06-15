// js/app.js

// 🌟 1. 實裝全自動動態月份應答
let globalYear = window.GLOBAL_YEAR || 2026;
let globalMonth = window.GLOBAL_MONTH || 4;

if (typeof rawData !== 'undefined' && rawData.length > 0) {
    if (rawData[0].month) {
        let mMatch = String(rawData[0].month).match(/(\d{4})[\/\-](\d{1,2})/);
        if (mMatch) {
            globalYear = parseInt(mMatch[1], 10);
            globalMonth = parseInt(mMatch[2], 10);
        }
    }
}

let prevMonth = globalMonth === 1 ? 12 : globalMonth - 1;
let prevYear = globalMonth === 1 ? globalYear - 1 : globalYear;

let currMonthStr = `${globalMonth}月`;
let prevMonthStr = `${prevMonth}月`;
let currYearMonthStr = `${globalYear}/${globalMonth.toString().padStart(2, '0')}`;

document.addEventListener('DOMContentLoaded', () => {
    document.title = `維修維護提升改善會議 ${currYearMonthStr} 資訊`;
    let elH1 = document.getElementById('dyn-header-month');
    if (elH1) elH1.innerText = currYearMonthStr;
    let elBase = document.getElementById('dyn-base-month');
    if (elBase) elBase.innerText = currYearMonthStr;
    let elPrevFleet = document.getElementById('dyn-prev-fleet-month');
    if (elPrevFleet) elPrevFleet.innerText = `${prevYear}/${prevMonth.toString().padStart(2, '0')}`;
    let elCurrFleet = document.getElementById('dyn-curr-fleet-month');
    if (elCurrFleet) elCurrFleet.innerText = currYearMonthStr;
    let elCurrSim = document.getElementById('dyn-curr-sim-month');
    if (elCurrSim) elCurrSim.innerText = currYearMonthStr;

    // 🌟 實作「全台動態總計與平均計算器」與「全台綜合分數卡片」
    if (typeof rawData !== 'undefined' && rawData.length > 0) {
        let totalS = typeof globalAverages !== 'undefined' && globalAverages.total_s ? globalAverages.total_s : 0;
        let totalV = typeof globalAverages !== 'undefined' && globalAverages.total_v ? globalAverages.total_v : 0;
        let totalE = typeof globalAverages !== 'undefined' && globalAverages.total_e ? globalAverages.total_e : 0;
        let totalTire = 0;
        let sumOverall = 0;
        let sumOverallFeb = 0;
        
        rawData.forEach(r => {
            if (typeof globalAverages === 'undefined' || !globalAverages.total_s) {
                if (r.base) {
                    totalS += r.base.s || 0;
                    totalV += r.base.v || 0;
                    totalE += r.base.e || 0;
                }
            }
            totalTire += r.tire_count || 0;
            sumOverall += r.overall || 0;
            sumOverallFeb += r.overall_feb || 0;
        });
        
        let tireRatio = totalV > 0 ? ((totalTire / totalV) * 100).toFixed(1) : 0;
        
        // 如果有 globalAverages.overall 優先使用，否則自己算平均
        let avgOverall = typeof globalAverages !== 'undefined' && globalAverages.overall ? globalAverages.overall : (sumOverall / rawData.length).toFixed(2);
        
        // 完全移除簡單除法，強制讀取 ETL 降級備份的全台總分 (官方 91.84)
        let avgOverallFeb = typeof globalAverages !== 'undefined' && globalAverages.overall_feb ? globalAverages.overall_feb : 91.84;
        
        let diff = (avgOverall - avgOverallFeb).toFixed(2);
        let diffIcon = diff > 0 ? '▲' : (diff < 0 ? '▼' : '-');
        let diffColor = diff > 0 ? 'var(--safe-color)' : (diff < 0 ? 'var(--danger-color)' : 'var(--text-secondary)');

        let gridContainer = document.querySelector('.floating-base-metrics .base-metrics-grid');
        if (gridContainer) {
            // 更新既有四個格子數值
            let cards = gridContainer.querySelectorAll('.metric-card:not(.highlight-card) .metric-value');
            if (cards.length >= 4) {
                cards[0].innerText = `${totalS} 站`;
                cards[1].innerText = `${totalV.toLocaleString()} 輛`;
                cards[2].innerText = `${totalE.toLocaleString()} 輛`;
                cards[3].innerText = `${totalTire.toLocaleString()} 輛 (${tireRatio}%)`;
            }
            
            // 插入全台平均綜合分數 Banner
            if (!document.getElementById('dyn-overall-avg-card')) {
                let avgCard = document.createElement('div');
                avgCard.id = 'dyn-overall-avg-card';
                avgCard.className = 'metric-card highlight-card';
                avgCard.style.gridColumn = '1 / -1';
                avgCard.style.display = 'flex';
                avgCard.style.flexDirection = 'column';
                avgCard.style.alignItems = 'center';
                avgCard.style.justifyContent = 'center';
                avgCard.style.padding = '12px';
                avgCard.style.border = '2px solid var(--accent-color)';
                avgCard.style.backgroundColor = 'rgba(14, 165, 233, 0.05)';
                avgCard.style.marginBottom = '5px';
                
                avgCard.innerHTML = `
                    <div style="font-size: 13px; font-weight: bold; color: var(--text-secondary); margin-bottom: 5px;">全台綜合平均分數</div>
                    <div style="font-size: 26px; font-weight: bold; color: var(--accent-color); line-height: 1;">${avgOverall} <span style="font-size:14px;">分</span></div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-top: 6px;">
                        ${prevMonthStr}: ${avgOverallFeb} 
                        <span style="color: ${diffColor}; margin-left: 4px; font-size: 11px;">${diffIcon} ${Math.abs(diff)}</span>
                    </div>
                `;
                gridContainer.insertBefore(avgCard, gridContainer.firstChild);
            }
        }
    }
});

let isLightMode = true; 
let twGeoJson = null;
let currentMode = 'stats'; 
let showingFleetDetails = false;
let showingSimDetails = false;
let isDataView = false; 
let showVariance = false; 
let isPresentationMode = false; 
let isLaserMode = false;        
let isDataZoomed = false; // 數字放大狀態
let dataFontBoost = 1;    // 數字放大倍率

// 🌟 修改點：將預設指標改為綜合分數
let currentStatsMetric = 'overall'; 
let currentMaintenanceMetric = 'maintenance_rate';
let currentSimulationMetric = 'sim_a';

let globalFontScale = 1;

const mapChart = echarts.init(document.getElementById('mapChart'));
const barChart = echarts.init(document.getElementById('barChart'));

function injectSimData() {
    if (typeof simJsonData !== 'undefined') {
        simJsonData.forEach(sim => {
            let target = rawData.find(r => r.region === sim.region);
            if (target) {
                if (sim.current_month) {
                    target.sim_total = sim.current_month.total;
                    target.sim_a_count = sim.current_month.a;
                    target.sim_b_count = sim.current_month.b;
                    target.sim_c_count = sim.current_month.c;

                    target.sim_a_ratio = target.sim_total > 0 ? parseFloat((target.sim_a_count / target.sim_total * 100).toFixed(1)) : 0;
                    target.sim_b_ratio = target.sim_total > 0 ? parseFloat((target.sim_b_count / target.sim_total * 100).toFixed(1)) : 0;
                    target.sim_c_ratio = target.sim_total > 0 ? parseFloat((target.sim_c_count / target.sim_total * 100).toFixed(1)) : 0;

                    target.top_problems = sim.current_month.top_problems;
                }
                if (sim.prev_month) {
                    target.sim_total_lm = sim.prev_month.total || 0;
                    target.sim_a_lm = sim.prev_month.total > 0 ? parseFloat((sim.prev_month.a / sim.prev_month.total * 100).toFixed(1)) : 0;
                    target.sim_b_lm = sim.prev_month.total > 0 ? parseFloat((sim.prev_month.b / sim.prev_month.total * 100).toFixed(1)) : 0;
                    target.sim_c_lm = sim.prev_month.total > 0 ? parseFloat((sim.prev_month.c / sim.prev_month.total * 100).toFixed(1)) : 0;
                }
            }
        });
    }
}
injectSimData();

// 🌟 動態注入「綜合分數」到指標清單中 (確保只加入一次)
if (typeof statsMetrics !== 'undefined' && !statsMetrics.find(m => m.key === 'overall')) {
    statsMetrics.unshift({ key: 'overall', label: '綜合分數' });
}

function renderSubButtons() {
    // 🗑️ 徹底移除副按鈕，功能已完全移植至表格標題（Header Row）
    const btnContainer = document.getElementById('button-container');
    if (btnContainer) {
        btnContainer.innerHTML = ''; 
        btnContainer.style.display = 'none'; // 防呆隱藏
    }
}

window.triggerSubMetric = function(key) {
    // 🛑 1. 攔截 region (縣市) 與 mapNames，只處理排序，絕對不更新右側圖表以免崩潰
    if (key === 'region' || key === 'mapNames') {
        // 若未來有實作表格排序，可在此處執行
        return;
    }

    // 🔧 2. 修復模擬體驗圖表 Key 值錯位：將 count 映射回標準的 ratio / grade key
    if (key.includes('sim_') && key.includes('_count')) {
        key = key.replace('_count', '');
    }
    if (key === 'sim_total_count' || key === 'sim_total') {
        key = 'sim_total';
    }

    if(currentMode === 'stats') {
        currentStatsMetric = key;
        const fs = document.getElementById('floating-stats-area');
        if (fs) fs.classList.add('hidden');
    }
    if(currentMode === 'maintenance') currentMaintenanceMetric = key;
    if(currentMode === 'simulation') currentSimulationMetric = key;

    showVariance = false; 
    updateVarianceBtnUI();
    toggleDataView();
    if (isDataView) renderDataView(); 
    
    if (currentMode === 'maintenance' && currentMaintenanceMetric === 'm_info') {
        if (layoutState === 'left') layoutState = 'right';
        document.getElementById('barChart').classList.add('hidden');
        document.getElementById('varianceToggleBtn').classList.add('hidden');
        document.getElementById('maintenance-info-area').classList.remove('hidden');
    } else {
        document.getElementById('barChart').classList.remove('hidden');
        document.getElementById('maintenance-info-area').classList.add('hidden');
        // 不再呼叫 barChart.clear()，改用平滑的 setOption 防止隔番閃白
        setTimeout(() => { mapChart.resize(); barChart.resize(); }, 350);
        updateBarChart(); 
        updateMapTheme();
    }
    applyLayoutState();
};

document.getElementById('nav-stats').addEventListener('click', (e) => switchMode('stats', e.target));
document.getElementById('nav-tire').addEventListener('click', (e) => switchMode('tire', e.target));
document.getElementById('nav-operability').addEventListener('click', (e) => switchMode('operability', e.target));
document.getElementById('nav-maintenance').addEventListener('click', (e) => switchMode('maintenance', e.target));
document.getElementById('nav-simulation').addEventListener('click', (e) => switchMode('simulation', e.target));

function switchMode(mode, targetElement) {
    document.querySelectorAll('.top-nav button').forEach(btn => btn.classList.remove('active'));
    targetElement.classList.add('active');
    currentMode = mode;
    showVariance = false; 
    updateVarianceBtnUI();

    const maintMetricsArea = document.getElementById('maintenance-metrics-area');
    const simMetricsArea = document.getElementById('simulation-metrics-area');
    const detailPanel = document.getElementById('cityDetailPanel');
    const infoArea = document.getElementById('maintenance-info-area');
    const dashboard = document.getElementById('main-dashboard');
    const floatingStats = document.getElementById('floating-stats-area');

    maintMetricsArea.classList.add('hidden');
    simMetricsArea.classList.add('hidden');
    infoArea.classList.add('hidden');
    floatingStats.classList.add('hidden');
    document.getElementById('barChart').classList.remove('hidden');

    if (mode === 'stats') {
        currentStatsMetric = 'overall'; 
    } else {
        if (mode === 'maintenance') maintMetricsArea.classList.remove('hidden');
        else if (mode === 'simulation') simMetricsArea.classList.remove('hidden');
    }
    
    detailPanel.style.display = 'none';
    renderSubButtons();
    updateLegendBox();
    
    // 🌟 在切換大主分頁時，強制清理圖表，防範跨模式殘留
    if (barChart) barChart.clear();
    if (mapChart) mapChart.clear();
    
    updateMapTheme(); 
    toggleDataView();
    
    applyLayoutState();
    
    // 🌟 核心修復：延遲繪製以確保 DOM 已套用 flex 與寬高，並強制 ECharts resize
    setTimeout(() => {
        if (barChart) {
            barChart.resize();
        }
        if (mapChart) {
            mapChart.resize();
        }
        
        // 延遲更新圖表以吃到正確的寬高
        if (currentMode !== 'maintenance' || currentMaintenanceMetric !== 'm_info') {
            updateBarChart(); 
        }
    }, 50);
}

let layoutState = 'split';
document.getElementById('layoutToggleBtn').addEventListener('click', () => {
    if (layoutState === 'split') layoutState = 'left';
    else if (layoutState === 'left') layoutState = 'right';
    else layoutState = 'split';
    applyLayoutState();
});

function applyLayoutState() {
    const dashboard = document.getElementById('main-dashboard');
    const left = document.getElementById('map-panel-container');
    const right = document.getElementById('right-chart-panel');
    const btn = document.getElementById('layoutToggleBtn');
    
    if (!btn || !dashboard || !left || !right) return;

    if (currentMode === 'stats' && currentStatsMetric === '') {
        btn.style.display = 'none'; 
        left.style.display = 'flex'; left.style.flex = '1';
        right.style.display = 'none'; right.style.flex = '0';
        dashboard.className = 'dashboard layout-left';
    } else {
        btn.style.display = 'inline-block';
        dashboard.className = `dashboard layout-${layoutState}`;
        if (layoutState === 'split') { 
            left.style.display = 'flex'; left.style.flex = '1';
            right.style.display = 'flex'; right.style.flex = '1';
            btn.innerText = '🔀 雙拼視圖'; 
        } else if (layoutState === 'left') { 
            left.style.display = 'flex'; left.style.flex = '1';
            right.style.display = 'none'; right.style.flex = '0';
            btn.innerText = '🗺️ 滿版左區'; 
        } else if (layoutState === 'right') { 
            left.style.display = 'none'; left.style.flex = '0';
            right.style.display = 'flex'; right.style.flex = '1';
            btn.innerText = '📊 滿版右區'; 
        }
    }

    let startTime = Date.now();
    function smoothResize() {
        if(mapChart) mapChart.resize(); 
        if(barChart) barChart.resize();
        if (Date.now() - startTime < 450) { 
            requestAnimationFrame(smoothResize);
        }
    }
    requestAnimationFrame(smoothResize);
}

document.getElementById('mapDataToggleBtn').addEventListener('click', () => { isDataView = !isDataView; toggleDataView(); });

const varianceToggleBtn = document.getElementById('varianceToggleBtn');
if (varianceToggleBtn) {
    varianceToggleBtn.addEventListener('click', () => { showVariance = !showVariance; updateVarianceBtnUI(); updateBarChart(); });
}

function updateVarianceBtnUI() {
    if (!varianceToggleBtn) return;
    if (currentMode === 'tire' || currentMode === 'stats' && currentStatsMetric === '') { varianceToggleBtn.classList.add('hidden'); return; }
    varianceToggleBtn.classList.remove('hidden');
    let textEl = document.getElementById('varianceToggleText');
    let iconEl = document.querySelector('#varianceToggleBtn .btn-icon');
    if(textEl) textEl.innerText = showVariance ? '還原數值' : '較上月變動';
    if(iconEl) iconEl.innerText = showVariance ? '🔙' : '🔄';
    varianceToggleBtn.classList.toggle('active-mode', showVariance);
}

function toggleDataView() {
    const dataContainer = document.getElementById('data-view-container');
    const toggleBtn = document.getElementById('mapDataToggleBtn');
    const legendBox = document.getElementById('legend-box-content');
    const detailPanel = document.getElementById('cityDetailPanel');
    const floatingStats = document.getElementById('floating-stats-area');

    if (!toggleBtn) return;

    if (currentMode === 'stats' && currentStatsMetric === '') {
        isDataView = false; toggleBtn.classList.add('hidden'); 
        if(dataContainer) dataContainer.classList.add('hidden');
        if(legendBox) legendBox.classList.remove('hidden'); 
        if(floatingStats) floatingStats.classList.remove('hidden');
        if(varianceToggleBtn) varianceToggleBtn.classList.add('hidden'); return;
    }
    toggleBtn.classList.remove('hidden');
    let textEl = document.getElementById('mapDataToggleText');
    let iconEl = document.querySelector('#mapDataToggleBtn .btn-icon');
    if(textEl) textEl.innerText = isDataView ? '切換地圖顯示' : '切換數據報表';
    if(iconEl) iconEl.innerText = isDataView ? '🗺️' : '📋';
    updateVarianceBtnUI();

    if (isDataView) {
        if(dataContainer) dataContainer.classList.remove('hidden'); 
        if(legendBox) legendBox.classList.add('hidden');
        if(detailPanel) detailPanel.style.display = 'none'; 
        if(currentMode === 'stats' && floatingStats) floatingStats.classList.add('hidden');
        renderDataView();
    } else {
        if(dataContainer) dataContainer.classList.add('hidden'); 
        if(legendBox) legendBox.classList.remove('hidden');
        if(currentMode === 'stats' && currentStatsMetric === '' && floatingStats) floatingStats.classList.remove('hidden');
    }
}

window.highlightRow = function(region) {
    if (!isDataView) document.getElementById('mapDataToggleBtn').click();
    document.querySelectorAll('.clean-data-table tbody tr').forEach(tr => tr.classList.remove('row-highlight'));
    const targetRow = document.getElementById(`row-${region}`);
    if (targetRow) { targetRow.classList.add('row-highlight'); targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    barChart.dispatchAction({ type: 'downplay' });
    barChart.dispatchAction({ type: 'highlight', name: region, seriesName: region });
    let dIdx = barChart.getOption().xAxis[0].data.findIndex(d => d === region);
    barChart.dispatchAction({ type: 'showTip', seriesIndex: currentMode === 'tire' ? barChart.getOption().series.findIndex(s => s.name === region) : (showVariance ? 0 : 1), dataIndex: dIdx > -1 ? dIdx : 5, name: region });
};

window.handleRowDblClick = function(region) {
    if (currentMode === 'simulation') {
        const item = rawData.find(r => r.region === region);
        let grade = currentSimulationMetric.replace('sim_', ''); 
        let gDesc = "", gColor = "";
        if (grade === 'a') { gDesc = "重大問題 (安全)"; gColor = "var(--danger-color)"; }
        else if (grade === 'b') { gDesc = "重點問題 (觀感)"; gColor = "var(--warning-color)"; }
        else if (grade === 'c') { gDesc = "一般問題 (內部管理)"; gColor = "var(--text-secondary)"; }

        if (item && item.top_problems && item.top_problems[grade]) {
            document.getElementById('simModalTitle').innerHTML = `${region} <span style="color:${gColor}; font-size:18px;">[${grade.toUpperCase()}級: ${gDesc}]</span>`;
            let probsArray = item.top_problems[grade].split(')、');
            let probs = probsArray.map((p, index) => {
                let text = index === probsArray.length - 1 ? p : p + ')';
                return `<li style="border-left: 5px solid ${gColor};">${text}</li>`;
            }).join('');

            document.getElementById('simModalBody').innerHTML = `<ul>${probs}</ul>`;
            document.getElementById('simModal').classList.remove('hidden');
        } else {
            document.getElementById('simModalTitle').innerHTML = `${region} - ${grade.toUpperCase()}級異常`;
            document.getElementById('simModalBody').innerHTML = `<p style="padding: 10px; color: var(--text-secondary);">此縣市目前無具體問題紀錄。</p>`;
            document.getElementById('simModal').classList.remove('hidden');
        }
    }
};

barChart.on('click', (params) => { let r = currentMode === 'tire' ? params.seriesName : params.name; if (r) highlightRow(r); });

const helpFabBtn = document.getElementById('helpFabBtn');
if (helpFabBtn) {
    helpFabBtn.addEventListener('click', () => document.getElementById('helpModal').classList.remove('hidden'));
}
document.querySelectorAll('.modal-overlay').forEach(m => m.addEventListener('click', (e) => { if(e.target.classList.contains('modal-overlay')) e.target.classList.add('hidden'); }));

// 🌟 劇院模式 (收合選單) 控制
document.getElementById('zenToggleBtn').addEventListener('click', () => {
    document.body.classList.add('zen-mode');
    setTimeout(() => { mapChart.resize(); barChart.resize(); }, 150); // 重新計算圖表空間
});

document.getElementById('zenRestoreBtn').addEventListener('click', () => {
    document.body.classList.remove('zen-mode');
    setTimeout(() => { mapChart.resize(); barChart.resize(); }, 150);
});

// 🌟 長官護眼術 (數字放大) 控制
document.getElementById('dataZoomBtn').addEventListener('click', (e) => {
    isDataZoomed = !isDataZoomed;
    dataFontBoost = isDataZoomed ? 1.5 : 1; // ECharts 放大 1.5 倍
    
    // 設定 CSS 變數，讓表格與數據卡跟著放大
    document.documentElement.style.setProperty('--data-scale', isDataZoomed ? '1.5' : '1');
    
    // 按鈕 UI 變化
    e.target.innerText = isDataZoomed ? '🔍 還原數字' : '🔎 數字放大';
    e.target.style.background = isDataZoomed ? 'var(--warning-color)' : 'transparent';
    e.target.style.color = isDataZoomed ? '#fff' : 'var(--warning-color)';
    
    // 重新繪製圖表套用新數字大小
    updateMapTheme();
    updateBarChart();
});

document.getElementById('themeToggleBtn').addEventListener('click', (e) => {
    isLightMode = !isLightMode; document.body.classList.toggle('light-mode', isLightMode);
    e.target.innerText = isLightMode ? '🌙 深色模式' : '🌞 淺色模式';
    updateMapTheme(); if(currentMode !== 'maintenance' || currentMaintenanceMetric !== 'm_info') updateBarChart(); 
});

window.adjustZoom = (val) => { document.getElementById('fontSizeSlider').value = val; document.getElementById('fontSizeSlider').dispatchEvent(new Event('input')); };
document.getElementById('fontSizeSlider').addEventListener('input', (e) => {
    globalFontScale = parseFloat(e.target.value); document.querySelectorAll('.zoom-target').forEach(el => el.style.zoom = globalFontScale);
    updateMapTheme(); updateBarChart();
});

// 舊版 presentationBtn 已從上線進入退場，保留此註解駅不干擾其他功能
const presentationBtn = null; // presentationToggleBtn 已從 DOM 移除

const laserDot = document.getElementById('laser-dot');
const laserToggleBtn = document.getElementById('laserToggleBtn');
if (laserToggleBtn && laserDot) {
    laserToggleBtn.addEventListener('click', (e) => {
        isLaserMode = !isLaserMode; document.body.classList.toggle('laser-active', isLaserMode);
        if (isLaserMode) { e.target.classList.add('active'); e.target.innerText = '❌ 關閉雷射'; laserDot.classList.add('active'); }
        else { e.target.classList.remove('active'); e.target.innerText = '🔴 雷射筆'; laserDot.classList.remove('active'); }
    });
    document.addEventListener('mousemove', (e) => { if (isLaserMode) laserDot.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`; });
}

// 🌟 核心：確保地圖也能動態根據目前選中的子指標改變顏色！
function getMapValue(item) {
    if (currentMode === 'stats') return item[currentStatsMetric] || item.overall;
    else if (currentMode === 'tire') return item.tire_history[6]; 
    else if (currentMode === 'operability') return item.operability;
    else if (currentMode === 'maintenance') return item.maintenance_rate; 
    else if (currentMode === 'simulation') return item[currentSimulationMetric + '_ratio']; 
}

function getVisualMapOption() {
    const style = getComputedStyle(document.body);
    const dangerColor = style.getPropertyValue('--danger-color').trim(); // 綠色 = 下降/警示
    const safeColor  = style.getPropertyValue('--safe-color').trim();  // 紅色 = 達標/健康
    
    if (currentMode === 'stats')       return { show: false, min: 86, max: 94, inRange: { color: [dangerColor, '#f97316', '#eab308', safeColor] } };
    else if (currentMode === 'tire')   return { show: false, min: 0,  max: 8,  inRange: { color: [safeColor,  '#eab308', '#f97316', dangerColor] } };
    else if (currentMode === 'operability')  return { show: false, min: 90, max: 99, inRange: { color: [dangerColor, '#f97316', '#eab308', safeColor] } };
    else if (currentMode === 'maintenance') return { show: false, min: 80, max: 100, inRange: { color: [dangerColor, '#f97316', '#eab308', safeColor] } };
    else if (currentMode === 'simulation') {
        let maxVal = currentSimulationMetric === 'sim_a' ? 10 : (currentSimulationMetric === 'sim_b' ? 25 : 60);
        return { show: false, min: 0, max: maxVal, inRange: { color: [safeColor, '#eab308', '#f97316', dangerColor] } };
    }
}

function renderInitialMap() {
    updateMapTheme(); 
}

function updateMapTheme() {
    if (!twGeoJson) return;
    const style = getComputedStyle(document.body);
    const textColor = style.getPropertyValue('--text-primary').trim();
    const mapBaseColor = style.getPropertyValue('--map-base').trim();
    const accentColor = style.getPropertyValue('--accent-color').trim();

    let mapData = [], lineData = [], scatterData = [];
    rawData.forEach(item => {
        let val = getMapValue(item);
        item.mapNames.forEach(name => mapData.push({ name: name, value: val, customRegion: item.region }));
        lineData.push({ coords: [item.mapCenter, item.labelPos], value: val });
        scatterData.push({ name: item.region, value: [item.labelPos[0], item.labelPos[1], val, item.tire_count] });
    });

    mapChart.setOption({
        geo: { map: 'Taiwan', roam: true, scaleLimit: { min: 0.8, max: 5 }, itemStyle: { areaColor: mapBaseColor, borderColor: isLightMode ? '#ffffff' : '#334155', borderWidth: 1 }, emphasis: { itemStyle: { areaColor: accentColor }, label: { show: false } } },
        visualMap: getVisualMapOption(),
        series: [
            { type: 'map', geoIndex: 0, data: mapData }, 
            { type: 'lines', coordinateSystem: 'geo', zlevel: 2, lineStyle: { color: isLightMode ? '#94a3b8' : '#64748b', width: 1.5, opacity: 0.6, curveness: 0.2 }, data: lineData }, 
            { 
                type: 'scatter', coordinateSystem: 'geo', zlevel: 3, symbolSize: 0, data: scatterData, itemStyle: { color: accentColor }, 
                label: {
                    show: true, position: 'center', 
                    formatter: function(params) { 
                        if (currentMode === 'tire') return `{region|${params.name}}\n{score|${params.value[3]} 輛}`;
                        let unit = '%'; if(currentMode === 'stats') unit = '分';
                        return `{region|${params.name}}\n{score|${params.value[2]} ${unit}}`; 
                    },
                    backgroundColor: isLightMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.8)', borderColor: isLightMode ? '#94a3b8' : '#334155', borderWidth: 1, padding: [6, 8], borderRadius: 4, 
                    rich: { 
                        region: { color: textColor, fontSize: 13 * globalFontScale, fontWeight: 'bold', align: 'center', padding: [0, 0, 4, 0] }, 
                        /* 🍏 地圖分數標籤使用 --safe-color（台股紅色=達標） */
                        score: { color: 'var(--safe-color)', fontSize: 14 * globalFontScale * dataFontBoost, fontWeight: 'bold', align: 'center' } 
                    }
                } 
            }
        ]
    }); // 平滑更新，防閃白
}

function updateBarChart() {
    if (!twGeoJson) return;
    if (currentMode === 'maintenance' && currentMaintenanceMetric === 'm_info') return;
    if (currentMode === 'stats' && currentStatsMetric === '') return; 
    
    const style = getComputedStyle(document.body);
    const textColor = style.getPropertyValue('--text-primary').trim();
    const gridColor = style.getPropertyValue('--chart-grid').trim();
    const accentColor = style.getPropertyValue('--accent-color').trim();
    const dangerColor = style.getPropertyValue('--danger-color').trim();
    const safeColor = style.getPropertyValue('--safe-color').trim();

    if (currentMode === 'tire') {
        // 🌟 胎壓趨勢圖：X 軸反轉，當月顯示在最左側，往右遞減
        const sortedData = [...rawData].sort((a, b) => b.tire_history[b.tire_history.length - 1] - a.tire_history[a.tire_history.length - 1]); 
        const regions = sortedData.map(item => item.region);
        // 建立月份標籤陣列（當月在前，往右遞減）
        const dynamicMonths = [];
        for (let i = 0; i <= 5; i++) { // i=0 是當月，i=5 是最舊月
            let m = globalMonth - i;
            let y = globalYear;
            if (m <= 0) { m += 12; y -= 1; }
            dynamicMonths.push(`${y.toString().slice(-2)}/${m.toString().padStart(2, '0')}`);
        }
        const dangerColors = ['#e11d48', '#be185d', '#7e22ce', '#b45309', '#a21caf', '#c2410c', '#1d4ed8'];
        let colorIdx = 0; const seriesData = [];

        sortedData.forEach((item, index) => {
            let hist = item.tire_history.slice(-6).reverse(); // 🌟 反轉數據，使當月在最前面
            let val = hist[0]; let isBad = val > 4.5; // 判斷的是第 0 筆（當月）
            let lineColor = isBad ? dangerColors[colorIdx++ % dangerColors.length] : (isLightMode ? '#94a3b8' : '#475569');
            seriesData.push({
                name: item.region, type: 'line', data: hist, smooth: true, symbol: isBad ? 'circle' : 'none', symbolSize: 8,
                lineStyle: { width: isBad ? 4 : 2, opacity: isBad ? 1 : 0.4 }, itemStyle: { color: lineColor },
                emphasis: { focus: 'series', lineStyle: { width: 7, shadowBlur: 15, shadowColor: lineColor, opacity: 1 }, label: { show: true, fontSize: 16 * globalFontScale, fontWeight: 'bold' } },
                label: { show: false }, endLabel: { show: true, formatter: '{a} {c}%', color: 'inherit', fontSize: (isBad ? 14 : 11) * globalFontScale * dataFontBoost, fontWeight: isBad ? 'bold' : 'normal' },
                labelLayout: { moveOverlap: 'shiftY' }, zlevel: isBad ? 10 : 1
            });
        });

        barChart.setOption({
            title: { text: '全國各縣市前後胎壓未達標趨勢 (近 6 個月)', left: 'center', textStyle: { color: textColor, fontSize: 15 * globalFontScale } },
            tooltip: { trigger: 'axis', backgroundColor: isLightMode ? 'rgba(255,255,255,0.95)' : 'rgba(15, 23, 42, 0.9)', textStyle: { color: textColor }, valueFormatter: (value) => value + '%' },
            legend: { show: false }, grid: { left: '3%', right: '12%', bottom: '10%', top: '15%', containLabel: true }, 
            xAxis: { type: 'category', data: dynamicMonths, axisLabel: { color: textColor, fontSize: 12 * globalFontScale }, axisLine: { lineStyle: { color: gridColor } } },
            yAxis: { type: 'value', axisLabel: { color: textColor, formatter: '{value} %', fontSize: 12 * globalFontScale }, splitLine: { lineStyle: { color: gridColor, type: 'dashed' } } },
            series: seriesData
        }); // 平滑更新，防閃白
        return;
    }

    let regions, currentValues, previousValues, varianceValues, chartTitle, avgValue, isPercentage = false;

    const getVarColor = (val) => {
        if (val === 0) return isLightMode ? '#94a3b8' : '#475569';
        if (currentMode === 'maintenance' && currentMaintenanceMetric === 'm_accident') return val > 0 ? dangerColor : safeColor;
        if (currentMode === 'simulation') return val > 0 ? dangerColor : safeColor;
        return val > 0 ? safeColor : dangerColor;
    };

    if (currentMode === 'stats') {
        const sortedData = [...rawData].sort((a, b) => a[currentStatsMetric] - b[currentStatsMetric]);
        regions = sortedData.map(item => item.region); 
        currentValues = sortedData.map(item => item[currentStatsMetric]); 
        previousValues = sortedData.map(item => item[currentStatsMetric + '_feb']);
        varianceValues = sortedData.map(item => parseFloat((item[currentStatsMetric] - item[currentStatsMetric + '_feb']).toFixed(2)));
        let m = typeof statsMetrics !== 'undefined' ? statsMetrics.find(x => x.key === currentStatsMetric) : null;
        let metricLabel = m ? m.label : (currentStatsMetric === 'overall' ? '綜合分數' : currentStatsMetric);
        chartTitle = `各區指標對比 - ${metricLabel} (由低至高)`;
    } else if (currentMode === 'operability') {
        isPercentage = true;
        const sortedData = [...rawData].sort((a, b) => a.operability - b.operability);
        regions = sortedData.map(item => item.region); 
        currentValues = sortedData.map(item => item.operability); 
        previousValues = sortedData.map(item => item.operability_feb);
        varianceValues = sortedData.map(item => parseFloat((item.operability - item.operability_feb).toFixed(2)));
        chartTitle = `各縣市場站可動率對比 (由低至高)`;
    } else if (currentMode === 'maintenance') {
        isPercentage = currentMaintenanceMetric === 'maintenance_rate';
        const sortLogic = currentMaintenanceMetric === 'm_accident' ? (a, b) => b[currentMaintenanceMetric] - a[currentMaintenanceMetric] : (a, b) => a[currentMaintenanceMetric] - b[currentMaintenanceMetric];
        const sortedData = [...rawData].sort(sortLogic);
        regions = sortedData.map(item => item.region); 
        currentValues = sortedData.map(item => item[currentMaintenanceMetric]); 
        previousValues = sortedData.map(item => item[currentMaintenanceMetric + '_feb']);
        varianceValues = sortedData.map(item => parseFloat((item[currentMaintenanceMetric] - item[currentMaintenanceMetric + '_feb']).toFixed(2)));
        let m = typeof maintenanceMetrics !== 'undefined' ? maintenanceMetrics.find(x => x.key === currentMaintenanceMetric) : null;
        let metricLabel = m ? m.label : (currentMaintenanceMetric === 'maintenance_rate' ? '一級維護率' : '事故車輛數');
        chartTitle = `各縣市${metricLabel}對比`;
    } else if (currentMode === 'simulation') {
        let isTotal = currentSimulationMetric === 'sim_total';
        isPercentage = !isTotal;
        let metricRatio = isTotal ? 'sim_total' : currentSimulationMetric + '_ratio';
        let metricLm = isTotal ? 'sim_total_lm' : currentSimulationMetric + '_lm';

        const sortedData = [...rawData].sort((a, b) => (b[metricRatio] || 0) - (a[metricRatio] || 0));
        regions = sortedData.map(item => item.region); 
        currentValues = sortedData.map(item => item[metricRatio] || 0); 
        previousValues = sortedData.map(item => item[metricLm] || 0);
        varianceValues = sortedData.map(item => parseFloat(((item[metricRatio] || 0) - (item[metricLm] || 0)).toFixed(2)));
        let m = typeof simulationMetrics !== 'undefined' ? simulationMetrics.find(x => x.key === currentSimulationMetric) : null;
        let metricLabel = m ? m.label : (currentSimulationMetric === 'sim_a' ? 'A級' : (currentSimulationMetric === 'sim_b' ? 'B級' : 'C級'));
        chartTitle = isTotal ? '全區異常總數對比 (由高至低)' : `${metricLabel}異常占比對比 (由高至低)`;
    }

    let displayData = showVariance ? varianceValues : currentValues;
    avgValue = (displayData.reduce((acc, curr) => acc + curr, 0) / displayData.length).toFixed(isPercentage ? 2 : 1);

    let seriesConfig = [];
    if (showVariance) {
        seriesConfig = [{
            name: '較上月變動', type: 'bar', barWidth: '40%', itemStyle: { borderRadius: [4, 4, 0, 0] },
            // 🌟 將變動條狀圖從黑色(預設/文字色)改為科技藍(--accent-color)
            data: varianceValues.map(val => ({ value: val, itemStyle: { color: 'var(--accent-color)' } })),
            label: { show: true, position: 'top', color: textColor, fontWeight: 'bold', formatter: val => (val.value > 0 ? '+' : '') + val.value + (isPercentage?'%':''), fontSize: 13 * globalFontScale * dataFontBoost },
            markLine: { symbol: 'none', data: [{ type: 'average', name: '平均變動' }], label: { formatter: `平均\n${avgValue > 0 ? '+':''}${avgValue}${isPercentage?'%':''}`, position: 'end', color: isLightMode ? '#d97706' : '#eab308', fontWeight: 'bold', fontSize: 11 * globalFontScale }, lineStyle: { color: isLightMode ? '#d97706' : '#eab308', type: 'dashed', width: 2 } }
        }];
    } else {
        seriesConfig = [
            { name: `${prevMonthStr} (前月)`, type: 'bar', barWidth: '30%', itemStyle: { color: isLightMode ? '#94a3b8' : '#475569', borderRadius: [4, 4, 0, 0] }, label: { show: false }, data: previousValues },
            {
                name: `${currMonthStr} (當月)`, type: 'bar', barWidth: '30%', itemStyle: { borderRadius: [4, 4, 0, 0] },
                data: currentValues.map((val, idx) => {
                    let barColor = accentColor;
                    if (currentMode === 'stats' || currentMode === 'operability') barColor = val < avgValue ? dangerColor : accentColor;
                    else if (currentMode === 'simulation') barColor = val > avgValue ? dangerColor : safeColor;
                    else if (currentMode === 'maintenance') {
                        if (currentMaintenanceMetric === 'm_accident') barColor = val > avgValue ? dangerColor : safeColor;
                        else if (currentMaintenanceMetric === 'maintenance_rate') barColor = val < avgValue ? dangerColor : accentColor;
                    }
                    return { value: val, itemStyle: { color: barColor } };
                }),
                label: { show: true, position: 'top', color: textColor, fontWeight: 'bold', formatter: isPercentage ? '{c}%' : '{c}', fontSize: 12 * globalFontScale * dataFontBoost },
                markLine: { symbol: 'none', data: [{ type: 'average', name: '平均' }], label: { formatter: `${currMonthStr}平均\n${avgValue}${isPercentage?'%':''}`, position: 'end', color: isLightMode ? '#d97706' : '#eab308', fontWeight: 'bold', fontSize: 11 * globalFontScale }, lineStyle: { color: isLightMode ? '#d97706' : '#eab308', type: 'dashed', width: 2 } }
            }
        ];
    }

    barChart.setOption({
        title: { text: chartTitle + (showVariance ? ' - 較上月變動' : ' - 本月數值'), left: 'center', textStyle: { color: textColor, fontSize: 15 * globalFontScale } },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: isLightMode ? 'rgba(255,255,255,0.95)' : 'rgba(15, 23, 42, 0.9)', textStyle: { color: textColor }, formatter: (p) => { let h = `<div style="font-weight:bold;margin-bottom:5px;">${p[0].axisValue}</div>`; p.forEach(x => { h += `${x.marker} ${x.seriesName}: <b style="color:${x.color}">${(x.value > 0 && showVariance ? '+' : '')}${x.value}${isPercentage ? '%' : ''}</b><br/>`; }); return h; } },
        legend: { show: !showVariance, data: [`${prevMonthStr} (前月)`, `${currMonthStr} (當月)`], bottom: 0, textStyle: { color: textColor, fontSize: 12 * globalFontScale } },
        grid: { left: '3%', right: '8%', bottom: '15%', top: '15%', containLabel: true },
        xAxis: { type: 'category', data: regions, axisLabel: { color: textColor, fontSize: 12 * globalFontScale }, axisLine: { lineStyle: { color: gridColor } } },
        yAxis: { type: 'value', min: (v) => (isPercentage && !showVariance) ? Math.max(0, Math.floor(v.min - 5)) : null, axisLabel: { color: textColor, formatter: isPercentage ? '{value} %' : '{value}', fontSize: 12 * globalFontScale }, splitLine: { lineStyle: { color: gridColor, type: 'dashed' } } },
        series: seriesConfig
    }); // 平滑更新，不使用 notMerge:true 防閃白
}

// 🌟 智慧型標紅機制：定義正向指標白名單
const positiveMetrics = ['overall', 'station', 'appearance', 'functionality', 'ems', 'operability', 'maintenance_rate'];

function getRedStyle(key, val) {
    if (typeof globalAverages !== 'undefined' && positiveMetrics.includes(key) && globalAverages[key] !== undefined) {
        if (val < globalAverages[key]) {
            return 'color: var(--danger-color); font-weight: bold;';
        }
    }
    return '';
}

// 🌟 核心：透過 HTML 標籤點擊呼叫對應按鈕，並加入高級雙層微排版
function renderDataView() {
    const container = document.getElementById('data-view-container');
    let title = document.querySelector('.top-nav button.active').innerText;
    let html = `<h3 style="margin-top:0; color:var(--accent-color); border-bottom:1px solid var(--border-color); padding-bottom:10px;">${title} - 各縣市明細報表</h3>`;
    
    if(currentMode === 'simulation') {
        html += `<div style="font-size:12px; color:var(--warning-color); margin-bottom:10px;">💡 提示：雙擊縣市列可顯示 A/B/C 級異常詳細分析</div>`;
    }
    
    html += '<table class="clean-data-table"><thead><tr>';
    const trStr = (r) => `<tr id="row-${r.region}" onclick="highlightRow('${r.region}')" ondblclick="handleRowDblClick('${r.region}')">`;
    const getRegionCol = (r) => {
        let bs = r.base ? r.base.s : 0;
        let bv = r.base ? r.base.v : 0;
        let be = r.base ? r.base.e : 0;
        return `<td style="font-weight:bold;color:var(--text-primary);">
            <div class="region-swap-container">
                <span class="swap-default">${r.region}</span>
                <span class="swap-hover">場站：${bs}<br>2.0：${bv}<br>2.0E：${be}</span>
            </div>
        </td>`;
    };

    if (currentMode === 'stats') {
        let th = (key, label) => `<th class="${currentStatsMetric === key ? 'active-col' : 'clickable-th'}" onclick="triggerSubMetric('${key}')">${label}</th>`;
        html += `<th>縣市</th>${th('overall', '綜合分數')}${th('station', '場站妥善度')}${th('appearance', '外觀標示')}${th('functionality', '重要機能')}${th('ems', 'EMS維護率')}${th('operability', '可動率')}</tr></thead><tbody>`;
        rawData.forEach(r => {
            let cl = (key) => currentStatsMetric === key ? 'class="active-col"' : '';
            
            // 🌟 大師級微排版：計算與上月的差異，並設定趨勢顏色與箭頭
            let diff = (r.overall - r.overall_feb).toFixed(2);
            let diffIcon = diff > 0 ? '📈' : (diff < 0 ? '📉' : '-');
            let diffColor = diff > 0 ? 'var(--safe-color)' : (diff < 0 ? 'var(--danger-color)' : 'var(--text-secondary)');

            // 智慧標紅
            let overallStyle = getRedStyle('overall', r.overall) || 'color:var(--accent-color); font-weight:bold;';
            let stStyle = getRedStyle('station', r.station);
            let apStyle = getRedStyle('appearance', r.appearance);
            let fuStyle = getRedStyle('functionality', r.functionality);
            let emStyle = getRedStyle('ems', r.ems);
            let opStyle = getRedStyle('operability', r.operability);

            // 🌟 3. 補完「綜合分數 (overall)」雙月對比副數字渲染
            html += `${trStr(r)}${getRegionCol(r)}
                <td ${cl('overall')}>
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.3;">
                        <span style="${overallStyle} font-size: 14px;">${r.overall} 分</span>
                        <div class="sub-value" style="font-size: 0.85em; color: var(--text-secondary); margin-top: 4px;">
                            上月: ${r.overall_feb} <span style="color: ${diffColor}; margin-left: 2px; font-size: 10px;">${diffIcon}</span>
                        </div>
                    </div>
                </td>
                <td ${cl('station')}><span style="${stStyle}">${r.station} 分</span></td>
                <td ${cl('appearance')}><span style="${apStyle}">${r.appearance} 分</span></td>
                <td ${cl('functionality')}><span style="${fuStyle}">${r.functionality} 分</span></td>
                <td ${cl('ems')}><span style="${emStyle}">${r.ems}%</span></td>
                <td ${cl('operability')}><span style="${opStyle}">${r.operability}%</span></td></tr>`;
        });
    } else if (currentMode === 'tire') {
        // 🌟 胎壓表格表頭與數據一并反轉：當月在最左，往右逐月遞減
        html += `<th>縣市</th>`;
        // 表頭：i=0 是當月，i=5 是最舊月——先加入當月，再往右加舞舊月
        html += `<th>${globalYear.toString().slice(-2)}年${globalMonth.toString().padStart(2, '0')}月 (當月)</th>`;
        for (let i = 1; i <= 5; i++) {
            let m = globalMonth - i;
            let y = globalYear;
            if (m <= 0) { m += 12; y -= 1; }
            html += `<th>${y.toString().slice(-2)}年${m.toString().padStart(2, '0')}月</th>`;
        }
        html += `</tr></thead><tbody>`;
        
        rawData.forEach(r => {
            // 數據同步反轉：.slice(-6) 取最後 6 筆，.reverse() 使當月在最前
            let hist = r.tire_history.slice(-6).reverse();
            let v4m = hist[0]; // 當月是第 0 筆
            let v4mColor = v4m > 4.5 ? 'var(--danger-color)' : (v4m > 4.0 ? 'var(--warning-color)' : 'var(--safe-color)');
            html += `${trStr(r)}${getRegionCol(r)}
                <td style="color:${v4mColor};font-weight:bold;">${v4m}% (${r.tire_count}輛)</td>
                <td>${hist[1]}%</td><td>${hist[2]}%</td>
                <td>${hist[3]}%</td><td>${hist[4]}%</td><td>${hist[5]}%</td></tr>`;
        });
    } else if (currentMode === 'operability') {
        // 🌟 2. 動態修復表格表頭 (自動帶入月份變數)
        html += `<th>縣市</th><th>${prevMonthStr}可動率</th><th>${currMonthStr}可動率</th><th>月度變動</th></tr></thead><tbody>`;
        rawData.forEach(r => {
            let variance = (r.operability - r.operability_feb).toFixed(2);
            let varianceSign = variance > 0 ? '+' : '';
            let varColor = variance < 0 ? 'var(--danger-color)' : 'var(--safe-color)';
            let opStyle = getRedStyle('operability', r.operability) || 'color:var(--accent-color);font-weight:bold;';
            html += `${trStr(r)}${getRegionCol(r)}
                <td>${r.operability_feb.toFixed(2)}%</td>
                <td><span style="${opStyle}">${r.operability.toFixed(2)}%</span></td>
                <td style="color:${varColor};font-weight:bold;">${varianceSign}${variance}%</td></tr>`;
        });
    } else if (currentMode === 'maintenance') {
        let th = (key, label) => `<th class="${currentMaintenanceMetric === key ? 'active-col' : 'clickable-th'}" onclick="triggerSubMetric('${key}')">${label}</th>`;
        html += `<th>縣市</th><th>總營運車輛</th>${th('m_accident', '事故車輛數')}${th('m_records', '維護記錄數')}${th('maintenance_rate', '一級維護率')}<th>較上月變動</th></tr></thead><tbody>`;
        rawData.forEach(r => {
            let cl = (key) => currentMaintenanceMetric === key ? 'class="active-col"' : '';
            let varColor = r.m_var.includes('-') ? 'var(--danger-color)' : 'var(--safe-color)';
            let mrStyle = getRedStyle('maintenance_rate', r.maintenance_rate) || 'color:var(--accent-color);font-weight:bold;';
            
            // 🌟 實裝一級維護率雙月數據對比
            let mrDiff = (r.maintenance_rate - r.maintenance_rate_feb).toFixed(2);
            let mrDiffIcon = mrDiff > 0 ? '📈' : (mrDiff < 0 ? '📉' : '-');
            let mrDiffColor = mrDiff > 0 ? 'var(--safe-color)' : (mrDiff < 0 ? 'var(--danger-color)' : 'var(--text-secondary)');
            
            html += `${trStr(r)}${getRegionCol(r)}
                <td>${r.m_fleet.toLocaleString()}</td><td ${cl('m_accident')} style="color:var(--danger-color);font-weight:bold;">${r.m_accident}</td>
                <td ${cl('m_records')}>${r.m_records.toLocaleString()}</td>
                <td ${cl('maintenance_rate')}>
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.3;">
                        <span style="${mrStyle} font-size: 14px;">${r.maintenance_rate}%</span>
                        <div class="sub-value" style="font-size: 0.85em; color: var(--text-secondary); margin-top: 4px;">
                            上月: ${r.maintenance_rate_feb}% <span style="color: ${mrDiffColor}; margin-left: 2px; font-size: 10px;">${mrDiffIcon}</span>
                        </div>
                    </div>
                </td>
                <td style="color:${varColor};font-weight:bold;">${r.m_var}</td></tr>`;
        });
    } else if (currentMode === 'simulation') {
        let th = (key, label) => `<th class="${currentSimulationMetric === key ? 'active-col' : 'clickable-th'}" onclick="triggerSubMetric('${key}')">${label}</th>`;
        html += `<th>縣市</th>${th('sim_a', 'A級異常')}${th('sim_b', 'B級異常')}${th('sim_c', 'C級異常')}</tr></thead><tbody>`;
        rawData.forEach(r => {
            let cl = (key) => currentSimulationMetric === key ? 'class="active-col"' : '';
            let aColor = r.sim_a_ratio > 5.0 ? 'var(--danger-color)' : 'var(--text-primary)';
            let bColor = r.sim_b_ratio > 20.0 ? 'var(--danger-color)' : 'var(--text-primary)';
            let cColor = r.sim_c_ratio > 50.0 ? 'var(--danger-color)' : 'var(--text-primary)';
            html += `${trStr(r)}${getRegionCol(r)}
                <td ${cl('sim_a')} style="color:${aColor};font-weight:bold;">${r.sim_a_count} 輛 (${r.sim_a_ratio}%)</td>
                <td ${cl('sim_b')} style="color:${bColor};font-weight:bold;">${r.sim_b_count} 輛 (${r.sim_b_ratio}%)</td>
                <td ${cl('sim_c')} style="color:${cColor};font-weight:bold;">${r.sim_c_count} 輛 (${r.sim_c_ratio}%)</td></tr>`;
        });
    }
    html += '</tbody></table>';
    container.innerHTML = html;

    // 🔗 表頭點擊觸發標將聲視覺防呆：讓會議報表的「縣市」欄表頭點擊直接跳動全列清除高展（示範其他子表頭為 triggerSubMetric）
    const tbl = container.querySelector('.clean-data-table');
    if (tbl) {
        const regionTh = tbl.querySelector('thead tr th:first-child');
        if (regionTh) {
            regionTh.style.cursor = 'pointer';
            regionTh.title = '點擊清除所有高展';
            regionTh.addEventListener('click', () => {
                document.querySelectorAll('.clean-data-table tbody tr').forEach(tr => tr.classList.remove('row-highlight'));
                barChart.dispatchAction({ type: 'downplay' });
            });
        }
    }
}

function renderFleetDetails() {
    const container = document.getElementById('fleet-detail-grid');
    const simContainer = document.getElementById('sim-detail-grid');
    let htmlFleet = '', htmlSim = '';
    rawData.forEach(item => {
        htmlFleet += `<div class="metric-card hover-glow" style="padding: 8px;"><div style="font-size: 13px; font-weight: bold; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 6px;">${item.region}</div><div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 2px;"><span>${prevMonthStr}:</span><span>${item.m_fleet_feb.toLocaleString()}</span></div><div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--accent-color); font-weight: bold;"><span>${currMonthStr}:</span><span>${item.m_fleet.toLocaleString()}</span></div></div>`;
        htmlSim += `<div class="metric-card hover-glow" style="padding: 8px;"><div style="font-size: 13px; font-weight: bold; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 6px;">${item.region}</div><div style="font-size: 16px; color: var(--accent-color); font-weight: bold;">${item.sim_total.toLocaleString()} 輛</div></div>`;
    });
    container.innerHTML = htmlFleet;
    simContainer.innerHTML = htmlSim;
}

function toggleFleetDetails() {
    showingFleetDetails = !showingFleetDetails;
    document.getElementById('fleet-summary').classList.toggle('hidden', showingFleetDetails);
    document.getElementById('fleet-details').classList.toggle('hidden', !showingFleetDetails);
    document.getElementById('fleet-title-hint').innerText = showingFleetDetails ? '(點擊收合回總計)' : '(點擊展開各縣市明細)';
}

function toggleSimDetails() {
    showingSimDetails = !showingSimDetails;
    document.getElementById('sim-summary').classList.toggle('hidden', showingSimDetails);
    document.getElementById('sim-details').classList.toggle('hidden', !showingSimDetails);
    document.getElementById('sim-title-hint').innerText = showingSimDetails ? '(點擊收合回總計)' : '(點擊展開各縣市數量)';
}

function updateLegendBox() {
    const legendBox = document.getElementById('legend-box-content');
    if (currentMode === 'stats') {
        legendBox.innerHTML = `<div style="font-weight: bold; margin-bottom: 8px;">地圖綜合分數</div><div class="legend-item"><div class="color-box" style="background: var(--safe-color);"></div>大於等於 92分</div><div class="legend-item"><div class="color-box" style="background: #eab308;"></div>90 - 91.9分</div><div class="legend-item"><div class="color-box" style="background: #f97316;"></div>88 - 89.9分</div><div class="legend-item"><div class="color-box" style="background: var(--danger-color);"></div>低於 88分</div>`;
    } else if (currentMode === 'tire') {
        legendBox.innerHTML = `<div style="font-weight: bold; margin-bottom: 8px;">胎壓未達標率</div><div class="legend-item"><div class="color-box" style="background: var(--safe-color);"></div>0% - 2%</div><div class="legend-item"><div class="color-box" style="background: #eab308;"></div>3% - 4%</div><div class="legend-item"><div class="color-box" style="background: #f97316;"></div>5% - 7%</div><div class="legend-item"><div class="color-box" style="background: var(--danger-color);"></div>大於 7%</div>`;
    } else if (currentMode === 'operability') {
        legendBox.innerHTML = `<div style="font-weight: bold; margin-bottom: 8px;">場站可動率 (總分扣分)</div><div class="legend-item"><div class="color-box" style="background: var(--safe-color);"></div>99% ~ 100% (扣 0 分)</div><div class="legend-item"><div class="color-box" style="background: #eab308;"></div>95% ~ 99% (扣 1~2 分)</div><div class="legend-item"><div class="color-box" style="background: #f97316;"></div>91% ~ 95% (扣 3~4 分)</div><div class="legend-item"><div class="color-box" style="background: var(--danger-color);"></div>未達 91% (扣 5 分)</div><div style="margin-top: 5px; color: var(--text-secondary); font-size: 11px;">*計分邏輯：含下不含上</div>`;
    } else if (currentMode === 'maintenance') {
        legendBox.innerHTML = `<div style="font-weight: bold; margin-bottom: 8px;">一級維護率</div><div class="legend-item"><div class="color-box" style="background: var(--safe-color);"></div>95% - 100%</div><div class="legend-item"><div class="color-box" style="background: #eab308;"></div>90% - 94.9%</div><div class="legend-item"><div class="color-box" style="background: #f97316;"></div>85% - 89.9%</div><div class="legend-item"><div class="color-box" style="background: var(--danger-color);"></div>未達 85%</div>`;
    } else if (currentMode === 'simulation') {
        let gradeStr = currentSimulationMetric === 'sim_a' ? 'A級' : (currentSimulationMetric === 'sim_b' ? 'B級' : 'C級');
        let ranges = currentSimulationMetric === 'sim_a' ? ['0% - 3%', '4% - 5%', '6% - 10%', '大於 10%'] : 
                     (currentSimulationMetric === 'sim_b' ? ['0% - 10%', '11% - 19%', '20% - 25%', '大於 25%'] : 
                     ['0% - 30%', '31% - 45%', '46% - 55%', '大於 55%']);

        legendBox.innerHTML = `<div style="font-weight: bold; margin-bottom: 8px;">${gradeStr} 異常占比</div>
            <div class="legend-item"><div class="color-box" style="background: var(--safe-color);"></div>${ranges[0]}</div>
            <div class="legend-item"><div class="color-box" style="background: #eab308;"></div>${ranges[1]}</div>
            <div class="legend-item"><div class="color-box" style="background: #f97316;"></div>${ranges[2]}</div>
            <div class="legend-item"><div class="color-box" style="background: var(--danger-color);"></div>${ranges[3]}</div>
            <div style="margin-top: 5px; color: var(--text-secondary); font-size: 11px;">*不同異常級別有不同的警示門檻</div>`;
    }
}

function setupMapClickEvent() {
    mapChart.on('click', (p) => {
        let cr = (p.seriesType === 'map') ? rawData.find(r => r.mapNames.includes(p.name)) : rawData.find(r => r.region === p.name);
        if (cr) {
            const panel = document.getElementById('cityDetailPanel');
            if (currentMode === 'stats') { panel.querySelector('#detail-title').innerText = `${cr.region} 指標細節 (4月)`; panel.querySelector('#detail-content').innerHTML = `<div class="detail-row"><span>綜合分數:</span><span style="color:var(--accent-color); font-weight:bold;">${cr.overall}</span></div><div class="detail-row"><span>場站妥善度:</span><span>${cr.station}</span></div><div class="detail-row"><span>外觀標示:</span><span>${cr.appearance}</span></div><div class="detail-row"><span>重要機能:</span><span>${cr.functionality}</span></div><div class="detail-row"><span>EMS維護率:</span><span>${cr.ems}%</span></div><div class="detail-row"><span>可動率:</span><span>${cr.operability}%</span></div>`; }
            else if (currentMode === 'tire') { panel.querySelector('#detail-title').innerText = `${cr.region} 胎壓未達標趨勢`; panel.querySelector('#detail-content').innerHTML = `<div class="detail-row"><span>26年 04月:</span><span style="color:var(--accent-color); font-weight:bold;">${cr.tire_history[6]}% (${cr.tire_count}輛)</span></div>`; }
            else if (currentMode === 'operability') { let v = (cr.operability - cr.operability_feb).toFixed(2); panel.querySelector('#detail-title').innerText = `${cr.region} 月度分析`; panel.querySelector('#detail-content').innerHTML = `<div class="detail-row"><span>4月可動率:</span><span style="color:var(--accent-color); font-weight:bold;">${cr.operability.toFixed(2)}%</span></div><div class="detail-row"><span>變動:</span><span style="color:${v < 0 ? 'var(--danger-color)' : 'var(--safe-color)'}; font-weight:bold;">${v > 0 ? '+' : ''}${v}%</span></div>`; }
            else if (currentMode === 'maintenance') { panel.querySelector('#detail-title').innerText = `${cr.region} 維護統計`; panel.querySelector('#detail-content').innerHTML = `<div class="detail-row"><span>事故車:</span><span style="color:var(--danger-color); font-weight:bold;">${cr.m_accident} 輛</span></div><div class="detail-row"><span>維護率:</span><span style="color:var(--accent-color); font-weight:bold;">${cr.maintenance_rate}%</span></div>`; }
            else if (currentMode === 'simulation') { panel.querySelector('#detail-title').innerText = `${cr.region} 模擬體驗`; panel.querySelector('#detail-content').innerHTML = `<div class="detail-row"><span>A級異常:</span><span style="font-weight:bold;">${cr.sim_a_count} 輛 (${cr.sim_a_ratio}%)</span></div><div class="detail-row"><span>B級異常:</span><span style="font-weight:bold;">${cr.sim_b_count} 輛 (${cr.sim_b_ratio}%)</span></div>`; }
            panel.style.display = 'block';
        }
    });
    mapChart.getZr().on('click', (e) => { if (!e.target) document.getElementById('cityDetailPanel').style.display = 'none'; });
}

// 初始化佈局與圖表
async function initDashboard() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/g0v/twgeojson/master/json/twCounty2010.geo.json');
        twGeoJson = await response.json();
        echarts.registerMap('Taiwan', twGeoJson);
        
        document.getElementById('loading').style.display = 'none';
        document.getElementById('mapChart').style.opacity = '1';
        
        renderSubButtons();
        renderFleetDetails(); 
        updateLegendBox();
        applyLayoutState(); 
        
        renderInitialMap();
        updateBarChart();
        setupMapClickEvent();
        
        setTimeout(() => { mapChart.resize(); }, 350);

    } catch (error) {
        document.getElementById('loading').innerText = '地圖載入失敗，請檢查網路連線。';
    }
}

initDashboard();

// 防抖重繪
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if(mapChart) mapChart.resize(); 
        if(barChart) barChart.resize();
    }, 200); 
});

// ====================================================
// 🌟 全域快捷鍵 (Hotkeys) 監聽法陣
// ====================================================
document.addEventListener('keydown', (e) => {
    // 若未來有輸入框，打字時不觸發快捷鍵
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key.toLowerCase();
    
    switch (key) {
        // 主選單切換
        case '1': document.getElementById('nav-stats')?.click(); break;
        case '2': document.getElementById('nav-tire')?.click(); break;
        case '3': document.getElementById('nav-operability')?.click(); break;
        case '4': document.getElementById('nav-maintenance')?.click(); break;
        case '5': document.getElementById('nav-simulation')?.click(); break;
        
        // 核心功能操作
        case 'v': document.getElementById('layoutToggleBtn')?.click(); break;
        case 'z': document.getElementById('dataZoomBtn')?.click(); break;
        case 'l': document.getElementById('laserToggleBtn')?.click(); break;
        // case 'f': 扊罤 —— 舊版投影功能已由 Report Mode 全面取代
        case 'd': document.getElementById('themeToggleBtn')?.click(); break;
        
        // 劇院模式收合 (H = Hide)
        case 'h': 
            if (document.body.classList.contains('zen-mode')) {
                document.getElementById('zenRestoreBtn')?.click();
            } else {
                document.getElementById('zenToggleBtn')?.click();
            }
            break;
            
        // 數據表展開 (T = Table)
        case 't': 
            const tBtn = document.getElementById('mapDataToggleBtn');
            if (tBtn && !tBtn.classList.contains('hidden')) tBtn.click();
            break;
            
        // 變動差值比較 (C = Compare)
        case 'c': 
            const cBtn = document.getElementById('varianceToggleBtn');
            if (cBtn && !cBtn.classList.contains('hidden')) cBtn.click();
            break;
            
        // 📋 專屬報告模式 (P = Presentation Report)
        case 'p':
            toggleReportMode();
            break;
            
        // 說明與退出
        case '?': 
            document.getElementById('helpFabBtn')?.click(); 
            break;
            
        case 'escape':
            document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));
            break;
    }
});

// ====================================================
// 📋 專屬報告模式 (Report Mode) 引擎 v2.0
// 全畫面 7 頁式 Snap Slides + 滾輪/中鍵切頁
// ====================================================

let isReportMode = false;
let reportCurrentPage = 0; // 0-indexed，共 7 頁
let reportScrollLocked = false; // 防止滾輪事件在動畫中重複觸發

// 🌟 多媒體現場實證資料庫
const evidenceMedia = [
    { type: 'image', src: 'assets/images/Color issue_1.jpg', caption: '色彩對比與顯示異常 (1)' },
    { type: 'image', src: 'assets/images/Color issue_2.jpg', caption: '色彩對比與顯示異常 (2)' },
    { type: 'image', src: 'assets/images/Screen issues.jpg', caption: '車機螢幕毀損實證' },
    { type: 'video', src: 'assets/videos/Screen issues.MOV', caption: '螢幕毀損現場紀錄影片' }
];

// 8 頁的數據設定：每頁對應 nav 模式、子指標、標題
const REPORT_PAGES = [
    { nav: 'stats',        subKey: 'overall',          navId: 'nav-stats',        title: '① 施測數據統計' },
    { nav: 'tire',         subKey: null,               navId: 'nav-tire',         title: '② 前後胎壓未達標準' },
    { nav: 'operability',  subKey: null,               navId: 'nav-operability',  title: '③ 各縣市場站可動率' },
    { nav: 'maintenance',  subKey: 'maintenance_rate', navId: 'nav-maintenance',  title: '④ 車輛事故與一級維護' },
    { nav: 'simulation',   subKey: 'sim_a',            navId: 'nav-simulation',   title: '⑤ 本月模擬體驗數據 A 級' },
    { nav: 'simulation',   subKey: 'sim_b',            navId: 'nav-simulation',   title: '⑥ 本月模擬體驗數據 B 級' },
    { nav: 'simulation',   subKey: 'sim_c',            navId: 'nav-simulation',   title: '⑦ 本月模擬體驗數據 C 級' },
    { nav: 'evidence',     subKey: null,               navId: null,               title: '⑧ 現場問題實證紀錄 (照片/影片)' }
];

// --- 報告模式的 DOM 容器 ---
let reportContainer = null;
let reportSlides = [];

function toggleReportMode() {
    if (isReportMode) {
        exitReportMode();
    } else {
        enterReportMode();
    }
}

function enterReportMode() {
    isReportMode = true;
    reportCurrentPage = 0;
    document.body.classList.add('report-mode');

    // 🔍 連動：自動開啟「數字放大」（若尚未開啟）
    if (!isDataZoomed) {
        document.getElementById('dataZoomBtn')?.click();
    }
    // 🔴 連動：自動開啟「雷射筆」（若尚未開啟）
    if (!isLaserMode) {
        document.getElementById('laserToggleBtn')?.click();
    }

    // 建立全畫面容器（若尚未存在）
    if (!document.getElementById('report-mode-container')) {
        buildReportContainer();
    }
    document.getElementById('report-mode-container').style.display = 'block';

    // 渲染所有 7 頁的數據
    renderAllReportSlides();

    // 跳至第 1 頁
    scrollToReportPage(0, false);

    // 綁定事件
    bindReportEvents();
}

function exitReportMode() {
    isReportMode = false;
    document.body.classList.remove('report-mode');
    if (document.getElementById('report-mode-container')) {
        document.getElementById('report-mode-container').style.display = 'none';
    }

    // 🔍 連動：自動關閉「數字放大」（若目前為開啟）
    if (isDataZoomed) {
        document.getElementById('dataZoomBtn')?.click();
    }
    // 🔴 連動：自動關閉「雷射筆」（若目前為開啟）
    if (isLaserMode) {
        document.getElementById('laserToggleBtn')?.click();
    }

    // 隐藏 Tooltip
    hideReportSimTooltip();

    // 解除事件
    unbindReportEvents();
}

// --- 建立報告模式的 DOM 骨架 ---
function buildReportContainer() {
    const container = document.createElement('div');
    container.id = 'report-mode-container';

    // 頁碼指示器
    const indicator = document.createElement('div');
    indicator.id = 'report-page-indicator';
    for (let i = 0; i < REPORT_PAGES.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'report-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => scrollToReportPage(i));
        indicator.appendChild(dot);
    }
    container.appendChild(indicator);

    // 退出按鈕
    const exitBtn = document.createElement('button');
    exitBtn.id = 'report-exit-btn';
    exitBtn.innerHTML = '✕ 退出報告模式 (P)';
    exitBtn.addEventListener('click', exitReportMode);
    container.appendChild(exitBtn);

    // 雷射筆按鈕（複製功能）
    const laserBtn = document.createElement('button');
    laserBtn.id = 'report-laser-btn';
    laserBtn.innerHTML = '🔴 雷射筆 (L)';
    laserBtn.addEventListener('click', () => document.getElementById('laserToggleBtn')?.click());
    container.appendChild(laserBtn);

    // 7 個 slide 容器
    const slidesWrapper = document.createElement('div');
    slidesWrapper.id = 'report-slides-wrapper';
    for (let i = 0; i < REPORT_PAGES.length; i++) {
        const slide = document.createElement('div');
        slide.className = 'report-slide';
        slide.id = `report-slide-${i}`;

        const inner = document.createElement('div');
        inner.className = 'report-slide-inner';

        const titleBar = document.createElement('div');
        titleBar.className = 'report-slide-title';
        titleBar.innerHTML = `<span class="report-page-num">${i + 1} / ${REPORT_PAGES.length}</span><span>${REPORT_PAGES[i].title}</span>`;

        const content = document.createElement('div');
        content.className = 'report-slide-content';
        content.id = `report-content-${i}`;

        inner.appendChild(titleBar);
        inner.appendChild(content);
        slide.appendChild(inner);
        slidesWrapper.appendChild(slide);
        reportSlides.push(slide);
    }
    container.appendChild(slidesWrapper);
    document.body.appendChild(container);
    reportContainer = container;
}

// --- 渲染每一頁的純數字數據報表 ---
function renderAllReportSlides() {
    // 暫存目前狀態
    const savedMode = currentMode;
    const savedStatsMetric = currentStatsMetric;
    const savedMaintenanceMetric = currentMaintenanceMetric;
    const savedSimMetric = currentSimulationMetric;
    const savedDataView = isDataView;
    const savedVariance = showVariance;

    REPORT_PAGES.forEach((page, idx) => {
        const contentEl = document.getElementById(`report-content-${idx}`);
        if (!contentEl) return;

        // 臨時切換到對應模式與指標，使用 renderDataView 邏輯生成 HTML
        currentMode = page.nav;
        showVariance = false;
        if (page.nav === 'stats')       currentStatsMetric = page.subKey || 'overall';
        if (page.nav === 'maintenance') currentMaintenanceMetric = page.subKey || 'maintenance_rate';
        if (page.nav === 'simulation')  currentSimulationMetric = page.subKey || 'sim_a';

        // 使用 renderDataView 內部邏輯直接生成 HTML（不依賴 DOM 容器）
        contentEl.innerHTML = buildReportSlideHTML(page);
    });

    // 還原所有狀態
    currentMode = savedMode;
    currentStatsMetric = savedStatsMetric;
    currentMaintenanceMetric = savedMaintenanceMetric;
    currentSimulationMetric = savedSimMetric;
    isDataView = savedDataView;
    showVariance = savedVariance;
}

// --- 獨立建立報告頁 HTML（不操作 DOM 狀態，純資料輸出）---
function buildReportSlideHTML(page) {
    const mode = page.nav;
    const subKey = page.subKey;
    let html = '<table class="clean-data-table">';

    const getRegionColReport = (r) => {
        return `<td style="font-weight:bold;color:var(--text-primary);white-space:nowrap;">${r.region}</td>`;
    };

    if (mode === 'stats') {
        let legendHTML = `<div style="margin-bottom: 15px; font-size: 15px; background: var(--surface-color); padding: 12px 18px; border-radius: 8px; border-left: 5px solid var(--accent-color); box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            💡 報告檢閱視覺指引：<span style="color:#ef4444; font-weight:bold;">■ 紅色（列管指標，需加強注意）</span> ｜ <span style="color:#2563eb; font-weight:bold;">■ 藍色（進步指標，營運績效上升）</span> ｜ <span style="color:#10b981; font-weight:bold;">■ 綠色（退步指標，較上月成績下滑）</span>
        </div>`;
        html = legendHTML + html;
        html += `<thead><tr><th>縣市</th><th>綜合分數</th><th>場站妥善度</th><th>外觀標示</th><th>重要機能</th><th>EMS維護率</th><th>可動率</th></tr></thead><tbody>`;
        rawData.forEach(r => {
            let diff = (r.overall - r.overall_feb).toFixed(2);
            let diffIcon = diff > 0 ? '▲' : (diff < 0 ? '▼' : '-');
            let diffColor = diff > 0 ? '#2563eb' : (diff < 0 ? '#10b981' : 'var(--text-primary)');
            
            // 強制紅色（#ef4444）為警示，其餘一律為黑色（var(--text-primary)）
            let overallStyle = getRedStyle('overall', r.overall) ? 'color:#ef4444; font-weight:bold;' : 'color:var(--text-primary); font-weight:bold;';
            let stStyle = getRedStyle('station', r.station) ? 'color:#ef4444; font-weight:bold;' : 'color:var(--text-primary);';
            let apStyle = getRedStyle('appearance', r.appearance) ? 'color:#ef4444; font-weight:bold;' : 'color:var(--text-primary);';
            let fuStyle = getRedStyle('functionality', r.functionality) ? 'color:#ef4444; font-weight:bold;' : 'color:var(--text-primary);';
            let emStyle = getRedStyle('ems', r.ems) ? 'color:#ef4444; font-weight:bold;' : 'color:var(--text-primary);';
            let opStyle = getRedStyle('operability', r.operability) ? 'color:#ef4444; font-weight:bold;' : 'color:var(--text-primary);';
            
            html += `<tr>${getRegionColReport(r)}
                <td><span style="${overallStyle}">${r.overall} 分</span><br><small style="color:${diffColor};font-size:11px;font-weight:bold;">上月:${r.overall_feb} ${diffIcon}</small></td>
                <td><span style="${stStyle}">${r.station} 分</span></td>
                <td><span style="${apStyle}">${r.appearance} 分</span></td>
                <td><span style="${fuStyle}">${r.functionality} 分</span></td>
                <td><span style="${emStyle}">${r.ems}%</span></td>
                <td><span style="${opStyle}">${r.operability}%</span></td></tr>`;
        });

    } else if (mode === 'tire') {
        html += `<thead><tr><th>縣市</th>`;
        // 🌟 報告模式胎壓表頭反轉：當月在最前面，並加入與第5頁相同的 active-col 聚焦效果
        html += `<th class="active-col">${globalMonth.toString().padStart(2,'0')}月 (當月)</th>`;
        for (let i = 1; i <= 5; i++) {
            let m = globalMonth - i;
            let y = globalYear;
            if (m <= 0) { m += 12; y -= 1; }
            html += `<th>${y.toString().slice(-2)}/${m.toString().padStart(2,'0')}</th>`;
        }
        html += `</tr></thead><tbody>`;
        rawData.forEach(r => {
            // 🌟 報告模式胎壓陣列反轉
            let hist = r.tire_history.slice(-6).reverse();
            let v = hist[0];
            // 當月份字體全面調整為黑色粗體，套用 active-col
            html += `<tr>${getRegionColReport(r)}
                <td class="active-col" style="color:var(--text-primary);font-weight:bold;">${v}% (${r.tire_count}輛)</td>
                <td>${hist[1]}%</td><td>${hist[2]}%</td><td>${hist[3]}%</td><td>${hist[4]}%</td><td>${hist[5]}%</td></tr>`;
        });

    } else if (mode === 'operability') {
        let noteHTML = `<div style="margin-bottom: 15px; font-size: 15px; color: var(--text-secondary); background: var(--surface-color); padding: 12px 18px; border-radius: 8px; border-left: 5px solid #f59e0b; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            📌 場站考評扣分備忘：各場站經品管判定「未達標準」之項目，每站將嚴格落實扣減分之考評規範。
        </div>`;
        html = noteHTML + html;
        html += `<thead><tr><th>縣市</th><th>${prevMonthStr}可動率</th><th class="active-col">${currMonthStr}可動率</th><th>月度變動</th></tr></thead><tbody>`;
        rawData.forEach(r => {
            let variance = (r.operability - r.operability_feb).toFixed(2);
            let varianceSign = variance > 0 ? '+' : '';
            // 變動率顏色導正：退步 (<0) 紅色警告，進步/持平 (>=0) 黑色
            let varColor = variance < 0 ? '#ef4444' : 'var(--text-primary)';
            // 最新月份一律黑色並套用 active-col
            html += `<tr>${getRegionColReport(r)}
                <td>${r.operability_feb.toFixed(2)}%</td>
                <td class="active-col" style="color:var(--text-primary);font-weight:bold;">${r.operability.toFixed(2)}%</td>
                <td style="color:${varColor};font-weight:bold;">${varianceSign}${variance}%</td></tr>`;
        });
        
        // 🌟 插入扣分規則表
        html += `</tbody></table>
        <div style="margin-top: 20px; font-size: 14px; background: var(--surface-color); padding: 15px; border-radius: 8px;">
            <div style="font-weight:bold; margin-bottom: 10px; color: var(--text-primary);">📌 場站可動率考評扣分基準</div>
            <table class="report-deduction-table" style="width:100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-secondary);">
                        <th style="padding: 8px;">可動率 (含下不含上)</th><th style="padding: 8px;">總分</th><th style="padding: 8px;">扣分</th>
                    </tr>
                </thead>
                <tbody style="color: var(--text-primary);">
                    <tr style="border-bottom: 1px dashed var(--border-color);"><td style="padding: 8px;">未達 91%</td><td style="padding: 8px;">0.00%</td><td style="padding: 8px; color: #ef4444; font-weight: bold;">-5</td></tr>
                    <tr style="border-bottom: 1px dashed var(--border-color);"><td style="padding: 8px;">未達 93% ~ 91%</td><td style="padding: 8px;">91.00%</td><td style="padding: 8px; color: #ef4444; font-weight: bold;">-4</td></tr>
                    <tr style="border-bottom: 1px dashed var(--border-color);"><td style="padding: 8px;">未達 95% ~ 93%</td><td style="padding: 8px;">93.00%</td><td style="padding: 8px; color: #ef4444; font-weight: bold;">-3</td></tr>
                    <tr style="border-bottom: 1px dashed var(--border-color);"><td style="padding: 8px;">未達 97% ~ 95%</td><td style="padding: 8px;">95.00%</td><td style="padding: 8px; color: #ef4444; font-weight: bold;">-2</td></tr>
                    <tr style="border-bottom: 1px dashed var(--border-color);"><td style="padding: 8px;">未達 99% ~ 97%</td><td style="padding: 8px;">97.00%</td><td style="padding: 8px; color: #ef4444; font-weight: bold;">-1</td></tr>
                    <tr><td style="padding: 8px;">100% ~ 99%</td><td style="padding: 8px;">99.00%</td><td style="padding: 8px;">0</td></tr>
                </tbody>
            </table>
        </div>`;
        return html; // 已封裝 table 直接回傳

    } else if (mode === 'maintenance') {
        html += `<thead><tr><th>縣市</th><th>總營運車輛</th><th>事故車輛數</th><th>維護記錄數</th><th>一級維護率</th><th>較上月變動</th></tr></thead><tbody>`;
        rawData.forEach(r => {
            let mrDiff = (r.maintenance_rate - r.maintenance_rate_feb).toFixed(2);
            let mrDiffIcon = mrDiff > 0 ? '▲' : (mrDiff < 0 ? '▼' : '-');
            let mrDiffColor = mrDiff > 0 ? '#2563eb' : (mrDiff < 0 ? '#10b981' : 'var(--text-primary)');
            
            // 強制紅色（#ef4444）為警示，其餘一律為黑色
            let mrStyle = getRedStyle('maintenance_rate', r.maintenance_rate) ? 'color:#ef4444; font-weight:bold;' : 'color:var(--text-primary); font-weight:bold;';
            
            // 事故車輛強制黑色
            let accidentStyle = 'color:var(--text-primary); font-weight:bold;';
            // 變動率顏色：原本綠的改紅，紅的改黑
            let varColor = r.m_var.includes('-') ? '#ef4444' : 'var(--text-primary)';
            
            html += `<tr>${getRegionColReport(r)}
                <td>${r.m_fleet.toLocaleString()}</td>
                <td style="${accidentStyle}">${r.m_accident}</td>
                <td>${r.m_records.toLocaleString()}</td>
                <td><span style="${mrStyle}">${r.maintenance_rate}%</span><br><small style="color:${mrDiffColor};font-size:11px;font-weight:bold;">上月:${r.maintenance_rate_feb}% ${mrDiffIcon}</small></td>
                <td style="color:${varColor};font-weight:bold;">${r.m_var}</td></tr>`;
        });

    } else if (mode === 'simulation') {
        const gradeKey = subKey; // 'sim_a', 'sim_b', 'sim_c'
        let grade = gradeKey.replace('sim_', '');
        
        // 💡 評估視覺指引注入：極簡紅燈警示
        let legendHTML = `<div style="margin-bottom: 15px; font-size: 15px; background: var(--surface-color); padding: 12px 18px; border-radius: 8px; border-left: 5px solid var(--accent-color); box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            💡 評估視覺指引：<span style="color:#ef4444; font-weight:bold;">■ 紅色（異常車輛增加，需注意）</span>
        </div>`;
        html = legendHTML + html;
        
        html += `<thead><tr><th>縣市</th><th>A級異常</th><th>B級異常</th><th>C級異常</th></tr></thead><tbody>`;
        rawData.forEach(r => {
            // 反向指標邏輯：大於0退步(副數值亮紅燈)，小於等於0為中性
            let aDiff = (r.sim_a_ratio - r.sim_a_lm).toFixed(1);
            let aSubColor = aDiff > 0 ? '#ef4444' : 'var(--text-secondary)';
            let aSubFontWeight = aDiff > 0 ? 'bold' : 'normal';
            
            let bDiff = (r.sim_b_ratio - r.sim_b_lm).toFixed(1);
            let bSubColor = bDiff > 0 ? '#ef4444' : 'var(--text-secondary)';
            let bSubFontWeight = bDiff > 0 ? 'bold' : 'normal';
            
            let cDiff = (r.sim_c_ratio - r.sim_c_lm).toFixed(1);
            let cSubColor = cDiff > 0 ? '#ef4444' : 'var(--text-secondary)';
            let cSubFontWeight = cDiff > 0 ? 'bold' : 'normal';
            
            // 聚焦效果
            let aAttr = (grade === 'a') ? 'class="active-col"' : '';
            let bAttr = (grade === 'b') ? 'class="active-col"' : '';
            let cAttr = (grade === 'c') ? 'class="active-col"' : '';
            
            // 主數值全面回歸黑色，副數值根據邏輯亮紅燈，並放大字體為 14px
            html += `<tr class="report-sim-row" data-region="${r.region}" data-grade="${grade}" style="cursor:pointer;">${getRegionColReport(r)}
                <td ${aAttr} style="color:var(--text-primary);font-weight:bold;">${r.sim_a_count} 輛 (${r.sim_a_ratio}%)<br><div style="font-size:14px;color:${aSubColor};font-weight:${aSubFontWeight};margin-top:2px;">上月: ${r.sim_a_lm}%</div></td>
                <td ${bAttr} style="color:var(--text-primary);font-weight:bold;">${r.sim_b_count} 輛 (${r.sim_b_ratio}%)<br><div style="font-size:14px;color:${bSubColor};font-weight:${bSubFontWeight};margin-top:2px;">上月: ${r.sim_b_lm}%</div></td>
                <td ${cAttr} style="color:var(--text-primary);font-weight:bold;">${r.sim_c_count} 輛 (${r.sim_c_ratio}%)<br><div style="font-size:14px;color:${cSubColor};font-weight:${cSubFontWeight};margin-top:2px;">上月: ${r.sim_c_lm}%</div></td></tr>`;
        });
    } else if (mode === 'evidence') {
        html = `<div class="evidence-grid">`;
        evidenceMedia.forEach(media => {
            if (media.type === 'image') {
                html += `
                <div class="evidence-card" onclick="openLightbox('${media.src}', 'image')">
                    <img src="${media.src}" class="evidence-card-media" loading="lazy" />
                    <div class="evidence-card-caption">${media.caption}</div>
                </div>`;
            } else if (media.type === 'video') {
                html += `
                <div class="evidence-card" onclick="openLightbox('${media.src}', 'video')">
                    <div class="video-overlay">
                        <video src="${media.src}" class="evidence-card-media" muted preload="metadata"></video>
                    </div>
                    <div class="evidence-card-caption">${media.caption}</div>
                </div>`;
            }
        });
        html += `</div>`;
        return html; // 直接回傳 grid，不包在 table 裡
    }

    html += '</tbody></table>';
    return html;
}

// --- 切換到指定頁碼 ---
function scrollToReportPage(pageIndex, animate = true) {
    if (pageIndex < 0 || pageIndex >= REPORT_PAGES.length) return;
    reportCurrentPage = pageIndex;

    const wrapper = document.getElementById('report-slides-wrapper');
    if (!wrapper) return;

    if (animate) {
        wrapper.style.transition = 'transform 0.55s cubic-bezier(0.77, 0, 0.175, 1)';
    } else {
        wrapper.style.transition = 'none';
    }
    wrapper.style.transform = `translateY(-${pageIndex * 100}vh)`;

    // 更新指示器圓點
    document.querySelectorAll('.report-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === pageIndex);
    });

    // 更新頁面標題顯示
    const indicator = document.getElementById('report-page-indicator');
    if (indicator) indicator.title = REPORT_PAGES[pageIndex].title;
}

// --- 前往下一頁 ---
function reportNextPage() {
    let next = reportCurrentPage + 1;
    if (next >= REPORT_PAGES.length) next = 0; // 循環回第 1 頁
    scrollToReportPage(next);
}

// --- 前往上一頁 ---
function reportPrevPage() {
    let prev = reportCurrentPage - 1;
    if (prev < 0) prev = REPORT_PAGES.length - 1;
    scrollToReportPage(prev);
}

// --- 滾輪事件處理（攔截，改為切頁）---
function handleReportWheel(e) {
    e.preventDefault();
    e.stopPropagation();
    if (reportScrollLocked) return;

    reportScrollLocked = true;
    setTimeout(() => { reportScrollLocked = false; }, 700); // 鎖定 700ms 防抖

    if (e.deltaY > 0) {
        // 向下滾 → 下一頁（到最後一頁時不再切換）
        if (reportCurrentPage < REPORT_PAGES.length - 1) {
            scrollToReportPage(reportCurrentPage + 1);
        }
    } else if (e.deltaY < 0) {
        // 向上滾 → 上一頁（到第一頁時不再切換）
        if (reportCurrentPage > 0) {
            scrollToReportPage(reportCurrentPage - 1);
        }
    }
}

// --- 滑鼠中鍵事件處理（切到下一頁並循環）---
function handleReportMouseDown(e) {
    if (e.button === 1) { // 中鍵
        e.preventDefault();
        e.stopPropagation();
        reportNextPage();
    }
}

// --- 報告模式下的鍵盤方向鍵支援 ---
function handleReportKeydown(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        if (reportCurrentPage < REPORT_PAGES.length - 1) scrollToReportPage(reportCurrentPage + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (reportCurrentPage > 0) scrollToReportPage(reportCurrentPage - 1);
    } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToReportPage(0);
    } else if (e.key === 'End') {
        e.preventDefault();
        scrollToReportPage(REPORT_PAGES.length - 1);
    }
}

// --- 綁定 / 解除報告模式事件 ---
function bindReportEvents() {
    document.addEventListener('wheel', handleReportWheel, { passive: false });
    document.addEventListener('mousedown', handleReportMouseDown);
    document.addEventListener('keydown', handleReportKeydown);
    // 📌 綁定 Simulation 單擊 Tooltip
    document.addEventListener('click', handleReportSimClick);
    // 🏃 滑鼠離開 Sim 資料列 → 立即隱藏 Tooltip（防呆：保持簡報絕對乾淨）
    document.addEventListener('mouseleave', handleReportSimMouseLeave, true); // 使用捕獲確保偵測到 row 的 leave
}

function unbindReportEvents() {
    document.removeEventListener('wheel', handleReportWheel);
    document.removeEventListener('mousedown', handleReportMouseDown);
    document.removeEventListener('keydown', handleReportKeydown);
    document.removeEventListener('click', handleReportSimClick);
    document.removeEventListener('mouseleave', handleReportSimMouseLeave, true);
}

// ====================================================
// 🔍 報告模式 Simulation 單擊 Tooltip 系統
// ====================================================

// 建立 Tooltip DOMï¼只建立一次，後續重用）
function ensureReportSimTooltip() {
    if (!document.getElementById('report-sim-tooltip')) {
        const tip = document.createElement('div');
        tip.id = 'report-sim-tooltip';
        tip.className = 'hidden';
        document.body.appendChild(tip);
    }
    return document.getElementById('report-sim-tooltip');
}

function showReportSimTooltip(region, grade, x, y) {
    const tip = ensureReportSimTooltip();
    const item = rawData.find(r => r.region === region);
    if (!item) return;

    let gDesc = '', gColor = '';
    if (grade === 'a') { gDesc = 'A級重大問題 (安全)'; gColor = 'var(--danger-color)'; }
    else if (grade === 'b') { gDesc = 'B級重點問題 (觀感)'; gColor = 'var(--warning-color)'; }
    else { gDesc = 'C級一般問題 (內部管理)'; gColor = 'var(--text-secondary)'; }

    // 建立 HTML 內容
    let bodyHtml = '';
    if (item.top_problems && item.top_problems[grade]) {
        let probs = item.top_problems[grade].split(')\u3001');
        bodyHtml = '<ul>' + probs.map((p, idx) => {
            let text = idx === probs.length - 1 ? p : p + ')';
            return `<li style="border-left:3px solid ${gColor};padding-left:8px;">${text}</li>`;
        }).join('') + '</ul>';
    } else {
        bodyHtml = `<p style="color:var(--text-secondary);margin:0;font-size:13px;">此縣市目前無具體問題紀錄。</p>`;
    }

    tip.innerHTML = `
        <div class="tooltip-title">${region} · <span style="color:${gColor};">${gDesc}</span></div>
        ${bodyHtml}
    `;

    // 計算定位：顯示於滑鼠右側
    tip.classList.remove('hidden');
    tip.style.left = '0'; tip.style.top = '0'; // 先重置使能取得寬度
    const tipW = tip.offsetWidth || 280;
    const tipH = tip.offsetHeight || 150;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // 預設顯示在滑鼠右側 20px
    let left = x + 20;
    let top = y - tipH / 2;

    // 如果往右超出有5px 邊界，就左側顯示
    if (left + tipW + 5 > vw) left = x - tipW - 20;
    // 确保不超出上下誤
    if (top < 5) top = 5;
    if (top + tipH + 5 > vh) top = vh - tipH - 5;

    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
}

function hideReportSimTooltip() {
    const tip = document.getElementById('report-sim-tooltip');
    if (tip) tip.classList.add('hidden');
}

// 全局單擊事件處理函數
function handleReportSimClick(e) {
    if (!isReportMode) return;

    // 如果點擊的是 sim 列
    const row = e.target.closest('.report-sim-row');
    if (row) {
        const region = row.dataset.region;
        const grade = row.dataset.grade;
        if (region && grade) {
            e.stopPropagation();
            showReportSimTooltip(region, grade, e.clientX, e.clientY);
            return;
        }
    }

    // 如果點擊的不是 Tooltip 本身，則隐藏 Tooltip
    const tip = document.getElementById('report-sim-tooltip');
    if (tip && !tip.contains(e.target)) {
        hideReportSimTooltip();
    }
}

// 🏃 滑鼠離開 .report-sim-row 時，立即隱藏 Tooltip（防呆：保持投影畫面絕對乾淨）
// 使用事件捕獲 (capture) 確保能精準偵測 tr 層級的 mouseleave
function handleReportSimMouseLeave(e) {
    if (!isReportMode) return;

    // 確認離開的元素是 .report-sim-row（或其子元素）
    const leavingRow = e.target.closest('.report-sim-row');
    if (!leavingRow) return;

    // relatedTarget = 滑鼠移入的新元素，若新元素還在同一列內則不關閉
    const enteringRow = e.relatedTarget ? e.relatedTarget.closest('.report-sim-row') : null;
    if (enteringRow !== leavingRow) {
        // 真正離開了這一列 → 立即隱藏 Tooltip
        hideReportSimTooltip();
    }
}

// ====================================================
// 📸 第八頁多媒體實證區：高階燈箱 (Lightbox)
// ====================================================
window.openLightbox = function(src, type) {
    let modal = document.getElementById('report-lightbox-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'report-lightbox-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.backgroundColor = 'rgba(0,0,0,0.95)';
        modal.style.zIndex = '99999999';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.cursor = 'zoom-out';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.2s ease';
        
        modal.onclick = function(e) { 
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none'; 
                    modal.innerHTML = ''; 
                }, 200);
            }
        };
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    setTimeout(() => modal.style.opacity = '1', 10);
    
    if (type === 'image') {
        modal.innerHTML = `<img src="${src}" style="max-width:90vw; max-height:90vh; object-fit:contain; border-radius:12px; box-shadow: 0 15px 50px rgba(0,0,0,0.8); cursor: default; transition: transform 0.3s ease;" />`;
    } else {
        modal.innerHTML = `<video src="${src}" controls autoplay style="max-width:90vw; max-height:90vh; object-fit:contain; border-radius:12px; box-shadow: 0 15px 50px rgba(0,0,0,0.8); cursor: default;"></video>`;
    }
};
