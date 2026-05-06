export class TvMazeService {
    #API_URL
    #PLACEHOLDER
    
    constructor(apiUrl, placeholder) {
        this.#API_URL = apiUrl;
        this.#PLACEHOLDER = placeholder;
    }

    async getShowData(id) {
        try {
            const URLCONFIG = new URL(`${this.#API_URL}${id}`);
            const response = await fetch(URLCONFIG);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const showData = await response.json();
            return {
                name: showData.name ?? "Unknown Title",
                rating: showData.rating,
                image: showData.image?.medium ?? this.#PLACEHOLDER,
                summary: showData.summary,
                genres: showData.genres ?? "Unknown"
            }

        } catch (error) {
            console.error(`Error fetching show data for id ${id}:`, error);
            return {
                name: "Unknown Title",
                rating: null,
                image: this.#PLACEHOLDER,
                summary: "No summary available.",
                notFound: true
            };
        }
    }

    async getEpisodeList(id) {
        try {
            const URLCONFIG = new URL(`${this.#API_URL}${id}/episodes`);
            const episodes = await fetch(URLCONFIG).then((res) => {
                if (!res.ok) {
                    throw new Error(`Error al obtener los datos de los episodios del show con id ${id}`);
                }

                return res.json()
            });

            const episodesList = episodes.map((episode) => ({
                number: episode.number,
                season: episode.season,
                rating: episode.rating,
            }));

            const episodeBySeason = Object.groupBy(episodesList, (episode) => episode.season);

            return episodeBySeason;

        } catch (err) {
            console.error(`Error fetching episode list for show with id ${id}:`, err);
            return {};
        }
    }
}