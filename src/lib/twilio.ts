import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Return null if keys are not configured, so callers can fallback to simulation
export const getTwilioClient = () => {
    if (!accountSid || !authToken) {
        return null;
    }
    return twilio(accountSid, authToken);
};
