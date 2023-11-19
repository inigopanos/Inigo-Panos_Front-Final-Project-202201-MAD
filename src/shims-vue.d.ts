/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-upload-multiple-image' {
  import { VueUploadMultipleImage } from 'vue-upload-multiple-image'
  export { VueUploadMultipleImage }
}

declare module 'vue-carousel';