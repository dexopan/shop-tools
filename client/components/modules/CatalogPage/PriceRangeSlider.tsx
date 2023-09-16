'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { IPriceRangeProps } from '@/types/catalog';


const PriceRangeSlider = ({ priceRange, setPriceRange, setIsPriceRangeChanged }: IPriceRangeProps) => {

	const handlerPriceRangeChange = (event: Event, newValue: number | number[]) => {
		setIsPriceRangeChanged(true)
		setPriceRange(newValue as number[]);
	};

	return (
		<Box style={{ height: 50, marginTop: 35 }} sx={{ width: 250 }}>
			<Slider
				getAriaLabel={() => 'Price range'}
				min={1}
				max={10000}
				defaultValue={[1000, 9000]}
				value={priceRange}
				onChange={handlerPriceRangeChange}
				valueLabelDisplay="on"
				style={{ color: '#1c629e' }}
			/>
		</Box>
	);
}

export default PriceRangeSlider