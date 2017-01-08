import store from './store';
import Vue = require('vue')
import {Component, watch} from 'vue-property-decorator';
import {Tree} from './components/tree';

@Component({
    template: `
        <div>
            <h1>vue Perfromance</h1>
            <tree v-bind:nodes="tree.nodes"></tree>
        </div>
    `,
    components: {
        Tree
    }
})
export class App extends Vue {
    nodes: any;
    tree: any;
    $select: Function; //TODO Extend Vue definition

    mounted() {
        store.store.dispatch(store.actions.load());
    }

    data() {
        return {
            tree: this.$select('tree')
        }
    }

    @watch('tree.nodes')
    onTreeChanged(val: string, oldVal: string) {
        console.log('change A')
    }
}

