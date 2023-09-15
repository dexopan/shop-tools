'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth } from '@/http/api/auth'
import { setUser } from '@/store/userSlice'
import { useAppDispatch } from '@/store'

const useRedirectByUserCheck = (isAuthPage = false) => {
	const [shouldLoadContent, setShouldLoadContent] = useState(false)
	const router = useRouter()
	const shouldCheckAuth = useRef(true)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (shouldCheckAuth.current) {
			shouldCheckAuth.current = false
			checkUser()
		}
	}, [])

	const checkUser = async () => {
		const data = await checkAuth()
		if (isAuthPage) {
			if (data) {
				router.push('/main')
				dispatch(setUser(data.result))
				return
			}
			setShouldLoadContent(true)
			return
		}
		else {
			if (data) {
				const user = data.result
				dispatch(setUser(user))
				setShouldLoadContent(true)
				return
			}
			router.push('/auth')
		}
	}
	return { shouldLoadContent }
}

export default useRedirectByUserCheck