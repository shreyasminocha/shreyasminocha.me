window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('html');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');

    const cookies = document.cookie.split(';');
    let isDarkEnabledViaCookie;

    if (cookies.filter(item => item.includes('dark-mode=true')).length) {
        isDarkEnabledViaCookie = true;
    }

    const doesOsPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;

    darkModeToggle.addEventListener('click', () => {
        const isEnabled = root.classList.toggle('dark-mode-enabled');
        const cookieAttributes = ';domain=shreyasminocha.me;path=/';

        if (isEnabled) {
            document.cookie = `dark-mode=true${cookieAttributes}`;
        } else {
            document.cookie = `dark-mode=false${cookieAttributes}`;
        }
    });

    const isEnabled = root.classList.contains('dark-mode-enabled');

    if (!isEnabled && (isDarkEnabledViaCookie || doesOsPrefersDark)) {
        darkModeToggle.click();
    }
});
