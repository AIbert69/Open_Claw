import { Router, Request, Response } from 'express';
import { AnalyzeIdeaCommand, AnalyzeIdeaSchema } from '../../../application/commands/AnalyzeIdeaCommand';
import { AnalysisStore } from '../../memory/AnalysisStore';
import { ZodError } from 'zod';

export function createAnalysisRoutes(command: AnalyzeIdeaCommand, store: AnalysisStore): Router {
  const router = Router();

  router.post('/analyze', async (req: Request, res: Response) => {
    try {
      const result = await command.execute(req.body);
      res.status(201).json({
        success: true,
        data: {
          idea: result.idea.toJSON(),
          report: result.report.toJSON(),
        },
      });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: err.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
        });
        return;
      }
      res.status(500).json({
        success: false,
        error: err instanceof Error ? err.message : 'Internal server error',
      });
    }
  });

  router.get('/reports', (_req: Request, res: Response) => {
    const reports = store.getAllReports().map(r => r.toJSON());
    res.json({ success: true, data: reports });
  });

  router.get('/reports/:id', (req: Request, res: Response) => {
    const report = store.getReport(req.params.id);
    if (!report) {
      res.status(404).json({ success: false, error: 'Report not found' });
      return;
    }
    const idea = store.getIdea(report.ideaId);
    res.json({
      success: true,
      data: { report: report.toJSON(), idea: idea?.toJSON() || null },
    });
  });

  router.get('/ideas', (_req: Request, res: Response) => {
    const ideas = store.getAllIdeas().map(i => i.toJSON());
    res.json({ success: true, data: ideas });
  });

  router.get('/stats', (_req: Request, res: Response) => {
    res.json({ success: true, data: store.getStats() });
  });

  return router;
}
