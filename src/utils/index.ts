type SizeCode = Record<string, string>
type CurrencyCode = Record<string, string>
type ColorCode = Record<string, string>
type PriceCode = Record<string, string>

const sizeCodes: SizeCode = {
    SMA003: "S",
    MED004: "M",
    XL005: "XL",
    LG004: "L"

}

const CurrencyCodes: CurrencyCode = {
    INR: "Rs",
    USD: "$"
}

const colorCodes: ColorCode = {
    COL02: "black",
    COL09: "navy",
    COL01: "blue",
    COL03: "green",
    COL04: "yellow",
    COL05: "white",
    COL06: "grey",
    COL07: "violet"
}


const priceCodes: PriceCode = {
    u500: "Less than 500",
    b500_1K: "Bewteen 500 and 1K",
    b1K_2K: "between 1K and 2K",
    a3K: "above 3K",
}

const categoryCodes : PriceCode = {
    women: 'women',
    unisex: 'unisex'
}

const getSizeFromCode = (sizeCode: string): string => {
    return sizeCodes[sizeCode]
}

const getCurrencyFromCode = (currency: string): string => {
    return CurrencyCodes[currency]
}

const getColorFromCode = (colorCode: string): string => {
    return colorCodes[colorCode]
}

const getPriceFromCode = (priceCode: string): string => {
    return priceCodes[priceCode]
}

const getCategoryFromCode = (categoryCode: string): string => {
    return categoryCodes[categoryCode]
}

const getSizesFromCodes = (sizeCodes: string[]) => {
     return sizeCodes.map((sizeCode) => getSizeFromCode(sizeCode)).join(",")
} 

const getColorsFromCodes = (colorCodes: string[]) => {
    return colorCodes.map((colorCode) => getColorFromCode(colorCode)).join(",")
} 

const getPricesFromCodes = (priceCodes: string[]) => {
    return priceCodes.map((priceCode) => getPriceFromCode(priceCode)).join(",")
} 

const getCategoryFromCodes = (categoryCodes: string[]) => {
    return categoryCodes.map((categoryCode) => getCategoryFromCode(categoryCode)).join(",")
}

type FN = (value : string[]) => string

let filtersMap : Record<string, FN>= {
    size: getSizesFromCodes,
    color: getColorsFromCodes,
    price: getPricesFromCodes,
    category: getCategoryFromCodes

};


const generateQueryString = (selected: Record<string, string[]>, filterKey: string, filterValues: string[]) => {
    const selectedFilters = {...selected}
   
    if (filterValues.length > 0)
    selectedFilters[filterKey] = filterValues
    else if (filterValues.length === 0)
        delete selectedFilters[filterKey]

    const params: Record<string, string> = Object.keys(selectedFilters).reduce((acc, curr) => ({ ...acc, [curr]: selectedFilters[curr].join(",") }), {});
    const queryString = new URLSearchParams(params).toString();
    return {queryString, selectedFilters};
}


type AppliedFilter = {
    key: string,
    value: string
}

const expandSelected = (selected: Record<string, string[]>) => {

    let selectedKeys = Object.keys(selected);
    let appliedFilters: AppliedFilter[] = []

    selectedKeys.forEach((key) => {
        selected[key].forEach((value) => {
            appliedFilters.push({
                key, value
            })
        })
    })

    return appliedFilters
}


export {filtersMap,  getCurrencyFromCode, getSizeFromCode, getColorFromCode, generateQueryString, expandSelected }