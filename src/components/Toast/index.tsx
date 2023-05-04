import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export function ToastConfiguration(){
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
        />
    )
}