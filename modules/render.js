const $header = document.querySelector(".main-info");
const $episodes = document.querySelector(".episodes");
const $description = document.querySelector(".description");
const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-star">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
</svg>`;


export const renderShowData = (showData, toast) => {
    if (!showData) return;

    if (showData.notFound) {
        toast.error('Serie no encontrada');
        return;
    }

    try {
        const { name, rating, image } = showData;
        $header.setHTMLUnsafe('');

        const ratingText = rating && rating.average ? `${starSvg} ${rating.average}` : "Rating: N/A";
        const imageUrl = image;

        $header.setHTMLUnsafe(`
            <div class="info-header">
                <h2 class="title">${name}</h2>
                <p class="average-rating">${ratingText}</p>
            </div>
            <img class="poster" src="${imageUrl}" alt="Poster of ${name}">
        `);

    } catch (error) {
        toast.error("Ups! Something went wrong while rendering the show data.");
        console.error("Error rendering show data:", error);
    }
}


const createEpisodeHTML = (episode) => {
    const ratingValue = episode.rating?.average || 0;
    return `
        <div class="episode episode-${episode.number} rating-${Math.floor(ratingValue)}">
            ${ratingValue}
        </div>
    `;
}

const createSeasonHTML = (data, number) => {
    const episodesHTML = data.map(createEpisodeHTML).join("");
    return `
        <article class="season">
            <header class="season-header">T${number}</header>
            ${episodesHTML}
        </article>
    `;
}


export const renderEpisodes = (episodesBySeason, toast) => {
    if (!episodesBySeason) {
        toast.info("No episodes found for this show.");
        return;
    }

    try {
        console.log("Render episodes by season:", episodesBySeason);

        $episodes.setHTMLUnsafe('');

        const seasonsHTML =
            Object.
                entries(episodesBySeason).
                map(([ seasonNumber, episodes ]) => createSeasonHTML(episodes, seasonNumber)).
                join("");

        $episodes.setHTMLUnsafe(seasonsHTML);

    } catch (error) {
        toast.error("Ups! Something went wrong while rendering the episodes.");
        console.error("Error rendering episodes:", error);
    }
}


export const renderDescription = (description, toast) => {
    if (!description) {
        toast.info("No description available");
        return;
    }
    try {
        $description.setHTMLUnsafe('');
        $description.setHTMLUnsafe(description);
    } catch (error) {
        toast.error("Ups! Something went wrong while rendering the description.");
        console.error("Error rendering description:", error);
    }

}