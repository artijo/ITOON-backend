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
    // const aliceId = 1000
    // const alice = await prisma.user.create({
    //     data:{
    //         id: aliceId,
    //         email: 'test@gmail.com',
    //         name: 'alice',
    //         password: '1234',
    //         phone: '0833636470',
    //     },
    // })

    // const creator = await prisma.creator.create({
    //     data:{
    //         id: 1000,
    //         userId: aliceId,
    //     }
    // })
    // // Genre

    // const createManyGenre = await prisma.genre.createMany({
    //     "data": [
    //         {
    //             "id": 1000,
    //             "name": "Fastasy"
    //         },
    //         {
    //             "id": 1001,
    //             "name": "Action"
    //         },
    //         {
    //             "id": 1002,
    //             "name": "Romance"
    //         },
    //         {
    //             "id": 1003,
    //             "name": "Comedy"
    //         },
    //         {
    //             "id": 1004,
    //             "name": "Sci-Fi"
    //         }
    //     ]
    // })


    const cartoonCreateMany = await prisma.cartoon.createMany({
        data:[
            {
                "id": 1000,
                "name": "cartoon01",
                "description": "wow",
                "releaseDate": new Date(),
                "thumbnail": "https://reapertrans.com/wp-content/uploads/2023/12/Locked-Up.png",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1000
            },
            {
                "id": 1001,
                "name": "cartoon02",
                "description": "wow",
                "releaseDate": new Date(),
                "thumbnail": "https://reapertrans.com/wp-content/uploads/2023/12/Locked-Up.png",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1000
            },
            {
                "id": 1002,
                "name": "cartoon03",
                "description": "wow",
                "releaseDate": new Date(),
                "thumbnail": "https://reapertrans.com/wp-content/uploads/2023/12/Locked-Up.png",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1000
            },
            {
                "id": 1003,
                "name": "cartoon04",
                "description": "wow",
                "releaseDate": new Date(),
                "thumbnail": "https://reapertrans.com/wp-content/uploads/2023/12/Locked-Up.png",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1000
            },
            {
                "id": 1004,
                "name": "cartoon05",
                "description": "wow",
                "releaseDate": new Date(),
                "thumbnail": "https://reapertrans.com/wp-content/uploads/2023/12/Locked-Up.png",
                "totalEpisodes": 90,
                "creatorId": 1000,
                "genreId": 1000
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

