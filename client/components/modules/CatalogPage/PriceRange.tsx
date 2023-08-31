'use client'
import React from 'react'
import { useAppSelector } from '@/store'
import { Range, getTrackBackground } from 'react-range'
import { IPriceRangeProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'

const STEP = 1;
const MIN = 0;
const MAX = 10000;

const PriceRange = ({ priceRange, setPriceRange, setIsPriceRangeChanged }: IPriceRangeProps) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';

	const handlerPriceRangeChange = (values: number[]) => {
		setIsPriceRangeChanged(true)
		setPriceRange(values)
	}

	return (
		<div className={styles.filters__price}>
			<div className={`${styles.filters__price__inputs} ${darkModeClass}`}>
				<input
					type="text"
					value={priceRange[0]}
					placeholder='from 0'
					readOnly />
				<span className={styles.filters__price__inputs__border}></span>
				<input
					type="text"
					value={priceRange[1]}
					placeholder='to 10000'
					readOnly />
			</div>

			<Range
				values={priceRange}
				step={STEP}
				min={MIN}
				max={MAX}
				onChange={handlerPriceRangeChange}
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
							height: "auto",
							display: "flex",
							width: "100%",
							padding: "0 10px",
						}}
					>
						<div
							ref={props.ref}
							style={{
								height: "5px",
								width: "100%",
								borderRadius: "4px",
								background: getTrackBackground({
									values: priceRange,
									colors: ['#B1CEFA', '#247CC8', '#B1CEFA'],
									min: MIN,
									max: MAX
								}),
								alignSelf: "center"
							}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props }) => (
					<div
						{...props}
						style={{
							...props.style,
						}}
					>
						<div
							style={{
								height: '20px',
								width: '20px',
								borderRadius: '50%',
								background: '#FFFFFF',
								border: '3px solid #1C629E',
								boxShadow: '0px 12px 8px -6px rgba(174, 181, 239, 0.2)',
							}}
						/>
					</div>
				)}
			/>
		</div>
	);
}

export default PriceRange