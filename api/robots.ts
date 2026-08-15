import { brandConfig } from '../src/lib/brandConfig';

export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(`User-agent: Googlebot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /

# Feeds & AI Context Discovery Links
# RSS 2.0 Feed: ${brandConfig.baseUrl}/rss.xml
# Atom 1.0 Feed: ${brandConfig.baseUrl}/atom.xml
# LLMs Context: ${brandConfig.baseUrl}/llms.txt
# Location: ${brandConfig.location.city}, ${brandConfig.location.country} (${brandConfig.location.coordinates.formatted})

Sitemap: ${brandConfig.baseUrl}/sitemap.xml
`);
}
