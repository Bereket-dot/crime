document.addEventListener('DOMContentLoaded', function() {
    const trendsCtx = document.getElementById('crimeTrendsChart').getContext('2d');
    const distributionCtx = document.getElementById('crimeDistributionChart').getContext('2d');
    const heatmapCtx = document.getElementById('crimeHeatmap').getContext('2d');
    
    let trendsChart, distributionChart, heatmapChart;
    
    document.getElementById('analyzeCrime').addEventListener('click', function() {
        const state = document.getElementById('state').value;
        const year = document.getElementById('year').value;
        const crimeType = document.getElementById('crimeType').value;
        
        updateCharts(state, year, crimeType);
    });
    
    function updateCharts(state, year, crimeType) {
        // Destroy existing charts if they exist
        if (trendsChart) trendsChart.destroy();
        if (distributionChart) distributionChart.destroy();
        if (heatmapChart) heatmapChart.destroy();
        
        // Generate simulated data based on selections
        const states = {
            'CA': 'California',
            'NY': 'New York',
            'TX': 'Texas',
            'IL': 'Illinois',
            'AZ': 'Arizona'
        };
        
        const crimeTypes = ['Theft', 'Burglary', 'Assault', 'Robbery', 'Vandalism'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const hours = Array.from({length: 24}, (_, i) => i);
        
        // Generate data for trends chart
        const trendsData = months.map(() => Math.floor(Math.random() * 500) + 300);
        
        // Generate data for distribution chart
        const distributionData = crimeTypes.map(() => Math.floor(Math.random() * 1000) + 500);
        
        // Generate data for heatmap
        const heatmapData = [];
        for (let i = 0; i < days.length; i++) {
            for (let j = 0; j < hours.length; j++) {
                heatmapData.push({
                    x: hours[j],
                    y: days[i],
                    value: Math.floor(Math.random() * 100)
                });
            }
        }
        
        // Create trends chart
        trendsChart = new Chart(trendsCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: `${crimeType} Crimes in ${states[state]} (${year})`,
                    data: trendsData,
                    borderColor: '#4a9fff',
                    backgroundColor: 'rgba(74, 159, 255, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0f0ff'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(179, 222, 255, 0.1)'
                        },
                        ticks: {
                            color: '#b3deff'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(179, 222, 255, 0.1)'
                        },
                        ticks: {
                            color: '#b3deff'
                        }
                    }
                }
            }
        });
        
        // Create distribution chart
        distributionChart = new Chart(distributionCtx, {
            type: 'bar',
            data: {
                labels: crimeTypes,
                datasets: [{
                    label: `Crime Distribution in ${states[state]} (${year})`,
                    data: distributionData,
                    backgroundColor: [
                        'rgba(74, 159, 255, 0.7)',
                        'rgba(109, 247, 225, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(74, 159, 255, 1)',
                        'rgba(109, 247, 225, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0f0ff'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(179, 222, 255, 0.1)'
                        },
                        ticks: {
                            color: '#b3deff'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(179, 222, 255, 0.1)'
                        },
                        ticks: {
                            color: '#b3deff'
                        }
                    }
                }
            }
        });
        
        // Create heatmap chart
        heatmapChart = new Chart(heatmapCtx, {
            type: 'matrix',
            data: {
                datasets: [{
                    label: 'Crime by Time of Day',
                    data: heatmapData,
                    backgroundColor: function(context) {
                        const value = context.dataset.data[context.dataIndex].value;
                        const alpha = Math.min(0.9, value / 100);
                        return `rgba(74, 159, 255, ${alpha})`;
                    },
                    borderWidth: 0,
                    width: ({chart}) => (chart.chartArea || {}).width / 24 - 1,
                    height: ({chart}) => (chart.chartArea || {}).height / 7 - 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return `${days[context[0].parsed.y]}, ${context[0].parsed.x}:00`;
                            },
                            label: function(context) {
                                const value = context.dataset.data[context.dataIndex].value;
                                return `Crime index: ${value}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        min: 0,
                        max: 23,
                        offset: false,
                        grid: {
                            display: false
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#b3deff'
                        },
                        title: {
                            display: true,
                            text: 'Hour of Day',
                            color: '#b3deff'
                        }
                    },
                    y: {
                        type: 'category',
                        labels: days,
                        offset: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#b3deff'
                        },
                        title: {
                            display: true,
                            text: 'Day of Week',
                            color: '#b3deff'
                        }
                    }
                }
            }
        });
    }
    
    // Initialize with default values
    updateCharts('CA', '2024', 'all');
});