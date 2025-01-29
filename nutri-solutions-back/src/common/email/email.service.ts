import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    await this.mailerService.sendMail({
      to, // Recipient email
      subject: 'Welcome to Our Platform', // Subject
      template: './welcome', // Template file name (without extension)
      context: { name }, // Context to pass to the template
    });
  }
  async sendReservationNotification(
    to: string,
    name: string,
    clientName: string,
    reservationDate: string,
  ): Promise<void> {
    try {
      const result = await this.mailerService.sendMail({
        to, // Recipient email
        subject: 'New Reservation', // Subject
        template: './reservation', // Template file name (without extension)
        context: {
          clientName,
          reservationDate,
        },
      });

      // Check if email was sent successfully
      if (result.accepted.length > 0) {
        console.log('Email sent successfully!');
      } else {
        console.log('Email sending failed.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendReservationCancelNotification(
    to: string,
    name: string,
    clientName: string,
    reservationDate: string,
  ): Promise<void> {
    try {
      const result = await this.mailerService.sendMail({
        to, // Recipient email
        subject: 'New Reservation', // Subject
        template: './cancel_reservation', // Template file name (without extension)
        context: {
          clientName,
          reservationDate,
        },
      });

      // Check if email was sent successfully
      if (result.accepted.length > 0) {
        console.log('Email sent successfully!');
      } else {
        console.log('Email sending failed.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  async sendNewNutritionistAlert(nutritionistName: string): Promise<void> {
    try {
      const result = await this.mailerService.sendMail({
        to: 'nesrine890@gmail.com', // Recipient email
        subject: 'New Nutritionist', // Subject
        template: './nutritionist_signup', // Template file name (without extension)
        context: {
          nutritionistName,
        },
      });

      // Check if email was sent successfully
      if (result.accepted.length > 0) {
        console.log('Email sent successfully!');
      } else {
        console.log('Email sending failed.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  async sendNutritionistRejection(
    to: string,
    nutritionistName: string,
  ): Promise<void> {
    try {
      const result = await this.mailerService.sendMail({
        to, // Recipient email
        subject: 'Update From Nutrisolutions', // Subject
        template: './reject_nutritionist', // Template file name (without extension)
        context: {
          nutritionistName,
        },
      });

      // Check if email was sent successfully
      if (result.accepted.length > 0) {
        console.log('Email sent successfully!');
      } else {
        console.log('Email sending failed.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  async sendNutritionistApproval(
    to: string,
    nutritionistName: string,
  ): Promise<void> {
    try {
      const result = await this.mailerService.sendMail({
        to, // Recipient email
        subject: 'Welcome To Nutrisolutions', // Subject
        template: './welcome_nutritionist', // Template file name (without extension)
        context: {
          nutritionistName,
        },
      });

      // Check if email was sent successfully
      if (result.accepted.length > 0) {
        console.log('Email sent successfully!');
      } else {
        console.log('Email sending failed.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendPasswordResetEmail(
    to: string,
    resetToken: string,
    userName: string,
  ): Promise<void> {
    try {
      const result = await this.mailerService.sendMail({
        to, // Recipient email
        subject: 'Password Reset Request', // Subject
        template: './password_reset', // Template file name
        context: {
          resetToken,
          userName, // Token to be used in the reset link
        },
      });

      if (result.accepted.length > 0) {
        console.log('Password reset email sent successfully!');
      } else {
        console.log('Password reset email sending failed.');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}
