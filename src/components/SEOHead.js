import Head from 'next/head'

export default function SEOHead({ 
  title = "iOS & Web App Development Agency in India | RAGSPRO",
  description = "RAGSPRO is a premium app & web development agency helping startups build iOS apps, web apps, SaaS products & AI-powered solutions. Trusted by founders across India, USA, UK.",
  keywords = "iOS app development agency, web development agency India, startup app developers, SaaS development company, AI automation agency, mobile app development India, app development agency Delhi, iPhone app developers, SwiftUI developers",
  ogImage = "https://ragspro.com/images/og-image.jpg",
  url = "https://ragspro.com",
  type = "website",
  publishedDate,
  modifiedDate,
  author = "Raghav Shah",
  schema
}) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Raghav Shah, RAGSPRO" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="RAGSPRO" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@ragspro" />
      <meta name="twitter:site" content="@ragspro" />

      {/* Additional SEO */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content="RAGSPRO" />
      <meta name="apple-mobile-web-app-title" content="RAGSPRO" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="IN-DL" />
      <meta name="geo.placename" content="New Delhi" />
      <meta name="geo.position" content="28.7041;77.1025" />
      <meta name="ICBM" content="28.7041, 77.1025" />
      
      {/* Language & Alternate */}
      <meta httpEquiv="content-language" content="en-US" />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Article Meta (for blog posts) */}
      {publishedDate && <meta property="article:published_time" content={publishedDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Additional Twitter */}
      <meta name="twitter:image:alt" content={title} />
      
      {/* Image Dimensions */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      
      {/* Additional SEO Meta */}
      <meta name="rating" content="General" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  )
}