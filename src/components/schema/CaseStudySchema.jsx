/**
 * CaseStudySchema Component
 * 
 * Generates Case Study structured data for project pages
 * Helps with SEO and LLM discovery
 */

export default function CaseStudySchema({ caseStudy }) {
  if (!caseStudy) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    "name": caseStudy.name,
    "about": caseStudy.about,
    "result": caseStudy.result,
    "creator": {
      "@type": "Organization",
      "name": "RAGSPRO",
      "founder": {
        "@type": "Person",
        "name": "Raghav Shah"
      }
    },
    "datePublished": caseStudy.completionDate,
    "url": caseStudy.url
  };

  // Add optional fields if they exist
  if (caseStudy.client) {
    schema.client = caseStudy.client;
  }

  if (caseStudy.technologies && caseStudy.technologies.length > 0) {
    schema.keywords = caseStudy.technologies.join(', ');
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
