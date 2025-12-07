/**
 * SchemaMarkup Component
 * 
 * Reusable component for rendering JSON-LD structured data
 * Supports: Organization, LocalBusiness, Service, CaseStudy, FAQPage
 */

export default function SchemaMarkup({ type, data }) {
  if (!data || !type) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
