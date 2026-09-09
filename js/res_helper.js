/**
 * 🖥️ 全縣市顯示最佳化與螢幕調校小幫手 (Resolution & Scale Diagnostic Helper)
 * 專為解決不同螢幕解析度 (1080 vs 1200) 及 Windows 縮放比例 (100% vs 125%/150%)
 */

(function() {
    console.log("🖥️ [顯示調校小幫手] 載入中...");

    // 取得即時螢幕規格
    function getDisplayMetrics() {
        const dpr = window.devicePixelRatio || 1;
        const scalePct = Math.round(dpr * 100);
        // screen.width / height 在某些縮放下會回傳邏輯解析度，乘上 dpr 可估算實體解析度
        const physicalW = Math.round(screen.width * (window.devicePixelRatio || 1));
        const physicalH = Math.round(screen.height * (window.devicePixelRatio || 1));
        const logicalW = screen.width;
        const logicalH = screen.height;
        const innerH = window.innerHeight;
        const innerW = window.innerWidth;

        const isIdealRes = (logicalW === 1920 && logicalH === 1200) || (physicalW === 1920 && physicalH === 1200);
        const isIdealScale = (scalePct === 100);
        const isPerfect = isIdealRes && isIdealScale;

        return {
            dpr,
            scalePct,
            logicalW,
            logicalH,
            physicalW,
            physicalH,
            innerW,
            innerH,
            isIdealRes,
            isIdealScale,
            isPerfect
        };
    }

    // 刷新彈窗內的即時診斷數據
    function refreshModalData() {
        const m = getDisplayMetrics();
        const infoEl = document.getElementById('res-current-info');
        const alertEl = document.getElementById('res-status-alert');
        if (!infoEl || !alertEl) return;

        const isLight = document.body.classList.contains('light-mode');
        const warnColor = isLight ? '#d97706' : '#f59e0b';
        const okColor = isLight ? '#059669' : '#10b981';

        infoEl.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px;">
                <div class="res-info-box">
                    <div class="res-info-label">當前螢幕解析度</div>
                    <div class="res-info-value" style="color: ${m.isIdealRes ? okColor : warnColor};">
                        ${m.logicalW} × ${m.logicalH}
                        ${m.isIdealRes ? '✅' : '⚠️'}
                    </div>
                    <div class="res-info-target">目標：1920 × 1200</div>
                </div>
                <div class="res-info-box">
                    <div class="res-info-label">Windows 縮放比例</div>
                    <div class="res-info-value" style="color: ${m.isIdealScale ? okColor : warnColor};">
                        ${m.scalePct}%
                        ${m.isIdealScale ? '✅' : '⚠️'}
                    </div>
                    <div class="res-info-target">目標：100%</div>
                </div>
            </div>
        `;

        if (m.isPerfect) {
            alertEl.className = 'res-alert-box res-alert-success';
            alertEl.innerHTML = `
                <div style="font-weight: bold; font-size: 15px; margin-bottom: 4px;">🎉 完美狀態！已符合最佳報告規格</div>
                <div style="font-size: 13px;">您的螢幕為 1920 × 1200 且縮放為 100%，簡報模式下全台 10 縣市將 100% 完整呈現，無任何截斷。</div>
            `;
        } else {
            let reason = [];
            if (!m.isIdealRes) reason.push(`解析度為 <strong>${m.logicalW}×${m.logicalH}</strong> (需切換至 1920×1200)`);
            if (!m.isIdealScale) reason.push(`縮放比例為 <strong>${m.scalePct}%</strong> (需調整為 100%)`);

            alertEl.className = 'res-alert-box res-alert-warning';
            alertEl.innerHTML = `
                <div style="font-weight: bold; font-size: 15px; margin-bottom: 4px;">⚠️ 檢測到目前尚未達到最佳報告配置</div>
                <div style="font-size: 13px; line-height: 1.5;">
                    當前狀況：${reason.join('、')}<br>
                    這會導致下方縣市（如屏東、台東）被擠出畫面，需要手動滑動捲軸。建議依照下方步驟一鍵調校！
                </div>
            `;
        }
    }

    // 開啟彈窗
    window.openResHelperModal = function() {
        const modal = document.getElementById('resHelperModal');
        if (modal) {
            refreshModalData();
            modal.classList.remove('hidden');
        }
    };

    // 關閉彈窗
    window.closeResHelperModal = function() {
        const modal = document.getElementById('resHelperModal');
        if (modal) modal.classList.add('hidden');
    };

    // 觸發開啟 Windows 顯示設定 (ms-settings:display)
    window.openWindowsDisplaySettings = function() {
        window.location.href = 'ms-settings:display';
    };

    // 報告模式下，若非 1920x1200 且未提示過，顯示右下角微調提示浮鈕
    let hasShownReportPrompt = false;
    function checkReportModePrompt() {
        if (!window.isReportMode) {
            const promptBtn = document.getElementById('res-report-pill');
            if (promptBtn) promptBtn.style.display = 'none';
            return;
        }

        const m = getDisplayMetrics();
        let promptBtn = document.getElementById('res-report-pill');

        if (!promptBtn) {
            promptBtn = document.createElement('div');
            promptBtn.id = 'res-report-pill';
            promptBtn.title = '點擊開啟螢幕最佳化調校';
            promptBtn.innerHTML = `🖥️ 螢幕調校 (全縣市全覽)`;
            promptBtn.onclick = window.openResHelperModal;
            document.body.appendChild(promptBtn);
        }

        if (!m.isPerfect) {
            promptBtn.style.display = 'flex';
        } else {
            promptBtn.style.display = 'none';
        }
    }

    // 註冊全域鍵盤監聽 (F10 或點擊)
    window.addEventListener('DOMContentLoaded', () => {
        // 隱藏按鈕點擊
        document.getElementById('resHelperBtn')?.addEventListener('click', window.openResHelperModal);

        // 標題雙擊快捷觸發
        document.querySelector('.header h1')?.addEventListener('dblclick', (e) => {
            e.preventDefault();
            window.openResHelperModal();
        });

        // 快捷鍵 F10
        window.addEventListener('keydown', (e) => {
            if (e.key === 'F10') {
                e.preventDefault();
                const modal = document.getElementById('resHelperModal');
                if (modal && !modal.classList.contains('hidden')) {
                    window.closeResHelperModal();
                } else {
                    window.openResHelperModal();
                }
            }
        });

        // 監聽報告模式連動
        const origEnter = window.enterReportMode;
        if (typeof origEnter === 'function') {
            window.enterReportMode = function() {
                origEnter.apply(this, arguments);
                setTimeout(checkReportModePrompt, 200);
            };
        }

        const origExit = window.exitReportMode;
        if (typeof origExit === 'function') {
            window.exitReportMode = function() {
                origExit.apply(this, arguments);
                checkReportModePrompt();
            };
        }

        window.addEventListener('resize', () => {
            if (window.isReportMode) checkReportModePrompt();
            const modal = document.getElementById('resHelperModal');
            if (modal && !modal.classList.contains('hidden')) {
                refreshModalData();
            }
        });
    });

})();
