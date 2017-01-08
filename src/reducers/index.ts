import {combineReducers} from 'redux';
import {treeStore, ITreeStore} from './tree.reducer';

export interface IAppState {
    tree?: ITreeStore;
}

export const ROOT_REDUCER = combineReducers({
    tree: treeStore
});