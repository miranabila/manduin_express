const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post(`/signup`, async (req, res) => {
  const { name, email, posts } = req.body

  const postData = posts
    ? posts.map((post) => {
        return { title: post.title, content: post.content || undefined }
      })
    : []

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  })
  res.json(result)
})

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})

app.put('/post/:id/views', async (req, res) => {
  const { id } = req.params

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    res.json(post)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
})

app.put('/publish/:id', async (req, res) => {
  const { id } = req.params

  try {
    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true,
      },
    })

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData.published || undefined },
    })
    res.json(updatedPost)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
})

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

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

app.post(`/landmarks/`, async (req, res) => {
  const { photos } = req.body
  
  const placeAroundLandmark = await prisma.landmark.findUnique({
    where: { nama: { contains: photos } },
  })
  res.json(placeAroundLandmark)
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

app.get('/feed', async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query

  const or = searchString
    ? {
        OR: [
          { nama: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      }
    : {}

  const posts = await prisma.landmark.findMany({
    where: {
      published: true,
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy || undefined,
    },
  })

  res.json(posts)
})

const server = app.listen(3000, () =>
  console.log(`
???? Server ready at: http://localhost:3000
?????? See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
