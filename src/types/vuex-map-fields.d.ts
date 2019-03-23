declare module 'vuex-map-fields' {
    import _Vue, { WatchOptions } from "vue";

    // augment typings of Vue.js

    export function getField(): any;

    export function updateField(): any;

    export function createHelpers(fields: any): any;

    export function mapMultiRowFields(fields: any): any;
}