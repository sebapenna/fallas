from experta import *
from time import sleep
from enum import Enum
from random import choice


class Precio(Enum):
    "Precio buscado."

    CA = "caro"
    EC = "economico"
    BA = "barato"


class Rigidez(Enum):
    "Rigidez buscada."

    RIB = "baja"
    RIM = "media"
    RIA = "alta"


class Duracion(Enum):
    "Duracion buscada."

    DA = "Mas de 10 anos"
    DM = "Entre 5 y 10 anos"
    DB = "Menos de 5 anos"


class Resistencia(Enum):
    "Resistencia buscada."

    REB = "baja"
    REM = "media"
    REA = "alta"


class Movimiento(Enum):
    "Cantidad de movimiento transferido buscado."

    NT = "No transfiere"
    TP = "Transfiere poco"
    TM = "Transfiere mucho"


class TipoDeColchon(Enum):
    "Tipo de colchon recomendado."

    EM = "Espuma media densidad"
    EA = "Espuma alta densidad"
    RB = "Resortes biconicos"
    RI = "Resortes individuales"


class RequerimientosClientes(Fact): pass


# Inteligencia artifial que calcula
# el colchon ideal para determinado cliente basado en la probabilidad
# de que ese cliente sea feliz.

class SelectorColchones(KnowledgeEngine):

    def __init__(self):
        super().__init__()
        self.colchon_recomendado = None

    @Rule(
        RequerimientosClientes(
            precio=Precio.BA,
            rigidez=Rigidez.RIM,
            duracion=Duracion.DB,
            resistencia=Resistencia.REB,
            movimiento=Movimiento.TM
        )
    )
    def r1(self): self.colchon_recomendado = TipoDeColchon.EM

    @Rule(
        RequerimientosClientes(
            precio=Precio.EC,
            rigidez=Rigidez.RIA,
            duracion=Duracion.DA,
            resistencia=Resistencia.REB,
            movimiento=Movimiento.TM
        )
    )
    def r2(self): self.colchon_recomendado = TipoDeColchon.EA

    @Rule(
        RequerimientosClientes(
            precio=Precio.EC,
            rigidez=Rigidez.RIB,
            duracion=Duracion.DM,
            resistencia=Resistencia.REM,
            movimiento=Movimiento.TP
        )
    )
    def r3(self): self.colchon_recomendado = TipoDeColchon.RB

    @Rule(
        RequerimientosClientes(
            precio=Precio.CA,
            rigidez=Rigidez.RIB,
            duracion=Duracion.DA,
            resistencia=Resistencia.REA,
            movimiento=Movimiento.NT
        )
    )
    def r4(self): self.colchon_recomendado = TipoDeColchon.RI


