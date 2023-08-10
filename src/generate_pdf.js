import React from 'react';
import {Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, AreaChart, Area } from 'recharts';
import ReactPDFChart from 'react-pdf-charts';

// Create styles
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    fontSize: "8px"
  }
});

// Create Document Component
const MyDocument = (props) => {
  const { tickersData, chartData, newsData } = props.data;
  const tickersTable = () => {
    return (
      <View style={{display: "flex", flexDirection: "column", margin: "20px", border: "1px solid grey"}} >
        <View style={{display: "flex", flexDirection: "row", padding: "10px", backgroundColor: "#BEBEBE"}}  >
          <View style={{flex: 1}} >
            <Text>Symbol</Text>
          </View>
          <View style={{flex: 1}} >
            <Text>Company Name</Text>
          </View>
          <View style={{flex: 1}} >
            <Text>Price</Text>
            </View>
          <View style={{flex: 1}} >
            <Text>Change</Text>
            </View>
          <View style={{flex: 1}} >
            <Text>Change %</Text>
            </View>
          <View style={{flex: 1}} >
            <Text>Volume</Text>
            </View>
          <View style={{flex: 1}} >
            <Text>Average Volume</Text>
            </View>
          <View style={{flex: 1}} >
            <Text>Market Cap</Text>
            </View>       
        </View>
        {tickersData.map((tickerData) => {
          return (
            <View style={{display: "flex", flexDirection: "row", padding: "10px"}}  >
              <View style={{flex: 1}} >
                <Text>{tickerData.symbol}</Text>
              </View>
              <View style={{flex: 1}} >
                <Text>{tickerData.shortName}</Text>
                </View>
              <View style={{flex: 1}} >
                <Text>{tickerData.regularMarketPrice.fmt}</Text>
                </View>
              <View style={{flex: 1}} >
                <Text>{tickerData.regularMarketChange.fmt}</Text>
                </View>
              <View style={{flex: 1}} >
                <Text>{tickerData.regularMarketChangePercent.fmt}</Text>
                </View>
              <View style={{flex: 1}} >
                <Text>{tickerData.regularMarketVolume.fmt}</Text>
                </View>
              <View style={{flex: 1}} >
                <Text>{tickerData.averageDailyVolume3Month.fmt}</Text>
                </View>
              <View style={{flex: 1}} >
                <Text>{tickerData.marketCap.fmt}</Text>
                </View>
            </View>
          )
        })}
      </View>
    )
  }

  const renderNews = (nd) => {
    return (
      nd?.results.map((news) => {
        return (
          <View style={{marginLeft: "30px", marginRight: "30px", marginBottom: "10px", border: "1px solid grey", padding: "10px"}}  >
            <View>
              <Text style={{fontWeight: "bold", fontSize: "10px", marginBottom: "5px"}} >{news.title}</Text>
            </View>
            <View>
              <Text>{news.description}</Text>
            </View>
          </View>
    )
  }))
  }

  const renderChart = (chart) => {
    const data = []
    const length = chart.timestamp.length
    for(var i=0; i<length; i++){
      data.push({
        name: new Date(chart.timestamp[i]*1000).toLocaleDateString(),
        high: chart.indicators.quote[0]["high"][i],
        open: chart.indicators.quote[0]["open"][i],
        low: chart.indicators.quote[0]["low"][i],
        close: chart.indicators.quote[0]["close"][i],
      })
    }
    return <ReactPDFChart>
            <LineChart
          width={500}
          height={150}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Line type="monotone" dataKey="high" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="low" stroke="#82ca9d" />
        </LineChart>
    </ReactPDFChart>
  }

  return <Document>
    <Page size="A4" style={styles.page}>
      <View style={{padding: "20px", fontSize: "16px", fontWeight: "bold"}} >
        <Text>Stocks Newsletter</Text>
      </View>
      {tickersTable()}
      <View style={{padding: "20px", fontSize: "16px", fontWeight: "bold"}} >
        <Text>Charts</Text>
      </View>
      {
        chartData.map((chartData, index) => {
          chartData = chartData.chart.result[0]
          return <View key={index} >
            <View style={{marginLeft: "30px", marginBottom: "10px", fontSize: "12px", fontWeight: "bold"}} >
              <Text>{chartData.meta.symbol} Chart</Text>
            </View>
            {renderChart(chartData)}
          </View>
      })}

      <View style={{marginLeft: "30px", marginBottom: "10px", marginTop: "20px", fontSize: "12px", fontWeight: "bold"}} >
        <Text>All Ticker Recent News</Text>
      </View>
      {
        newsData.map((nd, index) => {
          return <View>
            <View key={index} >
              {renderNews(nd)}
            </View>
          </View>
      })}
    </Page>
  </Document>
};

export default MyDocument;