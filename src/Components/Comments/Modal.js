import React from 'react'
import ReactDom from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'


export default function Modal({ open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
    <div className='comment-modal-close'>
      <div className=' OVERLAY_STYLES' />
      <div className='MODAL_STYLES'>
        <AiOutlineClose onClick={onClose}/>
        {children}
      </div>
    </div>,
    document.getElementById('root')
  )
}