import { toast, Id } from 'react-toastify'

export const useToast = (): any => {
  const showInfoToast = (message: string | any): void => {
    toast.info(message)
  }
  const showErrorToast = (message: string | any): Id => toast.error(message)
  const showSuccessToast = (message: string | any): Id => toast.success(message)
  const showWarningToast = (message: string | any): Id => toast.warning(message)
  const showLoadingToast = (message: string | any): Id => toast.loading(message)
  const dismissToast = (): void => toast.dismiss()

  return {
    showInfoToast,
    showErrorToast,
    showSuccessToast,
    showWarningToast,
    showLoadingToast,
    dismissToast
  }
}

export default useToast
