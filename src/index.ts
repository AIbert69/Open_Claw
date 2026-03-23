import express from 'express';
import path from 'path';
import { AnalysisService } from './domain/services/AnalysisService';
import { AnalyzeIdeaCommand } from './application/commands/AnalyzeIdeaCommand';
import { AnalysisStore } from './infrastructure/memory/AnalysisStore';
import { MarketDemandAgent } from './infrastructure/agents/MarketDemandAgent';
import { CompetitionAgent } from './infrastructure/agents/CompetitionAgent';
import { RevenueModelAgent } from './infrastructure/agents/RevenueModelAgent';
import { TargetAudienceAgent } from './infrastructure/agents/TargetAudienceAgent';
import { RiskAssessmentAgent } from './infrastructure/agents/RiskAssessmentAgent';
import { PivotPotentialAgent } from './infrastructure/agents/PivotPotentialAgent';
import { createAnalysisRoutes } from './infrastructure/web/routes/analysisRoutes';
import { errorHandler } from './infrastructure/web/middleware/errorHandler';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Domain setup — 6 parallel analysis agents
const agents = [
  new MarketDemandAgent(),
  new CompetitionAgent(),
  new RevenueModelAgent(),
  new TargetAudienceAgent(),
  new RiskAssessmentAgent(),
  new PivotPotentialAgent(),
];

const analysisService = new AnalysisService(agents);
const store = new AnalysisStore();
const analyzeCommand = new AnalyzeIdeaCommand(analysisService, store);

// Express app
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'src', 'infrastructure', 'web', 'public')));

// API routes
app.use('/api', createAnalysisRoutes(analyzeCommand, store));

// Serve frontend
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'infrastructure', 'web', 'public', 'index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║         🔍 NicheScout v1.0.0                ║
║   AI-Powered Niche Market Validator          ║
║                                              ║
║   Server: http://localhost:${PORT}              ║
║   API:    http://localhost:${PORT}/api           ║
║                                              ║
║   6 Analysis Agents Active:                  ║
║   • Market Demand    • Competition           ║
║   • Revenue Model    • Target Audience       ║
║   • Risk Assessment  • Pivot Potential       ║
╚══════════════════════════════════════════════╝
  `);
});

export { app };
