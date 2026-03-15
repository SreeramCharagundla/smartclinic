----------------------------------------users----------------------------------------

INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('a57a3570-e34e-4c14-af7b-c4391539cbc0','echen@mockhospital.com','$2a$10$9lKcrlfSEmuJnLZ57CTqcu4Bk3e8jw.CcM.zgqQCrCtwq8KB.faae','DOCTOR','2026-03-14 23:25:40.306662');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('08261814-ef63-4585-a366-e418060303aa','mjohnson@mockhospital.com','$2a$10$/2qVwJXzigXCuK1aUxKly.A6UivH2UdkRkwz3VagWBPG/ds9/5Mmy','DOCTOR','2026-03-14 23:45:49.163226');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('3dcd753a-2b85-4bee-a42f-b613dd9c7337','spatel@mockhospital.com','$2a$10$CEmpgMPK0em8mTTNs/o0seg2W3NoA7Z9XHnRW4nZn4TzEReCNd83G','DOCTOR','2026-03-14 23:47:13.855046');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('a8e44350-35cf-49a5-91d6-76b4e2c87427','jdoe90@dummymail.com','$2a$10$XkBDbeW/fkqwkod2DEtFJu0h0w2sQZ2bWRkNo0xdQ2Vxk6gdN6y5q','PATIENT','2026-03-14 23:48:40.43982');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('86085364-2419-4897-8a56-826ce9940ac5','jsmith85@dummymail.com','$2a$10$28Y4wRMgM9IExsLgRgCIUeR26w9v3L3YE34eVSVSl3z.10QBJ.PAe','PATIENT','2026-03-14 23:51:18.235248');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('0582b257-9f1c-4321-9279-477d557c3ddb','mbrown00@dummymail.com','$2a$10$2IrDZp0WTQatt5y2VETyQ.4.ZrnfP.N145RwzE9G3ogZe7DgkA.xy','PATIENT','2026-03-14 23:52:39.75488');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('24493257-1a2a-4b46-9d29-80668c9626df','lgarcia95@dummymail.com','$2a$10$qzNnbgaTv7RD6MIj4kV/huOsWYb8gLGLJh1hLQOiLgqUc61dO7tcy','PATIENT','2026-03-14 23:59:36.505658');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('59e44b7f-c1ba-49d4-9c90-894cf29ea662','dwilson70@dummymail.com','$2a$10$E41zU9mj2v6uuhfncDF5Ju427baLiqJ1u854NhLnnIrxW2BE8uAEW','PATIENT','2026-03-15 00:01:00.314462');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('d31b2318-ded1-4a4f-b00d-238a7a381305','ataylor82@dummymail.com','$2a$10$Zo9VEER5vY.vknVkn6NJWeTnajy2oCS2zxV2Z3JTMLFubytj68nza','PATIENT','2026-03-15 00:02:18.602097');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('61ff618e-ee1c-4ec0-ad3c-b81cc7861e08','janderson98@dummymail.com','$2a$10$SDzD9Y2al04J0bBJbQVqpOddftdtN9l1.usLl/NEheAOVhucMMRZK','PATIENT','2026-03-15 00:03:23.762876');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('c9efaed8-50d6-413d-803d-030656be587e','mmartinez92@dummymail.com','$2a$10$XAWDqMMDgNmlrBM/mLIwG.7jB59YdwYrLUG1j5OZ/ZI6YrBL75NE2','PATIENT','2026-03-15 00:04:49.949595');
INSERT INTO users (id,email,password_hash,role,created_at) VALUES ('42147ffd-955e-433b-889c-69dfdc770ea1','rthomas87@dummymail.com','$2a$10$rWcaHnXc8Ppwff1viV4ZN.fnr05Ould1KgiFgaJdAhRNFjmmXwsdC','PATIENT','2026-03-15 00:06:00.141696');

----------------------------------------doctors----------------------------------------

INSERT INTO doctors (id,user_id,first_name,last_name,specialty,license_number,clinic_address,phone) VALUES ('52a1a426-1262-4c33-afd6-800a15dfa6e1','a57a3570-e34e-4c14-af7b-c4391539cbc0','Emily','Chen','Cardiology','MED-883920','100 Heart Way, Suite 4A','+1 607 555 0101');
INSERT INTO doctors (id,user_id,first_name,last_name,specialty,license_number,clinic_address,phone) VALUES ('74adfa59-3995-45ae-868c-0e2a0212dbb5','08261814-ef63-4585-a366-e418060303aa','Marcus','Johnson','Dermatology','MED-772819','250 Skin Care Blvd, Bldg B','+1 766 555 0102');
INSERT INTO doctors (id,user_id,first_name,last_name,specialty,license_number,clinic_address,phone) VALUES ('bdd723c2-f76e-4803-a641-343400e067d0','3dcd753a-2b85-4bee-a42f-b613dd9c7337','Sarah','Patel','Pediatrics','MED-661708','300 Childrens Ave, 1st Floor','+1 617 555 0103');

----------------------------------------patients----------------------------------------

INSERT INTO patients (id,user_id,first_name,last_name,dob,gender,phone,address,blood_type) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','a8e44350-35cf-49a5-91d6-76b4e2c87427','John','Doe','1990-01-15','Male','+1 709 555 0201','10 Main St, Apt 4','O+');
INSERT INTO patients (id,user_id,first_name,last_name,dob,gender,phone,address,blood_type) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','86085364-2419-4897-8a56-826ce9940ac5','Jane','Smith','1985-05-20','Female','+1 708 555 0202','20 Oak Dr','A-');
INSERT INTO patients (id,user_id,first_name,last_name,dob,gender,phone,address,blood_type) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','0582b257-9f1c-4321-9279-477d557c3ddb','Michael','Brown','2000-09-10','Male','+1 906 555 0203','30 Pine Ln','B+');
INSERT INTO patients (id,user_id,first_name,last_name,dob,gender,phone,address,blood_type) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','24493257-1a2a-4b46-9d29-80668c9626df','Lisa','Garcia','1995-12-05','Female','+1 201 555 0204','40 Elm Ct','AB+');
INSERT INTO patients (id,user_id,first_name,last_name,dob,gender,phone,address,blood_type) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','59e44b7f-c1ba-49d4-9c90-894cf29ea662','David','Wilson','1970-04-25','Male','+1 617 667 8979','50 Cedar Blvd','O-');
INSERT INTO patients (id,user_id,first_name,last_name,dob,gender,phone,address,blood_type) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','d31b2318-ded1-4a4f-b00d-238a7a381305','Anna','Taylor','1982-08-30','Female','+1 201 643 7817','60 Maple Ave, Apt 12','A+');
INSERT INTO patients (id,user_id,first_name,last_name,dob,gender,phone,address,blood_type) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','61ff618e-ee1c-4ec0-ad3c-b81cc7861e08','James','Anderson','1992-08-18','Male','+1 786 778 0172','70 Birch Way','B-');
INSERT INTO patients (id,user_id,first_name,last_name,dob,gender,phone,address,blood_type) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','c9efaed8-50d6-413d-803d-030656be587e','Maria','Martinez','1992-10-12','Female','+1 617 209 0208','80 Spruce Rd','AB-');
INSERT INTO patients (id,user_id,first_name,last_name,dob,gender,phone,address,blood_type) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','42147ffd-955e-433b-889c-69dfdc770ea1','Robert','Thomas','1987-07-07','Male','+1 207 830 0209','90 Ash St, Unit B','O+');

----------------------------------------doctor_patients----------------------------------------

INSERT INTO doctor_patients (doctor_id,patient_id) VALUES ('52a1a426-1262-4c33-afd6-800a15dfa6e1','47d5f15d-bd2f-413d-941b-97e744aa7ba4');
INSERT INTO doctor_patients (doctor_id,patient_id) VALUES ('52a1a426-1262-4c33-afd6-800a15dfa6e1','806a7559-ce1c-4bc8-893f-9b907b535dc7');
INSERT INTO doctor_patients (doctor_id,patient_id) VALUES ('52a1a426-1262-4c33-afd6-800a15dfa6e1','1fdcbdf5-b891-407b-8ea2-fa4b7560ba73');

INSERT INTO doctor_patients (doctor_id,patient_id) VALUES ('74adfa59-3995-45ae-868c-0e2a0212dbb5','f1cefb48-e04f-424e-b365-42342b863a1f');
INSERT INTO doctor_patients (doctor_id,patient_id) VALUES ('74adfa59-3995-45ae-868c-0e2a0212dbb5','2bd5c13a-61bb-4bdf-aedf-05af7620e1d0');
INSERT INTO doctor_patients (doctor_id,patient_id) VALUES ('74adfa59-3995-45ae-868c-0e2a0212dbb5','491e5e4f-4dca-43db-bc79-efc524509bcd');

INSERT INTO doctor_patients (doctor_id,patient_id) VALUES ('bdd723c2-f76e-4803-a641-343400e067d0','6e18e583-9c8b-42f4-b37c-a10346daaa52');
INSERT INTO doctor_patients (doctor_id,patient_id) VALUES ('bdd723c2-f76e-4803-a641-343400e067d0','81cdcccf-17e5-4f00-a01d-2a19b918eec8');
INSERT INTO doctor_patients (doctor_id,patient_id) VALUES ('bdd723c2-f76e-4803-a641-343400e067d0','c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f');

----------------------------------------pharmacies----------------------------------------

INSERT INTO pharmacies (id,name,address,latitude,longitude,phone) VALUES ('11111111-1111-1111-1111-111111111111','Central Boston Pharmacy','120 Tremont St, Boston MA',42.355,-71.065,'+1 617 555 4101');
INSERT INTO pharmacies (id,name,address,latitude,longitude,phone) VALUES ('22222222-2222-2222-2222-222222222222','Harbor Health Pharmacy','75 Atlantic Ave, Boston MA',42.360,-71.052,'+1 617 555 4102');
INSERT INTO pharmacies (id,name,address,latitude,longitude,phone) VALUES ('33333333-3333-3333-3333-333333333333','Riverside Community Pharmacy','18 Cambridge St, Cambridge MA',42.373,-71.110,'+1 617 555 4103');

----------------------------------------medications----------------------------------------

INSERT INTO medications (id,name,description) VALUES ('a1111111-1111-1111-1111-111111111111','Atorvastatin','Cholesterol lowering statin used to reduce cardiovascular risk');
INSERT INTO medications (id,name,description) VALUES ('a2222222-2222-2222-2222-222222222222','Lisinopril','ACE inhibitor used to treat hypertension and heart failure');
INSERT INTO medications (id,name,description) VALUES ('a3333333-3333-3333-3333-333333333333','Metformin','Oral medication used to control blood glucose in type 2 diabetes');
INSERT INTO medications (id,name,description) VALUES ('a4444444-4444-4444-4444-444444444444','Amoxicillin','Antibiotic used for bacterial infections');
INSERT INTO medications (id,name,description) VALUES ('a5555555-5555-5555-5555-555555555555','Hydrocortisone Cream','Topical steroid used for inflammatory skin conditions');
INSERT INTO medications (id,name,description) VALUES ('a6666666-6666-6666-6666-666666666666','Albuterol Inhaler','Bronchodilator used to relieve asthma symptoms');

----------------------------------------allergies----------------------------------------

INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','Penicillin','Rash','Moderate','2023-03-12');
INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','Shellfish','Swelling','Moderate','2022-06-10');

INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','Peanuts','Anaphylaxis','Severe','2018-04-14');
INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','Latex','Skin irritation','Mild','2021-11-09');

INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','Dust','Sneezing','Mild','2023-05-21');
INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','Pollen','Seasonal rhinitis','Mild','2024-04-02');

INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','Nickel','Skin rash','Mild','2022-02-18');
INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','Fragrance','Dermatitis','Moderate','2023-07-11');

INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','Shellfish','Swelling','Moderate','2019-09-02');
INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','Penicillin','Rash','Moderate','2020-01-03');

INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','Latex','Contact dermatitis','Moderate','2021-01-15');
INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','Dust','Sneezing','Mild','2023-05-12');

INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','Eggs','Hives','Mild','2017-04-08');
INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','Pollen','Sneezing','Mild','2023-03-12');

INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','Pollen','Allergic rhinitis','Mild','2023-03-20');
INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','Dust','Sneezing','Mild','2022-10-01');

INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','Sulfa drugs','Rash','Moderate','2021-08-11');
INSERT INTO allergies (patient_id,allergen,reaction,severity,recorded_at) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','Peanuts','Swelling','Moderate','2018-06-14');

----------------------------------------conditions----------------------------------------

INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','Hypertension','2022-01-15','Active','Monitoring blood pressure');
INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','High Cholesterol','2023-04-11','Active','Lifestyle modification recommended');

INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','Hyperlipidemia','2023-05-20','Active','Elevated LDL');
INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','Migraine','2018-06-14','Active','Triggered by stress');

INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','Type 2 Diabetes','2021-09-10','Active','Metformin therapy');
INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','Obesity','2020-02-01','Active','BMI monitoring');

INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','Eczema','2022-04-03','Active','Topical steroid treatment');
INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','Acne','2024-01-12','Active','Dermatology follow-up');

INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','Psoriasis','2020-11-11','Active','Moderate plaques');
INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','Hypertension','2019-07-01','Active','Medication prescribed');

INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','Acne Vulgaris','2024-01-12','Active','Topical therapy');
INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','Rosacea','2023-08-18','Active','Mild flare-ups');

INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','Asthma','2015-06-14','Active','Uses inhaler');
INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','Seasonal Allergies','2020-03-01','Active','Spring symptoms');

INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','Allergic Rhinitis','2022-03-01','Active','Seasonal allergies');
INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','Sinusitis','2023-10-14','Resolved','Antibiotic course');

INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','Childhood Asthma','2000-02-12','Resolved','No episodes recently');
INSERT INTO conditions (patient_id,condition_name,diagnosed_date,status,notes) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','Hypertension','2021-07-10','Active','Blood pressure monitoring');

----------------------------------------vaccinations----------------------------------------

INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','COVID-19 mRNA Vaccine',2,'2023-04-15','Boston Medical Center');
INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','Influenza Vaccine',1,'2024-10-10','Boston Medical Center');

INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','COVID-19 Vaccine',2,'2023-02-20','Harvard Health Clinic');
INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','Influenza Vaccine',1,'2024-09-15','Harvard Health Clinic');

INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','Hepatitis B',3,'2018-02-10','Cambridge Community Health');
INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','COVID Booster',1,'2024-01-11','Cambridge Community Health');

INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','COVID-19 mRNA Vaccine',2,'2023-06-10','Boston Medical Center');
INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','Influenza Vaccine',1,'2024-10-02','Boston Medical Center');

INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','COVID-19 Booster',1,'2024-01-12','Downtown Health Partners');
INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','Influenza Vaccine',1,'2024-09-25','Downtown Health Partners');

INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','HPV Vaccine',2,'2010-07-22','City Pediatric Clinic');
INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','Influenza Vaccine',1,'2024-10-01','City Pediatric Clinic');

INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','MMR',2,'1998-05-05','City Pediatric Clinic');
INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','COVID-19 Vaccine',2,'2023-03-12','Boston Medical Center');

INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','COVID-19 Vaccine',2,'2023-04-18','Boston Medical Center');
INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','Influenza Vaccine',1,'2024-10-15','Boston Medical Center');

INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','Tetanus Booster',1,'2022-08-15','Downtown Health Partners');
INSERT INTO vaccinations (patient_id,vaccine_name,dose_number,administered_date,provider) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','COVID Booster',1,'2024-01-03','Downtown Health Partners');

----------------------------------------appointments----------------------------------------

INSERT INTO appointments (patient_id,doctor_id,appointment_time,status,reason) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','52a1a426-1262-4c33-afd6-800a15dfa6e1','2025-03-14 23:00','SCHEDULED','Routine cardiac evaluation');
INSERT INTO appointments (patient_id,doctor_id,appointment_time,status,reason) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','52a1a426-1262-4c33-afd6-800a15dfa6e1','2025-03-14 23:00','SCHEDULED','Cholesterol management follow-up');
INSERT INTO appointments (patient_id,doctor_id,appointment_time,status,reason) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','52a1a426-1262-4c33-afd6-800a15dfa6e1','2025-03-14 23:30','SCHEDULED','Diabetes monitoring');

INSERT INTO appointments (patient_id,doctor_id,appointment_time,status,reason) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','74adfa59-3995-45ae-868c-0e2a0212dbb5','2025-03-14 23:00','SCHEDULED','Chronic eczema flare-up');
INSERT INTO appointments (patient_id,doctor_id,appointment_time,status,reason) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','74adfa59-3995-45ae-868c-0e2a0212dbb5','2025-03-14 23:00','SCHEDULED','Psoriasis evaluation');
INSERT INTO appointments (patient_id,doctor_id,appointment_time,status,reason) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','74adfa59-3995-45ae-868c-0e2a0212dbb5','2025-03-14 23:00','SCHEDULED','Acne treatment consultation');

INSERT INTO appointments (patient_id,doctor_id,appointment_time,status,reason) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','bdd723c2-f76e-4803-a641-343400e067d0','2025-03-14 23:30','SCHEDULED','Asthma management check');
INSERT INTO appointments (patient_id,doctor_id,appointment_time,status,reason) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','bdd723c2-f76e-4803-a641-343400e067d0','2025-03-14 23:15','SCHEDULED','Seasonal allergy symptoms');
INSERT INTO appointments (patient_id,doctor_id,appointment_time,status,reason) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','bdd723c2-f76e-4803-a641-343400e067d0','2025-03-14 23:45','SCHEDULED','Annual pediatric checkup');

----------------------------------------lab_results----------------------------------------

INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','LDL Cholesterol','135','mg/dL','2024-03-01','<130');
INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','HbA1c','5.8','%','2024-03-01','<5.7');

INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','Total Cholesterol','210','mg/dL','2024-04-12','<200');
INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','HDL','48','mg/dL','2024-04-12','>40');

INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','HbA1c','7.2','%','2024-05-08','<5.7');
INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','Fasting Glucose','146','mg/dL','2024-05-08','70-99');

INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','Vitamin D','26','ng/mL','2024-06-14','30-100');
INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','C-Reactive Protein','4.1','mg/L','2024-06-14','<3.0');

INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','Complete Blood Count','Normal','N/A','2024-07-02','Normal');
INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','ESR','24','mm/hr','2024-07-02','0-22');

INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','Hormonal Panel','Within expected range','N/A','2024-08-10','Normal');
INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','Vitamin B12','390','pg/mL','2024-08-10','200-900');

INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','Peak Flow','420','L/min','2024-09-01','>400');
INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','Oxygen Saturation','98','%','2024-09-01','95-100');

INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','Absolute Eosinophil Count','420','cells/uL','2024-10-05','30-350');
INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','IgE','155','IU/mL','2024-10-05','<100');

INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','Hemoglobin','14.8','g/dL','2024-11-11','13.5-17.5');
INSERT INTO lab_results (patient_id,test_name,result_value,unit,result_date,reference_range) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','Creatinine','1.0','mg/dL','2024-11-11','0.7-1.3');

----------------------------------------visit_notes----------------------------------------

INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','52a1a426-1262-4c33-afd6-800a15dfa6e1','Patient reports occasional chest tightness during brisk walking. No acute distress in clinic. Advised ECG and lipid panel follow-up.','2025-03-01 10:15:00');
INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','52a1a426-1262-4c33-afd6-800a15dfa6e1','Blood pressure mildly elevated. Discussed sodium restriction, exercise goals, and medication adherence.','2025-03-01 10:25:00');

INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','52a1a426-1262-4c33-afd6-800a15dfa6e1','Follow-up visit for hyperlipidemia. Patient has improved diet consistency but LDL remains above goal.','2025-03-02 11:10:00');
INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','52a1a426-1262-4c33-afd6-800a15dfa6e1','Headache history reviewed. Encouraged hydration, sleep hygiene, and symptom diary for migraine triggers.','2025-03-02 11:18:00');

INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','52a1a426-1262-4c33-afd6-800a15dfa6e1','Diabetes follow-up completed. Fasting glucose remains elevated; reinforced carbohydrate control and medication compliance.','2025-03-03 09:40:00');
INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','52a1a426-1262-4c33-afd6-800a15dfa6e1','Weight trends reviewed with patient. Recommended structured walking routine and repeat HbA1c in 3 months.','2025-03-03 09:50:00');

INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','74adfa59-3995-45ae-868c-0e2a0212dbb5','Eczema flare noted on bilateral forearms with mild erythema and itching. Continue topical steroid during flares.','2025-03-04 13:12:00');
INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','74adfa59-3995-45ae-868c-0e2a0212dbb5','Reviewed skin care routine and trigger avoidance including fragranced products and harsh soaps.','2025-03-04 13:20:00');

INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','74adfa59-3995-45ae-868c-0e2a0212dbb5','Psoriatic plaques persist over elbows and scalp with intermittent scaling. Symptoms currently stable.','2025-03-05 14:08:00');
INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','74adfa59-3995-45ae-868c-0e2a0212dbb5','Blood pressure reviewed during visit and remains controlled on current regimen. Continue current medications.','2025-03-05 14:18:00');

INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','74adfa59-3995-45ae-868c-0e2a0212dbb5','Patient presents with inflammatory acne over cheeks and chin. Discussed adherence to topical regimen.','2025-03-06 15:05:00');
INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','74adfa59-3995-45ae-868c-0e2a0212dbb5','Rosacea symptoms appear mild today. Advised daily sunscreen use and avoidance of known heat triggers.','2025-03-06 15:14:00');

INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','bdd723c2-f76e-4803-a641-343400e067d0','Asthma symptoms currently well controlled with rescue inhaler use only during exercise. No nighttime symptoms reported.','2025-03-07 10:38:00');
INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','bdd723c2-f76e-4803-a641-343400e067d0','Reviewed inhaler technique in clinic and updated action plan for seasonal symptom worsening.','2025-03-07 10:46:00');

INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','bdd723c2-f76e-4803-a641-343400e067d0','Patient reports nasal congestion, sneezing, and itchy eyes during spring months. Symptoms consistent with allergic rhinitis.','2025-03-08 11:22:00');
INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','bdd723c2-f76e-4803-a641-343400e067d0','Discussed daily antihistamine use during allergy season and reducing indoor allergen exposure.','2025-03-08 11:30:00');

INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','bdd723c2-f76e-4803-a641-343400e067d0','Annual wellness visit completed. No acute concerns reported; general health stable.','2025-03-09 09:55:00');
INSERT INTO visit_notes (patient_id,doctor_id,note,created_at) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','bdd723c2-f76e-4803-a641-343400e067d0','History of childhood asthma reviewed and remains inactive. Encouraged continued blood pressure monitoring at home.','2025-03-09 10:05:00');

----------------------------------------prescriptions----------------------------------------

INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','52a1a426-1262-4c33-afd6-800a15dfa6e1','a1111111-1111-1111-1111-111111111111','10mg','Once daily','2025-03-01','2025-09-01','Take in the evening after dinner');
INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','52a1a426-1262-4c33-afd6-800a15dfa6e1','a2222222-2222-2222-2222-222222222222','20mg','Once daily','2025-03-01','2025-09-01','Monitor blood pressure and avoid dehydration');

INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','52a1a426-1262-4c33-afd6-800a15dfa6e1','a1111111-1111-1111-1111-111111111111','20mg','Once daily','2025-03-02','2025-09-02','Take at bedtime for cholesterol control');
INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','52a1a426-1262-4c33-afd6-800a15dfa6e1','a2222222-2222-2222-2222-222222222222','10mg','Once daily','2025-03-02','2025-09-02','Continue unless dizziness or low blood pressure occurs');

INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','52a1a426-1262-4c33-afd6-800a15dfa6e1','a3333333-3333-3333-3333-333333333333','500mg','Twice daily','2025-03-03','2025-09-03','Take with meals to reduce stomach upset');
INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','52a1a426-1262-4c33-afd6-800a15dfa6e1','a2222222-2222-2222-2222-222222222222','10mg','Once daily','2025-03-03','2025-09-03','Check blood pressure twice weekly');

INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','74adfa59-3995-45ae-868c-0e2a0212dbb5','a5555555-5555-5555-5555-555555555555','Apply thin layer','Twice daily','2025-03-04','2025-05-04','Apply only to affected areas for eczema flare');
INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','74adfa59-3995-45ae-868c-0e2a0212dbb5','a4444444-4444-4444-4444-444444444444','500mg','Three times daily','2025-03-04','2025-03-11','Complete full antibiotic course if skin infection worsens');

INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','74adfa59-3995-45ae-868c-0e2a0212dbb5','a5555555-5555-5555-5555-555555555555','Apply thin layer','Twice daily','2025-03-05','2025-05-05','Use over plaques and avoid broken skin');
INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','74adfa59-3995-45ae-868c-0e2a0212dbb5','a2222222-2222-2222-2222-222222222222','20mg','Once daily','2025-03-05','2025-09-05','Continue home blood pressure log');

INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','74adfa59-3995-45ae-868c-0e2a0212dbb5','a5555555-5555-5555-5555-555555555555','Apply sparingly','Once daily','2025-03-06','2025-04-20','Use for rosacea-prone inflamed areas only as directed');
INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','74adfa59-3995-45ae-868c-0e2a0212dbb5','a4444444-4444-4444-4444-444444444444','500mg','Twice daily','2025-03-06','2025-03-13','Take only if secondary bacterial skin infection develops');

INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','bdd723c2-f76e-4803-a641-343400e067d0','a6666666-6666-6666-6666-666666666666','2 puffs','Every 6 hours as needed','2025-03-07','2026-03-07','Use for wheezing or shortness of breath');
INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','bdd723c2-f76e-4803-a641-343400e067d0','a4444444-4444-4444-4444-444444444444','500mg','Three times daily','2025-03-07','2025-03-14','Use only if bacterial respiratory infection is confirmed');

INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','bdd723c2-f76e-4803-a641-343400e067d0','a6666666-6666-6666-6666-666666666666','2 puffs','As needed before exertion','2025-03-08','2026-03-08','Carry inhaler during allergy season if breathing tightness occurs');
INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','bdd723c2-f76e-4803-a641-343400e067d0','a4444444-4444-4444-4444-444444444444','500mg','Twice daily','2025-03-08','2025-03-15','Reserve for sinus infection symptoms with fever or purulent discharge');

INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','bdd723c2-f76e-4803-a641-343400e067d0','a2222222-2222-2222-2222-222222222222','10mg','Once daily','2025-03-09','2025-09-09','Check blood pressure at home and limit excess sodium');
INSERT INTO prescriptions (patient_id,doctor_id,medication_id,dosage,frequency,start_date,end_date,instructions) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','bdd723c2-f76e-4803-a641-343400e067d0','a6666666-6666-6666-6666-666666666666','2 puffs','As needed','2025-03-09','2026-03-09','Keep available given remote asthma history and occasional seasonal symptoms');

----------------------------------------vitals----------------------------------------

INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','2024-01-10 09:00',72,120,80,98.6,98,82,178);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','2024-06-10 09:00',74,125,82,98.7,97,83,178);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('47d5f15d-bd2f-413d-941b-97e744aa7ba4','2025-01-15 09:00',70,118,78,98.5,99,81,178);

INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','2024-02-11 10:00',76,128,84,98.6,97,70,165);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','2024-07-12 10:00',74,124,82,98.5,98,69,165);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('806a7559-ce1c-4bc8-893f-9b907b535dc7','2025-02-10 10:00',72,122,80,98.6,98,68,165);

INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','2024-03-05 08:45',80,132,88,98.9,96,96,182);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','2024-08-10 08:45',78,130,86,98.7,97,95,182);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('1fdcbdf5-b891-407b-8ea2-fa4b7560ba73','2025-02-14 08:45',76,128,84,98.6,97,94,182);

INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','2024-02-20 11:00',70,118,76,98.5,99,60,168);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','2024-09-21 11:00',72,120,78,98.6,99,61,168);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('f1cefb48-e04f-424e-b365-42342b863a1f','2025-02-01 11:00',71,119,77,98.6,99,60,168);

INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','2024-01-15 13:00',75,140,90,98.7,97,88,175);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','2024-07-18 13:00',73,136,88,98.6,97,87,175);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('2bd5c13a-61bb-4bdf-aedf-05af7620e1d0','2025-02-12 13:00',72,132,86,98.6,98,86,175);

INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','2024-04-10 14:00',72,118,76,98.5,99,64,170);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','2024-09-12 14:00',73,120,78,98.6,99,65,170);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('491e5e4f-4dca-43db-bc79-efc524509bcd','2025-02-15 14:00',71,118,76,98.6,99,64,170);

INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','2024-03-11 10:30',82,122,80,98.7,96,75,180);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','2024-08-11 10:30',78,120,78,98.6,97,74,180);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('6e18e583-9c8b-42f4-b37c-a10346daaa52','2025-02-16 10:30',76,118,76,98.6,98,73,180);

INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','2024-04-08 09:40',78,116,74,98.5,98,62,167);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','2024-09-10 09:40',76,118,76,98.6,98,63,167);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('81cdcccf-17e5-4f00-a01d-2a19b918eec8','2025-02-11 09:40',75,116,74,98.6,99,62,167);

INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','2024-05-05 12:00',72,130,84,98.6,98,85,176);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','2024-10-05 12:00',71,128,82,98.6,98,84,176);
INSERT INTO vitals (patient_id,recorded_at,heart_rate,systolic_bp,diastolic_bp,temperature,oxygen_saturation,weight,height) VALUES ('c1c805dd-fe44-46a4-84cd-7adc0c1eaa2f','2025-02-18 12:00',70,126,80,98.5,99,83,176);

----------------------------------------end----------------------------------------