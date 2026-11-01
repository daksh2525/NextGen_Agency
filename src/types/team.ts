export interface TeamMember {
  id: string;
  name: string; // TODO: Fill in real name — see docs/memory.md
  designation: string; // TODO: Fill in real designation
  bio: string; // TODO: Fill in real bio
  photo: string; // Path relative to /public
  linkedIn?: string;
  twitter?: string;
  github?: string;
}
