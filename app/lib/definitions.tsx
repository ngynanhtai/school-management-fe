export type User = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  userCode: string;
  roleType: string;
};

export type Employee = {
  id: string;
  code: string;
  phoneNumber: string;
  password: string;
  fullName: string;
  nationalId: string;
  dob: string;
  email: string;
  gender: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  profession: string;
  maritalStatus: string;
  salary: number;
  roleId: number;
  roleCode: string;
  roleName: string;
  deleted: boolean;
};
