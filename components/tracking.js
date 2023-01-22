export default function Tracking({path}){

    return (
        <>
            {/* Snapchat tracking init */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
                    {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
                    a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
                    r.src=n;var u=t.getElementsByTagName(s)[0];
                    u.parentNode.insertBefore(r,u);})(window,document,
                    'https://sc-static.net/scevent.min.js');
                  `,
                }}
            />

            {/* Pinterest tracking init */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    !function(e){if(!window.pintrk){window.pintrk = function () {
                    window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                    n=window.pintrk;n.queue=[],n.version="3.0";var
                    t=document.createElement("script");t.async=!0,t.src=e;var
                    r=document.getElementsByTagName("script")[0];
                    r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
                    pintrk('load', '2614390234178');
                    pintrk('page');
                  `,
                }}
            />

            {/* Facebook tracking init */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '319104862011061');
                    fbq('track', 'PageView');
                  `,
                }}
            />

            {/* Taboola tracking init */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                   window._tfa = window._tfa || [];
                    window._tfa.push({notify: 'event', name: 'page_view', id: 1211453});
                    !function (t, f, a, x) {
                        if (!document.getElementById(x)) {
                            t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
                        }
                    }(document.createElement('script'),
                        document.getElementsByTagName('script')[0],
                        '//cdn.taboola.com/libtrc/unip/1211453/tfa.js',
                        'tb_tfa_script');
                        
                    _tfa.push({notify: 'event', name: 'page_view',"item-url":'https://velkomstgaver.no/${path}'});
                  `,
                }}
            />

            {/* TikTok tracking init */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                !function (w, d, t) {
                    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                    ttq.load('C6HN2G0VMNUOMCA118LG');
                    ttq.page();
                }(window, document, 'ttq');
                  `,
                }}
            />

            {/* Adwords tracking init */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1068246437"/>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                    
                      gtag('config', 'AW-1068246437');
                  `,
                }}
            />
        </>
    )
}