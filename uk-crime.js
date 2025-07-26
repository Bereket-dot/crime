document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('crimeMap').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    document.getElementById('fetchCrimes').addEventListener('click', function() {
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;
        
        if (!latitude || !longitude) {
            alert('Please enter both latitude and longitude coordinates');
            return;
        }
        
        document.querySelector('.loading').style.display = 'block';
        document.getElementById('crimeResults').innerHTML = '';
        
        map.setView([latitude, longitude], 15);
        fetchCrimeData(latitude, longitude);
    });
    
    function fetchCrimeData(lat, lng) {
        const apiUrl = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=2023-01`;
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('Crime data unavailable for this location');
                return response.json();
            })
            .then(data => {
                document.querySelector('.loading').style.display = 'none';
                displayCrimeData(data);
                plotCrimesOnMap(data, lat, lng);
            })
            .catch(error => {
                document.querySelector('.loading').style.display = 'none';
                document.getElementById('crimeResults').innerHTML = `
                    <div class="crime-card">
                        <div class="crime-category">Error</div>
                        <p>${error.message}. Please try different coordinates.</p>
                    </div>
                `;
            });
    }
    
    function displayCrimeData(crimes) {
        const resultsContainer = document.getElementById('crimeResults');
        
        if (!crimes.length) {
            resultsContainer.innerHTML = `
                <div class="crime-card">
                    <div class="crime-category">No Crimes Reported</div>
                    <p>No criminal activities reported in this area for the selected period</p>
                </div>
            `;
            return;
        }
        
        let crimeHTML = '';
        crimes.slice(0, 9).forEach(crime => {
            crimeHTML += `
                <div class="crime-card">
                    <div class="crime-category">${crime.category.replace(/-/g, ' ')}</div>
                    <p>${crime.location.street.name || 'Street information not available'}</p>
                    <div class="crime-location">
                        <span>📍</span> 
                        ${crime.location.latitude}, ${crime.location.longitude}
                    </div>
                    <div>📅 ${crime.month}</div>
                    ${crime.outcome_status ? `
                        <div class="crime-outcome">
                            Outcome: ${crime.outcome_status.category}
                        </div>
                    ` : '<div class="crime-outcome">No outcome reported</div>'}
                </div>
            `;
        });
        
        resultsContainer.innerHTML = crimeHTML;
    }
    
    function plotCrimesOnMap(crimes, lat, lng) {
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
        
        L.marker([lat, lng]).addTo(map)
            .bindPopup('Search Center')
            .openPopup();
        
        crimes.forEach(crime => {
            L.marker([
                crime.location.latitude, 
                crime.location.longitude
            ]).addTo(map)
            .bindPopup(`
                <strong>${crime.category.replace(/-/g, ' ')}</strong><br>
                ${crime.location.street.name}<br>
                ${crime.month}
            `);
        });
    }
    
    // Initial load with London coordinates
    document.getElementById('latitude').value = '51.5074';
    document.getElementById('longitude').value = '-0.1278';
    fetchCrimeData(51.5074, -0.1278);
});