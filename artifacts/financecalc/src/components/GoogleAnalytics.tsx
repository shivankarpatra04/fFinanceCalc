import { Helmet } from "react-helmet-async";

export function GoogleAnalytics() {
  const gaId = import.meta.env.VITE_GA_ID || import.meta.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) return null;

  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </script>
    </Helmet>
  );
}
