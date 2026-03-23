import { BusinessIdea } from '../../src/domain/models/BusinessIdea';

describe('BusinessIdea', () => {
  it('should create a business idea with required fields', () => {
    const idea = new BusinessIdea({
      name: 'TestApp',
      description: 'A test application for testing',
    });

    expect(idea.id).toBeDefined();
    expect(idea.name).toBe('TestApp');
    expect(idea.description).toBe('A test application for testing');
    expect(idea.targetMarket).toBe('General');
    expect(idea.industry).toBe('Unspecified');
    expect(idea.budget).toBe('Not specified');
    expect(idea.createdAt).toBeInstanceOf(Date);
  });

  it('should create with optional fields', () => {
    const idea = new BusinessIdea({
      name: 'FinApp',
      description: 'Fintech solution',
      targetMarket: 'Small businesses',
      industry: 'Fintech',
      budget: '$10,000',
    });

    expect(idea.targetMarket).toBe('Small businesses');
    expect(idea.industry).toBe('Fintech');
    expect(idea.budget).toBe('$10,000');
  });

  it('should serialize to JSON', () => {
    const idea = new BusinessIdea({ name: 'Test', description: 'Test desc' });
    const json = idea.toJSON();

    expect(json.id).toBe(idea.id);
    expect(json.name).toBe('Test');
    expect(typeof json.createdAt).toBe('string');
  });
});
