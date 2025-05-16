import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'product.group' | 'business.business';
  keywords?: string;
  structuredData?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  twitterCardType?: 'summary_large_image' | 'summary' | 'app' | 'player';
}

const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://www.ayoglow.com/images/og-default.jpg',
  ogType = 'website',
  keywords,
  structuredData,
  noindex = false,
  publishedTime,
  modifiedTime,
  author = 'AyoGlow Naturals',
  twitterCardType = 'summary_large_image',
}: SEOProps) => {
  // Format the title to ensure consistency across pages
  const formattedTitle = title.includes('AyoGlow Naturals') 
    ? title 
    : `${title} | AyoGlow Naturals`;

  // Get the current URL from window if canonicalUrl is not provided
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Robots Directives */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="AyoGlow Naturals" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:site" content="@ayoglow_naturals" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Pinterest Rich Pins Verification */}
      <meta name="p:domain_verify" content="ayoglownaturals" />
      
      {/* JSON-LD Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
    </Helmet>
  );
};

export default SEOHead; 