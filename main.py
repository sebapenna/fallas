from time import sleep

from datos import *
from flask import Flask, request, render_template, send_file, make_response
from flask_cors import cross_origin

from motor_inferencia import MotorInferencia

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('init.html')

@app.route('/buscar_colchon')
@cross_origin() # allow all origins all methods.
def handle():
    engine = MotorInferencia()

    datos_usuario = {
        NombreCaracteristicas.PRECIO.value: Precio[request.args['precio']].value,
        NombreCaracteristicas.RIGIDEZ.value: Rigidez[request.args['rigidez']].value,
        NombreCaracteristicas.DURACION.value: Duracion[request.args['duracion']].value,
        NombreCaracteristicas.RESISTENCIA.value: Resistencia[request.args['resistencia']].value,
        NombreCaracteristicas.MOVIMIENTO.value: Movimiento[request.args['movimiento']].value,
    }

    print(datos_usuario)

    resultado = engine.calcular(datos_usuario)

    r = make_response(resultado)
    r.headers.add("Access-Control-Allow-Origin", "*")

    return r

