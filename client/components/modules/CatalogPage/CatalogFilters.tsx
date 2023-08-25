import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'

const CatalogFilters = () => {
	const isMobile = useMediaQuery(820)
	return (
		<>
			{isMobile ? <div>Mobile</div> : <CatalogFiltersDesktop />}
		</>
	)
}

export default CatalogFilters