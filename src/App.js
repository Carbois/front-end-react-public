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
                <p className="listing-price"><strong>{props.text.priceTag}:</strong> ${props.price.toLocaleString('en-US')}</p>
                <p className="listing-year"><strong>{props.text.yearTag}:</strong> {props.year}</p>
                <p className="listing-mileage"><strong>{props.text.mileageTag}:</strong> {props.mileage.toLocaleString('en-US')}</p>
                <p className="exterior-color"><strong>{props.text.extColorTag}:</strong> {props.exterior_color}</p>
                <p className="interior-color"><strong>{props.text.intColorTag}:</strong> {props.interior_color}</p>
                <p className="Region"><strong>{props.text.regionTag}:</strong> {props.region}</p>
                {/* hide the verified badge if the dealer is not verified */}
                {props.isVerified != 0 && (
                    <div className="verified-badge" style={{ fontSize: '18px', display: 'inline-block', backgroundColor: 'green', borderRadius: '50px', padding: '2px 15px' }}>
                        <p style={{ color: 'white', margin: 0 }}>{props.text.verifiedTag}</p>
                    </div>
                )}
                {/* hide the is_premier_dealer badge if the seller is not a premier_dealer */}
                {props.is_premier_dealer != 0 && (
                    <div className="premier-dealer-badge" style={{ fontSize: '18px', display: 'inline-block', backgroundColor: 'gold', borderRadius: '50px', padding: '2px 15px', }}>
                        <p style={{ color: 'black', margin: 0 }}>{props.text.premierTag}</p>
                    </div>
                )}
                <div className="carfax-badge" style={{ fontSize: '18px', display: 'inline-block', borderRadius: '50px', padding: '10px 0' }}>
                    <img src="https://uploads-ssl.webflow.com/654d8bd9b929e284fbe484ae/65c248a7f51659032c9af01c_carfax_logo.png" style={{ width: '120px' }} />
                </div>
            </div>
            <div className="listing-details">
                <div className="listing-features">
                    <span>{props.text.stateTag}: {props.state}</span>
                    <span>{props.text.cityTag}: {props.city}</span>
                    <span>zipcode: {props.zipcode}</span>
                    <span className="drive-type">{props.text.driveTypeTag}: {props.drive_type}</span>
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

    const modelsOptions = props.filterData.filteredModels
        ? props.filterData.filteredModels.map(model => <option key={model} value={model}>{model}</option>)
        : <option>Loading models...</option>;

    const regionOptions = props.filterData.regions
        ? props.filterData.regions.map(region => <option key={region} value={region}>{region}</option>)
        : <option>Loading regions...</option>;

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

            <label className="modelDropdown">
                Model:
                <select name="model"
                    value={props.currentFilters.selectedModel}
                    onChange={(e) => props.onFilterChange('selectedModel', e.target.value)}>
                    <option value="">All Models</option>
                    {modelsOptions}
                </select>
            </label>
            {/* <label className="regionDropdown">
                Region:
                <select name="region"
                    value={props.currentFilters.selectedRegion}
                    onChange={(e) => props.onFilterChange('selectedRegion', e.target.value)}>
                    <option value="">All Regions</option>
                    {regionOptions}
                </select>
            </label> */}

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
                        <span>{props.currentFilters.selectedMileage.min} </span>

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
        //pull webflow token from local storage with key "_ms-mid"
        const token = localStorage.getItem("_ms-mid");
        console.log(token);
        //check if offer is above minimum offer
        if (event.target.offer.value < Math.round(car.listingPrice * 0.95)) {
            alert("Offer must be above the minimum offer of " + Math.round(car.listingPrice * 0.95));
            return;
        }
        //get the form data
        const formData = new FormData(event.target);
        //create an object to store the form data
        const data = {};
        //loop through the form data and store it in the object
        for (let key of formData.keys()) {
            data[key] = formData.get(key);
        }
        //log the form data

        //submit the form data to our graphql server
        const mutation = `mutation AddOffer($name: String!, $email: String!, $phone: String!, $zipcode: String!, $offer: Int!, $carId: String!) {
            addOffer(name: $name, email: $email, phone: $phone, zipcode: $zipcode, offer: $offer, carId: $carId) {
                ok
                offer {
                    id
                }
            }
        }`

        const variables = {
            name: data["Name"],
            email: data["Email"],
            phone: data["PhoneNumber"],
            zipcode: data["zipCode"],
            offer: data["offer"],
            carId: car.id
        }
        console.log(variables);
        fetch("https://dev-microservices.horizonauto.com/flaskapp/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ query: mutation, variables: variables })
        })


        console.log("Form submitted");
        //show a success message
        alert("Your offer has been submitted successfully");
        //close the modal
        onClose();
    };

    // If there is no car data, don't render the modal
    if (!car) return null;

    const outerArray = car.imagesArray ? JSON.parse(car.imagesArray) : [];

    var imagesArray = [];
    //try catch block
    try {
        imagesArray = JSON.parse(outerArray[0]);
        imagesArray.unshift(car.image);
    }
    catch (e) {
        imagesArray[0] = car.image
    }

    return (
        <div className="car-modal-backdrop" onClick={onClose}>
            <div className="car-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="car-modal-body">
                    <div className="car-details">
                        <div className="car-modal-header">
                            <button className="car-modal-close" onClick={onClose}>&times;</button>
                            <h2>{car.name}</h2>
                        </div>
                        <p className='listing-price'><strong>价格:</strong> ${car.listingPrice.toLocaleString('en-US')}</p>
                        <p><strong>年份:</strong> {car.year}</p>
                        <p><strong>里程:</strong> {car.mileage.toLocaleString('en-US')}</p>
                        <p><strong>外观颜色:</strong> {car.exteriorColor}</p>
                        <p><strong>内饰颜色:</strong> {car.interiorColor}</p>
                        <p><strong>选配/套餐:</strong> {car.options}</p>
                        {/*... other details ...*/}
                        <h2>提出报价</h2>
                        <h2 className='best-offer'>Best Offer: ${Math.round(car.listingPrice * 0.95).toLocaleString('en-US')}</h2>
                        <ul>
                            <li>通过此表格向经销商提出您的报价。</li>
                            <li>该报价为非约束性谈判提案。</li>
                            <li>目前最好的报价已在上方标明。低于此报价的出价将自动被拒绝。</li>
                        </ul>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <label htmlFor="Name">Name:</label>
                            <input type="text" name="Name" placeholder="Your name" required />
                            <label htmlFor="Email">Email:</label>
                            <input type="email" name="Email" placeholder="Your email" required />
                            <label htmlFor="PhoneNumber">Phone Number:</label>
                            <input type="tel" name="PhoneNumber" placeholder="774 434 7522" required />
                            <label htmlFor="zipCode">Zip Code:</label>
                            <input type="text" name="zipCode" placeholder="95014" required />
                            <label htmlFor="offer">Offer: </label>
                            <p>Minimum Offer: ${Math.round(car.listingPrice * 0.95).toLocaleString('en-US')}</p>
                            <input type="number" name="offer" placeholder="Your offer" value={Math.round(car.listingPrice * 0.95).toLocaleString('en-US')} required />
                            <input type="hidden" name="carId" value={car.id} />
                            <button type="submit">Submit</button>
                        </form>
                    </div>

                    <div className="car-images">
                        {imagesArray.map((image, index) => (
                            <img key={index} src={image} alt={`Car ${index}`} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}



class App extends React.Component {
    constructor() {
        super();
        // check if we have a made selected in the the url
        // if we do, set the make equal to the selected make
        const urlParams = new URLSearchParams(window.location.search);
        const initialMake = urlParams.get('makeName') || '';
        const language = window.location.pathname.includes("/cn") ? "cn" : "en";
        let text= {};
        if(language === "cn"){
            text = {
                yearTag: "年份",
                mileageTag: "里程",
                extColorTag: "外观颜色",
                intColorTag: "内饰颜色",
                regionTag: "地区",
                stateTag: "州",
                cityTag: "城市",
                driveTypeTag: "驱动类型",
                verifiedTag: "认证卖家",
                premierTag: "",
                priceTag: "价格"
            }
        }
        else{
            text = {
                yearTag: "Year",
                mileageTag: "Mileage",
                extColorTag: "Exterior Color",
                intColorTag: "Interior Color",
                regionTag: "Region",
                stateTag: "State",
                cityTag: "City",
                driveTypeTag: "Drive Type",
                verifiedTag: "Verified Seller",
                premierTag: "Premier Dealer",
                priceTag: "Price"
            }
        }
        this.state = {
            cars: [],
            filterData: {
                makes: [],
                regions: [],
                years: [],
                models: [],
                filteredModels: [],
                priceRange: { min: 0, max: 0 },
                mileageRange: { min: 0, max: 0 },
                yearRange: { min: 0, max: 0 }
            },
            filters: {
                selectedMake: initialMake,
                selectedRegion: '',
                selectedModel: '',
                selectedYears: { min: 0, max: 0 },
                selectedPrice: { min: 0, max: 0 },
                selectedMileage: { min: 0, max: 0 },
            },
            showModal: false,
            selectedCar: null,
            loadedWithMake: false,
            text: text

        };


        // Binding onFilterChange method
        this.onFilterChange = this.onFilterChange.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
    }

    componentDidMount() {
        // Assuming you're at the URL: "http://example.com?region=norcal&make=bmw"
        const searchParams = new URLSearchParams(window.location.search);
        const regionParam = searchParams.get('region'); // 'norcal'
        const makeParam = searchParams.get('make'); // 'bmw'

        if (regionParam && makeParam) {
            console.log(regionParam, makeParam)

            this.setState({ loadedWithMake: true });
            this.fetchInventory(regionParam, makeParam);
            
        }
        else if (regionParam && !makeParam) {

            this.setState({ loadedWithMake: true });
            this.fetchInventory(regionParam);
            
        } else if (makeParam) {

            this.setState({ loadedWithMake: true });
            this.fetchInventory(null, makeParam);
            
        } else {
            this.fetchInventory();
        }

    }

    fetchInventory(region, make) {
        console.log(region, make)

        const urlParams = new URLSearchParams(window.location.search);
        let initialMake = urlParams.get('makeName') || '';
        
        const url = "https://dev-microservices.horizonauto.com/flaskapp/graphql";
        const headers = { "Content-Type": "application/json" };
        const query = `
            query CarsByRegionOrMake($region: String, $make: String) {
                carsByRegionOrMake(region: $region, make: $make) {
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
                        region
                    }
                    carfax
                    isDealer
                    imagesArray
                    options
                }
            }`;
        let variables = { "region": "", "make": "" };
        if (region && make) {
            variables.region = region;
            variables.make = make;
        }
        else if (region) {
            variables.region = region;
        }
        else if (make) {
            variables.make = make;
        }
        else {
            variables = {};
        }
        console.log(variables)
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query: query, variables: variables }),
        })
            .then(response => response.json())
            .then(data => {
                // Assuming the data returned is in the format { data: { cars: [...] } }
                this.setState({ cars: data.data.carsByRegionOrMake });
                //use processFilterData() to process the data and set the state
                this.setState({ filterData: this.processFilterData(data.data.carsByRegionOrMake) });
                //set initial filters
                if(!this.state.loadedWithMake){
                    initialMake = '';
                }
                this.setState({
                    filters: {
                        selectedMake: initialMake,
                        selectedRegion: '',
                        selectedModel: '',
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
        let regions = new Set();
        let years = new Set();
        let models = new Set();
        let minPrice = Infinity, maxPrice = -Infinity;
        let minMileage = Infinity, maxMileage = -Infinity;
        let minYear = Infinity, maxYear = -Infinity;


        cars.forEach(car => {
            makes.add(car.make.name);
            regions.add(car.dealer.region);

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

            // grab the first word of the model, unless the first word is "Grand", or the name contains "AMG" and is a mercedes, then grab the first two words
            let model = car.model.split(" ")[0];
            if (model.toLowerCase() == ("grand") || ((model.toLowerCase() == "amg" || car.model.toLowerCase().includes("amg")) && car.make.name === "Mercedes Benz")) {
                model = car.model.split(" ")[0] + " " + car.model.split(" ")[1];
            }
            if (model.toLowerCase() === "model") {
                model = car.model.split(" ")[0] + " " + car.model.split(" ")[1];
            }
            console.log(model)
            models.add(model);
            // upadate car model to have the formatted model saved
            car.model = model;
            console.log(models.size)
        });

        console.log(maxYear)
        return {
            makes: Array.from(makes).sort(),
            regions: Array.from(regions).sort(),
            years: Array.from(years).sort((a, b) => a - b),
            models: Array.from(models).sort(),
            filteredModels: Array.from(models).sort(),
            yearRange: { min: minYear, max: maxYear },
            priceRange: { min: minPrice, max: maxPrice },
            mileageRange: { min: minMileage, max: maxMileage }
        };
    }

    onFilterChange(filterName, value) {
        this.setState(prevState => {
            let newFilters = { ...prevState.filters }
            let newFilterData = { ...prevState.filterData }

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
            } else if (filterName === 'selectedMake') {
                if (this.state.loadedWithMake) {
                    this.setState({ loadedWithMake: false });
                    this.fetchInventory();
                }
                newFilters.selectedMake = value;
                console.log("make selected", value)
                newFilters.selectedModel = ''; // Reset model when make is changed
                // Filter models based on the cars with the selected make
                if (value) {
                    const filteredModels = prevState.cars
                        .filter(car => car.make.name === value)
                        .map(car => car.model)
                        .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
                    newFilterData.filteredModels = filteredModels;
                    console.log("filtered models", filteredModels.sort())
                } else {
                    newFilterData.filteredModels = newFilterData.models // Reset models when no make is selected
                }
            } else {
                newFilters[filterName] = value; // For other filters
            }

            return { filters: newFilters, filterData: newFilterData };
        });
    }

    filterCars(cars, filters) {
        return cars.filter(car => {
            const matchesYear = car.year >= filters.selectedYears.min && car.year <= filters.selectedYears.max;
            const matchesMake = !filters.selectedMake || car.make.name === filters.selectedMake;
            const matchesRegion = !filters.selectedRegion || car.dealer.region === filters.selectedRegion;
            const matchesPrice = car.listingPrice >= filters.selectedPrice.min && car.listingPrice <= filters.selectedPrice.max;
            const matchesMileage = car.mileage >= filters.selectedMileage.min && car.mileage <= filters.selectedMileage.max;
            const matchesModel = !filters.selectedModel || car.model === filters.selectedModel;
            return matchesYear && matchesMake && matchesRegion && matchesPrice && matchesMileage && matchesModel;

        })
    }

    resetFilters() {
        this.setState({
            filters: {
                selectedMake: '',
                selectedRegion: '',
                selectedModel: '',
                selectedYears: { min: this.state.filterData.yearRange.min, max: this.state.filterData.yearRange.max },
                selectedPrice: { min: this.state.filterData.priceRange.min, max: this.state.filterData.priceRange.max },
                selectedMileage: { min: this.state.filterData.mileageRange.min, max: this.state.filterData.mileageRange.max },
            },
            filterData: {
                makes: this.state.filterData.makes,
                regions: this.state.filterData.regions,
                years: this.state.filterData.years,
                models: this.state.filterData.models,
                filteredModels: this.state.filterData.models,
                priceRange: { min: this.state.filterData.priceRange.min, max: this.state.filterData.priceRange.max },
                mileageRange: { min: this.state.filterData.mileageRange.min, max: this.state.filterData.mileageRange.max },
                yearRange: { min: this.state.filterData.yearRange.min, max: this.state.filterData.yearRange.max }

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

        const showModal = this.state.showModal
        const selectedCar = this.state.selectedCar

        return (
            <div className="app-container">
                {this.state.showModal &&
                    <CarModal car={this.state.selectedCar} onClose={this.closeModal} />
                }
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
                                <div key={index} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
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
                                            options={car.options}
                                            region={car.dealer.region}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
export default App; // This line is important