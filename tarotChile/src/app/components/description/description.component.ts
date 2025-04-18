import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { CardService } from '../../services/card.service';
import { ParticlesComponent } from '../../shared/particles/particles.component';

@Component({
  selector: 'app-description',
  imports: [CommonModule, ParticlesComponent],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('1s ease-in', style({ opacity: 1 }))]),
    ]),

  ],
})
export class DescriptionComponent {
   
  selectedCards: any[] = [];
  descriptionsText: string = '';
  countryCode: string = '';
  phone: string = '';
  nombreCliente: string = '';
  isPaid: boolean = false;
  showPopupFlag: boolean = false;
  private encryptionKey = 'U0qQ0TGufDDJqCNvQS0b795q8EZPAp9E';

  constructor(private cardService: CardService, private router: Router, private route: ActivatedRoute, private http: HttpClient,) { }

  ngOnInit(): void {
 /*    this.route.queryParams.subscribe((params: any) => {
      if (params['collection_status'] === 'approved') {
        this.isPaid = true;
        const encryptedData = localStorage.getItem('paymentData');
        if (encryptedData) {
          try {
            const bytes = CryptoJS.AES.decrypt(
              encryptedData,
              this.encryptionKey
            );
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            this.selectedCards = decryptedData.selectedCards || [];
          } catch (e) {
            console.error('Error al desencriptar los datos:', e);
          }
        }
      }
    }) */

    this.selectedCards = this.cardService.getSelectedCards();
    this.descriptionsText = this.selectedCards
      .map((card) => {
        if (card.descriptions && card.descriptions.length > 0) {
          const randomIndex = Math.floor(Math.random() * card.descriptions.length);
          return card.descriptions[randomIndex].trim();
        }
        return null;
      })
      .filter((description) => description)
      .map((description) => (description.endsWith(".") ? description : description + "."))
      .join("  "); // Concatenar descripciones
  /*   setTimeout(() => {
      if (!this.isPaid) {
        this.showSweetAlert();
      }
    }, 500); */
  }
/*   showSweetAlert(): void {
    Swal.fire({
      title: 'Para ver el contenido',
      text: 'Realiza una pequeña contribución, para ver lo que las cartas y los astros tienen para ti.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Realizar Pago',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.makePayment();
      }
    });
  } */

  showPopup(): void {
    this.router.navigate(['/informacion']);
  }

  closePopup(): void {
    this.showPopupFlag = false;
  }
 /*  makePayment(): void {
    // Guardar los datos en el almacenamiento local
    const paymentData = {
      descriptionsText: this.selectedCards,
      selectedCards: this.selectedCards,
    };
    console.log('Payment Data:', paymentData);
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(paymentData),
      this.encryptionKey
    ).toString();
    localStorage.setItem('paymentData', encryptedData);

    this.http
      .post<{ id: string }>('http://localhost:3010/create-order', {})
      .subscribe((response) => {
        const paymentUrl = `https://www.mercadopago.com.co/checkout/v1/redirect?preference-id=${response.id}`;
        window.location.href = paymentUrl;
      });
  } */










/*   selectedCards: any[] = [];
  descriptionsText: string = '';
  countryCode: string = '';
  phone: string = '';
  nombreCliente: string = '';
  isPaid: boolean = false;
  showPopupFlag: boolean = false;
  alertShown: boolean = false;
  isLoading: boolean = false;
  paymentAttempted: boolean = false;
  private encryptionKey = 'U0qQ0TGufDDJqCNvQS0b795q8EZPAp9E';
  token = 'J8eSuyU4zEDbHOpcPk4I7o7k53';
  constructor(private cardService: CardService, private router: Router, private route: ActivatedRoute, private http: HttpClient,) { } */


   /* 
  ngOnInit(): void {
    














 const encryptedData = localStorage.getItem('paymentData');

    this.route.queryParams.subscribe((params) => {
      const status = params['status'];
      const token = params['token'];

      if (status === 'COMPLETED' && token) {
        try {
          const decodedToken = jwtDecode(token) as { status: string };
          if (decodedToken.status === 'approved') {
            this.isPaid = true;
            this.paymentAttempted = true;
            if (encryptedData) {
              try {
                const bytes = CryptoJS.AES.decrypt(
                  encryptedData,
                  this.encryptionKey
                );
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                console.log('Decrypted Data:', decryptedData);
                this.selectedCards = decryptedData.selectedCards || [];
              } catch (e) {
                console.error('Error al desencriptar los datos:', e);
              }
            }
          }
        } catch (e) {
          console.error('Error al decodificar el token:', e);
        }
      } else if (status === 'NOT_COMPLETED' && token) {
        try {
          const decodedToken = jwtDecode(token) as { status: string };
          if (decodedToken.status === 'not_approved') {
            this.isPaid = false;
            this.paymentAttempted = true;  // Marca que ya se intentó el pago
            Swal.fire({
              title: 'Tu pago fue rechazado por el provedor',
              text: 'Vuelve a intentarlo nuevamente o contacta a tu banco para obtener más información.',
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Realizar Pago',
              cancelButtonText: 'Cancelar',
            }).then((result) => {
              if (result.isConfirmed) {
                this.makePayment();
              }
            });
          }
        } catch (e) {
          console.error('Error al decodificar el token:', e);
        }
      }
    });

    this.selectedCards = this.cardService.getSelectedCards();

    this.descriptionsText = this.selectedCards
      .map((card) => {
        if (card.descriptions && card.descriptions.length > 0) {
          const randomIndex = Math.floor(Math.random() * card.descriptions.length);
          return card.descriptions[randomIndex].trim();
        }
        return null;
      })
      .filter((description) => description)
      .map((description) => (description.endsWith(".") ? description : description + "."))
      .join("  "); // Concatenar descripciones
   /*  setTimeout(() => {
      if (this.isPaid === false && !this.paymentAttempted) {
        this.showSweetAlert();
      }
    }, 500); 
  }
  showSweetAlert(): void {
    Swal.fire({
      title: 'Para ver el contenido',
      text: 'Realiza una pequeña contribución, para ver lo que las cartas y los astros tienen para ti.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Realizar Pago',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.makePayment();
        this.isLoading = true;
      }
    });
  }

  showPopup(): void {
    this.router.navigate(['/informacion']);
  }

  closePopup(): void {
    this.showPopupFlag = false;
  }
  makePayment(): void {
    // Guardar los datos en el almacenamiento local
    const paymentData = {
      descriptionsText: this.selectedCards,
      selectedCards: this.selectedCards,
    };
    console.log('Payment Data:', paymentData);
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(paymentData),
      this.encryptionKey
    ).toString();
    localStorage.setItem('paymentData', encryptedData);

 /*    // Realizar la solicitud al backend para crear la orden de pago
    this.http.post<{ id: string, links: { rel: string, href: string }[] }>('https://api.cartastarotbolivia.com/create-order', {})
      .subscribe((response) => {
        const approvalUrl = response.links.find(link => link.rel === "approve")?.href;
        if (approvalUrl) {
          window.location.href = approvalUrl;
        } else {
          console.error('Approval URL not found');
        }
      }, (error) => {
        console.error('Error creating order:', error);
      }); 
  }

/*   capturePayment(token: string): void {
    this.http.get(`https://api.cartastarotbolivia.com/capture-order?token=${token}`)
      .subscribe((response) => {
        console.log('Payment captured successfully:', response);
        this.router.navigate(['/payment-success']);
      }, (error) => {
        console.error('Error capturing payment:', error);
        this.router.navigate(['/payment-failure']);
      });
  } */ 
  }

