import Vue = require('vue')
import {createStore, applyMiddleware} from 'redux'
import 'rxjs';
import {ROOT_REDUCER} from '../reducers'
import {TreeEpic} from "../epics/tree.epic";
import {createEpicMiddleware, combineEpics} from "redux-observable";

import * as Revue from 'revue';
import actions from '../actions/tree.action';

const treeEpic = new TreeEpic(),
    rootEpic = createEpicMiddleware(
        combineEpics(
            treeEpic.fetchTree,
            // treeEpic.setSelectedNode,
            // treeEpic.updateNode
        )
    ),
    reduxStore = createStore(
        ROOT_REDUCER,
        //process.env.NODE_ENV !== 'production' &&
        window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'](),
        applyMiddleware(rootEpic)
    );
export default new Revue(Vue, reduxStore, actions)

