<template>
  <vue-cropper
    ref="cropper"
    class="cropper"
    :src="profilePhotoSrc"
    :ready="cropImage"
    :zoom="cropImage"
    :cropmove="cropImage"
  ></vue-cropper>
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
      uploadAndSave_Click
    }
  }
})
</script>
<style lang="scss" scoped>
.cropper {
  width: 100%;
  height: 400px;
}
</style>
