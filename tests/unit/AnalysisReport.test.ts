import { AnalysisReport, ViabilityReport } from '../../src/domain/models/AnalysisReport';

describe('AnalysisReport', () => {
  it('should create with pending status', () => {
    const report = new AnalysisReport('idea-123');

    expect(report.id).toBeDefined();
    expect(report.ideaId).toBe('idea-123');
    expect(report.status).toBe('pending');
    expect(report.report).toBeNull();
    expect(report.completedAt).toBeNull();
  });

  it('should transition to analyzing', () => {
    const report = new AnalysisReport('idea-123');
    report.markAnalyzing();
    expect(report.status).toBe('analyzing');
  });

  it('should complete with viability report', () => {
    const report = new AnalysisReport('idea-123');
    const viability: ViabilityReport = {
      overallScore: 72,
      verdict: 'Promising',
      dimensions: [],
      pivotSuggestions: ['Try B2B'],
      nextSteps: ['Build MVP'],
      executiveSummary: 'Looks good',
    };

    report.complete(viability);

    expect(report.status).toBe('completed');
    expect(report.report).toBe(viability);
    expect(report.completedAt).toBeInstanceOf(Date);
  });

  it('should handle failure', () => {
    const report = new AnalysisReport('idea-123');
    report.fail('Agent timeout');

    expect(report.status).toBe('failed');
    expect(report.error).toBe('Agent timeout');
    expect(report.completedAt).toBeInstanceOf(Date);
  });
});
