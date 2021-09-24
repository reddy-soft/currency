import { Component } from "react";
import { Redirect } from "react-router-dom";
import "./index.css";

class Home extends Component {
  state = {
    data: [],
    countryData: [],
    fromCountry: "USD",
    toCountry: "INR",
    amount: 0,
    result: 0,
    resultFlag: false,
  };

  componentDidMount() {
    this.getCurrencyData();
  }

  getCurrencyData = async () => {
    const { fromCountry } = this.state;

    const url = `https://v6.exchangerate-api.com/v6/7509fda2fa91ecae446ffe45/latest/${fromCountry}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);

    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = {
        base: fetchedData.base_code,
        conversionRates: fetchedData.conversion_rates,
        time: fetchedData.time_last_update_utc,
      };
      const countries = Object.keys(updatedData.conversionRates);

      this.setState({ data: updatedData, countryData: countries });
    }
  };

  optionsDetails = (each) => {
    return (
      <option value={each} key={each}>
        {each}
      </option>
    );
  };

  changeFromCountry = (event) => {
    this.setState({ fromCountry: event.target.value, resultFlag: false });
  };

  changeToCountry = (event) => {
    this.setState({ toCountry: event.target.value, resultFlag: false });
  };
  onChangeAmount = (event) => {
    this.setState({ amount: event.target.value, resultFlag: false });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();

    await this.getCurrencyData();
    const { toCountry, data, amount } = this.state;
    const result = data.conversionRates[toCountry] * parseInt(amount);
    this.setState({ result, resultFlag: true });
  };

  conversionResultAppend = () => {
    const { result, amount, fromCountry, toCountry, data } = this.state;
    return (
      <p>{`${amount} ${fromCountry} = ${result} ${toCountry} updated on ${data.time}`}</p>
    );
  };

  onClickLogout = () => {
    const { history } = this.props;
    localStorage.removeItem("login");

    history.replace("/login");
  };

  render() {
    const { countryData, toCountry, amount, resultFlag } = this.state;
    const token = localStorage.getItem("login");

    if (token === null) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <div className="home-navBar">
          <h1>Currency Converter</h1>

          <h1 onClick={this.onClickLogout} className="logout">
            Logout
          </h1>
        </div>
        <div className="home-bg-container">
          <h1>Currency Converter</h1>
          <h1>Live currency exchange Rates</h1>
          <form className="home-currencyToolCard" onSubmit={this.onSubmitForm}>
            <div className="home-currency-cont">
              <label htmlFor="amount">Amount</label>
              <br />
              <input
                type="text"
                id="amount"
                className="home-AmountInput"
                value={amount}
                onChange={this.onChangeAmount}
                placeholder="Amount in Numbers only"
              />
            </div>
            <div className="home-currency-cont">
              <label htmlFor="from">From</label>
              <br />
              <select
                id="from"
                className="home-AmountInput"
                onChange={this.changeFromCountry}
                name="fromCountry"
              >
                {countryData.map((each) => this.optionsDetails(each))}
              </select>
            </div>
            <div className="home-currency-cont">
              <label htmlFor="to">To</label>
              <br />
              <select
                id="to"
                className="home-AmountInput"
                onChange={this.changeToCountry}
                name="toCountry"
                value={toCountry}
              >
                {countryData.map((each) => this.optionsDetails(each))}
              </select>
            </div>
            <div className="home-currency-cont">
              <p> </p>
              <button className="home-convertBtn">Convert</button>
            </div>
          </form>
          {resultFlag && this.conversionResultAppend()}
        </div>
      </>
    );
  }
}
export default Home;
