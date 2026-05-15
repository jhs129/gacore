export interface MembershipFormData {
  // Contact Information
  firstName: string;
  mi: string;
  lastName: string;
  credentials: string;
  credentialsOther: string;
  email: string;
  workPhone: string;
  workFax: string;
  title: string;
  organization: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  county: string;

  // Demographic Information
  sex: string;
  age: string;
  education: string;
  certifications: string;
  training: string;

  // Navigator/Program Details
  yearsAsNavigator: string;
  employmentStatus: string;
  positionType: string;
  services: string[];
  cancerTypes: string[];
  languages: string[];
  includeInDirectory: boolean;

  // Security Information
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}
