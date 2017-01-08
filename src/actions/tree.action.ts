import {treeFiles} from '../constants/tree-files';

export class TreeActions {
    static LOAD_NODES: string = 'LOAD_NODES';
    static SET_NODES: string = 'SET_NODES';

    static SET_SELECTED_NODE_PATH: string = 'SET_SELECTED_NODE_PATH';
    static SET_SELECTED_NODE: string = 'SET_SELECTED_NODE';

    static UPDATE_NODE_VALUE: string = 'UPDATE_NODE_VALUE';
    static UPDATE_NODES: string = 'UPDATE_NODES';


    load(file: string = Object.keys(treeFiles)[0]) {
        return {
            type: TreeActions.LOAD_NODES,
            payload: {file}
        };
    }

    updateNodeValue(value: string) {
        return {
            type: TreeActions.UPDATE_NODE_VALUE,
            payload: {value}
        };
    }

    setSelectedNodePath(selectedNodePath: Array<number>) {
        return {
            type: TreeActions.SET_SELECTED_NODE_PATH,
            payload: {
                selectedNodePath: selectedNodePath.reverse()
            }
        };
    }
}

export default  new TreeActions();