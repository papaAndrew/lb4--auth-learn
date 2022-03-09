import {Provider} from '@loopback/core';
import {repository} from '@loopback/repository';
import {BasicVerifyFunction} from 'passport-http';
import {UserInfo} from '../models';
import {UserInfoRepository} from '../repositories';


const INVALID_USER_CREDENTIALS_MESSAGE = "User or password is invalid";

export class VerifyFunctionProvider
  implements Provider<BasicVerifyFunction>
{
  constructor(
    @repository('userinfo')
    private userRepo: UserInfoRepository) {

    }

  value(): BasicVerifyFunction {
    const myThis = this;

    return async function (
      username: string,
      password: string,
      cb: Function,
    ) {
      let user: UserInfo;

      try {
        //find user with specific username
        const users: UserInfo[] = await myThis.userRepo.find({
          where: {
            name: username
          },
        });

        // if no user found with this username, throw an error.
        if (users.length < 1) {
          let error = new Error(INVALID_USER_CREDENTIALS_MESSAGE); //assign 401 in sequence
          throw error;
        }

        //verify given password matches the user's password
        user = users[0];
        if (user.password !== password) {
          let error = new Error(INVALID_USER_CREDENTIALS_MESSAGE); //assign 401 in sequence
          throw error;
        }

        //return null for error, and the valid user
        cb(null, user);
      } catch (error) {
        //return the error, and null for the user
        cb(error, null);
      }
    };
  }
}
