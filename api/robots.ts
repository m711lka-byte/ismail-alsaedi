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

# Dynamic Sitemap, LLMs Context, RSS Feeds & Geolocation
Sitemap: ${brandConfig.baseUrl}/sitemap.xml
RSS: ${brandConfig.baseUrl}/rss.xml
LLMs-Txt: ${brandConfig.baseUrl}/llms.txt
Location: ${brandConfig.location.city}, ${brandConfig.location.country} (${brandConfig.location.coordinates.formatted})
`);
}
