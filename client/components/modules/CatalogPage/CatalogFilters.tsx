import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFilterProps } from '@/types/catalog'

const CatalogFilters = ({ priceRange, setPriceRange, setIsPriceRangeChanged, resetFilterBtnDisabled, resetFilters }: ICatalogFilterProps) => {
	const isMobile = useMediaQuery(820)
	const [spinner, setSpinner] = useState(false)
	return (
		<>
			{isMobile ? <div>Mobile</div> :
				<CatalogFiltersDesktop
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					setIsPriceRangeChanged={setIsPriceRangeChanged}
					resetFilterBtnDisabled={resetFilterBtnDisabled}
					spinner={spinner}
					resetFilters={resetFilters} />}
		</>
	)
}

export default CatalogFilters