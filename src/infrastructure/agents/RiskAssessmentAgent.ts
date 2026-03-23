import { BusinessIdea } from '../../domain/models/BusinessIdea';
import { DimensionScore } from '../../domain/models/AnalysisReport';
import { AnalysisAgent } from '../../domain/services/AnalysisService';

export class RiskAssessmentAgent implements AnalysisAgent {
  readonly name = 'RiskAssessmentAgent';
  readonly dimension = 'Risk Assessment';

  async analyze(idea: BusinessIdea): Promise<DimensionScore> {
    const text = `${idea.name} ${idea.description} ${idea.industry}`.toLowerCase();

    let baseScore = 60;
    const strengths: string[] = [];
    const risks: string[] = [];
    const recommendations: string[] = [];

    // Regulatory risk
    const regulatedIndustries = ['health', 'finance', 'insurance', 'legal', 'pharma', 'cannabis', 'crypto', 'gambling'];
    const regulatoryHits = regulatedIndustries.filter(r => text.includes(r));
    if (regulatoryHits.length > 0) {
      baseScore -= 15;
      risks.push(`Operates in regulated sector: ${regulatoryHits.join(', ')} — compliance costs may be significant`);
      recommendations.push('Engage legal counsel early for regulatory compliance assessment');
    } else {
      strengths.push('No major regulatory barriers identified');
    }

    // Technology risk
    const highTechRisk = ['blockchain', 'quantum', 'ar', 'vr', 'autonomous', 'deep learning'];
    const techHits = highTechRisk.filter(t => text.includes(t));
    if (techHits.length > 0) {
      baseScore -= 8;
      risks.push(`Technology risk: ${techHits.join(', ')} — execution complexity is high`);
      recommendations.push('Validate technical feasibility with a proof-of-concept before full commitment');
    }

    // Market timing risk
    const emergingKeywords = ['new', 'emerging', 'novel', 'innovative', 'disruptive', 'revolutionary'];
    const emergingHits = emergingKeywords.filter(e => text.includes(e));
    if (emergingHits.length > 2) {
      baseScore -= 5;
      risks.push('Market timing risk — emerging markets can be unpredictable');
    } else if (emergingHits.length > 0) {
      strengths.push('Innovation signals without excessive market timing risk');
    }

    // Team/execution risk indicators
    if (text.includes('solo') || text.includes('alone') || text.includes('one person')) {
      baseScore -= 10;
      risks.push('Solo founder risk — increases execution burden');
      recommendations.push('Consider finding a co-founder with complementary skills');
    }

    // Dependency risk
    const dependencies = ['api', 'third-party', 'partner', 'integration', 'platform'];
    const depHits = dependencies.filter(d => text.includes(d));
    if (depHits.length > 2) {
      baseScore -= 8;
      risks.push('High dependency on third-party platforms or APIs');
      recommendations.push('Build abstraction layers to reduce platform lock-in risk');
    }

    // Positive risk mitigation signals
    if (text.includes('mvp') || text.includes('lean') || text.includes('prototype') || text.includes('validate')) {
      baseScore += 12;
      strengths.push('Lean/validated approach reduces execution risk');
    }

    if (text.includes('team') || text.includes('co-founder') || text.includes('experience')) {
      baseScore += 8;
      strengths.push('Team-oriented approach mitigates single-point-of-failure risk');
    }

    if (risks.length === 0) {
      strengths.push('Low overall risk profile based on available information');
    }

    const score = Math.max(10, Math.min(95, baseScore));

    return {
      dimension: this.dimension,
      score,
      confidence: 0.66,
      summary: score >= 60
        ? `Manageable risk profile — no critical blockers identified`
        : `Elevated risk factors require careful mitigation planning`,
      strengths,
      risks,
      recommendations,
    };
  }
}
