import React from 'react';
import Card from './components/Card'; // Adjust the path if necessary
import Filter from './components/Filter'; // Adjust the path if necessary




class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cars: [],
            filterData: {
                makes: [],
                dealers: [],
                years: [],
                priceRange: { min: 0, max: 0 },
                mileageRange: { min: 0, max: 0 },
                yearRange: { min: 0, max: 0 }
            },
            filters: {
                selectedMake: '',
                selectedDealer: '',
                selectedYears: { min: 0, max: 0 },
                selectedPrice: { min: 0, max: 0 },
                selectedMileage: { min: 0, max: 0 },
            }
        };

        // Bind the onFilterChange method to the App component
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    componentDidMount() {
        this.fetchInventory();
    }

    fetchInventory() {
        const url = "https://dev-microservices.horizonauto.com/flaskapp/graphql";
        const headers = { "Content-Type": "application/json" };
        const query = `
            query GetCars {
                cars {
                    id
                    name
                    year
                    make {
                        id
                        name
                    }
                    model
                    exteriorColor
                    interiorColor
                    listingPrice
                    image
                    driveType
                    vin
                    listingUrl
                    mileage
                    dealer {
                        id
                        name
                        isVerified
                        isPremierDealer
                        city
                        state
                        zip
                    }
                    carfax
                    isDealer
                    imagesArray
                }
            }`;

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query: query }),
        })
            .then(response => response.json())
            .then(data => {
                // Assuming the data returned is in the format { data: { cars: [...] } }
                this.setState({ cars: data.data.cars });
                const filterData = this.processFilterData(data.data.cars);
                this.setState(prevState => ({
                    filterData: filterData,
                    filters: {
                        selectedMake: prevState.filters.selectedMake,
                        selectedDealer: prevState.filters.selectedDealer,
                        selectedYear: { min: filterData.yearRange.min, max: filterData.yearRange.max },
                        selectedPrice: { min: filterData.priceRange.min, max: filterData.priceRange.max },
                        selectedMileage: { min: filterData.mileageRange.min, max: filterData.mileageRange.max }
                    }
                })
                );
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }

    processFilterData(cars) {
        let makes = new Set();
        let dealers = new Set();
        let years = new Set();
        let minPrice = Infinity, maxPrice = -Infinity;
        let minMileage = Infinity, maxMileage = -Infinity;
        let minYear = Infinity, maxYear = -Infinity;

        cars.forEach(car => {
            makes.add(car.make.name);
            dealers.add(car.dealer.name);
            years.add(car.year);

            minPrice = Math.min(minPrice, car.listingPrice);
            maxPrice = Math.max(maxPrice, car.listingPrice);

            minMileage = Math.min(minMileage, car.mileage);
            maxMileage = Math.max(maxMileage, car.mileage);

            minYear = Math.min(minYear, car.year);
            maxYear = Math.max(maxYear, car.year);
        });

        return {
            makes: Array.from(makes),
            dealers: Array.from(dealers),
            years: Array.from(years),

            yearRange: { min: minYear, max: maxYear },
            priceRange: { min: minPrice, max: maxPrice },
            mileageRange: { min: minMileage, max: maxMileage }
        };
    }

    onFilterChange(filterType, value) {
        this.setState(prevState => {
            let newFilters = { ...prevState.filters }

            // Apply validation rules based on filterName
            if (filterName === 'selectedYear') {
                if (value.min !== undefined) { // If min year is being updated
                    newFilters.selectedYear.min = Math.min(value.min, newFilters.selectedYear.max);
                }
                if (value.max !== undefined) { // If max year is being updated
                    newFilters.selectedYear.max = Math.max(value.max, newFilters.selectedYear.min);
                }
            } else if (filterName === 'selectedPrice') {
                if (value.min !== undefined) {
                    newFilters.selectedPrice.min = Math.min(value.min, newFilters.selectedPrice.max);
                }
                if (value.max !== undefined) {
                    newFilters.selectedPrice.max = Math.max(value.max, newFilters.selectedPrice.min);
                }
            } else if (filterName === 'selectedMileage') {
                if (value.min !== undefined) {
                    newFilters.selectedMileage.min = Math.min(value.min, newFilters.selectedMileage.max);
                }
                if (value.max !== undefined) {
                    newFilters.selectedMileage.max = Math.max(value.max, newFilters.selectedMileage.min);
                }
            } else {
                newFilters[filterName] = value; // For other filters
            }

            return { filters: newFilters };
        });
    }


    render() {
        return (
            <div className="container-fluid">
                <Filter
                    filterData={this.state.filterData}
                    currentFilters={this.state.filters}
                    onFilterChange={this.onFilterChange}
                />
                <div className="row">
                    {this.state.cars.map((car, index) => {
                        return (
                            <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3">
                                <Card
                                    is_verified={car.dealer.isVerified}
                                    is_dealer={car.isDealer}
                                    is_premier_dealer={car.dealer.isPremierDealer}
                                    carfax={car.carfax}
                                    title={car.name}
                                    price={car.listingPrice}
                                    mileage={car.mileage}
                                    exterior_color={car.exteriorColor}
                                    interior_color={car.interiorColor}
                                    state={car.dealer.state}
                                    city={car.dealer.city}
                                    zipcode={car.dealer.zip}
                                    drive_type={car.driveType}
                                    body_style=""
                                    options_and_description=""
                                    year={car.year}
                                    make={car.make.name}
                                    model={car.model}
                                    trim=""
                                    image={car.image}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}


export default App; // This line is important