#!/bin/bash

# Setup PostgreSQL for BookStats project
echo "Setting up PostgreSQL for BookStats..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install it first:"
    echo "  macOS: brew install postgresql"
    echo "  Ubuntu: sudo apt-get install postgresql postgresql-contrib"
    echo "  Or use Docker: docker run --name bookstats-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=bookstats -p 5432:5432 -d postgres:15"
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "PostgreSQL is not running. Starting it..."
    if command -v brew &> /dev/null; then
        brew services start postgresql
    else
        echo "Please start PostgreSQL manually"
        exit 1
    fi
fi

# Create database if it doesn't exist
echo "Creating database 'bookstats'..."
createdb bookstats 2>/dev/null || echo "Database 'bookstats' already exists or could not be created"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
# PostgreSQL Database URL
# Update these values with your actual PostgreSQL credentials
DATABASE_URL="postgresql://$(whoami):password@localhost:5432/bookstats"
EOF
    echo "Created .env file. Please update the DATABASE_URL with your actual PostgreSQL credentials."
else
    echo ".env file already exists"
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

echo "PostgreSQL setup complete!"
echo ""
echo "Next steps:"
echo "1. Update the DATABASE_URL in .env with your actual PostgreSQL credentials"
echo "2. Run: npm run db:migrate"
echo "3. Run: npm run dev"
echo ""
echo "If you need to reset the database: npm run db:reset"
