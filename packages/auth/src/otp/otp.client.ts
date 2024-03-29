import { type ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { type FirebaseConfig, getFirebaseAuth } from '../utils/firebase';

interface GetOTPClientAuthConfig {
  firebase: FirebaseConfig;
  apiRoutes: {
    login: string;
    logout: string;
  };
}

export function getOTPClientAuth(config: GetOTPClientAuthConfig) {
  function createCaptcha(id: string) {
    const auth = getFirebaseAuth(config.firebase);
    return new RecaptchaVerifier(auth, id, {
      size: 'invisible'
    });
  }

  function resetCaptcha(captcha: RecaptchaVerifier, id: string) {
    captcha.clear();
    return createCaptcha(id);
  }

  async function sendOTP(captcha: RecaptchaVerifier, phoneNumber: string) {
    const auth = getFirebaseAuth(config.firebase);
    const confirmation = await signInWithPhoneNumber(auth, phoneNumber, captcha);
    return confirmation;
  }

  async function confirmOTP(confirmation: ConfirmationResult, otp: string) {
    const result = await confirmation.confirm(otp);
    await fetch(config.apiRoutes.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: result.user.uid,
        token: await result.user.getIdToken()
      })
    });
  }

  return {
    createCaptcha,
    resetCaptcha,
    sendOTP,
    confirmOTP
  };
}
