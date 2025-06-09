# College Event Management System (CEMS)

An all-in-one Event Management System built with **Django REST Framework** and **React**. This application enables students to register for events, staff to create and manage events, and admins to approve them — all through dynamic, role-based dashboards with modern UI, real-time notifications, and 3D carousel interactions.

---

##  Features

###  Student Dashboard
- View **approved events** in a **rotating 3D carousel**.
- Click a card to **pause rotation** and register using a custom form.
- Real-time **toast notifications** on registration.
- View posters, detailed descriptions, and unregistration options.

###  Staff Dashboard
- Secure login.
- Create events with title, description, poster upload, category, date, and registration limit.
- View all their **pending events** awaiting admin approval.
- Responsive form and styled UI with live feedback.

###  Admin (Django Superuser)
- Uses default **Django Admin Panel**.
- Can approve/reject events and view registered users.
- Clean admin interface for managing users, events, and registrations.

---

##  Tech Stack

| Layer        | Tech Used                           |
|--------------|-------------------------------------|
| Frontend     | React, React-Bootstrap, Axios       |
| Backend      | Django, Django REST Framework       |
| Auth         | JWT (djangorestframework-simplejwt) |
| Styling      | CSS Modules, Bootstrap, Uiverse CSS |
| Notifications| React Toastify                      |

---

##  Folder Structure

CEMS_PROJECT/
├── backend/
│ ├── events/ # Django App for events
│ ├── users/ # Django App for auth & roles
│ └── config/ # Django project config
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── pages/ # Page-level components
│ │ └── services/ # Axios API setup
│ └── public/ # Static files
└── README.md


---

##  User Roles

| Role    | Access                                      |
|---------|---------------------------------------------|
| Student | Register for approved events                |
| Staff   | Create events (pending admin approval)      |
| Admin   | Approve/reject events, view all data        |

---

##  Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/cems-project.git
cd cems-project

cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

# Run migrations and create superuser
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

# Start server
python manage.py runserver

cd frontend
npm install

# Start development server
npm start
