import { html, css, LitElement } from "lit-element";
import "./../row-con/row-con";
import "./../card-element/card-element";

class AppCon extends LitElement {
  static get properties() {
    return {
      cycles: { type: Array }
    };
  }

  constructor() {
    super();
    this.cycles = [
      {
        "row": "Cycle 1",
        "deprotection": false,
        "content": [
          { "cardName": "Acylation" },
          { "cardName": "Rev. Acylation", "amount": 50 },
          { "cardName": "Substitution", "amount": 56 },
          { "cardName": "Urea", "amount": 112 }
        ]
      },
      {
        "row": "Cycle 1",
        "deprotection": true,
        "content":
          [
            { "cardName": "Fmoc", "amount": 12 },
            { "cardName": "Ester" },
            { "cardName": "Boc", "amount": 134 },
          ]
      },
      {
        "row": "Cycle 2",
        "deprotection": false,
        "content":
          [
            { "cardName": "Acylation", "amount": 12 },
            { "cardName": "Rev. Acylation", "amount": 34 },
            { "cardName": "SuCl", "amount": 56 },
            { "cardName": "No load" },
            { "cardName": "Urea" },
            { "cardName": "Mono. Red. Amination" },
            { "cardName": "Red. Amination" },
          ]
      },
      {
        "row": "Cycle 2",
        "deprotection": true,
        "content":
          [
            { "cardName": "Fmoc", "amount": 28 },
            { "cardName": "Ester", "amount": 98 },
            { "cardName": "Boc", "amount": 43 },
          ]
      },
      {
        "row": "Cycle 3",
        "deprotection": false,
        "content":
          [
            { "cardName": "Acylation", "amount": 13 },
            { "cardName": "Rev. Acylation" },
            { "cardName": "SuCl", "amount": 12 },
            { "cardName": "No load", "amount": 12 },
            { "cardName": "Urea" },
            { "cardName": "Mono. Red. Amination", "amount": 113 },
            { "cardName": "Red. Amination" },
          ]
      },
      {
        "row": "Cycle 3",
        "deprotection": true,
        "content":
          [
            { "cardName": "Fmoc", "amount": 12 },
            { "cardName": "Ester" },
            { "cardName": "Boc", "amount": 134 },
          ]
      }
    ]
    this.addEventListener("addACard", (e) => {
      this.cycles[e.detail.index].content = [...this.cycles[e.detail.index].content, { "cardName": "New", "amount": 5 }];
      this.requestUpdate();
    })
  }

  render() {
    return html`
      ${this.cycles.map(cycle => {
      return html`<row-con .index="${this.cycles.indexOf(cycle)}" title="${cycle.row}" .deprotection="${cycle.deprotection}">
        ${cycle.content.map(card => {
        return html`
            <card-element title="${card.cardName}" amount="${card.amount ? card.amount : NaN}"></card-element>
          `
      })}  
        </row-con>`
    })}
    `;
  }
}

customElements.define("app-con", AppCon);
