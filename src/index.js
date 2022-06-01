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
  if (tabel == "transaksi"){
    const tabels = await prisma.transaksi.findMany()
  res.json(tabels)
  }
})

app.get(`/landmark/id=:id`, async (req, res) => {
  const { id } = req.params

  const getLandmark = await prisma.landmark.findUnique({
    where: { land_id: Number(id) },
  })

  if(getLandmark == null)
    res.json(400,'Kosong')
  else
    res.json(getLandmark)
})

app.get(`/landmark/label=:searchString`, async (req, res) => {
  const { searchString } = req.params

  const namaLandmark = await prisma.landmark.findMany({
    where:  { label: { contains: searchString } },
  })

  if(namaLandmark == "")
    res.json(400,'Kosong')
  else
    res.json(namaLandmark)
})

app.get(`/landmark/label=:searchString/wisata`, async (req, res) => {
  const { searchString } = req.params

  const transLandmark = await prisma.transaksi.findMany({
    where:  { label: { contains: searchString } },
  })

  if(transLandmark == "")
    res.json(400,'Kosong')
  else
    res.json(transLandmark)
})

app.get(`/wisata/provinsi=:searchString`, async (req, res) => {
  const { searchString } = req.params

  const provWisata = await prisma.wisata.findMany({
    where:  { provinsi: { contains: searchString } },
  })

  if(provWisata == "")
    res.json(400,'Kosong')
  else
    res.json(provWisata)
})

app.get(`/wisata/id=:id`, async (req, res) => {
  const { id } = req.params

  const getWisata = await prisma.wisata.findUnique({
    where: { place_id: Number(id) },
  })

  if(getWisata == null)
    res.json(400,'Kosong')
  else
    res.json(getWisata)
})

const server = app.listen(3000, '0.0.0.0', () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
