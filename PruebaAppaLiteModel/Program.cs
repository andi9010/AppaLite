using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppaLiteModel;
using System.Data.Entity.Validation;
using System.Diagnostics;

class PruebaAppaLiteModel
{
    static void Main(string[] args)
    {
        AppaLiteModelContainer context = new AppaLiteModelContainer();
        /*
        
        Marca mrc2 = new Marca
        {
            Nombre = "Nike",
            Icono = "Nike.jpg"
        };


        context.Marcas.Add(mrc2);

        //context.SaveChanges();

        Marca mrc3 = new Marca
        {
            Nombre = "Reebook",
            Icono = "Reebook.jpg"
        };
        context.Marcas.Add(mrc3);

        Articulo art2 = new Articulo
        {
            Referencia = "N12334",
            Descripcion = "skate ",
            Talla = "5",
            Marca = mrc2
           // Prestamo =
         };

        context.Articulos.Add(art2);
        //context.SaveChanges();

        Articulo art3 = new Articulo
        {
            Referencia = "R7655",
            Descripcion = "Princess 6",
            Talla = "7",
            Marca = mrc3
            // Prestamo =
        };
        context.Articulos.Add(art3);

        Local lcl1 = new Local
        {
            Nombre = "Cca 123",
            Icono = "123.jpg",
            Telefono = "3111234"

        };

        context.Locales.Add(lcl1);
        //context.SaveChanges();


        Local lcl2 = new Local
        {
            Nombre = "Cca 102",
            Icono = "102.jpg",
            Telefono = "3121235"
        };


        context.Locales.Add(lcl2);
        //context.SaveChanges();

        Empleado emp1 = new Empleado
        {
            Nombre = "Lizeth Ibarra",
            Cedula = "12778",
            Telefono = "3151236",
            Foto = "emp1.jpg",           
        };


        context.Empleados.Add(emp1);

        Empleado emp2 = new Empleado
        {
            Nombre = "Andres Slatan",
            Cedula = "45111",
            Telefono = "318555",
            Foto = "emp2.jpg",
        };


        context.Empleados.Add(emp2);
        //context.SaveChanges();

                //context.SaveChanges();

        
        Prestamo ptm1 = new Prestamo
        {
            Articulo = art2,
            Origen = lcl2,
          //  Movimientos 
        
        };

       // mvt1.Prestamo = ptm1;
        ptm1.Articulo = art2;
        context.Prestamos.Add(ptm1);


        Prestamo ptm2 = new Prestamo
         {
             Articulo = art2,
             Origen = lcl2,
             

         };

      //   mvt1.Prestamo = ptm1;
        ptm2.Articulo = art2;
        context.Prestamos.Add(ptm2);
        //context.SaveChanges();


        Prestamo ptm3 = new Prestamo
        {
            Articulo = art3,
            Origen = lcl1,
            //  Movimientos 

        };

        Movimiento mvt1 = new Movimiento
        {
            Estado = "Prestado",
            Fecha = new DateTime(2015, 8, 11, 9, 30, 0),
            Destino = lcl1,
            Prestamo = ptm1            
        };

        emp2.Movimiento.Add(mvt1);

        Movimiento mvt2 = new Movimiento
        {
            Estado = "Separado",
            Fecha = new DateTime(2015, 8, 12, 12, 0, 0),  
            Destino = lcl2,
            Prestamo = ptm2            
        };

        emp1.Movimiento.Add(mvt2);

        Movimiento mvt3 = new Movimiento
        {
            Estado = "Prestado",
            Fecha = new DateTime(2015, 8, 13, 4, 0, 0 ),
            Destino = lcl1,
            Prestamo = ptm1           
        };

        emp1.Movimiento.Add(mvt3);


        context.Movimientos.Add(mvt1);


        // mvt1.Prestamo = ptm1;
        ptm1.Articulo = art2;
        context.Prestamos.Add(ptm1);
        ptm1.Movimiento.Add(mvt3);
        ptm1.Movimiento.Add(mvt2);

       
       

        try
        {
            // doing here my logic
            context.SaveChanges();
        }
        catch (DbEntityValidationException dbEx)
        {
            
            foreach (var validationErrors in dbEx.EntityValidationErrors)
            {
                
                foreach (var validationError in validationErrors.ValidationErrors)
                {
                    Console.WriteLine("Property: {0} Error: {1}", validationError.
      PropertyName, validationError.ErrorMessage);
                }
            }
        }

        //context.SaveChanges();


        */


        /*



        foreach (Prestamo reporte in context.Prestamos.AsEnumerable())
        {


            if (reporte.Movimiento.Count() != 0)
            {
                var s = (from t in reporte.Movimiento
                             // where t.Estado.Contains("restad")
                         orderby t.Fecha descending

                         select t).First();
                if (s.Estado.Contains("restad"))
                {


                    Console.WriteLine("{0}{1}\t{2} {3}", reporte.Articulo.Descripcion, reporte.Origen.Nombre, s.Estado, s.Fecha);
                }

            }
            */
        //prestamo por local 

        /* foreach (Prestamo rep in context.Prestamos.AsEnumerable())
         {


             if (rep.Movimiento.Count() != 0)
             {
                 var s = (from t in rep.Movimiento

                          orderby t.Fecha descending 

                          select t).First();


                 if (s.Estado.Contains("restad"))
                 {

                 //Console.WriteLine("Local origen " + " fecha " +  "Estado " +  + "Destino " + " Nombre Empleado");
                 Console.WriteLine("{0}{1,6}{2} {3} {4 }{5}", rep.Origen.Nombre , s.Fecha , rep.Articulo.Descripcion ,  s.Estado ,   s.Empleado.Nombre ,  s.Destino.Nombre );
                 }

             }



         }*/


        foreach (Prestamo rep in context.Prestamos.AsEnumerable())
        {
            if (rep.Movimiento.Count() != 0)
            {
                var s = from t in rep.Movimiento
                        orderby t.Fecha descending
                        select t;



                
               





            }
        }

      }
    }


