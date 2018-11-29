import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";
import { getEntityData } from "../../actions/entityActions";
import ReactEcharts from "echarts-for-react";

const Colors = i => {
  const Palette = [
    "#ffb6c7",
    "#ff839b",
    "#e85b7d",
    "#94d1ff",
    "#4ca9fc",
    "#0968af",
    "#ffed85",
    "#ffe655",
    "#efcc00",
    "#d1b300",
    "#ad9400",
    "#af7000",
    "#d38200",
    "#f28f00",
    "#ffb052",
    "#ffc483",
    "#d585ff",
    "#c455ff",
    "#9d00ef",
    "#8900d1",
    "#7100ad"
  ];
  let greyHex;
  let greyInt;
  if (i > 15) {
    let hex;
    const excess = i - 15;
    for (let j = 0; j < excess; j += 1) {
      greyInt = Math.round((j + 1) * (256 / (excess + 1)));
      greyInt < 16 ? (hex = `0${greyInt.toString(16)}`) : (hex = greyInt.toString(16));
      greyHex = `#${hex}${hex}${hex}`;
      Palette.push(greyHex);
    }
  }
  const colorArray = ["#3d3d3d", "#ffffff", "#3d3d3d", "#ffffff"].concat(Palette.splice(0, 6 + i));
  return colorArray;
};

class Entity extends Component {
  componentDidMount() {
    console.log(window.location.href, this.props.searchText);
    const queryUrl = queryString.parseUrl(window.location.href);
    if ("contract" in queryUrl.query) {
      this.props.dispatch({
        type: "SEARCH_TEXT_CHANGED",
        payload: queryUrl.query.contract
      });
      this.props.dispatch(getEntityData(queryUrl.query.contract));
    }
  }

  getMembersChartOptions = () => {
    const colors = ["#4ca9fc", "#ff89a0", "#f7c34f", "#8d8d8d"];
    let dateDict = {};
    let dates = [];
    let allMembers = [];
    let removedMembers = [];
    let removedMembersDict = {};
    let existingRemovedAddresses = [];

    this.props.allActivities.map(activity => {
      let date = new Date(activity.timeStamp * 1000);
      let formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
      if (!(formattedDate in dateDict)) {
        dateDict[formattedDate] = {};
      }
      if (activity.type === "Assigned") {
        if ("assignedMembers" in dateDict[formattedDate]) {
          dateDict[formattedDate]["assignedMembers"] += 1;
        } else {
          dateDict[formattedDate]["assignedMembers"] = 1;
        }
        if (existingRemovedAddresses.indexOf(activity.address) !== -1) {
          if ("revokedMembers" in dateDict[formattedDate]) {
            dateDict[formattedDate]["revokedMembers"] -= 1;
          } else {
            dateDict[formattedDate]["revokedMembers"] = -1;
          }
        }
      }
      if (activity.type === "Revoked") {
        if (existingRemovedAddresses.indexOf(activity.address) === -1) {
          existingRemovedAddresses.push(activity.address);
        }
        if ("assignedMembers" in dateDict[formattedDate]) {
          dateDict[formattedDate]["assignedMembers"] -= 1;
        } else {
          dateDict[formattedDate]["assignedMembers"] = -1;
        }
        if ("revokedMembers" in dateDict[formattedDate]) {
          dateDict[formattedDate]["revokedMembers"] += 1;
        } else {
          dateDict[formattedDate]["revokedMembers"] = 1;
        }
      }
    });

    let totalMembers = 0;
    let totalRemovedMembers = 0;
    for (let date in dateDict) {
      dates.push(date);
      totalMembers += dateDict[date]["assignedMembers"];
      allMembers.push(totalMembers);
      if ("revokedMembers" in dateDict[date]) {
        totalRemovedMembers += dateDict[date]["revokedMembers"];
      }
      removedMembers.push(totalRemovedMembers);
    }

    return {
      color: colors,
      legend: {
        data: [
          {
            name: "All Members",
            textStyle: { fontFamily: "Montserrat", fontSize: "14" },
            icon:
              "path://M11.5,22.4c-6,0-10.9-4.9-10.9-10.9S5.5,0.6,11.5,0.6s10.9,4.9,10.9,10.9S17.5,22.4,11.5,22.4z M11.5,5.4c-3.3,0-6.1,2.7-6.1,6.1s2.7,6.1,6.1,6.1s6.1-2.7,6.1-6.1S14.8,5.4,11.5,5.4z"
          },
          {
            name: "Removed Members",
            textStyle: { fontFamily: "Montserrat", fontSize: "14" },
            icon:
              "path://M11.5,22.4c-6,0-10.9-4.9-10.9-10.9S5.5,0.6,11.5,0.6s10.9,4.9,10.9,10.9S17.5,22.4,11.5,22.4z M11.5,5.4c-3.3,0-6.1,2.7-6.1,6.1s2.7,6.1,6.1,6.1s6.1-2.7,6.1-6.1S14.8,5.4,11.5,5.4z"
          }
        ],
        selected: {
          "All Members": true,
          "Removed Members": true
        },
        type: "scroll",
        padding: [5, 0, 0, 0],
        itemGap: 25
      },
      grid: {
        top: 80,
        bottom: 40,
        left: 0,
        right: 5
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#3d3d3d"
            }
          },
          axisPointer: {
            show: true,
            label: {
              width: "100%",
              padding: [5, 60, 5, 60],
              textStyle: { fontFamily: "Montserrat", fontSize: "14" },
              formatter(params) {
                return `Members removed as of ${params.value}${params.seriesData.length ? `：${params.seriesData[0].data}` : ""}`;
              }
            }
          },
          axisLabel: {
            show: false
          },
          boundaryGap: false,
          data: dates
        },
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#3d3d3d"
            }
          },
          axisPointer: {
            show: true,
            label: {
              width: "100%",
              padding: [5, 60, 5, 60],
              textStyle: { fontFamily: "Montserrat", fontSize: "14" },
              formatter(params) {
                return `Total member count as of ${params.value}${params.seriesData.length ? `：${params.seriesData[0].data}` : ""}`;
              }
            }
          },
          axisLabel: {
            show: false
          },
          boundaryGap: false,
          data: dates
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            show: false,
            textStyle: { fontFamily: "Montserrat" }
          },
          axisTick: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#3d3d3d"
            }
          }
        },
        {
          type: "value",
          axisLabel: {
            show: false,
            textStyle: { fontFamily: "Montserrat" }
          },
          axisLine: {
            lineStyle: {
              color: "#3d3d3d"
            }
          }
        }
      ],
      series: [
        {
          name: "All Members",
          type: "line",
          xAxisIndex: 1,
          smooth: false,
          data: allMembers,
          lineStyle: {
            width: 3
          }
        },
        {
          name: "Removed Members",
          type: "line",
          smooth: false,
          lineStyle: {
            width: 3
          },
          data: removedMembers
        }
      ]
    };
  };

  getAttributeDistributionOptions = (dataArray, attributeHeader, legendArray) => {
    return {
      color: Colors(dataArray.length - 3),
      tooltip: {
        trigger: "item",
        //   formatter(params) {
        //     const seriesI =
        //       params.seriesIndex === 2 || params.seriesIndex === 0
        //         ? `$${formatCurrencyNumber(params.value, 0)}`
        //         : `${formatCurrencyNumber(params.value, 0)}`;
        //     const seriesEther = params.seriesIndex === 2 ? `<br/>${significantDigits(params.value / etherPrice)} ETH` : ``;
        //     return `${params.seriesName} <br/>${params.name}: ${seriesI} (${params.percent}%)${seriesEther}`;
        //   },
        textStyle: { fontFamily: "Montserrat", fontSize: "14" }
      },
      legend: {
        show: true,
        orient: "vertical",
        x: "left",
        data: legendArray
      },
      series: [
        {
          name: attributeHeader,
          type: "pie",
          radius: ["55%", "80%"],
          label: {
            show: false
          },
          data: dataArray
        }
      ]
    };
  };

  populatePieCharts = (pieChartData, legendData) => {
    return Object.keys(pieChartData).map((attribute, index) => {
      return (
        <Row>
          <ReactEcharts
            option={this.getAttributeDistributionOptions(pieChartData[attribute], attribute, legendData[attribute])}
            notMerge
            lazyUpdate
            style={{ height: "30em", width: "60em", padding: "0px" }}
            opts={{ renderer: "svg" }}
          />
        </Row>
      );
    });
  };

  showEntityActivities = () => {
    this.props.history.push({
      pathname: `/entity/logs`,
      search: "?contract=" + this.props.searchText
    });
  };

  showEntityMembers = () => {
    this.props.history.push({
      pathname: `/entity/members`,
      search: "?contract=" + this.props.searchText
    });
  };

  render() {
    let attributeDistributionData = {};
    let pieChartData = {};
    let legendData = {};
    for (let member of this.props.memberList) {
      if (!member.revoked) {
        for (let attributeHeader of this.props.attributeHeaders) {
          if (!(attributeHeader in attributeDistributionData)) {
            attributeDistributionData[attributeHeader] = {};
          }
          if (!(member[attributeHeader] in attributeDistributionData[attributeHeader])) {
            attributeDistributionData[attributeHeader][member[attributeHeader]] = 1;
          } else {
            attributeDistributionData[attributeHeader][member[attributeHeader]] += 1;
          }
        }
      }
    }
    console.log(attributeDistributionData);
    for (let attributeHeader in attributeDistributionData) {
      let temp = [];
      let legendTemp = [];
      for (let attribute in attributeDistributionData[attributeHeader]) {
        temp.push({ value: attributeDistributionData[attributeHeader][attribute], name: attribute, selected: false });
        legendTemp.push(attribute);
      }
      pieChartData[attributeHeader] = temp;
      legendData[attributeHeader] = legendTemp;
    }
    console.log(pieChartData);
    return (
      <div>
        <Grid>
          <div className="homepage-grid">
            <Row className="innergrid">
              <ReactEcharts
                option={this.getMembersChartOptions()}
                notMerge
                lazyUpdate
                style={{ height: "25em", width: "60em", padding: "0px" }}
                opts={{ renderer: "svg" }}
              />
              <div className="button-grid">
                <div className="button-float" style={{ marginLeft: "10px" }}>
                  <button className="csv-button" onClick={this.showEntityMembers}>
                    <div className="white">View Members</div>
                  </button>
                </div>
                <div className="button-float">
                  <button className="csv-button" onClick={this.showEntityActivities}>
                    <div className="white">Admin Activity</div>
                  </button>
                </div>
              </div>
            </Row>
            {this.populatePieCharts(pieChartData, legendData)}
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStatesToProps = states => {
  return {
    memberList: states.entityData.memberList,
    showAllMembersLoader: states.entityData.showAllMembersLoader,
    memberListRetrievedSuccessfully: states.entityData.memberListRetrievedSuccessfully,
    searchText: states.searchBarData.searchText,
    currentMemberPage: states.entityData.currentMemberPage,
    attributeHeaders: states.entityData.attributeHeaders,
    allActivities: states.entityData.allActivities
  };
};

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(Entity));
