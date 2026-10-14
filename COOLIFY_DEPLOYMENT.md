# Coolify Deployment Guide

This guide will help you deploy the Caspian Host application to Coolify with your existing internal MySQL database.

## Prerequisites

- A Coolify instance (self-hosted or cloud)
- A GitHub repository with this code
- An existing internal MySQL database
- Basic understanding of Coolify's interface

## Step 1: Prepare Your Repository

1. Push your code to GitHub
2. Ensure the following files are in your repository:
   - `Dockerfile`
   - `nixpacks.toml`
   - `init-db.sql`
   - `.env.example`

## Step 2: Initialize Database Tables

Since you're using an existing internal database, you need to create the tables manually:

### Option A: Using a Database Client (Recommended)
1. Connect to your internal MySQL database using a tool like:
   - DBeaver
   - MySQL Workbench
   - TablePlus
   - Or any MySQL client
2. Use your internal database connection:
   - Host: `edkiolselorf4b4ohoocpjaf`
   - User: `mysql`
   - Password: `3Qed32td8bS5Jw1G12v9Ydrpd4sCriNb4GFROuueQ2SneGqVA48KFnxwBtUk7XjG`
   - Database: `default`
   - Port: `3306`
3. Open and run the `init-db.sql` file

### Option B: Using Command Line
```bash
mysql -h edkiolselorf4b4ohoocpjaf -u mysql -p3Qed32td8bS5Jw1G12v9Ydrpd4sCriNb4GFROuueQ2SneGqVA48KFnxwBtUk7XjG default < init-db.sql
```

### Option C: Auto-create on First API Call
The application has `initializeDatabase()` calls in the API routes. The first time you submit a form or access an API endpoint, it will create the tables automatically.

## Step 3: Create the Next.js Application in Coolify

1. In Coolify, click "New Application"
2. Connect your GitHub repository
3. Select the branch you want to deploy (e.g., `main` or `production`)
4. Choose build method:
   - **Recommended:** "Dockerfile" (uses the `Dockerfile` in your repo)
   - **Alternative:** "Nixpacks" (uses the `nixpacks.toml` in your repo)
5. Click "Create"

## Step 4: Configure Environment Variables

In Coolify, add the following environment variables to your Next.js application:

### Database Configuration
```
DATABASE_URL=mysql://mysql:3Qed32td8bS5Jw1G12v9Ydrpd4sCriNb4GFROuueQ2SneGqVA48KFnxwBtUk7XjG@edkiolselorf4b4ohoocpjaf:3306/default
```

### Email Configuration (CRITICAL - Required for applicant emails)
```
EMAIL_HOST=smtp.zeptomail.in
EMAIL_PORT=587
EMAIL_USER=emailapikey
EMAIL_PASS=your_actual_zeptomail_api_key
EMAIL_FROM=work@caspianhost.com
ADMIN_EMAIL=caspiannode@gmail.com
```

**Critical for Email Functionality:**
- Replace `your_actual_zeptomail_api_key` with your actual ZeptoMail API key
- Your credentials: `emailapikey` as username, and your API key as password
- Without the correct `EMAIL_PASS`, applicants will NOT receive confirmation emails
- The `EMAIL_FROM` (work@caspianhost.com) must be a verified sender email in your ZeptoMail account
- The `ADMIN_EMAIL` is where you'll receive notifications about new applications
- Mark `EMAIL_PASS` as "Secret" in Coolify for security

### Application Configuration
```
NODE_ENV=production
PORT=3000
```

**Important:** Mark the `DATABASE_URL` and `EMAIL_PASS` as "Secret" in Coolify for security.

## Step 6: Deploy

1. Click "Deploy" in Coolify
2. Wait for the build to complete
3. Coolify will build and start your Next.js application

## Step 7: Verify Deployment

1. Check the Coolify logs to ensure the application started successfully
2. Access your application at the URL provided by Coolify
3. Test the database functionality by submitting a form (staff application, customer support, etc.)
4. Check your internal MySQL database to verify data is being stored
5. Test file uploads by submitting an application with documents
6. Files are now stored as base64 in the database, so they will persist across redeployments

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. **Check the DATABASE_URL format:**
   - Must be: `mysql://user:password@host:port/database`
   - Your format: `mysql://mysql:3Qed32td8bS5Jw1G12v9Ydrpd4sCriNb4GFROuueQ2SneGqVA48KFnxwBtUk7XjG@edkiolselorf4b4ohoocpjaf:3306/default`

2. **Verify network connectivity:**
   - Ensure Coolify can reach your internal database host
   - Check if there are firewall rules blocking the connection
   - The database host `edkiolselorf4b4ohoocpjaf` must be accessible from Coolify

3. **Test the connection:**
   - Try connecting manually: `mysql -h edkiolselorf4b4ohoocpjaf -u mysql -p default`
   - Run: `SELECT 1;` to verify it's working

4. **Check Coolify logs:**
   - Look at the application logs
   - Common error: "Access denied for user" → wrong password
   - Common error: "Can't connect to MySQL server" → network/firewall issue
   - Common error: "Unknown database" → database name is wrong

### Tables Not Created

If the database connects but tables don't exist:

1. The `initializeDatabase()` function runs on first API call
2. Submit a test form to trigger table creation
3. Or manually run the `init-db.sql` script (see Step 2)
4. Check the application logs for "Database initialized successfully"

### Email Not Sending

If emails are not being sent:

1. Verify your SMTP credentials in the environment variables
2. Check the application logs for email-related errors
3. Ensure your email provider allows connections from Coolify's IP
4. Test the SMTP credentials locally first

### Build Failures

If the build fails:

1. Check the build logs in Coolify
2. Ensure all dependencies are in `package.json`
3. Verify the Dockerfile syntax is correct
4. Make sure `.dockerignore` is not excluding necessary files

## Local Development with Docker Compose

To test locally before deploying to Coolify:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your actual values
   - You can use your internal database URL for local testing too

3. Run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Access the application at `http://localhost:3000`

5. To stop:
   ```bash
   docker-compose down
   ```

**Note:** The docker-compose.yml in this repo is for local development only.

## Database Management

Since you're using an internal database, manage it directly:

### Backing Up Database
```bash
mysqldump -h edkiolselorf4b4ohoocpjaf -u mysql -p3Qed32td8bS5Jw1G12v9Ydrpd4sCriNb4GFROuueQ2SneGqVA48KFnxwBtUk7XjG default > backup.sql
```

### Restoring Database
```bash
mysql -h edkiolselorf4b4ohoocpjaf -u mysql -p3Qed32td8bS5Jw1G12v9Ydrpd4sCriNb4GFROuueQ2SneGqVA48KFnxwBtUk7XjG default < backup.sql
```

### Viewing Data
```bash
mysql -h edkiolselorf4b4ohoocpjaf -u mysql -p3Qed32td8bS5Jw1G12v9Ydrpd4sCriNb4GFROuueQ2SneGqVA48KFnxwBtUk7XjG default
```

Then run:
```sql
USE default;
SHOW TABLES;
SELECT * FROM staff_applications;
SELECT * FROM customer_support_applications;
SELECT * FROM sales_applications;
```

## Updating the Application

To update your application after making changes:

1. Push your changes to GitHub
2. In Coolify, click "Redeploy"
3. Coolify will rebuild and restart the application

**Note:** Your internal database and data will not be affected.

## Security Notes

- Never commit `.env` file to version control
- Your database password is in `.env.example` - consider rotating it
- Rotate your email API keys regularly
- Use Coolify's secret management for sensitive data (marked as "Secret" in environment variables)
- Enable HTTPS for your application in Coolify
- Consider creating a dedicated database user with limited permissions instead of using the root/mysql user

## Common Mistakes to Avoid

1. ❌ Using docker-compose.yml in Coolify (Coolify uses its own deployment method)
2. ❌ Modifying the DATABASE_URL format (must use the exact format provided)
3. ❌ Forgetting to initialize database tables
4. ❌ Not verifying network connectivity between Coolify and your internal database
5. ❌ Not checking firewall rules for database access

## Support

If you encounter issues not covered in this guide:

1. Check Coolify documentation: https://coolify.io/docs
2. Review the application logs in Coolify
3. Test database connectivity manually
4. Verify all environment variables are set correctly
5. Check network/firewall settings between Coolify and your database
