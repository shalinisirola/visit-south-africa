(function () {
    const DESKTOP_MIN_WIDTH = 769;
    const SCROLL_DELTA = 8;

    function initScrollNavToggle() {
        const nav = document.querySelector('.navbar');
        const homeButton = document.querySelector('.top-left-home-button');

        if (!nav && !homeButton) {
            return;
        }

        let lastY = window.scrollY || 0;

        function setHidden(isHidden) {
            if (nav) {
                nav.classList.toggle('scroll-hidden', isHidden);
            }
            if (homeButton) {
                homeButton.classList.toggle('scroll-hidden', isHidden);
            }
        }

        function onScroll() {
            if (window.innerWidth < DESKTOP_MIN_WIDTH) {
                setHidden(false);
                lastY = window.scrollY || 0;
                return;
            }

            const currentY = window.scrollY || 0;

            if (currentY <= 20) {
                setHidden(false);
                lastY = currentY;
                return;
            }

            const diff = currentY - lastY;

            if (diff > SCROLL_DELTA) {
                setHidden(true);
            } else if (diff < -SCROLL_DELTA) {
                setHidden(false);
            }

            lastY = currentY;
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        onScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollNavToggle);
    } else {
        initScrollNavToggle();
    }
})();
