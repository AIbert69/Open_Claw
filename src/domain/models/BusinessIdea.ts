import { v4 as uuidv4 } from 'uuid';

export interface BusinessIdeaProps {
  name: string;
  description: string;
  targetMarket?: string;
  industry?: string;
  budget?: string;
}

export class BusinessIdea {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly targetMarket: string;
  readonly industry: string;
  readonly budget: string;
  readonly createdAt: Date;

  constructor(props: BusinessIdeaProps) {
    this.id = uuidv4();
    this.name = props.name;
    this.description = props.description;
    this.targetMarket = props.targetMarket || 'General';
    this.industry = props.industry || 'Unspecified';
    this.budget = props.budget || 'Not specified';
    this.createdAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      targetMarket: this.targetMarket,
      industry: this.industry,
      budget: this.budget,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
