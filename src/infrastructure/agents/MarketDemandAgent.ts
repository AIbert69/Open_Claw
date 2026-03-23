import { BusinessIdea } from '../../domain/models/BusinessIdea';
import { DimensionScore } from '../../domain/models/AnalysisReport';
import { AnalysisAgent } from '../../domain/services/AnalysisService';

const MARKET_SIGNALS: Record<string, { boost: number; keywords: string[] }> = {
  'high-growth': { boost: 15, keywords: ['ai', 'machine learning', 'automation', 'saas', 'fintech', 'healthtech', 'climate', 'sustainability', 'remote', 'creator'] },
  'established': { boost: 5, keywords: ['ecommerce', 'food', 'fitness', 'education', 'real estate', 'consulting', 'marketing'] },
  'saturated': { boost: -10, keywords: ['social media', 'general marketplace', 'basic crm', 'todo app', 'weather app'] },
};

export class MarketDemandAgent implements AnalysisAgent {
  readonly name = 'MarketDemandAgent';
  readonly dimension = 'Market Demand';

  async analyze(idea: BusinessIdea): Promise<DimensionScore> {
    const text = `${idea.name} ${idea.description} ${idea.industry} ${idea.targetMarket}`.toLowerCase();

    let baseScore = 50;
    const strengths: string[] = [];
    const risks: string[] = [];
    const recommendations: string[] = [];

    for (const [category, { boost, keywords }] of Object.entries(MARKET_SIGNALS)) {
      const matches = keywords.filter(k => text.includes(k));
      if (matches.length > 0) {
        baseScore += boost * Math.min(matches.length, 3);
        if (boost > 0) {
          strengths.push(`Aligns with ${category} market trends: ${matches.join(', ')}`);
        } else {
          risks.push(`Operates in ${category} space: ${matches.join(', ')}`);
        }
      }
    }

    if (idea.description.length > 100) {
      baseScore += 8;
      strengths.push('Well-articulated value proposition signals clear market understanding');
    }

    if (idea.targetMarket !== 'General') {
      baseScore += 10;
      strengths.push(`Defined target market: ${idea.targetMarket}`);
    } else {
      risks.push('No specific target market defined — may struggle with positioning');
      recommendations.push('Define a specific beachhead market segment');
    }

    if (text.includes('problem') || text.includes('pain') || text.includes('solve') || text.includes('need')) {
      baseScore += 12;
      strengths.push('Problem-oriented framing suggests real market need');
    } else {
      risks.push('Description lacks problem-solution framing');
      recommendations.push('Reframe your pitch around a specific customer pain point');
    }

    if (text.includes('subscription') || text.includes('recurring') || text.includes('monthly')) {
      baseScore += 8;
      strengths.push('Recurring revenue model detected — attractive to investors');
    }

    const score = Math.max(10, Math.min(95, baseScore));

    if (recommendations.length === 0) {
      recommendations.push('Validate demand with a landing page and waitlist before building');
    }

    return {
      dimension: this.dimension,
      score,
      confidence: 0.72,
      summary: score >= 60
        ? `Strong demand signals detected for "${idea.name}" in the ${idea.industry} space`
        : `Market demand for "${idea.name}" requires further validation`,
      strengths,
      risks,
      recommendations,
    };
  }
}
