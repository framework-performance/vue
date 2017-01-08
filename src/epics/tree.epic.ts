import {TreeActions} from "../actions/";
import "rxjs";
import {Observable} from "rxjs/Observable";
import {ActionsObservable} from "redux-observable";
import {INode} from "../models/node.model";
import {treeFiles} from '../constants/tree-files';

export class TreeEpic {

    fetchTree = (action$: ActionsObservable<{type: string; payload: {file: string,nodes: any; nodesCount: number; showAnimation: boolean; }}>) =>
        action$.ofType(TreeActions.LOAD_NODES)
            .switchMap(({payload}) =>
                Observable.ajax.get(this.getFileForType(payload.file))
                    .map((tree) => tree.response)
                    .map((nodes) => ({
                        type: TreeActions.SET_NODES,
                        payload: {
                            nodes: nodes,
                            nodesCount: this.getNodesCountForType(payload.file),
                            showAnimation: this.showAnimationForTree(payload.file)
                        }
                    }))
            );


    setSelectedNode = (action$: ActionsObservable<{type: string; payload: {selectedNodePath: Array<number>;}}>
        , store) =>
        action$.ofType(TreeActions.SET_SELECTED_NODE_PATH)
            .map(({payload}) => ({
                    type: TreeActions.SET_SELECTED_NODE,
                    payload: {
                        selectedNode: this.getNode(
                            [...store.getState().tree.nodes],
                            [...payload.selectedNodePath]
                        )
                    }
                })
            );

    updateNode = (action$: ActionsObservable<{type: string; payload: {value: string}}>, store) =>
        action$.ofType(TreeActions.UPDATE_NODE_VALUE)
            .map(({payload}) => ({
                    type: TreeActions.UPDATE_NODES,
                    payload: {
                        nodes: this.updateNodeValue(
                            [...store.getState().tree.nodes],
                            [...store.getState().tree.selectedNodePath],
                            payload.value
                        )
                    }
                })
            );

    showAnimationForTree(type): boolean {
        if (this.getNodesCountForType(type) < 1000) {
            return true;
        }
        return false;
    }

    getFileForType(type: string = ''): string {
        try {
            return 'tree-data/' + this.getTreeFileObject(type).file;
        } catch (error) {
            console.error('load tree.json failed', error);
            return '';
        }
    }

    getNodesCountForType(type: string = ''): number {
        try {
            return this.getTreeFileObject(type).nodes;
        } catch (error) {
            console.error('load tree.json failed', error);
            return -1;
        }
    }

    getTreeFileObject(type: string = ''): {file: string, nodes: number} {
        if (!type) {
            throw new Error('type is empty');
        }
        if (!treeFiles[type]) {
            throw new Error('type ' + type + ' is not defined');
        }
        return treeFiles[type];
    }

    updateNodeValue(nodes: Array<INode>, indexPath: Array<number>, value: string): Array<INode> {
        return nodes.map((node, nodeIndex) => {
            if (nodeIndex === indexPath[0]) {
                indexPath.shift();
                if (indexPath.length === 0) {
                    return Object.assign({}, node, {value: value});
                }
                return Object.assign(
                    {},
                    node,
                    {
                        nodes: this.updateNodeValue(node.nodes, indexPath, value)
                    }
                );
            }
            return node;
        });
    }

    getNode(nodes: Array<INode>, indexPath: Array<number>): INode {
        let index = indexPath[0];
        indexPath.shift();
        if (indexPath.length === 0) {
            return nodes[index];
        }
        return this.getNode(nodes[index].nodes, indexPath);
    }
}