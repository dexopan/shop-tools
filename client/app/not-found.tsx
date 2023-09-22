import Link from 'next/link'

const NotFound = () => {
	return (
		<div id="notfound">
			<div className="notfound">
				<div className="notfound-404">
					<h1>4<span>0</span>4</h1>
				</div>
				<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
				<Link className='notfound__link' href="/main" passHref legacyBehavior>
					<span>HOME PAGE </span>
				</Link>
			</div>
		</div>
	)
}

export default NotFound