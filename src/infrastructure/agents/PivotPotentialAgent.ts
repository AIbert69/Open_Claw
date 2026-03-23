import { BusinessIdea } from '../../domain/models/BusinessIdea';
import { DimensionScore } from '../../domain/models/AnalysisReport';
import { AnalysisAgent } from '../../domain/services/AnalysisService';

export class PivotPotentialAgent implements AnalysisAgent {
  readonly name = 'PivotPotentialAgent';
  readonly dimension = 'Pivot Potential';

  async analyze(idea: BusinessIdea): Promise<DimensionScore> {
    const text = `${idea.name} ${idea.description} ${idea.industry} ${idea.targetMarket}`.toLowerCase();

    let baseScore = 55;
    const strengths: string[] = [];
    const risks: string[] = [];
    const recommendations: string[] = [];

    // Technology transferability
    const transferabletech = ['api', 'platform', 'engine', 'framework', 'infrastructure', 'data', 'analytics', 'ai', 'machine learning'];
    const techHits = transferabletech.filter(t => text.includes(t));
    if (techHits.length > 0) {
      baseScore += 12;
      strengths.push(`Core technology is transferable: ${techHits.join(', ')}`);
    }

    // Market adjacency
    const broadMarkets = ['enterprise', 'small business', 'consumer', 'developer', 'professional'];
    const marketHits = broadMarkets.filter(m => text.includes(m));
    if (marketHits.length >= 2) {
      baseScore += 10;
      strengths.push('Multiple viable market segments for lateral expansion');
    } else if (marketHits.length === 1) {
      baseScore += 5;
      strengths.push(`Primary market (${marketHits[0]}) has adjacent expansion opportunities`);
    }

    // Modular design signals
    const modularSignals = ['modular', 'plugin', 'extensible', 'configurable', 'customizable', 'white-label'];
    if (modularSignals.some(s => text.includes(s))) {
      baseScore += 10;
      strengths.push('Modular architecture enables rapid pivoting');
    }

    // Industry breadth
    const industryCount = ['health', 'finance', 'education', 'retail', 'food', 'tech', 'real estate', 'media'].filter(i => text.includes(i)).length;
    if (industryCount >= 2) {
      baseScore += 8;
      strengths.push('Cross-industry applicability provides pivot options');
    } else if (industryCount === 0) {
      risks.push('Narrow industry focus may limit pivot options');
      recommendations.push('Consider how your core offering could serve adjacent industries');
    }

    // Data asset potential
    if (text.includes('data') || text.includes('analytics') || text.includes('insights') || text.includes('intelligence')) {
      baseScore += 8;
      strengths.push('Data asset potential — collected data could power new product lines');
    }

    // Revenue model flexibility
    const revenueModels = ['subscription', 'marketplace', 'saas', 'api', 'licensing', 'freemium'];
    const revenueHits = revenueModels.filter(r => text.includes(r));
    if (revenueHits.length >= 2) {
      baseScore += 5;
      strengths.push('Revenue model flexibility provides multiple monetization paths');
    }

    // Hardware dependency (reduces pivot ability)
    if (text.includes('hardware') || text.includes('physical') || text.includes('manufacturing') || text.includes('device')) {
      baseScore -= 15;
      risks.push('Hardware dependency significantly limits pivot speed and cost');
      recommendations.push('Consider a software-first approach that can later integrate with hardware');
    }

    if (strengths.length === 0) {
      recommendations.push('Build your core offering with modularity in mind to enable future pivots');
    }

    const score = Math.max(10, Math.min(95, baseScore));

    return {
      dimension: this.dimension,
      score,
      confidence: 0.65,
      summary: score >= 60
        ? `Good pivot potential — core assets can be redirected to adjacent opportunities`
        : `Limited pivot flexibility — consider building more modular foundations`,
      strengths,
      risks,
      recommendations,
    };
  }
}
