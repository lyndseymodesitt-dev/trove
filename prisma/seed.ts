import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.remindLink.deleteMany()
  await prisma.book.deleteMany()

  // Create sample books
  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        format: "PHYSICAL",
        status: "READ",
        pages: 180,
        percentRead: 100
      }
    }),
    prisma.book.create({
      data: {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        format: "EBOOK",
        status: "READ",
        pages: 328,
        percentRead: 100
      }
    }),
    prisma.book.create({
      data: {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        format: "AUDIOBOOK",
        status: "READ",
        pages: 366,
        percentRead: 100
      }
    }),
    prisma.book.create({
      data: {
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        format: "PHYSICAL",
        status: "TBR",
        pages: 688
      }
    }),
    prisma.book.create({
      data: {
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        genre: "Historical Fiction",
        format: "EBOOK",
        status: "TBR",
        pages: 400
      }
    }),
    prisma.book.create({
      data: {
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "Science Fiction",
        format: "AUDIOBOOK",
        status: "TBR",
        pages: 496
      }
    }),
    prisma.book.create({
      data: {
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "Contemporary Fiction",
        format: "PHYSICAL",
        status: "DNF",
        pages: 288,
        percentRead: 45
      }
    }),
    prisma.book.create({
      data: {
        title: "Ulysses",
        author: "James Joyce",
        genre: "Classic",
        format: "PHYSICAL",
        status: "DNF",
        pages: 730,
        percentRead: 12
      }
    }),
    prisma.book.create({
      data: {
        title: "The Way of Kings",
        author: "Brandon Sanderson",
        genre: "Fantasy",
        format: "EBOOK",
        status: "READ",
        pages: 1007,
        percentRead: 100
      }
    }),
    prisma.book.create({
      data: {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        format: "AUDIOBOOK",
        status: "READ",
        pages: 320,
        percentRead: 100
      }
    })
  ])

  // Create some remind links
  await Promise.all([
    prisma.remindLink.create({
      data: {
        fromId: books[0].id, // The Great Gatsby
        toId: books[1].id    // 1984
      }
    }),
    prisma.remindLink.create({
      data: {
        fromId: books[2].id, // The Hobbit
        toId: books[8].id    // The Way of Kings
      }
    }),
    prisma.remindLink.create({
      data: {
        fromId: books[3].id, // Dune
        toId: books[5].id    // Project Hail Mary
      }
    })
  ])

  console.log('Sample data seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
