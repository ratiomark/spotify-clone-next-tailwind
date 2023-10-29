import { ButtonHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, disabled, type = 'button', ...props }, ref) => {
		return (
			<button
				className={twMerge(
					'w-full rounded-full border border-transparent bg-green-500 p-3 text-black transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				type={type}
				disabled={disabled}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		)
	},
)
Button.displayName = 'Button'
export default Button
