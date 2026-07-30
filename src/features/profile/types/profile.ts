export interface UserProfile {
  id: number;

  firstName: string;
  lastName: string;
  email: string;

  roles: string[];

  headline: string;
  bio: string;

  yearsOfExperience: number;

  githubUrl: string;
  linkedInUrl: string;

  skills: string[];
}