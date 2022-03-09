// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {get, response} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {AUTH_STRATEGY_NAME} from '../authentication-providers/basic-auth-strategy-provider';



export class WhoAmIController {
  /*
  constructor(
    @inject(SecurityBindings.USER)
    private user: UserProfile) { }
*/

  // Define your strategy name as a constant so that
  // it is consistent with the name you provide in the adapter
  @authenticate(AUTH_STRATEGY_NAME)
  @get('/whoami')
  @response(200, {
    description: 'Who Am I. UserInfo'
  })
  async whoAmI(
    @inject(SecurityBindings.USER, {optional: true})
    user: UserProfile
  ): Promise<object> {
    return user;5
  }
}
