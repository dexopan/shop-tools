import prisma from "../src/utils/db.server";
import { faker } from "@faker-js/faker";


const manufacturers = [
	"Makita",
	"DeWalt",
	"Milwaukee",
	"Ridgid",
	"Ryobi"]

const types = [
	"Drill",
	"Hammer Drill",
	"Hammer",
	"Saw"
]



const seed = async () => {
	const user = await prisma.tool.createMany({
		data: [...Array(20)].map((_, i) => ({
			manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
			type: types[Math.floor(Math.random() * types.length)],
			priceOne: faker.number.int({ min: 1000, max: 9999 }),
			createdAt: new Date(),
			updatedAt: new Date(),
			vendorCode: faker.string.uuid(),
			name: faker.lorem.words(2),
			description: faker.lorem.words(10),
			images: ['https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/shurupoverty/932444/1200x800/54563598.jpg',
				'https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/shurupoverty/932444/560x504/54563601.jpg',
				'https://s.leroymerlin.kz/upload/catalogue/product_images/9/7/800x800/88285351.jpg',
				'https://lt2.pigugroup.eu/colours/308/289/60/30828960/akumuliatorinis-greztuvas-makita-df333dwae-12v-2x2-ah-78e37-atsiliepimai_reference.jpg',
			],
			inStock: faker.number.int({ min: 0, max: 10 }),
			bestseller: faker.datatype.boolean(),
			new: faker.datatype.boolean(),
			popularity: faker.number.int({ min: 0, max: 100 }),
			id: faker.string.uuid()
		}))
	})
}


seed().catch(e => {
	console.error(e)
	process.exit(1)
}
)



