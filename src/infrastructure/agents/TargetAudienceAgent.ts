import { BusinessIdea } from '../../domain/models/BusinessIdea';
import { DimensionScore } from '../../domain/models/AnalysisReport';
import { AnalysisAgent } from '../../domain/services/AnalysisService';

export class TargetAudienceAgent implements AnalysisAgent {
  readonly name = 'TargetAudienceAgent';
  readonly dimension = 'Target Audience';

  async analyze(idea: BusinessIdea): Promise<DimensionScore> {
    const text = `${idea.name} ${idea.description} ${idea.targetMarket}`.toLowerCase();

    let baseScore = 45;
    const strengths: string[] = [];
    const risks: string[] = [];
    const recommendations: string[] = [];

    // Audience specificity
    const audienceKeywords = ['small business', 'startup', 'enterprise', 'developer', 'freelancer',
      'student', 'professional', 'parent', 'senior', 'teen', 'creator', 'artist',
      'marketer', 'founder', 'ceo', 'manager', 'engineer', 'designer', 'doctor',
      'teacher', 'restaurant', 'retail'];
    const matchedAudiences = audienceKeywords.filter(k => text.includes(k));

    if (matchedAudiences.length > 0) {
      baseScore += 15;
      strengths.push(`Clear audience segments: ${matchedAudiences.join(', ')}`);
    } else {
      risks.push('No specific audience persona identified');
      recommendations.push('Define 2-3 specific buyer personas with demographics, pain points, and behaviors');
    }

    if (matchedAudiences.length > 3) {
      baseScore -= 5;
      risks.push('Too many audience segments may dilute focus');
      recommendations.push('Pick one beachhead segment to dominate before expanding');
    }

    // Market size signals
    if (idea.targetMarket !== 'General') {
      baseScore += 12;
      strengths.push(`Defined target market: ${idea.targetMarket}`);
    }

    // Pain point clarity
    const painSignals = ['struggle', 'frustrated', 'waste', 'costly', 'time-consuming',
      'difficult', 'complex', 'painful', 'challenge', 'problem', 'need', 'lack'];
    const pains = painSignals.filter(p => text.includes(p));
    if (pains.length > 0) {
      baseScore += 10;
      strengths.push('Clear pain point articulation increases audience resonance');
    } else {
      risks.push('Customer pain points not explicitly stated');
      recommendations.push('Interview 20+ potential users to identify and validate pain points');
    }

    // Accessibility signals
    if (text.includes('mobile') || text.includes('app') || text.includes('web') || text.includes('online')) {
      baseScore += 5;
      strengths.push('Digital-first approach enables broad audience reach');
    }

    // Willingness to pay signals
    if (text.includes('save') || text.includes('roi') || text.includes('revenue') || text.includes('profit') || text.includes('cost')) {
      baseScore += 8;
      strengths.push('Value proposition tied to financial outcomes — strong willingness-to-pay signal');
    }

    const score = Math.max(10, Math.min(95, baseScore));

    return {
      dimension: this.dimension,
      score,
      confidence: 0.70,
      summary: score >= 60
        ? `Well-defined target audience with clear pain points`
        : `Target audience definition needs more specificity`,
      strengths,
      risks,
      recommendations,
    };
  }
}
