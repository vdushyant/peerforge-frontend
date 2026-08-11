export interface Profile {
  id: number;

  firstName: string;
  lastName: string;
  email: string;

  roles: string[];

  headline: string | null;
  bio: string | null;

  yearsOfExperience: number | null;

  githubUrl: string | null;
  linkedInUrl: string | null;

  skills: string[];
}

export interface UpdateProfileRequest {
  headline: string | null;
  bio: string | null;
  yearsOfExperience: number | null;
  githubUrl: string | null;
  linkedInUrl: string | null;
  skills: string[];
}