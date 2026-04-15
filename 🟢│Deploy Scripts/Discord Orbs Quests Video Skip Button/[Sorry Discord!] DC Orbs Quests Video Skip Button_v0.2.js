// ==UserScript==
// @name                【Sorry,Discord!】 DC Orbs Quests Video Skip Button
// @name:zh-TW          【對不起,Discord!】 DC Orbs 任務影片跳過按鈕
// @name:zh-CN          【对不起,Discord!】 DC Orbs 任务视频跳过按钮
// @name:ja             【すみません,Discord!】 DC Orbs クエスト動画スキップボタン
// @name:ko             【죄송합니다,Discord!】 DC Orbs 퀘스트 동영상 건너뛰기 버튼
// @namespace           https://github.com/NiktoBlox/Tampermonkey-Scripts/tree/60ae32ddf7b8d2e6cfdae065bf1ce5f702550180/%F0%9F%9F%A2%E2%94%82Deploy%20Scripts/Discord%20Orbs%20Quests%20Video%20Skip%20Button
// @version             0.2
// @description         Floating draggable skip button for Discord Orbs Quests Videos
// @description:zh-TW   可拖曳的懸浮按鈕，用於跳過 Discord Orbs 任務影片
// @description:zh-CN   可拖拽的悬浮按钮，用于跳过 Discord Orbs 任务视频
// @description:ja      Discord Orbs クエスト動画をスキップするためのドラッグ可能なフローティングボタン
// @description:ko      Discord Orbs 퀘스트 동영상을 건너뛰기 위한 드래그 가능한 플로팅 버튼
// @author              NiktoBlox
// @license             MIT
// @match               https://discord.com/quest-home
// @match               https://discord.com/quests/*
// @match               https://discord.com/channels/*
// @match               https://discord.com/*
// @icon                https://files.catbox.moe/kdzneo.png
// @grant               none
// ==/UserScript==

(function() {
    'use strict';

    const btn = document.createElement('button');
    btn.innerText = '⏭️ Skip';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 99999;
        background: #5865F2;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        cursor: grab;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        user-select: none;
    `;

    let isDragging = false;
    let startX, startY, startLeft, startTop;

    btn.addEventListener('mousedown', (e) => {
        isDragging = false;
        const rect = btn.getBoundingClientRect();
        startX = e.clientX;
        startY = e.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        btn.style.cursor = 'grabbing';
        btn.style.right = 'auto';
        btn.style.bottom = 'auto';
        btn.style.left = startLeft + 'px';
        btn.style.top = startTop + 'px';

        const onMouseMove = (e) => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) isDragging = true;
            const newLeft = Math.max(10, Math.min(startLeft + dx, window.innerWidth - btn.offsetWidth - 10));
            const newTop = Math.max(10, Math.min(startTop + dy, window.innerHeight - btn.offsetHeight - 10));
            btn.style.left = newLeft + 'px';
            btn.style.top = newTop + 'px';
        };

        const onMouseUp = () => {
            btn.style.cursor = 'grab';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    btn.addEventListener('click', () => {
        if (isDragging) return;

        let found = false;
        document.querySelectorAll('video').forEach(el => {
            el.currentTime = el.duration;
            found = true;
        });

        ['[class*="skip"]', '[class*="close"]', '[class*="dismiss"]'].forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (el.offsetParent !== null) { el.click(); found = true; }
            });
        });

        btn.innerText = found ? '✅ Skipped!' : '❌ Not Found';
        setTimeout(() => { btn.innerText = '⏭️ Skip'; }, 2000);
    });

    btn.onmouseover = () => { if (!isDragging) btn.style.background = '#4752C4'; };
    btn.onmouseout = () => { btn.style.background = '#5865F2'; };

    document.body.appendChild(btn);
})();
