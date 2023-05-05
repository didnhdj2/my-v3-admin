<template>
  <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { ref, onMounted, defineProps, watchEffect } from 'vue'
import useEchart from '../hooks/useEchart'

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
    desc: 'echart的options'
  },
  width: {
    type: String,
    default: '100%',
    desc: 'echart的宽度'
  },
  height: {
    type: String,
    default: '100%',
    desc: 'echart的高度'
  }
})

const echartDivRef = ref()
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>
