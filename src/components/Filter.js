function Filter(props) {
    // Safely access filter data with checks
    const yearsOptions = props.filterData.years
        ? props.filterData.years.map(year => <option key={year} value={year}>{year}</option>)
        : <option>Loading years...</option>;

    const makesOptions = props.filterData.makes
        ? props.filterData.makes.map(make => <option key={make} value={make}>{make}</option>)
        : <option>Loading makes...</option>;

    const dealersOptions = props.filterData.dealers
        ? props.filterData.dealers.map(dealer => <option key={dealer} value={dealer}>{dealer}</option>)
        : <option>Loading dealers...</option>;

    // Using default values for sliders if data is not yet loaded
    const minPrice = props.filterData.priceRange ? props.filterData.priceRange.min : 0;
    const maxPrice = props.filterData.priceRange ? props.filterData.priceRange.max : 0;
    const minMileage = props.filterData.mileageRange ? props.filterData.mileageRange.min : 0;
    const maxMileage = props.filterData.mileageRange ? props.filterData.mileageRange.max : 0;

    return (
        <div className="filter-container">
            {/* Year, Make, Dealer Filters */}
            <label>
                Min Year:
                <select name="minYear" onChange={(e) => props.onFilterChange('selectedYear', { ...props.currentFilters.selectedYear, min: e.target.value })}>
                    {yearsOptions}
                </select>
            </label>

            <label>
                Max Year:
                <select name="maxYear" onChange={(e) => props.onFilterChange('selectedYear', { ...props.currentFilters.selectedYear, max: e.target.value })}>
                    {yearsOptions}
                </select>
            </label>

            <label>
                Make:
                <select name="make" onChange={(e) => props.onFilterChange('selectedMake', e.target.value)}>
                    <option value="">All Makes</option>
                    {makesOptions}
                </select>
            </label>

            <label>
                Dealer:
                <select name="dealer" onChange={(e) => props.onFilterChange('selectedDealer', e.target.value)}>
                    <option value="">All Dealers</option>
                    {dealersOptions}
                </select>
            </label>

            {/* Price Filter */}
            <div>
                <label>
                    Min Price:
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={props.currentFilters.selectedPrice.min}
                        onChange={(e) => props.onFilterChange('selectedPrice', { ...props.currentFilters.selectedPrice, min: parseInt(e.target.value, 10) })}
                    />
                    <span>{props.currentFilters.selectedPrice.min}</span>
                </label>
                <label>
                    Max Price:
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={props.currentFilters.selectedPrice.max}
                        onChange={(e) => props.onFilterChange('selectedPrice', { ...props.currentFilters.selectedPrice, max: parseInt(e.target.value, 10) })}
                    />
                    <span>{props.currentFilters.selectedPrice.max}</span>
                </label>
            </div>

            {/* Mileage Filter */}
            <div>
                <label>
                    Min Mileage:
                    <input
                        type="range"
                        min={minMileage}
                        max={maxMileage}
                        value={props.currentFilters.selectedMileage.min}
                        onChange={(e) => props.onFilterChange('selectedMileage', { ...props.currentFilters.selectedMileage, min: parseInt(e.target.value, 10) })}
                    />
                    <span>{props.currentFilters.selectedMileage.min}</span>
                </label>
                <label>
                    Max Mileage:
                    <input
                        type="range"
                        min={minMileage}
                        max={maxMileage}
                        value={props.currentFilters.selectedMileage.max}
                        onChange={(e) => props.onFilterChange('selectedMileage', { ...props.currentFilters.selectedMileage, max: parseInt(e.target.value, 10) })}
                    />
                    <span>{props.currentFilters.selectedMileage.max}</span>
                </label>
            </div>
        </div>
    );
}

export default Filter;