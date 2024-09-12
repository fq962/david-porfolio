export interface CardInterface {
  title?: string;
  description?: string;
  yearExperience?: string;
  pageURL?: string;
  imageURL?: string;
  skills?: SkillsInterface[];
}

export interface SkillsInterface {
  skill: string;
  skillIcon?: string | null;
}
