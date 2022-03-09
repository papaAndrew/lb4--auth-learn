import {
  AuthenticationBindings, AuthenticationStrategy, UserProfileFactory
} from '@loopback/authentication';
import {StrategyAdapter} from '@loopback/authentication-passport';
import {inject, Provider} from '@loopback/core';
import {BasicStrategy, BasicVerifyFunction} from 'passport-http';

export const AUTH_STRATEGY_NAME = 'basic';

export class PassportBasicAuthProvider<UserInfo>
  implements Provider<AuthenticationStrategy>
{
  constructor(
    @inject('authentication.basic.verify')
    private verifyFn: BasicVerifyFunction,
    @inject(AuthenticationBindings.USER_PROFILE_FACTORY)
    private myUserProfileFactory: UserProfileFactory<UserInfo>,
  ) { }

  value(): AuthenticationStrategy {
    const basicStrategy = this.configuredBasicStrategy(this.verifyFn);
    return this.convertToAuthStrategy(basicStrategy);
  }

  // Takes in the verify callback function and returns a configured basic strategy.
  configuredBasicStrategy(verifyFn: BasicVerifyFunction): BasicStrategy {
    return new BasicStrategy(verifyFn);
  }

  // Applies the `StrategyAdapter` to the configured basic strategy instance.
  // You'd better define your strategy name as a constant, like
  // `const AUTH_STRATEGY_NAME = 'basic'`
  // You will need to decorate the APIs later with the same name
  // Pass in the user profile factory
  convertToAuthStrategy(basic: BasicStrategy): AuthenticationStrategy {
    return new StrategyAdapter(
      basic,
      AUTH_STRATEGY_NAME,
      this.myUserProfileFactory,
    );
  }
}
