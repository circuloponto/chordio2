import React, { Dispatch, SetStateAction } from 'react'
import styles from '../styles/Modal.module.scss'
import { useRouter } from 'next/navigation'

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
  setOverlay: Dispatch<SetStateAction<boolean>>;
};

const Modal = ({ setModal, setOverlay }: Props) => {
  const router = useRouter()
  const goToLogin = () => {
    router.push('/login')
  }
  const xBtn = () => {
    setModal(false)
    setOverlay(false)
  }
  return (
    <div className={styles.modal}>
      <p className={styles.Label}>You need to go to account - Login to use the save functionality </p>
      <button className={styles.loginBtn} onClick={goToLogin}>Go to Login</button>
      <button onClick={xBtn} className={styles.btn}>X</button>
    </div>
  )
}

export default Modal
