/**
 * 🧙‍♂️ 黑魔法二：動態尺寸自適應與響應式緊湊檔位 (Fluid Layout & Adaptive Scale)
 * 原理：不使用整體 CSS Transform 縮放，而是偵測可用垂直高度 (window.innerHeight)
 * 自動切換數字縮放比例 (--data-scale)、表格行高、卡片內距與文字大小，讓全縣市自然流暢排列！
 */

(function() {
    console.log("🧙‍♂️ [黑魔法二] 模組載入中...");

    // 建立頂部測試橫幅
    function initTestBanner() {
        const banner = document.createElement('div');
        banner.id = 'magic-test-banner';
        banner.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:20px;">🧙‍♂️</span>
                    <strong style="color:#f59e0b; font-size:15px;">【測試網頁 B：黑魔法二 · 動態尺寸自適應檔位】</strong>
                    <span style="color:#94a3b8; font-size:13px;">(原理：不變更整體畫布比例，依高度自動微調表格行距、卡片高度與字體檔位)</span>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                    <button id="btn-enter-magic2" style="background:#f59e0b; color:#0f172a; border:none; padding:6px 14px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        ▶ 進入報告模式 (快捷鍵 P)
                    </button>
                    <a href="index_magic1.html" style="color:#38bdf8; text-decoration:none; font-size:13px; border:1px solid #38bdf8; padding:5px 10px; border-radius:6px; font-weight:bold;">
                        切換到 👉 黑魔法一測試
                    </a>
                    <a href="index.html" style="color:#94a3b8; text-decoration:none; font-size:13px; border:1px solid #334155; padding:5px 10px; border-radius:6px;">
                        🏠 回原始頁面
                    </a>
                </div>
            </div>
        `;
        document.body.prepend(banner);

        document.getElementById('btn-enter-magic2')?.addEventListener('click', () => {
            if (typeof toggleReportMode === 'function') toggleReportMode();
        });
    }

    // 建立報告模式下的即時狀態監控浮動標籤
    let statusWidget = null;
    function getOrCreateStatusWidget() {
        if (!statusWidget) {
            statusWidget = document.createElement('div');
            statusWidget.id = 'magic2-status-widget';
            document.body.appendChild(statusWidget);
        }
        return statusWidget;
    }

    // 核心黑魔法計算函數
    function applyMagic2Adaptive() {
        if (!window.isReportMode) {
            if (statusWidget) statusWidget.style.display = 'none';
            return;
        }

        const winW = window.innerWidth;
        const winH = window.innerHeight;

        let scale = 1.45;
        let tierName = "極速寬敞檔 (1920×1200)";
        let tierColor = "#38bdf8";
        let rowPadding = "7px 10px";
        let cardPadding = "10px 14px";
        let cardValSize = "28px";
        let slidePadding = "2vh 3%";

        if (winH >= 1100) {
            // 1920x1200 寬敞檔
            scale = 1.45;
            tierName = "寬敞大螢幕 (高度 ≥ 1100px)";
            tierColor = "#38bdf8";
            rowPadding = "7px 10px";
            cardPadding = "10px 14px";
            cardValSize = "28px";
        } else if (winH >= 920) {
            // 1920x1080 全螢幕檔
            scale = 1.25;
            tierName = "標準 1080p 全螢幕 (920px ~ 1100px)";
            tierColor = "#10b981";
            rowPadding = "5px 8px";
            cardPadding = "8px 12px";
            cardValSize = "24px";
        } else if (winH >= 780) {
            // 1080p 筆電含工作列 (800~880px)
            scale = 1.08;
            tierName = "中型/筆電螢幕 (780px ~ 920px)";
            tierColor = "#f59e0b";
            rowPadding = "4px 8px";
            cardPadding = "5px 10px";
            cardValSize = "21px";
            slidePadding = "1.5vh 2%";
        } else {
            // 小螢幕或縮放開很大 (<780px)
            scale = 0.92;
            tierName = "緊湊小螢幕 (< 780px)";
            tierColor = "#ef4444";
            rowPadding = "2px 6px";
            cardPadding = "3px 8px";
            cardValSize = "18px";
            slidePadding = "1vh 1.5%";
        }

        // 動態套用 CSS 變數
        document.documentElement.style.setProperty('--data-scale', scale.toString());
        document.documentElement.style.setProperty('--magic2-row-padding', rowPadding);
        document.documentElement.style.setProperty('--magic2-card-padding', cardPadding);
        document.documentElement.style.setProperty('--magic2-card-val-size', cardValSize);
        document.documentElement.style.setProperty('--magic2-slide-padding', slidePadding);

        // 更新懸浮監控卡
        const widget = getOrCreateStatusWidget();
        widget.style.display = 'block';
        widget.innerHTML = `
            <div style="font-weight:bold; color:#f59e0b; margin-bottom:4px; font-size:13px; display:flex; align-items:center; gap:6px;">
                <span>🧙‍♂️ 黑魔法二：動態檔位自適應</span>
            </div>
            <div style="font-size:12px; color:#cbd5e1; line-height:1.5;">
                🖥️ 視窗大小：<strong>${winW} × ${winH}</strong><br>
                🏷️ 命中檔位：<strong style="color:${tierColor};">${tierName}</strong><br>
                🔢 數字倍率 (--data-scale)：<strong style="color:#10b981;">${scale}</strong><br>
                📏 表格行距：<strong>${rowPadding}</strong><br>
                ✨ 狀態：<span style="color:#10b981;">原生像素排列 (0 滾動條)</span>
            </div>
            <div style="margin-top:6px; font-size:11px; color:#94a3b8; border-top:1px dashed #334155; padding-top:4px;">
                💡 改變視窗高度時，檔位與行高會即時平滑切換！
            </div>
        `;
    }

    // 攔截 enterReportMode
    window.addEventListener('DOMContentLoaded', () => {
        initTestBanner();

        if (typeof enterReportMode === 'function') {
            const originalEnter = window.enterReportMode;
            window.enterReportMode = function() {
                originalEnter.apply(this, arguments);
                setTimeout(applyMagic2Adaptive, 50);
            };
        }

        if (typeof exitReportMode === 'function') {
            const originalExit = window.exitReportMode;
            window.exitReportMode = function() {
                originalExit.apply(this, arguments);
                if (statusWidget) statusWidget.style.display = 'none';
            };
        }

        window.addEventListener('resize', applyMagic2Adaptive);

        // 如果點擊了滾動分頁按鈕，重新確保尺寸
        document.addEventListener('click', (e) => {
            if (e.target.classList && e.target.classList.contains('report-dot')) {
                setTimeout(applyMagic2Adaptive, 50);
            }
        });
    });

})();
