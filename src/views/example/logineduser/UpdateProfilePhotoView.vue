<template>
  <vue-cropper
    ref="cropper"
    class="cropper"
    :src="profilePhotoSrc"
    :ready="cropImage"
    :zoom="cropImage"
    :cropmove="cropImage"
  ></vue-cropper>
  <el-button-group>
    <el-button icon="plus" size="default" v-on:click.prevent="crop_zoom(0.2)" />
    <el-button icon="minus" size="default" @click.prevent="crop_zoom(-0.2)" />
    <el-button icon="arrow-left" size="default" @click.prevent="crop_move(-10, 0)" />
    <el-button icon="arrow-right" size="default" @click.prevent="crop_move(10, 0)" />
    <el-button icon="arrow-up" size="default" @click.prevent="crop_move(0, -10)" />
    <el-button icon="arrow-down" size="default" @click.prevent="crop_move(0, 10)" />
    <el-button class="flipX" icon="sort" size="default" @click.prevent="crop_flipX()" />
    <el-button icon="sort" size="default" @click.prevent="crop_flipY()" />
    <el-button icon="refresh-right" size="default" @click.prevent="crop_rotateDegree(90)" />
    <el-button icon="refresh-left" size="default" @click.prevent="crop_rotateDegree(-90)" />
    <el-button icon="refresh" size="default" @click.prevent="crop_reset()" />
  </el-button-group>
  <el-slider
    class="rotateDegree"
    v-model="rotateDegree"
    show-input
    :min="-180"
    :max="180"
    :marks="{ '0': '0°', '-180': '-180°', '180': '180°' }"
    @change="rotateDegree_changed(rotateDegree)"
  />
</template>
<script lang="ts">
import { IGdialogAdditionProps } from '@/typings/GDialog'
import { defineComponent, nextTick, onBeforeMount, PropType, ref, watch } from 'vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import CustomError from '@/typings/CustomError'
import { throttle } from 'lodash'

export default defineComponent({
  components: {
    VueCropper
  },
  props: {
    dialogAdditionProps: {
      type: Object as PropType<IGdialogAdditionProps>,
      required: true
    }
  },
  setup(props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cropper = ref<any>()
    const croppedImage = ref('')
    const profilePhotoSrc = ref('')
    const rotateDegree = ref(0)
    let scaleX = 1
    let scaleY = 1

    //获得裁剪后的头像
    const cropImage = () => {
      croppedImage.value = cropper.value.getCroppedCanvas().toDataURL()
    }

    //选择图片
    const selectPhoto_click = (e: Event) => {
      //获得选择的文件
      const file = (e.target as HTMLInputElement).files?.item(0)
      if (!file || !file.type.includes('image/')) {
        throw new CustomError({ message: '没有选择图片文件', data: e })
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          profilePhotoSrc.value = <string>event.target.result
          cropper.value && cropper.value.replace(event.target.result)
        }
      }
      reader.readAsDataURL(file)
    }

    //旋转度数已改变处理(大图卡,增加节流功能[lodash.throttle])
    const rotateDegree_changed = throttle(
      (n: number) => {
        cropper.value.rotateTo(n)
        nextTick(() => {
          const { width, height, left, top } = cropper.value.getCanvasData()
          cropper.value.setCropBoxData({ width, height, left, top })
          console.log('current rotate:{n},{width},{height},{left},{top}', n, width, height, left, top)
        })
      },
      1000,
      { trailing: false }
    )

    //缩放被裁剪图片
    const crop_zoom = (percent: number) => cropper.value.relativeZoom(percent)
    //移动被裁剪图片
    const crop_move = (offsetX: number, offsetY: number) => cropper.value.move(offsetX, offsetY)
    //横向翻转被裁剪图片
    const crop_flipX = () => {
      scaleX = -scaleX
      cropper.value.scaleX(scaleX)
    }
    //纵向翻转被裁剪图片
    const crop_flipY = () => {
      scaleY = -scaleY
      cropper.value.scaleY(scaleY)
    }
    //旋转指定度数被裁剪图片
    const crop_rotateDegree = (n: number) => {
      if (cropper.value) {
        let currDegree = rotateDegree.value + n
        if (currDegree > 180 || currDegree < -180) {
          currDegree = 0
        }
        rotateDegree.value = currDegree
      }
    }
    //重置被裁剪图片
    const crop_reset = () => {
      rotateDegree.value = 0
      cropper.value.reset()
    }

    //上传并保存图片
    const uploadAndSave_Click = () => {
      props.dialogAdditionProps.setCroppedImage(croppedImage.value)
      props.dialogAdditionProps.close()
    }

    ////旋转度数改变，旋转被裁剪图片
    watch(rotateDegree, (value) => rotateDegree_changed(value))

    //onBeforeMount - 获得要设置的源图片
    onBeforeMount(() => (profilePhotoSrc.value = props.dialogAdditionProps.profilePhoto))

    return {
      cropper,
      profilePhotoSrc,
      rotateDegree,
      cropImage,
      selectPhoto_click,
      rotateDegree_changed,
      crop_zoom,
      crop_move,
      crop_flipX,
      crop_flipY,
      crop_rotateDegree,
      crop_reset,
      uploadAndSave_Click
    }
  }
})
</script>
<style lang="scss" scoped>
.cropper {
  width: 100%;
  height: 400px;
  margin-bottom: 1px;
}
:deep(.flipX > .el-icon) {
  transform: rotate(90deg);
}
.rotateDegree.el-slider {
  margin-top: 10px;
  width: 551px;
}
:deep(.el-slider__runway.show-input) {
  margin-right: 130px;
}
:deep(.el-slider__marks-text:last-child) {
  width: 36.406px;
}
:deep(.el-slider__input) {
  width: 105px;
}
</style>
