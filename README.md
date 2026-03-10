# SmartClinic

SmartClinic is an AI-enabled clinical operations platform built for modern care delivery.

It brings doctor workflows, patient intelligence, and clinical decision support into one integrated system. The platform combines a high-performance Angular frontend, a layered Spring Boot backend, and PostgreSQL data persistence to deliver a unified doctor experience across appointments, longitudinal patient records, and AI-assisted clinical interpretation.

## Table of Contents

- [Platform Vision](#platform-vision)
- [Core Capabilities](#core-capabilities)
- [Technical Architecture](#technical-architecture)
- [Repository Layout](#repository-layout)
- [Domain Model Coverage](#domain-model-coverage)
- [Backend API Surface](#backend-api-surface-doctor-portal)
- [Local Setup](#local-setup)
- [Strategic Direction](#strategic-direction)
- [Author](#author)

## Platform Vision

SmartClinic is designed to support the full clinical loop:

- Acquire accurate patient and doctor records
- Organize care interactions through structured appointments
- Surface health signals through vitals, prescriptions, and vaccinations
- Enable faster clinical reasoning through a built-in AI assistant
- Present everything in a responsive, professional doctor portal

The result is a system that is both operationally practical for day-to-day clinical use and extensible for advanced AI-driven healthcare intelligence.

## Core Capabilities

### 1. Role-Oriented Access and Account Lifecycle

SmartClinic supports dedicated onboarding and login flows for both patients and doctors. The account model is structured around healthcare identity and role context, ensuring that portal experiences and APIs remain domain-specific.

Capabilities include:

- Patient registration with medical baseline fields
- Doctor registration with specialty, license, and clinic details
- Authenticated access to protected clinical features

### 2. Doctor Portal Experience

The Doctor Portal is implemented with Angular standalone architecture and Angular Material components, providing a clean and scalable UX foundation.

Key portal capabilities:

- Persistent top navigation and sidebar workspace
- Fast route-based navigation between core doctor modules
- Unified layout across dashboard, appointments, patient discovery, and profile management
- Responsive behavior for desktop and mobile form factors

### 3. Clinical Dashboard and Workflow Navigation

The dashboard provides an immediate entry point into doctor operations while preserving extensibility for future analytics and workload telemetry.

Current workflow modules:

- Dashboard
- Appointments
- Patient Search
- Patient Profile
- Doctor Profile

### 4. Appointment Intelligence for Daily Practice

SmartClinic supports doctor-centric appointment retrieval for current clinical schedules.

Appointment capabilities:

- Fetch today’s appointments for a doctor
- Display patient context, visit reason, status, and time
- Transition directly from appointment rows to patient clinical detail pages

This enables appointment-to-record continuity without context switching.

### 5. Patient Discovery and Chart Access

Patient lookup is designed for speed and precision in real consultation settings.

Capabilities:

- Name-based patient search (first/last)
- Low-friction autocomplete style retrieval
- Immediate navigation to full patient profile from search result

### 6. Longitudinal Patient Clinical Profile

Patient profile pages aggregate core identity and care history into a single clinical surface.

Patient profile capabilities:

- Demographics and contact details
- Date of birth and derived age
- Blood type and address context
- Clinical sections for:
  - Prescriptions
  - Vitals
  - Vaccinations

This creates a compact but information-dense charting view suitable for follow-up and treatment planning.

### 7. Clinical AI Assistant in Doctor Workspace

SmartClinic includes an embedded Clinical AI Assistant directly inside the Doctor Portal.

Assistant capabilities:

- Floating, always-available doctor-side chat interface
- Contextual question/answer flow for clinical support
- Continuous session behavior while navigating doctor routes
- Frontend architecture prepared for direct Spring AI orchestration

This assistant is positioned as a force multiplier for clinical interpretation, summarization, and rapid review workflows.

## Technical Architecture

SmartClinic follows a modular layered architecture:

- Frontend (Angular 17 + Angular Material)
  - Doctor and public user interfaces
  - Reactive data flows and route-driven feature composition
- Backend (Spring Boot + Spring Data JPA + service layering)
  - Controller layer for HTTP contracts
  - Service layer for clinical/business logic
  - Repository layer for data operations
- Database (PostgreSQL)
  - Relational schema for users, doctors, patients, appointments, vitals, prescriptions, and vaccinations

This architecture provides clear separation of concerns, easier testing, and controlled growth as features evolve.

## Repository Layout

```text
smartclinic/
├── smartclinic-frontend/
├── smartclinic-backend/
├── Tables_DDL.sql
├── insert_data.sql
└── README.md
```

## Domain Model Coverage

SmartClinic currently models the following healthcare entities:

- Users
- Doctors
- Patients
- Appointments
- Prescriptions
- Medications
- Vitals
- Vaccinations
- Doctor-patient assignments

This model supports both transactional workflow execution and future intelligence layers.

## Backend API Surface (Doctor Portal)

The platform exposes dedicated doctor-portal APIs for profile, schedule, and patient clinical access:

- `GET /doctors/me`
- `GET /doctors/{doctorId}`
- `GET /doctors/{doctorId}/appointments/today`
- `GET /patients/search?query={name}`
- `GET /patients/{patientId}`
- `GET /patients/{patientId}/prescriptions`
- `GET /patients/{patientId}/vitals`
- `GET /patients/{patientId}/vaccinations`

These endpoints provide the core contract for doctor workflow orchestration from frontend to backend.

## Local Setup

### Prerequisites

- Node.js LTS + npm
- Java 17
- PostgreSQL
- Maven (or use Maven Wrapper)

### Database

1. Create PostgreSQL database: `medical_app`
2. Execute schema: `Tables_DDL.sql`
3. (Optional) Seed sample data: `insert_data.sql`

Default backend DB config (in `smartclinic-backend/src/main/resources/application.properties`):

- `spring.datasource.url=jdbc:postgresql://localhost:5432/medical_app`
- `spring.datasource.username=admin`
- `spring.datasource.password=admin`

### Run Backend

```bash
cd smartclinic-backend
./mvnw spring-boot:run
```

Backend: `http://localhost:8080`

### Run Frontend

```bash
cd smartclinic-frontend
npm install
npm start
```

Frontend: `http://localhost:4200`

## Strategic Direction

SmartClinic is engineered as a clinical platform foundation rather than a narrow demo application. The architecture supports progression into:

- Advanced Spring AI clinical reasoning pipelines
- Provider-facing productivity copilots
- Intelligent trend and risk interpretation
- Operational analytics for care delivery quality
- Broader interoperability across healthcare data workflows

## Author

Sreeram Charagundla
