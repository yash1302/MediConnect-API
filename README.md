# MediConnect-API

## Overview

MediConnect-API is a robust backend API for a medical appointment and real-time chat platform. Built with Node.js, Express.js, and MongoDB, it powers secure user authentication, appointment scheduling, payment processing, and real-time communication between patients and doctors. The API is designed for scalability and maintainability, supporting the MediConnect ecosystem.

## Features

- **Secure Authentication**: User, doctor, and admin logins with JWT-based authentication and role-based access.
- **Appointment Management**: Book, view, cancel, and manage doctor availability and appointments.
- **Payment Processing**: Secure payments via Razorpay and Stripe for appointment bookings.
- **Real-time Chat**: Instant messaging between patients and doctors with message storage.
- **Profile Management**: Update user and doctor profiles, including image uploads.
- **Admin Controls**: Manage users, doctors, and appointments efficiently.
- **RESTful Design**: Organized and maintainable API structure.
- **Real-time Updates**: Socket.IO for seamless chat and notifications.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Real-time Communication**: Socket.IO
- **Payments**: Razorpay, Stripe
- **File Uploads**: Cloudinary (for profile images)
- **Version Control**: Git
- **Hosting**: GitHub

## Prerequisites

Before setting up the project, ensure you have:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud, e.g., MongoDB Atlas)
- [Git](https://git-scm.com/)
- Accounts and API keys for:
  - [Cloudinary](https://cloudinary.com/) (for image uploads)
  - [Razorpay](https://razorpay.com/) and [Stripe](https://stripe.com/) (for payments)

## Installation

To set up MediConnect-API locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Lord-Vesta/MediConnect-API.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd MediConnect-API
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following configuration:
   ```plaintext
   PORT=5000
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key
   CURRENCY=USD
   ```

   Replace placeholders (e.g., `your_cloudinary_name`) with actual values from your Cloudinary, MongoDB, Razorpay, and Stripe accounts.

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```

6. **Test the API**:
   The server will run on `http://localhost:5000` (or your specified port). Use tools like Postman or Insomnia to test endpoints.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, reach out to the project maintainer at [Lord-Vesta](https://github.com/Lord-Vesta).