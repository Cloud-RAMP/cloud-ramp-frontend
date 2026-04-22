import Swal from "sweetalert2"

export function fireSuccessAlert(text: string) {
      Swal.fire({
        toast: true,
        icon: 'success',
        title: text,
        position: 'bottom-right',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
        closeButtonHtml: `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          >
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
          `,
        color: '#fff',
        background: "rgba(0, 150, 0, 1)"
      });
}

export function fireErrorAlert(text: string) {
  Swal.fire({
    toast: true,
    icon: 'error',
    title: text,
    position: 'bottom-right',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    showCloseButton: true,
    background: '#ed3737',
    color: '#fff',
  })
}