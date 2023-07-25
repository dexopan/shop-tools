import { MutableRefObject, useEffect, useRef, useState, ForwardRefExoticComponent, RefAttributes } from "react"
import { IWrapperComponentProps } from "@/types/common"


export const withClickOutside = (WrappedComponent: ForwardRefExoticComponent<IWrapperComponentProps & RefAttributes<HTMLDivElement>>) => {
	const Component = () => {
		const [open, setOpen] = useState(false)
		const ref = useRef() as MutableRefObject<HTMLDivElement>

		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
					setOpen(false)
				}
			}
			document.addEventListener("mousedown", handleClickOutside)
			return () => {
				document.removeEventListener("mousedown", handleClickOutside)
			}
		}, [ref])

		return <WrappedComponent ref={ref} open={open} setOpen={setOpen} />
	}
	return Component
}

