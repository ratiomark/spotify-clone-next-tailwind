/** @type {import("prettier").Config} */
const config = {
	plugins: [
		"@trivago/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss",
	],
	singleQuote: true,
	trailingComma: "all",
	semi: false,
	jsxSingleQuote: true,
	useTabs: true,
	arrowParens: "always",
	htmlWhitespaceSensitivity: "ignore",
	tabWidth: 2,
	singleAttributePerLine: true,
	maxLineLength: 100,
	bracketSpacing: true,
	// отвечает за > на новой строке
	// singleAttributePerLine: true,
	bracketSameLine: false,
	jsxBracketSameLine: false,
	importOrder: [
		"<THIRD_PARTY_MODULES>",
		"^@entities/(.*)$",
		"^@shared/(.*)$",
		"^[./]",
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};

module.exports = config;

// /** @type {import("prettier").Config} */
// module.exports = {
// 	plugins: [
// 		'@trivago/prettier-plugin-sort-imports',
// 		'prettier-plugin-tailwindcss',
// 	],
// 	tailwindConfig: './tailwind.config.ts',
	
// }
