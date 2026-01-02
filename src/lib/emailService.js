import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from './emailConfig';

export const sendEmail = async (templateParams) => {
    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.SERVICE_ID,
            EMAIL_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAIL_CONFIG.PUBLIC_KEY
        );
        return response;
    } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
    }
};

export const sendFormEmail = async (formElement) => {
    try {
        const response = await emailjs.sendForm(
            EMAIL_CONFIG.SERVICE_ID,
            EMAIL_CONFIG.TEMPLATE_ID,
            formElement,
            EMAIL_CONFIG.PUBLIC_KEY
        );
        return response;
    } catch (error) {
        console.error('Email form sending failed:', error);
        throw error;
    }
};
