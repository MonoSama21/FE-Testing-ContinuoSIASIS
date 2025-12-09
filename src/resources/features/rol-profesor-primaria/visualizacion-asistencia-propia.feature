@test @DailyTest @HU-VisualizacionAsistencia
Feature: Visualización de Asistencia Propia para Personal Institucional
    Como miembro del personal de la institución
    Quiero poder visualizar mis propios registros de asistencia mensuales
    Para hacer seguimiento de mi puntualidad y tener evidencia de mi cumplimiento de horarios laborales

Background:
    Given estoy en la pagina de login
    And selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"

@AccesoVisualizacion
Scenario Outline: Validar que diferentes roles del personal pueden acceder a la visualización de su asistencia
    When selecciono el rol "<rol>"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "<rol>"
    And hago click en el apartado de "Mi Asistencia"
    Then se muestra la interfaz de visualización de asistencia propia
    And se muestra el selector de mes
    And se muestra la tabla de registros de asistencia

    Examples:
      | rol                   |
      | AUXILIAR              |
      | PROFESOR_PRIMARIA     |
      | PROFESOR_SECUNDARIA   |
      | TUTOR                 |
      | OTRO                  |

@SeleccionMes
Scenario: Validar que se puede seleccionar un mes para visualizar registros
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono el mes "Noviembre" del año "2024"
    Then se actualiza la tabla con los registros del mes seleccionado
    And se muestra el nombre del mes seleccionado en el encabezado

@LimiteMesActual
Scenario: Validar que no se pueden seleccionar meses futuros
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    Then el selector de mes solo permite seleccionar hasta el mes actual
    And los meses futuros están deshabilitados o no visibles

@EstructuraTabla
Scenario: Validar que la tabla de asistencia muestra todas las columnas requeridas
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono el mes actual
    Then la tabla muestra la columna "Fecha"
    And la tabla muestra la columna "Hora de entrada programada"
    And la tabla muestra la columna "Hora de entrada real"
    And la tabla muestra la columna "Diferencia de entrada"
    And la tabla muestra la columna "Estado de entrada"
    And la tabla muestra la columna "Hora de salida programada"
    And la tabla muestra la columna "Hora de salida real"
    And la tabla muestra la columna "Diferencia de salida"
    And la tabla muestra la columna "Estado de salida"

@EstadoEntradaTemprano
Scenario: Validar el estado "Temprano" cuando se registra entrada antes de la hora programada
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes donde tengo registros con entrada temprana
    Then en la tabla se muestra al menos un registro con estado de entrada "Temprano"
    And el estado "Temprano" se muestra con código de color azul
    And la diferencia de entrada muestra el tiempo en minutos antes de la hora programada

@EstadoEntradaEnTiempo
Scenario: Validar el estado "En tiempo" cuando se registra entrada dentro del margen de tolerancia
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes donde tengo registros con entrada en tiempo
    Then en la tabla se muestra al menos un registro con estado de entrada "En tiempo"
    And el estado "En tiempo" se muestra con código de color azul o verde
    And la diferencia de entrada está dentro del margen de tolerancia

@EstadoEntradaTarde
Scenario: Validar el estado "Tarde" cuando se registra entrada fuera del margen de tolerancia
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes donde tengo registros con tardanza
    Then en la tabla se muestra al menos un registro con estado de entrada "Tarde"
    And el estado "Tarde" se muestra con código de color naranja o amarillo
    And la diferencia de entrada muestra el tiempo de retraso en minutos

@EstadoEntradaFalta
Scenario: Validar el estado "Falta" cuando no hay registro de entrada
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes donde tengo días sin registro de entrada
    Then en la tabla se muestra al menos un registro con estado de entrada "Falta"
    And el estado "Falta" se muestra con código de color rojo
    And no se muestra hora de entrada real ni diferencia para ese día

@EstadoSalidaAnticipada
Scenario: Validar el estado "Salida anticipada" cuando se registra salida antes de tiempo
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes donde tengo registros con salida anticipada
    Then en la tabla se muestra al menos un registro con estado de salida "Salida anticipada"
    And el estado "Salida anticipada" se muestra con código de color naranja
    And la diferencia de salida muestra el tiempo anticipado en minutos

@EstadoSalidaCumplido
Scenario: Validar el estado "Cumplido" cuando se registra salida a tiempo o después
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes donde tengo registros con salida cumplida
    Then en la tabla se muestra al menos un registro con estado de salida "Cumplido"
    And el estado "Cumplido" se muestra con código de color azul o verde
    And la diferencia de salida muestra tiempo cero o positivo

@EstadoSalidaSinRegistro
Scenario: Validar el estado "Sin registro" cuando no hay registro de salida
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes donde tengo días sin registro de salida
    Then en la tabla se muestra al menos un registro con estado de salida "Sin registro"
    And el estado "Sin registro" se muestra con código de color gris o rojo
    And no se muestra hora de salida real ni diferencia para ese día

@CalculoDiferencias
Scenario: Validar que se calculan correctamente las diferencias de tiempo
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes con registros variados
    Then para cada registro con entrada, la diferencia de entrada se calcula correctamente
    And para cada registro con salida, la diferencia de salida se calcula correctamente
    And las diferencias se muestran en formato legible (minutos u horas)
    And las diferencias negativas indican retraso o salida anticipada
    And las diferencias positivas indican llegada temprana o salida después de tiempo

@OrdenCronologico
Scenario: Validar que los registros se muestran en orden cronológico por fecha
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes con múltiples registros
    Then los registros se muestran ordenados por fecha del día 1 al último día del mes
    And las fechas están en formato legible y claro

@CodigosColor
Scenario: Validar que se aplican códigos de color según el tipo de estado
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes con registros variados
    Then los estados positivos (Temprano, En tiempo, Cumplido) se muestran en azul o verde
    And los estados de advertencia (Tarde, Salida anticipada) se muestran en naranja o amarillo
    And los estados críticos (Falta, Sin registro) se muestran en rojo o gris
    And los colores facilitan la identificación rápida del estado

@VisualizacionResponsive
Scenario: Validar que la interfaz es accesible desde diferentes dispositivos
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And accedo desde un dispositivo móvil
    And hago click en el apartado de "Mi Asistencia"
    Then la interfaz se adapta correctamente al tamaño de pantalla
    And todos los elementos son visibles y accesibles
    And la tabla es navegable mediante scroll horizontal si es necesario

@MesActualPorDefecto
Scenario: Validar que el mes actual se muestra por defecto al acceder
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    Then el sistema muestra automáticamente los registros del mes actual
    And el selector de mes indica el mes actual como seleccionado

@SinRegistrosMes
Scenario: Validar el comportamiento cuando no hay registros para el mes seleccionado
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes sin registros de asistencia
    Then se muestra un mensaje indicando que no hay registros para el mes seleccionado
    And la tabla está vacía o muestra un mensaje informativo

@FormatoDiferencias
Scenario: Validar que las diferencias de tiempo se muestran en formato correcto
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    And selecciono un mes con registros
    Then las diferencias menores a 60 minutos se muestran en minutos
    And las diferencias mayores o iguales a 60 minutos se muestran en horas y minutos
    And el formato es consistente en toda la tabla

@PrivacidadRegistros
Scenario: Validar que cada usuario solo puede ver sus propios registros
    When selecciono el rol "PROFESOR_PRIMARIA"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "PROFESOR_PRIMARIA"
    And hago click en el apartado de "Mi Asistencia"
    Then solo se muestran mis propios registros de asistencia
    And no se muestran registros de otros miembros del personal
    And la información mostrada corresponde únicamente a mi usuario

