import { v4 as uuidv4 } from 'uuid';

export type AnalysisStatus = 'pending' | 'analyzing' | 'completed' | 'failed';

export interface DimensionScore {
  dimension: string;
  score: number;
  confidence: number;
  summary: string;
  strengths: string[];
  risks: string[];
  recommendations: string[];
}

export interface ViabilityReport {
  overallScore: number;
  verdict: 'Strong' | 'Promising' | 'Risky' | 'Weak';
  dimensions: DimensionScore[];
  pivotSuggestions: string[];
  nextSteps: string[];
  executiveSummary: string;
}

export class AnalysisReport {
  readonly id: string;
  readonly ideaId: string;
  status: AnalysisStatus;
  report: ViabilityReport | null;
  readonly startedAt: Date;
  completedAt: Date | null;
  error: string | null;

  constructor(ideaId: string) {
    this.id = uuidv4();
    this.ideaId = ideaId;
    this.status = 'pending';
    this.report = null;
    this.startedAt = new Date();
    this.completedAt = null;
    this.error = null;
  }

  markAnalyzing(): void {
    this.status = 'analyzing';
  }

  complete(report: ViabilityReport): void {
    this.status = 'completed';
    this.report = report;
    this.completedAt = new Date();
  }

  fail(error: string): void {
    this.status = 'failed';
    this.error = error;
    this.completedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      ideaId: this.ideaId,
      status: this.status,
      report: this.report,
      startedAt: this.startedAt.toISOString(),
      completedAt: this.completedAt?.toISOString() || null,
      error: this.error,
    };
  }
}
