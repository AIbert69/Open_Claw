import { BusinessIdea } from '../../domain/models/BusinessIdea';
import { DimensionScore } from '../../domain/models/AnalysisReport';
import { AnalysisAgent } from '../../domain/services/AnalysisService';

const COMPETITIVE_LANDSCAPES: Record<string, { intensity: number; players: string[] }> = {
  'saas': { intensity: 70, players: ['Salesforce', 'HubSpot', 'Slack'] },
  'ecommerce': { intensity: 80, players: ['Amazon', 'Shopify', 'Etsy'] },
  'fintech': { intensity: 65, players: ['Stripe', 'Square', 'PayPal'] },
  'healthtech': { intensity: 45, players: ['Teladoc', 'Oscar Health'] },
  'edtech': { intensity: 55, players: ['Coursera', 'Udemy', 'Duolingo'] },
  'ai': { intensity: 75, players: ['OpenAI', 'Google', 'Anthropic'] },
  'food': { intensity: 60, players: ['DoorDash', 'Uber Eats', 'Instacart'] },
  'climate': { intensity: 35, players: ['Emerging market — fewer established players'] },
  'creator': { intensity: 50, players: ['Patreon', 'Substack', 'Gumroad'] },
};

export class CompetitionAgent implements AnalysisAgent {
  readonly name = 'CompetitionAgent';
  readonly dimension = 'Competition';

  async analyze(idea: BusinessIdea): Promise<DimensionScore> {
    const text = `${idea.name} ${idea.description} ${idea.industry}`.toLowerCase();

    let baseScore = 60;
    const strengths: string[] = [];
    const risks: string[] = [];
    const recommendations: string[] = [];

    let matchedLandscape: string | null = null;
    for (const [sector, data] of Object.entries(COMPETITIVE_LANDSCAPES)) {
      if (text.includes(sector)) {
        matchedLandscape = sector;
        baseScore = 100 - data.intensity;
        if (data.intensity >= 70) {
          risks.push(`High competition in ${sector}: ${data.players.join(', ')}`);
          recommendations.push(`Find a defensible niche within ${sector} that incumbents underserve`);
        } else if (data.intensity <= 45) {
          strengths.push(`Lower competition in ${sector} — opportunity for first-mover advantage`);
        } else {
          strengths.push(`Moderate competition in ${sector} — room for differentiated players`);
        }
        break;
      }
    }

    if (!matchedLandscape) {
      baseScore = 65;
      strengths.push('Potentially novel market — no direct competitive landscape identified');
      recommendations.push('Validate that lack of competition reflects opportunity, not lack of demand');
    }

    const moatKeywords = ['patent', 'proprietary', 'unique', 'first', 'only', 'exclusive', 'network effect', 'data moat'];
    const moats = moatKeywords.filter(k => text.includes(k));
    if (moats.length > 0) {
      baseScore += 12;
      strengths.push(`Competitive moat signals: ${moats.join(', ')}`);
    } else {
      risks.push('No clear competitive moat identified in description');
      recommendations.push('Develop a defensible advantage (proprietary tech, network effects, or unique data)');
    }

    if (text.includes('niche') || text.includes('specific') || text.includes('specialized')) {
      baseScore += 8;
      strengths.push('Niche focus reduces direct competition');
    }

    if (text.includes('platform') || text.includes('marketplace')) {
      baseScore -= 5;
      risks.push('Marketplace/platform models face chicken-and-egg challenges');
      recommendations.push('Start with one side of the market and build supply before demand');
    }

    const score = Math.max(10, Math.min(95, baseScore));

    return {
      dimension: this.dimension,
      score,
      confidence: 0.68,
      summary: score >= 60
        ? `Favorable competitive landscape for "${idea.name}" — room to establish position`
        : `Competitive environment for "${idea.name}" presents significant challenges`,
      strengths,
      risks,
      recommendations,
    };
  }
}
