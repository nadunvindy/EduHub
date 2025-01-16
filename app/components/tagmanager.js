export default function TagManager(){
    return(
        <>
        {/* Global site tag (gtag.js) - Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1GNX7VH5E3" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-GOOGLEID');
          `}
        </Script>
      </>
    )
}