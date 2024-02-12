const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function callDate(){
    const timestamp = Date.now();
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getSeconds().toString().padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime
}


async function main(){
    // User and creator seed
    const aliceId = 1000
    const alice = await prisma.user.create({
        data:{
            id: aliceId,
            email: 'test@gmail.com',
            name: 'alice',
            password: '1234',
            phone: '0833636470',
        },
    })

    const creator = await prisma.creator.create({
        data:{
            id: 1000,
            userId: aliceId,
        }
    })
    // Genre
    const createManyGenre = await prisma.genre.createMany({
        "data": [
            {
                "id": 1000,
                "name": "Fastasy"
            },
            {
                "id": 1001,
                "name": "Action"
            },
            {
                "id": 1002,
                "name": "Romance"
            },
            {
                "id": 1003,
                "name": "Comedy"
            },
            {
                "id": 1004,
                "name": "Sci-Fi"
            }
        ]
    })

// cartoon
    const cartoonCreateMany = await prisma.cartoon.createMany({
        data:[
            { 
                "id": 1000,
                "name": "The Meaning of You",
                "description": "The Meaning of You",
                "releaseDate": new Date(),
                "thumbnail": "https://www.oremanga.net/wp-content/uploads/2023/11/The-Meaning-of-You.jpg",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1002
            },
            {
                "id": 1001,
                "name": "I Went On Strike Because It Was A Time Limit",
                "description": "I Went On Strike Because It Was A Time Limit",
                "releaseDate": new Date(),
                "thumbnail": "https://www.oremanga.net/wp-content/uploads/2023/03/I-Went-On-Strike-Because-It-Was-A-Time-Limit.jpg",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1001
            },
            {
                "id": 1002,
                "name": "Death Is The Only Ending For The Villainess",
                "description": "Death Is The Only Ending For The Villainess",
                "releaseDate": new Date(),
                "thumbnail": "https://www.oremanga.net/wp-content/uploads/2020/05/Death-Is-The-Only-Ending-For-The-Villainess.jpeg",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1003
            },
            {
                "id": 1003,
                "name": "Elena Evoy Observation Diary",
                "description": "Elena Evoy Observation Diary",
                "releaseDate": new Date(),
                "thumbnail": "https://www.oremanga.net/wp-content/uploads/2023/10/Elena-Evoy-Observation-Diary.jpg",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1004
            },
            {
                "id": 1004,
                "name": "I Became the Tyrant’s Translator",
                "description": "I Became the Tyrant’s Translator",
                "releaseDate": new Date(),
                "thumbnail": "https://www.oremanga.net/wp-content/uploads/2023/04/I-Became-the-Tyrants-Translator.jpg",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1002
            }, 
            { //Fastasy
                "id": 1005,
                "name": "Superball Girl",
                "description": "Superball Girl",
                "releaseDate": new Date(),
                "thumbnail": "https://www.oremanga.net/wp-content/uploads/2022/11/Superball-Girl.jpg",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1001
            }, 
            { 
                "id": 1006,
                "name": "Eiyuu to Kenja no Tensei Kon",
                "description": "Eiyuu to Kenja no Tensei Kon",
                "releaseDate": new Date(),
                "thumbnail": "https://www.oremanga.net/wp-content/uploads/2023/02/Eiyuu-to-Kenja-no-Tensei-Kon.jpg",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1002
            },  
        ]
    })

    const cartoonEp = await prisma.episode.createMany({
        data:[
            {
                "name":"The Meaning of You",
                "episodeNumber":1,
                "releaseDate":new Date(),
                "thumbnail":"https://www.oremanga.net/wp-content/uploads/2023/11/The-Meaning-of-You.jpg",
                "cartoonId":1000,
            },
            {
                "name":"The Meaning of You",
                "episodeNumber":2,
                "releaseDate":new Date(),
                "thumbnail":"https://www.oremanga.net/wp-content/uploads/2023/11/The-Meaning-of-You.jpg",
                "cartoonId":1000,
            },
        ]
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

