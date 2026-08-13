import { brandConfig } from '../src/lib/brandConfig';

export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(`User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Dynamic Sitemap, RSS Feeds & Location Coordinates generated from Source Code:
Sitemap: ${brandConfig.baseUrl}/sitemap.xml
RSS: ${brandConfig.baseUrl}/rss.xml
Location: ${brandConfig.location.city}, ${brandConfig.location.country} (${brandConfig.location.coordinates.formatted})
`);
}
