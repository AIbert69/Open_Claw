import { BusinessIdea } from '../../domain/models/BusinessIdea';
import { AnalysisReport } from '../../domain/models/AnalysisReport';

export class AnalysisStore {
  private ideas: Map<string, BusinessIdea> = new Map();
  private reports: Map<string, AnalysisReport> = new Map();
  private ideaToReport: Map<string, string> = new Map();

  storeIdea(idea: BusinessIdea): void {
    this.ideas.set(idea.id, idea);
  }

  storeReport(report: AnalysisReport): void {
    this.reports.set(report.id, report);
    this.ideaToReport.set(report.ideaId, report.id);
  }

  getIdea(id: string): BusinessIdea | undefined {
    return this.ideas.get(id);
  }

  getReport(id: string): AnalysisReport | undefined {
    return this.reports.get(id);
  }

  getReportByIdeaId(ideaId: string): AnalysisReport | undefined {
    const reportId = this.ideaToReport.get(ideaId);
    return reportId ? this.reports.get(reportId) : undefined;
  }

  getAllIdeas(): BusinessIdea[] {
    return Array.from(this.ideas.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getAllReports(): AnalysisReport[] {
    return Array.from(this.reports.values())
      .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  }

  getStats() {
    const reports = this.getAllReports();
    const completed = reports.filter(r => r.status === 'completed');
    const scores = completed
      .map(r => r.report?.overallScore)
      .filter((s): s is number => s !== undefined);

    return {
      totalIdeas: this.ideas.size,
      totalReports: reports.length,
      completedReports: completed.length,
      averageScore: scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0,
      verdictDistribution: {
        strong: completed.filter(r => r.report?.verdict === 'Strong').length,
        promising: completed.filter(r => r.report?.verdict === 'Promising').length,
        risky: completed.filter(r => r.report?.verdict === 'Risky').length,
        weak: completed.filter(r => r.report?.verdict === 'Weak').length,
      },
    };
  }
}
