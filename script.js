document.addEventListener('DOMContentLoaded', function() {
    const eventListElement = document.getElementById('event-list');

    // Sample event data (you can fetch from an API)
    const events = [
        { name: 'Workshop on Robotics', date: 'May 15, 2024', location: 'Auditoriam Hall' },
        { name: 'Workshop on Web Development', date: 'May 15, 2024', location: 'Online' },
        { name: 'Quize Competition', date: 'May 16, 2024', location: 'Auditoriam Hall' }
    ];

    // Display events dynamically
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
        `;
        eventListElement.appendChild(eventElement);
    });
});
