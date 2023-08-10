import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, AreaChart, Area } from 'recharts';
import ReactPDFChart from 'react-pdf-charts';

// Create styles
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    fontSize: "8px"
  }
});

// Create Document Component
const MyDocument = props => {
  const {
    tickersData,
    chartData,
    newsData
  } = props.data;
  const tickersTable = () => {
    return /*#__PURE__*/_jsxs(View, {
      style: {
        display: "flex",
        flexDirection: "column",
        margin: "20px",
        border: "1px solid grey"
      },
      children: [/*#__PURE__*/_jsxs(View, {
        style: {
          display: "flex",
          flexDirection: "row",
          padding: "10px",
          backgroundColor: "#BEBEBE"
        },
        children: [/*#__PURE__*/_jsx(View, {
          style: {
            flex: 1
          },
          children: /*#__PURE__*/_jsx(Text, {
            children: "Symbol"
          })
        }), /*#__PURE__*/_jsx(View, {
          style: {
            flex: 1
          },
          children: /*#__PURE__*/_jsx(Text, {
            children: "Company Name"
          })
        }), /*#__PURE__*/_jsx(View, {
          style: {
            flex: 1
          },
          children: /*#__PURE__*/_jsx(Text, {
            children: "Price"
          })
        }), /*#__PURE__*/_jsx(View, {
          style: {
            flex: 1
          },
          children: /*#__PURE__*/_jsx(Text, {
            children: "Change"
          })
        }), /*#__PURE__*/_jsx(View, {
          style: {
            flex: 1
          },
          children: /*#__PURE__*/_jsx(Text, {
            children: "Change %"
          })
        }), /*#__PURE__*/_jsx(View, {
          style: {
            flex: 1
          },
          children: /*#__PURE__*/_jsx(Text, {
            children: "Volume"
          })
        }), /*#__PURE__*/_jsx(View, {
          style: {
            flex: 1
          },
          children: /*#__PURE__*/_jsx(Text, {
            children: "Average Volume"
          })
        }), /*#__PURE__*/_jsx(View, {
          style: {
            flex: 1
          },
          children: /*#__PURE__*/_jsx(Text, {
            children: "Market Cap"
          })
        })]
      }), tickersData.map(tickerData => {
        return /*#__PURE__*/_jsxs(View, {
          style: {
            display: "flex",
            flexDirection: "row",
            padding: "10px"
          },
          children: [/*#__PURE__*/_jsx(View, {
            style: {
              flex: 1
            },
            children: /*#__PURE__*/_jsx(Text, {
              children: tickerData.symbol
            })
          }), /*#__PURE__*/_jsx(View, {
            style: {
              flex: 1
            },
            children: /*#__PURE__*/_jsx(Text, {
              children: tickerData.shortName
            })
          }), /*#__PURE__*/_jsx(View, {
            style: {
              flex: 1
            },
            children: /*#__PURE__*/_jsx(Text, {
              children: tickerData.regularMarketPrice.fmt
            })
          }), /*#__PURE__*/_jsx(View, {
            style: {
              flex: 1
            },
            children: /*#__PURE__*/_jsx(Text, {
              children: tickerData.regularMarketChange.fmt
            })
          }), /*#__PURE__*/_jsx(View, {
            style: {
              flex: 1
            },
            children: /*#__PURE__*/_jsx(Text, {
              children: tickerData.regularMarketChangePercent.fmt
            })
          }), /*#__PURE__*/_jsx(View, {
            style: {
              flex: 1
            },
            children: /*#__PURE__*/_jsx(Text, {
              children: tickerData.regularMarketVolume.fmt
            })
          }), /*#__PURE__*/_jsx(View, {
            style: {
              flex: 1
            },
            children: /*#__PURE__*/_jsx(Text, {
              children: tickerData.averageDailyVolume3Month.fmt
            })
          }), /*#__PURE__*/_jsx(View, {
            style: {
              flex: 1
            },
            children: /*#__PURE__*/_jsx(Text, {
              children: tickerData.marketCap.fmt
            })
          })]
        });
      })]
    });
  };
  const renderNews = nd => {
    return nd?.results.map(news => {
      return /*#__PURE__*/_jsxs(View, {
        style: {
          marginLeft: "30px",
          marginRight: "30px",
          marginBottom: "10px",
          border: "1px solid grey",
          padding: "10px"
        },
        children: [/*#__PURE__*/_jsx(View, {
          children: /*#__PURE__*/_jsx(Text, {
            style: {
              fontWeight: "bold",
              fontSize: "10px",
              marginBottom: "5px"
            },
            children: news.title
          })
        }), /*#__PURE__*/_jsx(View, {
          children: /*#__PURE__*/_jsx(Text, {
            children: news.description
          })
        })]
      });
    });
  };
  const renderChart = chart => {
    const data = [];
    const length = chart.timestamp.length;
    for (var i = 0; i < length; i++) {
      data.push({
        name: new Date(chart.timestamp[i] * 1000).toLocaleDateString(),
        high: chart.indicators.quote[0]["high"][i],
        open: chart.indicators.quote[0]["open"][i],
        low: chart.indicators.quote[0]["low"][i],
        close: chart.indicators.quote[0]["close"][i]
      });
    }
    return /*#__PURE__*/_jsx(ReactPDFChart, {
      children: /*#__PURE__*/_jsxs(LineChart, {
        width: 500,
        height: 150,
        data: data,
        margin: {
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        },
        children: [/*#__PURE__*/_jsx(CartesianGrid, {
          strokeDasharray: "3 3"
        }), /*#__PURE__*/_jsx(XAxis, {
          dataKey: "name"
        }), /*#__PURE__*/_jsx(YAxis, {}), /*#__PURE__*/_jsx(Line, {
          type: "monotone",
          dataKey: "high",
          stroke: "#8884d8",
          activeDot: {
            r: 8
          }
        }), /*#__PURE__*/_jsx(Line, {
          type: "monotone",
          dataKey: "low",
          stroke: "#82ca9d"
        })]
      })
    });
  };
  return /*#__PURE__*/_jsx(Document, {
    children: /*#__PURE__*/_jsxs(Page, {
      size: "A4",
      style: styles.page,
      children: [/*#__PURE__*/_jsx(View, {
        style: {
          padding: "20px",
          fontSize: "16px",
          fontWeight: "bold"
        },
        children: /*#__PURE__*/_jsx(Text, {
          children: "Stocks Newsletter"
        })
      }), tickersTable(), /*#__PURE__*/_jsx(View, {
        style: {
          padding: "20px",
          fontSize: "16px",
          fontWeight: "bold"
        },
        children: /*#__PURE__*/_jsx(Text, {
          children: "Charts"
        })
      }), chartData.map((chartData, index) => {
        chartData = chartData.chart.result[0];
        return /*#__PURE__*/_jsxs(View, {
          children: [/*#__PURE__*/_jsx(View, {
            style: {
              marginLeft: "30px",
              marginBottom: "10px",
              fontSize: "12px",
              fontWeight: "bold"
            },
            children: /*#__PURE__*/_jsxs(Text, {
              children: [chartData.meta.symbol, " Chart"]
            })
          }), renderChart(chartData)]
        }, index);
      }), /*#__PURE__*/_jsx(View, {
        style: {
          marginLeft: "30px",
          marginBottom: "10px",
          marginTop: "20px",
          fontSize: "12px",
          fontWeight: "bold"
        },
        children: /*#__PURE__*/_jsx(Text, {
          children: "All Ticker Recent News"
        })
      }), newsData.map((nd, index) => {
        return /*#__PURE__*/_jsx(View, {
          children: /*#__PURE__*/_jsx(View, {
            children: renderNews(nd)
          }, index)
        });
      })]
    })
  });
};
export default MyDocument;