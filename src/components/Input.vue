<template>
  <div id="input" class="row">
    <input 
      class="u-full-width"
      v-model="inputText"
      @keyup.enter="submitFunction"
      autofocus="true">    
    </input>
  </div>
</template>

<script>
export default {
  props: [
    'inputText',
    'submitFunction'
  ]
}
</script>