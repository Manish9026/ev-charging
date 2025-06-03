/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': 'rgb(240, 249, 255)',
  				'100': 'rgb(224, 242, 254)',
  				'200': 'rgb(186, 230, 253)',
  				'300': 'rgb(125, 211, 252)',
  				'400': 'rgb(56, 189, 248)',
  				'500': 'rgb(14, 165, 233)',
  				'600': 'rgb(var(--color-primary))',
  				'700': 'rgb(3, 105, 161)',
  				'800': 'rgb(7, 89, 133)',
  				'900': 'rgb(12, 74, 110)',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			success: {
  				'50': 'rgb(240, 253, 244)',
  				'100': 'rgb(220, 252, 231)',
  				'200': 'rgb(187, 247, 208)',
  				'300': 'rgb(134, 239, 172)',
  				'400': 'rgb(74, 222, 128)',
  				'500': 'rgb(34, 197, 94)',
  				'600': 'rgb(var(--color-success))',
  				'700': 'rgb(21, 128, 61)',
  				'800': 'rgb(22, 101, 52)',
  				'900': 'rgb(20, 83, 45)'
  			},
  			error: {
  				'50': 'rgb(254, 242, 242)',
  				'100': 'rgb(254, 226, 226)',
  				'200': 'rgb(254, 202, 202)',
  				'300': 'rgb(252, 165, 165)',
  				'400': 'rgb(248, 113, 113)',
  				'500': 'rgb(239, 68, 68)',
  				'600': 'rgb(var(--color-error))',
  				'700': 'rgb(185, 28, 28)',
  				'800': 'rgb(153, 27, 27)',
  				'900': 'rgb(127, 29, 29)'
  			},
  			warning: {
  				'50': 'rgb(255, 251, 235)',
  				'100': 'rgb(254, 243, 199)',
  				'200': 'rgb(253, 230, 138)',
  				'300': 'rgb(252, 211, 77)',
  				'400': 'rgb(251, 191, 36)',
  				'500': 'rgb(245, 158, 11)',
  				'600': 'rgb(var(--color-warning))',
  				'700': 'rgb(180, 83, 9)',
  				'800': 'rgb(146, 64, 14)',
  				'900': 'rgb(120, 53, 15)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			]
  		},
  		spacing: {
  			'72': '18rem',
  			'80': '20rem',
  			'96': '24rem'
  		},
  		animation: {
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};