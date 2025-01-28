
Chart.defaults.font.family = 'Space Mono';
Chart.defaults.font.size = 10;
async function fetchMonthlyLaunchData() {
    try {
        const response = await fetch('/api/phones-launched-monthly');
        const data = await response.json();

        const months = data.map(item => item.month);
        const phoneCounts = data.map(item => item.phone_count);

        const ctx = document.getElementById('monthlyLaunchChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Total Phones Launched in a Month',
                    data: phoneCounts,
                    fill: false,
                    borderColor: 'rgb(0, 0, 0)',
                    backgroundColor: 'rgb(159, 159, 159)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                maintainAspectRatio: false
            }
        });
    } catch (error) {
        console.error('Error fetching monthly launch data:', error);
    }
}

fetchMonthlyLaunchData();

async function fetchMonthlyBrandLaunchData() {
    try {
        // Fetch the data from the backend
        const response = await fetch('/api/phones-by-brand-monthly');
        const data = await response.json();
        console.log(data); // Debugging: Check the structure of the data

        // Process the data to group it by brand
        const brands = [...new Set(data.map(item => item.brand))]; // Get unique brands
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Initialize a dataset for each brand
        const datasets = brands.map(brand => {
            const brandData = data.filter(item => item.brand === brand);
            const monthlyData = months.map(month => {
                const monthEntry = brandData.find(item => item.month === month);
                return monthEntry ? monthEntry.phone_count : 0; // Default to 0 if no data
            });

            return {
                label: brand,
                data: monthlyData,
                backgroundColor: 'rgb(0,0,0)',
                borderColor: [
                    `rgb(168, 168, 168)`,
                    `rgb(0, 0, 0)`,
                ],
                borderWidth: 1
            };
        });


        const ctx = document.getElementById('monthlyBrandLaunchChart').getContext('2d');


        new Chart(ctx, {
            type: 'line',
            data: {
                labels: months, // X-axis: Months
                datasets: datasets
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                maintainAspectRatio: false
            }
        });
    } catch (error) {
        console.error('Error fetching monthly brand launch data:', error);
    }
}

fetchMonthlyBrandLaunchData();

async function fetchBrandLaunchData() {
    try {
        const response = await fetch('/api/phones-launched-by-brand');
        const data = await response.json();

        const brands = data.map(item => item.brand);
        const phoneCounts = data.map(item => item.phone_count);

        const ctx = document.getElementById('brandLaunchChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: brands,
                datasets: [{
                    label: 'Total Phones Launched by a Brand in 2024',
                    data: phoneCounts,
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.99)'
                      ],
                      borderColor:[
                        'rgba(0, 0, 0, 0.99)'
                      ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                maintainAspectRatio: false
            }
        });
    } catch (error) {
        console.error('Error fetching brand launch data:', error);
    }
}

fetchBrandLaunchData();
