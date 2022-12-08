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
    <el-button class="flipX" icon="sort" size="default" />
    <el-button icon="sort" size="default" />
    <el-button icon="refresh-right" size="default" />
    <el-button icon="refresh-left" size="default" />
    <el-button icon="refresh" size="default" @click.prevent="crop_reset()" />
  </el-button-group>
</template>
<script lang="ts">
import { IGdialogAdditionProps } from '@/typings/GDialog'
import { defineComponent, onBeforeMount, PropType, ref } from 'vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import CustomError from '@/typings/CustomError'

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

    //缩放被裁剪图片
    const crop_zoom = (percent: number) => cropper.value.relativeZoom(percent)
    //移动被裁剪图片
    const crop_move = (offsetX: number, offsetY: number) => cropper.value.move(offsetX, offsetY)
    //重置被裁剪图片
    const crop_reset = () => cropper.value.reset()

    //上传并保存图片
    const uploadAndSave_Click = () => {
      props.dialogAdditionProps.setCroppedImage(croppedImage.value)
      props.dialogAdditionProps.close()
    }

    //onBeforeMount - 获得要设置的源图片
    onBeforeMount(() => (profilePhotoSrc.value = props.dialogAdditionProps.profilePhoto))

    return {
      cropper,
      profilePhotoSrc,
      cropImage,
      selectPhoto_click,
      crop_zoom,
      crop_move,
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
</style>