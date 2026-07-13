import re

file_path = 'c:/新增資料夾/模擬體驗會議專用報告/實驗室/YouBike-MaIM-main/css/style.css'

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# 1. Add CSS Variables for border-radius and spacing
if '--radius-sm' not in content:
    content = content.replace(
        '--font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;',
        '--font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;\n    --radius-sm: 6px;\n    --radius-md: 8px;\n    --radius-lg: 12px;\n    --spacing-sm: 8px;\n    --spacing-md: 12px;\n    --spacing-lg: 20px;'
    )

# 2. Eliminate !important using CSS specificity and replace hardcoded values with variables
# Example 1: .hidden
content = content.replace('.hidden { display: none !important; }', 'body .hidden, body[class] .hidden { display: none; }')

# Example 2: .header-tools button
content = content.replace('border-radius: 6px !important;', 'border-radius: var(--radius-sm);')
content = content.replace('padding: 0 !important;', 'padding: 0;')
content = content.replace('display: inline-flex !important;', 'display: inline-flex;')
content = content.replace('width: 38px !important;', 'width: 38px;')
content = content.replace('width: 145px !important;', 'width: 145px;')
content = content.replace('background-color: var(--warning-color) !important; border-color: var(--warning-color) !important;', 'background-color: var(--warning-color); border-color: var(--warning-color);')
content = content.replace('color: #ffffff !important;', 'color: #ffffff;')
content = content.replace('position: absolute !important;', 'position: absolute;')
content = content.replace('top: auto !important;', 'top: auto;')
content = content.replace('left: auto !important;', 'left: auto;')
content = content.replace('bottom: 20px !important;', 'bottom: 20px;')
content = content.replace('right: 20px !important;', 'right: 20px;')
content = content.replace('display: none !important;', 'display: none;')
content = content.replace('overflow: hidden !important;', 'overflow: hidden;')
content = content.replace('background: #000 !important;', 'background: #000;')
content = content.replace('height: 100vh !important; width: 100vw !important;', 'height: 100vh; width: 100vw;')
content = content.replace('padding: 0 !important; margin: 0 !important;', 'padding: 0; margin: 0;')
content = content.replace('padding-left: 0 !important;', 'padding-left: 0;')
content = content.replace('display: flex !important;', 'display: flex;')
content = content.replace('gap: 8px !important;', 'gap: var(--spacing-sm);')
content = content.replace('padding: 0 20px 12px 20px !important;', 'padding: 0 var(--spacing-lg) var(--spacing-md) var(--spacing-lg);')
content = content.replace('justify-content: flex-start !important;', 'justify-content: flex-start;')
content = content.replace('background: rgba(148, 163, 184, 0.1) !important;', 'background: rgba(148, 163, 184, 0.1);')
content = content.replace('border: 1px solid transparent !important;', 'border: 1px solid transparent;')
content = content.replace('color: var(--text-secondary) !important;', 'color: var(--text-secondary);')
content = content.replace('padding: 5px 16px !important;', 'padding: 5px 16px;')
content = content.replace('border-radius: 20px !important;', 'border-radius: 20px;')
content = content.replace('font-size: 13px !important;', 'font-size: 13px;')
content = content.replace('box-shadow: none !important;', 'box-shadow: none;')
content = content.replace('background: var(--accent-color) !important;', 'background: var(--accent-color);')
content = content.replace('box-shadow: 0 2px 8px rgba(56, 189, 248, 0.4) !important;', 'box-shadow: 0 2px 8px rgba(56, 189, 248, 0.4);')
content = content.replace('border-color: var(--accent-color) !important;', 'border-color: var(--accent-color);')
content = content.replace('color: var(--text-primary) !important;', 'color: var(--text-primary);')
content = content.replace('cursor: none !important;', 'cursor: none;')
content = content.replace('background: var(--accent-color) !important;', 'background: var(--accent-color);')
content = content.replace('background: rgba(56, 189, 248, 0.12) !important;', 'background: rgba(56, 189, 248, 0.12);')
content = content.replace('background: rgba(56, 189, 248, 0.18) !important;', 'background: rgba(56, 189, 248, 0.18);')
content = content.replace('border-bottom: 2px solid var(--accent-color) !important;', 'border-bottom: 2px solid var(--accent-color);')


# 3. Optimize animations (add will-change)
content = content.replace('.hover-expand-btn {\n', '.hover-expand-btn {\n    will-change: width;\n')
content = content.replace('transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);', 'transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s;')


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("CSS Refactored successfully.")
