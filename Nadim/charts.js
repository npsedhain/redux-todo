import { html, LitElement } from "lit-element";

class GoogleChart extends LitElement {
  constructor() {
    super();
    // Load the Visualization API and the corechart package.
    google.charts.load("current", { packages: ["line"] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Time', 'FBW7', 'FBW8'],
      ['Input',  1000,      1050],
      ['R1',  500,      700],
      ['R2',  200,       50],
    ]);

    var options = {
      title: 'Company Performance',
      legend: { position: 'bottom' }
    };

    var chart = new google.charts.Line(document.getElementById('chart_div'));
    chart.draw(data, google.charts.Line.convertOptions(options));
  }


  render() {
    return html`
      <h1>Google Charts</h1>
      <slot name="googleCharts"></slot>
    `;
  }
}

customElements.define("google-chart", GoogleChart);
