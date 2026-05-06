
import { TvMazeService } from "./services/TvMazeService.js";
import { EventController } from "./modules/EventController.js";
import { CONFIG } from "./modules/config.js";
import { renderShowData, renderEpisodes, renderDescription } from "./modules/render.js";
import { Toast } from "./modules/toast.js";

const $form = document.querySelector('.search-form');
const toast = new Toast();

const { API_URL, PLACEHOLDER_IMAGE } = CONFIG;
const tvMazeService = new TvMazeService(API_URL, PLACEHOLDER_IMAGE);

async function main() {
    const controller = new EventController( async (id) => {
        try {
            const [ showData, episodeBySeason ] = await Promise.all([
            tvMazeService.getShowData(id),
            tvMazeService.getEpisodeList(id)
        ]);

        renderShowData(showData);
        renderEpisodes(episodeBySeason);
        renderDescription(showData.summary);
        toast.success("Show data loaded successfully!");

        } catch (error) {
            toast.error("Failed to load show data. Please try again.");
            console.error("Error in main controller:", error);
        }
    });

    $form.addEventListener('submit', controller);
    await controller.onSubmit(CONFIG.ID);
}

main();
