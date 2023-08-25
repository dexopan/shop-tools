import { idGenerator } from "./common"

const createCheckboxObj = (name: string) => {
	return { name, checked: false, id: idGenerator() }
}

export const manufacturers = [
	"Makita",
	"DeWalt",
	"Milwaukee",
	"Ridgid",
	"Ryobi"
].map(createCheckboxObj)

export const typesTools = [
	"Drill",
	"Hammer Drill",
	"Hammer",
	"Saw"
].map(createCheckboxObj)