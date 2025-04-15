# Progetto Applicazioni Dinamiche per il Web
Perfetto! Basandomi su quanto abbiamo già discusso e sulla slide che hai allegato, ti propongo una bozza di README per il progetto **WASP**. Fammi sapere se vuoi includere anche immagini o badge.

---

# WASP 🐝 – Web Accessibility Supportive Platform

**WASP** is a web application developed to explore and implement modern accessibility standards in a CRUD-based system.  
It focuses on creating a user-friendly experience for all users, including those relying on assistive technologies.

---

## 🌐 Overview

The application manages CRUD operations with a strong focus on **accessibility**, following the [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/) guidelines.

WASP has been developed as a full-stack project:
- **Frontend**: React
- **Backend**: Node.js with Express
- **API**: RESTful

---

## ♿ Accessibility Features

We paid special attention to ensure the interface is perceivable, operable, and understandable for everyone.  
Key features include:

- ✅ Use of **WAI-ARIA tags**
- ✅ Full **keyboard navigation** support
- ✅ **Large, clickable elements** for better interaction
- ✅ **Semantic HTML** and clearly structured layouts
- ✅ Compliance with **WCAG 2.1 AA** requirements

Example accessibility audit results (see screenshot):
- Proper roles (`columnheader`, `textbox`, etc.)
- Focusability with keyboard
- Valid contrast checks

---

## 📂 Main Features

- User authentication and role-based access
- Dashboard and table views
- Create, Read, Update, Delete operations
- Form validation and user feedback
- Accessible buttons and links
- Responsive layout

---

## 🚀 Getting Started

### Requirements
- Node.js
- npm / yarn

### Installation
```bash
cd server
npm install
npm start
```

### Frontend (in `/client` folder)
```bash
cd client
npm install
npm start
```

---

## 🤝 Credits

Developed as part of the **Applicazioni dinamiche per il WEB** course.  
