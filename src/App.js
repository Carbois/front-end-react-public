import React from 'react';
import ReactDOM from 'react';

function Card(props) {
    return (
        <div className="listing-item" verifiedSeller={props.is_verified} isDealer={props.is_dealer} isPremierDealer={props.is_premier_dealer} carfax={props.carfax}>
            <div className="listing-image">
                <img src={props.image} alt="" />
            </div>
            <div className="listing-info">
                <h4 className="listing-title">{props.title}</h4>
                <p className="listing-price"><strong>价格:</strong> ${props.price}</p>
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
                    <span className="body-style">车身类型: {props.body_style}</span>
                    <span className="options-and-description">选配/套餐: {props.options_and_description}</span>
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
            }
        };
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
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }

    render() {
        return (
            <div className="container-fluid">
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


ReactDOM.render(<App />, document.getElementById('app'));
export default App; // This line is important