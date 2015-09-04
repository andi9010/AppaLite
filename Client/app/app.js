(function () {
    "use strict";
    var AppaLite = angular.module('AppaLite', ['ui.router', 'ngMaterial','ngTouch']);

    AppaLite.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/registroPrestamo');

        $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('registroPrestamo', {
                url: '/registroPrestamo',
                templateUrl: 'app/views/registroPrestamo.html'
            })

            // nested list with custom controller
            .state('home.list', {
                url: '/list',
                templateUrl: 'partial-home-list.html',
                controller: function ($scope) {
                    $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
                }
            })

            // nested list with just some random string data
            .state('home.paragraph', {
                url: '/paragraph',
                templateUrl: 'partial-home-list2.html',
                controller: function ($scope) {
                    $scope.dogsa = ['Berneasdasdse', 'Huskasdasdy', 'Goldeasdasdasdndoodle'];
                }
            })





            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
             .state('about', {
                 url: '/about',
                 views: {

                     // the main template will be placed here (relatively named)
                     '': { templateUrl: 'partial-about.html' },

                     // the child views will be defined here (absolutely named)
                     'columnOne@about': {
                         template: 'Look fssdfsdfsdfI am a column!'
                     },

                     // for column two, we'll define a separate controller 
                     'columnTwo@about': {
                         templateUrl: 'table-data.html',
                         //controller: 'scotchController'
                     }
                 }

             });



    });

    AppaLite.config(function ($mdThemingProvider) {
        $mdThemingProvider.definePalette('amazingPaletteName', {
            '50': 'ffebee',
            '100': 'ffcdd2',
            '200': 'ef9a9a',
            '300': 'FF7335',
            '400': 'ef5350',
            '500': '1BBE9E',
            '600': '148d75',
            '700': 'd32f2f',
            '800': 'FF7335',
            '900': 'b71c1c',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',

            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
            // on this palette should be dark or light
            'contrastDarkColors': ['900', '100', //hues which contrast should be 'dark' by default
             '200', '300', '400', '900'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.theme('default')
          .primaryPalette('amazingPaletteName')
    });

    AppaLite.controller('BasicDemoCtrl', function DemoCtrl($mdDialog) {
        var mv = this;
        mv.nuevoPrestamo = {}
        mv.mostrar = true;
        this.localSeleccionado;
        this.personaSeleccionado;
        this.marcaSeleccionado;

        var originatorEv;
        this.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        this.ponerLocal = function (local, icono) {
            mv.localSeleccionado = angular.copy(local, {});
            originatorEv = null;
        };
        this.ponerPersona = function (persona, foto) {
            mv.personaSeleccionado = angular.copy(persona, {});
            originatorEv = null;
        };
        this.ponerMarca = function (marca) {
            mv.nuevoPrestamo.marca = angular.copy(marca, {});;
            originatorEv = null;
        };
        this.limpiarCampos = function (form) {
            form.$setPristine();
            form.$setUntouched();
                                 
            mv.personaSeleccionado = {};
            mv.localSeleccionado = {};
            mv.nuevoPrestamo = {};
        };

        this.eliminarItem = function (indice) {
            mv.listaRegistros.splice(indice, 1);
        };
        this.registrarItem = function () {
            mv.nuevoPrestamo.local = mv.localSeleccionado;
            mv.nuevoPrestamo.persona = mv.personaSeleccionado;

            var arregloTalla = [];
            var cadenaTalla = mv.nuevoPrestamo.talla;
            arregloTalla = cadenaTalla.split(",");

            for (var i = 0; i < arregloTalla.length;i++){
            mv.listaRegistros.unshift({               
                fecha: mv.obtenerFecha(),
                referencia: mv.nuevoPrestamo.referencia,
                descripcion: mv.nuevoPrestamo.descripcion,
                talla: arregloTalla[i],
                destino: mv.nuevoPrestamo.local.nombre,
                foto: mv.nuevoPrestamo.persona.foto
            });
            }

        };
        this.cancelarPedido = function () {
            mv.listaRegistros.length = 0;
        };
        mv.obtenerFecha = function () {
            var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
            var dias = new Array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado");
            var f = new Date();

            var hora = f.getHours();
            var minuto = f.getMinutes();
            var meridiano = " am";

            if (hora >= 12) {
                meridiano = " pm";
                hora -= 12;
            }
            if (hora == 0) {
                hora = 12;
            }

            if (hora < 10) { hora = "0" + hora }
            if (minuto < 10) { minuto = "0" + minuto }

            var fecha = dias[f.getDay()] + " " + f.getDate() + " de " + meses[f.getMonth()] + ", " + hora + ":" + minuto + meridiano;
            return fecha;
        };

        this.onSwipeRight = function (ev) {
            mv.eliminarItem(ev);
        };
        this.showConfirm = function (ev) {
            
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Deseas eliminar todos los pedidos?')
                  .content('Si aceptas todos los pedidos se borraran.')                 
                  .cancel('Cancelar')
                  .ok('Aceptar')
                  .targetEvent(ev);
            $mdDialog.show(confirm).then(function () {
                mv.cancelarPedido();
            }, function () {
                
            });
        
        };

        this.showAdvanced = function (ev) {
           
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'di.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
            .then(function (answer) {
                var caden="";
                
                for (var i = 0; i < answer.length; i++) {
                    caden = caden + answer[i].cadena + ",";
                }
                caden=caden.substr(0, caden.length - 1);
                mv.nuevoPrestamo.talla = caden;
            }, function() {
                
            });
        };
    
        function DialogController($scope, $mdDialog) {
            $scope.banMostrar;
            $scope.banTip;
            $scope.mostrarChips;
            $scope.listTalla = [];

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.answer = function () {
                $mdDialog.hide($scope.listTalla);
            };

            $scope.eliminarTalla = function (pos) {
                $scope.listTalla.splice(pos, 1);
                if ($scope.listTalla.length < 2) {
                    $scope.banMostrar = false;
                }
                if ($scope.listTalla.length == 0) {
                    $scope.mostrarChips = false;
                }

            };

            $scope.putTalla = function (cad1) {
                var aux = {
                    id: $scope.listTalla.length+1,
                    cadena: cad1
                }
                $scope.listTalla.push(aux);
                if ($scope.listTalla.length > 1) {
                    $scope.banMostrar = true;
                }
            };
            $scope.putTallaNumerica = function (cad2) {
                if ($scope.banTip == true) {
                    cad2 = "US " + cad2;                    
                }
                else {
                    cad2 = "EUR " + cad2;
                }
                var aux = {
                    id: $scope.listTalla.length + 1,
                    cadena: cad2
                }
                $scope.listTalla.push(aux);

                if ($scope.listTalla.length > 1) {
                    $scope.banMostrar = true;
                }
                $scope.mostrarChips = true;
            };

            $scope.borrarTodo = function () {
                $scope.listTalla.length = 0;
                $scope.mostrarChips = false;
                $scope.banMostrar = false;
            };

        };
   

        mv.listaLocales = [{
            icono: 'recursos/person.svg',
            nombre: "CC PONTEVEDRA"
        },
        {
            icono: "recursos/person.svg",
            nombre: "CC ANDES L-102"
        },
        {
            icono: "recursos/person.svg",
            nombre: "CC ANDES L-123"
        },
        {
            icono: "recursos/delete.svg",
            nombre: "CC ANDES L-124"
        },
        {
            icono: "recursos/person.svg",
            nombre: "CC ANDES L-126"
        },
        {
            icono: "recursos/person.svg",
            nombre: "UNCENTRO 2-20"
        },
        {
            icono: "recursos/person.svg",
            nombre: "CC LA 16"
        }];

        mv.listaPersonas = [{
            foto: "recursos/person.svg",
            nombre: "Homero Simpson"
        },
        {
            foto: "recursos/person.svg",
            nombre: "Margge Simpson"
        },
        {
            foto: "recursos/person.svg",
            nombre: "Appu Nasahasasu"
        }];

        mv.listaMarcas = [{
            logo: "recursos/shoe.svg",
            nombre: "Adidas"
        },
        {
            logo: "recursos/brand.svg",
            nombre: "Puma"
        },
        {
            logo: "recursos/delete.svg",
            nombre: "Merrel"
        }];

        mv.listaRegistros = [{

            fecha: "martes 11 de agosto, 4:00 pm ",
            referencia: "1235721",
            descripcion: "algo loren ipsum",
            talla: "us 7",
            destino: "taberna de mou"
        },
        {
            fecha: "martes 11 de agosto, 4:00 pm ",
            referencia: "66666666",
            descripcion: "algo distinoasd ipsum",
            talla: "us 91",
            destino: "casa de apu"
        },
        {
            fecha: "martes 11 de agosto, 4:00 pm ",
            referencia: "66666666",
            descripcion: "algo distinoasd ipsum",
            talla: "us 91",
            destino: "casa de apu"
        },
        {
            fecha: "martes 11 de agosto, 4:00 pm ",
            referencia: "66666666",
            descripcion: "algo distinoasd ipsum",
            talla: "us 91",
            destino: "casa de apu"
        }];

    });
}());