# 🛠️ FixItNow — On-Demand Home Service Booking Platform

FixItNow is a modern, responsive, full-stack home service marketplace built with the **Next.js App Router**, **TypeScript**, and **Tailwind CSS**, connected to an **Express.js / Prisma / PostgreSQL** backend. The platform enables customers to discover trade specialists, schedule bookings with real-time slot selection, pay securely via Stripe, and leave verified reviews, while technicians manage job lifecycles and schedules, and administrators oversee platform-wide operations.

---

## 🌟 Key Features

### 👤 Customer Experience
* **Service Discovery & Search:** Dynamic service catalog with multi-factor search, price filtering, and trade category chips.
* **Technician Profiles (`/technicians/[id]`):** Detailed specialist portfolios displaying bios, verified experience badges, customer review ratings, and direct contact options.
* **Interactive Slot Picker:** Schedule service visits selecting available working windows directly from technician calendars.
* **Stripe Checkout Integration:** Secure payments for accepted bookings with dynamic redirection handling (`/payment/success` and `/payment/cancel`).
* **Booking Lifecycle Management:** Live booking tracker with real-time status badges (`REQUESTED`, `ACCEPTED`, `PAID`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
* **Post-Job Review System:** Verified customer modal to rate completed services (1–5 stars) and leave written testimonials.
* **Conditional Cancellation:** Easy cancellation workflow for bookings prior to the `IN_PROGRESS` phase.

### 🔧 Technician Portal (`/technician-dashboard`)
* **Job Management Queue:** Real-time incoming booking feed with one-click transitions (`Accept`, `Start Job`, `Mark Completed`).
* **Availability Scheduler (`/availability`):** Shift scheduler supporting day-by-day preset slots (Morning, Afternoon, Evening, Full Day) and custom working hour ranges.
* **Profile & Rate Settings (`/profile`):** Form to update professional trade credentials, certifications, hourly rates, service location, and specialties.
* **Service Publishing:** Direct in-portal service creator to list new offerings with descriptions, pricing, and category tagging.

### 🛡️ Admin Moderation Suite (`/admin-dashboard`)
* **Platform KPI Metrics:** Real-time summary cards tracking gross revenue, total active specialists, customer counts, and open bookings.
* **User Management (`/users`):** Account control registry with instant user moderation (`ACTIVE` vs. `BANNED`).
* **Category Management (`/categories`):** Tooling to add, edit, and organize marketplace trade categories.
* **Global Bookings Audit (`/bookings`):** Full oversight over all transactions, assignments, and job statuses.

---

## 🧰 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions, Suspense streaming)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives, Dialog, Dropdown, Badges, Cards)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Notifications:** [Sonner](https://sonner.emilkowal.com/)
* **State & Data Fetching:** Next.js Server Components, Server Actions, `revalidatePath`, Cookie-based JWT Auth
* **Payments:** [Stripe](https://stripe.com/) Checkout Sessions & Webhooks

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/                     # Auth routes (login, register)
│   ├── (dashboardGroup)/
│   │   ├── dashboard/              # Customer portal (booking cards, payments, reviews)
│   │   ├── technician-dashboard/   # Technician portal
│   │   │   ├── _actions/           # Booking status, profile & availability Server Actions
│   │   │   ├── _components/        # Scheduler, profile form, status buttons
│   │   │   ├── availability/       # Working hours calendar page
│   │   │   ├── profile/            # Profile settings & service publishing
│   │   │   └── page.tsx            # Assigned jobs feed
│   │   └── admin-dashboard/        # Admin portal (metrics, users, categories, bookings)
│   ├── (publicGroup)/
│   │   ├── services/               # Public service discovery & search catalog
│   │   ├── technicians/            # Specialist directory & profile view
│   │   └── payment/                # Stripe outcome redirects (success / cancel)
│   ├── layout.tsx                  # Global root layout & providers
│   └── page.tsx                    # Landing / Hero page
├── components/
│   ├── shared/                     # Global NavBar, Footer, Theme provider
│   └── ui/                         # shadcn/ui primitives (button, card, badge, dialog)
├── middleware.ts                   # Role-based route guard (CUSTOMER, TECHNICIAN, ADMIN)
└── service/                        # Current user session retrieval (getMe)