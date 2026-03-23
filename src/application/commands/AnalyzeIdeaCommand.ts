import { z } from 'zod';
import { BusinessIdea, BusinessIdeaProps } from '../../domain/models/BusinessIdea';
import { AnalysisReport } from '../../domain/models/AnalysisReport';
import { AnalysisService } from '../../domain/services/AnalysisService';
import { AnalysisStore } from '../../infrastructure/memory/AnalysisStore';

export const AnalyzeIdeaSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().min(10).max(5000),
  targetMarket: z.string().max(200).optional(),
  industry: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
});

export type AnalyzeIdeaInput = z.infer<typeof AnalyzeIdeaSchema>;

export class AnalyzeIdeaCommand {
  constructor(
    private analysisService: AnalysisService,
    private store: AnalysisStore,
  ) {}

  async execute(input: AnalyzeIdeaInput): Promise<{ idea: BusinessIdea; report: AnalysisReport }> {
    const validated = AnalyzeIdeaSchema.parse(input);

    const idea = new BusinessIdea(validated as BusinessIdeaProps);
    this.store.storeIdea(idea);

    const report = await this.analysisService.analyze(idea);
    this.store.storeReport(report);

    return { idea, report };
  }
}
