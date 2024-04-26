import React, { useState } from 'react';
import { auth, RecaptchaVerifier } from '../firebase';

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [message, setMessage] = useState('');

  const handleSendCode = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log("SUCCESS!")
        },
        'expired-callback': () => {
          // Callback function if reCAPTCHA response expires, if needed
          console.log("EXPIRED!")
        }
      });

      const confirmation = await auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setVerificationId(confirmation.verificationId);
      setMessage('Verification code sent to your phone.');
    } catch (error) {
      console.error('Error sending verification code:', error);
      setMessage('Error sending verification code. Please try again.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      await auth.currentUser.updatePhoneNumber(credential);
      setMessage('Phone number verified successfully.');
    } catch (error) {
      console.error('Error verifying phone number:', error);
      setMessage('Error verifying phone number. Please try again.');
    }
  };

  return (
    <div>
      <input type="text" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button onClick={handleSendCode}>Send Verification Code</button>
      <input type="text" placeholder="Enter verification code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
      <button onClick={handleVerifyCode}>Verify Code</button>
      <p>{message}</p>
      {/* Add a <div> with id "recaptcha-container" for reCAPTCHA widget */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneVerification;
