# SmartClinic Backend

Spring Boot backend for SmartClinic medical application. Provides authentication and registration for patients and doctors.

## Requirements

- Java 17
- Maven
- PostgreSQL (database: `medical_app`, user: `admin`, password: `admin`, port: 5432)

## Run

```bash
mvn spring-boot:run
```

Server runs at `http://localhost:8080`.

## API

### Auth (no JWT required)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register/patient` | Register a patient |
| POST | `/auth/register/doctor` | Register a doctor |
| POST | `/auth/login` | Login (email + password) |

### Request/Response

**Register patient** – `POST /auth/register/patient`

```json
{
  "email": "patient@example.com",
  "password": "secret123",
  "patient": {
    "first_name": "Jane",
    "last_name": "Doe",
    "dob": "1990-01-15",
    "gender": "Female",
    "phone": "+1234567890",
    "address": "123 Main St",
    "blood_type": "O+"
  }
}
```

**Register doctor** – `POST /auth/register/doctor`

```json
{
  "email": "doctor@example.com",
  "password": "secret123",
  "doctor": {
    "first_name": "John",
    "last_name": "Smith",
    "speciality": "Cardiology",
    "license_number": "LIC123",
    "clinic_address": "456 Clinic Rd",
    "phone": "+0987654321"
  }
}
```

**Login** – `POST /auth/login`

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

**Success response (register/login):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "email": "user@example.com",
    "role": "patient"
  }
}
```

Use the token in subsequent requests: `Authorization: Bearer <token>`.

### Error responses

- `USER_ALREADY_EXISTS` (409) – Email already registered
- `INVALID_CREDENTIALS` (401) – Wrong email or password
- `VALIDATION_ERROR` (400) – Invalid request body

## Configuration

See `src/main/resources/application.properties` for:

- Data source (PostgreSQL)
- JWT secret and expiration
- CORS allowed origins (default: `http://localhost:4200`)
