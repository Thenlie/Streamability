/**
 * This file exports all screens to make imports easier
 * Be sure to add any new screens to this file
 * You will also need to add the new route to main.tsx
 */
import DiscoverScreen from './DiscoverScreen';
import FeaturedSearchScreen from './FeaturedSearchScreen';
import PageNotFoundScreen from './PageNotFoundScreen';
import ShowDetailsScreen from './ShowDetailsScreen';

export * from './auth';
export * from './dashboard';

export { SearchResultsScreen } from './search_results';
export { DiscoverScreen, FeaturedSearchScreen, PageNotFoundScreen, ShowDetailsScreen };
