export interface TeamMember {
  name: string;
  role: string;
  email: string;
  linkedIn?: string;
}

export interface Startup {
  _id?: string;

  startupName: string;
  industry: string;
  description?: string;

  startupLogo?: string;
  website?: string;

  // Funding
  fundingGoal?: number;
  raisedSoFar?: number;
  seeking?: string;
  equityAvailable?: string;
  previousFunding?: string;

  // Dates
  founded?: number;

  // Business details
  problem?: string;
  solution?: string;
  traction?: string;
  revenueStreams?: string;
  investorROI?: string;

  // Financials
  annualRevenue?: number;
  projectedRevenue?: string;

  // Market
  targetMarket?: string;
  tam?: string;
  demand?: string;
  scalability?: string;

  // Competition
  competitors?: string;
  advantage?: string;

  // Contact
  email?: string;
  mobile?: string;
  address?: string;
  location?: string;

  // Team
  team: TeamMember[];
}
