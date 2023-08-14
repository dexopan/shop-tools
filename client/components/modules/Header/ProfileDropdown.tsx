'use client';
import { forwardRef } from "react"
import { useAppSelector } from '@/store';
import { AnimatePresence, motion } from "framer-motion"
import ProfileSvg from "@/components/elements/svg/ProfileSvg"
import LogoutSvg from "@/components/elements/svg/LogOutSvg"
import { withClickOutside } from "@/utils/withClickOutside";
import { IWrapperComponentProps } from "@/types/common"
import styles from "@/styles/profile/index.module.scss"

const ProfileDropDown = forwardRef<HTMLDivElement, IWrapperComponentProps>(({ open, setOpen }, ref) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';

	const user = useAppSelector(state => state.user.user)

	const toggleProfileDropdown = () => {
		setOpen(!open)
	}

	return (
		<div className={styles.profile} ref={ref}>
			<button className={styles.profile__btn} onClick={toggleProfileDropdown}>
				<span className={styles.profile__span}>
					<ProfileSvg />
				</span>
			</button>
			<AnimatePresence>
				{open &&
					<motion.ul
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						className={`${styles.profile__dropdown} ${darkModeClass}`}
						style={{ transformOrigin: 'right-top' }}>
						<li className={`${styles.profile__dropdown__user} ${darkModeClass}`}>
							<span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>{user.username}</span>
							<span className={`${styles.profile__dropdown__email} ${darkModeClass}`}>{user.email}</span></li>
						<li className={styles.profile__dropdown__item}>
							<button className={styles.profile__dropdown__item__btn}>
								<span className={`${styles.profile__dropdown__item__text}  ${darkModeClass}`}>Log out</span>
								<span className={`${styles.profile__dropdown__item__svg}  ${darkModeClass}`}>
									<LogoutSvg />
								</span>
							</button>
						</li>
					</motion.ul>}
			</AnimatePresence>
		</div >
	)
})

export default withClickOutside(ProfileDropDown)