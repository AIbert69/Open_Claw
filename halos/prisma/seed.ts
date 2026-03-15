import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "dev.db");
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS Agent (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    description TEXT,
    avatar TEXT NOT NULL DEFAULT '',
    color TEXT NOT NULL DEFAULT '#6366f1',
    isOnline INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS Task (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    priority TEXT NOT NULL DEFAULT 'medium',
    agentId TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS Goal (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    progress INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS Message (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    role TEXT NOT NULL,
    agentId TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (agentId) REFERENCES Agent(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS KnowledgeEntry (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    source TEXT,
    tags TEXT NOT NULL DEFAULT '',
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS Activity (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    agentId TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (agentId) REFERENCES Agent(id) ON DELETE SET NULL
  );
`);

// Clear existing data
db.exec(`
  DELETE FROM Activity;
  DELETE FROM Message;
  DELETE FROM KnowledgeEntry;
  DELETE FROM Goal;
  DELETE FROM Task;
  DELETE FROM Agent;
`);

function cuid() {
  return "c" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const now = new Date().toISOString();

// Insert agents
const insertAgent = db.prepare(
  `INSERT INTO Agent (id, name, role, description, avatar, color, isOnline, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
);

const craigId = cuid();
const trainerId = cuid();
const journalId = cuid();
const networkerId = cuid();

insertAgent.run(craigId, "craig", "boss", "Head of all agents. Manages priorities and delegates tasks.", "C", "#6366f1", 1, now, now);
insertAgent.run(trainerId, "trainer", "fitness", "Creates fitness plans and tracks workout progress.", "T", "#10b981", 1, now, now);
insertAgent.run(journalId, "journal", "life coach", "Tracks notes, journals, and provides life coaching.", "J", "#f59e0b", 1, now, now);
insertAgent.run(networkerId, "networker", "contacts", "Tracks contacts and helps make new connections.", "N", "#ec4899", 0, now, now);

// Insert tasks
const insertTask = db.prepare(
  `INSERT INTO Task (id, title, completed, priority, createdAt, updatedAt) VALUES (?, ?, 0, 'medium', ?, ?)`
);

const tasks = [
  "customer support",
  "hire lab tester for oasis",
  "get ipad mini for reading",
  "create new workout / fitness routine for spring",
  "ai taxes",
  "hire in-house social media manager for brand",
];

for (const title of tasks) {
  insertTask.run(cuid(), title, now, now);
}

// Insert goals
const insertGoal = db.prepare(
  `INSERT INTO Goal (id, title, completed, progress, createdAt, updatedAt) VALUES (?, ?, 0, ?, ?, ?)`
);

insertGoal.run(cuid(), "Launch MVP by end of month", 45, now, now);
insertGoal.run(cuid(), "Build personal brand", 20, now, now);
insertGoal.run(cuid(), "Hit 10k followers on socials", 60, now, now);

// Insert knowledge entries
const insertKnowledge = db.prepare(
  `INSERT INTO KnowledgeEntry (id, title, content, source, tags, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`
);

insertKnowledge.run(cuid(), "Morning Routine", "Wake up at 6am, cold shower, 30 min workout, journaling, then deep work block until noon.", "journal", "routine,productivity,health", now, now);
insertKnowledge.run(cuid(), "Key Contacts - Investors", "Sarah Chen (angel investor, met at TechCrunch), Mike Torres (VC at Sequoia, intro via LinkedIn).", "networker", "contacts,investors,networking", now, now);

// Insert activity
const insertActivity = db.prepare(
  `INSERT INTO Activity (id, type, description, agentId, createdAt) VALUES (?, ?, ?, ?, ?)`
);

insertActivity.run(cuid(), "agent_created", "Agent craig was created as the boss", craigId, now);
insertActivity.run(cuid(), "agent_created", "Agent trainer was created for fitness", trainerId, now);
insertActivity.run(cuid(), "task_created", "New task: customer support", null, now);
insertActivity.run(cuid(), "knowledge_added", "Morning Routine added to knowledge base", journalId, now);

db.close();
console.log("Seed data created successfully!");
