# BookStats - Your Reading Analytics Dashboard

A Next.js application for tracking your reading progress, managing your TBR (To-Be-Read) list, and analyzing your reading habits with beautiful charts and statistics.

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
- **Database**: SQLite with Prisma ORM
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd BookStats
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push the schema to the database
   npm run db:push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Database Setup

The application uses SQLite with Prisma ORM. The database file (`dev.db`) will be created automatically when you run the database commands.

### Database Schema

- **Book**: Stores book information (title, author, genre, format, status, etc.)
- **RemindLink**: Stores relationships between books
- **Enums**: Format (PHYSICAL, EBOOK, AUDIOBOOK) and Status (READ, TBR, DNF)

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
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

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
│   └── schema.prisma     # Database schema
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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
