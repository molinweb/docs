<template>
 <div>
   <el-input type="text" v-model="value"/>
  <p>{{value}}</p>
 </div>
</template>

<script>
  export default {
    name: 'MyComponent' ,
    data () {
      return {
        value: ''
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
