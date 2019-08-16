const cookieAttributes = '; domain=shreyasminocha.me; path=/';

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('html');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme') || 'light';

        if (currentTheme === 'dark') {
            root.setAttribute('data-theme', 'light');
            document.cookie = `theme=light; ${cookieAttributes}`;
        } else {
            root.setAttribute('data-theme', 'dark');
            document.cookie = `theme=dark; ${cookieAttributes}`;
        }
    });

    const currentTheme = root.getAttribute('data-theme') || 'light';
    const isDarkEnabledViaCookie = isCookieSetTo('theme', 'dark');
    const doesOsPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;

    if (
        currentTheme === 'light'
        && (isDarkEnabledViaCookie || doesOsPrefersDark)
    ) {
        darkModeToggle.click();
    }
});


function isCookieSetTo(key, val) {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
        if (cookie === `${key}=${val}`) {
            return true;
        }
    }

    return false;
}
