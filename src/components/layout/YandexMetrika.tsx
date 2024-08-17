'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import ym from 'react-yandex-metrika'

export function YandexMetrika() {
	const pathName = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		ym('XXXXXXXX', 'hit', window.location.href)
	}, [pathName, searchParams])

	return (
		<Script id='yandex-metrika' strategy='afterInteractive'>
			{`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym("XXXXXXXX", "init", {
          defer: true,
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true
        });    
      `}
		</Script>
	)
}
