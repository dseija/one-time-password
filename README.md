# One Time Password (OTP) Backend

## Overview

**One Time Password (OTP)** is a backend application that consists of two microservices (AWS Lambda functions) to generate and validate temporary passwords. This system allows secure user authentication by generating a one-time password (OTP) sent via email and validating the OTP using a token.

### Features

- **Microservices**:
  - `generate-password`: Generates a temporary password and token, then sends the OTP to the user's email.
  - `validate-password`: Validates the OTP and token combination provided by the user.
- **Email Sending**: Emails are sent using **AWS SES**.
- **Storage**: Passwords and tokens are stored in **AWS DynamoDB**, with TTL for automatic expiration.
- **Deployment**: Handled with **Serverless Framework**.

### How it works

1. The user send a `POST` request to the `generate-password` endpoint with the following payload:

```json
{
  "email": "user@example.com"
}
```

2. The `generate-password` lambda function will generate a random password along with a session token, storing those values into a DynamoDB table.
3. The session token will be returned as the response of the API endpoint:

```json
{
  "token": "MYSESSIONTOKEN"
}
```

4. The generated password will be sent to the user's email through AWS SES.
5. Now with the received password and session token, the user can send a `POST` request to the `validate-password` endpoint with the following payload:

```json
{
  "password": "123456",
  "token": "MYSESSIONTOKEN"
}
```

6. The `validate-password` lambda function will query the DynamoDB table with the given session token and password, and returns the success or failure responses.

---

## Tech Stack

- **Node.js**: Server-side JavaScript environment.
- **AWS Lambda**: Compute service for running code without provisioning servers.
- **AWS SES**: Email sending service.
- **AWS DynamoDB**: NoSQL database for storing password and token with TTL.
- **Serverless Framework**: Deployment framework for cloud applications.

---

## Installation

### Prerequisites

- **Node.js** (version 18.x or higher)
- **AWS CLI** (for configuring AWS access) [Documentation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- **Serverless Framework** (for deploying) [Documentation](https://www.serverless.com/framework/docs/getting-started)
- **AWS SES Sender Email** Ensure that you have a verified email address configured in your AWS SES.

### Steps

1. Clone this repository and install dependencies:

```bash
git clone https://github.com/dseija/one-time-password.git
cd one-time-password
npm install
```

2. Create a `.env` file with the required environment variables. You can copy the [`.env.sample`](/.env.sample) file.

---

## Deployment

Deploy using the Serverless Framework:

```bash
serverless deploy
```
