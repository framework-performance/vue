import Vue = require('vue');
import {Component} from 'vue-property-decorator';
import {Node} from '../node';
@Component({
    props: ['nodes'],
    name: 'tree',
    template: `
        <ul>
            <li v-for="node in nodes">
                <node v-bind:node="node.value"></node>
                <div v-if="node.nodes.length > 0">
                 TODO Recursiv
                    <!--<tree v-bind:nodes="tree.nodes"></tree>-->
                </div>
            </li>
        </ul>
    `,
    components: {
        Node
    }
})
export class Tree extends Vue {
}

