document.addEventListener('DOMContentLoaded', function() {
    // Global crime trends chart
    const ctx = document.getElementById('globalTrendsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Global Crime Index',
                data: [65, 59, 80, 81, 56, 72, 45, 67, 55, 60, 70, 75],
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
});