const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/:tabel', async (req, res) => {
  const { tabel } = req.params
  if (tabel == "landmark"){
    const tabels = await prisma.landmark.findMany()
  res.json(tabels)
  }
  if (tabel == "wisata"){
    const tabels = await prisma.wisata.findMany()
  res.json(tabels)
  }
})

app.get(`/landmark/:id`, async (req, res) => {
  const { id } = req.params

  const getLandmark = await prisma.landmark.findUnique({
    where: { land_id: Number(id) },
  })
  res.json(getLandmark)
})

app.get(`/namalandmark/:searchString`, async (req, res) => {
  const { searchString } = req.params

  const namaLandmark = await prisma.landmark.findMany({
    where:  { nama: { contains: searchString } },
  })
  res.json(namaLandmark)
})

app.get(`/wisata/:id`, async (req, res) => {
  const { id } = req.params

  const getWisata = await prisma.wisata.findMany({
    where: { land_id: Number(id) },
  })
  res.json(getWisata)
})

app.get('/user/:id/drafts', async (req, res) => {
  const { id } = req.params

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    })

  res.json(drafts)
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
