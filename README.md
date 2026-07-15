# 🏥 Lifecare Management Portal

Lifecare is a modern, responsive, and feature-rich Hospital Management System (HMS) designed to streamline clinical operations. Built as a high-performance Single Page Application (SPA) using vanilla web technologies, it provides real-time client-side simulation, offline-first data persistence, and a modular architecture.

---

## 🚀 Key Features

### 1. 📊 Interactive Dashboard
- **Real-time Metrics:** Displays core operational stats (Total Patients, Admitted Patients, Appointments Today, Pending Labs, and Available Doctors).
- **Dynamic Calculation:** Automatically computes stats on-the-fly as patient records or doctor schedules change.

### 2. 👥 Patient Directory & Electronic Health Records (EHR)
- **Dual View Mode:** Toggle between clean tabular list views or detailed card grids.
- **State Indicator Badge:** Visual cues for patient status: `Admitted` (Green), `Outpatient` (Blue), `Emergency` (Red), `Observation` (Amber), and `Discharged` (Gray).
- **Vitals Monitoring:** Real-time logging of Heart Rate (bpm), Blood Pressure (mmHg), and Body Temperature (°C).
- **Clinical Care Logs:** Persistent chronological logs for medical notes and staff write-ups.
- **EHR Drawer:** Interactive slide-out drawer containing the complete patient chart, vitals trend history, and timeline logs.

### 3. 🩺 Doctor Registry & Shift Scheduler
- **Duty Roster:** Monitor doctor availability (`Available`, `On-Duty`, or `Absent`), ratings, experience levels, and schedules.
- **Dynamic Shifts:** Map morning, afternoon, and night shift coverage to doctors across major departments (Cardiology, Emergency, Pediatrics, Radiology, Neurology, and Orthopedics).

### 4. 📅 Appointment Scheduler
- Confirm patient bookings, manage appointment statuses, assign specific doctors, and schedule timestamps.

### 5. 💳 Billing & Invoicing
- Generate detailed billing invoices showing itemized sub-totals, tax calculations, and insurance deductions.
- Categorize invoice status (`Paid`, `Pending`, or `Overdue`) with instant status badge changes.

### 6. 💾 Offline-First Persistence
- Built-in automatic synchronization with client-side `localStorage`.
- Comprehensive seed data fallback so the application works out-of-the-box on clean installations.

---

## 📂 Project Structure

The project has been refactored into a highly modular CSS and template structure to ensure maintainability:

```text
Lifecare Management/
├── .firebase/             # Firebase cache
├── .vscode/               # VS Code project settings
├── public/                # Web application assets
│   ├── css/               # Styling directory
│   │   ├── sections/      # Modular component/page CSS stylesheets
│   │   │   ├── appointments.css
│   │   │   ├── base.css
│   │   │   ├── billing.css
│   │   │   ├── components.css
│   │   │   ├── dashboard.css
│   │   │   ├── departments.css
│   │   │   ├── doctors.css
│   │   │   ├── ehr-drawer.css
│   │   │   ├── header.css
│   │   │   ├── layout.css
│   │   │   ├── modals.css
│   │   │   ├── patients.css
│   │   │   ├── responsive.css
│   │   │   ├── sidebar.css
│   │   │   ├── table.css
│   │   │   └── themes.css
│   │   └── style.css      # Core stylesheet (imports sections)
│   ├── js/
│   │   └── app.js         # Core application state, router, and DOM logic
│   ├── partials/          # Modular HTML partials for routing
│   │   ├── appointments.html
│   │   ├── billing.html
│   │   ├── dashboard.html
│   │   ├── departments.html
│   │   ├── doctors.html
│   │   ├── ehr-drawer.html
│   │   ├── modal-doctor.html
│   │   ├── modal-patient.html
│   │   ├── modals-misc.html
│   │   ├── patients.html
│   │   └── sidebar.html
│   ├── index.html         # Application container shell
│   └── lifecare 1.png     # Application logo/assets
├── .firebaserc            # Firebase project configuration
├── firebase.json          # Firebase hosting rules
├── README.md              # Project documentation
└── .gitignore             # Git exclusion rules
```

---

## 🛠️ Technology Stack
- **Structure:** Semantic HTML5 and modular partials.
- **Styling:** Custom Vanilla CSS3 with global custom properties (CSS variables) for modern theme capabilities.
- **Icons:** FontAwesome v5.15.4 CDN.
- **Logic:** Vanilla ES6+ JavaScript (State management, routers, template loader, validation).
- **Deployment:** Firebase Hosting.

---

## 💻 Local Setup & Development

To run the application locally on your machine, you can choose one of the following methods:

### Option A: Using Firebase CLI (Recommended)
Since the project is already pre-configured for Firebase, you can serve it using the Firebase CLI:
1. Install Firebase CLI globally (if you haven't already):
   ```bash
   npm install -g firebase-tools
   ```
2. Log into your Firebase account:
   ```bash
   firebase login
   ```
3. Start the local server:
   ```bash
   firebase serve
   ```
4. Open [http://localhost:5000](http://localhost:5000) in your browser.

### Option B: Using standard HTTP Server
Alternatively, you can run it using any static file server:
```bash
# Using Node.js npx:
npx http-server public

# Or using Python 3:
python -m http.server --directory public 8000
```

---

## 🚀 Firebase Deployment

To deploy updates to Firebase Hosting:
1. Ensure the workspace is logged in and configured to the correct project:
   ```bash
   firebase use --add
   ```
2. Deploy the `public` folder to the live hosting instance:
   ```bash
   firebase deploy
   ```
