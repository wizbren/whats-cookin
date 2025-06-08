# What's Cookin'

A full-stack recipe application built with:

- **Client:**        React  
- **Server:**        Node.js + Express  
- **Database:**      PostgreSQL  
- **External APIs:** Recipe API, OpenAI API  

---

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:wizbren/whats-cookin.git
cd whats-cookin
```

### 2. Install dependencies

#### 🔹 Client (React frontend)

```bash
cd client
npm install
```

#### 🔹 Server (Node backend)

```bash
cd server
npm install
```

### 3. Environment variables

```bash
cp .env.example .env
```

### 4. Set up the database

In your terminal, run:
```
createdb whatscookin
```

From the server/ directory run:
```
psql -d whatscookin -f src/db/schema.sql
```

This will:
- Create the Users and Recipes tables
- Set up foreign key constraints
- Enable cascading deletes on user removal

Seed the data using:
```
psql -d whatscookin -f src/db/seed.sql
```

Make sure your backend has a .env file that includes:
```
DB_NAME=whatscookin
DB_USER=your_postgres_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 5. Run app

cd server
node index.js || npm start || npm run dev

cd client
npm start