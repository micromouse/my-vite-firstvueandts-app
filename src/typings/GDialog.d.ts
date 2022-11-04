/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from 'vue'

//对话框选项接口
export interface IGDialogCreateOptions {
  id?: string
  title: string
  width?: number
  footer?: {
    showFooter?: boolean
    showCancel?: boolean
    //Ok按钮单击事件处理:dialogRef.handleOk()
    showOk?: boolean
    buttons?: Component
  }
  additions?: {
    onConfirmClose?: () => boolean
    [propertyName: string]: any
  }
}

//全局对话框显示接口
export interface IGDialogShow {
  show: (component: Component, options: IGDialogCreateOptions) => void
}

//对话框附加属性接口
export interface IGdialogAdditionProps {
  close: () => void
  [propertyName: string]: any
}
