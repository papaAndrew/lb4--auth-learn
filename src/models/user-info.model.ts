import {Entity, model, property} from '@loopback/repository';

@model()
export class UserInfo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  email?: string;


  constructor(data?: Partial<UserInfo>) {
    super(data);
  }
}

export interface UserInfoRelations {
  // describe navigational properties here
}

export type UserInfoWithRelations = UserInfo & UserInfoRelations;
