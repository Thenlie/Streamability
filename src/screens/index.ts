/**
 * This file exports all screens to make imports easier
 * Be sure to add any new screens to this file
 * You will also need to add the new route to routes.tsx
 */
import { DiscoverScreen, DiscoverDetailScreen } from './discover';
import FeaturedSearchScreen from './FeaturedSearchScreen';
import PageNotFoundScreen from './PageNotFoundScreen';
import ShowDetailsScreen from './ShowDetailsScreen';
import ActorDetailScreen from './ActorDetailScreen';
import SeasonsScreen from './SeasonsScreen';
import SeasonDetailsScreen from './SeasonDetailsScreen';

export * from './auth';
export * from './dashboard';

export { SearchResultsScreen } from './search_results';
export {
    ActorDetailScreen,
    DiscoverScreen,
    FeaturedSearchScreen,
    PageNotFoundScreen,
    ShowDetailsScreen,
    DiscoverDetailScreen,
    SeasonsScreen,
    SeasonDetailsScreen,
};
