import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";

function Card(props) {
    return (
        <div className="listing-item" carfax={props.carfax}>
            <div className="listing-image">
                <img src={props.image} alt="" />
            </div>
            <div className="listing-info">
                <h4 className="listing-title">{props.title}</h4>
                <p className="listing-price"><strong>价格:</strong> ${props.price}</p>
                <p className="listing-year"><strong>年份:</strong> {props.year}</p>
                <p className="listing-mileage"><strong>里程:</strong> {props.mileage}</p>
                <p className="exterior-color"><strong>外观颜色:</strong> {props.exterior_color}</p>
                <p className="interior-color"><strong>内饰颜色:</strong> {props.interior_color}</p>
                <div className="verified-badge" style={{ fontSize: '18px', display: 'inline-block', backgroundColor: 'green', borderRadius: '50px', padding: '2px 15px' }}>
                    <p style={{ color: 'white', margin: 0 }}>认证卖家</p>
                </div>
                <div className="premier-dealer-badge" style={{ fontSize: '18px', display: 'inline-block', backgroundColor: 'gold', borderRadius: '50px', padding: '2px 15px' }}>
                    <p style={{ color: 'black', margin: 0 }}>精选经销商</p>
                </div>
                <div className="carfax-badge" style={{ fontSize: '18px', display: 'inline-block', borderRadius: '50px', padding: '10px 0' }}>
                    <img src="https://uploads-ssl.webflow.com/654d8bd9b929e284fbe484ae/65c248a7f51659032c9af01c_carfax_logo.png" style={{ width: '120px' }} />
                </div>
            </div>
            <div className="listing-details">
                <div className="listing-features">
                    <span>州: {props.state}</span>
                    <span>城市: {props.city}</span>
                    <span>zipcode: {props.zipcode}</span>
                    <span className="drive-type">驱动类型: {props.drive_type}</span>
                    {/* <span className="body-style">车身类型: {props.body_style}</span>
                    <span className="options-and-description">选配/套餐: {props.options_and_description}</span> */}
                </div>
            </div>
        </div>
    );
}

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
            <label className="year-dropdown">
                Min Year:
                <select name="minYear"
                    value={props.currentFilters.selectedYears.min}
                    onChange={(e) => props.onFilterChange('selectedyears', { ...props.currentFilters.selectedYears, min: e.target.value })}>
                    {yearsOptions}
                </select>
            </label>
            <label className="year-dropdown">
                Max Year:
                <select name="maxYear"
                    value={props.currentFilters.selectedYears.max}
                    onChange={(e) => props.onFilterChange('selectedyears', { ...props.currentFilters.selectedYears, max: e.target.value })}>
                    {yearsOptions}
                </select>
            </label>

            <label className="makeDropdown">
                Make:
                <select name="make"
                    value={props.currentFilters.selectedMake}
                    onChange={(e) => props.onFilterChange('selectedMake', e.target.value)}>
                    <option value="">All Makes</option>
                    {makesOptions}
                </select>
            </label>

            <label className="dealerDropdown">
                Dealer:
                <select name="dealer"
                    value={props.currentFilters.selectedDealer}
                    onChange={(e) => props.onFilterChange('selectedDealer', e.target.value)}>
                    <option value="">All Dealers</option>
                    {dealersOptions}
                </select>
            </label>

            {/* Price Filter */}
            <div className="priceSlider">
                <label>
                    Price:
                    <Slider
                        range
                        min={minPrice}
                        max={maxPrice}
                        value={[props.currentFilters.selectedPrice.min, props.currentFilters.selectedPrice.max]}
                        pushable={5000}
                        allowCross={false}
                        onChange={value => {
                            props.onFilterChange('selectedPrice', { min: value[0], max: value[1] });
                        }}
                    />
                    <label>
                        Min Price:
                        <span>{props.currentFilters.selectedPrice.min} </span>
                    </label>
                    <label>
                        Max Price:
                        <span>{props.currentFilters.selectedPrice.max}</span>
                    </label>
                </label>
            </div>

            {/* Mileage Filter */}
            <div className="mileageSlider">
                <label>
                    Mileage:
                    <Slider
                        range
                        min={minMileage}
                        max={maxMileage}
                        pushable={1000}
                        allowCross={false}
                        value={[props.currentFilters.selectedMileage.min, props.currentFilters.selectedMileage.max]}
                        onChange={value => {
                            props.onFilterChange('selectedMileage', { min: value[0], max: value[1] });
                        }}
                    />
                    <label>
                        Min Mileage:
                        <span>{props.currentFilters.selectedMileage.min}</span>
                    </label>
                    <label>
                        Max Mileage:
                        <span>{props.currentFilters.selectedMileage.max}</span>
                    </label>
                </label>
            </div>

            {/* Reset Filters Button */}
            <div>
                <button onClick={props.onResetFilters}>Reset Filters</button>
            </div>

        </div>
    );
}

function CarModal({ car, onClose }) {
    // Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Process the form data
        console.log("Form submitted");
    };

    // If there is no car data, don't render the modal
    if (!car) return null;

    return (
        <div className="car-modal-backdrop" onClick={onClose}>
            <div className="car-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="car-modal-header">
                    <h2>{car.title}</h2>
                    <button className="car-modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="car-modal-body">
                    <div className="car-images">
                        {car.imagesArray.map((image, index) => (
                            <img key={index} src={image} alt={`Car ${index}`} />
                        ))}
                    </div>
                    <div className="car-details">
                        <p><strong>价格:</strong> ${car.price}</p>
                        <p><strong>年份:</strong> {car.year}</p>
                        <p><strong>里程:</strong> {car.mileage}</p>
                        <p><strong>外观颜色:</strong> {car.exterior_color}</p>
                        <p><strong>内饰颜色:</strong> {car.interior_color}</p>
                        {/* ... other details ... */}
                    </div>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <input type="text" placeholder="Your name" required />
                        <input type="email" placeholder="Your email" required />
                        <input type="tel" placeholder="Your phone number" />
                        <textarea placeholder="Your message"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



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
            },
            showModal: false,
            selectedCar: null
        };

        // Binding onFilterChange method
        this.onFilterChange = this.onFilterChange.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
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
                //use processFilterData() to process the data and set the state
                this.setState({ filterData: this.processFilterData(data.data.cars) });
                //set initial filters
                this.setState({
                    filters: {
                        selectedMake: '',
                        selectedDealer: '',
                        selectedYears: { min: this.state.filterData.yearRange.min, max: this.state.filterData.yearRange.max },
                        selectedPrice: { min: this.state.filterData.priceRange.min, max: this.state.filterData.priceRange.max },
                        selectedMileage: { min: this.state.filterData.mileageRange.min, max: this.state.filterData.mileageRange.max }
                    }
                });
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

            // set year to a number instead of a string
            years.add(parseInt(car.year, 10));

            // set price to a number instead of a string
            let price = parseInt(car.listingPrice, 10);

            minPrice = Math.min(minPrice, price);
            maxPrice = Math.max(maxPrice, price);

            minMileage = Math.min(minMileage, car.mileage);
            maxMileage = Math.max(maxMileage, car.mileage);

            minYear = Math.min(minYear, car.year);
            maxYear = Math.max(maxYear, car.year);
        });

        console.log(maxYear)
        return {
            makes: Array.from(makes).sort(),
            dealers: Array.from(dealers).sort(),
            years: Array.from(years).sort((a, b) => a - b),

            yearRange: { min: minYear, max: maxYear },
            priceRange: { min: minPrice, max: maxPrice },
            mileageRange: { min: minMileage, max: maxMileage }
        };
    }

    onFilterChange(filterName, value) {
        this.setState(prevState => {
            let newFilters = { ...prevState.filters }

            // Apply validation rules based on filterName
            if (filterName === 'selectedyears') {
                if (value.min !== undefined) { // If min year is being updated
                    newFilters.selectedYears.min = Math.min(value.min, newFilters.selectedYears.max);
                }
                if (value.max !== undefined) { // If max year is being updated
                    newFilters.selectedYears.max = Math.max(value.max, newFilters.selectedYears.min);
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

    filterCars(cars, filters) {
        return cars.filter(car => {
            const matchesYear = car.year >= filters.selectedYears.min && car.year <= filters.selectedYears.max;
            const matchesMake = !filters.selectedMake || car.make.name === filters.selectedMake;
            const matchesDealer = !filters.selectedDealer || car.dealer.name === filters.selectedDealer;
            const matchesPrice = car.listingPrice >= filters.selectedPrice.min && car.listingPrice <= filters.selectedPrice.max;
            const matchesMileage = car.mileage >= filters.selectedMileage.min && car.mileage <= filters.selectedMileage.max;
            return matchesYear && matchesMake && matchesDealer && matchesPrice && matchesMileage;

        })
    }

    resetFilters() {
        this.setState({
            filters: {
                selectedMake: '',
                selectedDealer: '',
                selectedYears: { min: this.state.filterData.yearRange.min, max: this.state.filterData.yearRange.max },
                selectedPrice: { min: this.state.filterData.priceRange.min, max: this.state.filterData.priceRange.max },
                selectedMileage: { min: this.state.filterData.mileageRange.min, max: this.state.filterData.mileageRange.max },
            }
        });
    }

    openModal = (car) => {
        this.setState({ showModal: true, selectedCar: car })
    }


    closeModal = () => {
        this.setState({ showModal: false, selectedCar: null })
    }


    render() {
        const filteredCars = this.filterCars(this.state.cars, this.state.filters);

        return (
            <div className="app-container">
                <Filter
                    filterData={this.state.filterData}
                    currentFilters={this.state.filters}
                    onFilterChange={this.onFilterChange}
                    onResetFilters={this.resetFilters}
                />

                <div className="container-fluid">
                    <div className="row">
                        {filteredCars.map((car, index) => {
                            return (
                                <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3">
                                    <div onClick={() => this.openModal(car)}>
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
                                </div>
                            );
                        })}
                    </div>
                </div>
                {this.state.showModal &&
                    <CarModal car={this.state.selectedCar} onClose={this.closeModal} />
                }
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
export default App; // This line is important