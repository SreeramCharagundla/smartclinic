
--------------------------------------------------------------------------------------------------------

-- INSERT INTO doctor_patients (doctor_id, patient_id) VALUES
-- ('dab4deb8-23a8-48aa-ba72-bd79f9573c09','35970954-c880-4f89-8aa9-0e324089eac4'),
-- ('dab4deb8-23a8-48aa-ba72-bd79f9573c09','330b8319-c7b2-4d9c-b011-3bb68c323966'),

-- ('70a6745d-ccfe-4373-8442-015f039f3083','64164712-7fe7-4f48-808b-9c2f1a6d199f'),
-- ('70a6745d-ccfe-4373-8442-015f039f3083','3c4b9c7e-ba54-4cc8-b25a-4088740ca31f');

--------------------------------------------------------------------------------------------------------

-- INSERT INTO medications (name, description) VALUES
-- ('Amoxicillin','Antibiotic used for bacterial infections'),
-- ('Ibuprofen','Pain reliever and anti inflammatory'),
-- ('Metformin','Used to control blood sugar levels'),
-- ('Lisinopril','Medication used to treat high blood pressure'),
-- ('Atorvastatin','Used to lower cholesterol');

--------------------------------------------------------------------------------------------------------

-- INSERT INTO appointments (patient_id, doctor_id, appointment_time, status, reason) VALUES
-- ('35970954-c880-4f89-8aa9-0e324089eac4','dab4deb8-23a8-48aa-ba72-bd79f9573c09','2026-03-06 21:00','SCHEDULED','Annual checkup'),
-- ('330b8319-c7b2-4d9c-b011-3bb68c323966','dab4deb8-23a8-48aa-ba72-bd79f9573c09','2026-03-06 21:30','SCHEDULED','General consultation'),

-- ('64164712-7fe7-4f48-808b-9c2f1a6d199f','70a6745d-ccfe-4373-8442-015f039f3083','2026-03-06 21:45','SCHEDULED','Skin rash'),
-- ('3c4b9c7e-ba54-4cc8-b25a-4088740ca31f','70a6745d-ccfe-4373-8442-015f039f3083','2026-03-06 22:30','SCHEDULED','Dermatology consultation');

--------------------------------------------------------------------------------------------------------

-- INSERT INTO prescriptions (patient_id, doctor_id, medication_id, dosage, frequency, start_date, end_date, instructions)
-- VALUES
-- (
-- '35970954-c880-4f89-8aa9-0e324089eac4',
-- 'dab4deb8-23a8-48aa-ba72-bd79f9573c09',
-- (SELECT id FROM medications WHERE name='Amoxicillin'),
-- '500mg',
-- 'Twice daily',
-- '2025-03-01',
-- '2025-03-07',
-- 'Take after meals'
-- ),

-- (
-- '330b8319-c7b2-4d9c-b011-3bb68c323966',
-- 'dab4deb8-23a8-48aa-ba72-bd79f9573c09',
-- (SELECT id FROM medications WHERE name='Ibuprofen'),
-- '200mg',
-- 'Every 8 hours',
-- '2025-03-03',
-- '2025-03-10',
-- 'Take with water'
-- ),

-- (
-- '64164712-7fe7-4f48-808b-9c2f1a6d199f',
-- '70a6745d-ccfe-4373-8442-015f039f3083',
-- (SELECT id FROM medications WHERE name='Metformin'),
-- '500mg',
-- 'Twice daily',
-- '2025-03-04',
-- '2025-09-04',
-- 'Monitor blood sugar'
-- ),

-- (
-- '3c4b9c7e-ba54-4cc8-b25a-4088740ca31f',
-- '70a6745d-ccfe-4373-8442-015f039f3083',
-- (SELECT id FROM medications WHERE name='Lisinopril'),
-- '10mg',
-- 'Once daily',
-- '2025-03-05',
-- '2025-09-05',
-- 'Take in the morning'
-- );

--------------------------------------------------------------------------------------------------------

-- INSERT INTO vaccinations (patient_id, vaccine_name, dose_number, administered_date, provider) VALUES

-- ('35970954-c880-4f89-8aa9-0e324089eac4','COVID-19',1,'2022-01-10','Boston Health Clinic'),
-- ('35970954-c880-4f89-8aa9-0e324089eac4','Influenza',1,'2024-10-12','Boston Health Clinic'),

-- ('330b8319-c7b2-4d9c-b011-3bb68c323966','COVID-19',2,'2022-02-15','Boston Health Clinic'),
-- ('330b8319-c7b2-4d9c-b011-3bb68c323966','Influenza',1,'2024-11-01','Boston Health Clinic'),

-- ('64164712-7fe7-4f48-808b-9c2f1a6d199f','Tetanus',1,'2023-03-01','City Medical Center'),
-- ('64164712-7fe7-4f48-808b-9c2f1a6d199f','Influenza',1,'2024-10-05','City Medical Center'),

-- ('3c4b9c7e-ba54-4cc8-b25a-4088740ca31f','COVID-19',1,'2021-08-01','Cambridge Hospital'),
-- ('3c4b9c7e-ba54-4cc8-b25a-4088740ca31f','Influenza',1,'2024-09-20','Cambridge Hospital');

--------------------------------------------------------------------------------------------------------

-- INSERT INTO vitals
-- (patient_id, recorded_at, heart_rate, systolic_bp, diastolic_bp, temperature, oxygen_saturation, weight, height)
-- VALUES

-- -- Jane Doe
-- ('35970954-c880-4f89-8aa9-0e324089eac4','2025-01-01',72,120,80,98.6,98,65,165),
-- ('35970954-c880-4f89-8aa9-0e324089eac4','2025-01-15',74,122,82,98.7,97,65.5,165),
-- ('35970954-c880-4f89-8aa9-0e324089eac4','2025-02-01',75,119,79,98.5,99,65.2,165),
-- ('35970954-c880-4f89-8aa9-0e324089eac4','2025-02-20',73,121,80,98.6,98,65.4,165),

-- -- Sreeram
-- ('330b8319-c7b2-4d9c-b011-3bb68c323966','2025-01-01',78,125,84,98.8,98,82,178),
-- ('330b8319-c7b2-4d9c-b011-3bb68c323966','2025-01-15',80,128,85,98.7,97,82.5,178),
-- ('330b8319-c7b2-4d9c-b011-3bb68c323966','2025-02-01',77,124,83,98.6,98,81.9,178),
-- ('330b8319-c7b2-4d9c-b011-3bb68c323966','2025-02-20',79,126,84,98.9,98,82.3,178),

-- -- Aaron
-- ('64164712-7fe7-4f48-808b-9c2f1a6d199f','2025-01-05',70,118,78,98.5,99,75,172),
-- ('64164712-7fe7-4f48-808b-9c2f1a6d199f','2025-01-25',72,119,79,98.6,98,75.3,172),
-- ('64164712-7fe7-4f48-808b-9c2f1a6d199f','2025-02-10',71,117,77,98.4,99,75.1,172),
-- ('64164712-7fe7-4f48-808b-9c2f1a6d199f','2025-02-28',73,120,80,98.7,98,75.5,172),

-- -- Bryan
-- ('3c4b9c7e-ba54-4cc8-b25a-4088740ca31f','2025-01-03',76,122,82,98.6,97,90,180),
-- ('3c4b9c7e-ba54-4cc8-b25a-4088740ca31f','2025-01-20',77,123,83,98.7,97,90.4,180),
-- ('3c4b9c7e-ba54-4cc8-b25a-4088740ca31f','2025-02-05',75,121,81,98.6,98,89.9,180),
-- ('3c4b9c7e-ba54-4cc8-b25a-4088740ca31f','2025-02-25',78,124,84,98.8,97,90.2,180);

--------------------------------------------------------------------------------------------------------

-- new tables data in Sreeram

INSERT INTO allergies (patient_id, allergen, reaction, severity, recorded_at)
VALUES
('330b8319-c7b2-4d9c-b011-3bb68c323966','Penicillin','Skin rash','Moderate','2023-05-10'),
('330b8319-c7b2-4d9c-b011-3bb68c323966','Peanuts','Anaphylaxis','Severe','2021-08-15'),
('330b8319-c7b2-4d9c-b011-3bb68c323966','Dust','Sneezing and irritation','Mild','2022-02-11');

INSERT INTO conditions (patient_id, condition_name, diagnosed_date, status, notes)
VALUES
('330b8319-c7b2-4d9c-b011-3bb68c323966','Hypertension','2022-09-15','Active','Patient advised to monitor blood pressure regularly'),
('330b8319-c7b2-4d9c-b011-3bb68c323966','Seasonal Allergies','2021-04-10','Controlled','Symptoms worsen during spring season'),
('330b8319-c7b2-4d9c-b011-3bb68c323966','Vitamin D Deficiency','2023-01-20','Resolved','Vitamin supplements prescribed for 3 months');

INSERT INTO lab_results (patient_id, test_name, result_value, unit, reference_range, result_date)
VALUES
('330b8319-c7b2-4d9c-b011-3bb68c323966','Hemoglobin','13.8','g/dL','13.5 - 17.5','2025-01-10'),
('330b8319-c7b2-4d9c-b011-3bb68c323966','Cholesterol','215','mg/dL','<200','2025-01-10'),
('330b8319-c7b2-4d9c-b011-3bb68c323966','HbA1c','6.2','%','4.0 - 5.6','2025-01-10'),
('330b8319-c7b2-4d9c-b011-3bb68c323966','Vitamin D','28','ng/mL','30 - 100','2024-10-02');

INSERT INTO visit_notes (patient_id, doctor_id, note, created_at)
VALUES
(
'330b8319-c7b2-4d9c-b011-3bb68c323966',
'dab4deb8-23a8-48aa-ba72-bd79f9573c09',
'Patient complained of mild headaches and fatigue for the past week. Blood pressure slightly elevated. Recommended hydration, regular sleep, and follow-up monitoring.',
'2025-01-10'
),

(
'330b8319-c7b2-4d9c-b011-3bb68c323966',
'dab4deb8-23a8-48aa-ba72-bd79f9573c09',
'Routine follow-up visit. Vitals stable. Patient reports improved energy levels after vitamin supplementation.',
'2025-02-20'
);


--------------------------------------------------------------------------------------------------------