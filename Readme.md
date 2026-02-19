# SurgiSense

SurgiSense is a surgical decision-support platform that combines real-time intraoperative sensing, clinician-facing dashboards, and backend analysis to improve situational awareness and patient safety in the operating room.

Table of contents
- Overview
- Key features
- Architecture
- Quickstart
- Configuration
- API & usage
- Data & privacy
- Development
- Contributing
- License & contact

**Overview**

SurgiSense provides a modular system for collecting surgical device and patient telemetry, analyzing events with configurable rules and ML models, and surfacing actionable alerts and visualizations to clinicians through a secure web dashboard. The repository is split into `Backend/` and `Frontend/` folders for server- and client-side code.

**Key features**

- **Real-time telemetry ingestion:** Accepts streaming data from OR devices and instruments.
- **Event detection & alerts:** Rule-based and ML-driven detection for clinically important events.
- **Web dashboard:** Live visualizations, event timeline, and case recording playback.
- **Secure storage & export:** Encrypted storage and optional FHIR/HL7 export hooks.
- **Extensible architecture:** Clear separation of backend services and frontend UI for easy extension.

**Architecture**

- **Backend:** REST and/or WebSocket APIs, data ingestion, event processing, storage, and model serving. (See `Backend/`.)
- **Frontend:** Single-page application that connects to backend APIs for live updates and historical views. (See `Frontend/`.)
- **Data flow:** Devices → Ingest service → Processing/ML → Event store → Dashboard.

**Quickstart**

Prerequisites:

- `Python 3.9+` (backend)
- `Node.js 16+` and `npm` or `yarn` (frontend)

Backend (example):

1. Create a virtual environment and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r Backend/requirements.txt
```

2. Set environment variables (example):

```bash
export SURGISENSE_SECRET_KEY="replace-with-secret"
export DATABASE_URL="postgresql://user:pass@localhost/surgisense"
```

3. Run the backend server:

```bash
cd Backend
./run_server.sh   # or `uvicorn app.main:app --reload`
```

Frontend (example):

```bash
cd Frontend
npm install
npm run dev
```

Open the dashboard at `http://localhost:3000` (or as configured).

**Configuration**

- Keep configuration in environment variables or a `.env` file consumed by the backend and frontend build.
- Examples: secret keys, database URL, external model endpoints, telemetry ingestion ports, and allowed CORS origins.

**API & usage**

- The backend exposes REST endpoints for configuration, historical queries, and authentication, and WebSocket endpoints for live telemetry and event streams.
- Authentication: token-based (JWT) or other pluggable providers. Protect all write and streaming endpoints.
- For integration with OR devices, use the ingestion endpoints documented in `Backend/README.md` (or the internal API docs).

**Data & privacy**

- Designed to minimize PHI exposure: only collect what is necessary for clinical value.
- Support for encryption at rest and in transit. Follow your institution's policies for patient data and logging.

**Development**

- Run unit tests in `Backend/` and `Frontend/` using the project test runners (e.g., `pytest`, `npm test`).
- Follow code style and linting in each folder. Add reproducible environment steps when adding new services.

**Contributing**

- Fork the repo, create feature branches, and open a Pull Request with a clear description and tests where applicable.
- Include schema migrations and API changes in PRs when backend models are modified.

**License & contact**

- License: MIT (update if needed).
- Product brief and additional context: [SurgiSense.pdf](SurgiSense.pdf)
- Questions / contact: add project maintainer contact information here.

---

If you want, I can:

- Add example `.env` templates for both `Backend/` and `Frontend/`.
- Generate API reference stubs from the backend code.
- Create a short CONTRIBUTING.md and PR checklist.

File updated: [Readme.md](Readme.md)
