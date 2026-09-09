@echo off
chcp 65001 >nul
echo 正在將螢幕解析度調整為 1920 x 1200 ...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$code = @'
using System;
using System.Runtime.InteropServices;
[StructLayout(LayoutKind.Sequential, CharSet=CharSet.Ansi)]
public struct DEVMODE {
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst=32)] public string dmDeviceName;
    public short dmSpecVersion; public short dmDriverVersion; public short dmSize; public short dmDriverExtra;
    public int dmFields; public int dmPositionX; public int dmPositionY; public int dmDisplayOrientation;
    public int dmDisplayFixedOutput; public short dmColor; public short dmDuplex; public short dmYResolution;
    public short dmTTOption; public short dmCollate; [MarshalAs(UnmanagedType.ByValTStr, SizeConst=32)] public string dmFormName;
    public short dmLogPixels; public short dmBitsPerPel; public int dmPelsWidth; public int dmPelsHeight;
    public int dmDisplayFlags; public int dmDisplayFrequency; public int dmICMMethod; public int dmICMIntent;
    public int dmMediaType; public int dmDitherType; public int dmReserved1; public int dmReserved2;
    public int dmPanningWidth; public int dmPanningHeight;
}
public class ResChanger {
    [DllImport(\"user32.dll\")] public static extern int EnumDisplaySettings(string d, int m, ref DEVMODE dm);
    [DllImport(\"user32.dll\")] public static extern int ChangeDisplaySettings(ref DEVMODE dm, int f);
    public static int Set(int w, int h) {
        DEVMODE dm = new DEVMODE();
        dm.dmSize = (short)Marshal.SizeOf(typeof(DEVMODE));
        if (EnumDisplaySettings(null, -1, ref dm) != 0) {
            if (dm.dmPelsWidth == w && dm.dmPelsHeight == h) return 2;
            dm.dmPelsWidth = w; dm.dmPelsHeight = h; dm.dmFields = 0x80000 | 0x100000;
            return ChangeDisplaySettings(ref dm, 1);
        }
        return -1;
    }
}
'@; Add-Type -ReferencedAssemblies System.Windows.Forms -TypeDefinition $code; $res = [ResChanger]::Set(1920, 1200); [System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms') | Out-Null; if ($res -eq 0) { [System.Windows.Forms.MessageBox]::Show("✅ 螢幕解析度已成功切換為 1920 x 1200！`n`n📌 關鍵提醒：請務必確認 Windows 設定中的「比例」為 100%（建議選項）。`n`n現在打開網頁按 P 鍵即可一眼全覽全台 10 縣市！", '切換成功', 0, 64) } elseif ($res -eq 2) { [System.Windows.Forms.MessageBox]::Show("目前螢幕已經是 1920 x 1200。`n`n若在網頁仍看不到完整縣市，請檢查 Windows 設定中的「比例」是否設為 100%！", '解析度確認', 0, 64) } else { [System.Windows.Forms.MessageBox]::Show('⚠️ 切換失敗，請確認螢幕規格是否支援 1920x1200。', '切換提示', 0, 48) }"
