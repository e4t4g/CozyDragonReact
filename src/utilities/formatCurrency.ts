const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'RUB',
    style: 'currency'
})

export const formatCurrency = (price: number) => {
    return CURRENCY_FORMATTER.format(price);
}