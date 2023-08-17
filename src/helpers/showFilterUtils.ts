import { ShowData } from '../types';

const filterShowsByGenre = (showData: ShowData[], genreId: number): ShowData[] => {
    const filteredShows: ShowData[] = [];
    showData.forEach((show) => {
        if (show.genre_ids?.includes(genreId)) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

const filterShowsByType = (showData: ShowData[], showType: 'movie' | 'tv'): ShowData[] => {
    const filteredShows: ShowData[] = [];
    showData.forEach((show) => {
        if (show.showType === showType) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

export { filterShowsByGenre, filterShowsByType };
