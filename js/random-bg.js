(function() {
    // ===== 配置区域：请根据您的图片列表修改 =====
    const lightImages = [
      '/imgs/backgrounds/143555303_p0.jpg',
      '/imgs/backgrounds/130936544_p0.png',
      '/imgs/backgrounds/139198382_p0.png',
      '/imgs/backgrounds/139434532_p0.png',
      '/imgs/backgrounds/140179187_p1.jpg',
      '/imgs/backgrounds/142519100_p0-edit.png',
      '/imgs/backgrounds/143217557_p0-edit.png'
    ];
    const darkImages = [
      '/imgs/backgrounds/125292748_1-edit.jpg',
      '/imgs/backgrounds/101475556_p0.jpg',
      '/imgs/backgrounds/111923744_p0.png',
      '/imgs/backgrounds/133514262_p0-edit.jpg'
    ];
    const randomOnThemeChange = true;

    let styleElement = null;

    function randomItem(arr) {
        if (!arr || arr.length === 0) return null;
        const valid = arr.filter(url => url && url.trim() !== '');
        if (valid.length === 0) return null;
        return valid[Math.floor(Math.random() * valid.length)];
    }

    function getCurrentTheme() {
        const html = document.documentElement;
        const theme = html.getAttribute('data-theme');
        return theme === 'dark' ? 'dark' : 'light';
    }

    function applyRandomBackground() {
        const theme = getCurrentTheme();
        const imageList = theme === 'dark' ? darkImages : lightImages;
        const imageUrl = randomItem(imageList);
        if (!imageUrl) return;

        if (styleElement) styleElement.remove();

        // 保持与原代码相同的媒体查询，并使用 !important 覆盖原样式
        const css = `
            @media (min-width: 768px) {
                body.custom-background {
                    background-image: url('${imageUrl}') !important;
                }
            }
        `;
        styleElement = document.createElement('style');
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
    }

    function watchThemeChange() {
        const target = document.documentElement;
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    if (randomOnThemeChange) applyRandomBackground();
                }
            });
        });
        observer.observe(target, { attributes: true });
    }

    function ensureCustomBackgroundClass() {
        if (!document.body.classList.contains('custom-background')) {
            document.body.classList.add('custom-background');
        }
    }

    function init() {
        ensureCustomBackgroundClass();
        applyRandomBackground();
        watchThemeChange();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
