import express from 'express';
import { AnalysisService } from '../../src/domain/services/AnalysisService';
import { AnalyzeIdeaCommand } from '../../src/application/commands/AnalyzeIdeaCommand';
import { AnalysisStore } from '../../src/infrastructure/memory/AnalysisStore';
import { MarketDemandAgent } from '../../src/infrastructure/agents/MarketDemandAgent';
import { CompetitionAgent } from '../../src/infrastructure/agents/CompetitionAgent';
import { RevenueModelAgent } from '../../src/infrastructure/agents/RevenueModelAgent';
import { TargetAudienceAgent } from '../../src/infrastructure/agents/TargetAudienceAgent';
import { RiskAssessmentAgent } from '../../src/infrastructure/agents/RiskAssessmentAgent';
import { PivotPotentialAgent } from '../../src/infrastructure/agents/PivotPotentialAgent';
import { createAnalysisRoutes } from '../../src/infrastructure/web/routes/analysisRoutes';

function createTestApp() {
  const agents = [
    new MarketDemandAgent(),
    new CompetitionAgent(),
    new RevenueModelAgent(),
    new TargetAudienceAgent(),
    new RiskAssessmentAgent(),
    new PivotPotentialAgent(),
  ];
  const service = new AnalysisService(agents);
  const store = new AnalysisStore();
  const command = new AnalyzeIdeaCommand(service, store);

  const app = express();
  app.use(express.json());
  app.use('/api', createAnalysisRoutes(command, store));
  return { app, store };
}

// Use node's built-in http for testing without supertest
import http from 'http';

function request(app: express.Application, method: string, path: string, body?: object): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const addr = server.address();
      if (!addr || typeof addr === 'string') { server.close(); reject(new Error('Bad address')); return; }

      const options: http.RequestOptions = {
        hostname: '127.0.0.1',
        port: addr.port,
        path,
        method,
        headers: { 'Content-Type': 'application/json' },
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          server.close();
          try { resolve({ status: res.statusCode || 500, body: JSON.parse(data) }); }
          catch { resolve({ status: res.statusCode || 500, body: data }); }
        });
      });

      req.on('error', (err) => { server.close(); reject(err); });
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  });
}

describe('API Integration', () => {
  it('POST /api/analyze should return a viability report', async () => {
    const { app } = createTestApp();
    const res = await request(app, 'POST', '/api/analyze', {
      name: 'TestSaaS',
      description: 'A subscription SaaS platform that solves developer productivity problems',
      industry: 'SaaS',
      targetMarket: 'Enterprise developers',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.report.report.overallScore).toBeGreaterThan(0);
    expect(res.body.data.report.report.dimensions).toHaveLength(6);
    expect(res.body.data.report.report.verdict).toBeDefined();
  });

  it('POST /api/analyze should validate input', async () => {
    const { app } = createTestApp();
    const res = await request(app, 'POST', '/api/analyze', {
      name: '',
      description: 'short',
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/stats should return statistics', async () => {
    const { app } = createTestApp();
    const res = await request(app, 'GET', '/api/stats');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalIdeas).toBe(0);
  });

  it('GET /api/reports should return empty initially', async () => {
    const { app } = createTestApp();
    const res = await request(app, 'GET', '/api/reports');

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it('GET /api/reports/:id should return 404 for missing report', async () => {
    const { app } = createTestApp();
    const res = await request(app, 'GET', '/api/reports/nonexistent');

    expect(res.status).toBe(404);
  });
});
