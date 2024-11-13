import { PropsWithChildren, createContext, useContext, useState } from "react";
import { filterItems, type FilterItem } from "../constants/constants";
import FilterItemComponent from "../Filters/FilterItemComponent";
import FilterItemOption from "../Filters/FilterItemOption";
type Filters = Record<string, string[]>

interface FilterContextProviderValues {
    filters: Filters;
    handleFilterChange: (filters: Filters) => void;
    // filterItems: FilterItem[];
}

export const FilterContext = createContext<FilterContextProviderValues | null>(null);

const useFilter = () => {
    const filterContextValues = useContext(FilterContext);

    if (!filterContextValues)
        throw new Error("context value is wrrapped correctly");

    return filterContextValues;
}

interface FilterContextProviderProps extends PropsWithChildren<{}> {
    // filters: Filters;
    // filterItems: FilterItem[];
    // handleFilterChange: (filters: Filters) => void
}


export const FilterContextProvider: React.FC<FilterContextProviderProps> = (props) => {
    // const { children, defaultFilters, filterItems , onFilterChange} = props;
    // const [filters, setFilters] = useState(defaultFilters);

    const [filters, setFilters] = useState<Filters>({});

    const handleFilterChange = (filters: Filters) => {
            setFilters({})
    }
    
  


    return (

        <FilterContext.Provider value={{ filters, handleFilterChange }} >
            {/* {
                filterItems.map((filterItem) => {
                    return <FilterTab key={filterItem.id} filterItem={filterItem} onChange={handleFilterChange}/>
                })
            } */}
        </FilterContext.Provider>
    )
}

export default FilterContextProvider
export { useFilter } 
import React from 'react'

// function FilterProvider() {
//   return (
//     <div>FilterProvider</div>
//   )
// }

// export default FilterProvider