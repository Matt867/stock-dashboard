import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';


// chart options
const areaChartOptions = {
    chart: {
        height: 100,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    xaxis: { label: { show: false } },
    yaxis: { label: { show: false } },
    grid: {
        strokeDashArray: 0,
        show: false,
    }
};

const AreaChart = ({ slot, plotData  }) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);
    console.log(plotData.map(val => val));

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary[700]],
            xaxis: {
                categories: plotData.map(value => value.Date + "T00:00:00.000Z"),
                labels: {
                    format: 'MMM'
                },
                labels: {
                    style: {
                        colors: [
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary
                        ]
                    },
                    show: false,
                },
                axisBorder: {
                    show: false,
                    color: line
                },
                axisTicks: {
                    show: false
                },
                tickAmount: 7
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    },
                    show: false,
                },
                axisBorder: {
                    show: false,
                    color: line
                },
                axisTicks: {
                    show: false
                },
            },
            grid: {
                borderColor: line,
                show: false,
            },
            tooltip: {
                theme: 'dark'
            }
        }));
    }, [primary, secondary, line, theme, slot]);

    const [series, setSeries] = useState([
        {
            name: 'Opening Price',
            data: [0, 0, 0, 0, 0, 0, 0]
        },
    ]);

    useEffect(() => {
        setSeries([
            {
                name: 'Opening Price',
                data: plotData.map(value => value.Open)
            },
        ]);
    }, [slot]);

    return <ReactApexChart options={options} series={series} type="area" height={100} />;
};

AreaChart.propTypes = {
    slot: PropTypes.string
};

export default AreaChart;