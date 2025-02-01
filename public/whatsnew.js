document.addEventListener("DOMContentLoaded", function() 
{
    const updates = 
    [
        {
            title: "✨ What's New",
            changes: [
                "🆕 Added What's New Page.",
                "📅 Added Yearly Navigation.",
                "📊 Added Graphs in 2024 page to have a Glance of the year.",
                "❌ Removed the What's new card on loading the Page."
            ]
        },
        {
            title: "<i class='bi bi-calendar'></i> 27 Jan 2025",
            changes: [
                "🆕 Added What's Card on loading the page.",
                "🆕 New secondary Navigation Bar for quickly accessing the pages.",
                "🆕 Added a new animation for the search-bar on tablets."
            ]
        },
        {
            title: "<i class='bi bi-calendar'></i> 26 Jan 2025",
            changes: [
                "🔍 Added the search for sorting the brands you like.",
                "📰 Added a few more brands to the side bar.",
                "🛠️ Improved the UI/UX for mobile screens.",
                "📆 Added 2024 page with data."

            ]
        }
    ];

    const container = document.getElementById("updates-container");

    updates.forEach(update => 
    {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.classList.add("title");
        title.innerHTML = update.title;

        card.appendChild(title);

        update.changes.forEach(change => 
        {
            const changeElement = document.createElement("p");
            changeElement.classList.add("content");
            changeElement.innerHTML = `- ${change}`;
            card.appendChild(changeElement);
        });

        container.appendChild(card);
    });
});


