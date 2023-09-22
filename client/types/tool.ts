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
export interface IShoppingCartItem {
	tool: ITool
	basket: IShoppingCart
	count: number
	price: number
}
export interface IShoppingCart {
	id: string
	username: string
	tools: IShoppingCartItem[]
	quantity: number
	totalPrice: number
}

export interface IAddToCart {
	url: string
	userId: string
	toolId: string
}

export interface IRemoveFromCart extends IAddToCart { }

export interface IToggleCartItem {
	userId: string
	toolId: string
	isInCart: boolean
	setSpinner: (arg0: boolean) => void
}


export interface IToolPageProps {
	params: {
		toolId: string
	}
}


export interface IToolImagesItemProps {
	src: string
	callback: (arg0: string) => void
	alt: string
}


export interface IToolAccordionProps {
	children: React.ReactNode
	title: string
}