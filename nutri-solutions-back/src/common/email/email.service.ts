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
  
}
