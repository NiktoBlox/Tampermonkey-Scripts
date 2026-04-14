// ==UserScript==
// @name         [Sorry Discord!] DC Orbs Quests Video Skip Button
// @namespace    https://github.com/NiktoBlox
// @version      1.0
// @description  Floating draggable skip button for Discord Orbs Quests Videos
// @author       NiktoBlox
// @match        https://discord.com/quest-home
// @match        https://discord.com/quests/*
// @match        https://discord.com/channels/*
// @match        https://discord.com/*
// @icon         https://files.catbox.moe/kdzneo.png
// @grant        none
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