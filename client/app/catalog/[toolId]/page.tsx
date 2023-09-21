'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store'
import { setOneTool } from '@/store/toolSlice';
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";
import { getOneTool } from '@/http/api/tools';
import ToolPage from '@/components/modules/ToolPage/ToolPage';
import { IToolPageProps } from '@/types/tool';


export default function Tool({ params: { toolId } }: IToolPageProps) {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	const tool = useAppSelector(state => state.tools.oneTool)
	const dispatch = useAppDispatch()

	const loadOneTool = async () => {
		const data = await getOneTool(`/api/tool/search/${toolId}`)
		dispatch(setOneTool(data))
	}

	useEffect(() => {
		loadOneTool()
	}, [])

	return (
		<>
			{shouldLoadContent && (
				<main className={darkModeClass}>
					<ToolPage />
					<div className='overlay'></div>
				</main>
			)}
		</>
	)
}