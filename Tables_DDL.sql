CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
commit;

CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    dob DATE,
    gender VARCHAR(10),
    phone VARCHAR(20),
    address TEXT,
    blood_type VARCHAR(5),

    FOREIGN KEY (user_id) REFERENCES users(id)
);commit;

CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    specialty VARCHAR(100),
    license_number VARCHAR(100),
    clinic_address TEXT,
    phone VARCHAR(20),

    FOREIGN KEY (user_id) REFERENCES users(id)
);commit;

CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID,
    doctor_id UUID,
    appointment_time TIMESTAMP,
    status VARCHAR(30),
    reason TEXT,

    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);commit;

CREATE TABLE vitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID,
    recorded_at TIMESTAMP,
    heart_rate INT,
    systolic_bp INT,
    diastolic_bp INT,
    temperature DECIMAL,
    oxygen_saturation DECIMAL,
    weight DECIMAL,
    height DECIMAL,

    FOREIGN KEY (patient_id) REFERENCES patients(id)
);commit;

CREATE TABLE medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    description TEXT
);commit;

CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID,
    doctor_id UUID,
    medication_id UUID,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    start_date DATE,
    end_date DATE,
    instructions TEXT,

    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (medication_id) REFERENCES medications(id)
);commit;

CREATE TABLE vaccinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID,
    vaccine_name VARCHAR(255),
    dose_number INT,
    administered_date DATE,
    provider VARCHAR(255),

    FOREIGN KEY (patient_id) REFERENCES patients(id)
);commit;

CREATE TABLE pharmacies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    address TEXT,
    latitude DECIMAL,
    longitude DECIMAL,
    phone VARCHAR(20)
);commit;


CREATE TABLE doctor_patients (
    doctor_id UUID,
    patient_id UUID,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (doctor_id, patient_id),

    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);commit;

CREATE TABLE allergies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID,
    allergen VARCHAR(255),
    reaction VARCHAR(255),
    severity VARCHAR(50),
    recorded_at DATE,

    FOREIGN KEY (patient_id) REFERENCES patients(id)
);commit;

CREATE TABLE conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID,
    condition_name VARCHAR(255),
    diagnosed_date DATE,
    status VARCHAR(50),
    notes TEXT,

    FOREIGN KEY (patient_id) REFERENCES patients(id)
);commit;

CREATE TABLE lab_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID,
    test_name VARCHAR(255),
    result_value VARCHAR(100),
    unit VARCHAR(50),
    result_date DATE,
    reference_range VARCHAR(100),

    FOREIGN KEY (patient_id) REFERENCES patients(id)
);commit;

CREATE TABLE visit_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID,
    doctor_id UUID,
    note TEXT,
    created_at TIMESTAMP,

    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);commit;