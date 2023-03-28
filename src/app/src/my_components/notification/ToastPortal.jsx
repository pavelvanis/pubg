
import { useToastPortal } from "../hooks"
import { Toast } from './Toast'
import ReactDOM from 'react-dom'
import styles from './style.module.css'
import { forwardRef, useImperativeHandle, useState } from "react"

export const ToastPortal = forwardRef(
    ({ autoClose, autoCloseTime }, ref) => {

        const [toasts, setToasts] = useState([])
        const { loaded, portalId } = useToastPortal()

        const removeToast = id => {
            setToasts(toasts.filter(t => t.id !== id))
        }

        useImperativeHandle(ref, () => ({
            addToast(toast) {
                setToasts([...toasts, { ...toast}])
            },
            removeToast(id) {
                removeToast(id)
            }
        }))

        return loaded ? (ReactDOM.createPortal(
            <div className={styles.container}>
                {toasts.map(t => (
                    <Toast
                        className={t.canClose ? styles.canClose : null}
                        key={t.id}
                        mode={t.mode}
                        message={t.message}
                        onClose={t.canClose ? () => removeToast(t.id) : null}
                    />

                ))}
            </div>,

            document.getElementById(portalId),
        )
        ) : <></>

    },
)




