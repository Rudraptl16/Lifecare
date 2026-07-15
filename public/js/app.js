(function () {
  "use strict";

  // =========================
  // Data + persistence
  // =========================
  const STORAGE_KEY = "lifecare_patients_v1";

  const seedPatients = [
    {
      id: "P-1024",
      name: "Sophia Chen",
      status: "admitted",
      ward: "Ward 3A · 204",
      age: 29,
      gender: "Female",
      bloodGroup: "A+",
      diagnosis: "Acute Appendicitis",
      heartRate: 74,
      bloodPressure: "118/76",
      temperature: 37.2,
      admitDate: "2026-07-08",
      admitTime: "09:30",
      dischargeDate: "",
      dischargeTime: "",
      logs: [
        { date: "2026-07-08 09:30", author: "Dr. Mehta", text: "Patient admitted with lower right quadrant abdominal pain. Scheduled for laparoscopic appendectomy." },
        { date: "2026-07-09 08:00", author: "Nurse Alina", text: "Vitals stable post-surgery. Pain managed well." }
      ]
    },
    {
      id: "P-0891",
      name: "James Okafor",
      status: "outpatient",
      ward: "Ward 3A · 205",
      age: 45,
      gender: "Male",
      bloodGroup: "O+",
      diagnosis: "Type 2 Diabetes Follow-up",
      heartRate: 68,
      bloodPressure: "130/84",
      temperature: 36.6,
      admitDate: "2026-07-07",
      admitTime: "14:15",
      dischargeDate: "",
      dischargeTime: "",
      logs: [
        { date: "2026-07-07 14:15", author: "Dr. Wright", text: "Routine glucose monitoring. Adjusted Metformin dosage. Recommended dietary changes." }
      ]
    },
    {
      id: "P-1147",
      name: "Elena Vogt",
      status: "emergency",
      ward: "Ward 2B · 102",
      age: 62,
      gender: "Female",
      bloodGroup: "B-",
      diagnosis: "Chest Pain - Suspected ACS",
      heartRate: 104,
      bloodPressure: "145/95",
      temperature: 37.0,
      admitDate: "2026-07-09",
      admitTime: "20:30",
      dischargeDate: "",
      dischargeTime: "",
      logs: [
        { date: "2026-07-09 20:30", author: "Dr. Bashir", text: "Admitted via ambulance with acute chest discomfort. ECG shows minor ST segment depression. Cardiac enzymes ordered." }
      ]
    },
    {
      id: "P-0563",
      name: "Marcus Webb",
      status: "discharged",
      ward: "Ward 4A · 302",
      age: 34,
      gender: "Male",
      bloodGroup: "AB+",
      diagnosis: "Fractured Radius",
      heartRate: 70,
      bloodPressure: "122/80",
      temperature: 36.7,
      admitDate: "2026-07-05",
      admitTime: "11:00",
      dischargeDate: "2026-07-09",
      dischargeTime: "10:00",
      logs: [
        { date: "2026-07-05 11:00", author: "Dr. Turner", text: "Plaster cast applied. Pain medication prescribed." },
        { date: "2026-07-09 10:00", author: "Dr. Turner", text: "Cast integrity checked. X-ray looks good. Patient discharged." }
      ]
    },
    {
      id: "P-2301",
      name: "Aisha Kapoor",
      status: "observation",
      ward: "ICU · 12",
      age: 51,
      gender: "Female",
      bloodGroup: "A-",
      diagnosis: "Severe Pneumonia",
      heartRate: 95,
      bloodPressure: "110/68",
      temperature: 38.6,
      admitDate: "2026-07-08",
      admitTime: "19:40",
      dischargeDate: "",
      dischargeTime: "",
      logs: [
        { date: "2026-07-08 19:40", author: "Dr. Kim", text: "Transferred to ICU due to worsening hypoxia. Started on broad-spectrum antibiotics and high-flow nasal oxygen." }
      ]
    },
    {
      id: "P-1990",
      name: "Liam O'Brien",
      status: "admitted",
      ward: "Ward 2B · 108",
      age: 18,
      gender: "Male",
      bloodGroup: "O-",
      diagnosis: "Post-op Tonsillectomy",
      heartRate: 76,
      bloodPressure: "115/70",
      temperature: 37.1,
      admitDate: "2026-07-09",
      admitTime: "07:15",
      dischargeDate: "",
      dischargeTime: "",
      logs: [
        { date: "2026-07-09 07:15", author: "Dr. Sharma", text: "Tonsils removed without complications. Patient reporting mild sore throat; swallowing fluids well." }
      ]
    },
    {
      id: "P-0728",
      name: "Dr. Nina Patel",
      status: "outpatient",
      ward: "Ward 4A · 305",
      age: 41,
      gender: "Female",
      bloodGroup: "B+",
      diagnosis: "Mitral Valve Regurgitation",
      heartRate: 82,
      bloodPressure: "125/82",
      temperature: 36.8,
      admitDate: "2026-07-06",
      admitTime: "10:00",
      dischargeDate: "",
      dischargeTime: "",
      logs: [
        { date: "2026-07-06 10:00", author: "Dr. Ava Sharma", text: "Annual echocardiogram done. Regurgitation remains stable. Keep on current monitoring schedule." }
      ]
    },
    {
      id: "P-3012",
      name: "Samuel Gomez",
      status: "emergency",
      ward: "ER · Bay 2",
      age: 73,
      gender: "Male",
      bloodGroup: "O+",
      diagnosis: "Acute Bronchospasm",
      heartRate: 110,
      bloodPressure: "135/88",
      temperature: 37.4,
      admitDate: "2026-07-09",
      admitTime: "20:00",
      dischargeDate: "",
      dischargeTime: "",
      logs: [
        { date: "2026-07-09 20:00", author: "Dr. Bashir", text: "Difficulty breathing. Nebulizer treatment administered. Pulse oximetry monitored at 92%." }
      ]
    }
  ];





  const departments = [
    {
      name: "Cardiology",
      head: "Dr. Ava Sharma",
      doctors: 12,
      beds: 42,
      occupancy: "88%",
      note: "Focus on outpatient rehab and cath lab workflows.",
    },
    {
      name: "Emergency",
      head: "Dr. Omar Bashir",
      doctors: 18,
      beds: 30,
      occupancy: "95%",
      note: "High volume; track triage and transfer availability.",
    },
    {
      name: "Pediatrics",
      head: "Dr. Lina Morales",
      doctors: 9,
      beds: 28,
      occupancy: "73%",
      note: "Monitor vaccine follow-ups and family rounding.",
    },
    {
      name: "Radiology",
      head: "Dr. Sofia Kim",
      doctors: 7,
      beds: 10,
      occupancy: "54%",
      note: "MRI and CT slots available this afternoon.",
    },
    {
      name: "Neurology",
      head: "Dr. Priya Kapoor",
      doctors: 8,
      beds: 15,
      occupancy: "82%",
      note: "Stroke clinic has 4 consult slots open.",
    },
    {
      name: "Orthopedics",
      head: "Dr. Ben Turner",
      doctors: 10,
      beds: 20,
      occupancy: "68%",
      note: "Post-op recovery ward steady.",
    },
  ];

  const billingRecords = [
    {
      invoice: "INV-2026-091",
      patient: "Sophia Chen",
      patientId: "P-1024",
      dueDate: "2026-07-20",
      status: "Pending",
      subtotal: 3930,
      insurance: 1200,
      tax: 210,
      total: "₹2,940",
      items: [
        { desc: "Room Charges (Semi-Private Bed - 3 Days)", qty: 3, price: 500 },
        { desc: "General Surgery Consultation (Laparoscopic)", qty: 1, price: 650 },
        { desc: "Lab Tests (CBC, Liver Panel, Electrolytes)", qty: 1, price: 430 },
        { desc: "Post-op Pain Relief Medications & Saline", qty: 1, price: 350 }
      ]
    },
    {
      invoice: "INV-2026-092",
      patient: "James Okafor",
      patientId: "P-0891",
      dueDate: "2026-07-18",
      status: "Paid",
      subtotal: 1540,
      insurance: 500,
      tax: 80,
      total: "₹1,120",
      items: [
        { desc: "Outpatient Clinic Consultation Fee", qty: 1, price: 150 },
        { desc: "Comprehensive HbA1c Lab Panel Test", qty: 1, price: 240 },
        { desc: "Glucometer Device Kit & Training Session", qty: 1, price: 350 },
        { desc: "Metformin ER Supply (90 Days Prescription)", qty: 1, price: 80 }
      ]
    },
    {
      invoice: "INV-2026-093",
      patient: "Elena Vogt",
      patientId: "P-1147",
      dueDate: "2026-07-15",
      status: "Overdue",
      subtotal: 4600,
      insurance: 1200,
      tax: 350,
      total: "₹3,750",
      items: [
        { desc: "ICU Emergency Bed (Cardiac Monitor)", qty: 2, price: 1200 },
        { desc: "Advanced ECG and Troponin Diagnostics", qty: 1, price: 850 },
        { desc: "Intravenous Thrombolytic Therapy", qty: 1, price: 1350 }
      ]
    },
    {
      invoice: "INV-2026-094",
      patient: "Aisha Kapoor",
      patientId: "P-2301",
      dueDate: "2026-07-22",
      status: "Pending",
      subtotal: 1840,
      insurance: 1000,
      tax: 100,
      total: "₹940",
      items: [
        { desc: "ICU Isolation Unit Room Charge", qty: 1, price: 800 },
        { desc: "Pulmonology Consultation Fee", qty: 1, price: 450 },
        { desc: "High-Flow Oxygen Nebulizer Setup", qty: 1, price: 340 },
        { desc: "Antibiotics & Anti-Inflammatory Meds", qty: 1, price: 250 }
      ]
    },
    {
      invoice: "INV-2026-095",
      patient: "Liam O'Brien",
      patientId: "P-1990",
      dueDate: "2026-07-25",
      status: "Paid",
      subtotal: 2500,
      insurance: 1000,
      tax: 150,
      total: "₹1,650",
      items: [
        { desc: "Pediatric Post-Op Suite (1 Day Stay)", qty: 1, price: 600 },
        { desc: "General ENT Surgical Procedure Fee", qty: 1, price: 1400 },
        { desc: "Anesthesia Services & Recovery Room", qty: 1, price: 500 }
      ]
    },
  ];

  const seedDoctors = [
    {
      id: "D-001",
      name: "Dr. Floyd Miles",
      specialty: "Neurologist",
      status: "available",
      email: "miles@lifecare.com",
      phone: "+1-202-555-0101",
      rating: 4.9,
      experienceYears: 12,
      schedule: "Mon, Wed, Fri 08:30 - 16:30",
      ward: "Ward 3A",
    },
    {
      id: "D-002",
      name: "Dr. Courtney Henry",
      specialty: "Dermatologist",
      status: "on-duty",
      email: "henry@lifecare.com",
      phone: "+1-202-555-0102",
      rating: 4.7,
      experienceYears: 8,
      schedule: "Tue, Thu 09:00 - 17:00",
      ward: "Clinic B",
    },
    {
      id: "D-003",
      name: "Dr. Eleanor Pena",
      specialty: "Pediatrician",
      status: "absent",
      email: "pena@lifecare.com",
      phone: "+1-202-555-0103",
      rating: 4.8,
      experienceYears: 10,
      schedule: "Mon-Fri 08:00 - 14:00",
      ward: "Ward 2B",
    },
    {
      id: "D-004",
      name: "Dr. Robert Fox",
      specialty: "Gynecologist",
      status: "on-duty",
      email: "fox@lifecare.com",
      phone: "+1-202-555-0104",
      rating: 4.6,
      experienceYears: 9,
      schedule: "Mon-Wed 10:00 - 18:00",
      ward: "Ward 4A",
    },
    {
      id: "D-005",
      name: "Dr. Jacob Jones",
      specialty: "ENT Specialist",
      status: "available",
      email: "jones@lifecare.com",
      phone: "+1-202-555-0105",
      rating: 4.8,
      experienceYears: 11,
      schedule: "Wed, Thu, Fri 09:00 - 17:00",
      ward: "Clinic A",
    },
  ];



  // ============================================================
  // SEED DATA — default appointment records shown on first load
  // ============================================================
  const seedAppointments = [
    { id: "A-001", patient: "Margaret Cho",     doctor: "Dr. Eleanor Pena",   time: "09:30 AM", date: "2026-07-10", dept: "Cardiology",  status: "confirmed" },
    { id: "A-002", patient: "Daniel Park",       doctor: "Dr. Floyd Miles",    time: "10:15 AM", date: "2026-07-10", dept: "Orthopedics", status: "confirmed" },
    { id: "A-003", patient: "Fatima Al-Hassan",  doctor: "Dr. Courtney Henry", time: "11:00 AM", date: "2026-07-10", dept: "Pediatrics",  status: "confirmed" },
    { id: "A-004", patient: "George Knight",     doctor: "Dr. Jacob Jones",    time: "02:30 PM", date: "2026-07-10", dept: "Neurology",   status: "confirmed" },
    { id: "A-005", patient: "Hanna Schultz",     doctor: "Dr. Robert Fox",     time: "04:00 PM", date: "2026-07-10", dept: "Dermatology", status: "confirmed" },
  ];

  // ============================================================
  // STORAGE HELPERS — load from localStorage, fallback to seeds
  // ============================================================

  // Load saved appointments; use seed data if nothing is saved yet
  function loadAppointments() {
    try {
      const saved = localStorage.getItem("lifecare_appointments_v1");
      if (!saved) return [...seedAppointments];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [...seedAppointments];
    } catch {
      return [...seedAppointments];
    }
  }

  // Save appointments list to localStorage
  function saveAppointments() {
    localStorage.setItem("lifecare_appointments_v1", JSON.stringify(appointments));
  }

  const seedDepartmentShifts = {
    "Cardiology": { morning: "Dr. Ava Sharma", afternoon: "Dr. Floyd Miles", night: "Dr. Courtney Henry" },
    "Emergency": { morning: "Dr. Omar Bashir", afternoon: "Dr. Eleanor Pena", night: "Dr. Floyd Miles" },
    "Pediatrics": { morning: "Dr. Eleanor Pena", afternoon: "Dr. Courtney Henry", night: "Dr. Floyd Miles" },
    "Radiology": { morning: "Dr. Floyd Miles", afternoon: "Dr. Ava Sharma", night: "Dr. Jacob Jones" },
    "Neurology": { morning: "Dr. Ava Sharma", afternoon: "Dr. Floyd Miles", night: "Dr. Eleanor Pena" },
    "Orthopedics": { morning: "Dr. Jacob Jones", afternoon: "Dr. Ava Sharma", night: "Dr. Floyd Miles" }
  };

  function loadDepartmentShifts() {
    try {
      const raw = localStorage.getItem("lifecare_department_shifts_v1");
      if (!raw) return { ...seedDepartmentShifts };
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return { ...seedDepartmentShifts };
      return parsed;
    } catch {
      return { ...seedDepartmentShifts };
    }
  }

  function saveDepartmentShifts() {
    localStorage.setItem("lifecare_department_shifts_v1", JSON.stringify(departmentShifts));
  }

  function loadPatients() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [...seedPatients];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [...seedPatients];
      return parsed
        .filter((p) => p && typeof p === "object")
        .map((p) => ({
          id: String(p.id || "").trim(),
          name: String(p.name || "").trim(),
          status: String(p.status || "").trim().toLowerCase(),
          ward: String(p.ward || "").trim(),
          age: Number(p.age) || 35,
          gender: String(p.gender || "Male").trim(),
          bloodGroup: String(p.bloodGroup || "O+").trim(),
          diagnosis: String(p.diagnosis || "No primary diagnosis").trim(),
          heartRate: Number(p.heartRate) || 72,
          bloodPressure: String(p.bloodPressure || "120/80").trim(),
          temperature: Number(p.temperature) || 36.8,
          admitDate: p.admitDate ? String(p.admitDate).trim() : "",
          admitTime: p.admitTime ? String(p.admitTime).trim() : "",
          dischargeDate: p.dischargeDate ? String(p.dischargeDate).trim() : "",
          dischargeTime: p.dischargeTime ? String(p.dischargeTime).trim() : "",
          logs: Array.isArray(p.logs) ? p.logs : []
        }))
        .filter((p) => p.id && p.name && p.status);
    } catch {
      return [...seedPatients];
    }
  }

  function loadDoctors() {
    try {
      const raw = localStorage.getItem("lifecare_doctors_v1");
      if (!raw) return [...seedDoctors];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [...seedDoctors];
      return parsed
        .filter((d) => d && typeof d === "object")
        .map((d) => ({
          id: String(d.id || "").trim(),
          name: String(d.name || "").trim(),
          specialty: String(d.specialty || "").trim(),
          status: String(d.status || "").trim().toLowerCase(),
          email: String(d.email || "").trim(),
          ward: String(d.ward || "").trim(),
          phone: String(d.phone || "+1-202-555-0199").trim(),
          rating: Number(d.rating) || 4.8,
          experienceYears: Number(d.experienceYears) || 8,
          schedule: String(d.schedule || "Mon-Fri 09:00 - 17:00").trim(),
        }))
        .filter((d) => d.id && d.name && d.specialty && d.status);
    } catch {
      return [...seedDoctors];
    }
  }

  function savePatients() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  }

  function saveDoctors() {
    localStorage.setItem("lifecare_doctors_v1", JSON.stringify(doctors));
  }

  // ============================================================
  // LIVE DATA  — load everything from storage now that all
  //              seed arrays and helper functions are defined
  // ============================================================
  let patients = loadPatients();
  let doctors  = loadDoctors();
  let appointments     = loadAppointments();
  let departmentShifts = loadDepartmentShifts();


  // ============================================================
  // UI HELPERS — small utility functions used across the app
  // ============================================================

  // Shorthand for document.querySelector("#someId") → $("#someId")
  const $ = (sel) => document.querySelector(sel);

  // Returns the CSS class name for a status badge color
  // e.g. "paid" → "admitted" (green), "pending" → "observation" (amber)
  function statusBadgeClass(status) {
    const s = String(status || "").toLowerCase();
    if (s === "paid")    return "admitted";    // green
    if (s === "pending") return "observation"; // amber
    if (s === "overdue") return "emergency";   // red
    // Doctor/patient statuses map directly to their own class
    const directStatuses = ["admitted", "outpatient", "emergency", "discharged", "observation", "available", "on-duty", "absent"];
    return directStatuses.includes(s) ? s : "admitted";
  }

  // Escapes HTML special characters to prevent XSS when inserting user data into HTML
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&",  "&amp;")
      .replaceAll("<",  "&lt;")
      .replaceAll(">",  "&gt;")
      .replaceAll('"',  "&quot;")
      .replaceAll("'",  "&#039;");
  }

  // Calculates the numbers shown on the dashboard stat cards
  function computeStats() {
    const total             = patients.length;
    const admitted          = patients.filter(p => p.status === "admitted").length;
    const appointmentsToday = appointments.length;
    const labsPending       = Math.max(0, Math.round(
      appointments.length * 0.7 + patients.filter(p => p.status === "observation").length
    ));
    const doctorsAvailable  = doctors.filter(d => d.status === "available").length;

    return { total, admitted, appointmentsToday, labsPending, doctorsAvailable };
  }
  // ============================================================
  // RENDERING HELPERS — functions that build HTML for the UI
  // ============================================================

  // Picks a gradient background color based on the person's name
  // (same name always gets same color — gives consistent avatars)
  function getAvatarStyle(name) {
    const colors = [
      "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", // Blue
      "linear-gradient(135deg, #10b981 0%, #047857 100%)", // Green
      "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)", // Purple
      "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)", // Amber
      "linear-gradient(135deg, #ec4899 0%, #be185d 100%)", // Pink
      "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", // Cyan
    ];
    // Hash the name to a consistent index
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  // Extracts initials from a full name (e.g., "John Doe" -> "JD")
  function getInitials(name) {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  function updatePatientPageStats() {
    const activeInpatients = patients.filter(p => p.status === "admitted").length;
    const emergencyCases = patients.filter(p => p.status === "emergency").length;
    const obsCases = patients.filter(p => p.status === "observation").length;
    const activeCount = patients.filter(p => p.status !== "discharged").length;
    
    const bedCapacity = 15;
    const occupancyPercent = Math.min(100, Math.round((activeCount / bedCapacity) * 100));

    if ($("#pStatInpatients")) $("#pStatInpatients").textContent = String(activeInpatients);
    if ($("#pStatEmergency")) $("#pStatEmergency").textContent = String(emergencyCases);
    if ($("#pStatObservation")) $("#pStatObservation").textContent = String(obsCases);
    if ($("#pStatOccupancy")) $("#pStatOccupancy").textContent = occupancyPercent + "%";
    if ($("#pStatOccupancyBar")) $("#pStatOccupancyBar").style.width = occupancyPercent + "%";
  }

  function updateDoctorPageStats() {
    const total = doctors.length;
    const available = doctors.filter((d) => d.status === "available").length;
    const onDuty = doctors.filter((d) => d.status === "on-duty").length;
    const absent = doctors.filter((d) => d.status === "absent").length;

    if ($("#docStatTotal")) $("#docStatTotal").textContent = String(total);
    if ($("#docStatAvailable")) $("#docStatAvailable").textContent = String(available);
    if ($("#docStatOnDuty")) $("#docStatOnDuty").textContent = String(onDuty);
    if ($("#docStatAbsent")) $("#docStatAbsent").textContent = String(absent);
  }

  function renderPatientTable({
    filterText = "",
    filterStatus = "all",
    filterWard = "",
  } = {}) {
    const tbody = $("#patientTableBody");
    const gridContainer = $("#patientGridContainer");
    const tableWrapper = $("#patientTableWrapper");
    if (!tbody) return;

    const ft = filterText.trim().toLowerCase();
    const fw = filterWard.trim().toLowerCase();
    const fs = filterStatus;

    let list = [...patients];

    if (ft) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(ft) || p.id.toLowerCase().includes(ft),
      );
    }

    if (fs !== "all") {
      list = list.filter((p) => p.status === fs);
    }

    if (fw) {
      list = list.filter((p) => p.ward.toLowerCase().includes(fw));
    }

    updatePatientPageStats();

    const isGrid = (localStorage.getItem("lifecare_patient_view_mode") || "table") === "grid";

    if ($("#patientViewTableBtn") && $("#patientViewGridBtn")) {
      if (isGrid) {
        $("#patientViewTableBtn").classList.remove("active");
        $("#patientViewGridBtn").classList.add("active");
      } else {
        $("#patientViewTableBtn").classList.add("active");
        $("#patientViewGridBtn").classList.remove("active");
      }
    }

    const renderTableRow = (p) => {
      const cls = statusBadgeClass(p.status);
      const initials = getInitials(p.name);
      const avStyle = getAvatarStyle(p.name);
      const isPulsing = p.status !== "discharged";
      
      let dotColor = "var(--gray-400)";
      if (p.status === "admitted") dotColor = "#16a34a";
      else if (p.status === "outpatient") dotColor = "#2563eb";
      else if (p.status === "emergency") dotColor = "#dc2626";
      else if (p.status === "observation") dotColor = "#ea580c";

      const pulsingDotElement = `<span class="status-dot ${isPulsing ? 'pulsing' : ''}" style="color: ${dotColor}; background-color: ${dotColor};"></span>`;

      let stayHtml = "—";
      if (p.admitDate) {
        stayHtml = `<div style="font-size: 0.85rem; font-weight: 500; color: var(--gray-700);">${escapeHtml(p.admitDate)} ${escapeHtml(p.admitTime || "")}</div>`;
        if (p.dischargeDate) {
          stayHtml += `<div style="font-size: 0.8rem; color: var(--gray-500); margin-top: 2px;"><i class="fas fa-sign-out-alt" style="font-size:0.75rem;"></i> ${escapeHtml(p.dischargeDate)} ${escapeHtml(p.dischargeTime || "")}</div>`;
        } else if (p.status === "discharged") {
          stayHtml += `<div style="font-size: 0.8rem; color: var(--gray-500); margin-top: 2px;"><i class="fas fa-sign-out-alt" style="font-size:0.75rem;"></i> Discharged</div>`;
        } else {
          stayHtml += `<div style="font-size: 0.8rem; color: #16a34a; font-weight: 600; margin-top: 2px;"><i class="fas fa-check-circle" style="font-size: 0.75rem;"></i> Active Stay</div>`;
        }
      }

      return `
        <tr data-patient-id="${escapeHtml(p.id)}">
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="patient-card__avatar" style="width: 32px; height: 32px; font-size: 0.85rem; background: ${avStyle}; flex-shrink: 0;">${initials}</div>
              <strong>${escapeHtml(p.name)}</strong>
            </div>
          </td>
          <td><span style="font-family: monospace; font-weight:500;">${escapeHtml(p.id)}</span></td>
          <td><span class="status-badge ${cls}">${pulsingDotElement}${escapeHtml(p.status)}</span></td>
          <td>${escapeHtml(p.ward || "—")}</td>
          <td>${stayHtml}</td>
          <td style="text-align:center;" class="action-icons">
            <i class="fas fa-notes-medical" data-action="view" title="view chart"></i>
            <i class="fas fa-phone-alt" data-action="call" title="call"></i>
            <i class="fas fa-edit" data-action="edit" title="edit"></i>
          </td>
        </tr>
      `;
    };

    const renderGridCard = (p) => {
      const cls = statusBadgeClass(p.status);
      const initials = getInitials(p.name);
      const avStyle = getAvatarStyle(p.name);
      const isPulsing = p.status !== "discharged";
      
      let dotColor = "var(--gray-400)";
      if (p.status === "admitted") dotColor = "#16a34a";
      else if (p.status === "outpatient") dotColor = "#2563eb";
      else if (p.status === "emergency") dotColor = "#dc2626";
      else if (p.status === "observation") dotColor = "#ea580c";

      const pulsingDotElement = `<span class="status-dot ${isPulsing ? 'pulsing' : ''}" style="color: ${dotColor}; background-color: ${dotColor};"></span>`;

      return `
        <div class="patient-card" data-patient-id="${escapeHtml(p.id)}">
          <div class="patient-card__header">
            <div class="patient-card__avatar" style="background: ${avStyle}">${initials}</div>
            <div class="patient-card__title">
              <h4>${escapeHtml(p.name)}</h4>
              <span>${escapeHtml(p.id)}</span>
            </div>
            <span class="status-badge ${cls}">${pulsingDotElement}${escapeHtml(p.status)}</span>
          </div>
          
          <div class="patient-card__info">
            <strong>Diagnosis:</strong>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(p.diagnosis)}">${escapeHtml(p.diagnosis || "No primary diagnosis")}</span>
            <strong>Ward/Room:</strong>
            <span>${escapeHtml(p.ward || "—")}</span>
            <strong>Details:</strong>
            <span>${p.age} yrs · ${escapeHtml(p.gender)} · ${escapeHtml(p.bloodGroup)}</span>
            <strong>Stay:</strong>
            <span style="font-size: 0.8rem; line-height: 1.3;">
              ${p.admitDate ? `<i class="fas fa-sign-in-alt"></i> ${escapeHtml(p.admitDate)} ${escapeHtml(p.admitTime || "")}` : "—"}
              ${p.dischargeDate ? `<br><i class="fas fa-sign-out-alt"></i> ${escapeHtml(p.dischargeDate)} ${escapeHtml(p.dischargeTime || "")}` : (p.admitDate ? (p.status === "discharged" ? "<br><i class='fas fa-sign-out-alt'></i> Discharged" : "<br><span style='color: #16a34a; font-weight: 600;'><i class='fas fa-check-circle'></i> Active Stay</span>") : "")}
            </span>
          </div>

          <div class="patient-card__vitals">
            <div class="vitals-mini">
              <i class="fas fa-heartbeat" style="color: #ef4444;"></i>
              <span>Heart Rate</span>
              <span class="v-val">${p.heartRate} bpm</span>
            </div>
            <div class="vitals-mini">
              <i class="fas fa-tachometer-alt" style="color: #3b82f6;"></i>
              <span>Blood BP</span>
              <span class="v-val">${escapeHtml(p.bloodPressure)}</span>
            </div>
            <div class="vitals-mini">
              <i class="fas fa-thermometer-half" style="color: #f59e42;"></i>
              <span>Temp</span>
              <span class="v-val">${p.temperature}°C</span>
            </div>
          </div>

          <div class="patient-card__actions action-icons">
            <button class="btn-icon" data-action="view" title="View Chart"><i class="fas fa-notes-medical"></i></button>
            <button class="btn-icon" data-action="call" title="Call Patient"><i class="fas fa-phone-alt"></i></button>
            <button class="btn-icon" data-action="edit" title="Edit Patient"><i class="fas fa-edit"></i></button>
          </div>
        </div>
      `;
    };

    if (isGrid) {
      if (tableWrapper) tableWrapper.style.display = "none";
      if (gridContainer) gridContainer.style.display = "grid";

      if (list.length === 0) {
        gridContainer.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--gray-500); background: white; border-radius: 12px; border: 1px solid var(--gray-200);">
            No patients match your filters.
          </div>
        `;
        return;
      }
      gridContainer.innerHTML = list.map(renderGridCard).join("");
    } else {
      if (tableWrapper) tableWrapper.style.display = "block";
      if (gridContainer) gridContainer.style.display = "none";

      if (list.length === 0) {
        tbody.innerHTML = `
          <tr><td colspan="5" style="padding:22px; color: var(--gray-500); text-align: center;">
            No patients match your filters.
          </td></tr>
        `;
        return;
      }
      tbody.innerHTML = list.map(renderTableRow).join("");
    }
  }

  function renderAppointments() {
    const container = $("#appointmentContainer");
    if (!container) return;

    const query = ($("#apptSearchInput")?.value || "").toLowerCase().trim();
    const deptFilter = $("#apptDeptFilter")?.value || "all";

    let list = [...appointments];

    if (query) {
      list = list.filter(a =>
        a.patient.toLowerCase().includes(query) ||
        a.doctor.toLowerCase().includes(query)
      );
    }

    if (deptFilter !== "all") {
      list = list.filter(a => a.dept === deptFilter);
    }

    // Update stats
    const active = appointments.filter(a => a.status === "confirmed").length;
    const todayStr = new Date().toISOString().split('T')[0];
    const todayVisits = appointments.filter(a => a.date === todayStr).length;
    const cardioCount = appointments.filter(a => a.dept === "Cardiology").length;

    if ($("#apptStatActive")) $("#apptStatActive").textContent = String(active);
    if ($("#apptStatToday")) $("#apptStatToday").textContent = String(todayVisits);
    if ($("#apptStatCardio")) $("#apptStatCardio").textContent = String(cardioCount);

    if (list.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--gray-500); background: rgba(255, 255, 255, 0.4); border-radius: 12px; border: 1px solid var(--gray-200);">No appointments found.</div>`;
      return;
    }

    container.innerHTML = list
      .map(
        (a) => {
          const isConfirmed = a.status === "confirmed";
          let statusStyle = "color: var(--gray-400);";
          if (a.status === "confirmed") statusStyle = "color: #10b981;";
          else if (a.status === "completed") statusStyle = "color: #3b82f6;";
          else if (a.status === "cancelled") statusStyle = "color: #ef4444;";

          return `
            <div class="appt-card" data-appt-id="${escapeHtml(a.id)}">
              <div class="appt-patient" style="font-weight: 800; font-size: 1.1rem; color: var(--gray-900);">${escapeHtml(a.patient)}</div>
              <div class="appt-detail" style="font-size: 0.9rem; color: var(--gray-600); display: flex; flex-direction: column; gap: 4px;">
                <span><i class="fas fa-user-md" style="width: 16px; color: var(--primary);"></i> ${escapeHtml(a.doctor)}</span>
                <span><i class="far fa-calendar-alt" style="width: 16px; color: var(--primary);"></i> ${escapeHtml(a.date)} at ${escapeHtml(a.time)}</span>
                <span><i class="fas fa-building" style="width: 16px; color: var(--primary);"></i> ${escapeHtml(a.dept)}</span>
              </div>
              <div class="appt-status" style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; display: flex; align-items: center; gap: 6px; margin-top: 6px;">
                <i class="fas fa-circle" style="${statusStyle} font-size: 0.55rem;"></i> ${escapeHtml(a.status)}
              </div>
              <div class="appt-card__actions">
                ${isConfirmed ? `
                  <button class="btn-cancel" data-action="cancel-appt"><i class="fas fa-times"></i> Cancel</button>
                  <button class="btn-complete" data-action="complete-appt"><i class="fas fa-check"></i> Complete</button>
                ` : `<span style="font-size: 0.8rem; color: var(--gray-400); font-style: italic;">No actions</span>`}
              </div>
            </div>
          `;
        }
      )
      .join("");
  }

  function renderDoctorTable({ filterText = "", filterStatus = "all" } = {}) {
    const tbody = $("#doctorTableBody");
    const gridContainer = $("#doctorGridContainer");
    const tableWrapper = $("#doctorTableWrapper");
    if (!tbody) return;

    const ft = filterText.trim().toLowerCase();
    const fs = filterStatus;

    let list = [...doctors];

    if (ft) {
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(ft) ||
          d.specialty.toLowerCase().includes(ft) ||
          d.id.toLowerCase().includes(ft),
      );
    }

    if (fs !== "all") {
      list = list.filter((d) => d.status === fs);
    }

    updateDoctorPageStats();

    const isGrid = (localStorage.getItem("lifecare_doctor_view_mode") || "table") === "grid";

    if ($("#doctorViewTableBtn") && $("#doctorViewGridBtn")) {
      if (isGrid) {
        $("#doctorViewTableBtn").classList.remove("active");
        $("#doctorViewGridBtn").classList.add("active");
      } else {
        $("#doctorViewTableBtn").classList.add("active");
        $("#doctorViewGridBtn").classList.remove("active");
      }
    }

    const renderTableRow = (d) => {
      const cls = statusBadgeClass(d.status);
      return `
        <tr data-doctor-id="${escapeHtml(d.id)}">
          <td><strong>${escapeHtml(d.name)}</strong><br /><span style="font-size:0.85rem; color: var(--gray-500);">${escapeHtml(d.id)}</span></td>
          <td>${escapeHtml(d.specialty)}</td>
          <td><span class="status-badge ${cls}">${escapeHtml(d.status.replace("-", " "))}</span></td>
          <td>${escapeHtml(d.email || "—")}</td>
          <td>${escapeHtml(d.ward || "—")}</td>
          <td style="text-align:center;" class="action-icons">
            <i class="fas fa-eye" data-doctor-action="view" title="view doctor"></i>
            <i class="fas fa-phone-alt" data-doctor-action="call" title="call doctor"></i>
            <i class="fas fa-edit" data-doctor-action="edit" title="edit doctor"></i>
          </td>
        </tr>
      `;
    };

    const renderGridCard = (d) => {
      const cls = statusBadgeClass(d.status);
      const initials = getInitials(d.name);
      const avStyle = getAvatarStyle(d.name);
      let dotColor = "var(--gray-400)";
      if (d.status === "available") dotColor = "#16a34a";
      else if (d.status === "on-duty") dotColor = "#2563eb";
      else if (d.status === "absent") dotColor = "#dc2626";

      const pulsingDotElement = `<span class="status-dot pulsing" style="color: ${dotColor}; background-color: ${dotColor};"></span>`;

      return `
        <div class="doctor-card" data-doctor-id="${escapeHtml(d.id)}">
          <div class="doctor-card__header">
            <div class="doctor-card__avatar" style="background: ${avStyle}">${initials}</div>
            <div class="doctor-card__title">
              <h4>${escapeHtml(d.name)}</h4>
              <span>${escapeHtml(d.id)}</span>
            </div>
            <span class="status-badge ${cls}">${pulsingDotElement}${escapeHtml(d.status.replace("-", " "))}</span>
          </div>
          
          <div class="doctor-card__info">
            <strong>Specialty:</strong>
            <span>${escapeHtml(d.specialty)}</span>
            <strong>Ward/Room:</strong>
            <span>${escapeHtml(d.ward || "—")}</span>
            <strong>Schedule:</strong>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(d.schedule)}">${escapeHtml(d.schedule)}</span>
          </div>

          <div class="doctor-card__meta">
            <div class="rating-badge">
              <i class="fas fa-star" style="color: #f59e0b;"></i> ${d.rating.toFixed(1)}
            </div>
            <span><strong>Exp:</strong> ${d.experienceYears} Years</span>
          </div>

          <div class="doctor-card__actions action-icons">
            <button class="btn-icon" data-doctor-action="view" title="View Details"><i class="fas fa-eye"></i></button>
            <button class="btn-icon" data-doctor-action="call" title="Call Doctor"><i class="fas fa-phone-alt"></i></button>
            <button class="btn-icon" data-doctor-action="edit" title="Edit Doctor"><i class="fas fa-edit"></i></button>
          </div>
        </div>
      `;
    };

    if (isGrid) {
      if (tableWrapper) tableWrapper.style.display = "none";
      if (gridContainer) gridContainer.style.display = "grid";

      if (list.length === 0) {
        gridContainer.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--gray-500); background: white; border-radius: 12px; border: 1px solid var(--gray-200);">
            No doctors match your filters.
          </div>
        `;
        return;
      }
      gridContainer.innerHTML = list.map(renderGridCard).join("");
    } else {
      if (tableWrapper) tableWrapper.style.display = "block";
      if (gridContainer) gridContainer.style.display = "none";

      if (list.length === 0) {
        tbody.innerHTML = `
          <tr><td colspan="6" style="padding:22px; color: var(--gray-500); text-align: center;">
            No doctors match your filters.
          </td></tr>
        `;
        return;
      }
      tbody.innerHTML = list.map(renderTableRow).join("");
    }
  }

  function updateStats() {
    const s = computeStats();
    if ($("#totalPatients")) $("#totalPatients").textContent = s.total;
    if ($("#admittedPatients")) $("#admittedPatients").textContent = s.admitted;
    if ($("#appointmentsToday"))
      $("#appointmentsToday").textContent = s.appointmentsToday;
    if ($("#labsPending")) $("#labsPending").textContent = s.labsPending;
    if ($("#doctorsAvailable"))
      $("#doctorsAvailable").textContent = s.doctorsAvailable;

    // Update sidebar badges
    const pCountBadge = $("#patientsCountBadge");
    const dCountBadge = $("#doctorsCountBadge");
    if (pCountBadge) pCountBadge.textContent = String(patients.length);
    if (dCountBadge) dCountBadge.textContent = String(doctors.length);
  }

  function setCurrentDate() {
    const dateSpan = $("#currentDate");
    if (!dateSpan) return;
    const now = new Date();
    dateSpan.textContent = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }


  // Department and Billing rendering
  function renderDepartments(filterText = "") {
    const grid = $("#departmentGrid");
    const tbody = $("#departmentTableBody");
    if (!grid || !tbody) return;

    const query = filterText.trim().toLowerCase();
    const list = departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(query) ||
        dept.head.toLowerCase().includes(query) ||
        dept.note.toLowerCase().includes(query),
    );

    grid.innerHTML = list
      .map(
        (dept) => {
          const shift = departmentShifts[dept.name] || { morning: "—", afternoon: "—", night: "—" };
          return `
            <div class="department-card" data-dept-name="${escapeHtml(dept.name)}">
              <h3>${escapeHtml(dept.name)}</h3>
              <p>${escapeHtml(dept.note)}</p>
              <div class="dept-stats">
                <span><strong>Head:</strong> ${escapeHtml(dept.head)}</span>
                <span><strong>Doctors:</strong> ${dept.doctors}</span>
                <span><strong>Beds:</strong> ${dept.beds}</span>
              </div>
              <div class="dept-shift-scheduler">
                <h5 style="margin: 0 0 8px 0; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gray-600); display: flex; align-items: center; gap: 6px;">
                  <i class="fas fa-clock" style="color: var(--primary);"></i> Shift Schedule
                </h5>
                <div class="dept-shift-row">
                  <span><strong>Morning:</strong> <span class="shift-val">${escapeHtml(shift.morning)}</span></span>
                  <i class="fas fa-edit edit-shift-btn" data-dept="${escapeHtml(dept.name)}" data-shift="morning" title="Assign Morning Shift"></i>
                </div>
                <div class="dept-shift-row">
                  <span><strong>Afternoon:</strong> <span class="shift-val">${escapeHtml(shift.afternoon)}</span></span>
                  <i class="fas fa-edit edit-shift-btn" data-dept="${escapeHtml(dept.name)}" data-shift="afternoon" title="Assign Afternoon Shift"></i>
                </div>
                <div class="dept-shift-row">
                  <span><strong>Night:</strong> <span class="shift-val">${escapeHtml(shift.night)}</span></span>
                  <i class="fas fa-edit edit-shift-btn" data-dept="${escapeHtml(dept.name)}" data-shift="night" title="Assign Night Shift"></i>
                </div>
              </div>
            </div>
          `;
        }
      )
      .join("");

    tbody.innerHTML = list
      .map(
        (dept) => `
          <tr>
            <td>${escapeHtml(dept.name)}</td>
            <td>${escapeHtml(dept.head)}</td>
            <td>${dept.doctors}</td>
            <td>${dept.beds}</td>
            <td>${escapeHtml(dept.occupancy)}</td>
          </tr>
        `,
      )
      .join("");

    if (list.length === 0) {
      const emptyRow = `
        <tr><td colspan="5" style="padding: 20px; color: var(--gray-500);">
          No matching departments.
        </td></tr>
      `;
      grid.innerHTML = "";
      tbody.innerHTML = emptyRow;
    }
  }

  function renderBilling({ search = "", status = "all" } = {}) {
    const searchText = String(search).trim().toLowerCase();
    const statusFilter = String(status).trim();
    const tbody = $("#billingTableBody");
    const pendingCount = billingRecords.filter(
      (r) => r.status === "Pending",
    ).length;
    const paidCount = billingRecords.filter((r) => r.status === "Paid").length;
    const overdueCount = billingRecords.filter(
      (r) => r.status === "Overdue",
    ).length;

    if ($("#billingPendingCount"))
      $("#billingPendingCount").textContent = String(pendingCount);
    if ($("#billingPaidCount"))
      $("#billingPaidCount").textContent = String(paidCount);
    if ($("#billingOverdueCount"))
      $("#billingOverdueCount").textContent = String(overdueCount);

    if (!tbody) return;

    const list = billingRecords.filter((item) => {
      const matchesText =
        item.invoice.toLowerCase().includes(searchText) ||
        item.patient.toLowerCase().includes(searchText);
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      return matchesText && matchesStatus;
    });

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr><td colspan="6" style="padding:22px; color: var(--gray-500);">
          No billing records match your search.
        </td></tr>
      `;
      return;
    }

    tbody.innerHTML = list
      .map(
        (item) => `
          <tr data-invoice-id="${escapeHtml(item.invoice)}">
            <td><strong>${escapeHtml(item.invoice)}</strong></td>
            <td>${escapeHtml(item.patient)} <span style="font-family: monospace; font-size: 0.8rem; color: var(--gray-500);">(${escapeHtml(item.patientId)})</span></td>
            <td>${escapeHtml(item.dueDate)}</td>
            <td><strong>${escapeHtml(item.total)}</strong></td>
            <td><span class="status-badge ${statusBadgeClass(item.status)}">${escapeHtml(item.status)}</span></td>
            <td style="text-align:center;" class="action-icons">
              <i class="fas fa-eye" data-billing-action="view" title="View Statement" style="cursor: pointer; margin-right: 12px; color: var(--primary);"></i>
              <i class="fas fa-file-pdf" data-billing-action="download" title="Download PDF" style="cursor: pointer; color: #2563eb;"></i>
            </td>
          </tr>
        `,
      )
      .join("");
  }

  let activeInvoiceId = null;

  function openInvoiceModal(invoiceId) {
    const record = billingRecords.find(r => r.invoice === invoiceId);
    if (!record) return;

    activeInvoiceId = invoiceId;
    const body = $("#invoiceModalBody");
    if (!body) return;

    const patient = patients.find(p => p.id === record.patientId) || { age: 35, gender: "Male", id: record.patientId };

    let itemsHtml = record.items.map(item => `
      <tr>
        <td>${escapeHtml(item.desc)}</td>
        <td style="text-align: center;">${item.qty}</td>
        <td style="text-align: right;">₹${item.price.toFixed(2)}</td>
        <td class="amount">₹${(item.qty * item.price).toFixed(2)}</td>
      </tr>
    `).join("");

    body.innerHTML = `
      <div class="invoice-receipt">
        <div class="receipt-header">
          <h4>LifeCare Command Center</h4>
          <p>Clinical Billing & Statement Services</p>
          <p style="font-size: 0.8rem; opacity: 0.8; margin-top: 4px;">100 Hospital Parkway, Suite 500 · Tech City, TC 94025</p>
        </div>
        
        <div class="receipt-meta">
          <div>
            <strong>Patient Name:</strong> ${escapeHtml(record.patient)}<br>
            <strong>Patient ID:</strong> ${escapeHtml(record.patientId)}<br>
            <strong>Details:</strong> ${patient.age} yrs · ${escapeHtml(patient.gender)}
          </div>
          <div>
            <strong>Invoice ID:</strong> ${escapeHtml(record.invoice)}<br>
            <strong>Due Date:</strong> ${escapeHtml(record.dueDate)}<br>
            <strong>Status:</strong> <span class="status-badge ${statusBadgeClass(record.status)}" style="padding: 1px 6px; font-size: 0.75rem;">${escapeHtml(record.status)}</span>
          </div>
        </div>

        <div class="receipt-table-wrapper">
          <table class="receipt-table">
            <thead>
              <tr>
                <th style="width: 55%;">Description</th>
                <th style="width: 10%; text-align: center;">Qty</th>
                <th style="width: 15%; text-align: right;">Unit Price</th>
                <th style="width: 20%; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>

        <div class="receipt-summary">
          <div>
            <span>Subtotal:</span>
            <strong>₹${record.subtotal.toFixed(2)}</strong>
          </div>
          <div>
            <span>Insurance Offset:</span>
            <strong style="color: #16a34a;">-₹${record.insurance.toFixed(2)}</strong>
          </div>
          <div>
            <span>Taxes & Duties (5%):</span>
            <strong>₹${record.tax.toFixed(2)}</strong>
          </div>
          <div class="grand-total">
            <span>Net Payable:</span>
            <span>${escapeHtml(record.total)}</span>
          </div>
        </div>

        <div class="receipt-footer">
          <p>This statement is generated electronically from the LifeCare Management Command Center database. For any inquiries, please contact patient relations billing division.</p>
          <strong style="display: block; margin-top: 8px; color: var(--primary);">Thank you for trusting us with your health.</strong>
        </div>
      </div>
    `;

    const modal = $("#invoiceModal");
    if (modal) modal.classList.add("open");
  }

  function closeInvoiceModal() {
    const modal = $("#invoiceModal");
    if (modal) modal.classList.remove("open");
    activeInvoiceId = null;
  }

  function downloadInvoicePdf(invoiceId) {
    const record = billingRecords.find(r => r.invoice === invoiceId);
    if (!record) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const primaryColor = [11, 110, 79]; 
    const darkColor = [31, 41, 55]; 
    const lightColor = [243, 244, 246]; 

    // Draw header band
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 38, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("LIFECARE MEDICAL CENTER", 15, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Clinical Billing & Patient Statement", 15, 22);
    doc.text("Tech City, TC 94025 | billing@lifecare.com", 15, 27);

    // Document type label (right side)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("INVOICE STATEMENT", 145, 16);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice: ${record.invoice}`, 145, 22);
    doc.text(`Due Date: ${record.dueDate}`, 145, 27);

    // Draw Patient & Bill Metadata info block
    doc.setFillColor(lightColor[0], lightColor[1], lightColor[2]);
    doc.rect(15, 46, 180, 28, "F");

    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("BILLED TO:", 20, 52);

    doc.setFont("helvetica", "normal");
    doc.text(`Patient Name: ${record.patient}`, 20, 58);
    doc.text(`Patient ID: ${record.patientId}`, 20, 63);
    doc.text("Facility: LifeCare Command Center", 20, 68);

    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT DETAILS:", 115, 52);

    doc.setFont("helvetica", "normal");
    doc.text(`Status: ${record.status.toUpperCase()}`, 115, 58);
    doc.text(`Due Date: ${record.dueDate}`, 115, 63);
    doc.text(`Currency: INR (Rs.)`, 115, 68);

    // Items table header
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(15, 84, 180, 8, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Description", 18, 89);
    doc.text("Qty", 120, 89, { align: "center" });
    doc.text("Unit Price", 150, 89, { align: "right" });
    doc.text("Amount", 190, 89, { align: "right" });

    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFont("helvetica", "normal");

    let currentY = 99;
    record.items.forEach((item) => {
      doc.text(item.desc, 18, currentY);
      doc.text(String(item.qty), 120, currentY, { align: "center" });
      doc.text(`Rs. ${item.price.toFixed(2)}`, 150, currentY, { align: "right" });
      doc.text(`Rs. ${(item.qty * item.price).toFixed(2)}`, 190, currentY, { align: "right" });

      doc.setDrawColor(229, 231, 235);
      doc.line(15, currentY + 3, 195, currentY + 3);
      currentY += 10;
    });

    currentY += 5;
    doc.text("Subtotal:", 145, currentY, { align: "right" });
    doc.text(`Rs. ${record.subtotal.toFixed(2)}`, 190, currentY, { align: "right" });

    currentY += 7;
    doc.text("Insurance Offset:", 145, currentY, { align: "right" });
    doc.text(`-Rs. ${record.insurance.toFixed(2)}`, 190, currentY, { align: "right" });

    currentY += 7;
    doc.text("Taxes (5%):", 145, currentY, { align: "right" });
    doc.text(`Rs. ${record.tax.toFixed(2)}`, 190, currentY, { align: "right" });

    currentY += 9;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Net Payable:", 145, currentY, { align: "right" });
    doc.text(record.total.replace('₹', 'Rs. '), 190, currentY, { align: "right" });

    doc.setLineWidth(0.5);
    doc.line(135, currentY + 2, 195, currentY + 2);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text("This document is a certified copy of electronic medical billing records.", 105, 275, { align: "center" });
    doc.text("Thank you for choosing LifeCare Medical Services.", 105, 280, { align: "center" });

    doc.save(`Invoice_${record.invoice}.pdf`);
  }

  // =========================
  // Add/Edit flows
  // =========================
  function getModalEls() {
    return {
      modal: $("#patientModal"),
      title: $("#patientModalTitle"),
      name: $("#patientNameInput"),
      id: $("#patientIdInput"),
      age: $("#patientAgeInput"),
      gender: $("#patientGenderSelect"),
      bloodGroup: $("#patientBloodGroupSelect"),
      ward: $("#patientWardInput"),
      status: $("#patientStatusSelect"),
      diagnosis: $("#patientDiagnosisInput"),
      heartRate: $("#patientHeartRateInput"),
      bloodPressure: $("#patientBloodPressureInput"),
      temperature: $("#patientTemperatureInput"),
      admitDate: $("#patientAdmitDateInput"),
      admitTime: $("#patientAdmitTimeInput"),
      dischargeDate: $("#patientDischargeDateInput"),
      dischargeTime: $("#patientDischargeTimeInput"),
      save: $("#patientSaveBtn"),
      cancel: $("#patientCancelBtn"),
      closeBtns: document.querySelectorAll("[data-modal-close]"),
      delete: $("#patientDeleteBtn"),
      mode: $("#patientModalMode"),
    };
  }

  function openModal(mode, patient) {
    const els = getModalEls();
    if (!els.modal) return;

    els.mode.value = mode;
    els.delete.style.display = mode === "edit" ? "inline-flex" : "none";

    if (mode === "edit" && patient) {
      els.title.textContent = "Edit Patient";
      els.name.value = patient.name;
      els.id.value = patient.id;
      els.id.disabled = true;
      els.age.value = patient.age || "";
      els.gender.value = patient.gender || "Male";
      els.bloodGroup.value = patient.bloodGroup || "O+";
      els.ward.value = patient.ward || "";
      els.status.value = patient.status;
      els.diagnosis.value = patient.diagnosis || "";
      els.heartRate.value = patient.heartRate || "";
      els.bloodPressure.value = patient.bloodPressure || "";
      els.temperature.value = patient.temperature || "";
      els.admitDate.value = patient.admitDate || "";
      els.admitTime.value = patient.admitTime || "";
      els.dischargeDate.value = patient.dischargeDate || "";
      els.dischargeTime.value = patient.dischargeTime || "";
    } else {
      els.title.textContent = "Add Patient";
      els.name.value = "";
      els.id.value = "";
      els.id.disabled = false;
      els.age.value = "";
      els.gender.value = "Male";
      els.bloodGroup.value = "O+";
      els.ward.value = "";
      els.status.value = "admitted";
      els.diagnosis.value = "";
      els.heartRate.value = "72";
      els.bloodPressure.value = "120/80";
      els.temperature.value = "36.8";
      
      const now = new Date();
      const localDate = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0');
      const localTime = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');
      els.admitDate.value = localDate;
      els.admitTime.value = localTime;
      els.dischargeDate.value = "";
      els.dischargeTime.value = "";
    }

    els.modal.classList.add("open");
  }

  function closeModal() {
    const els = getModalEls();
    if (!els.modal) return;
    els.modal.classList.remove("open");
  }

  function validatePatientForm({ name, id, ward, status, age, heartRate, temperature }) {
    const errs = [];
    if (!name || name.trim().length < 2) errs.push("Patient name is required.");
    if (!id || id.trim().length < 3)
      errs.push("Patient ID is required (e.g., P-1234).");
    if (!status) errs.push("Status is required.");
    if (ward && ward.trim().length > 80) errs.push("Ward/Room is too long.");
    
    if (age !== "" && (isNaN(age) || age < 0 || age > 150)) {
      errs.push("Age must be between 0 and 150.");
    }
    if (heartRate !== "" && (isNaN(heartRate) || heartRate < 30 || heartRate > 250)) {
      errs.push("Heart rate must be between 30 and 250 bpm.");
    }
    if (temperature !== "" && (isNaN(temperature) || temperature < 30 || temperature > 45)) {
      errs.push("Temperature must be between 30 and 45 °C.");
    }
    return errs;
  }

  function upsertPatientFromForm() {
    const els = getModalEls();
    const mode = els.mode.value;

    const payload = {
      name: els.name.value.trim(),
      id: els.id.value.trim(),
      age: els.age.value !== "" ? Number(els.age.value) : 35,
      gender: els.gender.value,
      bloodGroup: els.bloodGroup.value,
      ward: els.ward.value.trim(),
      status: els.status.value,
      diagnosis: els.diagnosis.value.trim() || "No primary diagnosis",
      heartRate: els.heartRate.value !== "" ? Number(els.heartRate.value) : 72,
      bloodPressure: els.bloodPressure.value.trim() || "120/80",
      temperature: els.temperature.value !== "" ? Number(els.temperature.value) : 36.8,
      admitDate: els.admitDate.value,
      admitTime: els.admitTime.value,
      dischargeDate: els.dischargeDate.value,
      dischargeTime: els.dischargeTime.value,
    };

    const errs = validatePatientForm(payload);
    if (errs.length) {
      alert("Fix the following:\n- " + errs.join("\n- "));
      return;
    }

    if (mode === "add") {
      if (
        patients.some((p) => p.id.toLowerCase() === payload.id.toLowerCase())
      ) {
        alert("A patient with this ID already exists.");
        return;
      }
      payload.logs = [
        {
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          author: "System",
          text: "Patient record created."
        }
      ];
      patients.unshift(payload);
    } else {
      const idx = patients.findIndex(
        (p) => p.id.toLowerCase() === payload.id.toLowerCase(),
      );
      if (idx === -1) {
        alert("Patient not found.");
        return;
      }
      patients[idx] = {
        ...patients[idx],
        name: payload.name,
        age: payload.age,
        gender: payload.gender,
        bloodGroup: payload.bloodGroup,
        ward: payload.ward,
        status: payload.status,
        diagnosis: payload.diagnosis,
        heartRate: payload.heartRate,
        bloodPressure: payload.bloodPressure,
        temperature: payload.temperature,
        admitDate: payload.admitDate,
        admitTime: payload.admitTime,
        dischargeDate: payload.dischargeDate,
        dischargeTime: payload.dischargeTime,
      };
    }

    savePatients();
    renderAndRefresh();
    closeModal();
  }

  function deletePatientFromForm() {
    const els = getModalEls();
    const mode = els.mode.value;
    if (mode !== "edit") return;

    const id = els.id.value.trim();
    const patient = patients.find(
      (p) => p.id.toLowerCase() === id.toLowerCase(),
    );
    if (!patient) return;

    const ok = confirm(`Delete patient ${patient.name} (${patient.id})?`);
    if (!ok) return;

    patients = patients.filter((p) => p.id.toLowerCase() !== id.toLowerCase());
    savePatients();
    renderAndRefresh();
    closeModal();
  }

  function getFilterState() {
    const text = $("#patientSearchInput")?.value || "";
    const status = $("#patientStatusFilter")?.value || "all";
    const ward = $("#patientWardFilter")?.value || "";
    return { filterText: text, filterStatus: status, filterWard: ward };
  }

  function getDoctorModalEls() {
    return {
      modal: $("#doctorModal"),
      title: $("#doctorModalTitle"),
      name: $("#doctorNameInput"),
      id: $("#doctorIdInput"),
      specialty: $("#doctorSpecialtyInput"),
      status: $("#doctorStatusSelect"),
      email: $("#doctorEmailInput"),
      ward: $("#doctorWardInput"),
      phone: $("#doctorPhoneInput"),
      rating: $("#doctorRatingInput"),
      experience: $("#doctorExperienceInput"),
      schedule: $("#doctorScheduleInput"),
      save: $("#doctorSaveBtn"),
      cancel: $("#doctorCancelBtn"),
      closeBtns: document.querySelectorAll("[data-doctor-modal-close]"),
      delete: $("#doctorDeleteBtn"),
      mode: $("#doctorModalMode"),
    };
  }

  function openDoctorModal(mode, doctor) {
    const els = getDoctorModalEls();
    if (!els.modal) return;

    els.mode.value = mode;
    if (els.delete) els.delete.style.display = mode === "edit" ? "inline-flex" : "none";

    if (mode === "edit" && doctor) {
      els.title.textContent = "Edit Doctor";
      els.name.value = doctor.name;
      els.id.value = doctor.id;
      els.id.disabled = true;
      els.specialty.value = doctor.specialty;
      els.status.value = doctor.status;
      els.email.value = doctor.email;
      els.ward.value = doctor.ward;
      els.phone.value = doctor.phone || "";
      els.rating.value = doctor.rating || "";
      els.experience.value = doctor.experienceYears || "";
      els.schedule.value = doctor.schedule || "";
    } else {
      els.title.textContent = "Add Doctor";
      els.name.value = "";
      els.id.value = "";
      els.id.disabled = false;
      els.specialty.value = "";
      els.status.value = "available";
      els.email.value = "";
      els.ward.value = "";
      els.phone.value = "";
      els.rating.value = "4.8";
      els.experience.value = "5";
      els.schedule.value = "Mon-Fri 09:00 - 17:00";
    }

    els.modal.classList.add("open");
  }

  function closeDoctorModal() {
    const els = getDoctorModalEls();
    if (!els.modal) return;
    els.modal.classList.remove("open");
  }

  function upsertDoctorFromForm() {
    const els = getDoctorModalEls();
    const payload = {
      name: els.name.value.trim(),
      id: els.id.value.trim(),
      specialty: els.specialty.value.trim(),
      status: els.status.value,
      email: els.email.value.trim(),
      ward: els.ward.value.trim(),
      phone: els.phone.value.trim() || "+1-202-555-0199",
      rating: Number(els.rating.value) || 4.8,
      experienceYears: Number(els.experience.value) || 5,
      schedule: els.schedule.value.trim() || "Mon-Fri 09:00 - 17:00",
    };

    const mode = els.mode.value;
    const isNew = mode === "add";
    const errs = [];
    if (!payload.name || payload.name.length < 3)
      errs.push("Doctor name is required.");
    if (!payload.id || payload.id.length < 2)
      errs.push("Doctor ID is required.");
    if (!payload.specialty) errs.push("Specialty is required.");
    if (!payload.status) errs.push("Status is required.");
    
    if (isNaN(payload.rating) || payload.rating < 0 || payload.rating > 5) {
      errs.push("Rating must be between 0.0 and 5.0");
    }
    if (isNaN(payload.experienceYears) || payload.experienceYears < 0) {
      errs.push("Experience years must be a valid positive number.");
    }

    if (errs.length) {
      alert("Fix the following:\n- " + errs.join("\n- "));
      return;
    }

    if (isNew) {
      if (
        doctors.some((d) => d.id.toLowerCase() === payload.id.toLowerCase())
      ) {
        alert("A doctor with this ID already exists.");
        return;
      }
      doctors.unshift(payload);
    } else {
      const idx = doctors.findIndex(
        (d) => d.id.toLowerCase() === payload.id.toLowerCase(),
      );
      if (idx === -1) {
        alert("Doctor not found.");
        return;
      }
      doctors[idx] = { ...doctors[idx], ...payload };
    }

    saveDoctors();
    renderAndRefresh();
    closeDoctorModal();
  }

  function deleteDoctorFromForm() {
    const els = getDoctorModalEls();
    const mode = els.mode.value;
    if (mode !== "edit") return;

    const id = els.id.value.trim();
    const doc = doctors.find((d) => d.id.toLowerCase() === id.toLowerCase());
    if (!doc) return;

    const ok = confirm(`Delete doctor ${doc.name} (${doc.id})?`);
    if (!ok) return;

    doctors = doctors.filter((d) => d.id.toLowerCase() !== id.toLowerCase());
    saveDoctors();
    renderAndRefresh();
    closeDoctorModal();
  }

  function attachEvents() {
    $("#patientAddBtn")?.addEventListener("click", () => openModal("add"));
    $("#doctorAddBtn")?.addEventListener("click", () => openDoctorModal("add"));

    const els = getModalEls();
    const doctorEls = getDoctorModalEls();

    els.save?.addEventListener("click", upsertPatientFromForm);
    els.cancel?.addEventListener("click", closeModal);
    doctorEls.save?.addEventListener("click", upsertDoctorFromForm);
    doctorEls.cancel?.addEventListener("click", closeDoctorModal);
    if (doctorEls.delete) doctorEls.delete.addEventListener("click", deleteDoctorFromForm);

    els.delete?.addEventListener("click", deletePatientFromForm);

    els.closeBtns?.forEach((b) => b.addEventListener("click", closeModal));
    doctorEls.closeBtns?.forEach((b) =>
      b.addEventListener("click", closeDoctorModal),
    );

    const sidebarToggle = $("#sidebarToggle");
    const sidebarClose = $("#sidebarClose");
    const sidebarOverlay = $("#sidebarOverlay");
    const closeSidebar = () => document.body.classList.remove("sidebar-open");

    sidebarToggle?.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
    });
    sidebarClose?.addEventListener("click", closeSidebar);
    sidebarOverlay?.addEventListener("click", closeSidebar);
    document.querySelectorAll(".sidebar .nav-item").forEach((nav) => {
      nav.addEventListener("click", () => {
        if (window.innerWidth <= 992) closeSidebar();
      });
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) closeSidebar();
    });

    $("#dashboardAddPatientBtn")?.addEventListener("click", () =>
      openModal("add"),
    );
    $("#dashboardAddDoctorBtn")?.addEventListener("click", () =>
      openDoctorModal("add"),
    );
    $("#dashboardNewAppointmentBtn")?.addEventListener("click", () => {
      window.location.hash = "#appointments";
    });
    $("#dashboardGenerateReportBtn")?.addEventListener("click", () => {
      window.location.hash = "#billing";
    });

    els.modal?.addEventListener("click", (e) => {
      if (e.target === els.modal) closeModal();
    });
    doctorEls.modal?.addEventListener("click", (e) => {
      if (e.target === doctorEls.modal) closeDoctorModal();
    });

    $("#patientSearchInput")?.addEventListener("input", () =>
      renderAndRefresh(),
    );
    $("#patientStatusFilter")?.addEventListener("change", () =>
      renderAndRefresh(),
    );
    $("#patientWardFilter")?.addEventListener("input", () =>
      renderAndRefresh(),
    );

    $("#doctorSearchInput")?.addEventListener("input", () =>
      renderAndRefresh(),
    );
    $("#doctorStatusFilter")?.addEventListener("change", () =>
      renderAndRefresh(),
    );

    $("#doctorExportBtn")?.addEventListener("click", exportDoctorsCsv);

    $("#departmentSearchInput")?.addEventListener("input", () =>
      renderDepartments($("#departmentSearchInput")?.value || ""),
    );
    $("#billingSearchInput")?.addEventListener("input", () =>
      renderBilling({
        search: $("#billingSearchInput")?.value || "",
        status: $("#billingStatusFilter")?.value || "all",
      }),
    );
    $("#billingStatusFilter")?.addEventListener("change", () =>
      renderBilling({
        search: $("#billingSearchInput")?.value || "",
        status: $("#billingStatusFilter")?.value || "all",
      }),
    );
    $("#patientResetBtn")?.addEventListener("click", () => {
      const search = $("#patientSearchInput");
      const status = $("#patientStatusFilter");
      const ward = $("#patientWardFilter");
      if (search) search.value = "";
      if (status) {
        status.value = "all";
        status.dispatchEvent(new Event("change"));
      }
      if (ward) ward.value = "";
      renderAndRefresh();
    });

    // View switcher buttons
    $("#patientViewTableBtn")?.addEventListener("click", () => {
      localStorage.setItem("lifecare_patient_view_mode", "table");
      renderPatientTable(getFilterState());
    });
    $("#patientViewGridBtn")?.addEventListener("click", () => {
      localStorage.setItem("lifecare_patient_view_mode", "grid");
      renderPatientTable(getFilterState());
    });

    $("#doctorViewTableBtn")?.addEventListener("click", () => {
      localStorage.setItem("lifecare_doctor_view_mode", "table");
      renderDoctorTable(getDoctorFilterState());
    });
    $("#doctorViewGridBtn")?.addEventListener("click", () => {
      localStorage.setItem("lifecare_doctor_view_mode", "grid");
      renderDoctorTable(getDoctorFilterState());
    });

    // EHR Drawer close and note events
    $("#ehrDrawerCloseBtn")?.addEventListener("click", closeEhrDrawer);
    $("#ehrDrawerBackdrop")?.addEventListener("click", closeEhrDrawer);
    $("#ehrAddNoteBtn")?.addEventListener("click", addEhrProgressNote);
    $("#ehrNewNoteInput")?.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        addEhrProgressNote();
      }
    });

    document.addEventListener("click", (e) => {
      const patientIcon = e.target.closest("[data-action]");
      if (patientIcon) {
        const container = patientIcon.closest("[data-patient-id]");
        if (container) {
          const id = container.getAttribute("data-patient-id");
          const patient = patients.find((p) => p.id === id);
          if (!patient) return;

          const action = patientIcon.getAttribute("data-action");
          if (action === "edit") {
            openModal("edit", patient);
            return;
          }

          if (action === "view") {
            openEhrDrawer(patient.id);
            return;
          }

          if (action === "call") {
            alert(`📞 Calling Patient: ${patient.name}\nPhone: +1-202-555-${patient.id.replace(/\D/g,'') || '0199'}`);
            return;
          }
        }
      }

      const doctorIcon = e.target.closest("[data-doctor-action]");
      if (doctorIcon) {
        const card = doctorIcon.closest("[data-doctor-id]");
        if (card) {
          const id = card.getAttribute("data-doctor-id");
          const doctor = doctors.find((d) => d.id === id);
          if (doctor) {
            const action = doctorIcon.getAttribute("data-doctor-action");
            if (action === "view") {
              showDoctorDetails(doctor);
              return;
            }
            if (action === "edit") {
              openDoctorModal("edit", doctor);
              return;
            }
            if (action === "call") {
              alert(`📞 Calling Dr. ${doctor.name} at ${doctor.phone}`);
              return;
            }
          }
        }
      }

      const billingIcon = e.target.closest("[data-billing-action]");
      if (billingIcon) {
        const row = billingIcon.closest("[data-invoice-id]");
        if (row) {
          const invoiceId = row.getAttribute("data-invoice-id");
          const action = billingIcon.getAttribute("data-billing-action");
          if (action === "view") {
            openInvoiceModal(invoiceId);
            return;
          }
          if (action === "download") {
            downloadInvoicePdf(invoiceId);
            return;
          }
        }
      }

      const apptBtn = e.target.closest("[data-action]");
      if (apptBtn && apptBtn.closest(".appt-card")) {
        const card = apptBtn.closest(".appt-card");
        const apptId = card.getAttribute("data-appt-id");
        const action = apptBtn.getAttribute("data-action");
        if (action === "cancel-appt" || action === "complete-appt") {
          handleApptAction(apptId, action);
          return;
        }
      }

      const shiftBtn = e.target.closest(".edit-shift-btn");
      if (shiftBtn) {
        const dept = shiftBtn.getAttribute("data-dept");
        const shift = shiftBtn.getAttribute("data-shift");
        openDeptShiftModal(dept, shift);
        return;
      }
    });

    document.querySelectorAll("[data-invoice-modal-close]").forEach((btn) => {
      btn.addEventListener("click", closeInvoiceModal);
    });

    $("#invoiceDownloadPdfBtn")?.addEventListener("click", () => {
      if (activeInvoiceId) downloadInvoicePdf(activeInvoiceId);
    });

    // Upgraded feature buttons
    $("#apptAddNewBtn")?.addEventListener("click", () => openApptModal("add"));
    $("#apptSearchInput")?.addEventListener("input", renderAppointments);
    $("#apptDeptFilter")?.addEventListener("change", renderAppointments);
    $("#apptCancelBtn")?.addEventListener("click", closeApptModal);
    $("#apptSaveBtn")?.addEventListener("click", saveAppointmentForm);
    $("#apptModalCloseBtn")?.addEventListener("click", closeApptModal);
    $("#apptModalBackdrop")?.addEventListener("click", closeApptModal);

    $("#deptShiftCancelBtn")?.addEventListener("click", closeDeptShiftModal);
    $("#deptShiftSaveBtn")?.addEventListener("click", saveDeptShiftAssignment);
    $("#deptShiftCloseBtn")?.addEventListener("click", closeDeptShiftModal);
    $("#deptShiftBackdrop")?.addEventListener("click", closeDeptShiftModal);
  }

  let activeEcgPatientId = null;
  let ecgAnimationId = null;
  let ecgSweepIndex = 0;
  let ecgBuffer = new Array(400).fill(40);

  function getEcgY(timeMs, hr) {
    const beatInterval = 60000 / hr;
    const timeInBeat = timeMs % beatInterval;
    const baseline = 40;
    const t = timeInBeat;
    if (t > 50 && t <= 100) {
      const progress = (t - 50) / 50;
      return baseline - Math.sin(progress * Math.PI) * 4;
    } else if (t > 150 && t <= 170) {
      const progress = (t - 150) / 20;
      return baseline + progress * 6;
    } else if (t > 170 && t <= 195) {
      const progress = (t - 170) / 25;
      if (progress < 0.5) {
        return baseline + 6 - (progress / 0.5) * 36;
      } else {
        return baseline - 30 + ((progress - 0.5) / 0.5) * 55;
      }
    } else if (t > 195 && t <= 220) {
      const progress = (t - 195) / 25;
      return baseline + 25 - progress * 25;
    } else if (t > 250 && t <= 330) {
      const progress = (t - 250) / 80;
      return baseline - Math.sin(progress * Math.PI) * 6;
    }
    return baseline;
  }

  function getSpo2Y(timeMs, hr) {
    const beatInterval = 60000 / hr;
    const timeInBeat = timeMs % beatInterval;
    const baseline = 35;
    const t = timeInBeat;
    if (t > 50 && t <= 120) {
      const progress = (t - 50) / 70;
      return baseline - Math.sin(progress * Math.PI) * 15;
    } else if (t > 120 && t <= 160) {
      const progress = (t - 120) / 40;
      return baseline - 5 + Math.sin(progress * Math.PI) * 3;
    }
    return baseline;
  }

  function getRrY(timeMs, rr) {
    const baseline = 30;
    const cycleInterval = 60000 / rr;
    const phase = (timeMs % cycleInterval) / cycleInterval;
    return baseline - Math.sin(phase * 2 * Math.PI) * 15;
  }

  function startEcgAnimation() {
    if (ecgAnimationId) cancelAnimationFrame(ecgAnimationId);
    const canvas = $("#ecgCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    function drawFrame(now) {
      if (!activeEcgPatientId) return;
      const patient = patients.find(p => p.id === activeEcgPatientId);
      const hrVal = patient ? Number(patient.heartRate || 72) : 72;
      
      const speed = 2.5;
      const startSweep = ecgSweepIndex;
      ecgSweepIndex = (ecgSweepIndex + speed) % canvas.width;
      
      for (let i = 0; i < speed; i++) {
        const xIdx = Math.floor((startSweep + i) % canvas.width);
        const tOffset = (xIdx / canvas.width) * 1000;
        ecgBuffer[xIdx] = getEcgY(now + tOffset, hrVal);
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = "rgba(16, 185, 129, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#10b981";
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 8;
      
      let first = true;
      for (let x = 0; x < canvas.width; x++) {
        const diff = (x - ecgSweepIndex + canvas.width) % canvas.width;
        if (diff < 15) {
          first = true;
          continue;
        }
        const y = ecgBuffer[x];
        if (first) {
          ctx.moveTo(x, y);
          first = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      const idx = Math.floor(ecgSweepIndex);
      ctx.beginPath();
      ctx.arc(ecgSweepIndex, ecgBuffer[idx], 4, 0, 2 * Math.PI);
      ctx.fillStyle = "#34d399";
      ctx.shadowColor = "#34d399";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ecgAnimationId = requestAnimationFrame(drawFrame);
    }
    ecgAnimationId = requestAnimationFrame(drawFrame);
  }

  // ==========================================
  // REAL-TIME CLINICAL TELEMETRY ON DASHBOARD
  // ==========================================
  let telemetrySweepIndex = 0;
  let telemetryEcgBuffer = new Array(400).fill(30);
  let telemetrySpo2Buffer = new Array(400).fill(30);
  let telemetryRrBuffer = new Array(400).fill(30);
  let telemetryAnimationId = null;

  function startDashboardTelemetry() {
    const ecgCanvas = $("#telemetryEcgCanvas");
    const spo2Canvas = $("#telemetrySpo2Canvas");
    const rrCanvas = $("#telemetryRrCanvas");
    if (!ecgCanvas || !spo2Canvas || !rrCanvas) return;
    
    const ecgCtx = ecgCanvas.getContext("2d");
    const spo2Ctx = spo2Canvas.getContext("2d");
    const rrCtx = rrCanvas.getContext("2d");
    
    function drawTelemetryFrame(now) {
      const activeHash = window.location.hash || "#dashboard";
      if (activeHash !== "#dashboard") {
        telemetryAnimationId = requestAnimationFrame(drawTelemetryFrame);
        return;
      }
      
      const dateSeed = Math.floor(now / 3000);
      const hr = 72 + (dateSeed % 3) - (dateSeed % 2);
      const spo2 = 98 - (dateSeed % 2);
      const rr = 17 + (dateSeed % 2);
      
      if ($("#telemetryHr")) $("#telemetryHr").textContent = hr;
      if ($("#telemetrySpo2")) $("#telemetrySpo2").textContent = spo2;
      if ($("#telemetryRr")) $("#telemetryRr").textContent = rr;
      
      const speed = 2.5;
      const startSweep = telemetrySweepIndex;
      telemetrySweepIndex = (telemetrySweepIndex + speed) % 400;
      
      for (let i = 0; i < speed; i++) {
        const xIdx = Math.floor((startSweep + i) % 400);
        const tOffset = (xIdx / 400) * 1000;
        telemetryEcgBuffer[xIdx] = getEcgY(now + tOffset, hr) - 10;
        telemetrySpo2Buffer[xIdx] = getSpo2Y(now + tOffset, hr);
        telemetryRrBuffer[xIdx] = getRrY(now + tOffset, rr);
      }
      
      drawScreen(ecgCtx, telemetryEcgBuffer, "#10b981");
      drawScreen(spo2Ctx, telemetrySpo2Buffer, "#3b82f6");
      drawScreen(rrCtx, telemetryRrBuffer, "#f59e0b");
      
      telemetryAnimationId = requestAnimationFrame(drawTelemetryFrame);
    }
    
    function drawScreen(ctx, buffer, color) {
      ctx.clearRect(0, 0, 400, 60);
      
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < 400; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 60);
        ctx.stroke();
      }
      for (let y = 0; y < 60; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(400, y);
        ctx.stroke();
      }
      
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      
      let first = true;
      for (let x = 0; x < 400; x++) {
        const diff = (x - telemetrySweepIndex + 400) % 400;
        if (diff < 12) {
          first = true;
          continue;
        }
        const y = buffer[x];
        if (first) {
          ctx.moveTo(x, y);
          first = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      const idx = Math.floor(telemetrySweepIndex);
      ctx.beginPath();
      ctx.arc(telemetrySweepIndex, buffer[idx], 3, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    
    telemetryAnimationId = requestAnimationFrame(drawTelemetryFrame);
  }

  function renderEhrLogs(patient) {
    const list = $("#ehrLogsList");
    if (!list) return;
    if (!patient.logs || patient.logs.length === 0) {
      list.innerHTML = `
        <div style="color: var(--gray-500); font-size: 0.9rem; padding: 12px 0; text-align: center;">
          No clinical notes recorded for this patient.
        </div>
      `;
      return;
    }
    list.innerHTML = patient.logs
      .map(
        (log) => `
          <div class="ehr-log-item">
            <div class="ehr-log-meta">
              <span class="ehr-log-author"><i class="fas fa-user-md"></i> ${escapeHtml(log.author)}</span>
              <span class="ehr-log-date">${escapeHtml(log.date)}</span>
            </div>
            <div class="ehr-log-text">${escapeHtml(log.text)}</div>
          </div>
        `
      )
      .join("");
  }

  function openEhrDrawer(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    activeEcgPatientId = patientId;

    const drawerAvatar = $("#ehrDrawerAvatar");
    if (drawerAvatar) {
      drawerAvatar.textContent = getInitials(patient.name);
      drawerAvatar.style.background = getAvatarStyle(patient.name);
    }
    if ($("#ehrDrawerName")) $("#ehrDrawerName").textContent = patient.name;
    if ($("#ehrDrawerId")) $("#ehrDrawerId").textContent = patient.id;

    if ($("#ehrDrawerHeartRateVal")) $("#ehrDrawerHeartRateVal").textContent = patient.heartRate || "72";
    if ($("#ehrDrawerHeartRate")) $("#ehrDrawerHeartRate").textContent = (patient.heartRate || "72") + " bpm";
    if ($("#ehrDrawerBloodPressure")) $("#ehrDrawerBloodPressure").textContent = patient.bloodPressure || "120/80";
    if ($("#ehrDrawerTemperature")) $("#ehrDrawerTemperature").textContent = (patient.temperature || "36.8") + " °C";

    if ($("#ehrDrawerAge")) $("#ehrDrawerAge").textContent = patient.age || "—";
    if ($("#ehrDrawerGender")) $("#ehrDrawerGender").textContent = patient.gender || "—";
    if ($("#ehrDrawerBloodGroup")) $("#ehrDrawerBloodGroup").textContent = patient.bloodGroup || "—";
    
    const dStatus = $("#ehrDrawerStatus");
    if (dStatus) {
      const cls = statusBadgeClass(patient.status);
      dStatus.className = `status-badge ${cls}`;
      const isPulsing = patient.status !== "discharged";
      
      let dotColor = "var(--gray-400)";
      if (patient.status === "admitted") dotColor = "#16a34a";
      else if (patient.status === "outpatient") dotColor = "#2563eb";
      else if (patient.status === "emergency") dotColor = "#dc2626";
      else if (patient.status === "observation") dotColor = "#ea580c";

      dStatus.innerHTML = `<span class="status-dot ${isPulsing ? 'pulsing' : ''}" style="color: ${dotColor}; background-color: ${dotColor};"></span>${patient.status}`;
    }

    if ($("#ehrDrawerWard")) $("#ehrDrawerWard").textContent = patient.ward || "—";
    if ($("#ehrDrawerDiagnosis")) $("#ehrDrawerDiagnosis").textContent = patient.diagnosis || "No primary diagnosis";
    if ($("#ehrDrawerAdmit")) {
      $("#ehrDrawerAdmit").textContent = patient.admitDate 
        ? `${patient.admitDate} ${patient.admitTime || ""}`.trim() 
        : "—";
    }
    if ($("#ehrDrawerCheckout")) {
      $("#ehrDrawerCheckout").textContent = patient.dischargeDate 
        ? `${patient.dischargeDate} ${patient.dischargeTime || ""}`.trim() 
        : (patient.status === "discharged" ? "Discharged" : "Active Stay");
    }

    renderEhrLogs(patient);

    const drawer = $("#ehrDrawer");
    if (drawer) drawer.classList.add("open");

    startEcgAnimation();
  }

  function closeEhrDrawer() {
    const drawer = $("#ehrDrawer");
    if (drawer) drawer.classList.remove("open");
    activeEcgPatientId = null;
    if (ecgAnimationId) cancelAnimationFrame(ecgAnimationId);
    ecgAnimationId = null;
  }

  function addEhrProgressNote() {
    if (!activeEcgPatientId) return;
    const input = $("#ehrNewNoteInput");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const patient = patients.find(p => p.id === activeEcgPatientId);
    if (!patient) return;

    if (!Array.isArray(patient.logs)) {
      patient.logs = [];
    }

    const now = new Date();
    const dateStr = now.getFullYear() + "-" + 
      String(now.getMonth() + 1).padStart(2, '0') + "-" + 
      String(now.getDate()).padStart(2, '0') + " " + 
      String(now.getHours()).padStart(2, '0') + ":" + 
      String(now.getMinutes()).padStart(2, '0');

    patient.logs.push({
      date: dateStr,
      author: "Dr. Patel",
      text: text
    });

    input.value = "";
    savePatients();
    renderEhrLogs(patient);
    renderAndRefresh();
  }

  // ============================================================
  // RENDER & REFRESH — calls all render functions at once.
  // Call this after any data change to keep the UI in sync.
  // ============================================================
  function renderAndRefresh() {
    renderPatientTable(getFilterState());
    renderDoctorTable(getDoctorFilterState());
    updateStats();
    renderAppointments();
    renderDepartments($("#departmentSearchInput")?.value || "");
    renderBilling({
      search: $("#billingSearchInput")?.value || "",
      status: $("#billingStatusFilter")?.value || "all",
    });
  }

  // ============================================================
  // MODULE FUNCTIONS — appointments, shifts, and other modals
  // ============================================================

  // --- Appointments Modal CRUD ---
  function openApptModal(mode = "add", appt = null) {
    const modal = $("#appointmentModal");
    if (!modal) return;

    // Populate doctor dropdown from active doctors list
    const docSelect = $("#apptDoctorSelect");
    if (docSelect) {
      docSelect.innerHTML = doctors
        .map(d => `<option value="${escapeHtml(d.name)}">${escapeHtml(d.name)} (${escapeHtml(d.specialty)})</option>`)
        .join("");
    }

    if (mode === "add") {
      $("#apptModalTitle").textContent = "New Appointment";
      $("#apptIdInput").value = "";
      $("#apptPatientInput").value = "";
      $("#apptDateInput").value = new Date().toISOString().split('T')[0];
      $("#apptTimeInput").value = "09:00";
    }

    modal.classList.add("open");
  }

  function closeApptModal() {
    $("#appointmentModal")?.classList.remove("open");
  }

  function saveAppointmentForm() {
    const patientName = $("#apptPatientInput")?.value.trim();
    const doctorName = $("#apptDoctorSelect")?.value;
    const apptDate = $("#apptDateInput")?.value;
    const apptTime = $("#apptTimeInput")?.value;
    const apptDept = $("#apptDeptSelect")?.value;

    if (!patientName) {
      alert("Please enter patient name.");
      return;
    }
    if (!doctorName) {
      alert("Please select a doctor.");
      return;
    }
    if (!apptDate || !apptTime) {
      alert("Please select date and time.");
      return;
    }

    let timeFormatted = apptTime;
    try {
      const [h, m] = apptTime.split(":");
      const hours = parseInt(h);
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      timeFormatted = `${String(displayHours).padStart(2, '0')}:${m} ${ampm}`;
    } catch {}

    const newAppt = {
      id: "A-" + Date.now(),
      patient: patientName,
      doctor: doctorName,
      date: apptDate,
      time: timeFormatted,
      dept: apptDept,
      status: "confirmed"
    };

    appointments.unshift(newAppt);
    saveAppointments();
    renderAndRefresh();
    closeApptModal();
  }

  function handleApptAction(id, action) {
    const idx = appointments.findIndex(a => a.id === id);
    if (idx === -1) return;

    if (action === "cancel-appt") {
      const ok = confirm(`Are you sure you want to cancel the appointment for ${appointments[idx].patient}?`);
      if (!ok) return;
      appointments[idx].status = "cancelled";
    } else if (action === "complete-appt") {
      appointments[idx].status = "completed";
    }

    saveAppointments();
    renderAndRefresh();
  }

  // --- Department Shift Allocation ---
  let activeShiftDept = null;
  let activeShiftType = null;

  function openDeptShiftModal(dept, shift) {
    const modal = $("#deptShiftModal");
    if (!modal) return;

    activeShiftDept = dept;
    activeShiftType = shift;

    if ($("#deptShiftName")) $("#deptShiftName").textContent = dept;
    if ($("#deptShiftLabel")) $("#deptShiftLabel").textContent = shift.charAt(0).toUpperCase() + shift.slice(1);

    const select = $("#deptShiftDoctorSelect");
    if (select) {
      select.innerHTML = doctors
        .map(d => `<option value="${escapeHtml(d.name)}">${escapeHtml(d.name)} (${escapeHtml(d.specialty)})</option>`)
        .join("");

      const currentShiftVal = departmentShifts[dept]?.[shift];
      if (currentShiftVal && currentShiftVal !== "—") {
        select.value = currentShiftVal;
      }
    }

    modal.classList.add("open");
  }



  function closeDeptShiftModal() {
    $("#deptShiftModal")?.classList.remove("open");
  }

  function saveDeptShiftAssignment() {
    const docName = $("#deptShiftDoctorSelect")?.value;
    if (!docName || !activeShiftDept || !activeShiftType) return;

    if (!departmentShifts[activeShiftDept]) {
      departmentShifts[activeShiftDept] = { morning: "—", afternoon: "—", night: "—" };
    }

    departmentShifts[activeShiftDept][activeShiftType] = docName;
    saveDepartmentShifts();
    renderAndRefresh();
    closeDeptShiftModal();
  }

  const routePages = {
    "#dashboard": "dashboardPage",
    "#patients": "patientsPage",
    "#doctors": "doctorsPage",
    "#appointments": "appointmentsPage",
    "#departments": "departmentsPage",
    "#billing": "billingPage",
  };

  const routeTitles = {
    "#dashboard": "Dashboard | LifeCare",
    "#patients": "Patients | LifeCare",
    "#doctors": "Doctors | LifeCare",
    "#appointments": "Appointments | LifeCare",
    "#departments": "Departments | LifeCare",
    "#billing": "Billing | LifeCare",
  };

  function setActivePage(hash) {
    const normalized = (
      String(hash || window.location.hash).toLowerCase() || "#dashboard"
    ).replace(/^#+/, (match) => "#");
    const pageId = routePages[normalized] || routePages["#dashboard"];
    document.querySelectorAll(".page-view").forEach((page) => {
      page.classList.toggle("active", page.id === pageId);
    });
    document.querySelectorAll(".sidebar .nav-item").forEach((nav) => {
      const navHref = nav.getAttribute("href")?.toLowerCase() || "";
      const isActive = navHref === normalized;
      nav.classList.toggle("active", isActive);
      if (isActive) {
        nav.setAttribute("aria-current", "page");
      } else {
        nav.removeAttribute("aria-current");
      }
    });
    document.title = routeTitles[normalized] || routeTitles["#dashboard"];
    if (window.location.hash !== normalized) {
      history.replaceState(null, "", normalized);
    }
  }

  function getDoctorFilterState() {
    const text = $("#doctorSearchInput")?.value || "";
    const status = $("#doctorStatusFilter")?.value || "all";
    return { filterText: text, filterStatus: status };
  }

  function exportDoctorsCsv() {
    if (!doctors.length) {
      alert("No doctor data to export.");
      return;
    }

    const headers = ["ID", "Name", "Specialty", "Status", "Email", "Ward", "Phone", "Rating", "Experience (Years)", "Schedule"];
    const rows = doctors.map((d) => [
      d.id,
      d.name,
      d.specialty,
      d.status,
      d.email,
      d.ward,
      d.phone || "",
      d.rating || "4.8",
      d.experienceYears || "5",
      d.schedule || ""
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lifecare_doctors.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function showDoctorDetails(doctor) {
    alert(
      `🏥 Dr. ${doctor.name} (${doctor.id})\n` +
      `---------------------------------\n` +
      `Specialty: ${doctor.specialty}\n` +
      `Status: ${doctor.status.toUpperCase()}\n` +
      `Experience: ${doctor.experienceYears} Years\n` +
      `Rating: ⭐ ${doctor.rating.toFixed(1)}/5.0\n` +
      `Schedule: ${doctor.schedule}\n` +
      `Email: ${doctor.email}\n` +
      `Phone: ${doctor.phone}\n` +
      `Assigned Ward: ${doctor.ward || "—"}`
    );
  }

  // Simulated updates for dynamic indicators
  function simulateLiveUpdate() {
    setTimeout(() => {
      const labEl = $("#labsPending");
      if (labEl) {
        const current = parseInt(labEl.textContent, 10);
        if (!Number.isNaN(current)) labEl.textContent = String(current + 1);
        labEl.style.transition = "color 0.2s";
        labEl.style.color = "var(--accent)";
        setTimeout(() => {
          labEl.style.color = "";
        }, 600);
      }

      const firstCard = document.querySelector(
        ".appt-card .appt-detail span:last-child",
      );
      const icon = firstCard?.querySelector("i");
      if (icon) {
        icon.className = "fas fa-circle";
        icon.style.color = "#22c55e";
        icon.style.fontSize = "0.65rem";
      }
    }, 4000);
  }

  function initCustomSelects() {
    const selectIds = ["#patientStatusFilter", "#doctorStatusFilter"];
    selectIds.forEach((selectId) => {
      const select = $(selectId);
      if (!select) return;

      select.style.display = "none";

      const container = document.createElement("div");
      container.className = "custom-select-container";
      if (selectId === "#patientStatusFilter") {
        container.id = "patientStatusFilterContainer";
      } else {
        container.id = "doctorStatusFilterContainer";
      }

      const trigger = document.createElement("div");
      trigger.className = "custom-select-trigger";
      const triggerText = document.createElement("span");
      triggerText.textContent = select.options[select.selectedIndex]?.text || "";
      const triggerIcon = document.createElement("i");
      triggerIcon.className = "fas fa-chevron-down";
      trigger.appendChild(triggerText);
      trigger.appendChild(triggerIcon);
      container.appendChild(trigger);

      const dropdown = document.createElement("div");
      dropdown.className = "custom-select-dropdown";

      Array.from(select.options).forEach((opt, idx) => {
        const optionDiv = document.createElement("div");
        optionDiv.className = "custom-select-option";
        if (idx === select.selectedIndex) {
          optionDiv.classList.add("selected");
        }
        optionDiv.textContent = opt.text;
        optionDiv.dataset.value = opt.value;

        optionDiv.addEventListener("click", (e) => {
          e.stopPropagation();
          container.querySelectorAll(".custom-select-option").forEach((o) => {
            o.classList.remove("selected");
          });
          optionDiv.classList.add("selected");
          triggerText.textContent = opt.text;
          select.value = opt.value;
          select.dispatchEvent(new Event("change"));
          container.classList.remove("open");
        });

        dropdown.appendChild(optionDiv);
      });

      container.appendChild(dropdown);
      select.parentNode.insertBefore(container, select.nextSibling);

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll(".custom-select-container").forEach((c) => {
          if (c !== container) c.classList.remove("open");
        });
        container.classList.toggle("open");
      });

      select.addEventListener("change", () => {
        const val = select.value;
        const activeOpt = Array.from(select.options).find((opt) => opt.value === val);
        if (activeOpt) {
          triggerText.textContent = activeOpt.text;
        }
        container.querySelectorAll(".custom-select-option").forEach((optDiv) => {
          if (optDiv.dataset.value === val) {
            optDiv.classList.add("selected");
          } else {
            optDiv.classList.remove("selected");
          }
        });
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".custom-select-container").forEach((c) => {
        c.classList.remove("open");
      });
    });
  }

  // ============================================================
  // APP STARTUP — runs once when the page loads
  // ============================================================
  function init() {
    setCurrentDate();           // show today's date in the header
    initCustomSelects();        // style the dropdown filters
    renderAndRefresh();         // draw all sections with initial data
    attachEvents();             // wire up all button/input listeners
    setActivePage(window.location.hash || "#dashboard"); // go to correct page
    // Listen for browser back/forward navigation
    window.addEventListener("hashchange", () => setActivePage(window.location.hash));
    simulateLiveUpdate();       // start the live lab-count ticker
    startDashboardTelemetry();  // start the ECG/vitals animations
  }

  // Run init() when the DOM is ready (supports both load timings)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
