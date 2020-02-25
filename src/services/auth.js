import Amplify, { Auth } from 'aws-amplify';
// import api from './api';

const appConfig = {
  Auth: {
    mandatorySignIn: true,
    region: process.env.VUE_APP_AWS_REGION,
    userPoolId: process.env.VUE_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.VUE_APP_AWS_USER_POOL_WEB_CLIENT_ID,
  },
};

try {
  Amplify.configure(appConfig);
} catch (error) {
  // console.log('error in configs amplify');
}
export const getAuthenticationToken = () => {
  return localStorage.getItem(process.env.VUE_APP_TOKEN_NAME);
};

export const saveAuthenticationToken = token => {
  localStorage.setItem(process.env.VUE_APP_TOKEN_NAME, token);
};

export const removeAuthenticationToken = () => {
  localStorage.removeItem(process.env.VUE_APP_TOKEN_NAME);
};

export const authenticate = async (email, password) => {
  const userSession = await Auth.signIn(email, password);
  if (userSession.challengeName === 'NEW_PASSWORD_REQUIRED') {
    return { newPasswordRequired: true };
  }

  const token = (await Auth.currentSession()).getIdToken().getJwtToken();

  if (token) {
    saveAuthenticationToken(token);
  }
  return { newPasswordRequired: false };
};

export const completeNewPassword = async (email, password, newPassword) => {
  const userSession = await Auth.signIn(email, password);
  await Auth.completeNewPassword(userSession, newPassword);

  const token = (await Auth.currentSession()).getIdToken().getJwtToken();

  if (token) {
    saveAuthenticationToken(token);
  }
};

export const register = async (username, password, attributes) => {
  await Auth.signUp({
    username,
    password,
    attributes,
  });
};

export const resendSignUp = async username => {
  await Auth.resendSignUp(username);
};

export const completeRegister = async (username, code) => {
  await Auth.confirmSignUp(username, code, { forceAliasCreation: true });
};

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    // console.log('error in sigout');
  }
};

export const getUser = async () => {
  const data = await Auth.currentUserInfo();

  if (!data.username) {
    removeAuthenticationToken();
    return Promise.reject();
  }

  return data;
};
