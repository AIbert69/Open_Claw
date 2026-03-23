import { AnalysisService, AnalysisAgent } from '../../src/domain/services/AnalysisService';
import { BusinessIdea } from '../../src/domain/models/BusinessIdea';
import { DimensionScore } from '../../src/domain/models/AnalysisReport';

function createMockAgent(dimension: string, score: number): AnalysisAgent {
  return {
    name: `Mock${dimension}Agent`,
    dimension,
    analyze: async (): Promise<DimensionScore> => ({
      dimension,
      score,
      confidence: 0.8,
      summary: `${dimension} analysis complete`,
      strengths: ['Strong point'],
      risks: ['Risk point'],
      recommendations: ['Do this'],
    }),
  };
}

describe('AnalysisService', () => {
  const idea = new BusinessIdea({
    name: 'TestBiz',
    description: 'A test SaaS subscription platform for small business owners to solve their problem',
    industry: 'SaaS',
    targetMarket: 'Small businesses',
  });

  it('should run all agents in parallel and produce a report', async () => {
    const agents = [
      createMockAgent('Market Demand', 80),
      createMockAgent('Competition', 70),
      createMockAgent('Revenue Model', 65),
      createMockAgent('Target Audience', 75),
      createMockAgent('Risk Assessment', 60),
      createMockAgent('Pivot Potential', 55),
    ];

    const service = new AnalysisService(agents);
    const report = await service.analyze(idea);

    expect(report.status).toBe('completed');
    expect(report.report).toBeDefined();
    expect(report.report!.dimensions).toHaveLength(6);
    expect(report.report!.overallScore).toBeGreaterThan(0);
    expect(report.report!.verdict).toBeDefined();
    expect(report.report!.executiveSummary).toContain('TestBiz');
    expect(report.report!.pivotSuggestions.length).toBeGreaterThan(0);
    expect(report.report!.nextSteps.length).toBeGreaterThan(0);
  });

  it('should return Strong verdict for high scores', async () => {
    const agents = [
      createMockAgent('Market Demand', 90),
      createMockAgent('Competition', 85),
      createMockAgent('Revenue Model', 80),
    ];

    const service = new AnalysisService(agents);
    const report = await service.analyze(idea);

    expect(report.report!.verdict).toBe('Strong');
  });

  it('should return Weak verdict for low scores', async () => {
    const agents = [
      createMockAgent('Market Demand', 20),
      createMockAgent('Competition', 25),
      createMockAgent('Revenue Model', 15),
    ];

    const service = new AnalysisService(agents);
    const report = await service.analyze(idea);

    expect(report.report!.verdict).toBe('Weak');
  });

  it('should handle agent failures gracefully', async () => {
    const failingAgent: AnalysisAgent = {
      name: 'FailAgent',
      dimension: 'Test',
      analyze: async () => { throw new Error('Agent crashed'); },
    };

    const service = new AnalysisService([failingAgent]);
    const report = await service.analyze(idea);

    expect(report.status).toBe('failed');
    expect(report.error).toBe('Agent crashed');
  });
});
