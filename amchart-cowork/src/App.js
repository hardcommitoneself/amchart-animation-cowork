import { useEffect, useCallback, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import './App.css';

const data = [
  {
      "x": "A",
      "volumn": 6
  },
  {
      "x": "B",
      "volumn": 4
  },
  {
      "x": "C",
      "volumn": 8
  },
  {
      "x": "D",
      "volumn": 9
  },
  {
      "x": "E",
      "volumn": 9
  },
  {
      "x": "F",
      "volumn": 10
  },
  {
      "x": "G",
      "volumn": 10
  },
  {
      "x": "H",
      "volumn": 8
  },
  {
      "x": "I",
      "volumn": 8
  },
  {
      "x": "J",
      "volumn": 8
  },
  {
      "x": "K",
      "volumn": 7
  },
  {
      "x": "L",
      "volumn": 5
  },
  {
      "x": "M",
      "volumn": 1
  },
  {
      "x": "N",
      "volumn": 6
  }
];

function App() {
  const chart = useRef(null);

  const getRandomInt = useCallback((max) => {
    return Math.floor(Math.random() * max);
  }, []);

  const setRandomData = useCallback(() => {
    for (let i = 0; i < data.length; i++) {
      data[i].volumn = getRandomInt(10);
    }

    if(chart.current) {
      chart.current.data = data;
    }
  }, [getRandomInt])

  useEffect(() => {
    const c = am4core.create("chartdiv", am4charts.XYChart);
    c.data = data;
    // Create axes
    const categoryAxis = c.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "x";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.renderer.line.stroke = am4core.color("#3787ac");

    // Create value axis
    const valueAxis = c.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;

    // Create series
    const series = c.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "volumn";
    series.dataFields.categoryX = "x";
    series.name = "Cowork";
    series.columns.template.width = am4core.percent(50);

    chart.current = c;

    const interval = setInterval(() => {
      setRandomData();
    }, 50)

    return () => {
      if(chart.current) {
        chart.current.dispose();
      }

      clearInterval(interval);
    }
  }, [setRandomData]);
  
  return (
    <div className="App">
      <div id="chartdiv"></div>
    </div>
  );
}

export default App;
