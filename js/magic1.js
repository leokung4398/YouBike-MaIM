/**
 * 🧙‍♂️ 黑魔法一：PPT 級視窗自適應等比例縮放 (Auto Scale)
 * 原理：以固定畫布 (1220x860) 為基準，依據視窗當前寬高，自動使用 CSS transform: scale()
 * 讓整張簡報 100% 剛好塞進視窗，全縣市一眼全覽，絕無滾動條！
 */

(function() {
    console.log("🧙‍♂️ [黑魔法一] 模組載入中...");

    // 建立頂部測試橫幅
    function initTestBanner() {
        const banner = document.createElement('div');
        banner.id = 'magic-test-banner';
        banner.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:20px;">🧙‍♂️</span>
                    <strong style="color:#38bdf8; font-size:15px;">【測試網頁 A：黑魔法一 · PPT級自動等比例縮放】</strong>
                    <span style="color:#94a3b8; font-size:13px;">(原理：整頁畫布鎖定比例，依螢幕尺寸自動計算最佳 Scale 縮放)</span>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                    <button id="btn-enter-magic1" style="background:#38bdf8; color:#0f172a; border:none; padding:6px 14px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        ▶ 進入報告模式 (快捷鍵 P)
                    </button>
                    <a href="index_magic2.html" style="color:#f59e0b; text-decoration:none; font-size:13px; border:1px solid #f59e0b; padding:5px 10px; border-radius:6px; font-weight:bold;">
                        切換到 👉 黑魔法二測試
                    </a>
                    <a href="index.html" style="color:#94a3b8; text-decoration:none; font-size:13px; border:1px solid #334155; padding:5px 10px; border-radius:6px;">
                        🏠 回原始頁面
                    </a>
                </div>
            </div>
        `;
        document.body.prepend(banner);

        document.getElementById('btn-enter-magic1')?.addEventListener('click', () => {
            if (typeof toggleReportMode === 'function') toggleReportMode();
        });
    }

    // 建立報告模式下的即時狀態監控浮動標籤
    let statusWidget = null;
    function getOrCreateStatusWidget() {
        if (!statusWidget) {
            statusWidget = document.createElement('div');
            statusWidget.id = 'magic1-status-widget';
            document.body.appendChild(statusWidget);
        }
        return statusWidget;
    }

    // 核心黑魔法計算函數
    function applyMagic1Scale() {
        if (!window.isReportMode) {
            if (statusWidget) statusWidget.style.display = 'none';
            return;
        }

        const innerSlides = document.querySelectorAll('.report-slide-inner');
        if (innerSlides.length === 0) return;

        const winW = window.innerWidth;
        const winH = window.innerHeight;

        // 設計基準尺寸 (剛好容納 10 縣市無捲軸的完整高度與美觀寬度)
        const baseW = 1220;
        const baseH = 860;

        // 預留邊距 (寬留 4%、高留 6%)
        const scaleX = (winW * 0.96) / baseW;
        const scaleY = (winH * 0.94) / baseH;
        let scale = Math.min(scaleX, scaleY);

        // 限制最大縮放，避免 4K 螢幕放大過度
        scale = Math.min(scale, 1.15);
        scale = Math.max(scale, 0.45); // 最小保護

        innerSlides.forEach(inner => {
            inner.style.width = `${baseW}px`;
            inner.style.maxWidth = 'none';
            inner.style.maxHeight = 'none';
            inner.style.transform = `scale(${scale})`;
            inner.style.transformOrigin = 'center center';
            inner.style.transition = 'transform 0.12s ease-out';
            inner.style.margin = 'auto';
        });

        // 更新懸浮監控卡
        const widget = getOrCreateStatusWidget();
        widget.style.display = 'block';
        widget.innerHTML = `
            <div style="font-weight:bold; color:#38bdf8; margin-bottom:4px; font-size:13px; display:flex; align-items:center; gap:6px;">
                <span>🧙‍♂️ 黑魔法一：等比例縮放已啟動</span>
            </div>
            <div style="font-size:12px; color:#cbd5e1; line-height:1.5;">
                🖥️ 視窗大小：<strong>${winW} × ${winH}</strong><br>
                📐 自動縮放倍率：<strong style="color:#10b981; font-size:14px;">${Math.round(scale * 100)}%</strong><br>
                ✨ 狀態：<span style="color:#38bdf8;">10 個縣市完整展開 (0 滾動條)</span>
            </div>
            <div style="margin-top:6px; font-size:11px; color:#94a3b8; border-top:1px dashed #334155; padding-top:4px;">
                💡 試著縮小瀏覽器視窗，畫面會自動等比例適配！
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
                setTimeout(applyMagic1Scale, 50);
            };
        }

        if (typeof exitReportMode === 'function') {
            const originalExit = window.exitReportMode;
            window.exitReportMode = function() {
                originalExit.apply(this, arguments);
                if (statusWidget) statusWidget.style.display = 'none';
            };
        }

        window.addEventListener('resize', applyMagic1Scale);

        // 如果點擊了滾動分頁按鈕，重新確保尺寸
        document.addEventListener('click', (e) => {
            if (e.target.classList && e.target.classList.contains('report-dot')) {
                setTimeout(applyMagic1Scale, 50);
            }
        });
    });

})();
