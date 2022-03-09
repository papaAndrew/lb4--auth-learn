import {UserProfileFactory} from '@loopback/authentication';
import {securityId, UserProfile} from '@loopback/security';
import {UserInfo} from '../models';

export const userInfoProfileFactory: UserProfileFactory<UserInfo> =
  (
    user: UserInfo
  ): UserProfile => {
    const userProfile = {
      [securityId]: user.id ?? "",
      email: user.email,
      name: user.name
    };
    return userProfile;
  };


  // The factory function now have access extra metadata about the resolution
/*
const factory: ValueFactory<string> = resolutionCtx => {
return `Hello, ${resolutionCtx.context.name}#${
  resolutionCtx.binding.key
} ${resolutionCtx.options.session?.getBindingPath()}`;
};
*/
