-- Initialize database tables for Caspian Host

-- Create staff_applications table
CREATE TABLE IF NOT EXISTS staff_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create customer_support_applications table
CREATE TABLE IF NOT EXISTS customer_support_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id VARCHAR(20) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  languages TEXT NOT NULL,
  previous_experience TEXT,
  has_hosting_experience BOOLEAN DEFAULT FALSE,
  hosting_experience_details TEXT,
  experience_letter_base64 MEDIUMTEXT,
  daily_hours INT NOT NULL,
  weekend_availability BOOLEAN DEFAULT FALSE,
  emergency_availability BOOLEAN DEFAULT FALSE,
  handle_angry_customer TEXT NOT NULL,
  handle_unknown_solution TEXT NOT NULL,
  prioritize_multiple_customers TEXT NOT NULL,
  explain_technical_issue TEXT NOT NULL,
  minecraft_server_check TEXT NOT NULL,
  expected_salary VARCHAR(50) NOT NULL,
  identity_card_base64 MEDIUMTEXT,
  passport_photo_base64 MEDIUMTEXT,
  why_hire TEXT NOT NULL,
  agree_to_rules BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sales_applications table
CREATE TABLE IF NOT EXISTS sales_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id VARCHAR(20) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  languages TEXT NOT NULL,
  previous_experience TEXT NOT NULL,
  hosting_experience TEXT NOT NULL,
  experience_letter_base64 MEDIUMTEXT,
  daily_hours VARCHAR(50) NOT NULL,
  weekend_availability BOOLEAN DEFAULT FALSE,
  emergency_availability BOOLEAN DEFAULT FALSE,
  expected_salary VARCHAR(50) NOT NULL,
  convince_customer TEXT NOT NULL,
  expensive_response TEXT NOT NULL,
  minecraft_server_info TEXT NOT NULL,
  ram_cpu_difference TEXT NOT NULL,
  lag_diagnosis TEXT NOT NULL,
  identity_card_base64 MEDIUMTEXT,
  passport_photo_base64 MEDIUMTEXT,
  why_hire TEXT NOT NULL,
  agree_to_rules BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create technical_support_applications table
CREATE TABLE IF NOT EXISTS technical_support_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id VARCHAR(20) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  languages TEXT NOT NULL,
  documents_availability VARCHAR(50) NOT NULL,
  compensation VARCHAR(50) NOT NULL,
  pterodactyl_panel TEXT NOT NULL,
  paymenter_panel TEXT NOT NULL,
  proxmox TEXT NOT NULL,
  vmware TEXT NOT NULL,
  linux TEXT NOT NULL,
  developing_ideas TEXT NOT NULL,
  identity_card_base64 MEDIUMTEXT,
  passport_photo_base64 MEDIUMTEXT,
  agree_to_rules BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
