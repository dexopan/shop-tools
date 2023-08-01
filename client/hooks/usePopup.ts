'use client'
import { useEffect, useState } from 'react'

export const usePopup = () => {
	const [open, setOpen] = useState(false)

	const toggleOpen = () => {
		window.scrollTo(0, 0)
		document.querySelector('.overlay')?.classList.toggle('open')
		document.body.classList.add('body')
		document.querySelector('.body')?.classList.toggle('overflow-hidden')
		setOpen(!open)
	}

	const closePopup = () => {
		document.querySelector('.overlay')?.classList.remove('open')
		document.body.classList.remove('body')
		document.querySelector('.body')?.classList.remove('overflow-hidden')
		setOpen(false)
	}

	useEffect(() => {
		document.querySelector('.overlay')?.addEventListener('click', closePopup)
		return () => {
			document.querySelector('.overlay')?.removeEventListener('click', closePopup)
		}
	}, [open])

	return { open, toggleOpen, closePopup }
}
