// ==UserScript==
// @name                【Sorry,Discord!】 DC Orbs Quests Video Skip Button
// @name:zh-TW          【對不起,Discord!】 DC Orbs 任務影片跳過按鈕
// @name:zh-CN          【对不起,Discord!】 DC Orbs 任务视频跳过按钮
// @name:ja             【すみません,Discord!】 DC Orbs クエスト動画スキップボタン
// @name:ko             【죄송합니다,Discord!】 DC Orbs 퀘스트 동영상 건너뛰기 버튼
// @namespace           https://github.com/NiktoBlox/Tampermonkey-Scripts/tree/60ae32ddf7b8d2e6cfdae065bf1ce5f702550180/%F0%9F%9F%A2%E2%94%82Deploy%20Scripts/Discord%20Orbs%20Quests%20Video%20Skip%20Button
// @version             1.0 Beta
// @description         🔒 99% Safe & Account Ban-Free Script — Floating draggable skip button for Discord Orbs Quests Videos
// @description:zh-TW   🔒 99% 安全且不會封禁帳號的腳本 — 可拖曳的懸浮按鈕，用於跳過 Discord Orbs 任務影片
// @description:zh-CN   🔒 99% 安全且不会封禁账号的脚本 — 可拖拽的悬浮按钮，用于跳过 Discord Orbs 任务视频
// @description:ja      🔒 99% 安全・アカウントBANリスクなしスクリプト — Discord Orbs クエスト動画をスキップするためのドラッグ可能なフローティングボタン
// @description:ko      🔒 99% 안전 & 계정 차단 없는 스크립트 — Discord Orbs 퀘스트 동영상을 건너뛰기 위한 드래그 가능한 플로팅 버튼
// @author              NiktoBlox
// @license             MIT
// @match               https://discord.com/quest-home
// @match               https://discord.com/quests/*
// @match               https://discord.com/channels/*
// @match               https://discord.com/*
// @icon                https://files.catbox.moe/kdzneo.png
// @grant               GM_getValue
// @grant               GM_setValue
// ==/UserScript==

(function () {
    'use strict';

    // ── 多國語系 ──
    const I18N = {
        en: {
            skip: '⏭️ Skip', skipped: '✅ Skipped!', notFound: '❌ Not Found',
            settings: '⚙️ Settings', theme: '🎨 Theme', customColor: '🖌️ Custom Color',
            btnColor: 'Button', textColor: 'Text', borderRadius: '⬜ Border Radius',
            opacity: '👁️ Opacity', autoHide: '🔁 Auto-hide', autoHideDesc: 'Fade button when inactive',
            language: '🌐 Language', about: 'ℹ️ About', version: 'Version',
            author: 'Author', license: 'License', github: 'GitHub ↗',
            autoSkip: '🤖 Auto Skip', autoSkipDesc: 'Auto skip when video detected',
            autoSkipDelay: '⏱️ Auto Skip Delay', seconds: 's',
            notifyDuration: '🔔 Notify Duration',
            btnSize: '📐 Button Size', small: 'S', medium: 'M', large: 'L',
            btnPosition: '📌 Quick Position',
            customText: '✏️ Custom Button Text',
            resetAll: '🔄 Reset All Settings',
            resetConfirm: 'Reset all settings?',
            exportSettings: '📤 Export', importSettings: '📥 Import',
            importSuccess: '✅ Imported!', importFail: '❌ Import Failed',
            guiTheme: '🖥️ Panel Theme', guiLight: 'Light', guiDark: 'Dark', guiBlack: 'Pure Black',
            corners: ['↖ Top Left', '↗ Top Right', '↙ Bottom Left', '↘ Bottom Right'],
            dragDelay: '🖱️ Long-press Drag Delay', ms: 'ms',
            tabPanel: 'Panel', tabBtn: 'Button Style', tabOther: 'Other',
        },
        'zh-TW': {
            skip: '⏭️ 跳過', skipped: '✅ 已跳過！', notFound: '❌ 找不到',
            settings: '⚙️ 設定', theme: '🎨 主題', customColor: '🖌️ 自訂顏色',
            btnColor: '按鈕', textColor: '文字', borderRadius: '⬜ 圓角大小',
            opacity: '👁️ 透明度', autoHide: '🔁 自動隱藏', autoHideDesc: '閒置時淡化按鈕',
            language: '🌐 語言', about: 'ℹ️ 關於', version: '版本',
            author: '作者', license: '授權', github: 'GitHub ↗',
            autoSkip: '🤖 自動跳過', autoSkipDesc: '偵測到影片時自動跳過',
            autoSkipDelay: '⏱️ 自動跳過延遲', seconds: '秒',
            notifyDuration: '🔔 通知顯示時間',
            btnSize: '📐 按鈕大小', small: '小', medium: '中', large: '大',
            btnPosition: '📌 快速定位',
            customText: '✏️ 自訂按鈕文字',
            resetAll: '🔄 重設所有設定',
            resetConfirm: '確定重設所有設定？',
            exportSettings: '📤 匯出', importSettings: '📥 匯入',
            importSuccess: '✅ 匯入成功！', importFail: '❌ 匯入失敗',
            guiTheme: '🖥️ 面板主題', guiLight: '淺色', guiDark: '深色', guiBlack: '極黑',
            corners: ['↖ 左上', '↗ 右上', '↙ 左下', '↘ 右下'],
            dragDelay: '🖱️ 長按拖曳延遲', ms: '毫秒',
            tabPanel: '面板外觀', tabBtn: '按鈕外觀', tabOther: '其他',
        },
        'zh-CN': {
            skip: '⏭️ 跳过', skipped: '✅ 已跳过！', notFound: '❌ 未找到',
            settings: '⚙️ 设置', theme: '🎨 主题', customColor: '🖌️ 自定义颜色',
            btnColor: '按钮', textColor: '文字', borderRadius: '⬜ 圆角大小',
            opacity: '👁️ 透明度', autoHide: '🔁 自动隐藏', autoHideDesc: '闲置时淡化按钮',
            language: '🌐 语言', about: 'ℹ️ 关于', version: '版本',
            author: '作者', license: '许可证', github: 'GitHub ↗',
            autoSkip: '🤖 自动跳过', autoSkipDesc: '检测到视频时自动跳过',
            autoSkipDelay: '⏱️ 自动跳过延迟', seconds: '秒',
            notifyDuration: '🔔 通知显示时间',
            btnSize: '📐 按钮大小', small: '小', medium: '中', large: '大',
            btnPosition: '📌 快速定位',
            customText: '✏️ 自定义按钮文字',
            resetAll: '🔄 重置所有设置',
            resetConfirm: '确定重置所有设置？',
            exportSettings: '📤 导出', importSettings: '📥 导入',
            importSuccess: '✅ 导入成功！', importFail: '❌ 导入失败',
            guiTheme: '🖥️ 面板主题', guiLight: '浅色', guiDark: '深色', guiBlack: '极黑',
            corners: ['↖ 左上', '↗ 右上', '↙ 左下', '↘ 右下'],
            dragDelay: '🖱️ 长按拖拽延迟', ms: '毫秒',
            tabPanel: '面板外观', tabBtn: '按钮外观', tabOther: '其他',
        },
        ja: {
            skip: '⏭️ スキップ', skipped: '✅ スキップ完了！', notFound: '❌ 見つかりません',
            settings: '⚙️ 設定', theme: '🎨 テーマ', customColor: '🖌️ カスタムカラー',
            btnColor: 'ボタン', textColor: 'テキスト', borderRadius: '⬜ 角丸サイズ',
            opacity: '👁️ 透明度', autoHide: '🔁 自動非表示', autoHideDesc: '非アクティブ時にフェード',
            language: '🌐 言語', about: 'ℹ️ このスクリプトについて', version: 'バージョン',
            author: '作者', license: 'ライセンス', github: 'GitHub ↗',
            autoSkip: '🤖 自動スキップ', autoSkipDesc: '動画検出時に自動スキップ',
            autoSkipDelay: '⏱️ 自動スキップ遅延', seconds: '秒',
            notifyDuration: '🔔 通知表示時間',
            btnSize: '📐 ボタンサイズ', small: '小', medium: '中', large: '大',
            btnPosition: '📌 クイック配置',
            customText: '✏️ カスタムボタンテキスト',
            resetAll: '🔄 設定をリセット',
            resetConfirm: '全ての設定をリセットしますか？',
            exportSettings: '📤 エクスポート', importSettings: '📥 インポート',
            importSuccess: '✅ インポート完了！', importFail: '❌ インポート失敗',
            guiTheme: '🖥️ パネルテーマ', guiLight: 'ライト', guiDark: 'ダーク', guiBlack: '漆黒',
            corners: ['↖ 左上', '↗ 右上', '↙ 左下', '↘ 右下'],
            dragDelay: '🖱️ 長押しドラッグ遅延', ms: 'ms',
            tabPanel: 'パネル外観', tabBtn: 'ボタン外観', tabOther: 'その他',
        },
        ko: {
            skip: '⏭️ 건너뛰기', skipped: '✅ 건너뛰기 완료！', notFound: '❌ 찾을 수 없음',
            设置: '⚙️ 설정', theme: '🎨 테마', customColor: '🖌️ 커스텀 색상',
            btnColor: '버튼', textColor: '텍스트', borderRadius: '⬜ 테두리 반경',
            opacity: '👁️ 투명도', autoHide: '🔁 자동 숨김', autoHideDesc: '비활성 시 페이드 처리',
            language: '🌐 언어', about: 'ℹ️ 정보', version: '버전',
            author: '작성자', license: '라이선스', github: 'GitHub ↗',
            autoSkip: '🤖 자동 건너뛰기', autoSkipDesc: '영상 감지 시 자동 건너뛰기',
            autoSkipDelay: '⏱️ 자동 건너뛰기 지연', seconds: '초',
            notifyDuration: '🔔 알림 표시 시간',
            btnSize: '📐 버튼 크기', small: '소', medium: '중', large: '대',
            btnPosition: '📌 빠른 위치',
            customText: '✏️ 버튼 텍스트 커스텀',
            resetAll: '🔄 모든 설정 초기화',
            resetConfirm: '모든 설정을 초기화할까요？',
            exportSettings: '📤 내보내기', importSettings: '📥 가져오기',
            importSuccess: '✅ 가져오기 완료！', importFail: '❌ 가져오기 실패',
            guiTheme: '🖥️ 패널 테마', guiLight: '라이트', guiDark: '다크', guiBlack: '순수 블랙',
            corners: ['↖ 왼쪽 위', '↗ 오른쪽 위', '↙ 왼쪽 아래', '↘ 오른쪽 아래'],
            dragDelay: '🖱️ 길게 누르기 지연', ms: 'ms',
            tabPanel: '패널 외관', tabBtn: '버튼 스타일', tabOther: '기타',
        },
    };

    const LANG_NAMES = { en: 'English', 'zh-TW': '繁體中文', 'zh-CN': '简体中文', ja: '日本語', ko: '한국어' };

    const detectLang = () => {
        const nav = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase();
        if (nav.startsWith('zh-tw') || nav.startsWith('zh-hk')) return 'zh-TW';
        if (nav.startsWith('zh')) return 'zh-CN';
        if (nav.startsWith('ja')) return 'ja';
        if (nav.startsWith('ko')) return 'ko';
        return 'en';
    };

    const DEFAULTS = {
        theme: 'discord', btnColor: '#5865F2', btnTextColor: '#ffffff',
        btnRadius: '20', btnOpacity: '100', autoHide: false,
        lang: 'en', autoSkip: false, autoSkipDelay: '3',
        notifyDuration: '2', btnSize: 'M', customText: '',
        dragDelay: '200',
        guiTheme: 'dark',
    };

    const load = (key) => { try { return GM_getValue(key, DEFAULTS[key]); } catch { return DEFAULTS[key]; } };
    const save = (key, val) => { try { GM_setValue(key, val); } catch {} };

    let cfg = Object.fromEntries(Object.keys(DEFAULTS).map(k => [k, load(k)]));
    const t = () => I18N[cfg.lang] || I18N.en;

    const THEMES = {
        discord: { bg: '#5865F2', text: '#ffffff' }, dark: { bg: '#1e1e1e', text: '#ffffff' },
        light: { bg: '#e0e0e0', text: '#000000' }, green: { bg: '#43a047', text: '#ffffff' },
        red: { bg: '#e53935', text: '#ffffff' }, purple: { bg: '#8e24aa', text: '#ffffff' },
    };

    const BTN_SIZES = { S: '8px 14px', M: '10px 20px', L: '14px 28px' };
    const BTN_FONT = { S: '12px', M: '14px', L: '16px' };

    // ── 面板主題定義 ──
    const PANEL_THEMES = {
        light: {
            panel: '#f2f3f5', header: '#e3e5e8', text: '#060607',
            subtext: '#747f8d', input: '#e3e5e8', inputText: '#060607',
            border: '#d4d7dc', divider: '#d4d7dc', accent: '#5865F2',
            btnBg: '#e3e5e8', btnText: '#060607', btnActiveText: '#ffffff',
            resetBg: '#fde8e8', resetText: '#d32f2f',
        },
        dark: {
            panel: '#2b2d31', header: '#1e1f22', text: '#dbdee1',
            subtext: '#80848e', input: '#1e1f22', inputText: '#dbdee1',
            border: '#1e1f22', divider: '#3f4147', accent: '#ebebeb',
            btnBg: '#1e1f22', btnText: '#b0b3b8', btnActiveText: '#111111',
            resetBg: '#3a1e1e', resetText: '#e53935',
        },
        black: {
            panel: '#0d0d0d', header: '#000000', text: '#e0e0e0',
            subtext: '#666666', input: '#1a1a1a', inputText: '#e0e0e0',
            border: '#000000', divider: '#222222', accent: '#ffffff',
            btnBg: '#1a1a1a', btnText: '#cccccc', btnActiveText: '#000000',
            resetBg: '#2a0a0a', resetText: '#ff5252',
        },
    };
    const pt = () => PANEL_THEMES[cfg.guiTheme] || PANEL_THEMES.dark;

    // ── 主按鈕 【修復】──
    const btn = document.createElement('button');
    const getBtnText = () => cfg.customText.trim() || t().skip;
    btn.innerText = getBtnText();
    btn.id = 'sq-skip-btn';

    const applyBtn = () => {
        btn.style.cssText = `
            position: fixed !important; 
            bottom: 30px !important; 
            right: 30px !important; 
            z-index: 9999999 !important;
            background: ${cfg.btnColor} !important; 
            color: ${cfg.btnTextColor} !important;
            border: none !important; 
            border-radius: ${cfg.btnRadius}px !important;
            padding: ${BTN_SIZES[cfg.btnSize] || BTN_SIZES.M} !important;
            font-size: ${BTN_FONT[cfg.btnSize] || BTN_FONT.M} !important;
            font-weight: bold !important; 
            cursor: grab !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important; 
            user-select: none !important;
            transition: background 0.2s, opacity 0.2s !important;
            opacity: ${cfg.autoHide ? '0.2' : Number(cfg.btnOpacity) / 100} !important;
            visibility: visible !important;
            display: block !important;
            pointer-events: auto !important;
        `;
    };
    applyBtn();

    // ── 跳過核心 ──
    const doSkip = () => {
        const i = t();
        let found = false;
        document.querySelectorAll('video').forEach(el => { el.currentTime = el.duration; found = true; });
        ['[class*="skip"]', '[class*="close"]', '[class*="dismiss"]'].forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (el.offsetParent !== null) { el.click(); found = true; }
            });
        });
        btn.innerText = found ? i.skipped : i.notFound;
        setTimeout(() => { btn.innerText = getBtnText(); }, Number(cfg.notifyDuration) * 1000);
    };

    // ── 自動跳過 ──
    let autoSkipTimer = null;
    const setupAutoSkip = () => {
        if (autoSkipTimer) clearInterval(autoSkipTimer);
        if (!cfg.autoSkip) return;
        autoSkipTimer = setInterval(() => {
            const videos = document.querySelectorAll('video');
            videos.forEach(v => {
                if (!v.paused && !v.ended && v.duration && v.currentTime < v.duration) {
                    setTimeout(() => { v.currentTime = v.duration; }, Number(cfg.autoSkipDelay) * 1000);
                }
            });
        }, 2000);
    };
    setupAutoSkip();

    // ── 設定面板 ──
    const panel = document.createElement('div');
    const applyPanelTheme = () => {
        const p = pt();
        const wasVisible = panel.style.display === 'block';
        const savedLeft = panel.style.left;
        const savedTop = panel.style.top;
        panel.style.cssText = `
            display:${wasVisible ? 'block' : 'none'} !important; 
            position:fixed !important; 
            z-index:9999999 !important; 
            width:310px !important;
            background:${p.panel} !important; 
            color:${p.text} !important; 
            border-radius:12px !important;
            box-shadow:0 8px 32px rgba(0,0,0,0.6) !important;
            font-family:'gg sans',sans-serif !important; 
            font-size:14px !important;
            overflow:hidden !important; 
            border:1px solid ${p.border} !important;
            max-height:85vh !important; 
            overflow-y:auto !important;
        `;
        if (savedLeft) panel.style.left = savedLeft;
        if (savedTop) panel.style.top = savedTop;
    };
    applyPanelTheme();

    const row = (label, content) => `
        <div style="margin-bottom:14px;">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:${pt().subtext};margin-bottom:6px;">${label}</div>
            ${content}
        </div>`;

    const toggle = (id, checked, label, desc = '') => `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
            <div><div style="font-weight:600;">${label}</div>${desc ? `<div style="font-size:11px;color:${pt().subtext};">${desc}</div>` : ''}</div>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
                <input type="checkbox" id="${id}" ${checked ? 'checked' : ''} style="opacity:0;width:0;height:0;">
                <span style="position:absolute;top:0;left:0;right:0;bottom:0;background:${checked ? '#5865F2' : '#4e5058'};border-radius:24px;cursor:pointer;transition:0.2s;"></span>
                <span style="position:absolute;height:18px;width:18px;left:${checked ? '23px' : '3px'};bottom:3px;background:white;border-radius:50%;transition:0.2s;pointer-events:none;"></span>
            </label>
        </div>`;

    const buildPanel = () => {
        const i = t();

        panel.innerHTML = `
            <div style="background:${pt().header};padding:12px 16px;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;position:sticky;top:0;z-index:1;border-bottom:1px solid ${pt().divider};">
                ${i.settings}
                <span id="sq-close" style="margin-left:auto;cursor:pointer;font-size:18px;color:${pt().subtext};">✕</span>
            </div>
            <div style="padding:0 16px 16px;">

                
            <div style="display:flex;align-items:center;gap:8px;margin:16px 0 10px;padding-bottom:6px;border-bottom:2px solid ${pt().accent}22;">
                
                <span style="font-size:13px;font-weight:700;color:${pt().accent};text-transform:uppercase;letter-spacing:0.5px;">${i.tabPanel}</span>
            </div>

                ${row(i.language, `
                    <select id="sq-lang" style="width:100%;padding:7px 10px;border-radius:6px;border:none;background:${pt().input};color:${pt().inputText};cursor:pointer;font-size:13px;">
                        ${Object.entries(LANG_NAMES).map(([k,v]) => `<option value="${k}" ${cfg.lang===k?'selected':''}>${v}</option>`).join('')}
                    </select>`)}

                ${row(i.guiTheme, `
                    <div style="display:flex;gap:6px;">
                        ${[['light', i.guiLight], ['dark', i.guiDark], ['black', i.guiBlack]].map(([k, lbl]) => `
                            <button data-guitheme="${k}" style="flex:1;padding:7px;border-radius:6px;border:none;cursor:pointer;font-size:12px;font-weight:600;
                                background:${cfg.guiTheme===k ? pt().accent : pt().btnBg};
                                color:${cfg.guiTheme===k ? pt().btnActiveText : pt().btnText};">
                                ${lbl}
                            </button>
                        `).join('')}
                    </div>`)}

                
            <div style="display:flex;align-items:center;gap:8px;margin:16px 0 10px;padding-bottom:6px;border-bottom:2px solid ${pt().accent}22;">
                
                <span style="font-size:13px;font-weight:700;color:${pt().accent};text-transform:uppercase;letter-spacing:0.5px;">${i.tabBtn}</span>
            </div>

                ${row(i.theme, `
                    <div style="display:flex;flex-wrap:wrap;gap:6px;" id="sq-themes">
                        ${Object.entries(THEMES).map(([k,v]) => `
                            <div data-theme="${k}" title="${k}" style="width:32px;height:32px;border-radius:50%;background:${v.bg};cursor:pointer;
                                border:${cfg.theme===k?'3px solid #fff':'3px solid transparent'};box-shadow:0 2px 6px rgba(0,0,0,0.4);transition:border 0.2s;"></div>
                        `).join('')}
                    </div>`)}

                ${row(i.customColor, `
                    <div style="display:flex;gap:8px;align-items:center;">
                        <input type="color" id="sq-btncolor" value="${cfg.btnColor}" style="width:40px;height:32px;border:none;border-radius:6px;cursor:pointer;">
                        <input type="color" id="sq-txtcolor" value="${cfg.btnTextColor}" style="width:40px;height:32px;border:none;border-radius:6px;cursor:pointer;">
                        <span style="font-size:12px;color:${pt().subtext};">${i.btnColor} / ${i.textColor}</span>
                    </div>`)}

                ${row(i.btnSize, `
                    <div style="display:flex;gap:6px;">
                        ${['S','M','L'].map(s => `
                            <button data-size="${s}" style="flex:1;padding:6px;border-radius:6px;border:none;cursor:pointer;font-weight:bold;font-size:13px;
                                background:${cfg.btnSize===s?pt().accent:pt().btnBg};color:${cfg.btnSize===s?pt().btnActiveText:pt().btnText};">
                                ${i[s === 'S' ? 'small' : s === 'M' ? 'medium' : 'large']}
                            </button>`).join('')}
                    </div>`)}

                ${row(i.btnPosition, `
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                        ${[['TL','top:10px;left:10px'],['TR','top:10px;right:10px'],['BL','bottom:10px;left:10px'],['BR','bottom:10px;right:10px']].map(([pos, s], idx) => `
                            <button data-pos="${s}" style="padding:6px;border-radius:6px;border:none;cursor:pointer;background:${pt().btnBg};color:${pt().text};font-size:12px;">
                                ${i.corners[idx]}
                            </button>`).join('')}
                    </div>`)}

                ${row(`${i.borderRadius}: <span id="sq-radius-val">${cfg.btnRadius}</span>px`, `
                    <input type="range" id="sq-radius" min="0" max="50" value="${cfg.btnRadius}" style="width:100%;accent-color:${pt().accent};">`)}

                ${row(`${i.opacity}: <span id="sq-opacity-val">${cfg.btnOpacity}</span>%`, `
                    <input type="range" id="sq-opacity" min="10" max="100" value="${cfg.btnOpacity}" style="width:100%;accent-color:${pt().accent};">`)}

                ${toggle('sq-autohide', cfg.autoHide, i.autoHide, i.autoHideDesc)}

                ${row(i.customText, `
                    <input type="text" id="sq-customtext" value="${cfg.customText}" placeholder="${t().skip}" maxlength="20"
                        style="width:100%;padding:7px 10px;border-radius:6px;border:none;background:${pt().input};color:${pt().inputText};font-size:13px;box-sizing:border-box;">`)}

                
            <div style="display:flex;align-items:center;gap:8px;margin:16px 0 10px;padding-bottom:6px;border-bottom:2px solid ${pt().accent}22;">
                
                <span style="font-size:13px;font-weight:700;color:${pt().accent};text-transform:uppercase;letter-spacing:0.5px;">${i.tabOther}</span>
            </div>

                ${toggle('sq-autoskip', cfg.autoSkip, i.autoSkip, i.autoSkipDesc)}

                ${row(`${i.autoSkipDelay}: <span id="sq-delay-val">${cfg.autoSkipDelay}</span>${i.seconds}`, `
                    <input type="range" id="sq-delay" min="1" max="10" value="${cfg.autoSkipDelay}" style="width:100%;accent-color:${pt().accent};">`)}

                ${row(`${i.notifyDuration}: <span id="sq-notify-val">${cfg.notifyDuration}</span>${i.seconds}`, `
                    <input type="range" id="sq-notify" min="1" max="10" value="${cfg.notifyDuration}" style="width:100%;accent-color:${pt().accent};">`)}

                ${row(`${i.dragDelay}: <span id="sq-dragdelay-val">${cfg.dragDelay}</span>${i.ms}`, `
                    <input type="range" id="sq-dragdelay" min="0" max="1000" step="100" value="${cfg.dragDelay}" style="width:100%;accent-color:${pt().accent};">
                    <div style="display:flex;justify-content:space-between;font-size:11px;color:${pt().subtext};margin-top:3px;">
                        <span>0${i.ms}</span><span>500${i.ms}</span><span>1000${i.ms}</span>
                    </div>`)}

                <div style="border-top:1px solid ${pt().divider};margin:4px 0 14px;"></div>

                <div style="display:flex;gap:6px;margin-bottom:14px;">
                    <button id="sq-export" style="flex:1;padding:7px;border-radius:6px;border:none;cursor:pointer;background:${pt().btnBg};color:${pt().text};font-size:12px;">${i.exportSettings}</button>
                    <button id="sq-import" style="flex:1;padding:7px;border-radius:6px;border:none;cursor:pointer;background:${pt().btnBg};color:${pt().text};font-size:12px;">${i.importSettings}</button>
                    <button id="sq-reset" style="flex:1;padding:7px;border-radius:6px;border:none;cursor:pointer;background:${pt().resetBg};color:${pt().resetText};font-size:12px;">${i.resetAll}</button>
                </div>
            </div>
        `;

        // 關閉
        panel.querySelector('#sq-close').onclick = () => panel.style.display = 'none';

        // 語言
        panel.querySelector('#sq-lang').onchange = (e) => {
            cfg.lang = e.target.value;
            save('lang', cfg.lang);
            buildPanel();
        };

        // GUI主題
        panel.querySelectorAll('[data-guitheme]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                cfg.guiTheme = btn.dataset.guitheme;
                save('guiTheme', cfg.guiTheme);
                applyPanelTheme();
                buildPanel();
            };
        });

        // 主題色
        panel.querySelectorAll('[data-theme]').forEach(div => {
            div.onclick = (e) => {
                e.stopPropagation();
                cfg.theme = div.dataset.theme;
                cfg.btnColor = THEMES[cfg.theme].bg;
                cfg.btnTextColor = THEMES[cfg.theme].text;
                save('theme', cfg.theme);
                save('btnColor', cfg.btnColor);
                save('btnTextColor', cfg.btnTextColor);
                applyBtn();
                buildPanel();
            };
        });

        // 自訂顏色
        const btnColor = panel.querySelector('#sq-btncolor');
        const txtColor = panel.querySelector('#sq-txtcolor');
        btnColor.onchange = (e) => {
            cfg.btnColor = e.target.value;
            save('btnColor', cfg.btnColor);
            applyBtn();
        };
        txtColor.onchange = (e) => {
            cfg.btnTextColor = e.target.value;
            save('btnTextColor', cfg.btnTextColor);
            applyBtn();
        };

        // 按鈕大小
        panel.querySelectorAll('[data-size]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                cfg.btnSize = btn.dataset.size;
                save('btnSize', cfg.btnSize);
                applyBtn();
                buildPanel();
            };
        });

        // 快速定位
        panel.querySelectorAll('[data-pos]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const posStr = btn.dataset.pos;
                btn.style.cssText += 'background:' + pt().accent + '!important;color:' + pt().btnActiveText + '!important;';
                posStr.split(';').forEach(p => {
                    const [k, v] = p.split(':');
                    btn.style[k] = v;
                });
            };
        });

        // 圓角
        panel.querySelector('#sq-radius').oninput = (e) => {
            cfg.btnRadius = e.target.value;
            panel.querySelector('#sq-radius-val').innerText = e.target.value;
            applyBtn();
        };
        panel.querySelector('#sq-radius').onchange = (e) => {
            cfg.btnRadius = e.target.value;
            save('btnRadius', cfg.btnRadius);
        };

        // 透明度
        panel.querySelector('#sq-opacity').oninput = (e) => {
            cfg.btnOpacity = e.target.value;
            panel.querySelector('#sq-opacity-val').innerText = e.target.value;
            applyBtn();
        };
        panel.querySelector('#sq-opacity').onchange = (e) => {
            cfg.btnOpacity = e.target.value;
            save('btnOpacity', cfg.btnOpacity);
        };

        // 自動隱藏
        panel.querySelector('#sq-autohide').onchange = (e) => {
            cfg.autoHide = e.target.checked;
            save('autoHide', cfg.autoHide);
            applyBtn();
        };

        // 自訂文字
        panel.querySelector('#sq-customtext').onchange = (e) => {
            cfg.customText = e.target.value;
            save('customText', cfg.customText);
            btn.innerText = getBtnText();
        };

        // 自動跳過
        panel.querySelector('#sq-autoskip').onchange = (e) => {
            cfg.autoSkip = e.target.checked;
            save('autoSkip', cfg.autoSkip);
            setupAutoSkip();
        };

        // 自動跳過延遲
        panel.querySelector('#sq-delay').oninput = (e) => {
            panel.querySelector('#sq-delay-val').innerText = e.target.value;
        };
        panel.querySelector('#sq-delay').onchange = (e) => {
            cfg.autoSkipDelay = e.target.value;
            save('autoSkipDelay', cfg.autoSkipDelay);
        };

        // 通知時間
        panel.querySelector('#sq-notify').oninput = (e) => {
            panel.querySelector('#sq-notify-val').innerText = e.target.value;
        };
        panel.querySelector('#sq-notify').onchange = (e) => {
            cfg.notifyDuration = e.target.value;
            save('notifyDuration', cfg.notifyDuration);
        };

        // 拖曳延遲
        panel.querySelector('#sq-dragdelay').oninput = (e) => {
            panel.querySelector('#sq-dragdelay-val').innerText = e.target.value;
        };
        panel.querySelector('#sq-dragdelay').onchange = (e) => {
            cfg.dragDelay = e.target.value;
            save('dragDelay', cfg.dragDelay);
        };

        // 匯出
        panel.querySelector('#sq-export').onclick = () => {
            const data = JSON.stringify(cfg);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `discord-orbs-skip-settings-${Date.now()}.json`;
            a.click();
        };

        // 匯入
        panel.querySelector('#sq-import').onclick = () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e2) => {
                const file = e2.target.files[0];
                const reader = new FileReader();
                reader.onload = (e3) => {
                    try {
                        const imported = JSON.parse(e3.target.result);
                        Object.keys(DEFAULTS).forEach(k => { if (k in imported) { cfg[k] = imported[k]; save(k, cfg[k]); } });
                        applyBtn(); applyPanelTheme(); buildPanel();
                        panel.style.display = 'block';
                        btn.innerText = t().importSuccess;
                        setTimeout(() => { btn.innerText = getBtnText(); }, 2000);
                    } catch {
                        btn.innerText = t().importFail;
                        setTimeout(() => { btn.innerText = getBtnText(); }, 2000);
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        };

        // 重設
        panel.querySelector('#sq-reset').onclick = () => {
            if (!confirm(t().resetConfirm)) return;
            Object.keys(DEFAULTS).forEach(k => { cfg[k] = DEFAULTS[k]; save(k, DEFAULTS[k]); });
            applyBtn(); applyPanelTheme(); buildPanel();
            panel.style.display = 'block';
            btn.innerText = getBtnText();
        };
    };
    buildPanel();

    // ── 面板定位 ──
    const positionPanel = () => {
        panel.style.display = 'block';
        const rect = btn.getBoundingClientRect();
        const pw = Math.min(310, window.innerWidth - 20);
        const ph = Math.min(panel.scrollHeight || 500, window.innerHeight * 0.85);
        panel.style.width = pw + 'px';
        let left = rect.left - pw + btn.offsetWidth;
        let top = rect.top - ph - 10;
        if (left < 10) left = 10;
        if (top < 10) top = rect.bottom + 10;
        if (left + pw > window.innerWidth - 10) left = window.innerWidth - pw - 10;
        if (top + ph > window.innerHeight - 10) top = window.innerHeight - ph - 10;
        panel.style.left = left + 'px';
        panel.style.top = top + 'px';
    };

    // ── 長按拖曳模式 ──
    let isDragging = false;
    let dragReady = false;
    let longPressTimer = null;
    let startX, startY, startLeft, startTop;

    const ring = document.createElement('div');
    ring.style.cssText = `
        position: fixed; z-index: 9999998; pointer-events: none;
        width: 0; height: 0; border-radius: 50%;
        border: 3px solid transparent;
        transition: none; display: none;
    `;
    document.body.appendChild(ring);

    const showRing = (x, y) => {
        const size = 54;
        ring.style.display = 'block';
        ring.style.left = (x - size / 2) + 'px';
        ring.style.top = (y - size / 2) + 'px';
        ring.style.width = size + 'px';
        ring.style.height = size + 'px';
        ring.style.border = `3px solid ${cfg.btnColor}`;
        ring.style.boxShadow = `0 0 0 0 ${cfg.btnColor}44`;
        ring.style.animation = 'sq-ring-spin 1s linear forwards';
    };
    const hideRing = () => {
        ring.style.display = 'none';
        ring.style.animation = 'none';
    };

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes sq-ring-spin {
            0% { clip-path: inset(0 100% 0 0); opacity: 1; }
            100% { clip-path: inset(0 0% 0 0);   opacity: 1; }
        }
        @keyframes sq-ring-pulse {
            0% { box-shadow: 0 0 0 0px rgba(88,101,242,0.5); }
            100% { box-shadow: 0 0 0 10px rgba(88,101,242,0); }
        }
    `;
    document.head.appendChild(styleEl);

    btn.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDragging = false;
        dragReady = false;

        const rect = btn.getBoundingClientRect();
        startX = e.clientX; startY = e.clientY;
        startLeft = rect.left; startTop = rect.top;

        showRing(e.clientX, e.clientY);
        btn.style.transition = 'transform 0.1s';
        btn.style.transform = 'scale(0.92)';

        longPressTimer = setTimeout(() => {
            dragReady = true;
            hideRing();
            btn.style.transform = 'scale(1.1)';
            btn.style.cursor = 'grabbing';
            btn.style.boxShadow = `0 0 0 4px ${cfg.btnColor}66, 0 6px 20px rgba(0,0,0,0.4)`;
            btn.style.right = 'auto'; btn.style.bottom = 'auto';
            btn.style.left = startLeft + 'px'; btn.style.top = startTop + 'px';
        }, Number(cfg.dragDelay));

        const onMouseMove = (e) => {
            if (!dragReady) return;
            isDragging = true;
            const dx = e.clientX - startX, dy = e.clientY - startY;
            btn.style.left = Math.max(10, Math.min(startLeft + dx, window.innerWidth - btn.offsetWidth - 10)) + 'px';
            btn.style.top = Math.max(10, Math.min(startTop + dy, window.innerHeight - btn.offsetHeight - 10)) + 'px';
        };

        const onMouseUp = () => {
            clearTimeout(longPressTimer);
            hideRing();
            btn.style.cursor = 'grab';
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            dragReady = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
    });

    btn.addEventListener('click', () => {
        if (isDragging) { isDragging = false; return; }
        doSkip();
    });

    btn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (panel.style.display === 'block') { panel.style.display = 'none'; } else { buildPanel(); positionPanel(); }
    });

    btn.addEventListener('mouseenter', () => {
        btn.style.opacity = '1'; btn.style.background = adjustColor(cfg.btnColor, -20);
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.background = cfg.btnColor;
        btn.style.opacity = cfg.autoHide ? '0.2' : String(Number(cfg.btnOpacity) / 100);
    });

    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && e.target !== btn) panel.style.display = 'none';
    });

    function adjustColor(hex, amount) {
        try {
            const n = parseInt(hex.slice(1), 16);
            const r = Math.max(0, Math.min(255, (n >> 16) + amount));
            const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amount));
            const b = Math.max(0, Math.min(255, (n & 0xff) + amount));
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        } catch { return hex; }
    }

    document.body.appendChild(btn);
    document.body.appendChild(panel);
    
    // 【修復】最後確認一次按鈕可見
    setTimeout(() => {
        btn.style.cssText += 'z-index: 9999999 !important; visibility: visible !important; display: block !important;';
        console.log('✅ Skip Button Initialized Successfully!');
    }, 500);
})();
