export interface qualy{
  degree: string;
  univercity: string;
}



export interface EmpType {
  id?: string;
  name: string;
  mail: string;
  gender: string;
  language: (string|boolean)[];
  qualyfication:qualy[];
  skills: string;
  password: string;
  fileUpload: File|null;
}

