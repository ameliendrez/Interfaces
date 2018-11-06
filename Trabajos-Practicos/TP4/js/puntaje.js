class Puntaje {

    constructor(){
        this.puntaje = 0;
        this.puntajeAnterior = 0;
        this.puntajeMasAlto = 0;
        this.listaPuntajes = {}
        this.setListaPuntajes();
        this.tablaRanking = document.getElementById('puntajes');
        this.puntajeActual = document.getElementById('puntaje-actual');
        this.ultimoPuntaje = document.getElementById('ultimo-puntaje');
    }

    getPuntajeActual(){
        return this.puntaje;
    }

    sumarPuntaje(){
        this.puntaje += 5;
    }

    actualizarPuntajes(){
        this.setPuntajeMasAlto(this.puntaje);
        this.setRankingPuntaje();
        this.puntajeAnterior = this.puntaje;
        this.ultimoPuntaje.innerHTML = this.puntajeAnterior;
        this.puntaje = 0;
        this.mostrarPuntajeActual();
    }

    mostrarPuntajeActual(){
        this.puntajeActual.innerHTML = this.getPuntajeActual();
    }

    getPuntajeMasAlto(){
        return this.puntajeMasAlto;
    }

    setPuntajeMasAlto(nuevoPuntaje){
        if(nuevoPuntaje > this.puntajeMasAlto){
            this.puntajeMasAlto = nuevoPuntaje;
            this.listaPuntajes['jugador']['puntaje'] = nuevoPuntaje;
        }
    }

    getListaPuntajes(){
        return this.getListaPuntajesOrdenada();
    }

    getListaPuntajesOrdenada(){
        this.setListaPuntajes();
        var puntajesDescendentes = [];

        for (const key in this.listaPuntajes) {
            puntajesDescendentes.push(this.listaPuntajes[key]);
        }

        puntajesDescendentes.sort(function(a, b) {
            var puntajeA = parseInt(a.puntaje);
            var puntajeB = parseInt(b.puntaje); 
            if (puntajeA < puntajeB) {
                return 1;
            }
            if (puntajeA > puntajeB) {
                return -1;
            }
            return 0;
        });
        return puntajesDescendentes;  
    }



    setListaPuntajes(){
        this.listaPuntajes = {
            'jugador' : {
                'nombre' : 'JOHN DOE',
                'puntaje' : this.puntajeMasAlto
            },
            'vader': {
                'nombre' : 'DARTH VADER',
                'puntaje' : 500
            },
            'subcero': {
                'nombre' : 'SUB-CERO',
                'puntaje' : 480
            },
            'godOfWar': {
                'nombre' : 'GOD OF WAR',
                'puntaje' : 475
            },
            'altair': {
                'nombre' : 'ALTAIR',
                'puntaje' : 365
            }
        }
    }

    setRankingPuntaje(){
        var listaOrdenada = this.getListaPuntajesOrdenada();

        var ranking = '';

        for (let i = 0; i < listaOrdenada.length; i++) {            
            var orden = i+1;
            var jugador = 'j'+orden;
            var nombreJugador = listaOrdenada[i].nombre;
            var puntaje = listaOrdenada[i].puntaje + ' pts';

            if(nombreJugador === 'JOHN DOE')
                ranking += '<div class="col-md-11 jugadores jugador-principal">';
            else
                ranking += '<div class="col-md-11 jugadores">';

            ranking += '<div class="row '+jugador+' jugador">';
            ranking += '<div class="col-md-1 orden">' + orden + '.</div>';
            ranking += '<div class="col-md-6 nombre-jugador">' + nombreJugador + '</div>';
            ranking += '<div class="col-md-4 puntaje">' + puntaje + '</div>';
            ranking += '</div></div>';
        }        
        this.tablaRanking.innerHTML = ranking;
    }
}