import { html, css, LitElement } from "lit-element";

class CardElement extends LitElement {
  static get styles() {
    return css`
      .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: auto;
        height: 60px;
      }
      .yellow {
        background-color: yellow;
      }
      .green {
        background-color: green;
      }
      .red {
        background-color: red;
      }
      h4,
      p {
        padding: 0px 10px;
      }
      li {
        float: left;
        margin: 0 10px;
        list-style-type: none;
      }
      .clearfix::after {
        content: "";
        clear: both;
        display: table;
      }
    `;
  }
  static get properties() {
    return {
      title: { type: String },
      amount: { type: Number }
    };
  }
  render() {
    return html`
    <li class="clearfix">
      <div
        class="card ${this.amount >= 100
        ? "red"
        : this.amount <= 100
          ? "green"
          : "yellow"}"
      >
        <h4><b>${this.title}</b></h4>
        <p>${this.amount ? this.amount : ""}</p>
      </div>
    </li>
    `;
  }
}

customElements.define("card-element", CardElement);
