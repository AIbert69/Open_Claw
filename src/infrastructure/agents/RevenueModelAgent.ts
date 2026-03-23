import { BusinessIdea } from '../../domain/models/BusinessIdea';
import { DimensionScore } from '../../domain/models/AnalysisReport';
import { AnalysisAgent } from '../../domain/services/AnalysisService';

const REVENUE_MODELS: Record<string, { viability: number; label: string }> = {
  'subscription': { viability: 85, label: 'SaaS/Subscription' },
  'saas': { viability: 85, label: 'SaaS/Subscription' },
  'monthly': { viability: 80, label: 'Recurring Revenue' },
  'recurring': { viability: 80, label: 'Recurring Revenue' },
  'freemium': { viability: 70, label: 'Freemium' },
  'marketplace': { viability: 65, label: 'Marketplace Commission' },
  'commission': { viability: 65, label: 'Marketplace Commission' },
  'advertising': { viability: 40, label: 'Ad-supported' },
  'one-time': { viability: 45, label: 'One-time Purchase' },
  'enterprise': { viability: 80, label: 'Enterprise Sales' },
  'api': { viability: 75, label: 'API/Usage-based' },
  'usage': { viability: 75, label: 'Usage-based Pricing' },
  'licensing': { viability: 70, label: 'Licensing' },
};

export class RevenueModelAgent implements AnalysisAgent {
  readonly name = 'RevenueModelAgent';
  readonly dimension = 'Revenue Model';

  async analyze(idea: BusinessIdea): Promise<DimensionScore> {
    const text = `${idea.name} ${idea.description} ${idea.budget}`.toLowerCase();

    let baseScore = 40;
    const strengths: string[] = [];
    const risks: string[] = [];
    const recommendations: string[] = [];
    const detectedModels: string[] = [];

    for (const [keyword, { viability, label }] of Object.entries(REVENUE_MODELS)) {
      if (text.includes(keyword) && !detectedModels.includes(label)) {
        detectedModels.push(label);
        baseScore = Math.max(baseScore, viability);
        strengths.push(`${label} model detected — ${viability >= 70 ? 'strong' : 'moderate'} revenue potential`);
      }
    }

    if (detectedModels.length === 0) {
      risks.push('No clear revenue model identified in description');
      recommendations.push('Define a specific monetization strategy (subscription, usage-based, or marketplace)');
      recommendations.push('Consider SaaS model for predictable recurring revenue');
    }

    if (detectedModels.length >= 2) {
      baseScore += 10;
      strengths.push('Multiple revenue streams increase resilience');
    }

    const pricingSignals = ['premium', 'affordable', 'free trial', 'pricing', 'tier', 'plan'];
    if (pricingSignals.some(s => text.includes(s))) {
      baseScore += 8;
      strengths.push('Pricing strategy awareness detected');
    }

    if (text.includes('b2b') || text.includes('enterprise') || text.includes('business')) {
      baseScore += 10;
      strengths.push('B2B focus — higher average contract values and lower churn');
    } else if (text.includes('b2c') || text.includes('consumer')) {
      risks.push('B2C model requires high volume — customer acquisition costs can be significant');
      recommendations.push('Plan for customer acquisition costs of $10-50+ per user');
    }

    if (idea.budget !== 'Not specified') {
      baseScore += 5;
      strengths.push('Budget awareness signals financial planning');
    }

    const score = Math.max(10, Math.min(95, baseScore));

    return {
      dimension: this.dimension,
      score,
      confidence: 0.74,
      summary: score >= 60
        ? `Viable revenue model identified: ${detectedModels.join(', ') || 'requires definition'}`
        : `Revenue model needs clearer definition and validation`,
      strengths,
      risks,
      recommendations,
    };
  }
}
