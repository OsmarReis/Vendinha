export function CurrencyDisplay(value: number) {
        if(!value) return 0;
        const currency = value;
        const cents = currency.toString().padStart(3, '0');

        const integer = cents.slice(0, -2);
        const decimal = cents.slice(-2);

        return `${Number(integer)},${decimal}`
}