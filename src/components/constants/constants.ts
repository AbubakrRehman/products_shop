interface FilterValue {
    value: string;
    label: string
}



export interface FilterItem {
    id: number;
    label: string;
    key: string;
    values: FilterValue[]
}



export const filterItems: FilterItem[] = [
    {
        id: 1,
        label: "category",
        key: "category",
        values: [
            {
                value: "women",
                label: "women"
            },
            {
                value: "unisex",
                label: "unisex"
            },
        ]
    },
    {
        id: 2,
        label: "color",
        key: "color",
        values: [
            {
                value: "COL02",
                label: "black"
            },
            {
                value: "COL01",
                label: "blue"
            },
            {
                value: "COL03",
                label: "green"
            },
            {
                value: "COL09",
                label: "navy"
            },
        ]
    },
    {
        id: 3,
        label: "price",
        key: "price",
        values: [
            {
                value: "u500",
                label: "under 500"
            },
            {
                value: "b500_1K",
                label: "500 - 1000"
            },
            {
                value: "b1K_2K",
                label: "1000 - 2000"
            },
            {
                value: "a3K",
                label: "above 3000"
            },
        ]
    },
    {
        id: 4,
        label: "size",
        key: "size",
        values: [
            {
                value: "SMA003",
                label: "Small"
            },
            {
                value: "MED004",
                label: "Medium"
            },
            {
                value: "LG004",
                label: "Large"
            },
            {
                value: "XL005",
                label: "Extra Large"
            },
        ]
    }
]


export const sortByItems = [
    {
        id: 1,
        key: "sortBy",
        label: "Sort By",
        values: [
            // {
            //     value: "-createdAt",
            //     label: "New Arrival"
            // },
            {
                value: "+price",
                label: "Price (Low to High)"
            },
            {
                value: "-price",
                label: "Price (High to Low)"
            }
        ]
    }
]