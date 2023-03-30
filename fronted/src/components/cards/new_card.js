import React from "react";
import Card from "react-credit-cards";
import {ShowCards} from "./all_cards";
import axios from "axios";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "../../utills";

import "react-credit-cards/es/styles-compiled.css";

export {Newcards}

export default class Newcards extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async(e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
    
    
    let newtoken= `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIyNjA5NTg2MGZhNzAwMWQ4ODViM2YiLCJpYXQiOjE2ODAwMTc4OTYsImV4cCI6MzQ4MDAxNzg5NiwidHlwZSI6ImFjY2VzcyJ9.0nq9b7Cyw6pqP37Kz5OsECsah_bnMRKvqMFzAhzzDf4`
    console.log("formData", formData)
    console.log("newtoken", newtoken)

    const response= axios.post("https://interview-api.onrender.com/v1/cards", {
        headers: {
            'Authorization': newtoken,
        },
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          cardExpiration: formData.expiry,
          cardHolder: formData.name,
          cardNumber: formData.number,
          category: "VISA"
        })
    })
    console.log("response:::", response)
    // this.setCartlist(response.data.results)
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          <h1>React Credit Cards</h1>
          <h4>Beautiful credit cards for your payment forms</h4>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <button className="btn btn-primary btn-block">PAY</button>
            </div>
          </form>
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
          <hr style={{ margin: "60px 0 30px" }} />
          <div className="App-badges">
            <a
              href="https://github.com/mdaijaj"
              className="github__btn"
            >
              <img
                alt="View on GitHub"
                src="https://cdn.jsdelivr.net/gh/gilbarbara/logos@2017.12/logos/github-icon.svg"
              />
              <span>View on GitHub</span>
            </a>

          </div>
          <hr style={{ margin: "30px 0" }} />
          <ShowCards />
        </div>
        <div className="App-credits">
          Made with ❤️ at <a href="https://amaro.com/">AMARO</a>.
        </div>
      </div>
    );
  }
}
