import Head from "next/head"
import Auth from "./auth/page"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Main() {

	return (
		<>
			<Head>
				<title>Main</title>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="UTF-8" />
			</Head>
			<Auth />
			<ToastContainer
				position="bottom-right"
				hideProgressBar={false}
				closeOnClick
				rtl={false}
				limit={1}
				theme="light"
			/>
		</>

	)
}
