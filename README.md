# rudderStack

# 📊 Data Catalog API Service

This is a backend service to manage Events, Properties, and Tracking Plans. It supports automated creation and validation of associated entities for robust tracking across applications.

---

## 🚀 Features

- CRUD APIs for:
  - Events
  - Properties
  - Tracking Plans
- Automatic creation and reuse of Events/Properties
- Validation of entity uniqueness
- Sequelize ORM with PostgreSQL
- Dockerized setup for easy local development

---

## 🧱 Tech Stack

- **Node.js + Express**
- **TypeScript**
- **PostgreSQL**
- **Sequelize ORM**
- **Docker + Docker Compose**

🧪 API Endpoints

1. Tracking Plans
POST /tracking-plans
GET /tracking-plans/:id

2. Events
POST /events
GET /events
GET /events/:id

3. Properties
POST /properties
GET /properties
GET /properties/:id

🧠 Design Highlights:

1. Reuse of Events/Properties via many-to-many joins
2. Separate model for EventTrackingPlan with extra metadata
3. Properties are linked to specific event usage (not global)
4. Descriptive errors on duplicate name/type conflicts

🔮 Future Improvements:

1. Swagger or Redoc for interactive API docs
2. Auth layer (JWT or OAuth)
3. GraphQL support
4. Sequelize CLI migrations
5. Caching with Redis
