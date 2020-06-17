import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  titulo: string;

  constructor(private router: Router,
    private title: Title,
    private meta: Meta) {
    this.getDataRoute().subscribe(data => {
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo)

      //definimos el metatag
      const metatag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      //colocamos el metatag en el html
      this.meta.updateTag(metatag)
    })
  }

  ngOnInit(): void {
  }

  getDataRoute(): Observable<any> {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),//obtenemos esa clase parque ahi viene la data pasada por url
      filter((event: ActivationEnd) => event.snapshot.data.titulo !== undefined),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }

}
