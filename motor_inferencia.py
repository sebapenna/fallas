from base_conocimiento import *
import six


class MotorInferencia:
    # Motor de inferencia con encadenamiento hacia adelante

    def __init__(self):
        self.conocimiento = BaseDeConocimientos()

    def calcular(self, datos_usuario):
        certeza_reglas = {}

        # Inicializar certezas
        for res_conocimiento in self.conocimiento.resultados:
            certeza_reglas[res_conocimiento] = []

        for regla in self.conocimiento.reglas:
            certeza = 0

            for caracteristica in self.conocimiento.caracteristicas:
                valor_caracteristica_regla = regla.obtener_valor_caracteristica(caracteristica)
                if valor_caracteristica_regla == datos_usuario[caracteristica]:
                    certeza += 1

            certeza_final = certeza / len(self.conocimiento.caracteristicas) * 100
            print("Regla: " + regla.obtener_valor_resultado() + ". Certeza: " + str(certeza_final))
            certeza_reglas[regla.obtener_valor_resultado()].append(certeza_final)

        # El resultado a mostrar al usuario sera en base a la certeza
        # Se retorna la de mayor valor, que podria no ser necesariamente 1
        resultado_dict = dict()

        for resultado in six.iterkeys(certeza_reglas):
            resultado_dict[resultado] = round(max(certeza_reglas[resultado]))

        resultado = max(resultado_dict, key=resultado_dict.get)

        respuesta = "El colchon que más se ajusta a sus necesidades es " \
               + resultado \
               + " (%" \
               + str(resultado_dict[resultado]) \
               + ")"

        print(respuesta)
        return respuesta