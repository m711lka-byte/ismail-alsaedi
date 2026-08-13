import { generatePersonKnowledgeGraph } from '../src/lib/seo';

export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/ld+json; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const graph = generatePersonKnowledgeGraph();
  res.status(200).json(graph);
}
