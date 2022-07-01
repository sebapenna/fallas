from time import sleep

from experta import *  # noqa
from flask import Flask, request, render_template, send_file, make_response
from flask_cors import cross_origin

from experto import *  # noqa

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('init.html')

@app.route('/buscar_colchon')
@cross_origin() # allow all origins all methods.
def handle():
    engine = SelectorColchones()
    engine.reset()

    x = {
        'precio': Precio[request.args['precio']],
        'rigidez': Rigidez[request.args['rigidez']],
        'duracion': Duracion[request.args['duracion']],
        'resistencia': Resistencia[request.args['resistencia']],
        'movimiento': Movimiento[request.args['movimiento']],
    }

    requerimientos = RequerimientosClientes(**x)

    print(requerimientos)

    engine.declare(requerimientos)
    engine.run()

    response = f"No podemos recomendarte un colchon"

    if engine.colchon_recomendado:
        response = f"Tu colchon ideal es '{engine.colchon_recomendado.value}'"

    r = make_response(response)
    r.headers.add("Access-Control-Allow-Origin", "*")

    return r

