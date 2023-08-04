import { User } from "./user";

export class UserParams {
  minAge = 12;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 6;
  gender: string;
  orderBy = 'lastActive';
  search: string;

  constructor(user: User) {
    this.gender = user.gender === 'female' ? 'male' : 'female'
  }
}
