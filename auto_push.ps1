[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "自動上傳更新到 GitHub"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  YouBike-MaIM 專案 · 自動同步更新到 GitHub" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. 檢查 Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[錯誤] 找不到 Git 指令，請確認電腦是否已安裝 Git。" -ForegroundColor Red
    Write-Host ""
    Read-Host "按 Enter 鍵結束..."
    exit
}

# 2. git add
Write-Host "[1/3] 正在掃描並加入變更檔案 (git add) ..." -ForegroundColor Yellow
git add -A

# 3. 檢查變更
$status = git status --porcelain
if (-not $status) {
    Write-Host ""
    Write-Host "✨ [提示] 目前沒有偵測到任何檔案被修改，GitHub 已經是最新版本！" -ForegroundColor Green
    Write-Host ""
    Read-Host "按 Enter 鍵結束..."
    exit
}

# 4. commit
$timeStr = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "自動更新於 $timeStr"
Write-Host "[2/3] 正在記錄版本提交: $commitMsg ..." -ForegroundColor Yellow
git commit -m $commitMsg

# 5. push
Write-Host ""
Write-Host "[3/3] 正在上傳至 GitHub (git push origin main) ..." -ForegroundColor Yellow
Write-Host "      (若是第一次上傳，瀏覽器可能會彈出 GitHub 登入授權視窗，請點選綠色按鈕授權即可)" -ForegroundColor Gray
Write-Host ""

git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Green
    Write-Host "  🎉 恭喜！專案已成功自動上傳並更新到 GitHub！" -ForegroundColor Green
    Write-Host "  🔗 查看網址: https://github.com/leokung4398/YouBike-MaIM" -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⚠️ 上傳遇到問題，請檢查網路連線或 GitHub 登入授權。" -ForegroundColor Red
}

Write-Host ""
Read-Host "請按 Enter 鍵結束..."
