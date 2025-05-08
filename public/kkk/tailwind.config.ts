
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom infernal theme colors
				infernal: {
					'crimson': '#8B0000',
					'blood': '#FF0000',
					'charcoal': '#111111',
					'lava': '#FF4500',
					'ash-light': '#444444',
					'ash-dark': '#2C2C2C',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				cinzel: ['Cinzel Decorative', 'cursive'],
				merriweather: ['Merriweather', 'serif'],
				pirata: ['Pirata One', 'cursive'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'25%': { opacity: '0.75' },
					'50%': { opacity: '0.85' },
					'75%': { opacity: '0.9' },
				},
				'floating': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-glow': {
					'0%, 100%': { filter: 'brightness(1)' },
					'50%': { filter: 'brightness(1.3)' },
				},
				'ember-float': {
					'0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.5' },
					'25%': { opacity: '0.7' },
					'50%': { transform: 'translate(10px, -20px) rotate(90deg)', opacity: '0.9' },
					'75%': { opacity: '0.6' },
					'100%': { transform: 'translate(20px, -40px) rotate(180deg)', opacity: '0' },
				},
				'lava-flow': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
				'summon': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'letter-burn': {
					'0%, 100%': { textShadow: '0 0 8px rgba(255, 69, 0, 0.7)' },
					'50%': { textShadow: '0 0 15px rgba(255, 69, 0, 1), 0 0 20px rgba(255, 0, 0, 0.8)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flicker': 'flicker 3s ease-in-out infinite',
				'floating': 'floating 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'ember-float': 'ember-float 4s ease-out infinite',
				'lava-flow': 'lava-flow 10s ease infinite',
				'summon': 'summon 1s ease-out forwards',
				'letter-burn': 'letter-burn 2s ease-in-out infinite',
			},
			backgroundImage: {
				'lava-gradient': 'linear-gradient(225deg, #FF0000 0%, #FF4500 50%, #8B0000 100%)',
				'ash-gradient': 'linear-gradient(180deg, #2C2C2C 0%, #444444 100%)',
				'volcanic-terrain': 'url("data:image/svg+xml,%3Csvg width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cfilter id=\'noise\' x=\'0%\' y=\'0%\' width=\'100%\' height=\'100%\'%3E%3CfeTurbulence baseFrequency=\'0.01 0.4\' result=\'NOISE\' numOctaves=\'2\'/%3E%3CfeDisplacementMap in=\'SourceGraphic\' in2=\'NOISE\' scale=\'20\' xChannelSelector=\'R\' yChannelSelector=\'R\'/%3E%3C/filter%3E%3C/defs%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noise)\' fill=\'%23111111\'/%3E%3C/svg%3E")',
			}
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
