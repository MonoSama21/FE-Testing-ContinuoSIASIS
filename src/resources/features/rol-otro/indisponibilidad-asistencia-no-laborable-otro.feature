@WeekendTest
Feature: Indisponibilidad del rol Otro para registrar asistencia en día no laborable
    Como usuario con rol de Directivo
    Quiero que el rol de Otro no pueda registrar su asistencia un día no laborable
    Para que no exista confusión con registros de asistencia

Background:
    Given estoy en la pagina de login 
    And selecciono el rol "OTRO"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "OTRO"

@Escenario10
Scenario: Validar que no se puede registrar la asistencia del rol Otro un día no laborable
    When estoy en un día no laborable 
    Then aparece un modal indicando que no se puede registrar la asistencia
    And aparece un texto que indica el dia no laboral en el que estamos
