import { BusinessIdea } from '../../src/domain/models/BusinessIdea';
import { MarketDemandAgent } from '../../src/infrastructure/agents/MarketDemandAgent';
import { CompetitionAgent } from '../../src/infrastructure/agents/CompetitionAgent';
import { RevenueModelAgent } from '../../src/infrastructure/agents/RevenueModelAgent';
import { TargetAudienceAgent } from '../../src/infrastructure/agents/TargetAudienceAgent';
import { RiskAssessmentAgent } from '../../src/infrastructure/agents/RiskAssessmentAgent';
import { PivotPotentialAgent } from '../../src/infrastructure/agents/PivotPotentialAgent';

const strongIdea = new BusinessIdea({
  name: 'AI CodeReview',
  description: 'An AI-powered subscription SaaS platform that solves the problem of slow code reviews for developer teams. Uses machine learning to provide unique, proprietary automated code analysis.',
  industry: 'AI / Machine Learning',
  targetMarket: 'Enterprise developer teams',
  budget: '$50,000',
});

const weakIdea = new BusinessIdea({
  name: 'MyApp',
  description: 'A social media todo app',
  industry: 'Other',
});

describe('Analysis Agents', () => {
  describe('MarketDemandAgent', () => {
    const agent = new MarketDemandAgent();

    it('should score high for AI/ML ideas with clear problem', async () => {
      const result = await agent.analyze(strongIdea);
      expect(result.score).toBeGreaterThanOrEqual(60);
      expect(result.strengths.length).toBeGreaterThan(0);
      expect(result.dimension).toBe('Market Demand');
    });

    it('should score lower for generic ideas', async () => {
      const result = await agent.analyze(weakIdea);
      expect(result.score).toBeLessThan(60);
      expect(result.risks.length).toBeGreaterThan(0);
    });
  });

  describe('CompetitionAgent', () => {
    const agent = new CompetitionAgent();

    it('should analyze competitive landscape', async () => {
      const result = await agent.analyze(strongIdea);
      expect(result.dimension).toBe('Competition');
      expect(result.score).toBeGreaterThan(0);
      expect(result.score).toBeLessThanOrEqual(95);
    });
  });

  describe('RevenueModelAgent', () => {
    const agent = new RevenueModelAgent();

    it('should detect subscription model', async () => {
      const result = await agent.analyze(strongIdea);
      expect(result.score).toBeGreaterThanOrEqual(60);
      expect(result.strengths.some(s => s.toLowerCase().includes('subscription') || s.toLowerCase().includes('saas'))).toBe(true);
    });

    it('should flag missing revenue model', async () => {
      const result = await agent.analyze(weakIdea);
      expect(result.risks.length).toBeGreaterThan(0);
    });
  });

  describe('TargetAudienceAgent', () => {
    const agent = new TargetAudienceAgent();

    it('should reward defined audience', async () => {
      const result = await agent.analyze(strongIdea);
      expect(result.score).toBeGreaterThan(50);
    });
  });

  describe('RiskAssessmentAgent', () => {
    const agent = new RiskAssessmentAgent();

    it('should identify risks', async () => {
      const result = await agent.analyze(strongIdea);
      expect(result.dimension).toBe('Risk Assessment');
      expect(result.score).toBeGreaterThan(0);
    });
  });

  describe('PivotPotentialAgent', () => {
    const agent = new PivotPotentialAgent();

    it('should assess pivot potential for AI platform', async () => {
      const result = await agent.analyze(strongIdea);
      expect(result.dimension).toBe('Pivot Potential');
      expect(result.score).toBeGreaterThan(50);
      expect(result.strengths.length).toBeGreaterThan(0);
    });
  });
});
