// Creado por Daniel Alejandro Martinez para Residencia profesional 11/05/2023

// Se importa en el core.module.ts como DatosLoginService

import { Injectable } from '@angular/core';
// Se importa BehaviorSubject ya que permite compartir informacion ya emitida 
import { BehaviorSubject } from 'rxjs';
import { UserLogged } from 'src/models/UserLogged';

@Injectable({
    providedIn: 'root'
})
export class DatosLoginService {
    // Crear observable default de tipo User
     observablePrivado : BehaviorSubject<UserLogged> = 
        new BehaviorSubject<UserLogged>({
            role: 'none',
            name: 'none',
            email: 'none@example.com'
        });
    
    //Obtener el observable
    get observable(){
        return this.observablePrivado.asObservable();
    }

    // Asignar datos al observable
    set datosObservable(data: UserLogged){
        this.observablePrivado.next(data);
    }
}






















// En Angular, @Injectable es un decorador que se utiliza para permitir la inyección de dependencias en una clase. Este decorador se utiliza en conjunción con el sistema de inyección de dependencias de Angular para proporcionar instancias de clases a otras clases que las necesiten.

// La opción providedIn especifica el ámbito o alcance en el que se proporcionará una instancia de la clase. Cuando se establece en 'root', se crea una única instancia de la clase para toda la aplicación y se la proporciona a cualquier clase que la solicite.

// En resumen, @Injectable({ providedIn: 'root' }) indica que la clase debe ser tratada como un servicio y se proporcionará una única instancia de la clase para toda la aplicación. Esto significa que no es necesario importar manualmente el servicio en el módulo o componente que lo use, ya que Angular lo manejará automáticamente.
