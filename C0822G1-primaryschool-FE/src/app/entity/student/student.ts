import {PointManagement} from "./point-management";
import {Clazz} from '../clazz/clazz';

export interface Student {
  studentId?: number;
  img?: string;
  studentName?:string;
  dateOfBirth?: string;
  gender?: boolean;
  fatherName?: string;
  phoneNumberFather?: string;
  fatherJob?: string;
  motherName?: string;
  phoneNumberMother?:string;
  motherJob?: string;
  religion?: string;
  address?: string;
  studentStatus?: boolean;
  flagDelete?: string;
  pointManagement?: PointManagement;
  clazz?: Clazz;
}
