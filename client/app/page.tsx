import Head from "next/head"
import Auth from "./auth/page"

export default function Main() {

	return (
		<>
			<Head>
				<title>Auth</title>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="UTF-8" />
			</Head>
			<Auth />
		</>

	)
}
