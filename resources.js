document.addEventListener('DOMContentLoaded', function() {
    const resources = [
        {
            title: "UK Police API",
            category: "api",
            description: "Official UK crime datasets with street-level crime reports, outcomes, and neighborhood information",
            link: "https://data.police.uk",
            icon: "🇬🇧"
        },
        {
            title: "U.S. Data.gov Crime",
            category: "api",
            description: "Comprehensive U.S. crime data from multiple agencies including FBI, police departments, and cities",
            link: "https://catalog.data.gov/dataset?tags=crime",
            icon: "🇺🇸"
        },
        {
            title: "Crime Analysis Tools",
            category: "tools",
            description: "Advanced crime analysis and visualization using Python, Pandas, and data science techniques",
            link: "https://www.codersarts.com/post/crime-data-analysis-and-visualization-project",
            icon: "📊"
        },
        {
            title: "Global Crime Patterns",
            category: "research",
            description: "International crime datasets and spatiotemporal analysis of street crime distributions",
            link: "https://www.nature.com/articles/s41597-025-04757-8",
            icon: "🌍"
        },
        {
            title: "Interactive Crime Mapping",
            category: "tools",
            description: "Visualizing London's crime data through interactive mapping and spatial analysis",
            link: "https://medium.com/@tsvetelina1/uk-police-stop-and-check-visualizing-londons-crime-data-through-interactive-mapping-cc9c633c7c9f",
            icon: "📱"
        },
        {
            title: "Crime Management Systems",
            category: "tools",
            description: "Full-stack crime reporting systems with PHP, MySQL, and administrative interfaces",
            link: "https://itsourcecode.com/free-projects/php-project/crime-reporting-system-project-in-php-with-source-code/",
            icon: "💻"
        },
        {
            title: "International CPTED Association",
            category: "org",
            description: "Global organization promoting Crime Prevention Through Environmental Design principles",
            link: "https://www.cpted.net/",
            icon: "🏛️"
        },
        {
            title: "UNODC Crime Data",
            category: "api",
            description: "Global crime statistics and criminal justice information from United Nations Office on Drugs and Crime",
            link: "https://www.unodc.org/unodc/en/data-and-analysis/crime-and-criminal-justice.html",
            icon: "📈"
        }
    ];

    const resourcesContainer = document.getElementById('resourcesContainer');
    const searchInput = document.getElementById('resourceSearch');
    const categorySelect = document.getElementById('resourceCategory');

    function renderResources(resourcesArray) {
        resourcesContainer.innerHTML = '';
        
        resourcesArray.forEach(resource => {
            const resourceHTML = `
                <div class="resource-card">
                    <div class="resource-img">${resource.icon}</div>
                    <div class="resource-content">
                        <h3>${resource.title}</h3>
                        <p>${resource.description}</p>
                        <a href="${resource.link}" target="_blank" class="resource-link">Access Resource</a>
                    </div>
                </div>
            `;
            resourcesContainer.innerHTML += resourceHTML;
        });
    }

    function filterResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categorySelect.value;
        
        const filtered = resources.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm) || 
                                resource.description.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || resource.category === category;
            return matchesSearch && matchesCategory;
        });
        
        renderResources(filtered);
    }

    searchInput.addEventListener('input', filterResources);
    categorySelect.addEventListener('change', filterResources);

    // Initial render
    renderResources(resources);
});