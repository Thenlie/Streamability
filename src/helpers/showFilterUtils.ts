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

const filterShowsByReleasedBefore = (showData: ShowData[], releaseDate: string): ShowData[] => {
    const filteredShows: ShowData[] = [];
    const targetDate = new Date(releaseDate);
    showData.forEach((show) => {
        if (!show.release_date) return;
        const showDate = new Date(show.release_date);
        if (showDate.getFullYear() < targetDate.getFullYear()) {
            filteredShows.push(show);
            return;
        }
        if (showDate.getFullYear() === targetDate.getFullYear()) {
            if (showDate.getMonth() < targetDate.getMonth()) {
                filteredShows.push(show);
                return;
            }
            if (showDate.getMonth() === targetDate.getMonth()) {
                if (showDate.getDay() <= targetDate.getDay()) {
                    filteredShows.push(show);
                }
            }
        }
    });
    return filteredShows;
};

export { filterShowsByGenre, filterShowsByType, filterShowsByReleasedBefore };
