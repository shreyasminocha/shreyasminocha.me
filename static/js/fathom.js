((f, a, t, h, o, m) => {
    a[h] = a[h] || function (...args) {
        (a[h].q = a[h].q || []).push(args)
    };

    o = f.createElement('script');
    [m] = f.getElementsByTagName('script');
    o.async = 1; o.src = t; o.id = 'fathom-script';
    m.parentNode.insertBefore(o, m);
})(document, window, '//analytics.shreyasminocha.me/tracker.js', 'fathom');

fathom('set', 'siteId', 'QRNUO');
fathom('trackPageview');
