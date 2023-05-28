import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../service/cinema.service";
@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit{
  public  villes : any ;
  public cinemas: any;
  public salles : any ;
  public currentVille : any;
  public currentCinema :any;
  public currentProjection: any;
  public selectedTickets: any ;

  constructor(public cinemaService : CinemaService) {
  }
  ngOnInit(): void {
    this.cinemaService.getVilles()
      .subscribe(data =>{
        this.villes = data ;
      },error => {
        console.log(error) ;
      })
  }

  onGetCinemas(v: any) {
    this.currentVille = v ;
    this.salles = undefined ;
    this.cinemaService.getCinemas(v)
      .subscribe(data =>{
        this.cinemas=data ;
      },error => {
        console.log(error)
      }

    )

  }

  onGetSalles(c: any) {
    this.currentCinema =c ;
    this.cinemaService.getSalles(c)
      .subscribe(data=>{
        this.salles = data ;
        // @ts-ignore
        this.salles._embedded.salles.forEach( salle =>{
          this.cinemaService.getProjections(salle)
            .subscribe(data =>{
            salle.projections=data ;
          },error => {
            console.log(error);
          })
        })
      },error=>{
        console.log(error) ;
      })
  }

  onGetTicketsPlaces(p: any) {
    this.currentProjection = p ;
    this.cinemaService.getTicketsPlaces(p)
      .subscribe(data=>{
        this.currentProjection.tickets = data ;
        this.selectedTickets = [] ;
      },err=>{
        console.log(err) ;
      })

  }

  onSelectTicket(t: any) {
    if ( ! t.selected){
      t.selected =true ;
      this.selectedTickets.push(t) ;
   }
    else {
      t.selected = false ;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);

    }

  }

  getTicketClass(t: any) {
    let str = "btn ticket " ;
    if (t.reserve== true) {
      str+= "btn-danger"
    }
    else if (t.selected){
      str+="btn-warning"
    }
    else{
      str+="btn-success" ;

    }
    return str ;
  }

  onPayTickets(dataForm :any) {
    console.log(dataForm) ;
    // @ts-ignore
    let tickets = [] ;
  // @ts-ignore
    this.selectedTickets.forEach( t =>{
    // @ts-ignore
    tickets.push(t.id)
  }) ;
  // @ts-ignore
    dataForm.tickets = tickets ;
    console.log(dataForm) ;
   this.cinemaService.payerTickets(dataForm)
    .subscribe(data=>{
      alert("tickets reserves avec succes")
      this.onGetTicketsPlaces(this.currentProjection) ;
    },err=>{
      console.log(err) ;
    })

  }
}

