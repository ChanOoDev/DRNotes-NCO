# Dr. Note: UI/UX Design System & Responsive Strategy

## 1. Design System & Theme

The core design philosophy for Dr. Note centers on clinical clarity, ease of use, and professional reliability to address the risks of misdiagnosis and fragile record-keeping.

- **Theme Concept:** Material Light Blue & Clear White.
- **Primary Color:** Material Light Blue (`#BBDEFB` for backgrounds / `#64B5F6` for primary actions).
- **Secondary Color:** Deep Navy (`#1E3A8A`) for text and critical information to ensure high contrast.
- **Background:** Clean White (`#FFFFFF`) to maintain a sterile, clinical aesthetic.
- **Typography:** Sans-serif (Inter) for high legibility across various screen resolutions.
- **Iconography:** Outlined Material Icons to reduce visual noise while maintaining clear metaphors for medical actions.

## 2. Responsive UI/UX Strategy

Adopting a "Mobile-First" approach is critical for doctors and medical staff who may use handheld devices during consultations. The following pattern transitions define our responsive adaptation:

| Mobile (Touch-First) | Desktop (Pointer-Driven) | Transition Mechanic |
|---|---|---|
| Bottom Sheet Slide-up | Contextual Dropdown / Modal | Shift from fixed `bottom: 0` to absolute centered modal overlay at `768px+`. |
| Pinned FAB (Action) | Top Right Header Action Bar | Floating element docks into the standard layout header grid as width increases. |
| Stacked Summary Cards | Tabular Data Grid | Transition `flex-direction: column` to `display: table-row` for denser data. |

## 3. Workflow UX Mapping

The system is architected to minimize cognitive load during high-pressure clinical environments.

### Phase 1: Receptionist & Auth

- **Login:** Minimalist centered card on a light blue gradient. Large, touch-friendly input fields for mobile accessibility.
- **Dashboard:**
  - **Mobile:** A Pinned FAB for "Register Patient" ensures the most frequent action is always reachable.
  - **Desktop:** A permanent sidebar navigation paired with a comprehensive table view of pending patients.

### Phase 2: Patient Registration

- **Form Design:** Grouped fields using Steppers (Personal Info → Medical History → Insurance) to prevent form fatigue.
  - **Mobile:** Single-column scrollable form for focused data entry.
  - **Desktop:** Multi-column layout with a right-hand validation sidebar to show missing fields in real-time.

### Phase 3: Doctor Consultation

- **History Viewer:**
  - **Mobile:** Tabbed navigation (History, Diagnosis, Prescriptions) for quick thumb-switching.
  - **Desktop:** Split-screen layout allowing the doctor to view patient history on the left while taking active notes on the right.
- **Record Taking:** Implementation of a Floating Action Button (FAB) at the bottom right for "Quick Add" (Diagnosis/Prescription) to streamline the consultation process.

### Phase 4: Prescription & Management

- **Intelligent Search:** Auto-complete search for drugs to reduce typing time and minimize errors in medication dosage.
- **Action Persistence:** Clear "Save" or "Submit" actions that remain sticky on mobile to ensure data is never lost during transit.

## 4. Accessibility & Clinical Standards

- **Contrast:** Maintain a minimum 4.5:1 ratio for all text to ensure readability for staff of all ages under various lighting conditions.
- **Touch Targets:** Minimum 44×44px for all interactive elements to accommodate medical staff using handheld devices or wearing gloves.
- **Feedback Loops:** Instant visual confirmation (toast notifications or status shifts) after saving records to mitigate the risk of lost physical data.
- **System Integrity:** Standardized forms (React Hook Form + Zod) to ensure data validation before DB submission.

---

**Lead Designer:** Person
**Approval Date:**
