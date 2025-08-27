# BookStats - Your Reading Analytics Dashboard

A Next.js application for tracking your reading progress, managing your TBR (To-Be-Read) list, and analyzing your reading habits with beautiful charts and statistics.

> **Note**: This project has been migrated from SQLite to PostgreSQL for better scalability and production readiness.

## Features

### 📊 Dashboard
- Total books read, audiobooks listened, and genre breakdown
- Interactive pie charts and bar charts using Recharts
- Recent books overview
- Reading statistics at a glance

### 📚 TBR Management
- Add and remove books from your TBR list
- Genre and author statistics
- Visual breakdown of your reading queue
- Easy book management interface

### ❌ DNF Tracking
- Track books you didn't finish
- Percentage completed tracking
- Genre analysis for DNF patterns
- Average completion percentage by genre

### 🔗 Remind Links
- Link books that remind you of each other
- Create relationships between books
- Manage your book connections

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn
- PostgreSQL (version 12 or higher)

## Quick Setup

For a quick setup with PostgreSQL, run:
```bash
./setup-postgres.sh
```

This script will:
- Check if PostgreSQL is installed and running
- Create the database
- Set up the `.env` file
- Generate the Prisma client

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd BookStats
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL:**
   
   **Option A: Local PostgreSQL**
   ```bash
   # Install PostgreSQL (macOS with Homebrew)
   brew install postgresql
   brew services start postgresql
   
   # Create database
   createdb bookstats
   ```
   
   **Option B: Docker**
   ```bash
   # Run PostgreSQL in Docker
   docker run --name bookstats-postgres \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=bookstats \
     -p 5432:5432 \
     -d postgres:15
   ```

4. **Configure environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   # For local PostgreSQL
   DATABASE_URL="postgresql://your_username:your_password@localhost:5432/bookstats"
   
   # For Docker PostgreSQL
   DATABASE_URL="postgresql://postgres:password@localhost:5432/bookstats"
   ```

5. **Set up the database:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Database Setup

The application uses PostgreSQL with Prisma ORM. Make sure PostgreSQL is running and accessible before running the database commands.

### Database Schema

- **Book**: Stores book information (title, author, genre, format, status, etc.)
- **RemindLink**: Stores relationships between books
- **String fields**: Format (PHYSICAL, EBOOK, AUDIOBOOK) and Status (READ, TBR, DNF)

### Environment Variables

Create a `.env` file with the following variables:
```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

## Usage

### Adding Books
1. Navigate to the TBR page
2. Click "Add Book" button
3. Fill in the book details
4. Submit the form

### Managing Remind Links
1. In any book list, click "Manage Remind Links"
2. Select books that remind you of the current book
3. Add or remove links as needed

### Tracking DNF Books
1. When you stop reading a book, update its status to "DNF"
2. Set the percentage completed
3. View DNF statistics on the DNF page

## API Endpoints

- `GET /api/books` - Get all books
- `POST /api/books` - Create a new book
- `GET /api/books/[id]` - Get a specific book with remind links
- `PUT /api/books/[id]` - Update a book
- `DELETE /api/books/[id]` - Delete a book
- `POST /api/remind-links` - Create a remind link
- `DELETE /api/remind-links/[id]` - Delete a remind link

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma generate` - Generate Prisma client
- `npx prisma migrate dev` - Run database migrations
- `npx prisma studio` - Open Prisma Studio
- `npx prisma db push` - Push schema to database (development only)

## Project Structure

```
BookStats/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── tbr/           # TBR page
│   │   ├── dnf/           # DNF page
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Dashboard page
│   ├── components/        # React components
│   └── lib/              # Utility functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── .env                  # Environment variables
├── setup-postgres.sh     # PostgreSQL setup script
├── package.json
└── README.md
```

## Customization

### Adding New Genres
Edit the genre field in the AddBookForm component or add validation in the API routes.

### Modifying Charts
The charts are built with Recharts. You can customize colors, layouts, and data visualization by modifying the chart components.

### Styling
The application uses Tailwind CSS. You can customize the design by modifying the Tailwind classes or extending the configuration.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the `DATABASE_URL` environment variable in Vercel
4. Deploy

### Other Platforms
Make sure to:
1. Set up a PostgreSQL database (e.g., Supabase, Railway, or AWS RDS)
2. Configure the `DATABASE_URL` environment variable
3. Run database migrations: `npx prisma migrate deploy`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
