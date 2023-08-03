'use client';

import DashboardPage from "@/components/modules/dashboardPage/DashboardPage";

export default function Main() {

	return (
		<>
			<main>
				<DashboardPage />
				<h1 style={{ height: '500px' }}>Main</h1>

				<div className='overlay'></div>
			</main>
		</>
	)
}