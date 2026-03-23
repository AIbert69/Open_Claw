import { BusinessIdea } from '../models/BusinessIdea';
import { AnalysisReport, DimensionScore, ViabilityReport } from '../models/AnalysisReport';

export interface AnalysisAgent {
  readonly name: string;
  readonly dimension: string;
  analyze(idea: BusinessIdea): Promise<DimensionScore>;
}

export class AnalysisService {
  private agents: AnalysisAgent[];

  constructor(agents: AnalysisAgent[]) {
    this.agents = agents;
  }

  async analyze(idea: BusinessIdea): Promise<AnalysisReport> {
    const report = new AnalysisReport(idea.id);
    report.markAnalyzing();

    try {
      const dimensions = await Promise.all(
        this.agents.map(agent => agent.analyze(idea))
      );

      const overallScore = this.calculateOverallScore(dimensions);
      const verdict = this.determineVerdict(overallScore);

      const viability: ViabilityReport = {
        overallScore,
        verdict,
        dimensions,
        pivotSuggestions: this.generatePivotSuggestions(idea, dimensions),
        nextSteps: this.generateNextSteps(verdict, dimensions),
        executiveSummary: this.generateExecutiveSummary(idea, overallScore, verdict, dimensions),
      };

      report.complete(viability);
    } catch (err) {
      report.fail(err instanceof Error ? err.message : 'Unknown analysis error');
    }

    return report;
  }

  private calculateOverallScore(dimensions: DimensionScore[]): number {
    if (dimensions.length === 0) return 0;
    const weights: Record<string, number> = {
      'Market Demand': 0.25,
      'Competition': 0.20,
      'Revenue Model': 0.20,
      'Target Audience': 0.15,
      'Risk Assessment': 0.10,
      'Pivot Potential': 0.10,
    };
    let totalWeight = 0;
    let weightedSum = 0;
    for (const dim of dimensions) {
      const weight = weights[dim.dimension] || (1 / dimensions.length);
      weightedSum += dim.score * weight;
      totalWeight += weight;
    }
    return Math.round((weightedSum / totalWeight) * 10) / 10;
  }

  private determineVerdict(score: number): ViabilityReport['verdict'] {
    if (score >= 75) return 'Strong';
    if (score >= 55) return 'Promising';
    if (score >= 35) return 'Risky';
    return 'Weak';
  }

  private generatePivotSuggestions(idea: BusinessIdea, dimensions: DimensionScore[]): string[] {
    const suggestions: string[] = [];
    const weakDimensions = dimensions.filter(d => d.score < 50);

    if (weakDimensions.some(d => d.dimension === 'Market Demand')) {
      suggestions.push(`Consider pivoting to an adjacent market within ${idea.industry} with higher demand signals`);
      suggestions.push('Narrow your target market to a specific underserved niche');
    }
    if (weakDimensions.some(d => d.dimension === 'Revenue Model')) {
      suggestions.push('Explore a freemium model to reduce customer acquisition friction');
      suggestions.push('Consider a marketplace or platform model for recurring revenue');
    }
    if (weakDimensions.some(d => d.dimension === 'Competition')) {
      suggestions.push('Differentiate with a unique technology moat or proprietary data advantage');
      suggestions.push('Target an underserved geographic region or demographic');
    }
    if (suggestions.length === 0) {
      suggestions.push('Your concept is well-positioned — focus on execution speed');
      suggestions.push('Consider expanding to adjacent verticals after establishing product-market fit');
    }
    return suggestions;
  }

  private generateNextSteps(verdict: string, dimensions: DimensionScore[]): string[] {
    const steps: string[] = [];
    if (verdict === 'Strong' || verdict === 'Promising') {
      steps.push('Build an MVP within 4-6 weeks focusing on core value proposition');
      steps.push('Conduct 20+ customer discovery interviews to validate assumptions');
      steps.push('Set up landing page and waitlist to gauge real demand');
    } else {
      steps.push('Conduct deeper market research to validate demand signals');
      steps.push('Interview 30+ potential customers to understand pain points');
      steps.push('Explore the pivot suggestions above before investing in development');
    }
    const lowestDim = [...dimensions].sort((a, b) => a.score - b.score)[0];
    if (lowestDim) {
      steps.push(`Priority: address weaknesses in "${lowestDim.dimension}" (scored ${lowestDim.score}/100)`);
    }
    return steps;
  }

  private generateExecutiveSummary(
    idea: BusinessIdea,
    score: number,
    verdict: string,
    dimensions: DimensionScore[]
  ): string {
    const strongest = [...dimensions].sort((a, b) => b.score - a.score)[0];
    const weakest = [...dimensions].sort((a, b) => a.score - b.score)[0];
    return `"${idea.name}" scores ${score}/100 (${verdict}). ` +
      `Strongest area: ${strongest?.dimension} (${strongest?.score}/100). ` +
      `Key risk: ${weakest?.dimension} (${weakest?.score}/100). ` +
      `${verdict === 'Strong' || verdict === 'Promising'
        ? 'This idea shows market potential — recommended to proceed with MVP development.'
        : 'This idea needs further validation before significant investment.'}`;
  }
}
