'use client'
import { useEffect, useState } from 'react'
import { removeClassNameForOverlayAndBody, toggleClassNameForOverlayAndBody } from '@/utils/common'

export const usePopup = () => {
	const [open, setOpen] = useState(false)

	const toggleOpen = () => {
		window.scrollTo(0, 0)
		toggleClassNameForOverlayAndBody()
		setOpen(!open)
	}

	const closePopup = () => {
		removeClassNameForOverlayAndBody()
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
