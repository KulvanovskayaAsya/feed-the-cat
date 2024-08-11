import { FC } from 'react'
import { Modal, ModalProps } from 'antd'
import { PixelBorder } from '@/components'

interface PixelModalProps extends ModalProps {
  open: boolean
  onClose?: () => void
}

export const PixelModal: FC<PixelModalProps> = ({
  open,
  onClose,
  width = '70%',
  children,
}) => {
  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      onCancel={onClose}
      width={width}>
      <PixelBorder />
      {children}
    </Modal>
  )
}
