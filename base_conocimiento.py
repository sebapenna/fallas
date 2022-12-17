from datos import *


class Resultado:

    def __init__(self, enum_valor):
        self.valor = enum_valor.value


class Caracteristica:

    def __init__(self, enum_nombre, enum_valor):
        self.nombre = enum_nombre.value
        self.valor = enum_valor.value


class Regla:

    def __init__(
            self,
            caracteristicas,
            resultado
    ):
        self.caracteristicas = caracteristicas
        self.resultado = resultado

    def obtener_valor_caracteristica(self, nombre_caracteristica):
        return next(c.valor for c in self.caracteristicas if c.nombre == nombre_caracteristica)

    def obtener_valor_resultado(self):
        return self.resultado.valor


class BaseDeConocimientos:

    def __init__(self):
        r1 = Regla(
            [
                Caracteristica(NombreCaracteristicas.PRECIO, Precio.BA),
                Caracteristica(NombreCaracteristicas.RIGIDEZ, Rigidez.RIM),
                Caracteristica(NombreCaracteristicas.DURACION, Duracion.DB),
                Caracteristica(NombreCaracteristicas.RESISTENCIA, Resistencia.REB),
                Caracteristica(NombreCaracteristicas.MOVIMIENTO, Movimiento.TM),
            ],
            Resultado(TipoDeColchon.EM)
        )
        r2 = Regla(
            [
                Caracteristica(NombreCaracteristicas.PRECIO, Precio.EC),
                Caracteristica(NombreCaracteristicas.RIGIDEZ, Rigidez.RIA),
                Caracteristica(NombreCaracteristicas.DURACION, Duracion.DA),
                Caracteristica(NombreCaracteristicas.RESISTENCIA, Resistencia.REB),
                Caracteristica(NombreCaracteristicas.MOVIMIENTO, Movimiento.TM),
            ],
            Resultado(TipoDeColchon.EA)
        )
        r3 = Regla(
            [
                Caracteristica(NombreCaracteristicas.PRECIO, Precio.EC),
                Caracteristica(NombreCaracteristicas.RIGIDEZ, Rigidez.RIB),
                Caracteristica(NombreCaracteristicas.DURACION, Duracion.DM),
                Caracteristica(NombreCaracteristicas.RESISTENCIA, Resistencia.REM),
                Caracteristica(NombreCaracteristicas.MOVIMIENTO, Movimiento.TP),
            ],
            Resultado(TipoDeColchon.RB)
        )
        r4 = Regla(
            [
                Caracteristica(NombreCaracteristicas.PRECIO, Precio.CA),
                Caracteristica(NombreCaracteristicas.RIGIDEZ, Rigidez.RIB),
                Caracteristica(NombreCaracteristicas.DURACION, Duracion.DA),
                Caracteristica(NombreCaracteristicas.RESISTENCIA, Resistencia.REA),
                Caracteristica(NombreCaracteristicas.MOVIMIENTO, Movimiento.NT),
            ],
            Resultado(TipoDeColchon.RI)
        )
        self.reglas = [r1, r2, r3, r4]
        self.caracteristicas = [x.value for x in NombreCaracteristicas]
        self.resultados = [x.value for x in TipoDeColchon]

