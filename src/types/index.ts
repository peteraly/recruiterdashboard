export type CandidateStatus = 'New' | 'In Review' | 'Shortlisted' | 'Rejected' | 'Hired';

export interface JobRequirement {
  id: string;
  text: string;
  type: 'must-have' | 'nice-to-have' | 'education';
}

export interface JobDescription {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  jobId: string;
  postedDate: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    includesBonus?: boolean;
    includesEquity?: boolean;
  };
  summary: string;
  teamDescription: string;
  impact: string[];
  requirements: JobRequirement[];
  responsibilities: string[];
  teamSize: number;
  videoUrl?: string;
  status: 'Active' | 'Inactive' | 'Draft';
  candidates?: Candidate[];
  qualifications: {
    basic: string[];
    preferred: string[];
    education: string[];
  };
  additionalInfo: {
    workHours: string;
    travelRequirements: string;
    physicalRequirements: string;
    eeoStatement: string;
  };
  culture: {
    values: string[];
    teamDescription: string;
  };
  benefits: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  status: CandidateStatus;
  phase1Score: number;
  phase2Score: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewPhase1Data {
  education: boolean;
  experience: boolean;
  technical: boolean;
  careerStability: boolean;
}

export interface ReviewCriteria {
  weight: number;
  rating: number;
  notes: string;
}

export interface ReviewPhase2Data {
  experience: {
    relevantRole: ReviewCriteria;
    fastPaced: ReviewCriteria;
    matrixOrg: ReviewCriteria;
  };
  skills: {
    programManagement: ReviewCriteria;
    collaboration: ReviewCriteria;
    problemSolving: ReviewCriteria;
    communication: ReviewCriteria;
  };
  knowledge: {
    agile: ReviewCriteria;
    productDev: ReviewCriteria;
  };
  workStyle: {
    selfMotivated: ReviewCriteria;
    detailOriented: ReviewCriteria;
    adaptable: ReviewCriteria;
  };
}

export interface ReviewData {
  phase1: ReviewPhase1Data;
  phase2: ReviewPhase2Data;
  redFlags: string[];
  greenFlags: string[];
  interviewNotes: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  endorsements: number;
}

export interface Experience {
  company: string;
  title: string;
  duration: string;
  description: string[];
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  link?: string;
  technologies: string[];
}

export interface Assessment {
  type: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface CandidateProfileData {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: {
    school: string;
    degree: string;
    field: string;
    graduationYear: number;
  }[];
  projects: Project[];
  assessments: Assessment[];
  links: {
    linkedin?: string;
    github?: string;
    website?: string;
    portfolio?: string;
  };
  videoIntro?: string;
  status: 'new' | 'in_review' | 'shortlisted' | 'rejected';
  matchScore: number;
  appliedDate: string;
}

export type ApplicationStatus = 'new' | 'in_review' | 'shortlisted' | 'rejected';

export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'multiple_choice' | 'coding' | 'text' | 'video';
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface AssessmentResult {
  candidateId: string;
  assessmentId: string;
  score: number;
  maxScore: number;
  completedAt: string;
  answers: {
    questionId: string;
    answer: string;
    isCorrect: boolean;
    points: number;
  }[];
}

export interface Interview {
  id: string;
  candidateId: string;
  interviewerId: string;
  scheduledFor: string;
  duration: number; // in minutes
  type: 'technical' | 'behavioral' | 'cultural_fit' | 'final';
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback?: {
    strengths: string[];
    areas_for_improvement: string[];
    overall_rating: number; // 1-5
    notes: string;
    recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no' | 'strong_no';
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department: string;
  canInterview: boolean;
  expertise: string[];
}

export interface Feedback {
  id: string;
  candidateId: string;
  providerId: string;
  type: 'interview' | 'assessment' | 'general';
  rating: number;
  strengths: string[];
  weaknesses: string[];
  notes: string;
  recommendation: 'hire' | 'consider' | 'pass';
  createdAt: string;
} 