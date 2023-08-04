export interface ITool {
	id: string
	manufacturer: string
	priceOne: number
	vendorCode: string
	name: string
	type: string
	description: string
	images: string[]
	inStock: number
	bestseller: boolean
	new: boolean
	popularity: number
}