/**
 * ServiceSchema Component
 * 
 * Generates Service structured data for GEO landing pages
 * Helps with local SEO and geographic targeting
 */

export default function ServiceSchema({ location, service, priceRange = "₹85,000 - ₹3,00,000" }) {
  if (!location || !service) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service} in ${location}`,
    "description": `Professional ${service.toLowerCase()} services for startup founders in ${location}. Revenue-ready MVPs delivered in 20 days.`,
    "provider": {
      "@type": "Organization",
      "name": "RAGSPRO",
      "founder": {
        "@type": "Person",
        "name": "Raghav Shah"
      }
    },
    "serviceArea": {
      "@type": "Place",
      "address": {
        "addressLocality": location,
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "offers": {
      "@type": "Offer",
      "priceRange": priceRange,
      "priceCurrency": "INR"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
