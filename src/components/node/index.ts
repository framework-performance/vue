import Vue = require('vue')
import {Component} from 'vue-property-decorator';
@Component({
    props: ['node'],
    template: `
        <div>{{ node }}</div>
            
    `
})
export class Node extends Vue {
}

