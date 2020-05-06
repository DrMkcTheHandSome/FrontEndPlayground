
import swal, { SweetAlertResult } from 'sweetalert2'
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {
    blockUi(message: string = "Processing..."): void {
        swal.fire({
            text: message,
            showConfirmButton: false,
            icon: 'info'
        })
    }
    
    unblockUi(time = 2000): void {
        setTimeout(() => {
            swal.close();
        }, time);
    }
    onSuccessCUD(message =  "", mode = ""): void{
        swal.fire({
            title: '',
            text:  `${message} has been ${mode}d.`,
            icon: 'success',
            showConfirmButton: true,
          })
    }

    error(errormessage: string = "" , message: string = "Oops... Something went wrong!"): void {
        swal.fire({
            title: message,
            text: errormessage,
            icon: 'error',
            showConfirmButton: true,
          })
    }
}