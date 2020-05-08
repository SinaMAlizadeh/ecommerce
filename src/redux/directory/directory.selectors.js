import {createSelector} from 'reselect';

const selectDirectory = state => state.directory;

export const selectDirectoryeSections = createSelector(
    [selectDirectory],
    directory => directory.sections
)