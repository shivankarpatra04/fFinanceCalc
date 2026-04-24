import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, any>;
  ogImage?: string;
  ogType?: 'website' | 'article';
}

export function useSEO({
  title,
  description,
  canonical,
  jsonLd,
  ogImage = 'https://www.indiancalc.com/og-image.png',
  ogType = 'website',
}: SEOProps) {
  useEffect(() => {
    // Set Title
    document.title = title;

    // Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set Canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Set Open Graph Tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:image': ogImage,
      'og:type': ogType,
      'og:url': canonical || window.location.href,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let metaTag = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property.startsWith('twitter:')) {
          metaTag.setAttribute('name', property);
        } else {
          metaTag.setAttribute('property', property);
        }
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });

    // Set JSON-LD
    let scriptTag = document.querySelector('#json-ld-script');
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.setAttribute('id', 'json-ld-script');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

  }, [title, description, canonical, jsonLd, ogImage, ogType]);
}
